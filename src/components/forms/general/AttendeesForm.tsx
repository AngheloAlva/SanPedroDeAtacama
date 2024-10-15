"use client"

import { useFieldArray, useForm, useFormContext } from "react-hook-form"
import { checkoutSchema } from "@/lib/schemas/general/checkout.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCartStore } from "@/store/cart.store"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"

import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import {
	Form,
	FormItem,
	FormLabel,
	FormField,
	FormControl,
	FormMessage,
} from "@/components/ui/form"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { useRouter } from "@/i18n/routing"
import { createBooking } from "@/actions/booking/createBooking"

export default function AttendeesForm(): React.ReactElement {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const { cart, clearCart } = useCartStore()
	const { toast } = useToast()
	const router = useRouter()

	const form = useForm<z.infer<typeof checkoutSchema>>({
		resolver: zodResolver(checkoutSchema),
		defaultValues: {
			useSameInfo: false,
			bookingInfo: {
				email: "",
				phone: "",
			},
			bookingItem: cart.map((item) => ({
				id: item.id,
				accommodation: "",
				comment: "",
				attendees: [
					{
						age: "",
						country: "",
						documentNumber: "",
						foodPreference: "",
						lastName: "",
						name: "",
					},
				],
			})),
		},
	})

	useEffect(() => {
		form.reset({
			bookingInfo: {
				email: "",
				phone: "",
			},
			bookingItem: cart.map(() => ({
				accommodation: "",
				attendees: [
					{
						age: 0,
						country: "",
						documentNumber: "",
						foodPreference: "",
						lastName: "",
						name: "",
					},
				],
				comment: "",
			})),
		})
	}, [cart, form])

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
		} finally {
			setIsSubmitting(false)
		}
	}

	const useSameInfo = form.watch("useSameInfo")

	useEffect(() => {
		if (useSameInfo) {
			const firstBookingItem = form.getValues("bookingItem")[0]
			const firstAttendees = firstBookingItem.attendees

			form.setValue(
				"bookingItem",
				form.getValues("bookingItem").map((item, index) => {
					if (index === 0) return item // No cambiar la primera excursión

					const newAttendees = [...firstAttendees]
					// Mantener asistentes adicionales si hay más que en la primera excursión
					if (item.attendees.length > firstAttendees.length) {
						newAttendees.push(...item.attendees.slice(firstAttendees.length))
					}

					return {
						...item,
						attendees: newAttendees,
					}
				})
			)

			toast({
				title: "Información copiada",
				description: "Los datos del primer asistente se han copiado a las demás excursiones.",
				duration: 5000,
			})
		}
	}, [useSameInfo, form, toast])

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
				<section>
					<h2 className="mb-4 flex items-center gap-1 text-2xl font-bold md:text-3xl">
						<div aria-hidden className="h-0.5 w-4 bg-black" />
						Datos de la persona a cargo
					</h2>

					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
						<FormField
							control={form.control}
							name="bookingInfo.email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input type="email" placeholder="example@gmail.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="bookingInfo.phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Telefono</FormLabel>
									<FormControl>
										<Input placeholder="912345678" type="tel" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</section>

				<Separator className="my-8" />

				<section>
					<h2 className="mb-2 flex items-center gap-1 text-2xl font-bold md:text-3xl">
						<div aria-hidden className="h-0.5 w-4 bg-black" />
						Datos de los asistentes
					</h2>

					<div>
						{form.watch("bookingItem").map((_, index) => (
							<div key={index} className="grid">
								<h3 className="mb-2 line-clamp-1 h-9 overflow-hidden text-ellipsis text-xl md:text-2xl">
									<span className="font-semibold">Excursion: </span>
									{cart[index].name}
								</h3>

								<div className="grid gap-x-2 gap-y-1.5 sm:grid-cols-2">
									<FormField
										control={form.control}
										name={`bookingItem.${index}.accommodation`}
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
										name={`bookingItem.${index}.comment`}
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

								<NestedArray fieldIndex={index} />

								{index === 0 && cart.length >= 1 && (
									<FormField
										control={form.control}
										name="useSameInfo"
										render={({ field }) => (
											<FormItem className="mt-6 flex flex-row items-start space-x-2 space-y-0">
												<FormControl>
													<Checkbox checked={field.value} onCheckedChange={field.onChange} />
												</FormControl>
												<div className="space-y-1 leading-none">
													<FormLabel>
														¿Utilizar los datos del primer asistente para las demás excursiones?
													</FormLabel>
												</div>
											</FormItem>
										)}
									/>
								)}

								<Separator className="my-8" />
							</div>
						))}
					</div>
				</section>

				<Button
					size={"lg"}
					type="submit"
					className="w-full bg-orange text-base font-bold hover:bg-orange"
				>
					{isSubmitting ? "Enviando..." : "Continuar con el pago"}
				</Button>
			</form>
		</Form>
	)
}

function NestedArray({ fieldIndex }: { fieldIndex: number }) {
	const { control } = useFormContext()

	const { fields, append, remove } = useFieldArray({
		control,
		name: `bookingItem.${fieldIndex}.attendees`,
	})

	return (
		<div className="mt-2">
			{fields.map((field, index) => (
				<div className="grid gap-2" key={field.id}>
					<div className="mt-4 flex items-center justify-between gap-1 sm:mt-0">
						<Label className="text-base font-semibold">Persona {index + 1}</Label>
						{index > 0 && (
							<Button
								className="sm:mt-4"
								type="button"
								onClick={() => remove(index)}
								variant="secondary"
							>
								Remover
							</Button>
						)}
					</div>

					<div className="grid gap-x-2 gap-y-1.5 sm:grid-cols-2">
						<FormField
							control={control}
							name={`bookingItem.${fieldIndex}.attendees.${index}.name`}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre</FormLabel>
									<Input type="text" className="w-full" placeholder="Nombre" {...field} />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name={`bookingItem.${fieldIndex}.attendees.${index}.lastName`}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Apellido</FormLabel>
									<Input type="text" className="w-full" placeholder="Apellido" {...field} />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name={`bookingItem.${fieldIndex}.attendees.${index}.age`}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Edad</FormLabel>
									<Input min={0} type="number" className="w-full" placeholder="Edad" {...field} />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name={`bookingItem.${fieldIndex}.attendees.${index}.documentNumber`}
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
							control={control}
							name={`bookingItem.${fieldIndex}.attendees.${index}.country`}
							render={({ field }) => (
								<FormItem>
									<FormLabel>País</FormLabel>
									<Input type="text" className="w-full" placeholder="País" {...field} />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name={`bookingItem.${fieldIndex}.attendees.${index}.foodPreference`}
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
			))}
			<div className="flex w-full">
				<Button
					type="button"
					onClick={() =>
						append({
							name: "",
							lastName: "",
							country: "",
							documentNumber: "",
							age: 0,
							foodPreference: "",
						})
					}
					className="mt-6 w-full sm:max-w-72"
				>
					Agregar persona
				</Button>
			</div>
		</div>
	)
}
