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
		<div className="flex overflow-hidden rounded-sm border shadow-sm">
			<Image
				alt={name}
				src={image}
				width={200}
				height={200}
				className="aspect-square h-32 w-1/4 object-cover sm:block sm:h-32 sm:w-32"
			/>

			<div className="flex w-full flex-col justify-between p-2 md:text-lg">
				<div className="">
					<p className="font-semibold">{name}</p>
					<p className="text-sm text-muted-foreground">{new Date(date).toLocaleDateString()}</p>
				</div>

				<div className="flex items-end justify-between">
					<span className="font-semibold">${price.toLocaleString("cl-CL")}</span>

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
