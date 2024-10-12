import { Link } from "@/i18n/routing"
import Image from "next/image"

import { HomeIcon, BoxModelIcon, ListBulletIcon, HamburgerMenuIcon } from "@radix-ui/react-icons"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { IoMdCart } from "react-icons/io"
import SideBarItem from "./SideBarItem"

export default function AdminSideBar(): React.ReactElement {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size="icon" variant="outline" className="sm:hidden">
					<HamburgerMenuIcon className="h-5 w-5" />
					<span className="sr-only">Toggle Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="sm:max-w-xs">
				<nav className="grid gap-6 text-lg font-medium">
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

					<SideBarItem
						href="/admin/dashboard"
						title="Dashboard"
						icon={<HomeIcon className="h-5 w-5" />}
						actualPath="/admin/dashboard"
					/>
					<SideBarItem
						href="/admin/orders"
						title="Orders"
						icon={<IoMdCart className="h-5 w-5" />}
						actualPath="/admin/dashboard"
					/>
					<SideBarItem
						href="/admin/excursions"
						title="Excursions"
						icon={<BoxModelIcon className="h-5 w-5" />}
						actualPath="/admin/dashboard"
					/>
					<SideBarItem
						href="/admin/programs"
						title="Programs"
						icon={<ListBulletIcon className="h-5 w-5" />}
						actualPath="/admin/dashboard"
					/>
				</nav>
			</SheetContent>
		</Sheet>
	)
}
