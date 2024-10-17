import { Link } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import Image from "next/image"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PiClock, PiListChecks, PiUserSound } from "react-icons/pi"
import { Button } from "@/components/ui/button"

import type { ProgramWithTranslations } from "@/types/programs"

interface Props {
	program: ProgramWithTranslations
	className?: string
}

export default function ProgramCard({
	program: { program, program_translation },
	className,
}: Props): React.ReactElement {
	return (
		<Card className={cn("overflow-hidden", className)}>
			<CardHeader className="p-0">
				<div className="relative h-60 w-full">
					<Image
						src={program.images?.[0] ?? "/placeholder.png"}
						alt={program_translation.title?.part1 ?? "Program"}
						fill
						style={{ objectFit: "cover" }}
					/>
				</div>
			</CardHeader>
			<CardContent className="p-4">
				<CardTitle className="mb-2 flex flex-col text-xl leading-5">
					<span>
						{program_translation.title?.part1} - {program_translation.title?.part2}
					</span>
					<span className="font-medium">{program_translation.title?.part3}</span>
				</CardTitle>

				<p className="mb-4 line-clamp-3 text-ellipsis text-sm text-muted-foreground">
					{program_translation.description}
				</p>

				<div className="grid gap-2 text-sm text-neutral-700">
					<span className="flex items-center gap-1.5 leading-4">
						<PiClock className="-mt-0.5 h-auto min-w-5" />
						{program_translation.duration}
					</span>
					<span className="flex items-center gap-1.5 leading-4">
						<PiUserSound className="-mt-0.5 h-auto min-w-5" /> {program_translation.guide}
					</span>
					<span className="flex items-center gap-1.5 leading-4">
						<PiListChecks className="-mt-0.5 h-auto min-w-5" />
						{program_translation.includes}
					</span>
				</div>
			</CardContent>
			<CardFooter className="flex items-center justify-between p-4">
				<span className="text-lg font-bold">${program.price.toLocaleString("cl")}</span>
				<Link href={`/programs/${program.slug}`}>
					<Button className="bg-orange transition-all duration-300 hover:bg-orange hover:brightness-90">
						Ver detalles
					</Button>
				</Link>
			</CardFooter>
		</Card>
	)
}
