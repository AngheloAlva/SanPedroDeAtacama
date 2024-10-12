import { Link } from "@/i18n/routing"
import Image from "next/image"

import { PiMapPinSimpleArea, PiPackage, PiMountains, PiShoppingCart, PiHouse, PiList } from "react-icons/pi"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import SideBarItem from "./SideBarItem"

export default function AdminSideBar(): React.ReactElement {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size="icon" variant="outline" className="sm:hidden">
					<PiList className="h-5 w-5" />
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
						icon={<PiHouse className="h-5 w-5" />}
						actualPath="/admin/dashboard"
					/>
					<SideBarItem
						href="/admin/dashboard/orders"
						title="Orders"
						icon={<PiShoppingCart className="h-5 w-5" />}
						actualPath="/admin/dashboard"
					/>
					<SideBarItem
						href="/admin/dashboard/excursions"
						title="Excursions"
						icon={<PiMountains className="h-5 w-5" />}
						actualPath="/admin/dashboard"
					/>
					<SideBarItem
						href="/admin/dashboard/programs"
						title="Programs"
						icon={<PiPackage className="h-5 w-5" />}
						actualPath="/admin/dashboard"
					/>
					<SideBarItem
						href="/admin/dashboard/zones"
						title="Zones"
						icon={<PiMapPinSimpleArea className="h-5 w-5" />}
						actualPath="/admin/dashboard"
					/>
				</nav>
			</SheetContent>
		</Sheet>
	)
}
