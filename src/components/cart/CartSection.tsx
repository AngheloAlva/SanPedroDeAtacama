"use client"

import { useCartStore } from "@/store/cart.store"
import { Link } from "@/i18n/routing"
import { cn } from "@/lib/utils"

import { Button } from "../ui/button"
import CartItem from "./CartItem"

export default function CartSection({ className }: { className?: string }): React.ReactElement {
	const { cart, removeFromCart } = useCartStore()

	return (
		<section className={cn("flex flex-col gap-2.5", className)}>
			<h2 className="text-2xl font-bold md:text-3xl">Itinerario</h2>

			{cart.length === 0 && (
				<>
					<p className="text-lg text-neutral-500">Your cart is empty. Add some excursions!</p>

					<Link href={"/excursions"}>
						<Button size="lg" className="w-full text-base tracking-wide">
							See excursions
						</Button>
					</Link>
				</>
			)}

			{cart.map((item) => (
				<CartItem key={item.id} removeFromCart={removeFromCart} {...item} />
			))}
		</section>
	)
}
