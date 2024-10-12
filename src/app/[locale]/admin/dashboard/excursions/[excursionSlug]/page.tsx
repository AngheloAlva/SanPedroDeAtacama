import { getExcursionBySlug } from "@/actions/excursion/getExcursions"

import UpdateAllExcursionForm from "@/components/forms/admin/UpdateAllExcursionForm"

export default async function AdminExcursionsBySlugPage({
	params: { locale, excursionSlug },
}: {
	params: { locale: string; excursionSlug: string }
}): Promise<React.ReactElement> {
	const dbExcursion = await getExcursionBySlug(excursionSlug, locale as "es")

	if (!dbExcursion) {
		return (
			<main className="grid flex-1 items-start gap-4 p-4 text-xl font-bold sm:px-6 md:gap-6">
				Excursion not found
			</main>
		)
	}

	return (
		<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-6">
			<UpdateAllExcursionForm excursion={dbExcursion} />
		</main>
	)
}
