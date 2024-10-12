import CreateProgramForm from "@/components/forms/admin/CreateProgram"

export default async function AdminCreateProgramPage(): Promise<React.ReactElement> {
	return (
		<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-6">
			<CreateProgramForm />
		</main>
	)
}
