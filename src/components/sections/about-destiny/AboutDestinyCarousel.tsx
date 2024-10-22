"use client"

import { theDestineKeys } from "@/lib/consts/tKeys"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

import type { EmblaOptionsType } from "embla-carousel"

import "../../../styles/emblaCarousel.css"

import AboutDestinyCard from "./AboutDestinyCard"
import EmblaCarousel from "@/components/ui/Embla-carousel"

const OPTIONS: EmblaOptionsType = {
	dragFree: true,
}

export default function AboutDestinyCarousel({
	className,
}: {
	className?: string
}): React.ReactElement {
	const homeT = useTranslations("HomePage")
	const aboutDestinyT = useTranslations("AboutDestiny.list")

	return (
		<section
			className={cn(
				"relative my-10 flex w-full flex-col items-start justify-center pl-5 xl:px-10",
				className
			)}
		>
			<div className="mb-3 mt-2 flex items-end gap-5">
				<h2 className="text-4xl font-extrabold leading-none">{homeT("aboutDestiny")}</h2>
			</div>

			<EmblaCarousel
				buttons
				options={OPTIONS}
				className="flex h-[34rem] w-full gap-4 2xl:gap-5"
				buttonsPosition="inside"
			>
				{theDestineKeys?.map((key, i) => (
					<AboutDestinyCard
						key={i}
						id={aboutDestinyT(`${key}.id`)}
						image={aboutDestinyT(`${key}.image`)}
						title={aboutDestinyT(`${key}.name`)}
						button={aboutDestinyT(`${key}.button`)}
						imageAlt={aboutDestinyT(`${key}.imageAlt`)}
						description={aboutDestinyT(`${key}.description`)}
					/>
				))}
			</EmblaCarousel>
		</section>
	)
}
