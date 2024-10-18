"use server"

import { count } from "drizzle-orm"
import { db } from "@/db"

import { subscriber } from "@/db/schema/subscriber"

export const getSubscribers = async (page: number = 1, pageSize: number = 10) => {
	try {
		const totalCount = await db.select({ count: count() }).from(subscriber)
		const totalPages = Math.ceil(totalCount[0].count / pageSize)

		const subscribers = await db
			.select()
			.from(subscriber)
			.limit(pageSize)
			.offset((page - 1) * pageSize)

		return {
			totalPages,
			subscribers,
			totalCount: totalCount[0].count,
		}
	} catch (error) {
		console.log(error)
		return {
			subscribers: [],
			totalCount: 0,
			totalPages: 0,
		}
	}
}
