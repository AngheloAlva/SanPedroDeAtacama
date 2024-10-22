import { Link } from "@/i18n/routing"

import { TableCell, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Props {
	id: string
	email: string
	total_price_clp: number | null
	status: "pending" | "confirmed" | "cancelled"
}

export default function BookingTableItem({
	email,
	id,
	status,
	total_price_clp,
}: Props): React.ReactElement {
	return (
		<TableRow>
			<TableCell className="font-medium">{id}</TableCell>
			<TableCell>
				<Badge
					className={cn(
						status === "pending" && "bg-yellow",
						status === "confirmed" && "bg-green",
						status === "cancelled" && "bg-red-400"
					)}
				>
					{status === "pending" ? "Pending" : status === "confirmed" ? "Confirmed" : "Cancelled"}
				</Badge>
			</TableCell>
			<TableCell>${total_price_clp}</TableCell>
			<TableCell className="hidden md:table-cell">{email}</TableCell>
			<TableCell>
				<Link className="w-full" href={`/admin/dashboard/orders/${id}`}>
					<Button size={"sm"} variant="outline">
						View
					</Button>
				</Link>
			</TableCell>
		</TableRow>
	)
}
