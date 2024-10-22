import ImageLoader from "@/components/shared/general/ImageLoader"
import { Link } from "@/i18n/routing"

interface Props {
	id: string
	title: string
	image: string
	button?: string
	imageAlt: string
	description: string
}

export default function AboutDestinyCard({
	id,
	title,
	image,
	button,
	imageAlt,
	description,
}: Props): React.ReactElement {
	return (
		<Link
			className="embla__slide group relative my-8 flex h-full max-h-[30rem] max-w-80 flex-col overflow-hidden rounded-lg shadow transition-all duration-300 hover:scale-[1.03] lg:max-w-96"
			href={`/about-destiny/${id}`}
		>
			<ImageLoader
				src={image}
				width={500}
				height={600}
				alt={imageAlt}
				loading="lazy"
				title={imageAlt}
				className="absolute inset-0 h-full w-full select-none object-cover"
			/>

			<div className="absolute inset-0 h-full w-full bg-black bg-opacity-25"></div>

			<div className="absolute top-1/2 flex h-full w-full -translate-y-1/2 transform flex-col items-start justify-center gap-6 px-7 text-start transition-all duration-300">
				<div className="flex select-none text-wrap text-4xl font-extrabold text-white drop-shadow 2xl:text-[2.5rem]">
					{title}
				</div>
				<div className="h-0 opacity-0 transition-all duration-300 group-hover:h-32 group-hover:opacity-100">
					<p className="line-clamp-5 text-ellipsis text-base font-medium text-white">
						{description}
					</p>
				</div>
			</div>
			<button className="absolute bottom-3 right-3 w-fit select-none rounded-lg border-[3px] border-white px-4 py-1 text-center text-sm font-bold tracking-wider text-white shadow transition-all duration-300 hover:scale-105 hover:brightness-90 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 group-hover:block group-hover:bg-white group-hover:text-black">
				{button}
			</button>
		</Link>
	)
}
