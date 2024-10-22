import ImageLoader from "@/components/shared/general/ImageLoader"
import { useTranslations } from "next-intl"

export default function AllServices(): React.ReactElement {
	const t = useTranslations("Services")

	return (
		<>
			<section className="relative my-2 py-8 md:mb-14 md:mt-8 md:py-16 xl:my-20">
				<div className="absolute left-1/2 top-1/2 -z-10 min-h-[80%] w-[150vw] -translate-x-1/2 -translate-y-1/2 -rotate-6 transform bg-neutral-50 lg:min-h-full"></div>

				<div className="mx-auto flex max-w-screen-2xl flex-col items-start justify-center gap-8 px-4 sm:px-10 md:px-16 xl:flex-row">
					<div className="mx-auto max-w-screen-md">
						<h2 className="text-pretty text-xl font-bold md:text-2xl">{t(`list.0.name`)}</h2>

						<p className="mt-2 font-medium">{t("list.0.description")}</p>

						<h2 className="mt-6 text-pretty text-xl font-bold md:text-2xl">{t(`list.1.name`)}</h2>

						<p className="mt-2 font-medium">{t("list.1.description")}</p>
					</div>

					<ImageLoader
						width={2304}
						height={1296}
						alt="Our Team"
						src={t("list.0.image")}
						className="image1 mx-auto h-fit w-full shadow transition-all duration-300 hover:scale-105 hover:shadow-lg xl:w-1/2"
					/>
				</div>
			</section>

			<section className="relative my-2 flex flex-col items-start justify-center py-8 md:mb-14 md:mt-8 md:py-16 xl:my-20">
				{/* <div className="absolute left-1/2 top-1/2 -z-10 min-h-[90%] w-[150vw] -translate-x-1/2 -translate-y-1/2 rotate-6 transform bg-neutral-50 lg:min-h-full"></div> */}

				<div className="mx-auto flex max-w-screen-2xl flex-col items-start justify-center gap-8 px-4 sm:px-10 md:px-16 xl:flex-row-reverse">
					<div className="mx-auto max-w-screen-md">
						<h2 className="text-pretty text-xl font-bold md:text-2xl">{t(`list.2.name`)}</h2>

						<p className="mt-2 font-medium">{t("list.2.description")}</p>

						<h2 className="mt-6 text-pretty text-xl font-bold md:text-2xl">{t(`list.3.name`)}</h2>

						<p className="mt-2 font-medium">{t("list.3.description")}</p>
					</div>

					<ImageLoader
						width={2304}
						height={1296}
						alt="Our Team"
						src={t("list.2.image")}
						className="mx-auto h-fit w-full shadow transition-all duration-300 hover:scale-105 hover:shadow-lg xl:w-1/2"
					/>
				</div>
			</section>

			<section className="relative my-2 flex flex-col items-start justify-center py-8 md:mb-14 md:mt-8 md:py-16 xl:my-20">
				<div className="absolute left-1/2 top-1/2 -z-10 min-h-[90%] w-[150vw] -translate-x-1/2 -translate-y-1/2 rotate-6 transform bg-neutral-50 lg:min-h-full"></div>

				<div className="mx-auto flex max-w-screen-2xl flex-col items-start justify-center gap-8 px-4 sm:px-10 md:px-16 xl:flex-row">
					<div className="mx-auto max-w-screen-md">
						<h2 className="text-pretty text-xl font-bold md:text-2xl">{t(`list.4.name`)}</h2>

						<p className="mt-2 font-medium">{t("list.4.description")}</p>
					</div>

					<ImageLoader
						width={2304}
						height={1296}
						alt="Our Team"
						src={t("list.4.image")}
						className="mx-auto h-fit w-full shadow transition-all duration-300 hover:scale-105 hover:shadow-lg xl:w-1/2"
					/>
				</div>
			</section>

			<section className="relative my-2 flex flex-col items-start justify-center py-8 md:mb-14 md:mt-8 md:py-16 xl:my-20">
				{/* <div className="absolute left-1/2 top-1/2 -z-10 min-h-[90%] w-[150vw] -translate-x-1/2 -translate-y-1/2 rotate-6 transform bg-neutral-50 lg:min-h-full"></div> */}

				<div className="mx-auto flex max-w-screen-2xl flex-col items-start justify-center gap-8 px-4 sm:px-10 md:px-16 xl:flex-row-reverse">
					<div className="mx-auto max-w-screen-md">
						<h2 className="text-pretty text-xl font-bold md:text-2xl">{t(`list.5.name`)}</h2>

						<p className="mt-2 font-medium">{t("list.5.description")}</p>
					</div>

					<ImageLoader
						width={2304}
						height={1296}
						alt="Our Team"
						src={t("list.5.image")}
						className="mx-auto h-fit w-full shadow transition-all duration-300 hover:scale-105 hover:shadow-lg xl:w-1/2"
					/>
				</div>
			</section>
		</>
	)
}
