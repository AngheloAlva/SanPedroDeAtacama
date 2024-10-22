"use client"

import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"

import ImageLoader from "@/components/shared/general/ImageLoader"
import ContactForm from "@/components/forms/general/ContactForm"

export default function ContactSection(): React.ReactElement {
	const source = useSearchParams().get("source")

	const t = useTranslations("ContactPage")

	return (
		<>
			<section className="mx-auto flex max-w-2xl flex-col px-4 py-14 text-center">
				<h1 className="mb-4 text-4xl font-bold sm:text-5xl">
					{source === "wholesaler" ? t("heroWholesaler.title") : t("heroContact.title")}
				</h1>
				<p className="z-10 text-pretty">
					{source === "wholesaler" ? t("heroWholesaler.description") : t("heroContact.description")}
				</p>
				{source !== "wholesaler" && (
					<p className="z-10 text-pretty">
						{t.rich("heroContact.description2", {
							link: (text) => (
								<Link className="font-medium text-[#e1713f] underline" href={"/booking"}>
									{text}
								</Link>
							),
						})}
					</p>
				)}
			</section>

			<section className="relative mx-auto flex max-w-[2700px] flex-col-reverse gap-8 px-2 pb-32 md:mt-14">
				{source === "wholesaler" ? (
					<>
						<div className="absolute -bottom-72 left-1/2 -z-50 h-[70rem] w-[150vw] -translate-x-1/2 rotate-6 transform bg-[#60b5a5] bg-opacity-70 md:h-[48rem]"></div>
						<ImageLoader
							width={600}
							height={600}
							alt="Mayoreo"
							loading="eager"
							src={"/v1725560590/mayoristas_bsyt4e.png"}
							className="-left-32 bottom-[15%] h-auto w-full md:absolute md:h-[600px] md:w-auto 2xl:-left-5"
						/>
					</>
				) : (
					<>
						<div className="absolute -bottom-72 left-1/2 -z-50 h-[70rem] w-[150vw] -translate-x-1/2 -rotate-6 transform bg-[#e1713f] bg-opacity-40 md:h-[48rem]"></div>
						<ImageLoader
							width={600}
							height={600}
							loading="eager"
							alt="Contactanos"
							className="-right-20 bottom-1/4 md:absolute 2xl:right-5"
							src={"/v1725560594/contactanos_sabbsh.png"}
						/>
					</>
				)}

				<ContactForm
					decorationColor={source === "wholesaler" ? "#00b2bf" : "#00b2bf"}
					source={source}
				/>
			</section>
		</>
	)
}
