import { getExcursionsWithTranslations } from "@/actions/excursion/getExcursions";
import { getProgramBySlug } from "@/actions/program/getPrograms"

import UpdateAllProgramForm from "@/components/forms/admin/UpdateAllProgramForm"

export default async function AdminExcursionsBySlugPage({
	params: { locale, programSlug },
}: {
	params: { locale: string; programSlug: string }
}): Promise<React.ReactElement> {
	const [excursions, dbProgram] = await Promise.all([
		getExcursionsWithTranslations(),
		getProgramBySlug(programSlug, locale as "es"),
	])

	if (!dbProgram) {
		return (
			<main className="grid flex-1 items-start gap-4 p-4 text-xl font-bold sm:px-6 md:gap-6">
				Program not found
			</main>
		)
	}

	return (
		<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-6">
			<UpdateAllProgramForm program={dbProgram} locale={locale} excursions={excursions.excursions} />
		</main>
	)
}
