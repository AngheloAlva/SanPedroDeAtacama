import ImageLoader from "./ImageLoader"

interface Props {
	image: string
	title: string
	imageAlt: string
	description: string
}

export default function Hero({ image, title, imageAlt, description }: Props): React.ReactElement {
	return (
		<section className="relative h-[98vh] w-full overflow-hidden">
			<div className="absolute inset-0 bg-black opacity-20"></div>
			<ImageLoader
				src={image}
				width={2304}
				height={1296}
				alt={imageAlt}
				loading={"eager"}
				className={"h-full w-full select-none object-cover"}
			/>

			<div className="absolute top-1/2 z-10 flex w-full -translate-y-1/2 transform flex-col items-center gap-8 px-5 sm:px-7 md:px-12">
				<h1 className="changingText max-w-sm text-center text-4xl font-extrabold text-white drop-shadow sm:max-w-2xl md:text-5xl lg:text-6xl">
					{title}
				</h1>
				<p className="max-w-xl text-balance text-center text-lg font-bold text-white drop-shadow">
					{description}
				</p>
			</div>
		</section>
	)
}
