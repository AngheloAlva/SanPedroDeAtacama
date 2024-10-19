import AttenddesForm from "@/components/forms/general/AttendeesForm"
import StepsCard from "@/components/cart/StepsCard"

export default async function CheckoutPage(): Promise<React.ReactElement> {
	return (
		<StepsCard step={2}>
			<AttenddesForm />
		</StepsCard>
	)
}
