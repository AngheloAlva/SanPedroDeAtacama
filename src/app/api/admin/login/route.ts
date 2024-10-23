import { NextRequest, NextResponse } from "next/server"
import { isValidCredentials, setLoginSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
	const body = await request.json()
	const { username, password } = body

	if (isValidCredentials(username, password)) {
		await setLoginSession(username)
		return NextResponse.json({ success: true })
	} else {
		return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
	}
}
