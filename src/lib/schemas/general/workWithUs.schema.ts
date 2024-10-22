import { z } from "zod"

export const workWithUsSchema = z.object({
	name: z.string().min(2).max(255),
	email: z.string().email(),
	phone: z.string().min(9).max(10),
	position: z.string().min(2).max(255),
	address: z.string().min(2).max(255),
	availability: z.boolean(),
	experience: z.string().min(2).max(255),
	languages: z.string().min(2).max(255),
	certifications: z.string().min(2).max(255),
	finalQuestion: z.string().min(2).max(255).optional(),
})
