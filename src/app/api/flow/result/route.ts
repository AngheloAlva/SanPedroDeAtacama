import { checkFlowPayment } from "@/actions/payment/flow/checkFlowPayment"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
	const body = await request.formData()
	const token = body.get("token") as string

	const result = await checkFlowPayment(token)

	if (result.ok) {
		// Redirige al usuario a una página de éxito
		return NextResponse.redirect("/payment/success")
	} else {
		// Redirige al usuario a una página de error
		return NextResponse.redirect("/payment/error")
	}
}
