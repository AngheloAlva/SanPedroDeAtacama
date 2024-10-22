import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import BookingTableItemSkeleton from "./BookingTableItemSkeleton"
import ProgramTableItem from "./BookingTableItem"

import { booking } from "@/db/schema/booking"

interface ProgramsTableProps {
	bookings: (typeof booking.$inferSelect)[]
	isLoading: boolean
}

export default function BookingTable({
	bookings,
	isLoading,
}: ProgramsTableProps): React.ReactElement {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>ID</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Total</TableHead>
					<TableHead className="hidden md:table-cell">Email</TableHead>
					<TableHead>
						<span className="sr-only">Acciones</span>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{isLoading
					? Array.from({ length: 10 }).map((_, index) => <BookingTableItemSkeleton key={index} />)
					: bookings.map((booking) => <ProgramTableItem key={booking.id} {...booking} />)}
			</TableBody>
		</Table>
	)
}
