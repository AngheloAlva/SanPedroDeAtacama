import {
	Accordion,
	AccordionItem,
	AccordionContent,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { useTranslations } from "next-intl"

export default function FaqAccordion(): React.ReactElement {
	const t = useTranslations("FaqPage.questions")

	const faqsKeys = Array.from({ length: 10 }, (_, i) => i.toString())

	return (
		<section className="px-5 pt-2 sm:pt-4">
			<Accordion type="single" collapsible className="mx-auto w-full max-w-screen-md">
				{faqsKeys.map((key) => (
					<AccordionItem value={t(`${key}.value`)} key={t(`${key}.value`)}>
						<AccordionTrigger className="text-left text-base font-semibold sm:text-lg">
							{t(`${key}.question`)}
						</AccordionTrigger>
						<AccordionContent className="sm:text-base">{t(`${key}.answer`)}</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</section>
	)
}
