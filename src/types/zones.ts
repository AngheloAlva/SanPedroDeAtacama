import type { zone_translation } from "../db/schema/zone-translation"
import type { zone } from "@/db/schema/zone"

export interface ZoneWithTranslations {
	zone: typeof zone.$inferSelect | null
	zone_translation: typeof zone_translation.$inferSelect | null
}
