export type CollabMessage = 
  | { type: 'JOIN', clientId: string }
  | { type: 'FIELDS_UPDATE', fields: any[] }
  | { type: 'CURSOR_MOVE', clientId: string, x: number, y: number, page: number };

export class CollaborationManager {
  private ws: WebSocket | null = null;
  private formId: string;
  private clientId: string;
  
  public onFieldsUpdate: ((fields: any[]) => void) | null = null;
  public onCursorMove: ((clientId: string, x: number, y: number, page: number) => void) | null = null;
  public onPeerJoin: ((clientId: string) => void) | null = null;

  constructor(formId: string) {
    this.formId = formId;
    this.clientId = crypto.randomUUID();
  }

  connect() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    const url = `${protocol}//${host}/api/forms/${this.formId}/ws`;

    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      console.log('Connected to collaboration room');
      this.send({ type: 'JOIN', clientId: this.clientId });
    };

    this.ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data) as CollabMessage;
        this.handleMessage(msg);
      } catch (e) {
        console.error('Failed to parse WS message', e);
      }
    };

    this.ws.onclose = () => {
      console.log('Disconnected from collaboration room');
      // Reconnect logic could go here
    };
  }

  private handleMessage(msg: CollabMessage) {
    // Ignore own messages if reflected (server broadcasts to all except sender, but just in case)
    if ('clientId' in msg && msg.clientId === this.clientId && msg.type !== 'JOIN') return;

    switch (msg.type) {
      case 'FIELDS_UPDATE':
        this.onFieldsUpdate?.(msg.fields);
        break;
      case 'CURSOR_MOVE':
        this.onCursorMove?.(msg.clientId, msg.x, msg.y, msg.page);
        break;
      case 'JOIN':
        this.onPeerJoin?.(msg.clientId);
        break;
    }
  }

  send(msg: CollabMessage) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(msg));
    }
  }

  sendFieldsUpdate(fields: any[]) {
      this.send({ type: 'FIELDS_UPDATE', fields });
  }

  sendCursorMove(x: number, y: number, page: number) {
      this.send({ type: 'CURSOR_MOVE', clientId: this.clientId, x, y, page });
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}
