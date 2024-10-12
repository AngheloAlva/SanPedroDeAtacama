"use client"

import { usePathname } from "@/i18n/routing"
import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

import FrenchIcon from "@/components/icons/flags/French"
import BrasilIcon from "@/components/icons/flags/Brasil"
import SpainIcon from "@/components/icons/flags/Spain"
import LanguageIcon from "@/components/icons/Language"
import UsaIcon from "@/components/icons/flags/Usa"
import LanguageItem from "./LaguageItem"
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export default function LanguagePicker({ className }: { className?: string }): React.ReactElement {
	const t = useTranslations("Navbar")
	const actualPathname = usePathname()
	const actualParams = useParams()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className={cn(
					"flex transform items-center text-base font-semibold hover:text-[#e1713f]",
					className
				)}
			></DropdownMenuTrigger>
			<LanguageIcon />
			<DropdownMenuContent className="z-[110]">
				<DropdownMenuLabel>{t("language")}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="p-0">
					<LanguageItem
						icon={<UsaIcon />}
						language="English"
						href={actualPathname}
						locale="en"
						params={actualParams}
					/>
				</DropdownMenuItem>
				<DropdownMenuItem className="p-0">
					<LanguageItem
						icon={<BrasilIcon />}
						language="Português"
						href={actualPathname}
						locale="pt"
						params={actualParams}
					/>
				</DropdownMenuItem>
				<DropdownMenuItem className="p-0">
					<LanguageItem
						icon={<SpainIcon />}
						language="Español"
						href={actualPathname}
						locale="es"
						params={actualParams}
					/>
				</DropdownMenuItem>
				<DropdownMenuItem className="p-0">
					<LanguageItem
						icon={<FrenchIcon />}
						language="French"
						href={actualPathname}
						locale="fr"
						params={actualParams}
					/>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
