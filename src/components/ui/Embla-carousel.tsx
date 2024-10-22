import { useCallback } from "react"

import useEmblaCarousel from "embla-carousel-react"
import { Button } from "./button"

import type { EmblaOptionsType } from "embla-carousel"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"

type PropType = {
	children: React.ReactNode
	className?: string
	buttons?: boolean
	options?: EmblaOptionsType
	buttonsPosition?: "inside"
}

const EmblaCarousel: React.FC<PropType> = (props) => {
	const { options, children, className } = props
	const [emblaRef, emblaApi] = useEmblaCarousel({ ...options })

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev()
	}, [emblaApi])

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext()
	}, [emblaApi])

	return (
		<section className="embla w-full">
			<div className="embla__viewport" ref={emblaRef}>
				<div className={`embla__container ${className}`}>{children}</div>
			</div>

			{props.buttons && (
				<>
					<Button
						className={cn(
							"absolute left-0 top-[55%] h-10 w-10 rounded-full p-1.5 md:h-12 md:w-12",
							{
								"left-1 md:left-5": props.buttonsPosition === "inside",
							}
						)}
						variant={"outline"}
						onClick={scrollPrev}
					>
						<ChevronLeftIcon className="h-full w-full" />
					</Button>
					<Button
						className={cn(
							"absolute right-0 top-[55%] h-10 w-10 rounded-full p-1.5 md:h-12 md:w-12",
							{
								"right-1 md:right-5": props.buttonsPosition === "inside",
							}
						)}
						variant={"outline"}
						onClick={scrollNext}
					>
						<ChevronRightIcon className="h-full w-full" />
					</Button>
				</>
			)}
		</section>
	)
}

export default EmblaCarousel
