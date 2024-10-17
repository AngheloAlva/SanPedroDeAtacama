import { Link } from "@/i18n/routing"

import { TableCell, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Props {
	id: string
	email: string
	phone: string
	total_price: number | null
	status: "pending" | "confirmed" | "cancelled"
}

export default function BookingTableItem({
	email,
	id,
	phone,
	status,
	total_price,
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
			<TableCell>${total_price}</TableCell>
			<TableCell className="hidden md:table-cell">{email}</TableCell>
			<TableCell className="hidden md:table-cell">{phone}</TableCell>
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
