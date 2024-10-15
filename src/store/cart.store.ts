import { persist } from "zustand/middleware"
import { create } from "zustand"

import type { ItemCart } from "@/types/cart"

interface CartStore {
	cart: ItemCart[]
	clearCart: () => void
	addToCart: (item: ItemCart) => void
	removeFromCart: (id: string) => void
}

export const useCartStore = create<CartStore>()(
	persist(
		(set, get) => ({
			cart: [],

			addToCart: (item) => {
				const { cart } = get()

				const isExist = cart.find((cartItem) => cartItem.id === item.id)

				if (isExist) {
					return
				}

				set({ cart: [...cart, item] })
			},

			removeFromCart: (id) => {
				const { cart } = get()

				set({ cart: cart.filter((cartItem) => cartItem.id !== id) })
			},

			clearCart: () => {
				set({ cart: [] })
			},
		}),
		{
			name: "cart-storage",
		}
	)
)
