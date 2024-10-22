import { workWithUsSchema } from "@/lib/schemas/general/workWithUs.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { useToast } from "./use-toast"
import { useState } from "react"

import type { z } from "zod"

export const useWorkWithUsForm = () => {
	const t = useTranslations("WorkWithUsPage.response")

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

	const { toast } = useToast()

	const form = useForm<z.infer<typeof workWithUsSchema>>({
		resolver: zodResolver(workWithUsSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			address: "",
			position: "",
			languages: "",
			experience: "",
			finalQuestion: "",
			certifications: "",
			availability: false,
		},
	})

	const onSubmit = async (values: z.infer<typeof workWithUsSchema>) => {
		try {
			setIsSubmitting(true)

			const res = await fetch("/api/send/work-with-us", {
				method: "POST",
				body: JSON.stringify({
					values,
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
