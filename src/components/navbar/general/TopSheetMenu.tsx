import { aboutUsKeys, theDestineKeys } from "@/lib/consts/tKeys"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion"
import { Sheet, SheetClose, SheetTitle, SheetContent, SheetTrigger } from "../../ui/sheet"
import { PiList } from "react-icons/pi"

export default function TopSheetMenu(): React.ReactElement {
	const navbarT = useTranslations("Navbar")
	const aboutUsT = useTranslations("AboutUs.list")
	const aboutDestinyT = useTranslations("AboutDestiny.list")

	return (
		<Sheet>
			<SheetTrigger className="rounded-lg hover:text-[#e1713f] focus:outline-none">
				<PiList className="h-6 w-auto stroke-2" />
			</SheetTrigger>
			<SheetContent side={"top"} className="z-[120] h-screen overflow-y-scroll bg-black text-white">
				<SheetTitle className="sr-only">MENU</SheetTitle>

				<div className="mr-0 mt-8 flex flex-col sm:flex-col lg:hidden">
					<Link
						className="group w-full text-nowrap py-2.5 text-xl font-bold hover:underline"
						href={"/excursions"}
					>
						<SheetClose className="group-hover:underline">{navbarT("excursions")}</SheetClose>
					</Link>

					<Link
						className="group w-full text-nowrap py-2.5 text-xl font-bold hover:underline"
						href={"/programs"}
					>
						<SheetClose className="group-hover:underline">{navbarT("programs")}</SheetClose>
					</Link>
					<Link
						className="group w-full text-nowrap py-2.5 text-xl font-bold hover:underline"
						href={"/services"}
					>
						<SheetClose className="group-hover:underline">{navbarT("services")}</SheetClose>
					</Link>
				</div>

				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="item-5" className="group flex w-full flex-col lg:hidden">
						<AccordionTrigger className="w-full text-nowrap text-xl font-bold">
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
			</SheetContent>
		</Sheet>
	)
}
