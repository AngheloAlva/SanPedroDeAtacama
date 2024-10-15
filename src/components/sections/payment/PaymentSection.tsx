"use client"

import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import PaypalButton from "./PaypalButton"

import type { booking_item } from "@/db/schema/booking-item"

export default function PaymentSection({
	bookingItems,
	bookingId,
}: {
	bookingItems: (typeof booking_item.$inferSelect)[]
	bookingId: string
}): React.ReactElement {
	return (
		<PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}>
			<PaypalButton bookingItems={bookingItems} bookingId={bookingId} />
		</PayPalScriptProvider>
	)
}
