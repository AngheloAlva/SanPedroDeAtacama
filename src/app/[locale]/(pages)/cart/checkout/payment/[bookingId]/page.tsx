import { getBookingById } from "@/actions/booking/getBooking"
import { notFound } from "next/navigation"
import { cn } from "@/lib/utils"

import PaymentSection from "@/components/sections/payment/PaymentSection"
import { Badge } from "@/components/ui/badge"

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
		<main className="mx-auto min-h-[60vh] max-w-screen-xl gap-7 px-4 py-12 sm:px-8 md:my-12 xl:my-20">
			<h1 className="mb-4 text-2xl font-bold">Payment</h1>

			<div className="flex flex-col gap-4 rounded bg-white p-4 shadow-md">
				<div className="flex flex-wrap justify-between gap-x-2">
					<h2 className="text-xl font-semibold">Summary</h2>

					<Badge
						className={cn(
							"mb-4",
							booking.status === "pending" && "bg-yellow",
							booking.status === "confirmed" && "bg-green",
							booking.status === "cancelled" && "bg-red-400"
						)}
					>
						{booking.status === "pending"
							? "Pending"
							: booking.status === "confirmed"
								? "Confirmed"
								: "Cancelled"}
					</Badge>
				</div>

				<p className="flex flex-col">
					<strong className="font-semibold">ID de reserva: </strong> {booking.id}
				</p>
				<p className="flex flex-col">
					<strong className="font-semibold">Precio total: </strong>
					{new Intl.NumberFormat(params.locale, { style: "currency", currency: "CLP" }).format(
						Number(booking.total_price)
					)}
				</p>
				{bookingItems.length > 0 && (
					<div className="flex flex-col">
						<strong className="font-semibold">Items: </strong>
						<div className="grid gap-2">
							{bookingItems.map((item) => (
								<ul key={item.id}>
									<li>{item?.name}</li>
									<li>{item?.price}</li>
									<li>{item?.people_count}</li>
									<li>{new Date(item.date).toLocaleDateString(params.locale)}</li>
								</ul>
							))}
						</div>
					</div>
				)}
			</div>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				{booking.status !== "confirmed" && (
					<PaymentSection bookingItems={bookingItems} bookingId={booking.id} />
				)}
			</div>
		</main>
	)
}
