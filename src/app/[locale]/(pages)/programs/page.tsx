import { getProgramsWithTranslations } from "@/actions/program/getPrograms"

import ProgramsSection from "@/components/programs/general/ProgramsSection"
import ProgramsHero from "@/components/programs/general/ProgramsHero"

import type { Locale } from "@/types/locales"

export default async function ProgramsPage({
	params,
}: {
	params: { locale: string }
}): Promise<React.ReactElement> {
	const { programs } = await getProgramsWithTranslations(params.locale as Locale, 1, 10)

	return (
		<main>
			<ProgramsHero />

			<ProgramsSection programs={programs} />
		</main>
	)
}
