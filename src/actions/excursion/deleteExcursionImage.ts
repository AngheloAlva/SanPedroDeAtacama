"use server"

import { eq } from "drizzle-orm"
import { db } from "@/db"

import { excursion } from "@/db/schema/excursion"

export const deleteExcursionImage = async (imageUrl: string, excursionId: string) => {
	try {
		const dbExcursion = await db
			.select({ images: excursion.images })
			.from(excursion)
			.where(eq(excursion.id, excursionId))

		if (dbExcursion && dbExcursion[0]) {
			const currentImages = dbExcursion[0].images || []

			const updatedImages = currentImages.filter((image) => image !== imageUrl)

			await db.update(excursion).set({ images: updatedImages }).where(eq(excursion.id, excursionId))
		}

		return true
	} catch (error) {
		console.error(error)
		return false
	}
}
