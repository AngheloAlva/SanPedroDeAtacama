import { getTranslations } from "next-intl/server"
import { useTranslations } from "next-intl"

import FaqAccordion from "@/components/sections/faq/FaqAccordion"
import Hero from "@/components/shared/general/Hero"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
	const t = await getTranslations({ locale, namespace: "FaqPage" })

	return {
		title: t("title"),
		description: t("description"),
	}
}

export default function FaqPage(): React.ReactElement {
	const t = useTranslations("FaqPage")

	return (
		<main className="mb-12">
			<Hero
				title={t("hero.title")}
				imageAlt={t("hero.imageAlt")}
				description={t("hero.description")}
				image="/v1725490284/hero_jkadof.jpg"
			/>

			<FaqAccordion />
		</main>
	)
}
