import { getBookingById } from "@/actions/booking/getBooking"
import { notFound } from "next/navigation"

export default async function PaymentPage({
	params,
}: {
	params: { locale: string; bookingId: string }
}): Promise<React.ReactElement> {
	const data = await getBookingById(params.bookingId)

	if (data === null) {
		notFound()
	}

	const { booking, bookingItems } = data

	return (
		<main className="mx-auto flex min-h-[60vh] max-w-screen-xl flex-col gap-7 px-4 py-4 sm:px-8 md:my-12 md:flex-row xl:my-20">
			<h1 className="mb-4 text-2xl font-bold">Payment</h1>
			<div className="mb-4 rounded bg-white p-4 shadow-md">
				<h2 className="mb-2 text-xl font-semibold">Summary</h2>
				<p>Booking ID: {booking.id}</p>
				<p>
					Precio total:{" "}
					{new Intl.NumberFormat(params.locale, { style: "currency", currency: "CLP" }).format(
						Number(booking.total_price)
					)}
				</p>
			</div>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				{/* //TODO: Add payments methods */}
			</div>
		</main>
	)
}
