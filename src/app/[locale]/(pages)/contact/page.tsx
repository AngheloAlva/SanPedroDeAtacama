import { getTranslations } from "next-intl/server"

import ContactSection from "@/components/sections/contact/ContactSection"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
	const t = await getTranslations({ locale, namespace: "ContactPage" })

	return {
		title: t("title"),
		description: t("description"),
	}
}

export default function ContactPage(): React.ReactElement {
	return (
		<main className="overflow-hidden">
			<ContactSection />
		</main>
	)
}
