"use client"

import { useCartStore } from "@/store/cart.store"
import { Link } from "@/i18n/routing"
import { cn } from "@/lib/utils"

import { Button } from "../ui/button"

export default function SumarySection({ className }: { className?: string }): React.ReactElement {
	const { cart } = useCartStore()

	return (
		<section className={cn("flex flex-col md:border-l-[1px] md:pb-4 md:pl-6", className)}>
			<h2 className="text-2xl font-bold md:text-3xl">Resumen</h2>

			<ul className="mt-4 space-y-2">
				<li className="flex w-full justify-between font-medium">
					<span>Numero de excursiones</span>
					<span>{cart.length}</span>
				</li>

				<li className="flex w-full justify-between text-xl font-bold">
					<span>Total</span>
					<span className="text-green">
						${cart.reduce((acc, item) => acc + item.price, 0).toLocaleString("cl-CL")}
					</span>
				</li>
			</ul>

			<Link href={"/cart/checkout"} className="w-full">
				<Button
					disabled={cart.length === 0}
					className="mt-5 w-full bg-green text-base font-bold tracking-wider transition-all hover:bg-green hover:brightness-90"
					size={"lg"}
				>
					Checkout
				</Button>
			</Link>
		</section>
	)
}
