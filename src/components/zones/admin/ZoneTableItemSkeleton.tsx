import { TableCell, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export default function ZoneTableItemSkeleton(): React.ReactElement {
	return (
		<TableRow>
			<TableCell>
				<Skeleton className="h-5 w-12" />
			</TableCell>
			<TableCell>
				<Button size={"sm"} variant="outline">
					Edit
				</Button>
			</TableCell>
		</TableRow>
	)
}
