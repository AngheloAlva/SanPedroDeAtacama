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
		const body = await request.json()
		const params = {
			token: body.token,
		}
		const serviceName = "payment/getStatus"
		const flowApi = new FlowApi(config)
		const response = await flowApi.send(serviceName, params, "GET")
		//Actualiza los datos en su sistema
		// console.log(response);
		return NextResponse.json(response)
	} catch (error) {
		return NextResponse.json({ error })
	}
}
