"use client"

import { createProgramSchema } from "@/lib/schemas/admin/createProgram.schema"
import { createProgram } from "@/actions/program/createProgram"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useRouter } from "@/i18n/routing"
import { useToast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import { useState } from "react"

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

import type { z } from "zod"

export default function CreateProgramForm(): React.ReactElement {
	const [isLoading, setIsLoading] = useState(false)
	const { toast } = useToast()
	const router = useRouter()

	const form = useForm<z.infer<typeof createProgramSchema>>({
		resolver: zodResolver(createProgramSchema),
		defaultValues: {
			slug: "",
			price: "0",
		},
	})

	const onSubmit = async (values: z.infer<typeof createProgramSchema>) => {
		try {
			setIsLoading(true)

			const res = await createProgram(values.slug, parseInt(values.price))

			if (!res) {
				throw new Error("Failed to create program")
			}

			toast({
				title: "Program created successfully",
				description: "The program has been created successfully",
				duration: 5000,
			})
		} catch (error) {
			console.log(error)
			toast({
				title: "Failed to create program",
				description: "An error occurred while creating the program",
				variant: "destructive",
				duration: 5000,
			})
		} finally {
			router.push("/admin/dashboard/programs")
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
						<Link href={"/admin/dashboard/programs"}>
							<Button variant="outline" size="icon" className="h-7 w-7">
								<ChevronLeft className="h-4 w-4" />
								<span className="sr-only">Back</span>
							</Button>
						</Link>
						<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
							Create Program
						</h1>

						<Button
							type="submit"
							size="sm"
							disabled={isLoading}
							className="hidden md:ml-auto md:flex"
						>
							Create Program
						</Button>
					</div>

					<Card x-chunk="dashboard-07-chunk-0">
						<CardHeader>
							<CardTitle>Program Details</CardTitle>
							<CardDescription>Detalles principales del programa</CardDescription>
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
