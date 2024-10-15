"use client"

import { useCartStore } from "@/store/cart.store"
import { Link } from "@/i18n/routing"

import { TicketBorder } from "./TicketBorder"
import { Button } from "../ui/button"

export default function SumarySection(): React.ReactElement {
	const { cart } = useCartStore()

	return (
		<section className="flex flex-col gap-2.5 md:w-1/3">
			<h2 className="flex items-center gap-1 text-2xl font-bold md:text-3xl">
				<div aria-hidden className="h-0.5 w-4 bg-black" />
				Sumary
			</h2>

			<div className="">
				<TicketBorder className="fill-neutral-50" />

				<div className="flex flex-col gap-2 bg-neutral-50 px-3 py-5">
					<ul>
						<li className="mb-4 flex w-full justify-between font-medium">
							<span>Numero de excursiones</span>
							<span>{cart.length}</span>
						</li>

						<li className="flex w-full justify-between text-xl font-bold">
							<span>Total</span>
							<span className="text-orange">
								${cart.reduce((acc, item) => acc + item.price, 0).toLocaleString("cl-CL")}
							</span>
						</li>
					</ul>

					<Link href={"/cart/checkout"} className="w-full">
						<Button
							disabled={cart.length === 0}
							className="mt-5 w-full bg-orange text-base tracking-wider transition-all hover:bg-orange hover:brightness-90"
							size={"lg"}
						>
							Checkout
						</Button>
					</Link>
				</div>

				<TicketBorder className="rotate-180 fill-neutral-50" />
			</div>
		</section>
	)
}
