"use client"

import { useTranslations } from "next-intl"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useState } from "react"
import { createSubscriber } from "@/actions/subscriber/createSubscriber"
import { cn } from "@/lib/utils"

export default function SubscribeInput(): React.ReactElement {
	const [loading, setLoading] = useState<boolean>(false)
	const [email, setEmail] = useState<string>("")
	const [message, setMessage] = useState<{ type: string; message: string }>({
		type: "",
		message: "",
	})

	const t = useTranslations("Footer.subscribe.sheet")

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value)
	}

	const handleSubmit = async () => {
		setLoading(true)

		if (email.trim() === "" || !email) {
			setMessage({
				type: "error",
				message: "Email is required",
			})
			setLoading(false)
			return
		}

		const res = await createSubscriber(email.trim().toLowerCase())

		if (res.ok) {
			setMessage({
				type: "success",
				message: res.message,
			})
			setEmail("")
			setLoading(false)
		}

		if (!res.ok) {
			setMessage({
				type: "error",
				message: res.message,
			})
			setLoading(false)
		}
	}

	return (
		<div className="mx-auto flex max-w-2xl flex-col gap-3">
			<div className="mt-8 flex w-full items-center justify-center">
				<Input
					id="email"
					type="email"
					value={email}
					onChange={handleEmailChange}
					placeholder={t("input-placeholder")}
					className="h-fit w-full rounded-r-none border-r-0 border-input py-3 text-base font-medium text-black focus:outline-none focus:ring-0 focus-visible:ring-0"
				/>
				<Button
					disabled={loading}
					onClick={handleSubmit}
					className="h-fit rounded-l-none border border-l-0 border-input bg-[#e1713f] py-3 text-base font-medium hover:bg-[#e1713f] hover:brightness-90"
				>
					{loading ? "Loading..." : t("button")}
				</Button>
			</div>

			{message && (
				<p
					className={cn("text-sm", {
						"text-red-500": message.type === "error",
						"text-green": message.type === "success",
					})}
				>
					{message.message}
				</p>
			)}
		</div>
	)
}
