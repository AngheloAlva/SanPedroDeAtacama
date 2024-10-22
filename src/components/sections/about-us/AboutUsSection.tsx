"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import Image from "next/image"

import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

import ImageLoader from "@/components/shared/general/ImageLoader"

export default function AboutUsSection(): React.ReactElement {
	const t = useTranslations("AboutUs.our-history")

	gsap.registerPlugin(ScrollTrigger)

	useGSAP(() => {
		gsap.to(".circle", {
			translateY: -200,
			ease: "none",
			scrollTrigger: {
				trigger: "body",
				start: "top top",
				end: "+=50%",
				scrub: true,
			},
		})

		gsap.to(".square", {
			translateX: -250,
			ease: "none",
			scrollTrigger: {
				trigger: "body",
				start: "top top",
				end: "+=50%",
				scrub: true,
			},
		})

		gsap.to(".triangle", {
			translateY: 400,
			ease: "none",
			scrollTrigger: {
				trigger: "body",
				start: "top top",
				end: "+=50%",
				scrub: true,
			},
		})

		gsap.to(".hexagon", {
			translateX: 300,
			ease: "none",
			scrollTrigger: {
				trigger: "body",
				start: "top top",
				end: "+=50%",
				scrub: true,
			},
		})

		gsap.from(".image1", {
			x: -100,
			ease: "none",
			scrollTrigger: {
				trigger: ".image1",
				start: "top bottom",
				end: "+=30%",
				scrub: true,
			},
		})

		gsap.from(".image2", {
			x: 100,
			ease: "none",
			scrollTrigger: {
				trigger: ".image2",
				start: "top bottom",
				end: "+=30%",
				scrub: true,
			},
		})
	})

	return (
		<>
			<section className="mt-24 overflow-x-hidden">
				<div className="relative mx-auto max-w-screen-lg">
					<Image
						src={"/about-us/figure-1.svg"}
						width={300}
						height={300}
						alt="Figure 1"
						className="circle absolute left-0 top-1/4 h-auto w-[22%] opacity-40"
					/>
					<Image
						src={"/about-us/figure-2.svg"}
						width={300}
						height={300}
						alt="Figure 2"
						className="square absolute left-1/4 top-1/3 h-auto w-[22%] opacity-40"
					/>
					<Image
						src={"/about-us/figure-3.svg"}
						width={300}
						height={300}
						alt="Figure 3"
						className="triangle absolute right-1/4 top-1/3 z-10 h-auto w-[22%] opacity-40"
					/>
					<Image
						src={"/about-us/figure-4.svg"}
						width={300}
						height={300}
						alt="Figure 4"
						className="hexagon absolute right-0 top-1/4 h-auto w-[22%] opacity-40"
					/>

					<ImageLoader
						width={2304}
						height={1296}
						alt="Our History"
						src={"/v1725560535/hero_a9yplh.png"}
					/>
				</div>

				<div className="mx-auto mt-20 flex max-w-screen-xl flex-col px-4 sm:px-8 md:mt-28 lg:flex-row lg:gap-10 xl:gap-14">
					<div className="flex items-center gap-2 lg:flex-row-reverse lg:items-start">
						<h1 className="text-nowrap text-4xl font-extrabold lg:text-wrap lg:text-5xl">
							{t("hero.title")}
						</h1>
						<div className="mt-2 h-0.5 w-full bg-black/50 lg:mt-12 lg:min-w-16 xl:min-w-24"></div>
					</div>

					<div className="z-20">
						<p className="mt-3 font-medium">{t("hero.description1")}</p>

						<p className="mt-3 font-medium">{t("hero.description2")}</p>
					</div>
				</div>
			</section>

			<section className="relative my-2 overflow-hidden py-8 md:my-14 md:py-16 xl:my-20">
				<div className="absolute left-1/2 top-1/2 -z-10 min-h-[80%] w-[150vw] -translate-x-1/2 -translate-y-1/2 -rotate-6 transform bg-neutral-50 md:min-h-full"></div>

				<div className="mx-auto flex max-w-screen-xl flex-col gap-4 px-4 sm:px-8 xl:flex-row">
					<ImageLoader
						width={2304}
						height={1296}
						alt="Our Team"
						src={"/v1725564849/nuestra-historia-1_venmok.png"}
						className="image1 mx-auto h-fit w-full shadow-sm lg:max-w-[50%]"
					/>

					<div className="mx-auto mt-2 max-w-prose md:mt-4 xl:mt-0">
						<h2 className="text-pretty text-xl font-bold md:text-2xl">{t("section1.title1")}</h2>

						<p className="mt-2 font-medium">{t("section1.description1")}</p>

						<h2 className="mt-6 text-pretty text-xl font-bold md:text-2xl">
							{t("section1.title2")}
						</h2>

						<p className="mt-2 font-medium">{t("section1.description2")}</p>
					</div>
				</div>
			</section>

			<section className="relative my-2 flex flex-col items-center justify-center overflow-hidden py-8 md:my-14 md:py-16 xl:my-20">
				<div className="absolute left-1/2 top-1/2 -z-10 min-h-[90%] w-[150vw] -translate-x-1/2 -translate-y-1/2 rotate-6 transform bg-neutral-50 md:min-h-full"></div>

				<div className="mx-auto flex max-w-screen-xl flex-col gap-4 px-4 sm:px-8 xl:flex-row-reverse">
					<ImageLoader
						width={2304}
						height={1296}
						alt="Our Team"
						src={"/v1725564851/nuestra-historia-2_yrsr8s.jpg"}
						className="image2 mx-auto h-fit w-full shadow-sm lg:max-w-[50%]"
					/>

					<div className="mx-auto mt-2 flex max-w-prose flex-col md:mt-4 xl:mt-0">
						<h2 className="text-pretty text-xl font-bold md:text-2xl">{t("section2.title")}</h2>

						<p className="mt-2 font-medium">{t("section2.description1")}</p>

						<p className="mt-2 font-medium">{t("section2.description2")}</p>
					</div>
				</div>

				<Link
					href={"/contact"}
					className="mx-auto mt-14 w-fit rounded-full bg-[#60b5a5] px-6 py-3 text-lg tracking-wider text-white transition-all duration-300 hover:scale-105 hover:brightness-90 xl:px-10"
				>
					{t("section2.cta")}
				</Link>
			</section>
		</>
	)
}
