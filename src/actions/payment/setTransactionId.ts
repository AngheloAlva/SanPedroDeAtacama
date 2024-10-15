"use server"

import { db } from "@/db"
import { payment } from "@/db/schema/payment"
import { eq } from "drizzle-orm"

export const setTransactionId = async (bookingId: string, transactionId: string) => {
	try {
		const dbPayment = await db
			.update(payment)
			.set({ transaction_id: transactionId })
			.where(eq(payment.booking_id, bookingId))
			.returning()

		if (dbPayment.length === 0) throw new Error("Payment not found")

		return {
			ok: true,
		}
	} catch (error) {
		console.log(error)

		return {
			ok: false,
		}
	}
}
