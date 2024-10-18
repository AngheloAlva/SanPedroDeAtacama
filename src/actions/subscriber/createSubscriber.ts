"use server"

import { db } from "@/db"

import { subscriber } from "@/db/schema/subscriber"
import { eq } from "drizzle-orm"
import { z } from "zod"

export const createSubscriber = async (email: string) => {
	try {
		const emailSchema = z.string().email()
		emailSchema.parse(email)

		const [subscriberExists] = await db.select().from(subscriber).where(eq(subscriber.email, email))

		if (subscriberExists) {
			return {
				ok: false,
				message: "Subscriber already exists",
			}
		}

		await db.insert(subscriber).values({ email })

		return {
			ok: true,
			message: "Subscriber created successfully",
		}
	} catch (error) {
		console.log(error)

		return {
			ok: false,
			message: "Failed to create subscriber",
		}
	}
}
