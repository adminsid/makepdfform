---
description: Create a new Drizzle ORM migration in drizzle/ for Cloudflare D1. Include the schema change and the SQL migration file.
---

1. Ask the user for the description of the schema change (e.g. "add phone number to users table").
2. Modify the Drizzle schema file (usually in `packages/server/src/db/schema.ts` or similar).
3. Run the Drizzle Kit command to generate the migration: `npx drizzle-kit generate`.
   - Ensure the command is run from the correct directory (likely root or `packages/server` depending on config).
   - Verify that the new migration SQL file is created in `drizzle/` (or configured output dir).
4. Review the generated SQL file to ensure it matches the intended changes.
5. (Optional) If the user wants to apply it immediately locally, run `npx wrangler d1 migrations apply [database_name] --local`.
