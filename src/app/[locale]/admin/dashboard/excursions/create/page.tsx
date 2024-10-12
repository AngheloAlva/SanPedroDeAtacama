import { getZones } from "@/actions/zone/getZones"

import CreateExcursionForm from "@/components/forms/admin/CreateExcursion"

export default async function AdminCreateExcursionForm(): Promise<React.ReactElement> {
	const zones = await getZones()

	return (
		<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-6">
			<CreateExcursionForm zones={zones.zones} />
		</main>
	)
}
