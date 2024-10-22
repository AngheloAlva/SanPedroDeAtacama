import { useTranslations } from "next-intl"

import AboutDestinyCarousel from "@/components/sections/about-destiny/AboutDestinyCarousel"
import ImageLoader from "@/components/shared/general/ImageLoader"

export default function HowToGetTherePage(): React.ReactElement {
	const t = useTranslations(`AboutDestiny.como-llegar`)

	const sectionsKeys = Array.from({ length: Number(t("sections-length")) }, (_, i) => i.toString())

	return (
		<main className="py-14 lg:pt-24">
			<div className="text-center">
				<h1 className="mx-auto max-w-screen-md px-4 text-3xl font-bold md:text-4xl">
					{t("title")}
				</h1>
				<p className="mx-auto mt-4 max-w-screen-md text-pretty px-4 text-base lg:text-lg">
					{t("intro")}
				</p>

				<ImageLoader
					width={2304}
					height={1296}
					src={t("intro-img")}
					alt={t("intro-alt")}
					className="my-14 h-auto w-full lg:mt-20"
				/>
			</div>

			<div className="mx-auto max-w-screen-md space-y-16">
				{sectionsKeys.map((sectionKey) => (
					<div key={sectionKey}>
						<h2 className="mx-auto w-full px-4 text-xl font-semibold lg:text-2xl">
							{t(`description.${sectionKey}.title`)}
						</h2>
						<p className="mx-auto mt-2 text-pretty px-4 text-base lg:text-lg">
							{t(`description.${sectionKey}.description`)}
						</p>

						<div className="mx-auto mt-2 flex flex-col gap-4 text-pretty px-4">
							<div>
								{t.rich(`description.${sectionKey}.text`, {
									bold: (text) => <strong className="font-semibold">{text}</strong>,
									div: (text) => <div>{text}</div>,
									subTitle: (text) => <h3 className="mb-2 mt-4 block text-lg font-bold">{text}</h3>,
								})}
							</div>
						</div>
					</div>
				))}
			</div>

			<AboutDestinyCarousel className="mx-auto max-w-[93vw] pl-0 lg:px-0" />
		</main>
	)
}
