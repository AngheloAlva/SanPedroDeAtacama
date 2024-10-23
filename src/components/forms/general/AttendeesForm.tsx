"use client"

import { checkoutSchema } from "@/lib/schemas/general/checkout.schema"
import { createBooking } from "@/actions/booking/createBooking"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCartStore } from "@/store/cart.store"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "@/i18n/routing"
import { useState } from "react"
import { z } from "zod"

import { PiDotBold, PiTrashBold } from "react-icons/pi"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Form,
	FormItem,
	FormLabel,
	FormField,
	FormControl,
	FormMessage,
	FormDescription,
} from "@/components/ui/form"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { useTranslations } from "next-intl"

export default function AttendeesForm(): React.ReactElement {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const { cart, clearCart } = useCartStore()
	const { toast } = useToast()
	const router = useRouter()

	const t = useTranslations("CheckoutPage.checkout")

	const form = useForm<z.infer<typeof checkoutSchema>>({
		resolver: zodResolver(checkoutSchema),
		defaultValues: {
			accommodation: "",
			comment: "",
			attendees: [
				{
					age: "",
					phone: "",
					email: "",
					country: "",
					fullName: "",
					documentNumber: "",
					foodPreference: "",
				},
			],
		},
	})

	const onSubmit = async (values: z.infer<typeof checkoutSchema>) => {
		try {
			setIsSubmitting(true)

			const res = await createBooking({ cart, bookingData: values })

			if (res.ok && "bookingId" in res) {
				clearCart()
				router.push(`/cart/checkout/payment/${res.bookingId}`)
			} else {
				toast({
					title: "Error al crear la reserva",
					description: `${"error" in res && res.error}`,
					variant: "destructive",
					duration: 5000,
				})
			}
		} catch (error) {
			console.error(error)
			toast({
				title: "Error al crear la reserva",
				description: "Ocurrió un error inesperado",
				variant: "destructive",
				duration: 5000,
			})

			setIsSubmitting(false)
		}
	}

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "attendees",
	})

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full overflow-visible sm:mt-4 md:mt-6"
			>
				<section>
					<h2 className="mb-2 text-2xl font-bold md:text-3xl">{t("title")}</h2>

					<div>
						<div className="grid">
							<h3 className="mb-1 text-xl font-semibold md:text-2xl">{t("itinerary")}</h3>
							<ul className="">
								{cart.map((item) => (
									<li key={item.id} className="flex items-center">
										<PiDotBold className="h-5 w-5" />
										{item.name}
									</li>
								))}
							</ul>

							<Separator className="my-8" />

							<div className="grid gap-x-2 gap-y-1.5 sm:grid-cols-2">
								<FormField
									control={form.control}
									name={`accommodation`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("form.accommodation.label")}</FormLabel>
											<FormControl>
												<Input placeholder={t("form.accommodation.placeholder")} {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`comment`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("form.comment.label")}</FormLabel>
											<FormControl>
												<Textarea placeholder={t("form.comment.placeholder")} {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<Accordion
								collapsible
								type="single"
								className="mt-4 w-full"
								defaultValue={fields[0].id}
							>
								{fields.map((field, index) => (
									<AccordionItem key={field.id} value={field.id}>
										<AccordionTrigger>
											<div className="mt-4 flex items-center justify-between gap-4 sm:mt-0">
												<Label className="text-base font-semibold">
													{t("form.person", { number: index + 1 })}
												</Label>
												{index > 0 && (
													<Button
														type="button"
														variant="secondary"
														className="h-fit w-fit p-1 shadow"
														onClick={() => remove(index)}
													>
														<PiTrashBold className="h-4 w-4" />
													</Button>
												)}
											</div>
										</AccordionTrigger>
										<AccordionContent>
											<div className="grid gap-2">
												<div className="grid gap-x-2 gap-y-2.5 sm:grid-cols-2">
													<FormField
														control={form.control}
														name={`attendees.${index}.fullName`}
														render={({ field }) => (
															<FormItem>
																<FormLabel>{t("form.name.label")}</FormLabel>
																<Input
																	type="text"
																	className="w-full"
																	placeholder={t("form.name.placeholder")}
																	{...field}
																/>
																<FormMessage />
															</FormItem>
														)}
													/>
													{fields.indexOf(field) === 0 && (
														<FormField
															control={form.control}
															name={`attendees.${index}.email`}
															render={({ field }) => (
																<FormItem>
																	<FormLabel>{t("form.email.label")}</FormLabel>
																	<Input
																		type="email"
																		className="w-full"
																		placeholder={t("form.email.placeholder")}
																		{...field}
																	/>
																	<FormDescription>{t("form.email.description")}</FormDescription>
																	<FormMessage />
																</FormItem>
															)}
														/>
													)}

													<FormField
														control={form.control}
														name={`attendees.${index}.age`}
														render={({ field }) => (
															<FormItem>
																<FormLabel>{t("form.age.label")}</FormLabel>
																<Input
																	min={0}
																	type="number"
																	className="w-full"
																	placeholder={t("form.age.placeholder")}
																	{...field}
																/>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={form.control}
														name={`attendees.${index}.documentNumber`}
														render={({ field }) => (
															<FormItem>
																<FormLabel>{t("form.documentNumber.label")}</FormLabel>
																<Input
																	type="text"
																	className="w-full"
																	placeholder={t("form.documentNumber.placeholder")}
																	{...field}
																/>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={form.control}
														name={`attendees.${index}.country`}
														render={({ field }) => (
															<FormItem>
																<FormLabel>{t("form.country.label")}</FormLabel>
																<Input
																	type="text"
																	className="w-full"
																	placeholder={t("form.country.placeholder")}
																	{...field}
																/>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={form.control}
														name={`attendees.${index}.phone`}
														render={({ field }) => (
															<FormItem>
																<FormLabel>{t("form.phone.label")}</FormLabel>
																<Input
																	type="tel"
																	className="w-full"
																	placeholder={t("form.phone.placeholder")}
																	{...field}
																/>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={form.control}
														name={`attendees.${index}.foodPreference`}
														render={({ field }) => (
															<FormItem>
																<FormLabel>{t("form.foodPreference.label")}</FormLabel>
																<Select onValueChange={field.onChange} defaultValue={field.value}>
																	<FormControl>
																		<SelectTrigger>
																			<SelectValue placeholder="Selecciona una opción" />
																		</SelectTrigger>
																	</FormControl>
																	<SelectContent>
																		<SelectItem value={t("form.foodPreference.items.0.id")}>
																			{t("form.foodPreference.items.0.name")}
																		</SelectItem>
																		<SelectItem value={t("form.foodPreference.items.1.id")}>
																			{t("form.foodPreference.items.1.name")}
																		</SelectItem>
																		<SelectItem value={t("form.foodPreference.items.2.id")}>
																			{t("form.foodPreference.items.2.name")}
																		</SelectItem>
																		<SelectItem value={t("form.foodPreference.items.3.id")}>
																			{t("form.foodPreference.items.3.name")}
																		</SelectItem>
																		<SelectItem value={t("form.foodPreference.items.4.id")}>
																			{t("form.foodPreference.items.4.name")}
																		</SelectItem>
																	</SelectContent>
																</Select>
																<FormMessage />
															</FormItem>
														)}
													/>

													{/* // TODO: Implementar campo de texto para otra preferencia de comida
													{form.watch(`attendees.${index}.foodPreference`) === "otra" && (
														<Input
															type="text"
															className="w-full"
															placeholder={t("form.foodPreference.other.placeholder")}
														/>
													)} */}
												</div>
											</div>
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>

							{fields.length < 10 && (
								<div className="my-6 flex w-full">
									<Button
										type="button"
										onClick={() =>
											append({
												age: 0,
												phone: "",
												country: "",
												fullName: "",
												documentNumber: "",
												foodPreference: "",
											})
										}
										variant={"outline"}
										className="w-full sm:max-w-72"
									>
										{t("form.addPerson")}
									</Button>
								</div>
							)}

							<Separator className="my-8" />
						</div>
					</div>
				</section>

				<Button
					size={"lg"}
					type="submit"
					className="w-full bg-green text-base font-bold hover:bg-green hover:brightness-90"
				>
					{isSubmitting ? "..." : t("form.submit")}
				</Button>
			</form>
		</Form>
	)
}
