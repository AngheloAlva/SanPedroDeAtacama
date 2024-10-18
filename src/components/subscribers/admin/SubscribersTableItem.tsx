import { es } from "date-fns/locale"
import { format } from "date-fns"

import { TableCell, TableRow } from "@/components/ui/table"

interface Props {
	email: string
	createAt: string
}

export default function SubscribersTableItem({ email, createAt }: Props): React.ReactElement {
	return (
		<TableRow>
			<TableCell className="font-medium">{email}</TableCell>
			<TableCell>{format(createAt, "PPP", { locale: es })}</TableCell>
		</TableRow>
	)
}
