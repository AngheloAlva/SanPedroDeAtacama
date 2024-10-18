import { z } from "zod"

export const updateExcursionSchema = z.object({
	// Excursion
	slug: z.string().min(5),
	// images: z.string(),
	price: z.string().min(0),
	status: z.string(),
	days_of_week_not_available: z.array(z.number().refine((value) => value >= 0 && value <= 6)),

	// Excurion Translation
	name: z.string().min(5),
	description: z.string().min(20),
	cancelation: z.string(),
	guide: z.string(),
	includes: z.string(),
	duration: z.string(),
	whatWillYouDo: z.array(
		z.object({
			title: z.string(),
			description: z.string(),
		})
	),
	inDetail: z.array(
		z.object({
			title: z.string(),
			description: z.string(),
		})
	),
	whatIncludes: z.array(z.object({ item: z.string() })),
	whatYouShouldBring: z.array(z.object({ item: z.string() })),
	faq: z.array(
		z.object({
			question: z.string(),
			answer: z.string(),
		})
	),
})
