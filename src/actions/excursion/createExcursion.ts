"use server"

import { excursion } from "@/db/schema/excursion"
import { db } from "@/db"

import { excursion_translation } from "@/db/schema/excursion-translation"

export const createExcursion = async (slug: string, price: number, zoneId: string) => {
	try {
		const newExcursion = await db
			.insert(excursion)
			.values({
				slug,
				price,
				images: [],
				zone_id: zoneId,
			})
			.returning()

		const baseTranstaltion = {
			faq: [],
			title: "",
			guide: "",
			duration: "",
			includes: "",
			in_detail: [],
			cancelation: "",
			description: "",
			meeting_point: "",
			what_includes: [],
			what_will_you_do: [],
			what_you_should_bring: [],
			excursion_id: newExcursion[0].id,
		}

		await db.insert(excursion_translation).values([
			{
				...baseTranstaltion,
				locale: "es",
			},

			{
				...baseTranstaltion,
				locale: "en",
			},
			{
				...baseTranstaltion,
				locale: "pt",
			},
			{
				...baseTranstaltion,
				locale: "fr",
			},
		])

		return true
	} catch (error) {
		console.error(error)
		return false
	}
}
