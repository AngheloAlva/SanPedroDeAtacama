import { cn } from "@/lib/utils"

import { Card, CardContent, CardHeader } from "../ui/card"
import Steps from "./Steps"

export default function StepsCard({
	step,
	children,
	className,
}: {
	step: 1 | 2 | 3
	className?: string
	children: React.ReactElement
}): React.ReactElement {
	return (
		<main
			className={cn(
				"mx-auto flex min-h-[70vh] max-w-screen-xl items-start justify-center px-2 py-6 sm:px-6",
				className
			)}
		>
			<Card className="w-full overflow-hidden">
				<CardHeader>
					<Steps step={step} />
				</CardHeader>
				<CardContent>{children}</CardContent>
			</Card>
		</main>
	)
}
