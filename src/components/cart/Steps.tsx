import { cn } from "@/lib/utils"

import { PiCreditCard, PiListDashes, PiUsersThree } from "react-icons/pi"

export default function Steps({ step }: { step: 1 | 2 | 3 }): React.ReactElement {
	return (
		<ol className="flex w-full items-center justify-center">
			<li
				className={cn("mr-1 flex w-fit items-center justify-center", {
					"text-turquoise": step >= 1,
				})}
			>
				<div
					className={cn(
						"flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 p-2.5 sm:h-12 sm:w-12 sm:p-3 lg:h-14 lg:w-14 lg:p-4",
						{
							"bg-turquoise/10": step >= 1,
						}
					)}
				>
					<PiListDashes className="h-auto w-full" />
				</div>
			</li>

			<div
				className={cn("h-1 w-full bg-gray-100 lg:h-1.5", { "bg-turquoise/10": step >= 2 })}
			></div>

			<li
				className={cn("mx-1 flex w-fit items-center justify-center", {
					"text-turquoise": step >= 2,
				})}
			>
				<div
					className={cn(
						"flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 p-2.5 sm:h-12 sm:w-12 sm:p-3 lg:h-14 lg:w-14 lg:p-4",
						{
							"bg-turquoise/10": step >= 2,
						}
					)}
				>
					<PiUsersThree className="h-auto w-full" />
				</div>
			</li>

			<div
				className={cn("h-1 w-full bg-gray-100 lg:h-1.5", { "bg-turquoise/10": step >= 3 })}
			></div>

			<li
				className={cn("ml-1 flex w-fit items-center justify-center", {
					"text-turquoise": step >= 3,
				})}
			>
				<div
					className={cn(
						"flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 p-2.5 sm:h-12 sm:w-12 sm:p-3 lg:h-14 lg:w-14 lg:p-4",
						{
							"bg-turquoise/10": step >= 3,
						}
					)}
				>
					<PiCreditCard className="h-auto w-full" />
				</div>
			</li>
		</ol>
	)
}
