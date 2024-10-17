"use client"

import { Link, usePathname } from "@/i18n/routing"
import { useBookings } from "@/hooks/useBookings"

import { ChevronLeft, ChevronRight, PlusCircle } from "lucide-react"
import BookingTable from "@/components/booking/admin/BookingsTable"
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

export default function AdminOrdersPage(): React.ReactElement {
	const pathName = usePathname()

	const {
		page,
		bookings,
		isLoading,
		totalCount,
		totalPages,
		changePage,
		increasePage,
		decreasePage,
	} = useBookings("es", pathName)

	return (
		<main className="mx-auto w-full max-w-screen-lg gap-4 p-4 sm:px-6 sm:py-0 md:mt-4">
			<section className="flex flex-col gap-4">
				<div className="ml-auto flex items-center gap-2">
					{/* <Button variant="outline" className="h-7 gap-1">
						<File className="h-3.5 w-3.5" />
						<span className="whitespace-nowrap">Export</span>
					</Button> */}
					<Link href={"/admin/dashboard/zones/create"}>
						<Button className="h-9 gap-1">
							<PlusCircle className="h-4 w-4" />
							<span className="whitespace-nowrap">Add Zone</span>
						</Button>
					</Link>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Zone</CardTitle>
						<CardDescription>Manage your zones.</CardDescription>
					</CardHeader>
					<CardContent>
						<BookingTable isLoading={isLoading} bookings={bookings} />
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
