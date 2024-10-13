import { useTranslations } from "next-intl"
import Image from "next/image"

export default function ExcursionsHero(): React.ReactElement {
	const t = useTranslations("Excursions.hero")

	return (
		<section className="relative h-[70vh] w-full overflow-hidden">
			<div className="absolute inset-0 bg-black opacity-40"></div>
			<Image
				width={1920}
				height={1080}
				loading={"eager"}
				alt={"Hero Image"}
				className={"h-full w-full select-none object-cover"}
				src={
					"https://res.cloudinary.com/dytz8ntnf/image/upload/q_auto/q_auto/v1725570144/zona-1_kvz2y0.jpg"
				}
			/>

			<div className="absolute left-1/2 top-1/2 flex w-full max-w-screen-2xl -translate-x-1/2 -translate-y-1/2 transform flex-col items-start gap-6 px-5 sm:px-7 md:px-12">
				<h1 className="changingText max-w-sm text-start text-4xl font-extrabold text-white drop-shadow sm:max-w-2xl md:text-5xl lg:text-6xl">
					{t("title")}
				</h1>
				<p className="max-w-4xl text-start text-lg font-bold text-white drop-shadow">
					{t("description")}
				</p>
			</div>
		</section>
	)
}
