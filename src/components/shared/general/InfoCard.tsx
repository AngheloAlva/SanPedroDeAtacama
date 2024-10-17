import { cn } from "@/lib/utils"

interface InfoCardProps {
	icon: React.ReactElement
	message: string
	className?: string
}

export default function InfoCard({ icon, message, className }: InfoCardProps): React.ReactElement {
	return (
		<div className={cn("my-5 flex items-center rounded-lg border bg-muted px-4 py-3", className)}>
			{icon}
			<p className="text-lg font-medium">{message}</p>
		</div>
	)
}
