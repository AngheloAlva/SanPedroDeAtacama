"use client"

import { updatePaymentStatus } from "@/actions/payment/updatePaymentStatus"
import { paypalCheckPayment } from "@/actions/payment/paypal/checkPayment"
import { setTransactionId } from "@/actions/payment/setTransactionId"
import { useToast } from "@/hooks/use-toast"
import {
	PayPalButtons,
	usePayPalScriptReducer,
	PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js"

import { Skeleton } from "@/components/ui/skeleton"

export default function PaypalButton({
	amount,
	bookingId,
	currency,
}: {
	amount: number
	bookingId: string
	currency: "USD" | "BRL"
}): React.ReactElement {
	const [{ isPending }] = usePayPalScriptReducer()
	const { toast } = useToast()

	const createOrder: PayPalButtonsComponentProps["createOrder"] = async (data, actions) => {
		const transactionId = await actions.order.create({
			purchase_units: [
				{
					invoice_id: bookingId,
					amount: {
						currency_code: currency,
						value: `${amount}`,
					},
				},
			],
			intent: "CAPTURE",
		})

		const { ok } = await setTransactionId(bookingId, transactionId)

		if (!ok) {
			toast({
				title: "Error",
				description: "An error occurred while processing the payment",
				variant: "destructive",
				duration: 5000,
			})
		}

		return transactionId
	}

	const onApprove: PayPalButtonsComponentProps["onApprove"] = async (data, actions) => {
		const details = await actions.order?.capture()

		if (!details) {
			toast({
				title: "Error",
				description: "An error occurred while processing the payment",
				variant: "destructive",
				duration: 5000,
			})
		}

		if (details?.id) {
			await paypalCheckPayment(details.id)
		}
	}

	const onCancell: PayPalButtonsComponentProps["onCancel"] = async () => {
		await updatePaymentStatus(bookingId, "cancelled", "rejected")

		toast({
			title: "Cancelled",
			description: "Payment was cancelled",
			variant: "destructive",
			duration: 5000,
		})
	}

	return (
		<div>
			{isPending ? (
				<Skeleton className="h-12 w-full" />
			) : (
				<PayPalButtons
					onCancel={onCancell}
					onApprove={onApprove}
					createOrder={createOrder}
					style={{ layout: "horizontal", color: "blue", tagline: false, height: 40 }}
				/>
			)}
		</div>
	)
}
