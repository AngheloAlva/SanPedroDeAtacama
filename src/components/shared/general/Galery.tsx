"use client"

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen"
import Lightbox, { type SlideImage } from "yet-another-react-lightbox"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import { useState } from "react"
import Image from "next/image"

import {
	ZoomInIcon,
	Cross2Icon,
	ZoomOutIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ExitFullScreenIcon,
	EnterFullScreenIcon,
} from "@radix-ui/react-icons"

import "yet-another-react-lightbox/styles.css"

interface Props {
	excursionTitle: string
	slides: SlideImage[]
}

export default function Galery({ excursionTitle, slides }: Props): React.ReactElement {
	const [index, setIndex] = useState(-1)

	return (
		<section>
			<div className="relative grid h-72 w-[45rem] grid-cols-4 grid-rows-2 gap-x-2 gap-y-2 pl-4 sm:h-80 sm:w-[50rem] md:h-96 md:w-full md:px-4">
				<button
					onClick={() => setIndex(3)}
					className="absolute bottom-2 left-6 z-10 cursor-pointer rounded-lg border border-input px-5 py-1 font-bold text-white shadow-md backdrop-blur-md transition-all hover:scale-[1.02] hover:brightness-90 md:px-8 md:text-lg"
				>
					{slides.length > 4 ? slides.length - 4 : 0}+{" "}
				</button>

				<Image
					width={1000}
					height={700}
					src={slides[0].src}
					alt={excursionTitle}
					onClick={() => setIndex(0)}
					className="col-span-2 row-span-2 h-full w-full cursor-pointer rounded-lg object-cover transition-all hover:scale-[1.02]"
				/>
				<Image
					width={600}
					height={400}
					src={slides[1].src}
					alt={excursionTitle}
					onClick={() => setIndex(1)}
					className="row-span-1 h-full w-full cursor-pointer rounded-lg object-cover transition-all hover:scale-[1.02]"
				/>
				<Image
					width={600}
					height={400}
					src={slides[2].src}
					alt={excursionTitle}
					onClick={() => setIndex(2)}
					className="row-span-2 h-full w-full cursor-pointer rounded-lg object-cover transition-all hover:scale-[1.02]"
				/>
				<Image
					width={600}
					height={700}
					src={slides[3].src}
					alt={excursionTitle}
					onClick={() => setIndex(3)}
					className="row-span-1 h-full w-full cursor-pointer rounded-lg object-cover transition-all hover:scale-[1.02]"
				/>
			</div>

			<Lightbox
				index={index}
				slides={slides}
				open={index >= 0}
				close={() => setIndex(-1)}
				render={{
					slide: ({ slide }) => {
						if (slide.type !== "image") {
							return (
								<video
									muted
									controls
									src={slide.src}
									controlsList="nodownload"
									className="max-h-[80%] w-auto rounded-lg"
								/>
							)
						} else {
							return (
								<Image
									width={1920}
									height={1080}
									loading="eager"
									src={slide.src}
									alt={excursionTitle}
									className="max-h-[80%] w-auto rounded-lg"
								/>
							)
						}
					},
					iconClose: () => <Cross2Icon className="h-7 w-auto lg:h-9" />,
					iconZoomIn: () => <ZoomInIcon className="h-7 w-auto lg:h-9" />,
					iconZoomOut: () => <ZoomOutIcon className="h-7 w-auto lg:h-9" />,
					iconPrev: () => <ChevronLeftIcon className="h-7 w-auto lg:h-9" />,
					iconNext: () => <ChevronRightIcon className="h-7 w-auto lg:h-9" />,
					iconExitFullscreen: () => <ExitFullScreenIcon className="h-7 w-auto lg:h-9" />,
					iconEnterFullscreen: () => <EnterFullScreenIcon className="h-7 w-auto lg:h-9" />,
				}}
				plugins={[Zoom, Fullscreen]}
				controller={{ closeOnBackdropClick: true }}
				styles={{ container: { backgroundColor: "rgba(0, 0, 0, .8)" } }}
			/>
		</section>
	)
}
