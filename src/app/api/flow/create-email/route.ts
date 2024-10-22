import { NextResponse } from "next/server"
import { FlowApi } from "@/lib/flowApi"

const config = {
	apiKey: process.env.FLOW_API_KEY!,
	secretKey: process.env.FLOW_SECRET_KEY!,
	apiURL: process.env.FLOW_API_URL!,
	baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
}

export async function POST() {
	//Prepara los parámetros
	const params = {
		commerceOrder: Math.floor(Math.random() * (2000 - 1100 + 1)) + 1100,
		subject: "pago prueba cobro Email",
		currency: "CLP",
		amount: 2000,
		email: "efuentealba@json.cl",
		paymentMethod: 9,
		urlConfirmation: config.baseURL + "/api/flow/payment-confirm",
		urlReturn: config.baseURL + "/api/flow/result",
		forward_days_after: 1,
		forward_times: 2,
	}
	const serviceName = "payment/createEmail"
	try {
		const flowApi = new FlowApi(config)

		const response = await flowApi.send(serviceName, params, "POST")

		return NextResponse.json({
			response,
		})
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: error })
	}
}
