import { Progress } from "@/components/ui/progress"
import {
	Card,
	CardTitle,
	CardFooter,
	CardHeader,
	CardContent,
	CardDescription,
} from "@/components/ui/card"

export default function AdminDashboardPage(): React.ReactElement {
	return (
		<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
			<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
				<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
					<Card x-chunk="dashboard-05-chunk-0">
						<CardHeader className="pb-2">
							<CardDescription>This Week</CardDescription>
							<CardTitle className="text-4xl">$1,329</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-xs text-muted-foreground">+25% from last week</div>
						</CardContent>
						<CardFooter>
							<Progress value={25} aria-label="25% increase" />
						</CardFooter>
					</Card>
					<Card x-chunk="dashboard-05-chunk-1">
						<CardHeader className="pb-2">
							<CardDescription>This Week</CardDescription>
							<CardTitle className="text-4xl">$1,329</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-xs text-muted-foreground">+25% from last week</div>
						</CardContent>
						<CardFooter>
							<Progress value={25} aria-label="25% increase" />
						</CardFooter>
					</Card>
					<Card x-chunk="dashboard-05-chunk-2">
						<CardHeader className="pb-2">
							<CardDescription>This Month</CardDescription>
							<CardTitle className="text-4xl">$5,329</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-xs text-muted-foreground">+10% from last month</div>
						</CardContent>
						<CardFooter>
							<Progress value={12} aria-label="12% increase" />
						</CardFooter>
					</Card>
				</div>
			</div>
		</main>
	)
}
