import { z } from "zod"

export const updateProgramSchema = z.object({
	// Program
	slug: z.string().min(5),
	// images: z.string(),
	price: z.string().min(0),
	status: z.string(),

	// Program Translation
	title: z.object({
		part1: z.string(),
		part2: z.string(),
		part3: z.string(),
	}),
	description: z.string().min(20),
	itinerary: z.array(
		z.object({
			name: z.string(),
			title: z.string(),
			activities: z.array(
				z.object({
					time: z.string(),
					excursion: z.object({
						name: z.string(),
						slug: z.string(),
					}),
					description: z.string(),
				})
			),
		})
	),
	cancelation: z.string(),
	guide: z.string(),
	includes: z.string(),
	duration: z.string(),
	whatIncludes: z.array(z.object({ item: z.string() })),
	whatNotIncludes: z.array(z.object({ item: z.string() })),
	whatYouShouldBring: z.array(z.object({ title: z.string(), description: z.string() })),
})
