import { cookies } from "next/headers"
import * as jose from "jose"
import { ADMIN_USERNAME, ADMIN_PASSWORD } from "./adminConfig"

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

export async function setLoginSession(username: string) {
	const token = await new jose.SignJWT({ username })
		.setProtectedHeader({ alg: "HS256" })
		.setExpirationTime("1h")
		.sign(SECRET)

	cookies().set("auth", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		sameSite: "strict",
		maxAge: 3600,
		path: "/",
	})
}

export function removeLoginSession() {
	cookies().delete("auth")
}

export async function getLoginSession(request: Request) {
	const token = request.headers
		.get("cookie")
		?.split("; ")
		.find((row) => row.startsWith("auth="))
		?.split("=")[1]
	if (!token) return null

	try {
		const { payload } = await jose.jwtVerify(token, SECRET)
		return payload
	} catch (error) {
		console.error(error)
		return null
	}
}

export function isValidCredentials(username: string, password: string) {
	return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}
