"use server"

import { and, count, eq } from "drizzle-orm"
import { db } from "@/db"

import { program_translation } from "@/db/schema/program-translation"
import { program } from "@/db/schema/program"

import type { ProgramWithTranslations } from "@/types/programs"
import type { Locale } from "@/types/locales"

export const getProgramsWithTranslations = async (
	locale: Locale = "es",
	page: number = 1,
	pageSize: number = 10
): Promise<{ programs: ProgramWithTranslations[]; totalCount: number; totalPages: number }> => {
	try {
		const totalCount = await db.select({ count: count() }).from(program)
		const totalPages = Math.ceil(totalCount[0].count / pageSize)

		const programs = await db
			.select({
				program,
				program_translation,
			})
			.from(program_translation)
			.leftJoin(program, eq(program.id, program_translation.program_id))
			.where(eq(program_translation.locale, locale))
			.limit(pageSize)
			.offset((page - 1) * pageSize)

		return {
			programs: programs as unknown as ProgramWithTranslations[],
			totalCount: totalCount[0].count,
			totalPages,
		}
	} catch (error) {
		console.error(error)
		return {
			programs: [],
			totalPages: 0,
			totalCount: 0,
		}
	}
}

export const getProgramBySlug = async (
	slug: string,
	locale: Locale = "es"
): Promise<ProgramWithTranslations> => {
	try {
		const dbProgram = await db
			.select({
				program,
				program_translation,
			})
			.from(program_translation)
			.leftJoin(program, eq(program.id, program_translation.program_id))
			.where(and(eq(program_translation.locale, locale), eq(program.slug, slug)))

		return dbProgram[0]
	} catch (error) {
		console.error(error)
		return {
			program: null,
			program_translation: null,
		}
	}
}

export const getPrograms = async (page: number = 1, pageSize: number = 10) => {
	try {
		const totalCount = await db.select({ count: count() }).from(program)
		const totalPages = Math.ceil(totalCount[0].count / pageSize)

		const programs = await db
			.select()
			.from(program)
			.limit(pageSize)
			.offset((page - 1) * pageSize)

		return {
			programs,
			totalPages,
			totalCount: totalCount[0].count,
		}
	} catch (error) {
		console.error(error)
		return {
			programs: [],
			totalPages: 0,
			totalCount: 0,
		}
	}
}
