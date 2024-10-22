import { getBookingById } from "@/actions/booking/getBooking"
import { notFound } from "next/navigation"
import { cn } from "@/lib/utils"

import PaymentSelector from "@/components/sections/payment/PaymentSelector"
import StepsCard from "@/components/cart/StepsCard"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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
							booking.status === "pending" && "bg-yellow hover:bg-yellow",
							booking.status === "confirmed" && "bg-green hover:bg-green",
							booking.status === "cancelled" && "bg-red-400 hover:bg-red-400"
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

				{booking.status === "confirmed" && (
					<div className="my-14 text-center">
						<h2 className="text-xl font-bold md:text-2xl">¡Reserva confirmada!</h2>
						<p className="mx-auto max-w-md md:text-lg">
							¡Gracias por confiar en nosotros! Pronto recibirás un correo con los detalles de tu
							reserva.
						</p>

						<Link href={"/"} passHref>
							<Button className="mt-6 bg-orange hover:bg-orange hover:brightness-90">
								Volver a la página principal
							</Button>
						</Link>
					</div>
				)}

				{booking.status === "cancelled" && (
					<div className="my-14 text-center">
						<h2 className="text-xl font-bold md:text-2xl">¡Reserva cancelada!</h2>
						<p className="mx-auto max-w-md md:text-lg">
							¡Lo sentimos! Tu reserva ha sido cancelada. Si tienes alguna duda, por favor contacta
							con nosotros.
						</p>

						<Link href={"/"} passHref>
							<Button className="mt-6 bg-orange hover:bg-orange hover:brightness-90">
								Volver a la página principal
							</Button>
						</Link>
					</div>
				)}
			</div>
		</StepsCard>
	)
}
