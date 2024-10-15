"use server"

import { eq } from "drizzle-orm"
import { db } from "@/db"

import { booking } from "@/db/schema/booking"
import { payment } from "@/db/schema/payment"

export const updatePaymentStatus = async (
	bookingId: string,
	bookingStatus: "pending" | "confirmed" | "cancelled",
	paymentStatus: "pending" | "approved" | "rejected"
) => {
	try {
		await db.transaction(async (tx) => {
			await tx
				.update(payment)
				.set({ payment_status: paymentStatus, updatedAt: new Date().toISOString() })
				.where(eq(payment.booking_id, bookingId))

			await tx
				.update(booking)
				.set({ status: bookingStatus, updatedAt: new Date().toISOString() })
				.where(eq(booking.id, bookingId))
		})

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
