"use server"

import { CurrencyCode } from "@/types/currency"
import { db } from "../../db/index"
import { currency } from "@/db/schema/currency"

export const createCurrency = async (code: CurrencyCode) => {
	try {
		await db.insert(currency).values({ code, value: 0 })

		return {
			ok: true,
			message: "Currency created",
		}
	} catch (error) {
		console.error(error)

		return {
			ok: false,
			message: "Error creating currency",
		}
	}
}
