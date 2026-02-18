import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("emailVerified", { mode: "boolean" }).notNull(),
  image: text("image"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId").notNull().references(() => user.id)
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId").notNull().references(() => user.id),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: integer("accessTokenExpiresAt", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refreshTokenExpiresAt", { mode: "timestamp" }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }),
  updatedAt: integer("updatedAt", { mode: "timestamp" }),
});

export const forms = sqliteTable('forms', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => user.id),
  title: text('title').notNull(),
  pdfDataUrl: text('pdf_data_url'),
  settingsJson: text('settings_json'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const formFields = sqliteTable('form_fields', {
  id: text('id').primaryKey(),
  formId: text('form_id').notNull().references(() => forms.id),
  type: text('type').notNull(),
  label: text('label'),
  xPercent: integer('x_percent').notNull(),
  yPercent: integer('y_percent').notNull(),
  widthPercent: integer('width_percent').notNull(),
  heightPercent: integer('height_percent').notNull(),
  pageNumber: integer('page_number').notNull(),
  propertiesJson: text('properties_json'),
  sortOrder: integer('sort_order').notNull(),
});

export const submissions = sqliteTable('submissions', {
  id: text('id').primaryKey(),
  formId: text('form_id').notNull().references(() => forms.id),
  dataJson: text('data_json').notNull(),
  submittedAt: integer('submitted_at', { mode: 'timestamp' }).notNull(),
  ipAddress: text('ip_address'),
});
