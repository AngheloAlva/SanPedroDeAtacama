import AboutUsSection from "@/components/sections/about-us/AboutUsSection"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
	const t = await getTranslations({ locale, namespace: "AboutUs.our-team" })

	return {
		title: t("title"),
		description: t("description"),
	}
}

export default function OurHistoryPage(): React.ReactElement {
	return (
		<main className="mx-auto mb-24">
			<AboutUsSection />
		</main>
	)
}
