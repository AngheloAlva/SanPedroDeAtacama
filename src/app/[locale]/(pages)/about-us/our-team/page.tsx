import { getTranslations } from "next-intl/server"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"

import ImageLoader from "@/components/shared/general/ImageLoader"
import { PiMailbox } from "react-icons/pi"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
	const t = await getTranslations({ locale, namespace: "AboutUs.our-team" })

	return {
		title: t("title"),
		description: t("description"),
	}
}

export default function OurTeamPage(): React.ReactElement {
	const t = useTranslations("AboutUs.our-team")

	const ourTeamKeys = Array.from({ length: 9 }, (_, i) => i.toString())

	return (
		<main className="overflow-x-hidden">
			<section className="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-14 text-center lg:py-16">
				<h1 className="text-4xl font-bold sm:text-5xl">{t("hero.title")}</h1>
				<p className="text-pretty">{t("hero.description")}</p>
			</section>

			<section className="max-w-screen-3xl relative mx-auto grid grid-cols-1 gap-x-4 md:mb-10 md:grid-cols-2 xl:grid-cols-3">
				{ourTeamKeys.map((key) => (
					<div
						key={key}
						className="flex flex-col items-center bg-neutral-50 pt-6 md:bg-transparent"
					>
						<ImageLoader
							width={500}
							height={500}
							className="h-96 w-auto object-cover"
							src={t(`team.${key}.image`)}
							alt={t(`team.${key}.name`)}
						/>

						<div className="flex w-full max-w-xl flex-col items-center gap-1 bg-white py-5 text-center shadow-md">
							<h2 className="text-2xl font-extrabold text-[#00b2bf] brightness-50">
								{t(`team.${key}.name`)}
							</h2>
							<p className="text-lg font-semibold">{t(`team.${key}.role`)}</p>
							<a
								href={"mailto:" + t(`team.${key}.email`)}
								className="bg-opacity-7 mt-2 flex items-center gap-1 rounded-lg bg-[#00b2bf] px-2 py-2.5 text-sm font-bold tracking-wider text-white transition-all duration-300 hover:scale-105 sm:px-4 sm:text-base"
							>
								<PiMailbox className="h-5 w-5 fill-white" />
								{t(`team.${key}.email`)}
							</a>
						</div>
					</div>
				))}

				<div className="flex flex-col items-center bg-neutral-50 pt-6 md:bg-transparent">
					<ImageLoader
						width={500}
						height={500}
						className="h-96 w-auto"
						src={t(`team.10.image`)}
						alt={t(`team.10.name`)}
					/>
					<div className="flex w-full max-w-xl flex-col items-center gap-1 bg-white py-5 text-center shadow-md">
						<h2 className="text-2xl font-extrabold text-[#00b2bf] brightness-50">
							{t(`team.10.name`)}
						</h2>
						<p className="text-lg font-semibold">{t(`team.10.role`)}</p>
						<Link
							href="/work-with-us"
							className="bg-opacity-7 mt-2 flex items-center gap-1 rounded-lg bg-[#00b2bf] px-2 py-2.5 text-sm font-bold tracking-wider text-white transition-all duration-300 hover:scale-105 sm:px-4 sm:text-base"
						>
							<PiMailbox className="h-5 w-5 fill-white" />
							{t("team.10.button")}
						</Link>
					</div>
				</div>

				<div className="absolute left-1/2 top-1/2 -z-50 hidden h-[85rem] w-[150vw] -translate-x-1/2 -translate-y-1/2 rotate-6 transform bg-neutral-50 md:block"></div>
			</section>
		</main>
	)
}
