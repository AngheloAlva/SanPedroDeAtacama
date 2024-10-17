import { getProgramBySlug } from "@/actions/program/getPrograms"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { Link } from "@/i18n/routing"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AddToCart from "@/components/shared/general/AddToCart"
import Galery from "@/components/shared/general/Galery"
import {
	CheckIcon,
	ClockIcon,
	PersonIcon,
	CalendarIcon,
	CheckboxIcon,
	Cross2Icon,
} from "@radix-ui/react-icons"
import {
	Accordion,
	AccordionItem,
	AccordionContent,
	AccordionTrigger,
} from "@/components/ui/accordion"

import type { Locale } from "@/types/locales"

// export async function generateMetadata({ params: { locale, programSlug } }: { params: { locale: string, programSlug: string } }) {
// 	const program = getProgramBySlug(programSlug, locale as Locale)

// 	return {
// 		title: `${t("title")} ${t("subTitle")} | Turismochiletours`,
// 		description: t("description"),
// 	}
// }

export default async function ProgramBySlugPage({
	params: { locale, programSlug },
}: {
	params: { locale: string; programSlug: string }
}): Promise<React.ReactElement> {
	const dbProgram = await getProgramBySlug(programSlug, locale as Locale)

	if (!dbProgram || dbProgram.program_translation.title?.part1 === "") return notFound()

	const t = await getTranslations("ProgramSharedPage")

	const { program, program_translation } = dbProgram
	const fullTitle = `${program_translation.title?.part1} - ${program_translation.title?.part2} ${program_translation.title?.part3}`

	return (
		<main className="mb-10 mt-4 overflow-x-hidden py-4 md:mx-auto md:mt-6 md:max-w-screen-xl lg:mb-14 lg:mt-8">
			<section className="flex flex-col">
				{program.images && program.images.length > 6 && (
					<Galery
						excursionTitle={fullTitle}
						slides={program.images?.map((image) => ({
							src: image,
							type: "image",
						}))}
					/>
				)}

				<div className="gap-4 px-4 md:flex md:px-6 lg:gap-6">
					<div className="md:w-4/6">
						<div className="mt-4 flex flex-col overflow-x-hidden md:mt-6 lg:mt-8">
							<div className="space-y-4">
								<h1 className="flex flex-col text-xl font-extrabold tracking-wide md:text-3xl xl:text-4xl">
									{program_translation.title?.part1} - {program_translation.title?.part2}
									<span className="text-lg md:text-2xl lg:text-3xl">
										{program_translation.title?.part3}
									</span>
								</h1>
								<p className="">{program_translation.description}</p>
							</div>
						</div>

						<div>
							<h2 className="mt-8 text-xl font-bold md:mt-6">{t("tourInfo.title")}</h2>

							<div className="mt-4 flex flex-col gap-4">
								<div className="flex flex-row gap-2">
									<CalendarIcon className="h-6 min-w-6" />
									<div className="flex flex-col gap-2">
										<span className="font-semibold">{t("tourInfo.cancel")}</span>
										<span className="text-sm font-medium text-muted-foreground">
											{program_translation.cancelation}
										</span>
									</div>
								</div>
								<div className="flex flex-row gap-2">
									<PersonIcon className="h-6 min-w-6" />
									<div className="flex flex-col gap-2">
										<span className="font-semibold">{t("tourInfo.guide")}</span>
										<span className="text-sm font-medium text-muted-foreground">
											{program_translation.guide}
										</span>
									</div>
								</div>
								<div className="flex flex-row gap-2">
									<CheckboxIcon className="h-6 min-w-6" />
									<div className="flex flex-col gap-2">
										<span className="font-semibold">{t("tourInfo.include")}</span>
										<span className="text-sm font-medium text-muted-foreground">
											{program_translation.includes}
										</span>
									</div>
								</div>
								<div className="flex flex-row gap-2">
									<ClockIcon className="h-6 min-w-6" />
									<span className="font-semibold">
										{t("tourInfo.duration")} {program_translation.duration}
									</span>
								</div>
							</div>
						</div>
					</div>

					<AddToCart
						id={program.id}
						name={fullTitle}
						modality="program"
						price={program.price}
						textFrom="ProgramSharedPage"
						image={program.images?.[0] ?? "/placeholder.png"}
						days_not_available={program.days_not_available}
						days_of_week_not_available={program.days_of_week_not_available}
					/>
				</div>
			</section>

			<div className="mx-auto my-12 h-px w-[90%] bg-muted sm:w-[95%] lg:w-[98%]"></div>

			{program_translation.itinerary && program_translation.itinerary.length > 0 && (
				<Tabs defaultValue={program_translation.itinerary[0].name} className="w-full px-4 md:px-6">
					<TabsList className="w-full">
						{program_translation.itinerary.map((day) => (
							<TabsTrigger key={day.name} value={day.name} className="w-full">
								{day.name}
							</TabsTrigger>
						))}
					</TabsList>

					{program_translation.itinerary.map((day) => (
						<TabsContent value={day.name} key={day.title}>
							<div className="flex flex-col gap-4 rounded-lg border p-2 shadow md:p-3 lg:p-4">
								<h3 className="flex items-center gap-x-1 text-lg font-bold lg:text-xl">
									{day.title}
								</h3>

								{day.activities.map((activity, index) => (
									<div className="flex flex-col" key={index}>
										<p className="flex items-center gap-1 text-pretty font-semibold">
											<ClockIcon className="-mt-0.5" />
											{activity.time}
											<Link href={`/excursions/${activity.excursion.slug}`}>
												<span className="cursor-pointer text-[#e1713f] hover:underline">
													{activity.excursion.name}
												</span>
											</Link>
										</p>
										<p className="text-neutral-800">{activity.description}</p>
									</div>
								))}
							</div>
						</TabsContent>
					))}
				</Tabs>
			)}

			<section className="mb-20 mt-14 flex flex-col px-4 md:px-6">
				<Accordion type="single" collapsible defaultValue="item-1">
					<AccordionItem value="item-1">
						<AccordionTrigger className="text-base font-bold">
							{t("tourDescription.whatIncludes")}
						</AccordionTrigger>
						<AccordionContent className="flex flex-col gap-2">
							{program_translation?.what_includes?.map((item, index) => (
								<p className="flex items-start gap-1 text-base font-medium" key={index}>
									<CheckIcon className="text-green-800 mt-0.5 h-5 min-w-5" />
									{item}
								</p>
							))}
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-2">
						<AccordionTrigger className="text-base font-bold">
							{t("tourDescription.whatNotIncludes")}
						</AccordionTrigger>
						<AccordionContent className="flex flex-col gap-2">
							{program_translation?.what_not_includes?.map((item, index) => (
								<p className="flex items-start gap-1 text-base font-medium" key={index}>
									<Cross2Icon className="mt-0.5 h-5 min-w-5 text-red-500" />
									{item}
								</p>
							))}
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-3">
						<AccordionTrigger className="text-base font-bold">
							{t("tourDescription.whatYouShouldBring")}
						</AccordionTrigger>
						<AccordionContent className="flex flex-col gap-2">
							{program_translation?.what_you_should_bring?.map((item, index) => (
								<p className="text-base font-semibold" key={index}>
									{item.title}
									<span className="ml-1 font-normal">{item.description}</span>
								</p>
							))}

							<div className="mt-4 flex flex-col gap-2">
								<p className="text-base font-medium text-muted-foreground">
									{t("tourDescription.notes.0")}
								</p>
								<p className="text-base font-medium text-muted-foreground">
									{t("tourDescription.notes.1")}
								</p>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-4">
						<AccordionTrigger className="text-base font-bold">
							{t("tourDescription.meetingPoint")}
						</AccordionTrigger>
						<AccordionContent className="flex flex-col gap-2">
							<p className="text-base font-medium">{t("tourDescription.meetingPointText")}</p>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</section>

			{/* <MorePrograms programId="3-days" /> */}
		</main>
	)
}
