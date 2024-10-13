"use client"

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

export default function HeroCarousel(): React.ReactElement {
	return (
		<Carousel
			className="w-screen"
			opts={{
				loop: true,
			}}
			plugins={[
				Autoplay({
					delay: 2000,
				}),
			]}
		>
			<CarouselContent>
				{Array.from({ length: 4 }).map((_, index) => (
					<CarouselItem
						key={index}
						className="flex h-64 w-full items-center justify-center sm:h-80 md:h-[26rem] lg:h-[32rem] xl:h-[40rem]"
					>
						<Image
							alt="Carousel Image"
							width={1920}
							height={1080}
							className="h-full w-full object-cover"
							src={`/home/carousel-${index + 1}.jpg`}
						/>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	)
}
