import AdminHeader from "@/components/navbar/admin/AdminHeader"
import AdminNavbar from "@/components/navbar/admin/AdminNavbar"
import { TooltipProvider } from "@/components/ui/tooltip"

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactElement
	params: { locale: string }
}>): Promise<React.ReactElement> {
	return (
		<TooltipProvider>
			<div className="flex min-h-screen w-full flex-col bg-muted/40">
				<AdminNavbar />
				<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
					<AdminHeader />
					{children}
				</div>
			</div>
		</TooltipProvider>
	)
}
