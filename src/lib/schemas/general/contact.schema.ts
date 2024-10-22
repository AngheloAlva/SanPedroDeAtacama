import { z } from "zod"

export const contactSchema = z.object({
	name: z.string().min(2).max(255),
	email: z.string().email(),
	message: z.string().min(10).max(400),
	phone: z.string().min(10).max(15),
})
