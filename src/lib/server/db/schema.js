import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const User = sqliteTable('user', {
  id: integer('id').primaryKey(),
  username: text('username').unique().notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
});
