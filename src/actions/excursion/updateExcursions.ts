"use server"

import { and, eq } from "drizzle-orm"
import { format } from "date-fns"
import { db } from "@/db"
import { z } from "zod"

import { excursion_translation } from "@/db/schema/excursion-translation"
import { excursion } from "@/db/schema/excursion"

import type { updateExcursionSchema } from "@/lib/schemas/admin/updateExcursion.schema"
import type { Locale } from "@/types/locales"
import { revalidatePath } from "next/cache"

export const updateExcursion = async (
	id: string,
	data: typeof excursion.$inferInsert
): Promise<boolean> => {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { id: exId, createdAt, updatedAt, ...rest } = data

		await db.update(excursion).set(rest).where(eq(excursion.id, id))

		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

export const updateExcursionTranslation = async (
	id: string,
	locale: Locale,
	data: typeof excursion_translation.$inferInsert
): Promise<boolean> => {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { id: exTId, updatedAt, createdAt, ...rest } = data

		await db
			.update(excursion_translation)
			.set(rest)
			.where(and(eq(excursion_translation.id, id), eq(excursion_translation.locale, locale)))

		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export const updateExcursionWithTranslation = async (
	locale: Locale,
	excursionId: string,
	excursionTranslationId: string,
	data: z.infer<typeof updateExcursionSchema>,
	images?: string[],
	datesBooked?: Date[]
): Promise<boolean> => {
	try {
		await db.transaction(async (tx) => {
			await tx
				.update(excursion)
				.set({
					...data,
					price: parseFloat(data.price),
					is_active: data.status === "active",
					images,
					days_not_available: datesBooked?.map((date) => format(date, "yyyy-MM-dd")),
					days_of_week_not_available: data.days_of_week_not_available
						? { dayOfWeek: data.days_of_week_not_available }
						: null,
				})
				.where(eq(excursion.id, excursionId))

			await tx
				.update(excursion_translation)
				.set({
					...data,
					title: data.name,
					in_detail: data.inDetail,
					what_will_you_do: data.whatWillYouDo,
					what_includes: data.whatIncludes.map((item) => item.item),
					what_you_should_bring: data.whatYouShouldBring.map((item) => item.item),
				})
				.where(
					and(
						eq(excursion_translation.id, excursionTranslationId),
						eq(excursion_translation.locale, locale)
					)
				)
		})

		revalidatePath(`/admin/dashboard/excursions/${data.slug}`)

		return true
	} catch (error) {
		console.log(error)
		return false
	}
}
