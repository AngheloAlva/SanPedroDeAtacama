import { z } from "zod"

export const checkoutSchema = z.object({
	accommodation: z.string().min(2),
	comment: z.string().optional(),
	attendees: z.array(
		z.object({
			phone: z.string().min(8),
			country: z.string().min(2),
			fullName: z.string().min(2),
			age: z.string().or(z.number()),
			documentNumber: z.string().min(2),
			email: z.string().email().optional(),
			foodPreference: z.string().optional(),
		})
	),
})
