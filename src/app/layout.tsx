import { NextIntlClientProvider } from "next-intl"
import { generalFont } from "@/config/fonts"

import type { Metadata } from "next"

import "./globals.css"
import { getMessages } from "next-intl/server"

export const metadata: Metadata = {
	title: "San Pedro de Atacama",
	description: "San Pedro de Atacama",
}

export default async function RootLayout({
	children,
	params: { locale },
}: Readonly<{
	children: React.ReactElement
	params: { locale: string }
}>): Promise<React.ReactElement> {
	const messages = await getMessages()

	return (
		<html lang={locale}>
			<NextIntlClientProvider messages={messages}>
				<body className={`${generalFont.className} antialiased`}>{children}</body>
			</NextIntlClientProvider>
		</html>
	)
}
