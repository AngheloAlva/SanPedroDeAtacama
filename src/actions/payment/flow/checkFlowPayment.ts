"use server"

import { updatePaymentStatus } from "../updatePaymentStatus"
import { revalidatePath } from "next/cache"
import { FlowApi } from "@/lib/flowApi"

const config = {
	apiKey: process.env.FLOW_API_KEY!,
	secretKey: process.env.FLOW_SECRET_KEY!,
	apiURL: process.env.FLOW_API_URL!,
}

export const checkFlowPayment = async (token: string) => {
	try {
		const flowApi = new FlowApi(config)
		const params = { token }
		const response = await flowApi.send("payment/getStatus", params, "GET")

		if (response.status === 2) {
			// 2 significa pago aprobado en Flow
			await updatePaymentStatus(response.commerceOrder, "confirmed", "approved")
			revalidatePath("/cart/checkout/payment/[bookingId]")
			return {
				ok: true,
				message: "Payment confirmed",
			}
		} else {
			return {
				ok: false,
				message: "Payment not completed",
			}
		}
	} catch (error) {
		console.error("Error checking Flow payment:", error)
		return {
			ok: false,
			message: "Error checking payment",
		}
	}
}
