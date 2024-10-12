import type { program_translation } from "../db/schema/program-translation"
import type { program } from "@/db/schema/program"

export interface ProgramWithTranslations {
	program: typeof program.$inferSelect
	program_translation: typeof program_translation.$inferSelect
}
