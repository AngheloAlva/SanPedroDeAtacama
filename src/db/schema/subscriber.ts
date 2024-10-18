import { text, sqliteTable } from "drizzle-orm/sqlite-core"
import { v4 as uuidv4 } from "uuid"
import { sql } from "drizzle-orm"

export const subscriber = sqliteTable("subscriber", {
	id: text("id")
		.$defaultFn(() => uuidv4())
		.primaryKey(),
	email: text("email").notNull().unique(),
	createdAt: text("created_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
})
