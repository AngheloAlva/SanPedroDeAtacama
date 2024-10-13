import { theDestineKeys } from "@/lib/consts/tKeys"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuContent,
	NavigationMenuTrigger,
} from "../../ui/navigation-menu"

export default function Menu(): React.ReactElement {
	const navbarT = useTranslations("Navbar")
	const aboutDestinyT = useTranslations("AboutDestiny.list")

	return (
		<NavigationMenu className="mr-2 hidden w-full items-center justify-center py-0 lg:flex xl:mr-4">
			<NavigationMenuList className="flex h-full items-center text-nowrap font-bold">
				<NavigationMenuItem>
					<NavigationMenuTrigger className="flex cursor-default flex-col items-center bg-transparent p-0">
						<div
							aria-hidden
							className="-mt-2 h-[7px] w-full rounded-full bg-black transition-all duration-200 group-data-[state=open]:translate-y-3 lg:-mt-4"
						></div>
						<Link href={"/excursions"} className="px-3 pb-8 pt-10 lg:px-4 xl:px-5">
							{navbarT("excursions")}
						</Link>
					</NavigationMenuTrigger>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuTrigger className="flex cursor-default flex-col items-center bg-transparent p-0">
						<div
							aria-hidden
							className="-mt-2 h-[7px] w-full rounded-full bg-black transition-all duration-200 group-data-[state=open]:translate-y-3 lg:-mt-4"
						></div>
						<Link href={"/programs"} className="px-3 pb-8 pt-10 lg:px-4 xl:px-5">
							{navbarT("programs")}
						</Link>
					</NavigationMenuTrigger>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuTrigger className="flex cursor-default flex-col items-center bg-transparent p-0">
						<div
							aria-hidden
							className="-mt-2 h-[7px] w-full rounded-full bg-black transition-all duration-200 group-data-[state=open]:translate-y-3 lg:-mt-4"
						></div>
						<Link href={"/booking"} className="px-3 pb-8 pt-10 lg:px-4 xl:px-5">
							{navbarT(`book`)}
						</Link>
					</NavigationMenuTrigger>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuTrigger className="flex cursor-default flex-col items-center bg-transparent p-0">
						<div
							aria-hidden
							className="-mt-2 h-[7px] w-full rounded-full bg-black transition-all duration-200 group-data-[state=open]:translate-y-3 lg:-mt-4"
						></div>
						<Link href={"/services"} className="px-3 pb-8 pt-10 lg:px-4 xl:px-5">
							{navbarT(`services`)}
						</Link>
					</NavigationMenuTrigger>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuTrigger className="flex cursor-default flex-col items-center bg-transparent p-0">
						<div
							aria-hidden
							className="-mt-2 h-[7px] w-full rounded-full bg-black transition-all duration-200 group-data-[state=open]:translate-y-3 lg:-mt-4"
						></div>
						<span className="px-3 pb-8 pt-10 lg:px-4 xl:px-5">{navbarT("theDestine")}</span>
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<div className="top-full z-50 h-fit bg-neutral-700/95 px-5 py-16 text-white sm:px-7 lg:px-14 xl:px-20">
							<ul className="grid grid-cols-1 gap-y-2 text-wrap md:grid-cols-2 md:gap-x-4 md:gap-y-3 xl:grid-cols-4">
								{theDestineKeys.map((key) => (
									<li
										className="font-bold duration-500 group-hover:animate-in group-hover:slide-in-from-bottom-5 xl:text-lg"
										key={aboutDestinyT(`${key}.id`)}
									>
										<NavigationMenuLink>
											<Link
												href={`/about-destiny/${aboutDestinyT(`${key}.id`)}`}
												className="hover:underline"
											>
												{aboutDestinyT(`${key}.name`)}
											</Link>
										</NavigationMenuLink>
									</li>
								))}
							</ul>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}
