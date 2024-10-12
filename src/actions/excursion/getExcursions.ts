"use server"

import { and, count, eq } from "drizzle-orm"
import { db } from "@/db"

import { excursion_translation } from "@/db/schema/excursion-translation"
import { excursion } from "@/db/schema/excursion"

import type { ExcursionWithTranslation } from "@/types/excursions"
import type { Locale } from "@/types/locales"

export const getExcursionsWithTranslations = async (
	locale: Locale = "es",
	page: number = 1,
	pageSize: number = 10
): Promise<{ excursions: ExcursionWithTranslation[]; totalCount: number; totalPages: number }> => {
	try {
		const totalCount = await db.select({ count: count() }).from(excursion)
		const totalPages = Math.ceil(totalCount[0].count / pageSize)

		const excursions = await db
			.select({
				excursion,
				excursion_translation,
			})
			.from(excursion_translation)
			.innerJoin(excursion, eq(excursion.id, excursion_translation.excursion_id))
			.where(eq(excursion_translation.locale, locale))
			.limit(pageSize)
			.offset((page - 1) * pageSize)

		return {
			excursions: excursions as unknown as ExcursionWithTranslation[],
			totalCount: totalCount[0].count,
			totalPages,
		}
	} catch (error) {
		console.error(error)
		return {
			excursions: [],
			totalPages: 0,
			totalCount: 0,
		}
	}
}

export const getExcursionBySlug = async (
	slug: string,
	locale: Locale = "es"
): Promise<ExcursionWithTranslation | null> => {
	try {
		const dbExcursion = await db
			.select({
				excursion,
				excursion_translation,
			})
			.from(excursion_translation)
			.innerJoin(excursion, eq(excursion.id, excursion_translation.excursion_id))
			.where(and(eq(excursion_translation.locale, locale), eq(excursion.slug, slug)))

		return dbExcursion[0]
	} catch (error) {
		console.error(error)
		return null
	}
}

export const getExcursions = async (page: number = 1, pageSize: number = 10) => {
	try {
		const totalCount = await db.select({ count: count() }).from(excursion)
		const totalPages = Math.ceil(totalCount[0].count / pageSize)

		const excursions = await db
			.select()
			.from(excursion)
			.limit(pageSize)
			.offset((page - 1) * pageSize)

		return {
			excursions,
			totalPages,
			totalCount: totalCount[0].count,
		}
	} catch (error) {
		console.error(error)
		return {
			excursions: [],
			totalPages: 0,
			totalCount: 0,
		}
	}
}
