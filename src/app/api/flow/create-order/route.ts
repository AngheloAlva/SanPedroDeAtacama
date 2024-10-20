import { NextResponse } from "next/server"
import { FlowApi } from "@/lib/flowApi"

const config = {
	apiKey: process.env.FLOW_API_KEY!,
	secretKey: process.env.FLOW_SECRET_KEY!,
	apiURL: process.env.FLOW_API_URL!,
	baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
}

export async function POST(request: Request) {
	try {
		const optional = {
			rut: "9999999-9",
			otroDato: "otroDato",
		}
		// Prepara el arreglo de datos
		const params = {
			commerceOrder: Math.floor(Math.random() * (2000 - 1100 + 1)) + 1100,
			subject: "Pago de prueba",
			currency: "CLP",
			amount: 5000,
			email: "efuentealba@json.cl",
			paymentMethod: 9,
			urlConfirmation: config.baseURL + "/api/flow/payment-confirm",
			urlReturn: config.baseURL + "/api/flow/result",
			...optional,
		}
		// Define el metodo a usar
		const serviceName = "payment/create"

		// Instancia la clase FlowApi
		const flowApi = new FlowApi(config)
		// Ejecuta el servicio

		const response = await flowApi.send(serviceName, params, "POST")

		//Prepara url para redireccionar el browser del pagador
		const redirect = response.url + "?token=" + response.token
		return NextResponse.json({
			redirect,
		})
	} catch (error) {
		return NextResponse.json({ error: (error as Error).message })
	}
}
