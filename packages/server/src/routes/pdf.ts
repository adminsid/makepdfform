/**
 * PDF generation and template management routes.
 *
 * Exports two Hono routers:
 *   pdfGenerateRouter  → mounted at /api/pdf
 *   templatesRouter    → mounted at /api/templates
 *
 * Uses @makepdfform/generator (vendored from pdfme, MIT, Copyright (c) 2020 HandDot).
 */
import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { eq, and, desc } from 'drizzle-orm';
import { templates } from '../db/schema';
import type { D1Database } from '@cloudflare/workers-types';

type Bindings = {
  DB: D1Database;
};

type Variables = {
  // Better Auth attaches the user via authMiddleware
  user: { id: string; email: string; name: string };
};

// ─── PDF Generation ────────────────────────────────────────────────────────────

export const pdfGenerateRouter = new Hono<{ Bindings: Bindings; Variables: Variables }>();

/**
 * POST /api/pdf/generate
 * Body: { template: Template, inputs: Record<string, string>[] }
 * Returns: application/pdf bytes
 */
pdfGenerateRouter.post('/generate', async (c) => {
  let body: { template: unknown; inputs: unknown };
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: 'Invalid JSON body' }, 400);
  }

  const { template, inputs } = body;
  if (!template || !inputs) {
    return c.json({ error: 'template and inputs are required' }, 400);
  }

  try {
    // Dynamic import so the heavy pdfme bundle is only loaded on demand.
    const { generate } = await import('@makepdfform/generator');
    const {
      text,
      image,
      table,
      line,
      rectangle,
      ellipse,
      checkbox,
      radioGroup,
      select,
      date,
      time,
      dateTime,
      barcodes,
    } = await import('@makepdfform/schemas');

    const plugins = {
      Text: text,
      Image: image,
      Table: table,
      Line: line,
      Rectangle: rectangle,
      Ellipse: ellipse,
      Checkbox: checkbox,
      RadioGroup: radioGroup,
      Select: select,
      Date: date,
      Time: time,
      DateTime: dateTime,
      Barcodes: barcodes,
    };

    const pdfBytes = await generate({
      template: template as Parameters<typeof generate>[0]['template'],
      inputs: inputs as Parameters<typeof generate>[0]['inputs'],
      plugins,
    });

    return new Response(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="generated.pdf"',
      },
    });
  } catch (err) {
    console.error('[pdf/generate] Error:', err);
    return c.json({ error: 'PDF generation failed', detail: String(err) }, 500);
  }
});

// ─── Templates CRUD ────────────────────────────────────────────────────────────

export const templatesRouter = new Hono<{ Bindings: Bindings; Variables: Variables }>();

/**
 * POST /api/templates
 * Body: { id?: string, name?: string, template: unknown }
 * Upserts a pdfme template for the authenticated user.
 */
templatesRouter.post('/', async (c) => {
  const user = c.get('user');
  let body: { id?: string; name?: string; template: unknown };
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: 'Invalid JSON body' }, 400);
  }

  if (!body.template) {
    return c.json({ error: 'template is required' }, 400);
  }

  const db = drizzle(c.env.DB);
  const now = Math.floor(Date.now() / 1000);
  const id = body.id ?? crypto.randomUUID();
  const name = body.name ?? 'Untitled Template';

  const existing = await db
    .select()
    .from(templates)
    .where(and(eq(templates.id, id), eq(templates.userId, user.id)))
    .get();

  if (existing) {
    await db
      .update(templates)
      .set({ name, data: JSON.stringify(body.template), updatedAt: now })
      .where(eq(templates.id, id));
    return c.json({ id, updated: true });
  } else {
    await db.insert(templates).values({
      id,
      userId: user.id,
      name,
      data: JSON.stringify(body.template),
      createdAt: now,
      updatedAt: now,
    });
    return c.json({ id, created: true }, 201);
  }
});

/**
 * GET /api/templates
 * Lists all templates for the current user (metadata only, no data blob).
 */
templatesRouter.get('/', async (c) => {
  const user = c.get('user');
  const db = drizzle(c.env.DB);

  const results = await db
    .select()
    .from(templates)
    .where(eq(templates.userId, user.id))
    .orderBy(desc(templates.updatedAt))
    .all();

  return c.json(
    results.map((r) => ({
      id: r.id,
      name: r.name,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    }))
  );
});

/**
 * GET /api/templates/:id
 * Returns a single template with its full pdfme template data.
 */
templatesRouter.get('/:id', async (c) => {
  const user = c.get('user');
  const id = c.req.param('id');
  const db = drizzle(c.env.DB);

  const result = await db
    .select()
    .from(templates)
    .where(and(eq(templates.id, id), eq(templates.userId, user.id)))
    .get();

  if (!result) {
    return c.json({ error: 'Template not found' }, 404);
  }

  let template: unknown;
  try {
    template = JSON.parse(result.data);
  } catch {
    template = null;
  }

  return c.json({
    id: result.id,
    name: result.name,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
    template,
  });
});

// Default export for backward compat (unused — import named exports instead)
export default templatesRouter;
