import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"

export default function NotFoundPage() {
	const t = useTranslations("NotFound")
	return (
		<main className="flex h-[80vh] flex-col items-center justify-center gap-2 px-4 sm:px-6 md:gap-4 md:px-10">
			<h1 className="text-center text-2xl font-extrabold md:text-4xl">{t("hero.title")}</h1>
			<p className="max-w-prose text-pretty text-center font-medium md:text-lg">
				{t("hero.description")}
			</p>

			<Link
				href="/"
				className="text-primary-500 mt-4 rounded-lg border px-4 py-2 shadow-sm transition-all hover:bg-black/10 hover:shadow-md md:px-6 md:py-3 md:text-lg"
			>
				{t("hero.button")}
			</Link>
		</main>
	)
}
