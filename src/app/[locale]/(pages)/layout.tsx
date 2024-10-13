import Navbar from "@/components/navbar/general/Navbar"
import Footer from "@/components/footer/Footer"

import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Turismo Chile Tours",
	description: "Turismo Chile Tours",
}

interface PagesLayoutProps {
	children: React.ReactElement
	params: { locale: string }
}

export default async function PagesLayout({
	children,
}: PagesLayoutProps): Promise<React.ReactElement> {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	)
}
