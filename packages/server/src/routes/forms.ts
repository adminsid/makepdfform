import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { forms } from '../db/schema';
import { eq, and, desc } from 'drizzle-orm';
import type { D1Database, R2Bucket } from '@cloudflare/workers-types';
import type { AdapterUser } from '@auth/core/adapters';

type Bindings = {
  DB: D1Database;
  R2_BUCKET: R2Bucket;
};

type Variables = {
  user: AdapterUser;
}

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// GET /api/forms/:id
app.get('/:id', async (c) => {
  const id = c.req.param('id');
  const user = c.get('user');
  const db = drizzle(c.env.DB);
  
  const result = await db.select().from(forms).where(
    and(
      eq(forms.id, id),
      eq(forms.userId, user.id)
    )
  ).get();
  
  if (!result) return c.json({ error: 'Form not found' }, 404);
  return c.json(result);
});

// GET /api/forms - List all forms for current user
app.get('/', async (c) => {
    const user = c.get('user');
    const db = drizzle(c.env.DB);
    
    // Select all forms for this user, ordered by updatedAt desc
    const results = await db.select()
        .from(forms)
        .where(eq(forms.userId, user.id))
        .orderBy(desc(forms.updatedAt))
        .all();
        
    return c.json(results);
});

// PATCH /api/forms/:id - Update fields
app.patch('/:id', async (c) => {
    try {
        const id = c.req.param('id');
        const user = c.get('user');
        const body = await c.req.json();
        const db = drizzle(c.env.DB);
        const now = new Date();

        // Check ownership
        const form = await db.select().from(forms).where(and(eq(forms.id, id), eq(forms.userId, user.id))).get();
        if (!form) return c.json({ error: 'Form not found' }, 404);

        if (body.fields) {
            await db.update(forms)
                .set({ 
                    fields: body.fields,
                    updatedAt: now 
                })
                .where(eq(forms.id, id))
                .run();
        }
        
        // Handle renaming
        if (body.title) {
             await db.update(forms)
                .set({ 
                    title: body.title,
                    updatedAt: now 
                })
                .where(eq(forms.id, id))
                .run();
        }

        return c.json({ success: true });
    } catch (e) {
        console.error(e);
        return c.json({ error: 'Failed to update form' }, 500);
    }
});

// DELETE /api/forms/:id
app.delete('/:id', async (c) => {
    try {
        const id = c.req.param('id');
        const user = c.get('user');
        const db = drizzle(c.env.DB);
        
        // Check ownership
        const form = await db.select().from(forms).where(and(eq(forms.id, id), eq(forms.userId, user.id))).get();
        if (!form) return c.json({ error: 'Form not found' }, 404);
        
        // Delete from D1
        await db.delete(forms).where(eq(forms.id, id)).run();
        
        // Try delete from R2 (optional, catch error if fails)
        try {
            await c.env.R2_BUCKET.delete(`forms/${id}.pdf`);
             await c.env.R2_BUCKET.delete(`logos/${id}`); // If any
        } catch (e) {
            console.warn('Failed to cleanup R2 files', e);
        }

        return c.json({ success: true });
    } catch (e) {
        console.error(e);
        return c.json({ error: 'Failed to delete form' }, 500);
    }
});


// PATCH /api/forms/:id/branding
app.patch('/:id/branding', async (c) => {
    try {
        const id = c.req.param('id');
        const user = c.get('user');
        const body = await c.req.json();
        const db = drizzle(c.env.DB);
        
        // Check ownership
        const form = await db.select().from(forms).where(and(eq(forms.id, id), eq(forms.userId, user.id))).get();
        if (!form) return c.json({ error: 'Form not found' }, 404);
        
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
        const user = c.get('user');
        const body = await c.req.arrayBuffer();
        const contentType = c.req.header('Content-Type') || 'image/png';
        const fileName = `logos/${id}-${Date.now()}`;
        
        // Check ownership? This is receiving binary... effectively if ID matches route.
        // But better to check DB first.
        const db = drizzle(c.env.DB);
        const form = await db.select().from(forms).where(and(eq(forms.id, id), eq(forms.userId, user.id))).get();
        if (!form) return c.json({ error: 'Form not found' }, 404);
        
        await c.env.R2_BUCKET.put(fileName, body, {
            httpMetadata: { contentType }
        });
        
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
    const user = c.get('user');
    const body = await c.req.json();
    const db = drizzle(c.env.DB);
    const id = crypto.randomUUID();
    const now = new Date();

    await db.insert(forms).values({
      id,
      userId: user.id /* authenticated user id */,
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
    const user = c.get('user');
    const body = await c.req.arrayBuffer(); // Raw PDF bytes
    
    // Check ownership
    const db = drizzle(c.env.DB);
    const form = await db.select().from(forms).where(and(eq(forms.id, id), eq(forms.userId, user.id))).get();
    if (!form) return c.json({ error: 'Form not found' }, 404);
    
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
    const user = c.get('user');
    
    // Check ownership? 
    // Usually yes, unless public URL.
    // For editor loading, we want strict auth. 
    // Public view will use a different public route or signed URL.
    
    const db = drizzle(c.env.DB);
    const form = await db.select().from(forms).where(and(eq(forms.id, id), eq(forms.userId, user.id))).get();
    if (!form) return c.json({ error: 'Form not found' }, 404);
    
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
