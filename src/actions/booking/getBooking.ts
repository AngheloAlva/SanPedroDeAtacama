"use server"

import { eq } from "drizzle-orm"
import { db } from "@/db"

import { booking_item } from "@/db/schema/booking-item"
import { booking } from "@/db/schema/booking"

export const getBookingById = async (id: string) => {
	try {
		const [dbBookinng] = await db.select().from(booking).where(eq(booking.id, id))

		const bookingItems = await db.select().from(booking_item).where(eq(booking_item.booking_id, id))

		return {
			booking: dbBookinng,
			bookingItems,
		}
	} catch (error) {
		console.error(error)
		return null
	}
}
