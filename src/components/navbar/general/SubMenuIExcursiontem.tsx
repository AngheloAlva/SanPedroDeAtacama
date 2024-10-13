import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"

import { NavigationMenuLink } from "../../ui/navigation-menu"
import { SheetClose } from "../../ui/sheet"

interface Props {
	keys: string[]
	navMenu?: boolean
	className?: string
	zone: "zone1" | "zone2" | "zone3" | "zone4"
}

export default function SubMenuIExcursiontem({
	keys,
	zone,
	className,
	navMenu = false,
}: Props): React.ReactElement {
	const t = useTranslations("Excursions.list")

	return (
		<ul className="mt-2 flex w-full flex-col items-start text-left lg:gap-2">
			{navMenu
				? keys.map((key) => (
						<li className={className} key={t(`${zone}.items.${key}.id`)}>
							<NavigationMenuLink>
								<Link
									href={`/excursions/${t(`${zone}.items.${key}.id`)}`}
									className="flex items-center justify-start font-semibold hover:underline"
								>
									{/* {icon} */}
									{t(`${zone}.items.${key}.name`)}
								</Link>
							</NavigationMenuLink>
						</li>
					))
				: keys.map((key) => (
						<li className={className} key={t(`${zone}.items.${key}.id`)}>
							<Link
								href={`/excursions/${t(`${zone}.items.${key}.id}`)}`}
								className="min-w-full py-1.5"
							>
								<SheetClose className="w-full py-1.5 text-left hover:underline">
									{/* {icon} */}
									{t(`${zone}.items.${key}.name`)}
								</SheetClose>
							</Link>
						</li>
					))}
		</ul>
	)
}
