import { getExcursionsWithTranslations } from "@/actions/excursion/getExcursions"
import { Link } from "@/i18n/routing"

import ExcursionCard from "@/components/excursions/general/ExcursionCard"
import HeroCarousel from "@/components/sections/home/HeroCarousel"

export default async function HomePage() {
	const { excursions } = await getExcursionsWithTranslations()

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
					{excursions.map((excursion) => (
						<ExcursionCard excursion={excursion} key={excursion.excursion.slug} />
					))}
				</div>

				<div className="flex w-full items-center justify-center">
					<Link
						href={"/excursions"}
						className="group relative mt-10 px-2 py-1 font-medium text-orange hover:text-white md:text-lg"
					>
						Ver todas las excursiones
						<div
							aria-hidden
							className="absolute bottom-0 left-1/2 -z-10 h-0.5 w-full -translate-x-1/2 transform rounded-sm bg-orange transition-all group-hover:h-full"
						/>
					</Link>
				</div>
			</section>

			<section className="mx-auto mt-12 max-w-screen-2xl px-4 md:px-8">
				<h2 className="text-2xl font-bold md:text-3xl xl:text-4xl">Programas</h2>
				<p className="mb-4 text-gray-600 lg:text-lg">
					Explora nuestros programas con los que podrás disfrutar de la región al máximo.
				</p>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
					{/* // TODO: Add programs */}
				</div>

				<div className="flex w-full items-center justify-center">
					<Link
						href={"/excursions"}
						className="group relative mt-10 px-2 py-1 font-medium text-orange hover:text-white md:text-lg"
					>
						Ver todos los programas
						<div
							aria-hidden
							className="absolute bottom-0 left-1/2 -z-10 h-0.5 w-full -translate-x-1/2 transform rounded-sm bg-orange transition-all group-hover:h-full"
						/>
					</Link>
				</div>
			</section>
		</main>
	)
}
