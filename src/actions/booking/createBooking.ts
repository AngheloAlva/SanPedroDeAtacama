"use server"

import { eq } from "drizzle-orm"
import { db } from "@/db"
import { z } from "zod"

import { checkoutSchema } from "../../lib/schemas/general/checkout.schema"
import { getAllCurrenciesValues } from "../currency/getCurrency"
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

export const createBooking = async ({ cart, bookingData }: CreateBookingProps) => {
	try {
		const validatedData = checkoutSchema.parse(bookingData)

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
					total_price_clp: 0,
					status: "pending",
					email: validatedData.attendees[0].email || "",
				})
				.returning()

			const bookingId = newBooking.id
			let totalPrice = 0

			for (const item of cart) {
				let currentPrice: number
				if (item.date === undefined) {
					throw new Error("Date is required")
				}

				if (item.price === undefined) {
					throw new Error("Price is required")
				}

				if (new Date(item.date) < new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000)) {
					throw new Error("Date is invalid")
				}

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

				const [newBookingItem] = await trx
					.insert(booking_item)
					.values({
						booking_id: bookingId,
						[item.modality === "excursion" ? "excursion_id" : "program_id"]: item.id,
						price: currentPrice,
						excursion_name: item.name,
						date:
							item.date instanceof Date
								? item.date.toISOString()
								: new Date(item.date).toISOString(),
						comment: validatedData.comment || "",
						people_count: validatedData.attendees.length,
						accommodation: validatedData.accommodation,
					})
					.returning()

				for (const attendeeData of validatedData.attendees) {
					await trx.insert(attendde).values({
						country: attendeeData.country,
						age: attendeeData.age.toString(),
						full_name: attendeeData.fullName,
						booking_item_id: newBookingItem.id,
						document_number: attendeeData.documentNumber,
						food_preference: attendeeData.foodPreference,
					})
				}

				totalPrice += currentPrice * validatedData.attendees.length
			}

			const currencyValues = await getAllCurrenciesValues()

			if (!currencyValues || !("CLP" in currencyValues)) {
				throw new Error("Error getting currency values or CLP not found")
			}

			const usdPrice = parseFloat((totalPrice / currencyValues.CLP).toFixed(2))
			const brlPrice = parseFloat((usdPrice * currencyValues.BRL).toFixed(2))

			await trx
				.update(booking)
				.set({
					total_price_clp: totalPrice,
					total_price_usd: usdPrice,
					total_price_brl: brlPrice,
				})
				.where(eq(booking.id, bookingId))

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
