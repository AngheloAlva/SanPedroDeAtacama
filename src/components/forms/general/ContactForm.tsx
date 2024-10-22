"use client"

import { useContactForm } from "@/hooks/useContactForm"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
	Form,
	FormItem,
	FormField,
	FormLabel,
	FormMessage,
	FormControl,
} from "@/components/ui/form"

export default function ContactForm({
	decorationColor = "#00b2bf",
	source = "wholesaler",
}: {
	decorationColor: string
	source: string | null
}): React.ReactElement {
	const t = useTranslations("ContactPage.form")

	const { form, onSubmit, isSubmitting } = useContactForm(source || "contact")

	return (
		<div className="relative z-0 mx-auto mt-14 flex h-fit w-full min-w-0 max-w-screen-sm items-center justify-center rounded-lg border bg-white px-2 py-5 md:shadow-xl 2xl:max-w-screen-md">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="z-20 mx-auto grid w-full grid-cols-1 gap-y-5 sm:px-5 sm:py-5 md:grid-cols-2 md:gap-x-5 md:gap-y-8"
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="flex flex-col items-start">
								<FormLabel className="text-base font-semibold">{t("name.label")}</FormLabel>
								<FormControl>
									<Input
										className={`w-full border-b-[${decorationColor}]`}
										placeholder={t("name.placeholder")}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="flex flex-col items-start">
								<FormLabel className="text-base font-semibold">{t("email.label")}</FormLabel>
								<FormControl>
									<Input
										className={`w-full border-b-[${decorationColor}]`}
										placeholder={t("email.placeholder")}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem className="flex flex-col items-start">
								<FormLabel className="text-base font-semibold">{t("phone.label")}</FormLabel>
								<FormControl>
									<Input
										type="tel"
										className={`w-full border-b-[${decorationColor}]`}
										placeholder={t("phone.placeholder")}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="message"
						render={({ field }) => (
							<FormItem className="flex flex-col items-start md:col-span-2">
								<FormLabel className="text-base font-semibold">{t("message.label")}</FormLabel>
								<FormControl>
									<textarea
										className={`flex h-40 min-h-28 w-full rounded-lg border border-input border-b-[${decorationColor}] bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`}
										placeholder={t("message.placeholder")}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						className={`mt-3 h-fit rounded-lg py-3 text-base font-bold tracking-wider md:col-span-2 xl:text-lg bg-[${decorationColor}] hover:bg-[${decorationColor}] hover:brightness-75`}
						disabled={isSubmitting}
						type="submit"
					>
						{isSubmitting ? (
							<div
								className="text-surface inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
								role="status"
							>
								<span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
									Loading...
								</span>
							</div>
						) : (
							t("submit")
						)}
					</Button>
				</form>
			</Form>
		</div>
	)
}
