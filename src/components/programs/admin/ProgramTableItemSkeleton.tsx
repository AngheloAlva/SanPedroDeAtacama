import { TableCell, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ProgramTableItemSkeleton(): React.ReactElement {
	return (
		<TableRow>
			<TableCell className="hidden sm:table-cell">
				<Skeleton className="aspect-square h-16 w-16 rounded-md" />
			</TableCell>
			<TableCell className="w-full font-medium">
				<Skeleton className="h-4 w-full" />
			</TableCell>
			<TableCell>
				<Badge variant="outline">
					<Skeleton className="h-4 w-12" />
				</Badge>
			</TableCell>
			<TableCell>
				<Skeleton className="h-5 w-12" />
			</TableCell>
			<TableCell className="hidden md:table-cell">
				<Skeleton className="h-4 w-20" />
			</TableCell>
			<TableCell>
				<Button size={"sm"} variant="outline">
					Edit
				</Button>
			</TableCell>
		</TableRow>
	)
}
