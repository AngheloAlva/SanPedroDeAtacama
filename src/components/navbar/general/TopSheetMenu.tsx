import { aboutUsKeys, theDestineKeys } from "@/lib/consts/tKeys"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetTitle,
	SheetTrigger,
} from "../../ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion"
import { PiList } from "react-icons/pi"

export default function TopSheetMenu(): React.ReactElement {
	const navbarT = useTranslations("Navbar")
	const aboutUsT = useTranslations("AboutUs.list")
	const aboutDestinyT = useTranslations("AboutDestiny.list")

	return (
		<Sheet>
			<SheetTrigger className="rounded-lg hover:text-[#e1713f] focus:outline-none">
				<PiList className="h-5 w-auto" />
			</SheetTrigger>
			<SheetContent side={"top"} className="z-[120] h-screen overflow-y-scroll bg-black text-white">
				<SheetTitle className="sr-only">MENU</SheetTitle>

				<Accordion type="single" collapsible className="w-full">
					{/* <AccordionItem value="item-1" className="group flex w-full flex-col lg:hidden">
						<AccordionTrigger className="mt-4 w-full text-nowrap text-xl font-bold">
							<Link href={"/excursions"}>{navbarT("excursions")}</Link>
						</AccordionTrigger>
						<AccordionContent className="pb-10">
							<ul className="flex flex-col">
								<SubMenuIExcursiontem zone="zone1" keys={excursionZone1Keys} className="w-full" />
								<SubMenuIExcursiontem zone="zone2" keys={excursionZone2Keys} className="w-full" />
								<SubMenuIExcursiontem zone="zone3" keys={excursionZone3Keys} className="w-full" />

								<ul className="mt-4 flex flex-col">
									<p className="text-nowrap text-lg font-bold xl:text-xl">
										{excursionsT(`zone4.name`)}
									</p>
									{excursionZone4Keys.map((key) => (
										<li key={excursionsT(`zone4.items.${key}.id`)}>
											<Link
												href={{
													pathname: "/excursions/[excursion-id]",
													params: { "excursion-id": excursionsT(`zone4.items.${key}.id`) },
												}}
												className="min-w-full py-1.5"
											>
												<SheetClose className="w-full py-1.5 pl-1.5 text-left hover:underline">
													{excursionsT(`zone4.items.${key}.name`)}
												</SheetClose>
											</Link>
										</li>
									))}
								</ul>

								<Link href={"/excursions"} className="mt-4 w-full">
									<SheetClose className="w-full text-left text-base font-semibold underline hover:brightness-75">
										{excursionsT("seeAll")}
									</SheetClose>
								</Link>
							</ul>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-2" className="group flex w-full flex-col lg:hidden">
						<AccordionTrigger className="mt-4 w-full text-nowrap text-xl font-bold">
							<Link href={"/programs"}>{navbarT("programs")}</Link>
						</AccordionTrigger>
						<AccordionContent>
							<ul className="flex flex-col">
								{programsKeys.map((key) => (
									<li key={programsT(`${key}.id`)} className="">
										<Link href={`/programs/${programsT(`${key}.id`)}` as "/"} className="w-full">
											<SheetClose className="w-full py-1.5 text-left hover:underline">
												{programsT(`${key}.name`)}
											</SheetClose>
										</Link>
									</li>
								))}
							</ul>
						</AccordionContent>
					</AccordionItem> */}

					<AccordionItem value="item-5" className="group flex w-full flex-col lg:hidden">
						<AccordionTrigger className="mt-4 w-full text-nowrap text-xl font-bold">
							{navbarT("theDestine")}
						</AccordionTrigger>
						<AccordionContent>
							<ul className="flex flex-col">
								{theDestineKeys.map((key) => (
									<li key={aboutDestinyT(`${key}.id`)}>
										<Link href={`/about-destiny/${aboutDestinyT(`${key}.id`)}`} className="w-full">
											<SheetClose className="w-full py-1.5 text-left hover:underline">
												{aboutDestinyT(`${key}.name`)}
											</SheetClose>
										</Link>
									</li>
								))}
							</ul>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-6" className="group flex w-full flex-col lg:hidden">
						<AccordionTrigger className="mt-4 w-full text-nowrap text-xl font-bold">
							{navbarT("aboutUs")}
						</AccordionTrigger>
						<AccordionContent>
							<ul className="flex flex-col">
								{aboutUsKeys.map((key) => (
									<li key={aboutUsT(`${key}.id`)}>
										<Link href={("/about-us/" + aboutUsT(`${key}.id`)) as "/"} className="w-full">
											<SheetClose className="w-full py-1.5 text-left hover:underline">
												{aboutUsT(`${key}.name`)}
											</SheetClose>
										</Link>
									</li>
								))}
							</ul>
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				<ul className="mt-7 hidden flex-col gap-5 text-xl font-bold lg:flex">
					{aboutUsKeys.map((key) => (
						<li key={aboutUsT(`${key}.id`)}>
							<Link
								href={("/about-us/" + aboutUsT(`${key}.id`)) as "/"}
								className="hover:underline"
							>
								<SheetClose className="hover:underline">{aboutUsT(`${key}.name`)}</SheetClose>
							</Link>
						</li>
					))}
				</ul>

				<SheetFooter className="mr-0 flex flex-col sm:flex-col">
					<Link
						className="group mt-8 w-full text-nowrap py-2.5 text-xl font-bold hover:underline lg:hidden"
						href={"/services"}
					>
						<SheetClose className="group-hover:underline">{navbarT("services")}</SheetClose>
					</Link>

					<Link
						className="group mt-4 w-full text-nowrap py-2.5 text-xl font-bold hover:underline lg:hidden"
						href={"/booking"}
					>
						<SheetClose className="group-hover:underline">{navbarT("book")}</SheetClose>
					</Link>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
