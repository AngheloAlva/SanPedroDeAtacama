import { getExcursionsWithTranslations } from "@/actions/excursion/getExcursions"
import { getProgramsWithTranslations } from "@/actions/program/getPrograms"

import ExcursionCard from "@/components/excursions/general/ExcursionCard"
import ProgramCard from "@/components/programs/general/ProgramCard"
import HeroCarousel from "@/components/sections/home/HeroCarousel"
import { PiInfo } from "react-icons/pi"

import type { Locale } from "@/types/locales"
import InfoCard from "@/components/shared/general/InfoCard"

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
	const [excursionsRes, programsRes] = await Promise.all([
		getExcursionsWithTranslations(locale as Locale),
		getProgramsWithTranslations(locale as Locale),
	])

	const { excursions } = excursionsRes
	const { programs } = programsRes

	return (
		<main className="pb-24">
			<div className="overflow-x-hidden">
				<HeroCarousel />
			</div>

			<section className="mx-auto mt-12 max-w-screen-2xl px-4 md:px-8">
				<h2 className="text-2xl font-bold md:text-3xl xl:text-4xl">Excursiones</h2>
				<p className="mb-4 text-gray-600 lg:text-lg">
					Explora las mejores excursiones de la región
				</p>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
					{excursions.length === 0 && (
						<InfoCard
							icon={<PiInfo className="-mt-0.5 mr-2 inline-block h-6 w-6 text-red-900" />}
							message="No hay excursiones disponibles"
						/>
					)}
					{excursions.map((excursion) => (
						<ExcursionCard excursion={excursion} key={excursion.excursion.slug} />
					))}
				</div>
			</section>

			<section className="mx-auto mt-12 max-w-screen-2xl px-4 md:px-8">
				<h2 className="text-2xl font-bold md:text-3xl xl:text-4xl">Programas</h2>
				<p className="mb-4 text-gray-600 lg:text-lg">
					Explora nuestros programas con los que podrás disfrutar de la región al máximo.
				</p>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
					{programs.length === 0 && (
						<InfoCard
							icon={<PiInfo className="-mt-0.5 mr-2 inline-block h-6 w-6 text-red-900" />}
							message="No hay programas disponibles"
						/>
					)}
					{programs.map((program) => (
						<ProgramCard program={program} key={program.program.slug} />
					))}
				</div>
			</section>
		</main>
	)
}
