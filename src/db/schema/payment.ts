import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core"
import { v4 as uuidv4 } from "uuid"

import { sql } from "drizzle-orm"
import { booking } from "./booking"

export const payment = sqliteTable("payment", {
	id: text("id")
		.$defaultFn(() => uuidv4())
		.primaryKey(),
	booking_id: text("booking_id")
		.references(() => booking.id)
		.notNull(),
	payment_provider: text("payment_provider", {
		enum: ["paypal", "flow", "bank_transfer"],
	}),
	payment_status: text("payment_status", { enum: ["pending", "approved", "rejected"] })
		.default("pending")
		.notNull(),
	transaction_id: text("transaction_id"),
	amount: integer("ammount"),
	user_tax: integer("user_tax"),
	currency: text("currency"),
	createdAt: text("createdAt")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: text("updatedAt")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
})
