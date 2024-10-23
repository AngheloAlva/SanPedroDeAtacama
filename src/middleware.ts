import createIntlMiddleware from "next-intl/middleware"
import { getLoginSession } from "./lib/auth"
import { NextResponse } from "next/server"
import { routing } from "./i18n/routing"

import type { NextRequest } from "next/server"

const intlMiddleware = createIntlMiddleware(routing)

async function withAuth(request: NextRequest) {
	const session = await getLoginSession(request)
	const pathname = request.nextUrl.pathname

	if (pathname.includes("/admin") && !session && !pathname.endsWith("/login")) {
		const locale = request.nextUrl.pathname.split("/")[1]
		return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url))
	}

	return intlMiddleware(request)
}

export default async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname

	let response = await intlMiddleware(request)

	if (!pathname.includes("/admin")) {
		return response
	}

	return (response = await withAuth(request))
}

export const config = {
	matcher: ["/", "/(es|en|fr|pt)/:path*"],
}
