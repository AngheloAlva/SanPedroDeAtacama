import type { program_translation } from "../db/schema/program-translation"
import type { program } from "@/db/schema/program"

export interface ProgramWithTranslations {
	program: typeof program.$inferSelect | null
	program_translation: typeof program_translation.$inferSelect | null
}
