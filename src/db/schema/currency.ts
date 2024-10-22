import { text, sqliteTable, real } from "drizzle-orm/sqlite-core"
import { v4 as uuidv4 } from "uuid"

import { sql } from "drizzle-orm"

export const currency = sqliteTable("currency", {
	id: text("id")
		.$defaultFn(() => uuidv4())
		.primaryKey(),
	code: text("code").notNull().unique(),
	value: real("value").notNull(),
	lastUpdate: text("lastUpdate")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	createdAt: text("createdAt")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
})
