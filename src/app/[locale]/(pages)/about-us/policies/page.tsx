import { getTranslations } from "next-intl/server"
import { useTranslations } from "next-intl"

import { IdCardIcon, PersonIcon, DotFilledIcon, LockClosedIcon } from "@radix-ui/react-icons"
import Hero from "@/components/shared/general/Hero"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
	const t = await getTranslations({ locale, namespace: "AboutUs.policies" })

	return {
		title: t("title"),
		description: t("description"),
	}
}

export default function PoliciesPage(): React.ReactElement {
	const t = useTranslations("AboutUs.policies")

	const generalKeys = [
		"booking",
		"modifications",
		"medical",
		"transport",
		"conditions",
		"security",
		"health",
		"feeding",
		"conduct",
	]

	return (
		<main className="mb-24">
			<Hero
				title={t("hero.title")}
				description={t("hero.description")}
				image="/v1725581287/hero_sul1ro.jpg"
				imageAlt={t("hero.imageAlt")}
			/>

			<section className="mx-auto mt-12 max-w-screen-xl px-4 sm:px-6 md:mt-28 md:px-10">
				<div className="flex min-w-fit items-center justify-start gap-2 md:flex-row-reverse xl:gap-4">
					<h2 className="min-w-fit text-2xl font-bold sm:text-3xl md:w-full md:text-4xl">
						{t("general.title")}
					</h2>

					<div className="h-0.5 w-full max-w-14 bg-black/50"></div>
				</div>

				<div className="mt-4 flex flex-col gap-4 md:gap-6 lg:mt-6">
					{generalKeys.map((key) => (
						<div key={key} className="flex flex-col">
							<h3 className="text-lg font-semibold">{t(`general.${key}.title`)}</h3>

							{Array.from({ length: parseInt(t(`general.${key}.items-length`)) }, (_, i) => (
								<p key={i} className="ml-2 mt-1 text-pretty text-base md:mt-1.5">
									<DotFilledIcon className="mr-1 inline-block h-3 w-3 text-primary" />
									{t.rich(`general.${key}.items.${i}`, {
										bold: (text) => <strong className="font-semibold">{text}</strong>,
										subItem: (text) => <span className="mb-2">{text}</span>,
									})}
								</p>
							))}
						</div>
					))}
				</div>
			</section>

			<section className="mx-auto mt-20 max-w-screen-xl px-4 sm:px-6 md:mt-28 md:px-10">
				<div className="flex min-w-fit items-center justify-start gap-2 md:flex-row-reverse xl:gap-4">
					<h2 className="min-w-fit text-2xl font-bold sm:text-3xl md:w-full md:text-4xl">
						{t("privacy.title")}
					</h2>
					<div className="h-0.5 w-full max-w-14 bg-black/50"></div>
				</div>

				<p className="mt-2 text-base text-muted-foreground sm:text-lg">
					{t("privacy.description")}
				</p>

				<div className="mx-auto mt-8 grid max-w-screen-xl grid-cols-1 gap-5 text-center md:mt-12 md:grid-cols-2 lg:grid-cols-3">
					<div className="group rounded-lg bg-muted px-4 py-4 shadow lg:py-6">
						<IdCardIcon className="mx-auto mb-4 h-12 w-12 transition-all duration-300 group-hover:scale-125 group-hover:text-[#e1713f]" />
						<h3 className="text-xl font-bold group-hover:text-[#e1713f]">
							{t(`privacy.list.0.title`)}
						</h3>
						<p className="mt-2">{t(`privacy.list.0.description`)}</p>
					</div>

					<div className="group rounded-lg bg-muted px-4 py-4 shadow lg:py-6">
						<PersonIcon className="mx-auto mb-4 h-12 w-12 transition-all duration-300 group-hover:scale-125 group-hover:text-[#e1713f]" />
						<h3 className="text-xl font-bold group-hover:text-[#e1713f]">
							{t(`privacy.list.1.title`)}
						</h3>
						<p className="mt-2">{t(`privacy.list.1.description`)}</p>
					</div>

					<div className="group mx-auto bg-muted px-4 py-4 shadow md:col-span-2 md:max-w-lg md:rounded-lg lg:col-span-1 lg:py-6">
						<LockClosedIcon className="mx-auto mb-4 h-12 w-12 transition-all duration-300 group-hover:scale-125 group-hover:text-[#e1713f]" />
						<h3 className="text-xl font-bold group-hover:text-[#e1713f]">
							{t(`privacy.list.2.title`)}
						</h3>
						<p className="mt-2">{t(`privacy.list.2.description`)}</p>
					</div>
				</div>
			</section>
		</main>
	)
}
