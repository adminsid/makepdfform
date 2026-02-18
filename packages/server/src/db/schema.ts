import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const forms = sqliteTable('forms', {
  id: text('id').primaryKey(), // UUID
  title: text('title').notNull(),
  fields: text('fields', { mode: 'json' }), // JSON array of field definitions
  isPro: integer('is_pro', { mode: 'boolean' }).default(false),
  brandingConfig: text('branding_config', { mode: 'json' }), // { logoUrl: string, primaryColor: string }
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const submissions = sqliteTable('submissions', {
  id: text('id').primaryKey(), // UUID
  formId: text('form_id').references(() => forms.id).notNull(),
  data: text('data', { mode: 'json' }).notNull(), // JSON object of submitted values
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});
