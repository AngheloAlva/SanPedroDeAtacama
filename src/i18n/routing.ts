import { createSharedPathnamesNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"
import { pathnames } from "../config/pathnames"

export const routing = defineRouting({
	locales: ["en", "es", "fr", "pt"],
	defaultLocale: "es",
	pathnames,
})

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation(routing)
