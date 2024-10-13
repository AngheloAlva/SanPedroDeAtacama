import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import Image from "next/image"

import SubscribeSheet from "./SubscribeSheet"

export default function Footer(): React.ReactElement {
	const t = useTranslations("Footer")

	return (
		<footer className="w-full bg-black px-4 pb-20 pt-20 text-center text-white md:px-8">
			<div className="mx-auto flex w-full max-w-screen-xl flex-col flex-wrap items-center justify-center gap-x-14 gap-y-20 sm:flex-row md:gap-x-20 lg:flex-nowrap lg:items-end lg:justify-between">
				<div className="mt-5 flex w-fit min-w-full flex-col items-center gap-8 lg:hidden">
					<Link
						href={"/"}
						className="flex flex-col items-center transition-all duration-300 hover:scale-105"
					>
						<Image alt="Logo" width={200} height={200} className="h-32 w-auto" src={"/Logo.png"} />
						<span className="mt-1 font-bold">By Turismochiletours</span>
					</Link>
					<SubscribeSheet />
				</div>

				<div className="flex w-fit flex-col items-center gap-5">
					<div className="">
						<h2 className="text-3xl font-bold">{t("about-us.title")}</h2>
						<div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm">
							<Link
								href={{ pathname: t("about-us.list.0.href") as "/", query: { source: "contact" } }}
								className="w-fit rounded-lg border-4 border-white px-4 py-2 transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black"
							>
								{t("about-us.list.0.name")}
							</Link>
							<Link
								href={t("about-us.list.1.href") as "/"}
								className="w-fit rounded-lg border-4 border-white px-4 py-2 transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black"
							>
								{t("about-us.list.1.name")}
							</Link>
						</div>
					</div>

					<div className="flex flex-col items-center">
						<h3 className="text-lg font-bold">{t("about-us.wholesaler.text")}</h3>
						<Link
							href={{
								pathname: t("about-us.wholesaler.href") as "/",
								query: { source: "wholesaler" },
							}}
							className="mt-3 w-fit rounded-lg border-4 border-white px-4 py-2 transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black"
						>
							{t("about-us.wholesaler.button")}
						</Link>
					</div>
				</div>

				<div className="mt-5 hidden w-fit flex-col items-center gap-8 lg:flex">
					<Link href={"/"} className="flex flex-col items-center">
						<Image
							alt="Logo"
							width={200}
							height={200}
							className="h-32 w-auto"
							src={"/images/Logo.png"}
						/>
						<span className="mt-1 font-bold">By Turismochiletours</span>
					</Link>
					<SubscribeSheet />
				</div>

				<div className="flex w-fit flex-col gap-3">
					<h2 className="text-3xl font-bold">{t("moreInfo.title")}</h2>
					<div className="mx-auto flex w-fit flex-col gap-3 font-semibold">
						<Link
							href={("/about-us" + "/" + t("moreInfo.list.0.id")) as "/"}
							className="hover:underline"
						>
							{t("moreInfo.list.0.name")}
						</Link>
						<Link
							href={("/about-us" + "/" + t("moreInfo.list.1.id")) as "/"}
							className="hover:underline"
						>
							{t("moreInfo.list.1.name")}
						</Link>
						<Link
							href={("/about-us" + "/" + t("moreInfo.list.2.id")) as "/"}
							className="hover:underline"
						>
							{t("moreInfo.list.2.name")}
						</Link>
						<Link
							href={("/about-us" + "/" + t("moreInfo.list.3.id")) as "/"}
							className="hover:underline"
						>
							{t("moreInfo.list.3.name")}
						</Link>
						<Link
							href={("/about-us" + "/" + t("moreInfo.list.4.id")) as "/"}
							className="hover:underline"
						>
							{t("moreInfo.list.4.name")}
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}
