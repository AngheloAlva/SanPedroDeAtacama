"use server"

import { eq } from "drizzle-orm"
import { db } from "@/db"
import { z } from "zod"

import { checkoutSchema } from "../../lib/schemas/general/checkout.schema"
import { booking_item } from "@/db/schema/booking-item"
import { excursion } from "@/db/schema/excursion"
import { attendde } from "@/db/schema/attendde"
import { booking } from "@/db/schema/booking"
import { program } from "@/db/schema/program"
import { payment } from "@/db/schema/payment"

import type { ItemCart } from "@/types/cart"

interface CreateBookingProps {
	cart: ItemCart[]
	bookingData: z.infer<typeof checkoutSchema>
}

export const createBooking = async ({
	cart,
	bookingData: { bookingInfo, bookingItem },
}: CreateBookingProps) => {
	try {
		const validatedData = checkoutSchema.parse({ bookingInfo, bookingItem })

		if (cart.length === 0) {
			throw new Error("Cart is empty")
		}

		const cartType = cart[0].modality
		if (!cart.every((item) => item.modality === cartType)) {
			throw new Error("Mixed cart types are not allowed")
		}

		return await db.transaction(async (trx) => {
			const [newBooking] = await trx
				.insert(booking)
				.values({
					total_price: 0,
					status: "pending",
					email: validatedData.bookingInfo.email,
					phone: validatedData.bookingInfo.phone,
				})
				.returning()

			const bookingId = newBooking.id
			let totalPrice = 0

			for (const item of cart) {
				let currentPrice: number
				if (item.modality === "excursion") {
					const [excursionData] = await trx
						.select({ price: excursion.price })
						.from(excursion)
						.where(eq(excursion.id, item.id))

					if (!excursionData) throw new Error(`Excursion not found: ${item.id}`)

					currentPrice = excursionData.price
				} else {
					const [programData] = await trx
						.select({ price: program.price })
						.from(program)
						.where(eq(program.id, item.id))

					if (!programData) throw new Error(`Program not found: ${item.id}`)

					currentPrice = programData.price
				}

				if (currentPrice !== item.price) {
					throw new Error(`Price mismatch for item: ${item.id}`)
				}

				const bookingItemData = validatedData.bookingItem.find((bi) => bi.id === item.id)

				if (!bookingItemData) {
					throw new Error(`Booking item data not found for: ${item.name}`)
				}

				const [newBookingItem] = await trx
					.insert(booking_item)
					.values({
						booking_id: bookingId,
						[item.modality === "excursion" ? "excursion_id" : "program_id"]: item.id,
						price: currentPrice,
						date:
							item.date instanceof Date
								? item.date.toISOString()
								: new Date(item.date).toISOString(),
						comment: bookingItemData.comment || "",
						people_count: bookingItemData.attendees.length,
						accommodation: bookingItemData.accommodation || "",
					})
					.returning()

				for (const attendeeData of bookingItemData.attendees) {
					await trx.insert(attendde).values({
						name: attendeeData.name,
						country: attendeeData.country,
						age: attendeeData.age.toString(),
						last_name: attendeeData.lastName,
						booking_item_id: newBookingItem.id,
						document_number: attendeeData.documentNumber,
						food_preference: attendeeData.foodPreference || "",
					})
				}

				totalPrice += currentPrice * bookingItemData.attendees.length
			}

			await trx.update(booking).set({ total_price: totalPrice }).where(eq(booking.id, bookingId))

			await trx.insert(payment).values({
				booking_id: bookingId,
				payment_status: "pending",
				amount: totalPrice,
				currency: "CLP",
			})

			return {
				ok: true,
				bookingId,
				totalPrice,
			}
		})
	} catch (error) {
		console.error("Error creating booking:", error)

		if (error instanceof z.ZodError) {
			return {
				ok: false,
				error: "Invalid input data",
				details: error.errors,
			}
		}

		if (error instanceof Error) {
			return {
				ok: false,
				error: error.message,
			}
		}

		return {
			ok: false,
			error: "An unexpected error occurred",
		}
	}
}
