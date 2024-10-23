"use client"

import { adminLoginSchema } from "@/lib/schemas/admin/adminLogin.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "@/i18n/routing"
import { useForm } from "react-hook-form"
import { useState } from "react"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
	Form,
	FormItem,
	FormLabel,
	FormField,
	FormControl,
	FormMessage,
} from "@/components/ui/form"

import type { z } from "zod"
import { Button } from "@/components/ui/button"

export default function AdminLoginForm(): React.ReactElement {
	const [isLoading, setIsLoading] = useState(false)
	const { toast } = useToast()
	const router = useRouter()

	const form = useForm<z.infer<typeof adminLoginSchema>>({
		resolver: zodResolver(adminLoginSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	})

	const onSubmit = async (values: z.infer<typeof adminLoginSchema>) => {
		setIsLoading(true)

		const { password, username } = values

		try {
			const response = await fetch("/api/admin/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			})

			if (response.ok) {
				router.push("/admin/dashboard")
			} else {
				toast({
					title: "Error",
					description: "Credenciales inválidas",
					variant: "destructive",
				})

				setIsLoading(false)
			}
		} catch (error) {
			console.log(error)
			toast({
				title: "Error",
				description: "Ocurrió un error al iniciar sesión",
				variant: "destructive",
			})

			setIsLoading(false)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Card>
					<CardHeader>
						<CardTitle>Iniciar sesión</CardTitle>
						<CardDescription>Inicia sesión con tu cuenta de administrador</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-3">
							<div className="grid gap-3">
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
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
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Contraseña</FormLabel>
											<FormControl>
												<Input type="password" className="w-full" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<Button type="submit" size="lg" disabled={isLoading} className="w-full">
							Iniciar sesión
						</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	)
}
