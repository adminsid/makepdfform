import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: 'd48375e27a760596395561a2936a29be',
    databaseId: '3527a955-94a5-4fb6-bdb8-1e1ec7450945',
    token: 'placeholder_token', // Not needed for local dev usually, but config might require it
  },
} satisfies Config;
