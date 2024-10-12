import { Link } from "@/i18n/routing"
import Image from "next/image"

import { TableCell, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Props {
	slug?: string
	image?: string
	price?: number
	isActive?: boolean
}

export default function ProgramTableItem({
	slug,
	price,
	image,
	isActive,
}: Props): React.ReactElement {
	return (
		<TableRow>
			<TableCell className="hidden sm:table-cell">
				<Image
					width="64"
					height="64"
					src={image || "/placeholder.svg"}
					alt={slug || "Excursion image"}
					className="aspect-square rounded-md object-cover"
				/>
			</TableCell>
			<TableCell className="font-medium">{slug}</TableCell>
			<TableCell>
				<Badge variant="outline">{isActive ? "Active" : "Inactive"}</Badge>
			</TableCell>
			<TableCell>${price}</TableCell>
			<TableCell className="hidden md:table-cell">x</TableCell>
			<TableCell>
				<Link className="w-full" href={`/admin/dashboard/programs/${slug}`}>
					<Button size={"sm"} variant="outline">
						Edit
					</Button>
				</Link>
			</TableCell>
		</TableRow>
	)
}
