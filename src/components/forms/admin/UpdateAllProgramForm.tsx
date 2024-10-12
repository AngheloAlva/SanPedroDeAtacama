"use client"

import { updateProgramSchema } from "@/lib/schemas/admin/updateProgram.schema"
import { updateProgramWithTranslation } from "@/actions/program/updateProgram"
import { deleteProgramImage } from "@/actions/program/deleteProgramImage"
import { useFieldArray, useForm, useFormContext } from "react-hook-form"
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

import type { ProgramWithTranslations } from "@/types/programs"
import type { z } from "zod"

export default function UpdateAllProgramForm({
	program: { program, program_translation },
	locale,
}: {
	program: ProgramWithTranslations
	locale: string
}): React.ReactElement {
	const [imageResources, setImageResources] = useState<string[]>(program?.images ?? [])
	const [isLoading, setIsLoading] = useState(false)
	const { toast } = useToast()

	const form = useForm<z.infer<typeof updateProgramSchema>>({
		resolver: zodResolver(updateProgramSchema),
		defaultValues: {
			slug: program?.slug,
			price: program?.price.toString(),
			guide: program_translation?.guide ?? "",
			includes: program_translation?.includes ?? "",
			duration: program_translation?.duration ?? "",
			itinerary: program_translation?.itinerary ?? [],
			status: program?.is_active ? "active" : "inactive",
			cancelation: program_translation?.cancelation ?? "",
			description: program_translation?.description ?? "",
			whatYouShouldBring: program_translation?.what_you_should_bring ?? [],
			title: program_translation?.title ?? { part1: "", part2: "", part3: "" },
			whatIncludes: (program_translation?.what_includes ?? []).map((item) => ({ item })),
			whatNotIncludes: (program_translation?.what_not_includes ?? []).map((item) => ({ item })),
		},
	})

	const handleDeleteImage = async (imageUrl: string) => {
		try {
			const res = await deleteProgramImage(imageUrl, program?.id ?? "")

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
		fields: whatIncludesFields,
		append: whatIncludesAppend,
		remove: whatIncludesRemove,
	} = useFieldArray({
		control: form.control,
		name: "whatIncludes",
	})

	const {
		fields: whatNotIncludesFields,
		append: whatNotIncludesAppend,
		remove: whatNotIncludesRemove,
	} = useFieldArray({
		control: form.control,
		name: "whatNotIncludes",
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
		fields: itineraryFields,
		append: itineraryAppend,
		remove: itineraryRemove,
	} = useFieldArray({
		control: form.control,
		name: "itinerary",
	})

	const onSubmit = async (values: z.infer<typeof updateProgramSchema>) => {
		try {
			setIsLoading(true)

			const res = await updateProgramWithTranslation(
				locale as "es",
				program?.id as string,
				program_translation?.id as string,
				values,
				imageResources
			)

			if (!res) {
				throw new Error("Failed to update program")
			}

			toast({
				title: "Program updated",
				description: "The program has been updated successfully",
				duration: 5000,
			})
		} catch (error) {
			console.log(error)
			toast({
				title: "Failed to update program",
				description: "An error occurred while updating the program",
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
						<Link href={"/admin/dashboard/programs"}>
							<Button variant="outline" size="icon" className="h-7 w-7">
								<ChevronLeft className="h-4 w-4" />
								<span className="sr-only">Back</span>
							</Button>
						</Link>
						<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
							{program_translation?.title?.part1}
						</h1>

						<Button
							type="submit"
							size="sm"
							disabled={isLoading}
							className="hidden md:ml-auto md:flex"
						>
							Guardar Programa
						</Button>
					</div>

					<div className="grid gap-4 md:grid-cols-[1fr_300px] lg:gap-6">
						<div className="grid w-full auto-rows-max items-start gap-4 lg:gap-6">
							<Card x-chunk="dashboard-07-chunk-0">
								<CardHeader>
									<CardTitle>Programs Details</CardTitle>
									<CardDescription>Detalles principales del programa</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid gap-6">
										<div className="grid gap-3">
											<FormField
												control={form.control}
												name="title.part1"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Title Part 1</FormLabel>
														<FormControl>
															<Input type="text" className="w-full" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="title.part2"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Title Part 2</FormLabel>
														<FormControl>
															<Input type="text" className="w-full" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="title.part3"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Title Part 3</FormLabel>
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
									<CardTitle>Que incluye?</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid gap-4">
										{whatIncludesFields.map((field, index) => (
											<div className="grid gap-1.5" key={field.id}>
												<div className="flex items-center justify-between">
													<Label htmlFor="name">Titulo y Descripcion {index + 1}</Label>

													<Button
														type="button"
														onClick={() => whatIncludesRemove(index)}
														variant="secondary"
														size="sm"
													>
														Remover
													</Button>
												</div>
												<Input
													type="text"
													className="w-full"
													{...form.register(`whatIncludes.${index}.item` as const)}
													defaultValue={field.item}
												/>
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
									<CardTitle>Que no incluye?</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid gap-4">
										{whatNotIncludesFields.map((field, index) => (
											<div className="grid gap-1.5" key={field.id}>
												<div className="flex items-center justify-between">
													<Label htmlFor="name">Titulo y Descripcion {index + 1}</Label>

													<Button
														type="button"
														onClick={() => whatNotIncludesRemove(index)}
														variant="secondary"
														size="sm"
													>
														Remover
													</Button>
												</div>
												<Input
													type="text"
													className="w-full"
													{...form.register(`whatNotIncludes.${index}.item` as const)}
													defaultValue={field.item}
												/>
											</div>
										))}
										<Button
											type="button"
											onClick={() => whatNotIncludesAppend({ item: "" })}
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
												<div className="flex items-center justify-between">
													<Label htmlFor="name">Titulo y descripcion {index + 1}</Label>

													<Button
														type="button"
														onClick={() => whatYouShouldBringRemove(index)}
														variant="secondary"
													>
														Remover
													</Button>
												</div>

												<div className="flex flex-col items-center justify-between gap-1">
													<Input
														type="text"
														className="w-full"
														{...form.register(`whatYouShouldBring.${index}.title` as const)}
														defaultValue={field.title}
													/>
													<Textarea
														className="h-24 w-full"
														{...form.register(`whatYouShouldBring.${index}.description` as const)}
														defaultValue={field.description}
													/>
												</div>

												<div className="text-red-500">
													{form.formState.errors.whatIncludes?.[index]?.item?.message}
												</div>
											</div>
										))}
										<Button
											type="button"
											onClick={() => whatYouShouldBringAppend({ title: "", description: "" })}
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
									<CardTitle>Itinerario</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid gap-2">
										{itineraryFields.map((field, index) => {
											return (
												<div className="grid gap-1.5" key={field.id}>
													<div className="flex items-center justify-between gap-1">
														<Label htmlFor="name">Item {index + 1}</Label>
														<Button
															type="button"
															onClick={() => itineraryRemove(index)}
															variant="secondary"
														>
															Remover
														</Button>
													</div>

													<Input
														type="text"
														className="w-full"
														{...form.register(`itinerary.${index}.name` as const)}
														defaultValue={field.name}
													/>
													<Input
														type="text"
														className="w-full"
														{...form.register(`itinerary.${index}.title` as const)}
														defaultValue={field.title}
													/>

													<NestedArray fieldIndex={index} />
												</div>
											)
										})}

										<Button
											type="button"
											className="mt-4"
											onClick={() =>
												itineraryAppend({
													name: "",
													title: "",
													activities: [
														{ description: "", excursion: { name: "", slug: "" }, time: "" },
													],
												})
											}
											variant="outline"
											size="sm"
										>
											Agregar item
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>

						<div className="grid w-full auto-rows-max items-start gap-4 lg:gap-6">
							<Card x-chunk="dashboard-07-chunk-3">
								<CardHeader>
									<CardTitle>Program Status</CardTitle>
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

function NestedArray({ fieldIndex }: { fieldIndex: number }) {
	const { register } = useFormContext()

	const { fields, append, remove } = useFieldArray({
		name: `itinerary.${fieldIndex}.activities`,
	})

	return (
		<div className="ml-4 grid gap-1.5">
			{fields.map((field, index) => (
				<div className="grid gap-1.5" key={field.id}>
					<div className="flex items-center justify-between gap-1">
						<Label htmlFor="name">Actividad {index + 1}</Label>
						<Button type="button" onClick={() => remove(index)} variant="secondary">
							Remover
						</Button>
					</div>

					<Input
						type="text"
						className="w-full"
						{...register(`itinerary.${fieldIndex}.activities.${index}.description` as const)}
					/>
					<Input
						type="text"
						className="w-full"
						{...register(`itinerary.${fieldIndex}.activities.${index}.time` as const)}
					/>
					<Textarea
						className="h-32 w-full"
						{...register(`itinerary.${fieldIndex}.activities.${index}.description` as const)}
					/>
				</div>
			))}
			<Button
				type="button"
				onClick={() =>
					append({
						description: "",
						excursion: { name: "", slug: "" },
						time: "",
					})
				}
				variant="outline"
				size="sm"
			>
				Agregar actividad
			</Button>
		</div>
	)
}
