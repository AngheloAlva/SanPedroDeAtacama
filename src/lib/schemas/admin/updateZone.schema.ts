import { z } from "zod"

export const updateZoneSchema = z.object({
	// Zone
	slug: z.string().min(5),

	// Zone Translation
	name: z.string(),
	description: z.string(),
})
