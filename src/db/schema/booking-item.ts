import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core"
import { v4 as uuidv4 } from "uuid"

import { excursion } from "./excursion"
import { booking } from "./booking"
import { program } from "./program"

export const booking_item = sqliteTable("booking_item", {
	id: text("id")
		.$defaultFn(() => uuidv4())
		.primaryKey(),
	booking_id: text("booking_id")
		.references(() => booking.id)
		.notNull(),
	excursion_name: text("excursion_name"),
	excursion_id: text("excursion_id").references(() => excursion.id),
	program_id: text("program_id").references(() => program.id),
	price: integer("price").notNull(),
	date: text("date").notNull(),
	people_count: integer("people_count").notNull(),
	accommodation: text("accommodation").notNull(),
	comment: text("comment"),
})
