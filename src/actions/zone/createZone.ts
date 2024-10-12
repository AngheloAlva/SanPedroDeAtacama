"use server"

import { db } from "@/db"
import { zone } from "@/db/schema/zone"
import { zone_translation } from "../../db/schema/zone-translation"

export const createZone = async (slug: string) => {
	try {
		const newZone = await db
			.insert(zone)
			.values({
				slug,
			})
			.returning()

		const baseZoneTranslation = {
			name: "",
			description: "",
			zone_id: newZone[0].id,
		}

		await db.insert(zone_translation).values([
			{
				...baseZoneTranslation,
				locale: "es",
			},
			{
				...baseZoneTranslation,
				locale: "en",
			},
			{
				...baseZoneTranslation,
				locale: "fr",
			},
			{
				...baseZoneTranslation,
				locale: "pt",
			},
		])

		return true
	} catch (error) {
		console.error(error)

		return false
	}
}
