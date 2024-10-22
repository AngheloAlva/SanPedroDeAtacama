"use client"

import { useCartStore } from "@/store/cart.store"

// import PaypalButton from "../paypal/PaypalButton"
import { TicketBorder } from "./TicketBorder"
import { Separator } from "../ui/separator"

import type { booking } from "@/db/schema/booking"
import type { booking_item } from "@/db/schema/booking-item"

interface Props {
	bookingData: {
		booking: typeof booking.$inferSelect
		bookingItems: (typeof booking_item.$inferSelect)[]
	}
}

export default function FullSumary({}: Props): React.ReactElement {
	const { cart } = useCartStore()

	return (
		<section className="flex flex-col gap-2.5 md:w-1/3">
			<h2 className="text-2xl font-bold md:text-3xl">Sumary</h2>

			<div className="">
				<TicketBorder className="fill-neutral-100" />

				<div className="flex flex-col gap-3 bg-neutral-100 px-3 py-5">
					{cart.map((item) => (
						<div className="flex w-full justify-between gap-2 text-sm" key={item.id}>
							<span>{item.name}</span>
							<span>${item.price}</span>
						</div>
					))}

					<Separator className="my-3" />

					<ul className="mb-4">
						<li className="mb-2 flex w-full justify-between font-medium">
							<span>Numero de excursiones</span>
							{/* <span>{getSummary().totalItems}</span> */}
						</li>

						<li className="flex w-full justify-between text-xl font-bold">
							<span>Total</span>
							{/* <span className="text-orange">${getSummary().total}</span> */}
						</li>
					</ul>

					{/* <PaypalButton bookingData={bookingData} /> */}
				</div>

				<TicketBorder className="rotate-180 fill-neutral-100" />
			</div>
		</section>
	)
}
