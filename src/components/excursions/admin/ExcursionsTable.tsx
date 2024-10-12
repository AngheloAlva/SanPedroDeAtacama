import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import ExcursionTableItemSkeleton from "./ExcursionTableItemSkeleton"
import ExcursionTableItem from "./ExcursionTableItem"

import type { excursion } from "@/db/schema/excursion"

interface ExcursionsTableProps {
	isLoading: boolean
	excursions: (typeof excursion.$inferSelect)[]
}

export default function ExcursionsTable({
	excursions,
	isLoading,
}: ExcursionsTableProps): React.ReactElement {
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
					? Array.from({ length: 10 }).map((_, index) => <ExcursionTableItemSkeleton key={index} />)
					: excursions.map((excursion) => (
							<ExcursionTableItem
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
