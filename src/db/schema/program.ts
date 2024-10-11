import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core"
import { v4 as uuidv4 } from "uuid"
import { sql } from "drizzle-orm"

export const program = sqliteTable("program", {
	id: text("id")
		.$defaultFn(() => uuidv4())
		.primaryKey(),
	slug: text("slug").notNull().unique(),
	price: integer("price").notNull(),
	is_active: integer("is_active", { mode: "boolean" }).notNull().default(true),
	images: text("images", { mode: "json" }).$type<string[]>(),
	days_not_available: text("days_not_available", { mode: "json" }).$type<string[]>(),
	days_of_week_not_available: text("blocked_dates", { mode: "json" }).$type<{
		dayOfWeek: number[]
	}>(),
	createdAt: text("created_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: text("updated_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
})
