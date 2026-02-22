import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import { drizzle } from 'drizzle-orm/d1'
import { user, session, account, verification } from './schema'

import formsRouter from './routes/forms'
import submissionsRouter from './routes/submissions'
import billingRouter from './routes/billing'
import adminSetupRouter from './routes/admin-setup'

import { FormRoom } from './do/FormRoom'

type Bindings = {
  DB: D1Database
  R2_BUCKET: R2Bucket
  KV_CACHE: KVNamespace
  FORM_ROOM: DurableObjectNamespace<FormRoom>
  ASSETS: Fetcher
  AUTH_SECRET: string
  GITHUB_CLIENT_ID: string
  GITHUB_CLIENT_SECRET: string
  GOOGLE_CLIENT_ID: string
  GOOGLE_CLIENT_SECRET: string
  STRIPE_SECRET_KEY: string
  STRIPE_WEBHOOK_SECRET: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', logger())
app.use('*', secureHeaders())
app.use('/api/*', cors({
  origin: (origin) => {
    return origin.startsWith('http://localhost') ? origin : 'https://makepdfform.lama-4db.workers.dev';
  },
  credentials: true,
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

import { createAuth } from './auth'

app.on(['POST', 'GET'], '/api/auth/*', (c) => {
  console.log('HANDLING AUTH REQUEST', c.req.method, c.req.url); // Log to confirm deployment
  const newReq = new Request(c.req.raw.url, {
      method: c.req.raw.method,
      headers: new Headers(c.req.raw.headers), // Explicitly clone headers
      body: c.req.raw.body,
      // @ts-ignore - duplex is needed for some environments but might be missing in types
      duplex: 'half' 
  });
  return createAuth(c.env).handler(newReq);
})

import { authMiddleware } from './middleware/auth'

// ... existing auth setup ...

// Protect /api/forms routes (except potentially public ones later)
app.use('/api/forms/*', authMiddleware)
app.route('/api/forms', formsRouter)
app.route('/api/submissions', submissionsRouter)
app.route('/api/billing', billingRouter)
app.route('/api/admin', adminSetupRouter)

app.get('/api/files/:path{.*}', async (c) => {
    const path = c.req.param('path');
    const object = await c.env.R2_BUCKET.get(path);
    if (!object) return c.notFound();
    
    const headers = new Headers();
    object.writeHttpMetadata(headers as any);
    headers.set('etag', object.httpEtag);
    
    return new Response(object.body as unknown as ReadableStream, { headers });
});

app.get('/api/forms/:id/ws', (c) => {
    const id = c.req.param('id');
    const idObj = c.env.FORM_ROOM.idFromName(id);
    const stub = c.env.FORM_ROOM.get(idObj);
    return stub.fetch(c.req.raw);
});

app.get('/api/health', (c) => {
  return c.json({ status: 'ok' })
})

// Root route removed to let static assets (Svelte) handle /

app.all('*', async (c) => {
  console.log('HANDLING ASSET REQUEST', c.req.method, c.req.url);
  // Clone request to avoid immutable headers issue
  const newReq = new Request(c.req.raw.url, {
      method: c.req.raw.method,
      headers: new Headers(c.req.raw.headers),
      body: c.req.raw.body,
       // @ts-ignore
      duplex: 'half'
  });

  let response = await c.env.ASSETS.fetch(newReq)
  if (response.status === 404) {
    // SPA Fallback: Serve index.html for unknown routes (handling client-side routing)
    const url = new URL(c.req.url);
    url.pathname = '/';
    response = await c.env.ASSETS.fetch(url.toString())
  }
  
  // Clone response to make headers mutable for secureHeaders middleware
  return new Response(response.body, response);
})



export { FormRoom } from './do/FormRoom'

export default app
