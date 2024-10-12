import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import ZoneTableItemSkeleton from "./ZoneTableItemSkeleton"
import ProgramTableItem from "./ZoneTableItem"

import type { zone } from "@/db/schema/zone"

interface ProgramsTableProps {
	zones: (typeof zone.$inferSelect)[]
	isLoading: boolean
}

export default function ZonesTable({ zones, isLoading }: ProgramsTableProps): React.ReactElement {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-full">Slug</TableHead>
					<TableHead className="w-full">
						<span className="sr-only">Acciones</span>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{isLoading
					? Array.from({ length: 10 }).map((_, index) => <ZoneTableItemSkeleton key={index} />)
					: zones.map((zone) => <ProgramTableItem key={zone.id} slug={zone.slug} />)}
			</TableBody>
		</Table>
	)
}
