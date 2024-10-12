"use client"

import { Link, usePathname } from "@/i18n/routing"

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function AdminBreadcrumb(): React.ReactElement {
	const pathname = usePathname()
	const separatedPathname = pathname.split("/")

	return (
		<Breadcrumb className="hidden md:flex">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link href="/admin/dashboard">Dashboard</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>

				{separatedPathname[3] && (
					<>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>{separatedPathname[3]}</BreadcrumbPage>
						</BreadcrumbItem>
					</>
				)}

				{separatedPathname[4] && (
					<>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>{separatedPathname[4]}</BreadcrumbPage>
						</BreadcrumbItem>
					</>
				)}
			</BreadcrumbList>
		</Breadcrumb>
	)
}
