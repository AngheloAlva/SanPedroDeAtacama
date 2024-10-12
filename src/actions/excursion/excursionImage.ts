"use server"

import { eq } from "drizzle-orm"
import { db } from "@/db"

import { excursion } from "@/db/schema/excursion"

const extensions = ["jpg", "jpeg", "png", "webp", "avif"]

export const updloadImages = async (excursionId: string, images: string[]) => {
	try {
		if (images.some((image) => !extensions.includes(image.split(".").pop()!))) {
			return null
		}

		await db.update(excursion).set({ images }).where(eq(excursion.id, excursionId))
	} catch (error) {
		console.log(error)
		return null
	}
}
