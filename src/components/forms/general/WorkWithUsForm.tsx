"use client"

import { useWorkWithUsForm } from "@/hooks/useWorkWithUsForm"
import { useTranslations } from "next-intl"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

export default function WorkWithUsForm(): React.ReactElement {
	const t = useTranslations("WorkWithUsPage")
	const positionKeys = Array.from({ length: 5 }, (_, i) => i.toString())

	const { form, onSubmit, isSubmitting } = useWorkWithUsForm()

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="oveer relative mx-auto mt-5 grid h-fit w-full min-w-0 max-w-screen-md grid-cols-1 items-center justify-center gap-y-5 rounded-lg border bg-white px-2 py-5 shadow sm:px-5 sm:py-5 md:grid-cols-2 md:gap-x-5 md:gap-y-8"
			>
				<h3 className="text-xl font-semibold md:col-span-2">{t("form.section1")}</h3>

				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="flex flex-col items-start">
							<FormLabel className="text-base font-semibold">{t("form.name.label")}</FormLabel>
							<FormControl>
								<Input className="w-full" placeholder={t("form.name.placeholder")} {...field} />
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
							<FormLabel className="text-base font-semibold">{t("form.email.label")}</FormLabel>
							<FormControl>
								<Input className="w-full" placeholder={t("form.email.placeholder")} {...field} />
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
							<FormLabel className="text-base font-semibold">{t("form.phone.label")}</FormLabel>
							<FormControl>
								<Input
									className="w-full border px-2 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
									placeholder={t("form.phone.placeholder")}
									type="tel"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="address"
					render={({ field }) => (
						<FormItem className="flex flex-col items-start">
							<FormLabel className="text-base font-semibold">{t("form.address.label")}</FormLabel>
							<FormControl>
								<Input
									className="w-full border px-2 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
									placeholder={t("form.address.placeholder")}
									type="tel"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="h-px w-full bg-black/20 md:col-span-2"></div>
				<h3 className="text-xl font-semibold md:col-span-2">{t("form.section2")}</h3>

				<FormField
					control={form.control}
					name="position"
					render={({ field }) => (
						<FormItem className="flex h-full flex-col items-start">
							<FormLabel className="text-base font-semibold">{t("form.position.label")}</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="h-fit w-full border px-3 py-2 shadow-none focus:outline-none focus:ring-2 focus:ring-black/20">
										<SelectValue placeholder={t("form.position.placeholder")} />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{positionKeys.map((key) => (
										<SelectItem value={t(`form.position.items.${key}`)} key={key}>
											{t(`form.position.items.${key}`)}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="languages"
					render={({ field }) => (
						<FormItem className="flex flex-col items-start">
							<FormLabel className="text-base font-semibold">{t("form.languages.label")}</FormLabel>
							<FormControl>
								<textarea
									className="flex h-20 min-h-14 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
									placeholder={t("form.languages.placeholder")}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="experience"
					render={({ field }) => (
						<FormItem className="flex flex-col items-start md:col-span-2">
							<FormLabel className="text-base font-semibold">
								{t("form.experience.label")}
							</FormLabel>
							<FormControl>
								<textarea
									className="flex h-24 min-h-20 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
									placeholder={t("form.experience.placeholder")}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="certifications"
					render={({ field }) => (
						<FormItem className="flex flex-col items-start md:col-span-2">
							<FormLabel className="text-base font-semibold">
								{t("form.certifications.label")}
							</FormLabel>
							<FormControl>
								<textarea
									className="flex h-24 min-h-20 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
									placeholder={t("form.certifications.placeholder")}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* <FormItem>
					<FormLabel className="text-base font-semibold">{t("form.cv.label")}</FormLabel>
					<Input type="file" accept=".pdf,.doc,.docx" />
					<FormDescription>{t("form.cv.description")}</FormDescription>
				</FormItem> */}

				<FormField
					control={form.control}
					name="availability"
					render={({ field }) => (
						<FormItem className="flex h-full flex-row items-center space-x-3 space-y-0 rounded-md p-3">
							<FormControl>
								<Checkbox checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel className="text-base font-medium">
									{t("form.availability.label")}
								</FormLabel>
							</div>
						</FormItem>
					)}
				/>

				<div className="h-px w-full bg-black/20 md:col-span-2"></div>
				<h3 className="text-xl font-semibold md:col-span-2">{t("form.section3")}</h3>

				<FormField
					control={form.control}
					name="finalQuestion"
					render={({ field }) => (
						<FormItem className="flex flex-col items-start md:col-span-2">
							<FormLabel className="text-base font-semibold">
								{t("form.finalQuestion.label")}
							</FormLabel>
							<FormControl>
								<textarea
									className="flex h-32 min-h-20 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
									placeholder={t("form.finalQuestion.placeholder")}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					className="mt-3 h-fit rounded-lg py-3 text-base font-bold tracking-wider md:col-span-2"
					type="submit"
					disabled={isSubmitting}
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
						t("form.submit")
					)}
				</Button>
			</form>
		</Form>
	)
}
