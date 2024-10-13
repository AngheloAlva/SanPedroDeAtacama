import ExcursionCard from "./ExcursionCard"

import type { ExcursionWithTranslation } from "@/types/excursions"

export default function ExcursionsSection({
	excursions,
}: {
	excursions: ExcursionWithTranslation[]
}): React.ReactElement {
	return (
		<section className="mx-auto max-w-screen-2xl">
			<div className="mt-6 flex flex-col gap-1 px-4 lg:mt-10">
				<div className="flex min-w-fit items-center justify-start gap-2 xl:gap-4">
					<div className="h-0.5 w-full max-w-6 bg-black/50 sm:max-w-10 lg:max-w-14"></div>
					<h2 className="min-w-fit text-2xl font-bold sm:text-3xl md:w-full md:text-4xl">
						Excursiones
					</h2>
				</div>
				<p className="text-base text-muted-foreground lg:text-lg">
					Explora las excursiones más populares en la región
				</p>
			</div>

			<div className="grid grid-cols-1 gap-4 gap-x-4 gap-y-4 px-4 pb-12 pt-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
				{excursions.map((excursion) => (
					<ExcursionCard excursion={excursion} key={excursion.excursion.id} />
				))}
			</div>
		</section>
	)
}
