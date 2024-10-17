"use client"

import { updateExcursionWithTranslation } from "@/actions/excursion/updateExcursions"
import { updateExcursionSchema } from "@/lib/schemas/admin/updateExcursion.schema"
import { deleteExcursionImage } from "@/actions/excursion/deleteExcursionImage"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
import { Link } from "@/i18n/routing"
import { useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ImagesCard from "@/components/shared/admin/ImagesCard"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ChevronLeft } from "lucide-react"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import {
	Form,
	FormItem,
	FormLabel,
	FormField,
	FormControl,
	FormMessage,
} from "@/components/ui/form"

import type { ExcursionWithTranslation } from "@/types/excursions"
import type { z } from "zod"
import { Calendar } from "@/components/ui/calendar"

export default function UpdateAllExcursionForm({
	excursion: { excursion, excursion_translation },
	locale,
}: {
	excursion: ExcursionWithTranslation
	locale: string
}): React.ReactElement {
	const [imageResources, setImageResources] = useState<string[]>(excursion?.images ?? [])
	const [datesBlocked, setDatesBlocked] = useState<Date[]>(
		excursion?.days_not_available?.map((day) => new Date(day)) ?? []
	)
	const [isLoading, setIsLoading] = useState(false)
	const { toast } = useToast()

	const form = useForm<z.infer<typeof updateExcursionSchema>>({
		resolver: zodResolver(updateExcursionSchema),
		defaultValues: {
			slug: excursion?.slug,
			price: excursion?.price.toString(),
			name: excursion_translation?.title ?? "",
			guide: excursion_translation?.guide ?? "",
			includes: excursion_translation?.includes ?? "",
			duration: excursion_translation?.duration ?? "",
			status: excursion?.is_active ? "active" : "inactive",
			cancelation: excursion_translation?.cancelation ?? "",
			description: excursion_translation?.description ?? "",
			faq: excursion_translation?.faq ?? [{ question: "", answer: "" }],
			inDetail: excursion_translation?.in_detail ?? [{ title: "", description: "" }],
			whatIncludes: (excursion_translation?.what_includes ?? []).map((item) => ({ item })),
			whatWillYouDo: excursion_translation?.what_will_you_do ?? [{ title: "", description: "" }],
			whatYouShouldBring: (excursion_translation?.what_you_should_bring ?? []).map((item) => ({
				item,
			})),
		},
	})

	const handleDeleteImage = async (imageUrl: string) => {
		try {
			const res = await deleteExcursionImage(imageUrl, excursion?.id ?? "")

			if (!res) {
				throw new Error("Failed to delete image")
			}

			setImageResources((prev) => prev.filter((img) => img !== imageUrl))

			toast({
				title: "Image deleted",
				description: "The image has been deleted successfully",
				duration: 5000,
			})
		} catch (error) {
			console.log(error)
			toast({
				title: "Failed to delete image",
				description: "An error occurred while deleting the image",
				variant: "destructive",
				duration: 5000,
			})
		}
	}

	const {
		fields: wathWillYouDoFields,
		append: wathWillYouDoAppend,
		remove: wathWillYouDoRemove,
	} = useFieldArray({
		control: form.control,
		name: "whatWillYouDo",
	})

	const {
		fields: inDetailFields,
		append: inDetailAppend,
		remove: inDetailRemove,
	} = useFieldArray({
		control: form.control,
		name: "inDetail",
	})

	const {
		fields: whatIncludesFields,
		append: whatIncludesAppend,
		remove: whatIncludesRemove,
	} = useFieldArray({
		control: form.control,
		name: "whatIncludes",
	})

	const {
		fields: whatYouShouldBringFields,
		append: whatYouShouldBringAppend,
		remove: whatYouShouldBringRemove,
	} = useFieldArray({
		control: form.control,
		name: "whatYouShouldBring",
	})

	const {
		fields: faqFields,
		append: faqAppend,
		remove: faqRemove,
	} = useFieldArray({
		control: form.control,
		name: "faq",
	})

	const onSubmit = async (values: z.infer<typeof updateExcursionSchema>) => {
		try {
			setIsLoading(true)

			const res = await updateExcursionWithTranslation(
				locale as "es",
				excursion?.id as string,
				excursion_translation?.id as string,
				values,
				imageResources,
				datesBlocked
			)

			if (!res) {
				throw new Error("Failed to update excursion")
			}

			toast({
				title: "Excursion updated",
				description: "The excursion has been updated successfully",
				duration: 5000,
			})
		} catch (error) {
			console.log(error)
			toast({
				title: "Failed to update excursion",
				description: "An error occurred while updating the excursion",
				variant: "destructive",
				duration: 5000,
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<section className="w-full">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="mx-auto grid w-full max-w-screen-xl flex-1 auto-rows-max gap-4"
				>
					<div className="flex items-center gap-4">
						<Link href={"/admin/dashboard/excursions"}>
							<Button variant="outline" size="icon" className="h-7 w-7">
								<ChevronLeft className="h-4 w-4" />
								<span className="sr-only">Back</span>
							</Button>
						</Link>
						<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
							{excursion_translation?.title}
						</h1>

						<Button
							type="submit"
							size="sm"
							disabled={isLoading}
							className="hidden md:ml-auto md:flex"
						>
							Guardar Excursion
						</Button>
					</div>

					<div className="grid gap-4 md:grid-cols-[1fr_300px] lg:gap-6">
						<div className="grid w-full auto-rows-max items-start gap-4 lg:gap-6">
							<Card x-chunk="dashboard-07-chunk-0">
								<CardHeader>
									<CardTitle>Excursion Details</CardTitle>
									<CardDescription>Detalles principales de la excursion</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid gap-6">
										<div className="grid gap-3">
											<FormField
												control={form.control}
												name="name"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Name</FormLabel>
														<FormControl>
															<Input type="text" className="w-full" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
										<div className="grid gap-3">
											<FormField
												control={form.control}
												name="slug"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Slug</FormLabel>
														<FormControl>
															<Input type="text" className="w-full" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
										<div className="grid gap-3">
											<FormField
												control={form.control}
												name="description"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Description</FormLabel>
														<FormControl>
															<Textarea className="min-h-32" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card x-chunk="dashboard-07-chunk-2">
								<CardHeader>
									<CardTitle>Que haras?</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid gap-4">
										{wathWillYouDoFields.map((field, index) => (
											<div className="grid gap-1.5" key={field.id}>
												<div className="flex items-center justify-between">
													<Label htmlFor="name">Titulo y Descripcion {index + 1}</Label>

													<Button
														type="button"
														onClick={() => wathWillYouDoRemove(index)}
														variant="secondary"
														size="sm"
													>
														Remover
													</Button>
												</div>
												<Input
													type="text"
													className="w-full"
													{...form.register(`whatWillYouDo.${index}.title` as const)}
													defaultValue={field.title}
												/>
												<Textarea
													className="w-full"
													{...form.register(`whatWillYouDo.${index}.description` as const)}
													defaultValue={field.description}
												/>
											</div>
										))}
										<Button
											type="button"
											onClick={() => wathWillYouDoAppend({ title: "", description: "" })}
											variant="outline"
											size="sm"
										>
											Agregar
										</Button>
									</div>
								</CardContent>
							</Card>

							<Card x-chunk="dashboard-07-chunk-2">
								<CardHeader>
									<CardTitle>En detalle</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid gap-4">
										{inDetailFields.map((field, index) => (
											<div className="grid gap-1.5" key={field.id}>
												<div className="flex items-center justify-between">
													<Label htmlFor="name">Titulo y Descripcion {index + 1}</Label>

													<Button
														type="button"
														onClick={() => inDetailRemove(index)}
														variant="secondary"
														size="sm"
													>
														Remover
													</Button>
												</div>
												<Input
													type="text"
													className="w-full"
													{...form.register(`inDetail.${index}.title` as const)}
													defaultValue={field.title}
												/>
												<Textarea
													className="w-full"
													{...form.register(`inDetail.${index}.description` as const)}
													defaultValue={field.description}
												/>
											</div>
										))}
										<Button
											type="button"
											onClick={() => inDetailAppend({ title: "", description: "" })}
											variant="outline"
											size="sm"
										>
											Agregar
										</Button>
									</div>
								</CardContent>
							</Card>

							<Card x-chunk="dashboard-07-chunk-2">
								<CardHeader>
									<CardTitle>Que incluye?</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid gap-1.5">
										{whatIncludesFields.map((field, index) => (
											<div className="grid gap-1.5" key={field.id}>
												<Label htmlFor="name">Item {index + 1}</Label>

												<div className="flex items-center justify-between gap-1">
													<Input
														type="text"
														className="w-full"
														{...form.register(`whatIncludes.${index}.item` as const)}
														defaultValue={field.item}
													/>
													<Button
														type="button"
														onClick={() => whatIncludesRemove(index)}
														variant="secondary"
													>
														Remover
													</Button>
												</div>

												<div className="text-red-500">
													{form.formState.errors.whatIncludes?.[index]?.item?.message}
												</div>
											</div>
										))}
										<Button
											type="button"
											onClick={() => whatIncludesAppend({ item: "" })}
											variant="outline"
											size="sm"
										>
											Agregar
										</Button>
									</div>
								</CardContent>
							</Card>

							<Card x-chunk="dashboard-07-chunk-2">
								<CardHeader>
									<CardTitle>Que debes llevar?</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid gap-1.5">
										{whatYouShouldBringFields.map((field, index) => (
											<div className="grid gap-1.5" key={field.id}>
												<Label htmlFor="name">Item {index + 1}</Label>

												<div className="flex items-center justify-between gap-1">
													<Input
														type="text"
														className="w-full"
														{...form.register(`whatYouShouldBring.${index}.item` as const)}
														defaultValue={field.item}
													/>
													<Button
														type="button"
														onClick={() => whatYouShouldBringRemove(index)}
														variant="secondary"
													>
														Remover
													</Button>
												</div>
											</div>
										))}

										<Button
											type="button"
											onClick={() => whatYouShouldBringAppend({ item: "" })}
											variant="outline"
											size="sm"
										>
											Agregar
										</Button>
									</div>
								</CardContent>
							</Card>

							<Card x-chunk="dashboard-07-chunk-2">
								<CardHeader>
									<CardTitle>FAQ</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid gap-4">
										{faqFields.map((field, index) => (
											<div className="grid gap-1.5" key={field.id}>
												<div className="flex items-center justify-between">
													<Label htmlFor="name">Pregunta y Respuesta {index + 1}</Label>

													<Button
														type="button"
														onClick={() => faqRemove(index)}
														variant="secondary"
														size="sm"
													>
														Remover
													</Button>
												</div>
												<Input
													type="text"
													className="w-full"
													{...form.register(`faq.${index}.question` as const)}
													defaultValue={field.question}
												/>
												<Textarea
													className="h-24 w-full"
													{...form.register(`faq.${index}.answer` as const)}
													defaultValue={field.answer}
												/>
											</div>
										))}
										<Button
											type="button"
											onClick={() => faqAppend({ question: "", answer: "" })}
											variant="outline"
											size="sm"
										>
											Agregar
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>

						<div className="grid w-full auto-rows-max items-start gap-4 lg:gap-6">
							<Card x-chunk="dashboard-07-chunk-3">
								<CardHeader>
									<CardTitle>Product Status</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid gap-6">
										<div className="grid gap-3">
											<FormField
												control={form.control}
												name="status"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Status</FormLabel>
														<Select onValueChange={field.onChange} defaultValue={field.value}>
															<FormControl>
																<SelectTrigger aria-label="Select status">
																	<SelectValue placeholder="Select status" />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																<SelectItem value="inactive">Inactive</SelectItem>
																<SelectItem value="active">Active</SelectItem>
															</SelectContent>
														</Select>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card x-chunk="dashboard-07-chunk-3">
								<CardHeader>
									<CardTitle>Price</CardTitle>
								</CardHeader>
								<CardContent>
									<FormField
										control={form.control}
										name="price"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Price</FormLabel>
												<FormControl>
													<Input type="number" className="w-full" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>

							<Card x-chunk="dashboard-07-chunk-2">
								<CardHeader>
									<CardTitle>Informacion del tour</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid gap-6">
										<FormField
											control={form.control}
											name="cancelation"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Cancelacion</FormLabel>
													<FormControl>
														<Input type="text" className="w-full" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="guide"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Guia</FormLabel>
													<FormControl>
														<Input type="text" className="w-full" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="includes"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Incluye</FormLabel>
													<FormControl>
														<Input type="text" className="w-full" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="duration"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Duracion</FormLabel>
													<FormControl>
														<Input type="text" className="w-full" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</CardContent>
							</Card>

							<ImagesCard
								images={imageResources}
								setImageResources={setImageResources}
								handleDeleteImage={handleDeleteImage}
							/>

							<Card x-chunk="dashboard-07-chunk-2">
								<CardHeader>
									<CardTitle>Fechas bloqueadas</CardTitle>
								</CardHeader>
								<CardContent>
									<Calendar
										mode="multiple"
										selected={datesBlocked}
										onSelect={(days) => setDatesBlocked(days ?? [])}
										className="rounded-md border"
									/>
								</CardContent>
							</Card>
						</div>
					</div>

					<Button disabled={isLoading} type="submit" size="sm" className="md:hidden">
						Save Product
					</Button>
				</form>
			</Form>
		</section>
	)
}
