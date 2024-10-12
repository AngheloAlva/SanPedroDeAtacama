"use server"

import { and, count, eq } from "drizzle-orm"
import { db } from "@/db"

import { zone_translation } from "@/db/schema/zone-translation"
import { zone } from "@/db/schema/zone"

import type { ZoneWithTranslations } from "@/types/zones"
import type { Locale } from "@/types/locales"

export const getZoneBySlug = async (
	slug: string,
	locale: Locale = "es"
): Promise<ZoneWithTranslations | null> => {
	try {
		const dbZone = await db
			.select({
				zone,
				zone_translation,
			})
			.from(zone_translation)
			.innerJoin(zone, eq(zone.id, zone_translation.zone_id))
			.where(and(eq(zone_translation.locale, locale), eq(zone.slug, slug)))

		return dbZone[0]
	} catch (error) {
		console.error(error)
		return null
	}
}

export const getZones = async (page: number = 1, pageSize: number = 10) => {
	try {
		const totalCount = await db.select({ count: count() }).from(zone)
		const totalPages = Math.ceil(totalCount[0].count / pageSize)

		const dbZones = await db
			.select()
			.from(zone)
			.limit(pageSize)
			.offset((page - 1) * pageSize)

		return {
			totalPages,
			zones: dbZones,
			totalCount: totalCount[0].count,
		}
	} catch (error) {
		console.error(error)
		return {
			zones: [],
			totalCount: 0,
			totalPages: 0,
		}
	}
}
