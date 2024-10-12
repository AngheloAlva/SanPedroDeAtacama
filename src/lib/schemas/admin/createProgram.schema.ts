import { z } from "zod"

export const createProgramSchema = z.object({
	slug: z.string().min(1).max(100),
	price: z.string().min(1),
})
