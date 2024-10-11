import { text, sqliteTable } from "drizzle-orm/sqlite-core"
import { v4 as uuidv4 } from "uuid"
import { sql } from "drizzle-orm"

import { zone } from "./zone"

export const zone_translation = sqliteTable("zone_translation", {
	id: text("id")
		.$defaultFn(() => uuidv4())
		.primaryKey(),
	locale: text("locale", { enum: ["es", "en", "fr", "pt"] }).notNull(),
	name: text("name"),
	description: text("description"),
	createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),

	zone_id: text("zone_id")
		.notNull()
		.references(() => zone.id),
})
