"use server"

import { and, eq } from "drizzle-orm"
import { db } from "@/db"
import { z } from "zod"

import { updateProgramSchema } from "@/lib/schemas/admin/updateProgram.schema"
import { program_translation } from "@/db/schema/program-translation"
import { program } from "@/db/schema/program"

import type { Locale } from "@/types/locales"

export const updateProgram = async (
	id: string,
	data: typeof program.$inferInsert
): Promise<boolean> => {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { id: exId, createdAt, updatedAt, ...rest } = data

		await db.update(program).set(rest).where(eq(program.id, id))

		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

export const updateProgramTranslation = async (
	id: string,
	locale: Locale,
	data: typeof program_translation.$inferInsert
): Promise<boolean> => {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { id: exTId, updatedAt, createdAt, ...rest } = data

		await db
			.update(program_translation)
			.set(rest)
			.where(and(eq(program_translation.id, id), eq(program_translation.locale, locale)))

		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export const updateProgramWithTranslation = async (
	locale: Locale,
	programId: string,
	programTranslationId: string,
	data: z.infer<typeof updateProgramSchema>,
	images?: string[]
): Promise<boolean> => {
	try {
		await db.transaction(async (tx) => {
			await tx
				.update(program)
				.set({
					...data,
					price: parseFloat(data.price),
					is_active: data.status === "active",
					images,
				})
				.where(eq(program.id, programId))

			await tx
				.update(program_translation)
				.set({
					...data,
					what_includes: data.whatIncludes.map((item) => item.item),
					what_not_includes: data.whatNotIncludes.map((item) => item.item),
					what_you_should_bring: data.whatYouShouldBring.map((item) => ({
						title: item.title,
						description: item.description,
					})),
					itinerary: data.itinerary.map((item) => ({
						name: item.name,
						title: item.title,
						activities: item.activities.map((activity) => ({
							excursion: {
								slug: activity.excursion?.split(",")[0] ?? "",
								name: activity.excursion?.split(",")[1] ?? "",
							},
							time: activity.time,
							description: activity.description,
						})),
					})),
				})
				.where(
					and(
						eq(program_translation.id, programTranslationId),
						eq(program_translation.locale, locale)
					)
				)
		})

		return true
	} catch (error) {
		console.log(error)
		return false
	}
}
