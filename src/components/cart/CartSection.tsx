"use client"

import { useCartStore } from "@/store/cart.store"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { cn } from "@/lib/utils"

import { Button } from "../ui/button"
import CartItem from "./CartItem"

export default function CartSection({ className }: { className?: string }): React.ReactElement {
	const { cart, removeFromCart } = useCartStore()
	const t = useTranslations("CartPage")

	return (
		<section className={cn("flex flex-col gap-2.5", className)}>
			<h2 className="text-2xl font-bold md:text-3xl">{t("cart.title")}</h2>

			{cart.length === 0 && (
				<>
					<p className="text-lg text-neutral-500">{t("cart.empty")}</p>

					<Link href={"/excursions"}>
						<Button size="lg" className="w-full text-base tracking-wide">
							{t("cart.emptyButton")}
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
