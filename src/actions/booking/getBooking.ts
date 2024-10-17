"use server"

import { count, eq } from "drizzle-orm"
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

export const getBookings = async (page: number = 1, pageSize: number = 10) => {
	try {
		const totalCount = await db.select({ count: count() }).from(booking)
		const totalPages = Math.ceil(totalCount[0].count / pageSize)

		const bookings = await db
			.select()
			.from(booking)
			.limit(pageSize)
			.offset((page - 1) * pageSize)

		return {
			bookings,
			totalPages,
			totalCount: totalCount[0].count,
		}
	} catch (error) {
		console.error(error)
		return {
			bookings: [],
			totalPages: 0,
			totalCount: 0,
		}
	}
}
