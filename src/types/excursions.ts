import type { excursion_translation } from "@/db/schema/excursion-translation"
import type { excursion } from "../db/schema/excursion"

export interface ExcursionWithTranslation {
	excursion: typeof excursion.$inferSelect | null
	excursion_translation: typeof excursion_translation.$inferSelect | null
}
