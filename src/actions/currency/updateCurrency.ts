"use server"

import { eq } from "drizzle-orm"
import { db } from "@/db"

import { currency } from "@/db/schema/currency"

import type { OpenExchangeRatesResponse } from "../../types/currency"
import type { CurrencyCode } from "@/types/currency"

const CURRENCY_CODES: CurrencyCode[] = ["USD", "CLP", "BRL"]

export const updateCurrency = async (code: CurrencyCode, value: number): Promise<boolean> => {
	try {
		await db
			.update(currency)
			.set({
				value,
				lastUpdate: new Date().toISOString(),
			})
			.where(eq(currency.code, code))

		return true
	} catch (error) {
		console.error(error)

		return false
	}
}

export const updateCurrenciesFromApi = async (): Promise<Record<CurrencyCode, number> | null> => {
	try {
		const res = await fetch(
			`https://openexchangerates.org/api/latest.json?app_id=${process.env.OPENEXCHANGERATES_API_KEY}`
		)
		const data = (await res.json()) as OpenExchangeRatesResponse

		if (!data.rates) {
			return null
		}

		const updatedRates: Record<CurrencyCode, number> = {} as Record<CurrencyCode, number>

		for (const code of CURRENCY_CODES) {
			if (data.rates[code]) {
				await updateCurrency(code, data.rates[code])
				updatedRates[code] = data.rates[code]
			}
		}

		return updatedRates
	} catch (error) {
		console.error(error)

		return null
	}
}
