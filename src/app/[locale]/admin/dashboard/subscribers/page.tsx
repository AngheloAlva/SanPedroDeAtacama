"use client"

import { useSubscribers } from "@/hooks/useSubscribers"
import { usePathname } from "@/i18n/routing"

import SubscribersTable from "@/components/subscribers/admin/SubscribersTable"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { PiFileArrowDownDuotone } from "react-icons/pi"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardTitle,
	CardFooter,
	CardHeader,
	CardContent,
	CardDescription,
} from "@/components/ui/card"
import {
	Pagination,
	PaginationItem,
	PaginationContent,
	PaginationEllipsis,
} from "@/components/ui/pagination"

export default function AdminSubscribersPage(): React.ReactElement {
	const pathName = usePathname()

	const {
		page,
		isLoading,
		totalCount,
		totalPages,
		changePage,
		subscribers,
		increasePage,
		decreasePage,
	} = useSubscribers(pathName)

	return (
		<main className="mx-auto w-full max-w-screen-lg gap-4 p-4 sm:px-6 sm:py-0 md:mt-4">
			<section className="flex flex-col gap-4">
				<div className="ml-auto flex items-center gap-2">
					<Button variant="outline" className="h-7 gap-1">
						<PiFileArrowDownDuotone className="h-3.5 w-3.5" />
						<span className="whitespace-nowrap">Export</span>
					</Button>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Subscribers</CardTitle>
						<CardDescription>
							Here you can see all the subscribers to the newsletter
						</CardDescription>
					</CardHeader>
					<CardContent>
						<SubscribersTable isLoading={isLoading} subscribers={subscribers} />
					</CardContent>
					<CardFooter>
						<div className="text-xs text-muted-foreground">
							Showing <strong>1-10</strong> of <strong>{totalCount}</strong> zones
						</div>
					</CardFooter>
				</Card>

				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<Button
								variant={"outline"}
								disabled={page === 1}
								onClick={() => {
									decreasePage()
								}}
							>
								<ChevronLeft />
							</Button>
						</PaginationItem>

						{Array.from({ length: totalPages }).map((_, index) => (
							<PaginationItem key={index}>
								<Button
									variant={"outline"}
									onClick={() => {
										changePage(index + 1)
									}}
								>
									{index + 1}
								</Button>
							</PaginationItem>
						))}

						{totalPages > 3 && (
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
						)}

						<PaginationItem>
							<Button
								variant={"outline"}
								disabled={page === totalPages}
								onClick={() => {
									increasePage()
								}}
							>
								<ChevronRight />
							</Button>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</section>
		</main>
	)
}
