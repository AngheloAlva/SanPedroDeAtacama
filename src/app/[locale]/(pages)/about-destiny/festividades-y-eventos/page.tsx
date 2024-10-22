import { getTranslations } from "next-intl/server"
import { useTranslations } from "next-intl"
import { notFound } from "next/navigation"

import AboutDestinyCarousel from "@/components/sections/about-destiny/AboutDestinyCarousel"
import ImageLoader from "@/components/shared/general/ImageLoader"

export async function generateMetadata() {
	const t = await getTranslations("AboutDestiny.festividades-y-eventos")

	return {
		title: t("title"),
		description: t("intro"),
	}
}

export default function FestivitiesAndEventsPage(): React.ReactElement {
	const t = useTranslations(`AboutDestiny.festividades-y-eventos`)

	if (isNaN(Number(t("sections-lenght")))) {
		notFound()
	}

	const sectionsKeys = Array.from({ length: Number(t("sections-lenght")) }, (_, i) => i.toString())

	return (
		<main className="py-14 lg:pt-24">
			<div className="text-center">
				<h1 className="mx-auto max-w-screen-md px-4 text-3xl font-bold md:text-4xl">
					{t("title")}
				</h1>
				<p className="mx-auto mt-4 max-w-screen-md text-pretty px-4 text-base lg:text-lg">
					{t("intro")}
				</p>

				<ImageLoader
					width={2304}
					height={1296}
					src={t("intro-img")}
					alt={t("intro-alt")}
					className="mb-24 mt-14 h-auto w-full lg:mt-20"
				/>
			</div>

			{sectionsKeys.map((sectionKey) => (
				<div className="flex flex-col items-center justify-center" key={sectionKey}>
					<h2 className="mx-auto w-full max-w-screen-md px-4 text-xl font-semibold lg:text-2xl">
						{t(`sections.${sectionKey}.title`)}
					</h2>
					<div className="mx-auto mt-2 flex max-w-screen-md flex-col gap-4 text-pretty px-4 md:text-lg">
						{Array.from(
							{ length: Number(t(`sections.${sectionKey}.description-length`)) },
							(_, i) => i.toString()
						).map((subSectionKey) => (
							<p key={subSectionKey}>{t(`sections.${sectionKey}.description-${subSectionKey}`)}</p>
						))}
					</div>

					<div className="mb-24 mt-14 flex flex-col items-start gap-2">
						<ImageLoader
							width={2304}
							height={1296}
							className="h-auto w-[90vw] rounded-lg"
							src={t(`sections.${sectionKey}.image`)}
							alt={t(`sections.${sectionKey}.image-alt`)}
						/>
					</div>
				</div>
			))}

			<div className="mx-auto flex max-w-screen-md flex-col items-center justify-center">
				<h2 className="mx-auto w-full px-4 text-xl font-semibold lg:text-2xl">
					{t(`festivities.title`)}
				</h2>
				<p className="mx-auto mt-2 text-pretty px-4 text-base lg:text-lg">
					{t(`festivities.intro`)}
				</p>

				<div className="mx-auto mt-6 flex flex-col gap-5 text-pretty px-4 md:text-lg lg:gap-8">
					{Array.from({ length: Number(t(`festivities.quantity`)) }, (_, i) => i.toString()).map(
						(subSectionKey) => (
							<div key={subSectionKey} className="lg:space-y-0.5">
								<h3 className="text-lg font-semibold lg:text-xl">
									{t(`festivities.${subSectionKey}.title`)}
								</h3>
								<p>
									<strong className="font-semibold">{t(`festivities.shared.date`)}</strong>
									{t(`festivities.${subSectionKey}.date`)}
								</p>
								<p>
									<strong className="font-semibold">{t(`festivities.shared.place`)}</strong>
									{t(`festivities.${subSectionKey}.place`)}
								</p>
								<p>
									<strong className="font-semibold">{t(`festivities.shared.meaning`)}</strong>
									{t(`festivities.${subSectionKey}.meaning`)}
								</p>
							</div>
						)
					)}
				</div>

				<p className="mx-auto mt-8 text-pretty px-4 text-base lg:mt-10 lg:text-lg">
					{t(`festivities.outro`)}
				</p>
			</div>

			<AboutDestinyCarousel className="mx-auto mt-32 max-w-screen-xl pl-0 lg:px-0" />
		</main>
	)
}
