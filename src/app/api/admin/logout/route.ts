import { NextResponse } from "next/server"
import { removeLoginSession } from "@/lib/auth"

export async function POST() {
	removeLoginSession()
	return NextResponse.json({ success: true })
}
