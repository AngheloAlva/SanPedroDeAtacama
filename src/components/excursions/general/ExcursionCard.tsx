import { Link } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import Image from "next/image"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { PiClock, PiListChecks } from "react-icons/pi"

import type { ExcursionWithTranslation } from "@/types/excursions"

interface Props {
	excursion: ExcursionWithTranslation
	className?: string
}

export default function ExcursionCard({
	excursion: { excursion, excursion_translation },
	className,
}: Props): React.ReactElement {
	return (
		<Card className={cn("overflow-hidden", className)}>
			<CardHeader className="p-0">
				<div
					className={cn("group w-full overflow-hidden rounded-t-lg bg-white text-lg", className)}
				>
					<Link href={`/excursions/${excursion.slug}`}>
						<div className="group relative w-full">
							<Image
								src={excursion.images?.[0] ?? "/placeholder.png"}
								width={600}
								height={600}
								alt={excursion_translation.title ?? ""}
								className="aspect-square h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
							/>
							<div className="absolute bottom-0 left-0 right-0 top-0 z-20 h-full w-full bg-black opacity-20 transition-all duration-75 group-hover:scale-105"></div>

							<div className="absolute top-1/2 z-30 flex w-full -translate-y-1/2 transform flex-col items-center justify-center gap-2 px-4 text-center md:px-6">
								<div className="text-amber-50 hover:text-white">
									<p className="text-2xl font-extrabold transition-opacity xl:text-[2.5rem] xl:leading-[1.1]">
										{excursion_translation.title}
									</p>
								</div>

								<div className="mt-4 h-0 overflow-hidden transition-all duration-300 group-hover:h-14">
									<button className="rounded-lg border-2 px-6 py-2 text-xl font-bold text-white opacity-0 transition-all hover:bg-white/20 group-hover:opacity-100">
										Ver detalle
									</button>
								</div>
							</div>
						</div>
					</Link>
				</div>
			</CardHeader>
			<CardContent className="p-4">
				<div className="grid gap-2 text-sm text-neutral-700">
					<span className="flex items-center gap-1.5 leading-4">
						<PiClock className="-mt-0.5 h-auto min-w-5" />
						{excursion_translation.duration}
					</span>
					<span className="flex items-center gap-1.5 leading-4">
						<PiListChecks className="-mt-0.5 h-auto min-w-5" />
						{excursion_translation.includes}
					</span>
				</div>
			</CardContent>
			<CardFooter className="flex items-end px-4 pb-3">
				<span className="text-xl font-bold">CLP ${excursion.price.toLocaleString("es-CL")}</span>
			</CardFooter>
		</Card>
	)
}
