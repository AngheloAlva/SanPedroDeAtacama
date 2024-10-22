"use server"

import { db } from "@/db"
import { booking } from "@/db/schema/booking"
import { paymentMethodsTax } from "@/lib/consts/paymentMethodsTax"
import { FlowApi } from "@/lib/flowApi"
import { eq } from "drizzle-orm"

const config = {
	apiKey: process.env.FLOW_API_KEY!,
	secretKey: process.env.FLOW_SECRET_KEY!,
	apiURL: process.env.FLOW_API_URL!,
}

export const createFlowOrder = async (bookingId: string, amount: number, userEmail: string) => {
	try {
		const flowApi = new FlowApi(config)

		const [dbBooking] = await db.select().from(booking).where(eq(booking.id, bookingId))

		if (!dbBooking || dbBooking.total_price_clp !== amount) {
			throw new Error("Booking not found")
		}

		const amountWithTax = (
			dbBooking.total_price_clp +
			dbBooking.total_price_clp * paymentMethodsTax.flow
		).toFixed(2)

		const params = {
			commerceOrder: bookingId,
			currency: "CLP",
			email: userEmail,
			amount: amountWithTax,
			subject: "Pago de reserva",
			urlConfirmation: `${process.env.NEXT_PUBLIC_BASE_URL}/api/flow/payment-confirm`,
			urlReturn: `${process.env.NEXT_PUBLIC_BASE_URL}/api/flow/result`,
			optional: JSON.stringify({ bookingId }),
		}

		const response = await flowApi.send("payment/create", params, "POST")

		if (response.url && response.token) {
			return {
				ok: true,
				redirect: `${response.url}?token=${response.token}`,
			}
		} else {
			throw new Error("Invalid response from Flow API")
		}
	} catch (error) {
		console.error("Error creating Flow order:", error)
		return {
			ok: false,
			message: "Error creating Flow order",
		}
	}
}
