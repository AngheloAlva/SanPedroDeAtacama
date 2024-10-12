import { Link } from "@/i18n/routing"

import { TableCell, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface Props {
	slug?: string
}

export default function ZoneTableItem({ slug }: Props): React.ReactElement {
	return (
		<TableRow>
			<TableCell className="font-medium">{slug}</TableCell>
			<TableCell>
				<Link className="w-full" href={`/admin/dashboard/zones/${slug}`}>
					<Button size={"sm"} variant="outline">
						Edit
					</Button>
				</Link>
			</TableCell>
		</TableRow>
	)
}
