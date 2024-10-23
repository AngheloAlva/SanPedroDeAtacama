import { getBookingById } from "@/actions/booking/getBooking"

export default async function AdminOrdersByIdPage({
	params: { orderId },
}: {
	params: { locale: string; orderId: string }
}): Promise<React.ReactElement> {
	const dbBooking = await getBookingById(orderId)

	if (!dbBooking) {
		return (
			<main className="grid flex-1 items-start gap-4 p-4 text-xl font-bold sm:px-6 md:gap-6">
				Booking not found
			</main>
		)
	}

	return (
		<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-6">
			{dbBooking.bookingItems.map((item) => (
				<div key={item.id}>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div className="text-lg font-bold">{item.excursion_name}</div>
							<div className="text-sm text-gray-500">{item.id}</div>
						</div>
						<div className="text-lg font-bold">CLP ${item.price}</div>
					</div>
					<div className="grid gap-4 rounded-lg bg-neutral-100 p-4">
						{Object.entries(item).map(([key, value]) => (
							<div key={key} className="flex justify-between">
								<div>{key}</div>
								<div>{value}</div>
							</div>
						))}
					</div>
				</div>
			))}
		</main>
	)
}
