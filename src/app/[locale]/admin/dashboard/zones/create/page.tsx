import CreateZoneForm from "@/components/forms/admin/CreateZone"

export default async function AdminCreateZonePage(): Promise<React.ReactElement> {
	return (
		<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-6">
			<CreateZoneForm />
		</main>
	)
}
