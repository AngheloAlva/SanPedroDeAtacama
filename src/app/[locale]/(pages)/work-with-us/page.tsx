import { getTranslations } from "next-intl/server"
import { useTranslations } from "next-intl"

import WorkWithUsForm from "@/components/forms/general/WorkWithUsForm"
import DotBackground from "@/components/shared/general/DotBackground"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
	const t = await getTranslations({ locale, namespace: "WorkWithUsPage" })

	return {
		title: t("title"),
		description: t("description"),
	}
}

export default function WorkWithUsPage(): React.ReactElement {
	const t = useTranslations("WorkWithUsPage")

	return (
		<DotBackground spacing={40}>
			<main className="py-14 sm:px-4">
				<section className="mx-auto mb-2 flex flex-col items-center text-center drop-shadow-sm sm:mb-6 md:mb-10 lg:mb-14">
					<h1 className="w-full rounded-t-lg px-4 py-2 text-4xl font-bold sm:rounded-lg sm:py-3 sm:text-5xl">
						{t("hero.title")}
					</h1>
					<p className="mx-auto max-w-lg text-pretty rounded-b-lg py-2 sm:py-3">
						{t("hero.description")}
					</p>
				</section>

				<WorkWithUsForm />
			</main>
		</DotBackground>
	)
}
