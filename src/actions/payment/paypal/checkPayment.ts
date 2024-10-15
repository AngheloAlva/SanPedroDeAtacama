"use server"

import { revalidatePath } from "next/cache"
import { updatePaymentStatus } from "../updatePaymentStatus"

import type { PayPalOrderStatusResponse } from "@/types/paypal"

export const paypalCheckPayment = async (transactionId: string) => {
	try {
		const authToken = await getPaypalBearerToken()
		console.log(authToken)

		if (!authToken) {
			throw new Error("Error getting PayPal bearer token")
		}

		const response = await verifyPaypalPayment(transactionId, authToken)

		if (!response) {
			throw new Error("Error verifying PayPal payment")
		}

		const { status, purchase_units } = response

		if (status !== "COMPLETED") {
			return {
				ok: false,
				message: "Payment with Paypal not completed",
			}
		}

		const invoiceId = purchase_units[0].invoice_id

		updatePaymentStatus(invoiceId, "confirmed", "approved")

		revalidatePath("/cart/checkout/payment/[bookingId]")
	} catch (error) {
		console.log(error)

		return {
			ok: false,
			message: "Error checking payment",
		}
	}
}

const getPaypalBearerToken = async (): Promise<string | null> => {
	const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
	const PAYPAL_SECRET = process.env.PAYPAL_SECRET
	const OAUTH_URL = process.env.PAYPAL_OAUTH_URL ?? ""

	const base64token = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`, "utf-8").toString(
		"base64"
	)
	const myHeaders = new Headers()

	myHeaders.append("Content-Type", "application/x-www-form-urlencoded")
	myHeaders.append("Authorization", `Basic ${base64token}`)

	const urlencoded = new URLSearchParams()
	urlencoded.append("grant_type", "client_credentials")

	const requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: urlencoded,
	}

	try {
		const result = await fetch(OAUTH_URL, { ...requestOptions, cache: "no-store" }).then((res) =>
			res.json()
		)
		return result.access_token
	} catch (error) {
		console.log(error)
		return null
	}
}

const verifyPaypalPayment = async (
	paypalTransactionId: string,
	bearerToken: string
): Promise<PayPalOrderStatusResponse | null> => {
	const PAYPAL_ORDERS_URL = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`

	const myHeaders = new Headers()
	myHeaders.append("Authorization", `Bearer ${bearerToken}`)

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow" as RequestRedirect,
	}

	try {
		const response = await fetch(PAYPAL_ORDERS_URL, { ...requestOptions, cache: "no-store" }).then(
			(res) => res.json()
		)
		return response
	} catch (error) {
		console.log(error)
		return null
	}
}
