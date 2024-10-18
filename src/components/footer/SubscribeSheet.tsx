import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

import { Sheet, SheetTitle, SheetContent, SheetTrigger, SheetDescription } from "../ui/sheet"
import SubscribeInput from "./SubscribeInput"

export default function SubscribeSheet({ className }: { className?: string }): React.ReactElement {
	const t = useTranslations("Footer.subscribe.sheet")

	return (
		<Sheet>
			<SheetTrigger
				className={cn(
					"h-fit w-fit rounded-lg border-4 border-white bg-transparent px-12 py-3 font-bold transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black focus:outline-none lg:px-16",
					className
				)}
			>
				{t("button")}
			</SheetTrigger>
			<SheetContent side={"bottom"} className="z-[120] border-t-0 bg-white px-0 py-0 text-black">
				<div className="nav-rainbow relative z-50 flex h-4 w-full transition"></div>

				<div className="px-4 py-10 lg:py-14 xl:py-16">
					<SheetTitle className="text-center text-2xl font-bold text-black">
						{t("title")}
					</SheetTitle>

					<SheetDescription className="mt-3 text-center text-base text-black/90">
						{t("description")}
					</SheetDescription>

					<SubscribeInput />
				</div>
			</SheetContent>
		</Sheet>
	)
}
