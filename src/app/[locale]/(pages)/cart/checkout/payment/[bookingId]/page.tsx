import { getBookingById } from "@/actions/booking/getBooking"
import { notFound } from "next/navigation"
import { cn } from "@/lib/utils"

import PaymentSelector from "@/components/sections/payment/PaymentSelector"
import StepsCard from "@/components/cart/StepsCard"
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
		<StepsCard step={3}>
			<div className="flex w-full flex-col gap-4 sm:mt-4 md:mt-6">
				<div className="flex flex-wrap items-center justify-between gap-x-2">
					<h1 className="text-2xl font-bold">Pago de reserva</h1>
					<Badge
						className={cn(
							"h-fit",
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

				{booking.status !== "confirmed" && (
					<PaymentSelector booking={booking} bookingItems={bookingItems} />
				)}
			</div>
		</StepsCard>
	)
}
