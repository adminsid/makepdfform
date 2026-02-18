import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { submissions } from '../db/schema';
import { eq, desc } from 'drizzle-orm';
import type { D1Database } from '@cloudflare/workers-types';

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// GET /api/submissions/:formId
app.get('/:formId', async (c) => {
  const formId = c.req.param('formId');
  const db = drizzle(c.env.DB);
  
  const results = await db.select()
    .from(submissions)
    .where(eq(submissions.formId, formId))
    .orderBy(desc(submissions.createdAt))
    .all();
  
  return c.json(results);
});

// POST /api/submissions/:formId
app.post('/:formId', async (c) => {
  try {
    const formId = c.req.param('formId');
    const body = await c.req.json();
    const db = drizzle(c.env.DB);
    const id = crypto.randomUUID();
    const now = new Date();

    await db.insert(submissions).values({
      id,
      formId,
      data: body,
      createdAt: now,
    });

    return c.json({ id, success: true });
  } catch (e) {
      console.error(e);
      return c.json({ error: 'Failed to submit form' }, 500);
  }
});

export default app;
