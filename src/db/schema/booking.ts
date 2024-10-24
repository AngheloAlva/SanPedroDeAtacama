import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core"
import { v4 as uuidv4 } from "uuid"

import { sql } from "drizzle-orm"

export const booking = sqliteTable("booking", {
	id: text("id")
		.$defaultFn(() => uuidv4())
		.primaryKey(),
	total_price_clp: integer("total_price_clp"),
	total_price_usd: integer("total_price_usd"),
	total_price_brl: integer("total_price_brl"),
	email: text("email").notNull(),
	status: text("status", { enum: ["pending", "confirmed", "cancelled"] })
		.default("pending")
		.notNull(),
	createdAt: text("createdAt")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: text("updatedAt")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
})
