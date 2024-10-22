interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
	src: string
	alt: string
	width: number
	height: number
	className?: string
	loading?: "eager" | "lazy"
}

export default function ImageLoader({
	alt,
	src,
	width,
	height,
	className,
	loading = "lazy",
	...props
}: Props): React.ReactElement {
	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			src={`https://res.cloudinary.com/dytz8ntnf/image/upload/w_${width}/h_${height}/q_auto/${src}`}
			alt={alt}
			width={width}
			height={height}
			loading={loading}
			className={className}
			{...props}
		/>
	)
}
