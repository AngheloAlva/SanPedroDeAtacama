import { getBookingById } from "@/actions/booking/getBooking"

export default async function AdminOrdersByIdPage({
	params: { orderId },
}: {
	params: { locale: string; orderId: string }
}): Promise<React.ReactElement> {
	const dbZone = await getBookingById(orderId)

	if (!dbZone) {
		return (
			<main className="grid flex-1 items-start gap-4 p-4 text-xl font-bold sm:px-6 md:gap-6">
				Booking not found
			</main>
		)
	}

	return (
		<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-6">
			{dbZone.bookingItems.map((item) => (
				<div key={item.id}>
					<p>{item.name}</p>
					<p>{item.price}</p>
				</div>
			))}
		</main>
	)
}
