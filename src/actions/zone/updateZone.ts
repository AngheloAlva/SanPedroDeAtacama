"use server"

import { and, eq } from "drizzle-orm"
import { db } from "@/db"

import { zone_translation } from "@/db/schema/zone-translation"
import { zone } from "@/db/schema/zone"

import type { updateZoneSchema } from "@/lib/schemas/admin/updateZone.schema"
import type { Locale } from "@/types/locales"
import type { z } from "zod"

export const updateZoneWithTranslation = async (
	locale: Locale,
	zoneId: string,
	zoneTranslationId: string,
	data: z.infer<typeof updateZoneSchema>
): Promise<boolean> => {
	try {
		await db.transaction(async (tx) => {
			await tx
				.update(zone)
				.set({
					slug: data.slug,
				})
				.where(eq(zone.id, zoneId))

			await tx
				.update(zone_translation)
				.set({
					...data,
				})
				.where(and(eq(zone_translation.id, zoneTranslationId), eq(zone_translation.locale, locale)))
		})

		return true
	} catch (error) {
		console.log(error)
		return false
	}
}
