import { getZoneBySlug } from "@/actions/zone/getZones"

import UpdateAllZoneForm from "@/components/forms/admin/UpdateAllZoneForm"

export default async function AdminZoneBySlugPage({
	params: { locale, zoneSlug },
}: {
	params: { locale: string; zoneSlug: string }
}): Promise<React.ReactElement> {
	const dbZone = await getZoneBySlug(zoneSlug, locale as "es")

	if (!dbZone) {
		return (
			<main className="grid flex-1 items-start gap-4 p-4 text-xl font-bold sm:px-6 md:gap-6">
				Zone not found
			</main>
		)
	}

	return (
		<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-6">
			<UpdateAllZoneForm zone={dbZone} />
		</main>
	)
}
