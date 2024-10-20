"use client"

import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

import { Separator } from "@/components/ui/separator"
import PaypalButton from "./PaypalButton"
import FlowButton from "./FlowButton"

import { booking_item } from "@/db/schema/booking-item"
import type { booking } from "@/db/schema/booking"
import type { payment } from "@/db/schema/payment"
import { format } from "date-fns"

interface Props {
	booking: typeof booking.$inferSelect
	bookingItems: (typeof booking_item.$inferSelect)[]
}

const paymentMethodsTax = {
	paypal: 0.03,
	flow: 0.05,
}

export default function PaymentSelector({ booking, bookingItems }: Props): React.ReactElement {
	const [paymentMethod, setPaymentMethod] =
		useState<(typeof payment.$inferSelect)["payment_provider"]>(null)

	const handlePaymentMethod = (method: (typeof payment.$inferSelect)["payment_provider"]) => {
		setPaymentMethod(method)
	}

	return (
		<PayPalScriptProvider
			options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!, components: "buttons" }}
		>
			<div className="flex flex-col gap-5 md:flex-row">
				<section className="w-full md:border-r md:pr-5 lg:w-2/3">
					<div className="flex flex-col">
						<p className="font-semibold">Selecciona tu metodo de pago:</p>
						<p className="text-sm">
							Selecciona el metodo de pago que prefieras y en la divisa que prefieras.
						</p>
					</div>

					<div className="mt-5">
						<h2 className="font-semibold">
							CLP ${booking.total_price?.toLocaleString("cl-CL")}{" "}
							<span className="text-sm font-normal text-muted-foreground">(Peso Chileno)</span>
						</h2>

						<ul className="mt-1 w-full space-y-2">
							<li className="w-full rounded-sm border shadow-sm">
								<button
									onClick={() => handlePaymentMethod("flow")}
									className="flex h-full w-full items-center justify-between gap-2 px-3 py-2 md:px-4"
								>
									<div className="flex items-center justify-start gap-2">
										<div className="h-4 w-4 rounded-full border border-orange p-0.5">
											<div
												className={cn({
													"h-full w-full rounded-full bg-orange": paymentMethod === "flow",
												})}
											/>
										</div>
										Flow
									</div>
									<Image src="/payment/flow.svg" alt="Paypal" width={120} height={50} />
								</button>
							</li>
						</ul>
					</div>

					<div className="mt-5">
						<h2 className="font-semibold">
							US ${booking.total_price?.toLocaleString("cl-CL")}{" "}
							<span className="text-sm font-normal text-muted-foreground">(Dolar de EEUU)</span>
						</h2>

						<ul className="mt-1 w-full space-y-2">
							<li className="w-full rounded-sm border shadow-sm">
								<button
									onClick={() => handlePaymentMethod("paypal")}
									className="flex h-full w-full items-center justify-between gap-2 px-3 py-2 md:px-4"
								>
									<div className="flex items-center justify-start gap-2">
										<div className="h-4 w-4 rounded-full border border-orange p-0.5">
											<div
												className={cn({
													"h-full w-full rounded-full bg-orange": paymentMethod === "paypal",
												})}
											/>
										</div>
										Paypal
									</div>
									<Image src="/payment/paypal.svg" alt="Paypal" width={120} height={50} />
								</button>
							</li>
						</ul>
					</div>

					<div className="mt-5">
						<h2 className="font-semibold">
							R ${booking.total_price?.toLocaleString("cl-CL")}{" "}
							<span className="text-sm font-normal text-muted-foreground">(Real Brasileño)</span>
						</h2>
					</div>
				</section>

				{paymentMethod && <Separator className="md:hidden" />}

				<div className="flex flex-col items-end justify-end lg:w-1/3">
					<div className="h-full w-full space-y-2">
						{bookingItems.map((item) => (
							<div key={item.id}>
								<div className="flex w-full justify-between gap-2">
									<div className="">
										<p className="text-sm font-semibold">{item.excursion_name}</p>
										<p className="text-sm text-muted-foreground">{format(item.date, "PPP")}</p>
									</div>
									<p className="text-sm">${item.price.toLocaleString("cl-CL")}</p>
								</div>
							</div>
						))}

						<Separator />

						<div className="flex w-full justify-between gap-2 text-muted-foreground">
							<p className="text-sm font-semibold">Subtotal</p>
							<p className="text-sm">${booking.total_price?.toLocaleString("cl-CL")}</p>
						</div>

						<div className="flex w-full justify-between gap-2 text-muted-foreground">
							<p className="text-sm font-semibold">Metodo de pago</p>
							{paymentMethod == null ? (
								<p className="text-sm">$0</p>
							) : (
								<p className="text-sm">
									$
									{booking.total_price !== null &&
										booking.total_price * paymentMethodsTax[paymentMethod as "paypal"]}
								</p>
							)}
						</div>

						<div className="flex w-full justify-between gap-2">
							<p className="font-bold">Total</p>
							{paymentMethod == null ? (
								<p className="font-semibold">${booking.total_price?.toLocaleString("cl-CL")}</p>
							) : (
								<p className="font-semibold">
									$
									{booking.total_price !== null &&
										booking.total_price +
											booking.total_price * paymentMethodsTax[paymentMethod as "paypal"]}
								</p>
							)}
						</div>
					</div>

					<div>
						{booking.status !== "confirmed" && paymentMethod === "paypal" && (
							<PaypalButton bookingItems={bookingItems} bookingId={booking.id} />
						)}
					</div>

					<div>{booking.status !== "confirmed" && paymentMethod === "flow" && <FlowButton />}</div>
				</div>
			</div>
		</PayPalScriptProvider>
	)
}
