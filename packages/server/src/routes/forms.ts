import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { forms } from '../db/schema';
import { eq } from 'drizzle-orm';
// import { v4 as uuidv4 } from 'uuid'; // Unused
import type { D1Database, R2Bucket } from '@cloudflare/workers-types';

type Bindings = {
  DB: D1Database;
  R2_BUCKET: R2Bucket;
};

const app = new Hono<{ Bindings: Bindings }>();

// GET /api/forms/:id
app.get('/:id', async (c) => {
  const id = c.req.param('id');
  const db = drizzle(c.env.DB);
  
  const result = await db.select().from(forms).where(eq(forms.id, id)).get();
  
  if (!result) return c.json({ error: 'Form not found' }, 404);
  return c.json(result);
});

// GET /api/forms - List all forms
app.get('/', async (c) => {
    const db = drizzle(c.env.DB);
    // Assuming we want all forms for now (no auth user filtering yet)
    const results = await db.select().from(forms).all();
    return c.json(results);
});

// PATCH /api/forms/:id
app.patch('/:id', async (c) => {
    try {
        const id = c.req.param('id');
        const body = await c.req.json();
        const db = drizzle(c.env.DB);
        const now = new Date();

        // 1. Update DB
        if (body.fields) {
            await db.update(forms)
                .set({ 
                    fields: body.fields,
                    updatedAt: now 
                })
                .where(eq(forms.id, id))
                .run();
                
            // 2. Notify Durable Object of the update (to sync active users)
            // This is optional if we assume the client doing the saving already has the state, 
            // but good for other clients if they are open.
            // However, the websocket flow usually handles real-time updates. 
            // The "Save" is for persistence. The DO should technically be the source of truth for "active" sessions.
            // For now, let's just save to DB.
        }

        return c.json({ success: true });
    } catch (e) {
        console.error(e);
        return c.json({ error: 'Failed to update form' }, 500);
    }
});

// PATCH /api/forms/:id/branding
app.patch('/:id/branding', async (c) => {
    try {
        const id = c.req.param('id');
        const body = await c.req.json();
        const db = drizzle(c.env.DB);
        
        await db.update(forms)
            .set({ brandingConfig: body })
            .where(eq(forms.id, id))
            .run();
            
        return c.json({ success: true });
    } catch (e) {
        console.error(e);
        return c.json({ error: 'Failed' }, 500);
    }
});

// PUT /api/forms/:id/branding/logo
app.put('/:id/branding/logo', async (c) => {
    try {
        const id = c.req.param('id');
        const body = await c.req.arrayBuffer();
        const contentType = c.req.header('Content-Type') || 'image/png';
        const fileName = `logos/${id}-${Date.now()}`;
        
        await c.env.R2_BUCKET.put(fileName, body, {
            httpMetadata: { contentType }
        });
        
        // We need a way to serve this. For now, assuming direct access if public or via a proxy route.
        // Let's create a proxy route for R2 files if not already there.
        const logoUrl = `/api/files/${fileName}`;
        
        return c.json({ logoUrl });
    } catch (e) {
        console.error(e);
        return c.json({ error: 'Failed to upload logo' }, 500);
    }
});

// POST /api/forms
app.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const db = drizzle(c.env.DB);
    const id = crypto.randomUUID();
    const now = new Date();

    await db.insert(forms).values({
      id,
      title: body.title || 'Untitled Form',
      fields: body.fields || [],
      createdAt: now,
      updatedAt: now,
    });

    return c.json({ id, ...body });
  } catch (e) {
      console.error(e);
      return c.json({ error: 'Failed to create form' }, 500);
  }
});

// PUT /api/forms/:id/file
// Upload PDF file to R2
app.put('/:id/file', async (c) => {
    const id = c.req.param('id');
    const body = await c.req.arrayBuffer(); // Raw PDF bytes
    
    if (!body || body.byteLength === 0) {
        return c.json({ error: 'Empty file' }, 400);
    }

    try {
        await c.env.R2_BUCKET.put(`forms/${id}.pdf`, body, {
            httpMetadata: { contentType: 'application/pdf' }
        });
        return c.json({ success: true });
    } catch(e) {
        console.error(e);
        return c.json({ error: 'Failed to upload file' }, 500);
    }
});

// GET /api/forms/:id/file
// Download PDF file from R2
app.get('/:id/file', async (c) => {
    const id = c.req.param('id');
    
    const object = await c.env.R2_BUCKET.get(`forms/${id}.pdf`);
    if (!object) {
        return c.json({ error: 'File not found' }, 404);
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers as any);
    headers.set('etag', object.httpEtag);
    
    return new Response(object.body as unknown as ReadableStream, {
        headers,
    });
});

export default app;
