

import type { Context, Next } from 'hono';

export const authMiddleware = async (c: Context, next: Next) => {
  // Better Auth session check
  const { createAuth } = await import('../auth');
  const auth = createAuth(c.env);
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  // Attach user to context for downstream routes
  c.set('user', session.user);

  await next();
};
