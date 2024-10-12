import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Link } from "@/i18n/routing"
import { cn } from "@/lib/utils"

interface NavbarItemProps {
	href: string
	label: string
	actualPath: string
	icon: React.ReactNode
}

export default function TooltipItem({
	actualPath,
	href,
	icon,
	label,
}: NavbarItemProps): React.ReactElement {
	return (
		<Tooltip>
			<TooltipTrigger>
				<Link
					href={href}
					className={cn(
						"flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground",
						{
							"bg-accent text-accent-foreground": actualPath === href,
						}
					)}
				>
					{icon}
					<span className="sr-only">{label}</span>
				</Link>
			</TooltipTrigger>
			<TooltipContent side="right">{label}</TooltipContent>
		</Tooltip>
	)
}
