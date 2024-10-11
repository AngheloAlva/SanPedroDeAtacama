import { text, sqliteTable } from "drizzle-orm/sqlite-core"
import { v4 as uuidv4 } from "uuid"
import { sql } from "drizzle-orm"

import { excursion } from "./excursion"

type WhatWillYouDo = { title: string; description: string }[]
type InDetail = { title: string; description: string }[]
type Faq = { question: string; answer: string }[]

export const excursion_translation = sqliteTable("excursion_translation", {
	id: text("id")
		.$defaultFn(() => uuidv4())
		.primaryKey(),
	locale: text("locale", { enum: ["es", "en", "fr", "pt"] }).notNull(),
	title: text("title"),
	description: text("description"),
	createdAt: text("created_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: text("updated_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.$onUpdate(() => sql`CURRENT_TIMESTAMP`)
		.notNull(),

	// Information
	cancelation: text("cancelation"),
	guide: text("guide"),
	includes: text("includes"),
	duration: text("duration"),

	// Description
	what_will_you_do: text("what_will_you_do", { mode: "json" }).$type<WhatWillYouDo>(),
	in_detail: text("in_detail", { mode: "json" }).$type<InDetail>(),
	what_includes: text("what_includes", { mode: "json" }).$type<string[]>(),
	what_you_should_bring: text("what_you_should_bring", { mode: "json" }).$type<string[]>(),
	meeting_point: text("meeting_point"),

	// Faq
	faq: text("faq", { mode: "json" }).$type<Faq>(),

	excursion_id: text("excursion_id")
		.notNull()
		.references(() => excursion.id),
})
