"use client"

import { useEffect, useState } from "react"
import { Link } from "@/i18n/routing"

import { PiShoppingCart } from "react-icons/pi"
import LanguagePicker from "./LanguagePicker"
import Logo from "@/components/icons/Logo"
import TopSheetMenu from "./TopSheetMenu"
import Menu from "./Menu"

import "../../../styles/rainbowBar.css"

export default function Navbar(): React.ReactElement {
	const [lastScrollY, setLastScrollY] = useState(0)
	const [navUp, setNavUp] = useState(false)
	const delta = 10

	useEffect(() => {
		const handleScroll = () => {
			const sy = window.scrollY

			if (Math.abs(lastScrollY - sy) > delta) {
				if (sy < 60) {
					setNavUp(false)
				} else if (sy > lastScrollY && sy > (document.querySelector("nav")?.clientHeight || 20)) {
					setNavUp(false)
				} else if (sy < lastScrollY) {
					setNavUp(true)
				}

				setLastScrollY(sy)
			}
		}

		window.addEventListener("scroll", handleScroll)

		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [lastScrollY])

	return (
		<nav className="relative h-[7.8rem]">
			<div className="nav-rainbow relative z-50 flex h-8 w-full transition"></div>

			<div
				className={`nav-bar z-40 flex w-full items-center justify-between gap-2 bg-white px-5 text-black shadow transition-colors sm:px-7 xl:px-20 ${
					navUp ? "fixed top-0" : "absolute top-8"
				}`}
			>
				<div className="w-[4.25rem] lg:hidden">
					<LanguagePicker className="focus:outline-none lg:hidden" />
				</div>

				<div className="flex">
					<Link
						href="/"
						className="group flex w-fit items-end justify-center gap-1 focus:outline-none"
						title="Inicio"
						aria-label="Inicio"
					>
						<Logo className="h-[5.9rem] w-auto hover:text-[#e1713f]" />
					</Link>
				</div>

				<div className="flex items-center justify-center">
					<Menu />

					<div className="flex items-center justify-end gap-4 md:gap-5 md:py-8">
						<Link href={"/cart"}>
							<PiShoppingCart className="h-6 w-6 text-primary" />
						</Link>

						<LanguagePicker className="hidden focus:outline-none lg:block" />

						<TopSheetMenu />
					</div>
				</div>
			</div>
		</nav>
	)
}
