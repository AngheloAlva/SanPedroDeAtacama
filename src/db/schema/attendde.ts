import { text, sqliteTable } from "drizzle-orm/sqlite-core"
import { v4 as uuidv4 } from "uuid"

import { booking_item } from "./booking-item"

export const attendde = sqliteTable("attendde", {
	id: text("id")
		.$defaultFn(() => uuidv4())
		.primaryKey(),
	booking_item_id: text("booking_item_id")
		.references(() => booking_item.id)
		.notNull(),
	name: text("name").notNull(),
	last_name: text("last_name").notNull(),
	country: text("country").notNull(),
	age: text("age").notNull(),
	document_number: text("document_number").notNull(),
	food_preference: text("food_preference"),
})
