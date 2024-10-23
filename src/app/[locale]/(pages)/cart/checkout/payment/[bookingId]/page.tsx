import { getBookingById } from "@/actions/booking/getBooking"
import { notFound } from "next/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"

import PaymentSelector from "@/components/sections/payment/PaymentSelector"
import StepsCard from "@/components/cart/StepsCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import type { Locale } from "@/types/locales"
import { getTranslations } from "next-intl/server"

export default async function PaymentPage({
	params,
}: {
	params: { locale: string; bookingId: string }
}): Promise<React.ReactElement> {
	const data = await getBookingById(params.bookingId)
	const t = await getTranslations("PaymentPage.payment")

	if (data === null) {
		notFound()
	}

	const { booking, bookingItems } = data

	return (
		<StepsCard step={3}>
			<div className="flex w-full flex-col gap-4 sm:mt-4 md:mt-6">
				<div className="flex flex-wrap items-center justify-between gap-x-2">
					<h1 className="text-2xl font-bold">{t("title")}</h1>
					<Badge
						className={cn(
							"h-fit",
							booking.status === "pending" && "bg-yellow hover:bg-yellow",
							booking.status === "confirmed" && "bg-green hover:bg-green",
							booking.status === "cancelled" && "bg-red-400 hover:bg-red-400"
						)}
					>
						{booking.status === "pending"
							? t("status.pending")
							: booking.status === "confirmed"
								? t("status.confirmed")
								: t("status.cancelled")}
					</Badge>
				</div>

				{booking.status === "pending" && (
					<PaymentSelector
						booking={booking}
						bookingItems={bookingItems}
						locale={params.locale as Locale}
					/>
				)}

				{booking.status === "confirmed" && (
					<div className="my-14 text-center">
						<h2 className="text-xl font-bold md:text-2xl">{t("confirmed.title")}</h2>
						<p className="mx-auto max-w-md md:text-lg">{t("confirmed.description")}</p>

						<Link href={"/"} passHref>
							<Button className="mt-6 bg-orange hover:bg-orange hover:brightness-90">
								{t("confirmed.button")}
							</Button>
						</Link>
					</div>
				)}

				{booking.status === "cancelled" && (
					<div className="my-14 text-center">
						<h2 className="text-xl font-bold md:text-2xl">{t("cancelled.title")}</h2>
						<p className="mx-auto max-w-md md:text-lg">{t("cancelled.description")}</p>

						<Link href={"/"} passHref>
							<Button className="mt-6 bg-orange hover:bg-orange hover:brightness-90">
								{t("cancelled.button")}
							</Button>
						</Link>
					</div>
				)}
			</div>
		</StepsCard>
	)
}
