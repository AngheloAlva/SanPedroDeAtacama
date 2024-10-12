import { Link } from "@/i18n/routing"
import Image from "next/image"

import { BoxModelIcon, HomeIcon, ListBulletIcon } from "@radix-ui/react-icons"
import { IoMdCart } from "react-icons/io"
import TooltipItem from "./TooltipItem"

export default function AdminNavbar(): React.ReactElement {
	return (
		<aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
			<nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
				<Link
					href="/admin/dashboard"
					className="group flex h-12 w-9 shrink-0 items-center justify-center rounded-lg bg-primary py-1 text-lg font-semibold text-primary-foreground md:text-base"
				>
					<Image
						src={"/Logo.png"}
						alt="Acme Inc"
						className="h-full w-auto"
						width={50}
						height={100}
					/>
					<span className="sr-only">Turismochiletours</span>
				</Link>

				<TooltipItem
					label="Dashboard"
					href="/admin/dashboard"
					icon={<HomeIcon className="h-5 w-5" />}
					actualPath="/admin/dashboard"
				/>
				<TooltipItem
					label="Orders"
					href="/admin/dashboard/orders"
					icon={<IoMdCart className="h-5 w-5" />}
					actualPath="/admin/dashboard"
				/>

				<TooltipItem
					label="Excursions"
					href="/admin/dashboard/excursions"
					actualPath="/admin/dashboard"
					icon={<BoxModelIcon className="h-5 w-5" />}
				/>

				<TooltipItem
					label="Programs"
					href="/admin/dashboard/programs"
					actualPath="/admin/dashboard"
					icon={<ListBulletIcon className="h-5 w-5" />}
				/>
			</nav>
		</aside>
	)
}
