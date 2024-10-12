"use server"

import { db } from "@/db"

import { program_translation } from "@/db/schema/program-translation"
import { program } from "@/db/schema/program"

export const createProgram = async (slug: string, price: number) => {
	try {
		const newProgram = await db
			.insert(program)
			.values({
				slug,
				price,
				images: [],
			})
			.returning()

		const baseTranslation = {
			guide: "",
			includes: "",
			duration: "",
			itinerary: [],
			cancelation: "",
			description: "",
			meeting_point: "",
			what_includes: [],
			what_not_includes: [],
			what_you_should_bring: [],
			program_id: newProgram[0].id,
			title: { part1: "", part2: "", part3: "" },
		}

		await db.insert(program_translation).values([
			{
				...baseTranslation,
				locale: "es",
			},

			{
				...baseTranslation,
				locale: "en",
			},
			{
				...baseTranslation,
				locale: "pt",
			},
			{
				...baseTranslation,
				locale: "fr",
			},
		])

		return true
	} catch (error) {
		console.error(error)
		return false
	}
}
