import { z } from "zod"

export const checkoutSchema = z.object({
	bookingItem: z.array(
		z.object({
			id: z.string().optional(),
			accommodation: z.string().min(2),
			comment: z.string().optional(),
			attendees: z.array(
				z.object({
					name: z.string().min(2),
					lastName: z.string().min(2),
					country: z.string().min(2),
					documentNumber: z.string().min(2),
					age: z.string().or(z.number()),
					foodPreference: z.string().optional(),
				})
			),
		})
	),
	bookingInfo: z.object({
		email: z.string().email(),
		phone: z.string().min(9),
	}),
	useSameInfo: z.boolean().optional(),
})
