import { TableCell, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

export default function SubscribersTableItemSkeleton(): React.ReactElement {
	return (
		<TableRow>
			<TableCell>
				<Skeleton className="h-6 w-20" />
			</TableCell>
			<TableCell>
				<Skeleton className="h-6 w-20" />
			</TableCell>
		</TableRow>
	)
}
