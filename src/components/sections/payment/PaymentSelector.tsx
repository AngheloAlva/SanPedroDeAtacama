"use client"

import { paymentMethodsTax } from "@/lib/consts/paymentMethodsTax"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import { enUS, es, fr, ptBR } from "date-fns/locale"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

import { Separator } from "@/components/ui/separator"
import PaypalButton from "./PaypalButton"
import FlowButton from "./FlowButton"
import { format } from "date-fns"

import type { booking_item } from "@/db/schema/booking-item"
import type { CurrencyCode } from "@/types/currency"
import type { booking } from "@/db/schema/booking"
import type { Locale } from "@/types/locales"
import { useTranslations } from "next-intl"

interface Props {
	locale: Locale
	booking: typeof booking.$inferSelect
	bookingItems: (typeof booking_item.$inferSelect)[]
}

const dateLocales = {
	es: es,
	en: enUS,
	pt: ptBR,
	fr: fr,
}

type PaymentMethod = "paypal" | "paypal" | "flow"

export default function PaymentSelector({
	booking,
	bookingItems,
	locale,
}: Props): React.ReactElement {
	const [currency, setCurrency] = useState<CurrencyCode>("CLP")
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
	const [price, setPrice] = useState<number>(booking.total_price_clp ?? 0)
	const [localeString, setLocaleString] = useState<string>("cl-CL")

	const t = useTranslations("PaymentPage.payment.paymentMethod")

	if (booking.total_price_clp == null) {
		return <div>{t("totalNotAvailable")}</div>
	}

	const handlePaymentMethod = (method: PaymentMethod, currency: CurrencyCode) => {
		setPaymentMethod(method)
		setCurrency(currency)

		if (currency === "CLP") {
			setPrice(booking.total_price_clp ?? 0)
			setLocaleString("cl-CL")
		} else if (currency === "USD") {
			setPrice(booking.total_price_usd ?? 0)
			setLocaleString("en-US")
		} else if (currency === "BRL") {
			setPrice(booking.total_price_brl ?? 0)
			setLocaleString("pt-BR")
		}
	}

	return (
		<PayPalScriptProvider
			options={{
				clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
				components: "buttons",
			}}
		>
			<div className="flex flex-col gap-5 md:flex-row">
				<section className="w-full md:border-r md:pr-5 lg:w-2/3">
					<div className="flex flex-col">
						<p className="font-semibold">{t("title")}</p>
						<p className="text-sm">{t("description")}</p>
					</div>

					<div className="mt-5 pr-10">
						<h2 className="font-semibold">
							CLP ${booking.total_price_clp?.toLocaleString("cl-CL")}{" "}
							<span className="text-sm font-normal text-muted-foreground">(Peso Chileno)</span>
						</h2>

						<ul className="mt-1 w-full space-y-2">
							<li className="w-full rounded-sm border shadow-sm">
								<button
									onClick={() => handlePaymentMethod("flow", "CLP")}
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
									<Image
										src="/payment/flow.svg"
										alt="Paypal"
										width={120}
										height={50}
										className="mr-20"
									/>
								</button>
							</li>
						</ul>
					</div>

					<div className="mt-5 pr-10">
						<h2 className="font-semibold">
							US ${booking.total_price_usd?.toLocaleString("en-US", { currency: "USD" })}{" "}
							<span className="text-sm font-normal text-muted-foreground">(Dolar de EEUU)</span>
						</h2>

						<ul className="mt-1 w-full space-y-2">
							<li className="w-full rounded-sm border shadow-sm">
								<button
									onClick={() => handlePaymentMethod("paypal", "USD")}
									className="flex h-full w-full items-center justify-between gap-2 px-3 py-2 pr-10 md:px-4"
								>
									<div className="flex items-center justify-start gap-2">
										<div className="h-4 w-4 rounded-full border border-orange p-0.5">
											<div
												className={cn({
													"h-full w-full rounded-full bg-orange":
														paymentMethod === "paypal" && currency === "USD",
												})}
											/>
										</div>
										Paypal
									</div>
									<Image
										src="/payment/paypal.svg"
										alt="Paypal"
										width={120}
										height={50}
										className="mr-20"
									/>
								</button>
							</li>
						</ul>
					</div>
				</section>

				{paymentMethod && <Separator className="md:hidden" />}

				<section className="flex flex-col items-end justify-end lg:w-1/3">
					<div className="h-full w-full space-y-2">
						{bookingItems.map((item) => (
							<div key={item.id}>
								<div className="flex w-full justify-between gap-2">
									<div className="">
										<p className="text-sm font-semibold">
											{item.excursion_name} x {item.people_count}
										</p>
										<p className="text-sm text-muted-foreground">
											{format(item.date, "PPP", { locale: dateLocales[locale] })}
										</p>
									</div>
									<p className="text-sm">
										CLP ${(item.price * item.people_count).toLocaleString("cl-CL")}
									</p>
								</div>
							</div>
						))}

						<Separator />

						<div className="flex w-full justify-between gap-2 text-muted-foreground">
							<p className="text-sm font-semibold">{t("subtotal")}</p>
							<p className="text-sm">
								{currency} $
								{price.toLocaleString(localeString, {
									currency: currency,
								})}
							</p>
						</div>

						<div className="flex w-full justify-between gap-2 text-muted-foreground">
							<p className="text-sm font-semibold">{t("method")}</p>
							{paymentMethod == null ? (
								<p className="text-sm">{currency} $0</p>
							) : (
								<p className="text-sm">
									{currency} $
									{(price * paymentMethodsTax[paymentMethod]).toLocaleString(localeString, {
										currency: currency,
									})}
								</p>
							)}
						</div>

						<div className="flex w-full justify-between gap-2">
							<p className="font-bold">{t("total")}</p>
							{paymentMethod == null ? (
								<p className="font-semibold">
									{currency} ${booking.total_price_clp?.toLocaleString("cl-CL")}
								</p>
							) : (
								<p className="font-semibold">
									{currency} $
									{(price + price * paymentMethodsTax[paymentMethod]).toLocaleString(localeString, {
										currency: currency,
									})}
								</p>
							)}
						</div>
					</div>

					{paymentMethod === "paypal" && currency === "USD" && (
						<div className="mt-8">
							<PaypalButton
								amount={booking.total_price_usd ?? 0}
								currency="USD"
								bookingId={booking.id}
							/>
						</div>
					)}

					{paymentMethod === "flow" && currency === "CLP" && (
						<div className="mt-8">
							<FlowButton
								userEmail={booking.email}
								amount={booking.total_price_clp}
								bookingId={booking.id}
							/>
						</div>
					)}

					{paymentMethod === "paypal" && currency === "BRL" && (
						<div className="mt-8">
							<PaypalButton
								amount={booking.total_price_brl ?? 0}
								currency="BRL"
								bookingId={booking.id}
							/>
						</div>
					)}
				</section>
			</div>
		</PayPalScriptProvider>
	)
}
