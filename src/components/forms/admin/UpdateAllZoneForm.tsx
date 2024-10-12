"use client"

import { updateZoneSchema } from "@/lib/schemas/admin/updateZone.schema"
import { updateZoneWithTranslation } from "@/actions/zone/updateZone"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import { Link } from "@/i18n/routing"
import { useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft } from "lucide-react"
import {
	Form,
	FormItem,
	FormLabel,
	FormField,
	FormControl,
	FormMessage,
} from "@/components/ui/form"

import type { ZoneWithTranslations } from "@/types/zones"
import type { z } from "zod"

export default function UpdateAllZoneForm({
	zone: { zone, zone_translation },
}: {
	zone: ZoneWithTranslations
}): React.ReactElement {
	const [isLoading, setIsLoading] = useState(false)
	const { toast } = useToast()

	const form = useForm<z.infer<typeof updateZoneSchema>>({
		resolver: zodResolver(updateZoneSchema),
		defaultValues: {
			slug: zone?.slug,
			name: zone_translation?.name ?? "",
			description: zone_translation?.description ?? "",
		},
	})

	const onSubmit = async (values: z.infer<typeof updateZoneSchema>) => {
		try {
			setIsLoading(true)

			const res = await updateZoneWithTranslation(
				"es",
				zone?.id as string,
				zone_translation?.id as string,
				values
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
						<Link href={"/admin/dashboard/programs"}>
							<Button variant="outline" size="icon" className="h-7 w-7">
								<ChevronLeft className="h-4 w-4" />
								<span className="sr-only">Back</span>
							</Button>
						</Link>
						<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
							{zone_translation?.name}
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
									<CardTitle>Zone Details</CardTitle>
									<CardDescription>Detalles principales de la zona</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid gap-6">
										<div className="grid gap-3">
											<FormField
												control={form.control}
												name="name"
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
						</div>

						<div className="grid w-full auto-rows-max items-start gap-4 lg:gap-6"></div>
					</div>

					<Button disabled={isLoading} type="submit" size="sm" className="md:hidden">
						Save Product
					</Button>
				</form>
			</Form>
		</section>
	)
}
