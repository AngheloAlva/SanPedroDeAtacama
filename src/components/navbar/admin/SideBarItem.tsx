import { Link } from "@/i18n/routing"
import { cn } from "@/lib/utils"

interface SideBarItemProps {
	href: string
	title: string
	actualPath: string
	icon: React.ReactElement
}

export default function SideBarItem({
	href,
	icon,
	title,
	actualPath,
}: SideBarItemProps): React.ReactElement {
	return (
		<Link
			href={href}
			className={cn("flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground", {
				"text-foreground": actualPath === href,
			})}
		>
			{icon}
			{title}
		</Link>
	)
}
