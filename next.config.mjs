import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "res.cloudinary.com",
				protocol: "https",
			},
		],
	},
}

export default withNextIntl(nextConfig)
