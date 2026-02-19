import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { forms } from '../db/schema';

import { DurableObject } from "cloudflare:workers";

export class FormRoom extends DurableObject {
  state: DurableObjectState;
  sessions: Set<WebSocket>;
  currentFields: any[] = [];
  env: any;
  initialized: boolean = false;

  constructor(state: DurableObjectState, env: any) {
    super(state, env);
    this.state = state;
    this.env = env;
    this.sessions = new Set();
  }

  async initializeState() {
    if (this.initialized) return;
    
    try {
        // We use the ID as the name for idFromName
        // So state.id.toString() might be the internal DO ID
        // But the room name we passed to idFromName is what we want.
        // Actually, Durable Objects don't easily give back the "name" string.
        // But we store the fields in memory.
        // If we want to load from DB, we need the formId.
        // We'll rely on the first client providing the data or the stub passing it.
        // For now, let's keep it in memory. 
        // If we really need DB persistence, we should pass the ID in a header or first message.
        this.initialized = true;
    } catch (e) {
        console.error('Failed to initialize FormRoom state', e);
    }
  }

  async fetch(request: Request): Promise<Response> {
    const upgradeHeader = request.headers.get('Upgrade');
    if (!upgradeHeader || upgradeHeader !== 'websocket') {
        return new Response('Expected Upgrade: websocket', { status: 426 });
    }

    const webSocketPair = new WebSocketPair();
    const [client, server] = Object.values(webSocketPair);

    this.state.acceptWebSocket(server);
    this.sessions.add(server);

    return new Response(null, {
        status: 101,
        webSocket: client,
    });
  }

  async webSocketMessage(ws: WebSocket, message: string | ArrayBuffer) {
      try {
          const msg = JSON.parse(message as string);
          
          if (msg.type === 'FIELDS_UPDATE') {
              this.currentFields = msg.fields;
          } else if (msg.type === 'JOIN') {
              // Send current state to the joining client
              ws.send(JSON.stringify({
                  type: 'FIELDS_UPDATE',
                  fields: this.currentFields
              }));
          }

          // Broadcast to all other sessions
          for (const session of this.sessions) {
              if (session !== ws) {
                  try {
                      session.send(message);
                  } catch (err) {
                      this.sessions.delete(session);
                  }
              }
          }
      } catch (e) {
          // Ignore
      }
  }

  async webSocketClose(ws: WebSocket, code: number, reason: string, wasClean: boolean) {
      this.sessions.delete(ws);
  }

  async webSocketError(ws: WebSocket, error: unknown) {
      this.sessions.delete(ws);
  }
}
