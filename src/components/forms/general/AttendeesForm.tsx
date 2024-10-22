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

export default function AttendeesForm(): React.ReactElement {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const { cart, clearCart } = useCartStore()
	const { toast } = useToast()
	const router = useRouter()

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
					<h2 className="mb-2 text-2xl font-bold md:text-3xl">Datos de los asistentes</h2>

					<div>
						<div className="grid">
							<h3 className="mb-1 text-xl font-semibold md:text-2xl">Itinerario:</h3>
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
											<FormLabel>Hospedaje</FormLabel>
											<FormControl>
												<Input placeholder="Hospedaje" {...field} />
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
											<FormLabel>Comentario</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Puedes indicar alguna preferencia alimenticia o requerimiento especial."
													{...field}
												/>
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
												<Label className="text-base font-semibold">Persona {index + 1}</Label>
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
																<FormLabel>Nombre Completo</FormLabel>
																<Input
																	type="text"
																	className="w-full"
																	placeholder="Nombre Completo"
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
																	<FormLabel>Email</FormLabel>
																	<Input
																		type="email"
																		className="w-full"
																		placeholder="Nombre Completo"
																		{...field}
																	/>
																	<FormDescription>
																		El email será utilizado para enviar la confirmación de la
																		reserva, y solo debera ingresarse una vez.
																	</FormDescription>
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
																<FormLabel>Edad</FormLabel>
																<Input
																	min={0}
																	type="number"
																	className="w-full"
																	placeholder="Edad"
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
																<FormLabel>Numero de Documento</FormLabel>
																<Input
																	type="text"
																	className="w-full"
																	placeholder="Numero de Documento"
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
																<FormLabel>País</FormLabel>
																<Input
																	type="text"
																	className="w-full"
																	placeholder="País"
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
																<FormLabel>Telefono</FormLabel>
																<Input
																	type="tel"
																	className="w-full"
																	placeholder="Telefono"
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
																<FormLabel>Preferencia alimenticia</FormLabel>
																<Select onValueChange={field.onChange} defaultValue={field.value}>
																	<FormControl>
																		<SelectTrigger>
																			<SelectValue placeholder="Selecciona una opción" />
																		</SelectTrigger>
																	</FormControl>
																	<SelectContent>
																		<SelectItem value="vegetariano">Vegetariano</SelectItem>
																		<SelectItem value="vegano">Vegano</SelectItem>
																		<SelectItem value="celiaco">Celiaco</SelectItem>
																		<SelectItem value="ninguna">Ninguna</SelectItem>
																	</SelectContent>
																</Select>
																<FormMessage />
															</FormItem>
														)}
													/>
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
										Agregar persona
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
					{isSubmitting ? "Enviando..." : "Continuar con el pago"}
				</Button>
			</form>
		</Form>
	)
}
