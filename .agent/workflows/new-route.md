---
description: Create a new Hono API route in packages/server/src/routes/ with Zod input validation, Drizzle ORM queries, proper error handling, and TypeScript types.
---

1. Ask the user for the name of the route (e.g. `users`, `posts`) and the desired functionality (e.g. `create a new post`).
2. Create a new file in `packages/server/src/routes/[route-name].ts`.
3. In this file, import `Hono` from `hono` and `zValidator` from `@hono/zod-validator`.
4. Define a new Hono app instance: `const app = new Hono()`.
5. Define the Zod schema for the input validation.
6. Create the route handler (e.g. `app.post('/', ...)`).
7. Inside the handler:
    a. Parse the input using `c.req.valid('json')` (or `query`/`param` as needed).
    b. Perform the database operation using Drizzle ORM (import `db` from specific location, likely `../db` or similar - check existing code).
    c. Handle potential errors using `try/catch` and return appropriate HTTP status codes (e.g. 400 for bad input, 500 for server error).
    d. Return the result as JSON using `c.json()`.
8. Export the app instance: `export default app`.
9. Register the new route in `packages/server/src/index.ts` (or the main entry point) by importing it and calling `app.route('/[route-name]', [route-name])`.
