import { getTranslations } from "next-intl/server"
import { useTranslations } from "next-intl"

import AllServices from "@/components/sections/services/AllServices"
import Hero from "@/components/shared/general/Hero"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
	const t = await getTranslations({ locale, namespace: "Services" })

	return {
		title: t("title"),
		description: t("description"),
	}
}

export default function ServicesPage(): React.ReactElement {
	const t = useTranslations("Services")

	return (
		<main>
			<Hero
				title={t("hero.title")}
				imageAlt={t("hero.imageAlt")}
				description={t("hero.description")}
				image="/v1725570024/hero_u7v4uu.jpg"
			/>

			<AllServices />
		</main>
	)
}
