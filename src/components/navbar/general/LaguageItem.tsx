import { Link } from "@/i18n/routing"

import type { Params } from "next/dist/shared/lib/router/utils/route-matcher"

export default function LanguageItem({
	icon,
	href,
	params,
	locale,
	language,
}: IconProps): React.ReactElement {
	const hrefObject = params ? { pathname: href, params } : href

	return (
		<Link
			locale={locale}
			href={hrefObject}
			title="Mudar idioma para Português"
			className="flex h-full w-full cursor-pointer items-center space-x-1 px-3 py-[.35rem] text-sm font-medium sm:space-x-2 sm:py-2 sm:text-base"
		>
			{icon}
			<span>{language}</span>
		</Link>
	)
}

interface IconProps {
	href: string
	language: string
	icon: React.ReactElement
	params?: Params
	locale: "es" | "en" | "fr" | "pt"
}
