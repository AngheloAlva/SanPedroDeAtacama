import { getExcursionsWithTranslations } from "@/actions/excursion/getExcursions"
import { getProgramsWithTranslations } from "@/actions/program/getPrograms"
import { getTranslations } from "next-intl/server"

import ExcursionCard from "@/components/excursions/general/ExcursionCard"
import ProgramCard from "@/components/programs/general/ProgramCard"
import HeroCarousel from "@/components/sections/home/HeroCarousel"
import InfoCard from "@/components/shared/general/InfoCard"
import {
	PiCirclesFour,
	PiHourglass,
	PiHouseLine,
	PiInfo,
	PiListChecks,
	PiShieldChevron,
	PiTree,
} from "react-icons/pi"

import type { Locale } from "@/types/locales"
import Opinions from "@/components/sections/home/Opinions"

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
	const [excursionsRes, programsRes] = await Promise.all([
		getExcursionsWithTranslations(locale as Locale),
		getProgramsWithTranslations(locale as Locale),
	])

	const t = await getTranslations("HomePage")

	const { excursions } = excursionsRes
	const { programs } = programsRes

	return (
		<main className="pb-24">
			<div className="overflow-x-hidden">
				<HeroCarousel />
			</div>

			<section className="mx-auto mt-16 max-w-screen-2xl px-4 md:px-8">
				<h2 className="text-2xl font-bold md:text-3xl xl:text-4xl">{t("excursions.title")}</h2>
				<p className="mb-4 text-gray-600 lg:text-lg">{t("excursions.description")}</p>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{excursions.length === 0 && (
						<InfoCard
							icon={<PiInfo className="-mt-0.5 mr-2 inline-block h-6 w-6 text-red-900" />}
							message={t("excursions.notFound")}
						/>
					)}
					{excursions.map((excursion) => (
						<ExcursionCard excursion={excursion} key={excursion.excursion.slug} />
					))}
				</div>
			</section>

			<section className="mx-auto mt-16 max-w-screen-2xl px-4 md:px-8">
				<h2 className="text-2xl font-bold md:text-3xl xl:text-4xl">{t("programs.title")}</h2>
				<p className="mb-4 text-gray-600 lg:text-lg">{t("programs.description")}</p>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{programs.length === 0 && (
						<InfoCard
							icon={<PiInfo className="-mt-0.5 mr-2 inline-block h-6 w-6 text-red-900" />}
							message={t("programs.notFound")}
						/>
					)}
					{programs.map((program) => (
						<ProgramCard program={program} key={program.program.slug} />
					))}
				</div>
			</section>

			<section>
				<div className="mx-auto mt-16 max-w-screen-2xl px-4 md:px-8">
					<h2 className="text-2xl font-bold md:text-3xl xl:text-4xl">{t("whyUs.title")}</h2>
					<p className="mb-4 text-gray-600 lg:text-lg">{t("whyUs.description")}</p>
				</div>

				<div className="mx-auto mt-10 grid max-w-screen-2xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:px-8 lg:mt-12 lg:grid-cols-3 xl:gap-10">
					<div className="overflow-hidden rounded bg-white shadow">
						<div className="p-8">
							<div className="flex items-center">
								<PiHouseLine className="h-auto w-8 flex-shrink-0 text-orange" />
								<div className="ml-5 mr-auto">
									<p className="text-xl font-semibold text-black">{t("whyUs.0.title")}</p>
								</div>
							</div>
							<p className="mt-4 text-base leading-relaxed text-gray-600">
								{t("whyUs.0.description")}
							</p>
						</div>
					</div>

					<div className="overflow-hidden rounded bg-white shadow">
						<div className="p-8">
							<div className="flex items-center">
								<PiShieldChevron className="h-auto w-8 flex-shrink-0 text-orange" />
								<div className="ml-5 mr-auto">
									<p className="text-xl font-semibold text-black">{t("whyUs.1.title")}</p>
								</div>
							</div>
							<p className="mt-4 text-base leading-relaxed text-gray-600">
								{t("whyUs.0.description")}
							</p>
						</div>
					</div>

					<div className="overflow-hidden rounded bg-white shadow">
						<div className="p-8">
							<div className="flex items-center">
								<PiCirclesFour className="h-auto w-8 flex-shrink-0 text-orange" />
								<div className="ml-5 mr-auto">
									<p className="text-xl font-semibold text-black">{t("whyUs.2.title")}</p>
								</div>
							</div>
							<p className="mt-4 text-base leading-relaxed text-gray-600">
								{t("whyUs.2.description")}
							</p>
						</div>
					</div>

					<div className="overflow-hidden rounded bg-white shadow">
						<div className="p-8">
							<div className="flex items-center">
								<PiTree className="h-auto w-8 flex-shrink-0 text-orange" />
								<div className="ml-5 mr-auto">
									<p className="text-xl font-semibold text-black">{t("whyUs.3.title")}</p>
								</div>
							</div>
							<p className="mt-4 text-base leading-relaxed text-gray-600">
								{t("whyUs.3.description")}
							</p>
						</div>
					</div>

					<div className="overflow-hidden rounded bg-white shadow">
						<div className="p-8">
							<div className="flex items-center">
								<PiHourglass className="h-auto w-8 flex-shrink-0 text-orange" />
								<div className="ml-5 mr-auto">
									<p className="text-xl font-semibold text-black">{t("whyUs.4.title")}</p>
								</div>
							</div>
							<p className="mt-7 text-base leading-relaxed text-gray-600">
								{t("whyUs.4.description")}
							</p>
						</div>
					</div>

					<div className="overflow-hidden rounded bg-white shadow">
						<div className="p-8">
							<div className="flex items-center">
								<PiListChecks className="h-auto w-8 flex-shrink-0 text-orange" />
								<div className="ml-5 mr-auto">
									<p className="text-xl font-semibold text-black">{t("whyUs.5.title")}</p>
								</div>
							</div>
							<p className="mt-7 text-base leading-relaxed text-gray-600">
								{t("whyUs.5.description")}
							</p>
						</div>
					</div>
				</div>
			</section>

			<Opinions />
		</main>
	)
}
