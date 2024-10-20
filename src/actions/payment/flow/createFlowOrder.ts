"use server"

import { FlowApi } from "@/lib/flowApi"

const config = {
	apiKey: process.env.FLOW_API_KEY!,
	secretKey: process.env.FLOW_SECRET_KEY!,
	apiURL: process.env.FLOW_API_URL!,
}

export const createFlowOrder = async (bookingId: string, amount: number, userEmail: string) => {
	try {
		const flowApi = new FlowApi(config)
		const params = {
			commerceOrder: bookingId,
			subject: "Pago de reserva",
			currency: "CLP",
			amount: amount,
			email: userEmail,
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
