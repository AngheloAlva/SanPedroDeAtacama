import AttenddesForm from "@/components/forms/general/AttendeesForm"

export default async function CheckoutPage(): Promise<React.ReactElement> {
	return (
		<main className="mx-auto flex min-h-[60vh] max-w-screen-xl flex-col gap-7 px-4 py-4 sm:px-8 md:my-12 md:flex-row xl:my-20">
			<AttenddesForm />
		</main>
	)
}
