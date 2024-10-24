"use client"

import { createFlowOrder } from "@/actions/payment/flow/createFlowOrder"
import { useTranslations } from "next-intl"
import { useState } from "react"

import { Button } from "@/components/ui/button"

interface FlowButtonProps {
	bookingId: string
	amount: number
	userEmail: string
}

export default function FlowButton({
	bookingId,
	amount,
	userEmail,
}: FlowButtonProps): React.ReactElement {
	const [isLoading, setIsLoading] = useState(false)
	const t = useTranslations("PaymentPage.payment.paymentMethod")

	const handleFlowPayment = async () => {
		setIsLoading(true)
		try {
			const response = await createFlowOrder(bookingId, amount, userEmail)
			if (response.redirect) {
				window.location.href = response.redirect
			} else {
				console.error("Error creating Flow order")
				setIsLoading(false)
			}
		} catch (error) {
			console.error("Error processing Flow payment:", error)
			setIsLoading(false)
		}
	}

	return (
		<div className="">
			<Button
				onClick={handleFlowPayment}
				disabled={isLoading}
				className="mb-1 h-10 cursor-pointer bg-green px-8 text-base font-bold uppercase tracking-widest hover:bg-green hover:brightness-90"
			>
				{isLoading ? "Procesando..." : t("flowButton")}
			</Button>
		</div>
	)
}
