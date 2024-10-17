import { TableCell, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export default function BookingTableItemSkeleton(): React.ReactElement {
	return (
		<TableRow>
			<TableCell>
				<Skeleton className="h-6 w-20" />
			</TableCell>
			<TableCell>
				<Skeleton className="h-6 w-20" />
			</TableCell>
			<TableCell>
				<Skeleton className="h-6 w-20" />
			</TableCell>
			<TableCell className="hidden md:table-cell">
				<Skeleton className="h-6 w-20" />
			</TableCell>
			<TableCell className="hidden md:table-cell">
				<Skeleton className="h-6 w-20" />
			</TableCell>
			<TableCell>
				<Button size={"sm"} variant="outline">
					View
				</Button>
			</TableCell>
		</TableRow>
	)
}
