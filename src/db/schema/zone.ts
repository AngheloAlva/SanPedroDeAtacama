import { text, sqliteTable } from "drizzle-orm/sqlite-core"
import { v4 as uuidv4 } from "uuid"
import { sql } from "drizzle-orm"

export const zone = sqliteTable("zone", {
	id: text("id")
		.$defaultFn(() => uuidv4())
		.primaryKey(),
	slug: text("slug").notNull().unique(),
	createdAt: text("created_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: text("updated_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
})
