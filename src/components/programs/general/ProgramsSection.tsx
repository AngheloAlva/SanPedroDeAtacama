import InfoCard from "@/components/shared/general/InfoCard"
import ProgramCard from "./ProgramCard"
import { PiInfo } from "react-icons/pi"

import type { ProgramWithTranslations } from "@/types/programs"

export default function ProgramsSection({
	programs,
}: {
	programs: ProgramWithTranslations[]
}): React.ReactElement {
	return (
		<section className="mx-auto max-w-screen-2xl">
			<div className="mt-6 flex flex-col gap-1 px-4 lg:mt-10">
				<div className="flex min-w-fit items-center justify-start gap-2 xl:gap-4">
					<div className="h-0.5 w-full max-w-6 bg-black/50 sm:max-w-10 lg:max-w-14"></div>
					<h2 className="min-w-fit text-2xl font-bold sm:text-3xl md:w-full md:text-4xl">
						Programas
					</h2>
				</div>
				<p className="text-base text-muted-foreground lg:text-lg">
					Explora nuestros programas con los que podrás disfrutar de la región al máximo.
				</p>
			</div>

			<div className="grid grid-cols-1 gap-4 gap-x-4 gap-y-4 px-4 pb-12 pt-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
				{programs.length === 0 && (
					<InfoCard
						icon={<PiInfo className="-mt-0.5 mr-2 inline-block h-6 w-6 text-red-900" />}
						message="No hay programas disponibles"
					/>
				)}
				{programs.map((program) => (
					<ProgramCard program={program} key={program.program.id} />
				))}
			</div>
		</section>
	)
}
