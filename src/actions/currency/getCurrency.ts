"use server"

import { db } from "@/db"
import { currency } from "@/db/schema/currency"

import type { CurrencyCode } from "@/types/currency"
import { eq } from "drizzle-orm"
import { updateCurrenciesFromApi } from "./updateCurrency"

export const getCurrencyValue = async (
	code: CurrencyCode
): Promise<number | { ok: false; message: string }> => {
	try {
		const dbCurrency = await db.select().from(currency).where(eq(currency.code, code))

		if (dbCurrency.length === 0) {
			return {
				ok: false,
				message: "Currency not found",
			}
		}

		const currentDate = new Date().toISOString().split("T")[0]

		if (dbCurrency[0].lastUpdate.split("T")[0] === currentDate) {
			return dbCurrency[0].value
		}

		const res = await updateCurrenciesFromApi()

		if (!res) {
			return {
				ok: false,
				message: "Error updating currency",
			}
		}

		return res[code]
	} catch (error) {
		console.error(error)

		return {
			ok: false,
			message: "Error getting currency",
		}
	}
}

export const getAllCurrenciesValues = async (): Promise<
	{ ok: false; message: string } | Record<CurrencyCode, number> | null
> => {
	try {
		const dbCurrencies = await db.select().from(currency)

		if (dbCurrencies.length === 0) {
			const res = await updateCurrenciesFromApi()

			if (!res) {
				return {
					ok: false,
					message: "Error updating currencies",
				}
			}

			return res
		}

		const currentDate = new Date().toISOString().split("T")[0]

		if (dbCurrencies.some((currency) => currency.lastUpdate.split("T")[0] !== currentDate)) {
			const res = await updateCurrenciesFromApi()

			if (!res) {
				return {
					ok: false,
					message: "Error updating currencies",
				}
			}

			return res
		}

		return dbCurrencies.reduce(
			(acc, currency) => {
				acc[currency.code as CurrencyCode] = currency.value

				return acc
			},
			{} as Record<CurrencyCode, number>
		)
	} catch (error) {
		console.error(error)

		return {
			ok: false,
			message: "Error getting currencies",
		}
	}
}
