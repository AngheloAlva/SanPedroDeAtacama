import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import SubscribersTableItemSkeleton from "./SubscribersTableItemSkeleton"
import SubscribersTableItem from "./SubscribersTableItem"

import { subscriber } from "@/db/schema/subscriber"

interface ProgramsTableProps {
	subscribers: (typeof subscriber.$inferSelect)[]
	isLoading: boolean
}

export default function SubscribersTable({
	subscribers,
	isLoading,
}: ProgramsTableProps): React.ReactElement {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Email</TableHead>
					<TableHead>Subscrito en</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{isLoading
					? Array.from({ length: 10 }).map((_, index) => (
							<SubscribersTableItemSkeleton key={index} />
						))
					: subscribers.map((subscriber) => (
							<SubscribersTableItem
								key={subscriber.id}
								email={subscriber.email}
								createAt={subscriber.createdAt}
							/>
						))}
			</TableBody>
		</Table>
	)
}
