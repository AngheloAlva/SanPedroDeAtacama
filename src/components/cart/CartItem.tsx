import Image from "next/image"

import { PiTrash } from "react-icons/pi"
import { Button } from "../ui/button"

import type { ItemCart } from "@/types/cart"

interface CartItemProps extends ItemCart {
	removeFromCart?: (id: string) => void
}

export default function CartItem({
	id,
	date,
	name,
	image,
	price,
	removeFromCart,
}: CartItemProps): React.ReactElement {
	return (
		<div className="flex overflow-hidden rounded-lg border shadow-sm">
			<Image
				alt={name}
				src={image}
				width={120}
				height={120}
				className="aspect-square object-cover"
			/>

			<div className="flex w-full flex-col p-2 md:text-lg">
				<span className="font-semibold">{name}</span>
				<span className="text-sm text-muted-foreground">{new Date(date).toLocaleDateString()}</span>

				<div className="flex items-end justify-between">
					<span className="font-semibold">${price}</span>

					{removeFromCart !== undefined && (
						<Button
							className="ml-auto mt-2 h-fit w-fit px-3 py-1.5"
							variant={"destructive"}
							onClick={() => removeFromCart(id)}
						>
							<PiTrash className="h-5 w-auto" />
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}
