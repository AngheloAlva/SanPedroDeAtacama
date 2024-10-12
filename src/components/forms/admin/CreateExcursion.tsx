"use client"

import { createExcursionSchema } from "@/lib/schemas/admin/createExcursion.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import { Link, useRouter } from "@/i18n/routing"
import { useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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

import type { zone } from "@/db/schema/zone"
import type { z } from "zod"
import { createExcursion } from "@/actions/excursion/createExcursion"

export default function CreateExcursionForm({
	zones,
}: {
	zones: (typeof zone.$inferSelect)[] | null
}): React.ReactElement {
	const [isLoading, setIsLoading] = useState(false)
	const { toast } = useToast()
	const router = useRouter()

	const form = useForm<z.infer<typeof createExcursionSchema>>({
		resolver: zodResolver(createExcursionSchema),
		defaultValues: {
			slug: "",
			price: "0",
			zoneId: "",
		},
	})

	const onSubmit = async (values: z.infer<typeof createExcursionSchema>) => {
		try {
			setIsLoading(true)

			const res = await createExcursion(values.slug, parseInt(values.price), values.zoneId)

			if (!res) {
				throw new Error("Failed to create excursion")
			}

			toast({
				title: "Excursion created successfully",
				description: "The excursion has been created successfully",
				duration: 5000,
			})
		} catch (error) {
			console.log(error)
			toast({
				title: "Failed to create excursion",
				description: "An error occurred while creating the excursion",
				variant: "destructive",
				duration: 5000,
			})
		} finally {
			router.push("/admin/dashboard/excursions")
		}
	}

	return (
		<section className="w-full">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="mx-auto grid w-full max-w-screen-md flex-1 auto-rows-max gap-4"
				>
					<div className="flex items-center gap-4">
						<Link href={"/admin/dashboard/excursions"}>
							<Button variant="outline" size="icon" className="h-7 w-7">
								<ChevronLeft className="h-4 w-4" />
								<span className="sr-only">Back</span>
							</Button>
						</Link>
						<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
							Create Excursion
						</h1>

						<Button
							type="submit"
							size="sm"
							disabled={isLoading}
							className="hidden md:ml-auto md:flex"
						>
							Create Excursion
						</Button>
					</div>

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
								</div>
								<div className="grid gap-3">
									<FormField
										control={form.control}
										name="zoneId"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Zone</FormLabel>
												<Select onValueChange={field.onChange} defaultValue={field.value}>
													<FormControl>
														<SelectTrigger aria-label="Select zone">
															<SelectValue placeholder="Select zone" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{zones?.map((zone) => (
															<SelectItem key={zone.id} value={zone.id} className="cursor-pointer">
																{zone.slug}
															</SelectItem>
														))}
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

					<Button disabled={isLoading} type="submit" size="sm" className="md:hidden">
						Save Excursion
					</Button>
				</form>
			</Form>
		</section>
	)
}
