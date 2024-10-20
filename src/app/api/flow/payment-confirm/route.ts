import { checkFlowPayment } from "@/actions/payment/flow/checkFlowPayment"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
	const body = await request.formData()
	const token = body.get("token") as string

	const result = await checkFlowPayment(token)

	if (result.ok) {
		return NextResponse.json({ message: "Payment confirmed" })
	} else {
		return NextResponse.json({ error: result.message }, { status: 400 })
	}
}
