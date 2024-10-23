import { createSharedPathnamesNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"
import { pathnames } from "../config/pathnames"

export const locales = ["en", "es", "fr", "pt"]
export const defaultLocale = "es"

export const routing = defineRouting({
	defaultLocale,
	pathnames,
	locales,
})

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation(routing)
