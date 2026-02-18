import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import { Auth } from '@auth/core'
import GitHub from '@auth/core/providers/github'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { drizzle } from 'drizzle-orm/d1'
import { users, accounts, sessions, verificationTokens } from './schema'

import formsRouter from './routes/forms'
import submissionsRouter from './routes/submissions'
import billingRouter from './routes/billing'

import { FormRoom } from './do/FormRoom'

type Bindings = {
  DB: D1Database
  R2_BUCKET: R2Bucket
  KV_CACHE: KVNamespace
  FORM_ROOM: DurableObjectNamespace<FormRoom>
  ASSETS: Fetcher
  AUTH_SECRET: string
  GITHUB_ID: string
  GITHUB_SECRET: string
  STRIPE_SECRET_KEY: string
  STRIPE_WEBHOOK_SECRET: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', logger())
app.use('*', secureHeaders())
app.use('/api/*', cors())

app.use('/api/auth/*', async (c) => {
  const db = drizzle(c.env.DB)
  const res = await Auth(c.req.raw, {
    providers: [
      GitHub({
        clientId: c.env.GITHUB_ID,
        clientSecret: c.env.GITHUB_SECRET,
      }),
    ],
    adapter: DrizzleAdapter(db, {
      usersTable: users,
      accountsTable: accounts,
      sessionsTable: sessions,
      verificationTokensTable: verificationTokens,
    }),
    secret: c.env.AUTH_SECRET,
    basePath: '/api/auth',
  })
  return res
})

app.route('/api/forms', formsRouter)
app.route('/api/submissions', submissionsRouter)
app.route('/api/billing', billingRouter)

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

app.all('*', (c) => {
  return c.env.ASSETS.fetch(c.req.raw)
})



export { FormRoom } from './do/FormRoom'

export default app
