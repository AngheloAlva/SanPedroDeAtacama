"use client"

import { useCartStore } from "@/store/cart.store"
import { useToast } from "@/hooks/use-toast"
import { useTranslations } from "next-intl"

import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"

interface AddToCartProps {
	id: string
	name: string
	image: string
	price: number
	modality: "excursion" | "program"
	days_not_available: string[] | null
	days_of_week_not_available: { dayOfWeek: number[] } | null
}

export default function AddToCart({
	id,
	name,
	image,
	price,
	modality,
	days_not_available,
	days_of_week_not_available,
}: AddToCartProps): React.ReactElement {
	const t = useTranslations("ExcursionSharedPage")
	const { addToCart, cart } = useCartStore()
	const { toast } = useToast()

	const [message, setMessage] = useState<string>("")
	const [date, setDate] = useState<Date | undefined>(
		new Date(new Date().setDate(new Date().getDate() + 3))
	)

	const handleAddToCart = () => {
		if (!date) {
			setMessage("Please select a date")
			return
		}

		if (modality === "excursion" && cart.length > 0 && cart[0].modality === "program") {
			toast({
				title: "Only one type of activity",
				description: "You can only add one type of activity to the cart",
				duration: 5000,
			})

			return
		} else if (modality === "program" && cart.length > 0 && cart[0].modality === "excursion") {
			toast({
				title: "Only one type of activity",
				description: "You can only add one type of activity to the cart",
				duration: 5000,
			})

			return
		}

		addToCart({ id, image, name, price, date, modality })

		toast({
			title: "Item added to cart",
			description: `${name} added to cart`,
			duration: 5000,
		})
	}

	return (
		<div className="mt-8 flex h-fit flex-col rounded-lg border border-input px-3 py-3 shadow-sm md:mt-6 md:w-3/6 lg:mt-8 lg:w-2/6 lg:px-4 xl:px-5">
			<h3 className="text-lg font-bold lg:text-xl">{t("book.title")}</h3>
			<p className="mt-2 font-medium text-muted-foreground lg:mt-3">{t("book.description")}</p>

			<Separator className="my-3" />

			<div className="flex w-full flex-col gap-4 sm:flex-row md:flex-col">
				<div className="flex flex-col gap-2 sm:w-1/2 md:w-full">
					<h4 className="font-bold">Fecha</h4>
					<Calendar
						mode="single"
						selected={date}
						onSelect={setDate}
						className="w-full rounded-md border shadow"
						disabled={[
							{ before: new Date(new Date().setDate(new Date().getDate() + 3)) },
							{
								dayOfWeek: days_of_week_not_available ? days_of_week_not_available?.dayOfWeek : [],
							},
							days_not_available ? days_not_available.map((day) => new Date(day)) : [],
						]}
						classNames={{
							table: "w-full mt-4",
							tbody: "w-full",
							head_cell: "w-full text-muted-foreground font-normal text-[0.8rem] text-left ml-2",
							month: "w-full",
							cell: "w-full h-auto",
							day_selected: "bg-orange text-white",
						}}
					/>
				</div>
			</div>

			<Separator className="mb-4 mt-6" />

			<p className="pb-2 text-sm text-red-500">{message}</p>

			<Button
				onClick={() => handleAddToCart()}
				className="flex items-center justify-center rounded-lg bg-orange px-4 py-2 font-bold tracking-wide text-white transition-all hover:bg-orange hover:brightness-90"
			>
				{t("book.cta")}
			</Button>
		</div>
	)
}
