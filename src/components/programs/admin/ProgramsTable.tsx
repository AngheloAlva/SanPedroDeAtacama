import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import ProgramTableItemSkeleton from "./ProgramTableItemSkeleton"
import ProgramTableItem from "./ProgramTableItem"

import type { program } from "@/db/schema/program"

interface ProgramsTableProps {
	programs: (typeof program.$inferSelect)[]
	isLoading: boolean
}

export default function ProgramsTable({
	programs,
	isLoading,
}: ProgramsTableProps): React.ReactElement {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="hidden w-[100px] sm:table-cell">
						<span className="sr-only">Image</span>
					</TableHead>
					<TableHead>Slug</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Price</TableHead>
					<TableHead className="hidden md:table-cell">Total Sales</TableHead>
					<TableHead>
						<span className="sr-only">Acciones</span>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{isLoading
					? Array.from({ length: 10 }).map((_, index) => <ProgramTableItemSkeleton key={index} />)
					: programs.map((excursion) => (
							<ProgramTableItem
								key={excursion.id}
								slug={excursion.slug}
								price={excursion.price}
								isActive={excursion.is_active}
								image={excursion.images?.[0] ?? "/placeholder.png"}
							/>
						))}
			</TableBody>
		</Table>
	)
}
