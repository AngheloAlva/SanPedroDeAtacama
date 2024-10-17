import { getExcursionBySlug } from "@/actions/excursion/getExcursions"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { CheckIcon, ClockIcon, PersonIcon, CalendarIcon, CheckboxIcon } from "@radix-ui/react-icons"
import AddToCart from "@/components/shared/general/AddToCart"
import Galery from "@/components/shared/general/Galery"
import {
	Accordion,
	AccordionItem,
	AccordionContent,
	AccordionTrigger,
} from "@/components/ui/accordion"

import type { Locale } from "@/types/locales"

export default async function ExcursionBySlugPage({
	params,
}: {
	params: { excursionSlug: string; locale: string }
}): Promise<React.ReactElement> {
	const dbExcursion = await getExcursionBySlug(params["excursionSlug"], params.locale as Locale)

	if (!dbExcursion || dbExcursion.excursion_translation.title === "") return notFound()

	const t = await getTranslations("ExcursionSharedPage")

	const { excursion_translation, excursion } = dbExcursion

	return (
		<main className="mt-4 overflow-x-hidden pb-16 md:mx-auto md:mt-6 md:max-w-screen-xl md:px-2 lg:mt-8 lg:px-4">
			<section className="flex flex-col">
				{excursion.images && excursion.images.length > 4 && (
					<Galery
						excursionTitle={excursion_translation.title ?? ""}
						slides={excursion.images?.map((image) => ({
							src: image,
							type: "image",
						}))}
					/>
				)}

				<div className="gap-4 px-4 md:flex lg:gap-6">
					<div className="md:w-4/6">
						<div className="mt-4 flex flex-col overflow-x-hidden md:mt-6 lg:mt-8">
							<div className="space-y-4">
								<h1 className="text-pretty text-2xl font-extrabold tracking-wide md:text-3xl xl:text-4xl">
									{excursion_translation?.title}
								</h1>
								<p>{excursion_translation?.description}</p>
							</div>
						</div>

						<div>
							<h2 className="mt-8 text-xl font-bold md:mt-6">{t("tourInfo.title")}</h2>

							<div className="mt-4 flex flex-col gap-4">
								<div className="flex flex-row gap-2">
									<CalendarIcon className="mt-0.5 h-6 min-w-6" />
									<div className="flex flex-col">
										<span className="font-semibold">{t("tourInfo.cancel")}</span>
										<span className="text-sm font-medium text-muted-foreground">
											{excursion_translation?.cancelation}
										</span>
									</div>
								</div>
								<div className="flex flex-row gap-2">
									<PersonIcon className="mt-0.5 h-6 min-w-6" />
									<div className="flex flex-col">
										<span className="font-semibold">{t("tourInfo.guide")}</span>
										<span className="text-sm font-medium text-muted-foreground">
											{excursion_translation?.guide}
										</span>
									</div>
								</div>
								<div className="flex flex-row gap-2">
									<CheckboxIcon className="mt-0.5 h-6 min-w-6" />
									<div className="flex flex-col">
										<span className="font-semibold">{t("tourInfo.include")}</span>
										<span className="text-sm font-medium text-muted-foreground">
											{excursion_translation?.includes}
										</span>
									</div>
								</div>
								<div className="flex flex-row gap-2">
									<ClockIcon className="h-6 min-w-6" />
									<span className="font-semibold">
										{t("tourInfo.duration")} {excursion_translation?.duration}
									</span>
								</div>
							</div>
						</div>
					</div>

					<AddToCart
						id={excursion.id}
						modality="excursion"
						price={excursion.price}
						textFrom="ExcursionSharedPage"
						name={excursion_translation.title ?? ""}
						image={excursion.images?.[0] ?? "/placeholder.png"}
						days_not_available={excursion.days_not_available}
						days_of_week_not_available={excursion.days_of_week_not_available}
					/>
				</div>
			</section>

			<div className="mx-auto my-12 h-px w-[90%] bg-muted sm:w-[95%] lg:w-[98%]"></div>

			<section className="flex flex-col px-4">
				<h2 className="flex items-center gap-1 text-xl font-bold">
					<div className="h-0.5 w-4 bg-black" aria-hidden></div>
					{t("tourDescription.title")}
				</h2>

				<Accordion type="single" collapsible defaultValue="item-1">
					<AccordionItem value="item-1">
						<AccordionTrigger className="text-base font-bold">
							{t("tourDescription.whatWillYouDo")}
						</AccordionTrigger>
						<AccordionContent className="space-y-2 text-base">
							{excursion_translation?.what_will_you_do?.map((youDo, key) => (
								<p key={key}>
									<span className="font-semibold">{youDo.title}</span>
									<span className="">{youDo.description}</span>
								</p>
							))}
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger className="text-base font-bold">
							{t("tourDescription.inDetail")}
						</AccordionTrigger>
						<AccordionContent className="space-y-2 text-base">
							{excursion_translation?.in_detail?.map((detail, key) => (
								<p key={key}>
									<span className="font-semibold">{detail.title}</span>
									<span className="">{detail.description}</span>
								</p>
							))}
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger className="text-base font-bold">
							{t("tourDescription.whatIncludes")}
						</AccordionTrigger>
						<AccordionContent className="space-y-2 text-base">
							{excursion_translation?.what_includes?.map((item, key) => (
								<p className="flex items-start gap-1" key={key}>
									<CheckIcon className="mt-0.5 h-5 min-w-5 text-emerald-600" />
									{item}
								</p>
							))}
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-4">
						<AccordionTrigger className="text-base font-bold">
							{t("tourDescription.whatYouShouldBring")}
						</AccordionTrigger>
						<AccordionContent className="space-y-2 text-base">
							{excursion_translation?.what_you_should_bring?.map((item, key) => (
								<p key={key}>{item}</p>
							))}
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-5">
						<AccordionTrigger className="text-base font-bold">
							{t("tourDescription.meetingPoint")}
						</AccordionTrigger>
						<AccordionContent className="text-base">
							<p>{t("tourDescription.meetingPointText")}</p>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</section>

			<div className="mx-auto my-12 h-px w-[90%] bg-muted sm:w-[95%] lg:w-[98%]"></div>

			<section className="flex flex-col px-4">
				<h2 className="flex items-center gap-1 text-xl font-bold">
					<div className="h-0.5 w-4 bg-black" aria-hidden></div>
					{t("faq.title")}
				</h2>

				<Accordion type="single" collapsible defaultValue={"0"}>
					{excursion_translation?.faq?.map((item, key) => (
						<AccordionItem value={key.toString()} key={key}>
							<AccordionTrigger className="text-left text-base font-bold">
								{item.question}
							</AccordionTrigger>
							<AccordionContent className="text-left text-base">{item.answer}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</section>

			{/* <MoreExcursions excursionId={params["excursion-id"]} /> */}
		</main>
	)
}
