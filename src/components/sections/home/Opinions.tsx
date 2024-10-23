import { useTranslations } from "next-intl"
import Link from "next/link"

import TripAdvisor from "@/components/icons/TripAdvisor"
import { StarFilledIcon } from "@radix-ui/react-icons"
import Google from "@/components/icons/Google"

import "../../../styles/opinionsGrid.css"

export default function Opinions(): React.ReactElement {
	const t = useTranslations("Opinions")

	const tripAdvisorKeys = Array.from({ length: 4 }, (_, i) => i.toString())
	const googleKeys = Array.from({ length: 4 }, (_, i) => i.toString())

	return (
		<div className="mx-auto my-16 flex max-w-screen-2xl flex-col px-5 lg:px-10">
			<h3 className="text-4xl font-extrabold">{t("title")}</h3>
			<p className="mt-1.5 font-semibold text-muted-foreground">{t("description")}</p>

			<div className="opinions-grid mt-5 grid gap-4">
				{tripAdvisorKeys.map((key) => (
					<div
						key={key}
						className="relative flex flex-col rounded-lg border border-input px-2 py-3 shadow-sm sm:px-3 md:px-4 md:py-4"
					>
						<TripAdvisor className="absolute right-4 h-8 w-auto" />
						<p className="font-semibold">{t(`tripAdvisor.${key}.name`)}</p>

						<div className="flex items-center gap-0.5">
							{Array.from({ length: 5 }, (_, i) => (
								<div className="h-3 w-3 rounded-full bg-[#34E0A1]" key={i} />
							))}
						</div>

						<p className="mt-1.5 text-lg font-bold">{t(`tripAdvisor.${key}.title`)}</p>
						<p className="text-pretty font-medium text-muted-foreground">
							{t(`tripAdvisor.${key}.opinion`)}
						</p>

						<Link
							className="mt-2 w-fit font-semibold underline transition-colors hover:text-[#34E0A1]"
							href={t(`tripAdvisor.${key}.origin-link`)}
							rel="noopener noreferrer"
							target="_blank"
						>
							{t(`tripAdvisor.${key}.origin`)}
						</Link>
					</div>
				))}
				{googleKeys.map((key) => (
					<div
						key={key}
						className="relative flex flex-col rounded-lg border border-input px-2 py-3 shadow-sm sm:px-3 md:px-4 md:py-4"
					>
						<Google className="absolute right-4 h-8 w-auto" />
						<p className="font-semibold">{t(`google.${key}.name`)}</p>

						<div className="flex items-center gap-0.5">
							{Array.from({ length: 5 }, (_, i) => (
								<StarFilledIcon className="h-3.5 w-3.5 rounded-full text-[#fbbd09]" key={i} />
							))}
						</div>

						<p className="mt-1.5 text-pretty font-medium text-muted-foreground">
							{t(`google.${key}.opinion`)}
						</p>

						<Link
							className="mt-2 w-fit font-semibold underline transition-colors hover:text-[#fbbd09]"
							href={t(`google.${key}.origin-link`)}
							rel="noopener noreferrer"
							target="_blank"
						>
							{t(`google.${key}.origin`)}
						</Link>
					</div>
				))}
			</div>
		</div>
	)
}
