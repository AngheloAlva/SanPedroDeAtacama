"use client"

import { createZone } from "@/actions/zone/createZone"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useRouter } from "@/i18n/routing"
import { useToast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { z } from "zod"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

const createZoneSchema = z.object({
	slug: z.string().min(3),
})

export default function CreateZoneForm(): React.ReactElement {
	const [isLoading, setIsLoading] = useState(false)
	const { toast } = useToast()
	const router = useRouter()

	const form = useForm<z.infer<typeof createZoneSchema>>({
		resolver: zodResolver(createZoneSchema),
		defaultValues: {
			slug: "",
		},
	})

	const onSubmit = async (values: z.infer<typeof createZoneSchema>) => {
		try {
			setIsLoading(true)

			const res = await createZone(values.slug)

			if (!res) {
				throw new Error("Failed to create zone")
			}

			toast({
				title: "Zone created successfully",
				description: "The zone has been created successfully",
				duration: 5000,
			})
		} catch (error) {
			console.log(error)
			toast({
				title: "Failed to create zone",
				description: "An error occurred while creating the zone",
				variant: "destructive",
				duration: 5000,
			})
		} finally {
			router.push("/admin/dashboard/zones")
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
						<Link href={"/admin/dashboard/zones"}>
							<Button variant="outline" size="icon" className="h-7 w-7">
								<ChevronLeft className="h-4 w-4" />
								<span className="sr-only">Back</span>
							</Button>
						</Link>
						<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
							Create Zone
						</h1>

						<Button
							type="submit"
							size="sm"
							disabled={isLoading}
							className="hidden md:ml-auto md:flex"
						>
							Create Zone
						</Button>
					</div>

					<Card x-chunk="dashboard-07-chunk-0">
						<CardHeader>
							<CardTitle>Zone Details</CardTitle>
							<CardDescription>Detalles principales del zonea</CardDescription>
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
							</div>
						</CardContent>
					</Card>

					<Button disabled={isLoading} type="submit" size="sm" className="md:hidden">
						Save Program
					</Button>
				</form>
			</Form>
		</section>
	)
}
