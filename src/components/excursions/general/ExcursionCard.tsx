import { Link } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import Image from "next/image"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PiClock, PiListChecks } from "react-icons/pi"
import { Button } from "@/components/ui/button"

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
				<div className="relative h-48 w-full">
					<Image
						src={excursion.images?.[0] ?? "/placeholder.png"}
						alt={excursion_translation.title ?? "Excursion"}
						fill
						style={{ objectFit: "cover" }}
					/>
				</div>
			</CardHeader>
			<CardContent className="p-4">
				<CardTitle className="mb-2 text-xl">{excursion_translation.title}</CardTitle>
				<p className="mb-4 line-clamp-3 text-ellipsis text-sm text-muted-foreground">
					{excursion_translation.description}
				</p>

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
			<CardFooter className="flex items-center justify-between p-4">
				<span className="text-lg font-bold">${excursion.price.toLocaleString("cl")}</span>
				<Link href={`/excursions/${excursion.slug}`}>
					<Button className="bg-orange transition-all duration-300 hover:bg-orange hover:brightness-90">
						Ver detalles
					</Button>
				</Link>
			</CardFooter>
		</Card>
	)
}
