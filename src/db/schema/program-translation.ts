import { text, sqliteTable } from "drizzle-orm/sqlite-core"
import { v4 as uuidv4 } from "uuid"
import { sql } from "drizzle-orm"
import { program } from "./program"

type Itinerary = {
	name: string
	title: string
	activities: {
		time: string
		excursion: {
			name: string
			slug: string
		}
		description: string
	}[]
}[]
type WhatYouShouldBring = { title: string; description: string }[]

export const program_translation = sqliteTable("program_translation", {
	id: text("id")
		.$defaultFn(() => uuidv4())
		.primaryKey(),
	locale: text("locale", { enum: ["es", "en", "fr", "pt"] }).notNull(),
	title: text("title", { mode: "json" }).$type<{ part1: string; part2: string; part3: string }>(),
	description: text("description"),
	createdAt: text("created_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: text("updated_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.$onUpdate(() => sql`CURRENT_TIMESTAMP`)
		.notNull(),

	// Itinerary
	itinerary: text("itinerary", { mode: "json" }).$type<Itinerary>(),

	// Information
	cancelation: text("cancelation"),
	guide: text("guide"),
	includes: text("includes"),
	duration: text("duration"),

	// Description
	what_includes: text("what_includes", { mode: "json" }).$type<string[]>(),
	what_not_includes: text("what_not_includes", { mode: "json" }).$type<string[]>(),
	what_you_should_bring: text("what_you_should_bring", {
		mode: "json",
	}).$type<WhatYouShouldBring>(),
	meeting_point: text("meeting_point"),

	program_id: text("program_id")
		.references(() => program.id)
		.notNull(),
})
