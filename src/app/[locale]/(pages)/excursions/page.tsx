import { getExcursionsWithTranslations } from "@/actions/excursion/getExcursions"

import ExcursionsSection from "@/components/excursions/general/ExcursionsSection"
import ExcursionsHero from "@/components/excursions/general/ExcursionsHero"

import type { Locale } from "@/types/locales"

export default async function ExcursionsPage({
	params,
}: {
	params: { locale: string }
}): Promise<React.ReactElement> {
	const { excursions } = await getExcursionsWithTranslations(params.locale as Locale, 1, 10)

	return (
		<main>
			<ExcursionsHero />

			<ExcursionsSection excursions={excursions} />
		</main>
	)
}
