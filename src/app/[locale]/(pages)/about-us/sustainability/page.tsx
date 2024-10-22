import { getTranslations } from "next-intl/server"
import { useTranslations } from "next-intl"

import { DownloadIcon, SymbolIcon, TriangleRightIcon } from "@radix-ui/react-icons"
import Hero from "@/components/shared/general/Hero"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
	const t = await getTranslations({ locale, namespace: "AboutUs.sustainability" })

	return {
		title: t("title"),
		description: t("description"),
	}
}

export default function SustainabilityPage(): React.ReactElement {
	const t = useTranslations("AboutUs.sustainability")

	return (
		<main className="mb-24">
			<Hero
				title={t("hero.title")}
				imageAlt={t("hero.imageAlt")}
				description={t("hero.description")}
				image="/v1725581325/hero_yp2kow.jpg"
			/>

			<section className="mt-12 flex flex-col px-4 sm:px-8 md:mt-16 lg:mt-20">
				<h2 className="text-center text-3xl font-bold lg:text-4xl">{t("our-commitment.title")}</h2>
				<p className="mx-auto mt-4 max-w-prose text-center">{t("our-commitment.description")}</p>

				<div className="mx-auto mt-8 grid max-w-screen-xl grid-cols-1 gap-5 text-center md:mt-12 md:grid-cols-2 lg:grid-cols-3">
					<div className="group rounded-lg bg-muted px-4 py-4 shadow lg:py-6">
						<SymbolIcon className="mx-auto mb-4 h-12 w-12 transition-all duration-300 group-hover:rotate-180 group-hover:scale-125 group-hover:text-[#e1713f]" />
						<h3 className="text-xl font-bold group-hover:text-[#e1713f]">
							{t("our-commitment.practiques.0.title")}
						</h3>
						<p className="mt-2">{t("our-commitment.practiques.0.description")}</p>
					</div>

					<div className="group rounded-lg bg-muted px-4 py-4 shadow lg:py-6">
						<svg
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="mx-auto mb-4 h-12 w-12 fill-black transition-all duration-300 group-hover:translate-x-4 group-hover:scale-125 group-hover:fill-[#e1713f]"
						>
							<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
							<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
							<g id="SVGRepo_iconCarrier">
								{" "}
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M3 3C1.34315 3 0 4.34315 0 6V15C0 16.3121 0.842366 17.4275 2.01581 17.8348C2.18436 19.6108 3.67994 21 5.5 21C7.26324 21 8.72194 19.6961 8.96456 18H15.0354C15.2781 19.6961 16.7368 21 18.5 21C20.3201 21 21.8156 19.6108 21.9842 17.8348C23.1576 17.4275 24 16.3121 24 15V10.7515C24 10.0248 23.7362 9.32283 23.2577 8.77596L20.8502 6.02449C20.2805 5.37344 19.4576 5 18.5925 5H16.8293C16.4175 3.83481 15.3062 3 14 3H3ZM4 17.4361V17.5639C4.03348 18.3634 4.69224 19.0013 5.5 19.0013C6.30776 19.0013 6.96652 18.3634 7 17.5639V17.4361C6.96652 16.6366 6.30776 15.9987 5.5 15.9987C4.69224 15.9987 4.03348 16.6366 4 17.4361ZM5.5 14C6.8962 14 8.10145 14.8175 8.66318 16H15.3368C15.8985 14.8175 17.1038 14 18.5 14C19.8245 14 20.9771 14.7357 21.5716 15.8207C21.8306 15.64 22 15.3398 22 15V11H17C15.8954 11 15 10.1046 15 9V6C15 5.44772 14.5523 5 14 5H3C2.44772 5 2 5.44772 2 6V15C2 15.3398 2.16945 15.64 2.42845 15.8207C3.02292 14.7357 4.17555 14 5.5 14ZM17 7V8C17 8.55229 17.4477 9 18 9H20.7962L19.345 7.34149C19.1552 7.12448 18.8808 7 18.5925 7H17ZM17 17.4361V17.5639C17.0335 18.3634 17.6922 19.0013 18.5 19.0013C19.3078 19.0013 19.9665 18.3634 20 17.5639V17.4361C19.9665 16.6366 19.3078 15.9987 18.5 15.9987C17.6922 15.9987 17.0335 16.6366 17 17.4361Z"
									fill="#currentColor"
								></path>{" "}
							</g>
						</svg>
						<h3 className="text-xl font-bold group-hover:text-[#e1713f]">
							{t("our-commitment.practiques.1.title")}
						</h3>
						<p className="mt-2">{t("our-commitment.practiques.1.description")}</p>
					</div>

					<div className="group mx-auto rounded-lg bg-muted px-4 py-4 shadow md:col-span-2 md:max-w-md lg:col-span-1 lg:py-6">
						<svg
							viewBox="0 0 48 48"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							className="mx-auto mb-4 h-12 w-12 fill-black transition-all duration-300 group-hover:-rotate-180 group-hover:scale-125 group-hover:fill-[#e1713f]"
						>
							<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
							<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
							<g id="SVGRepo_iconCarrier">
								<g id="Layer_2" data-name="Layer 2">
									<g id="invisible_box">
										<rect width="48" height="48" fill="none"></rect>
									</g>
									<g id="Q3_icons" data-name="Q3 icons">
										<g>
											<path d="M45.4,33l-3.9-6.2A2,2,0,1,0,38.1,29L42,35.2H25.5l2.4-2.5a2.1,2.1,0,0,0-.1-2.9A2,2,0,0,0,25,30l-5.6,5.8a2.1,2.1,0,0,0,0,2.8l5.7,5.8a1.9,1.9,0,0,0,2.8,0,1.9,1.9,0,0,0,0-2.8l-2.2-2.3H42a3.9,3.9,0,0,0,3.5-2.1A4.2,4.2,0,0,0,45.4,33Z"></path>{" "}
											<path d="M19.8,14.6l4.1-7.5,7.6,11.8-3.2-.7a2.1,2.1,0,0,0-2.4,1.6,1.9,1.9,0,0,0,1.5,2.3l7.8,1.7h.4a2,2,0,0,0,1.1-.3,2,2,0,0,0,.8-1.3l1.7-8a2.1,2.1,0,0,0-1.6-2.4,2.1,2.1,0,0,0-2.4,1.6l-.6,3L27.3,4.9A3.9,3.9,0,0,0,24,3a4.2,4.2,0,0,0-3.4,1.8h0l-4.3,7.8a2,2,0,0,0,3.5,1.9Z"></path>{" "}
											<path d="M16.3,19.8a1.8,1.8,0,0,0-.9-1.3,1.9,1.9,0,0,0-1.5-.3L6.1,19.7a2.1,2.1,0,0,0-1.5,2.4,1.9,1.9,0,0,0,2.3,1.5l2.6-.5L2.7,32.9a4.2,4.2,0,0,0-.2,4.3A3.9,3.9,0,0,0,6,39.3h7.1a2,2,0,1,0,0-4H6l7.2-10.3.6,3.7a2,2,0,0,0,2,1.6h.4a2.1,2.1,0,0,0,1.6-2.4Z"></path>{" "}
										</g>
									</g>
								</g>
							</g>
						</svg>
						<h3 className="text-xl font-bold group-hover:text-[#e1713f]">
							{t("our-commitment.practiques.2.title")}
						</h3>
						<p className="mt-2">{t("our-commitment.practiques.2.description")}</p>
					</div>
				</div>
			</section>

			<section className="my-24 flex items-center justify-center gap-4 px-4 sm:px-8 lg:my-36 lg:gap-6 xl:gap-10">
				<div className="">
					<div className="flex w-full max-w-screen-md items-center gap-2 text-center md:text-left">
						<div className="hidden h-1 w-full max-w-14 bg-black md:block"></div>

						<h2 className="text-3xl font-bold md:text-nowrap md:text-left lg:text-4xl xl:text-5xl">
							{t("how-you-can-help.title")}
						</h2>
					</div>
					<p className="mx-auto mt-2 max-w-screen-md text-pretty lg:mt-4 lg:text-lg">
						{t("how-you-can-help.description")}
					</p>

					<div className="mt-6 flex max-w-screen-md flex-col gap-4 lg:mt-10">
						<p className="md:text-lg">
							<TriangleRightIcon className="mr-1 inline-flex" />
							<span className="mr-1 font-bold">{t("how-you-can-help.practiques.0.title")}</span>
							{t("how-you-can-help.practiques.0.description")}
						</p>
						<p className="md:text-lg">
							<TriangleRightIcon className="mr-1 inline-flex" />
							<span className="mr-1 font-bold">{t("how-you-can-help.practiques.1.title")}</span>
							{t("how-you-can-help.practiques.1.description")}
						</p>
						<p className="md:text-lg">
							<TriangleRightIcon className="mr-1 inline-flex" />
							<span className="mr-1 font-bold">{t("how-you-can-help.practiques.2.title")}</span>
							{t("how-you-can-help.practiques.2.description")}
						</p>
					</div>
				</div>
			</section>

			<section className="my-28 flex items-center justify-center gap-4 px-4 sm:px-8 lg:my-36 lg:gap-6 xl:gap-10">
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="/docs/politicas-sustentabilidad.pdf"
					className="mx-auto text-center text-xl font-bold italic underline transition-colors hover:text-[#e1713f]"
				>
					<DownloadIcon className="mb-1 mr-2 inline-block h-auto w-6" />
					{t("see-more")}
				</a>
			</section>
		</main>
	)
}
