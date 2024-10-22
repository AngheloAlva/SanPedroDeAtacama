import { contactSchema } from "@/lib/schemas/general/contact.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { useState } from "react"

import type { z } from "zod"
import { useToast } from "./use-toast"

export const useContactForm = (source: string) => {
	const t = useTranslations("ContactPage.response")

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

	const { toast } = useToast()

	const form = useForm<z.infer<typeof contactSchema>>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			message: "",
			email: "",
			phone: "",
			name: "",
		},
	})

	const onSubmit = async (values: z.infer<typeof contactSchema>) => {
		try {
			setIsSubmitting(true)

			const res = await fetch("/api/send/contact", {
				method: "POST",
				body: JSON.stringify({
					values,
					source,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			})

			if (res.ok) {
				form.reset()

				toast({
					title: t("success.title"),
					description: t("success.description"),
					duration: 4000,
				})
			}
		} catch (error) {
			console.error(error)

			toast({
				title: t("error.title"),
				description: t("error.description"),
				variant: "destructive",
				duration: 4000,
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return {
		form,
		onSubmit,
		isSubmitting,
	}
}
