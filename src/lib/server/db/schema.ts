import { sqliteTable, AnySQLiteColumn, integer, text } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const posts = sqliteTable("posts", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	title: text().notNull(),
	content: text().notNull(),
	createdAt: integer("created_at").notNull(),
	updatedAt: integer("updated_at"),
});

export const cfKv = sqliteTable("_cf_KV", {
});

export const drizzleMigrations = sqliteTable("__drizzle_migrations", {
});

