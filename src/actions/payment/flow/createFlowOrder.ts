"use server"

import { eq } from "drizzle-orm"
import { db } from "@/db"

import { booking } from "@/db/schema/booking"

import type { FlowParams } from "@/types/flow"

export const createFlowOrder = async (bookingId: string) => {
	try {
		const [dbBooking] = await db.select().from(booking).where(eq(booking.id, bookingId))

		if (!dbBooking) {
			throw new Error("Booking not found")
		}

		const params: FlowParams = {
			commerceOrder: dbBooking.id,
			subject: "Prueba de pago con Flow",
			currency: "CLP",
			amount: dbBooking.total_price,
			email: dbBooking.email,
			paymentMethod: 9,
			urlConfirmation: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/flow/confirm`,
			urlReturn: `${process.env.NEXT_PUBLIC_BASE_URL}/cart/checkout/payment/${dbBooking.id}`,
		}
	} catch (error) {
		console.log(error)
	}
}
