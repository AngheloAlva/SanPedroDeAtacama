import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { theDestineKeys } from "@/lib/consts/tKeys"

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "../../ui/navigation-menu"

export default function Menu(): React.ReactElement {
	const navbarT = useTranslations("Navbar")
	const aboutDestinyT = useTranslations("AboutDestiny.list")

	return (
		<NavigationMenu className="mr-2 hidden w-full items-center justify-center py-0 lg:flex xl:mr-4">
			<NavigationMenuList className="flex h-full items-center text-nowrap font-bold">
				{/* <NavigationMenuItem>
					<NavigationMenuTrigger className="flex cursor-default flex-col items-center bg-transparent p-0">
						<div
							aria-hidden
							className="-mt-2 h-[7px] w-full rounded-full bg-black transition-all duration-200 group-data-[state=open]:translate-y-3 lg:-mt-4"
						></div>
						<Link href={"/excursions"} className="px-3 pb-8 pt-10 lg:px-4 xl:px-5">
							{navbarT("excursions")}
						</Link>
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<div className="top-full z-50 h-fit bg-neutral-700/95 px-5 pb-16 py-14 text-white sm:px-7 lg:px-14 xl:px-20">
							<div className="flex gap-5">
								<div className="flex w-1/2 flex-col">
									<SubMenuIExcursiontem
										zone="zone1"
										navMenu={true}
										keys={excursionZone1Keys}
										className="duration-500 group-hover:animate-in group-hover:slide-in-from-bottom-5"
									/>
									<SubMenuIExcursiontem
										zone="zone2"
										navMenu={true}
										keys={excursionZone2Keys}
										className="duration-500 group-hover:animate-in group-hover:slide-in-from-bottom-5"
									/>
								</div>
								<div className="flex w-1/2 flex-col">
									<SubMenuIExcursiontem
										zone="zone3"
										navMenu={true}
										keys={excursionZone3Keys}
										className="duration-500 group-hover:animate-in group-hover:slide-in-from-bottom-5"
									/>
									<ul className="mt-4 flex flex-col gap-2">
										<p className="text-nowrap text-lg font-bold xl:text-xl">
											{excursionsT(`zone4.name`)}
										</p>
										{excursionZone4Keys.map((key) => (
											<li
												className="duration-500 group-hover:animate-in group-hover:slide-in-from-bottom-5"
												key={excursionsT(`zone4.items.${key}.id`)}
											>
												<NavigationMenuLink>
													<Link
														href={{
															pathname: "/excursions/[excursion-id]",
															params: { "excursion-id": excursionsT(`zone4.items.${key}.id`) },
														}}
														className="flex items-center justify-start pl-2 font-semibold hover:underline"
													>
														{excursionsT(`zone4.items.${key}.name`)}
													</Link>
												</NavigationMenuLink>
											</li>
										))}
									</ul>

									<Link href={"/excursions"} className="mt-4 text-lg font-bold underline">
										{excursionsT("seeAll")}
									</Link>
								</div>
							</div>
						</div>
					</NavigationMenuContent>
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
					<NavigationMenuContent>
						<div className="top-full z-50 h-fit bg-neutral-700/95 px-5 py-16 text-white sm:px-7 lg:px-14 xl:px-20">
							<ul className="grid grid-cols-1 gap-y-2 text-wrap md:grid-cols-2 md:gap-y-3 lg:grid-cols-4">
								{programsKeys.map((key) => (
									<li
										className="font-bold duration-500 group-hover:animate-in group-hover:slide-in-from-bottom-5 xl:text-lg"
										key={programsT(`${key}.id`)}
									>
										<NavigationMenuLink>
											<Link
												href={`/programs/${programsT(`${key}.id`)}` as "/"}
												className="hover:underline"
											>
												{programsT(`${key}.name`)}
											</Link>
										</NavigationMenuLink>
									</li>
								))}
								<li
									className="font-bold duration-500 group-hover:animate-in group-hover:slide-in-from-bottom-5 xl:text-lg"
									key={programsT(`personalized.id`)}
								>
									<NavigationMenuLink>
										<Link href={"/booking"} className="hover:underline">
											{programsT(`personalized.name`)}
										</Link>
									</NavigationMenuLink>
								</li>
							</ul>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem> */}

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
