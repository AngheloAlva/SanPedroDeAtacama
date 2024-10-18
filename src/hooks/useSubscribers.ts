"use client"

import { getSubscribers } from "@/actions/subscriber/getSubscribers"
import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "@/i18n/routing"

import type { subscriber } from "@/db/schema/subscriber"

interface UseZoneResponse {
	subscribers: (typeof subscriber.$inferSelect)[]
	totalPages: number
	totalCount: number
	isLoading: boolean
	page: number
	increasePage: () => void
	decreasePage: () => void
	changePage: (newPage: number) => void
}

export const useSubscribers = (pathName: string): UseZoneResponse => {
	const searchParams = useSearchParams()
	const searchPage = searchParams.get("page") ? parseInt(searchParams.get("page") as string) : 1
	const searchPageSize = searchParams.get("pageSize")
		? parseInt(searchParams.get("pageSize") as string)
		: 10

	const [isLoading, setIsLoading] = useState<boolean>(true)

	const [page, setPage] = useState<number>(searchPage)

	const [subscribers, setSubscribers] = useState<(typeof subscriber.$inferSelect)[]>([])
	const [totalPages, setTotalPages] = useState<number>(0)
	const [totalCount, setTotalCount] = useState<number>(0)

	const router = useRouter()

	useEffect(() => {
		const fetchSubscribers = async () => {
			try {
				const {
					totalCount,
					totalPages,
					subscribers: dbSubscribers,
				} = await getSubscribers(page, searchPageSize)

				setSubscribers(dbSubscribers)
				setTotalPages(totalPages)
				setTotalCount(totalCount)
			} catch (error) {
				console.error(error)
			} finally {
				setIsLoading(false)
			}
		}

		void fetchSubscribers()
	}, [page, searchPageSize])

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString())
			params.set(name, value)

			return params.toString()
		},
		[searchParams]
	)

	const increasePage = () => {
		setPage((prev) => prev + 1)
		router.push(pathName + "?" + createQueryString("page", (page + 1).toString()))
	}

	const decreasePage = () => {
		setPage((prev) => prev - 1)
		router.push(pathName + "?" + createQueryString("page", (page - 1).toString()))
	}

	const changePage = (newPage: number) => {
		setPage(newPage)
		router.push(pathName + "?" + createQueryString("page", newPage.toString()))
	}

	return {
		page,
		isLoading,
		totalPages,
		totalCount,
		changePage,
		subscribers,
		increasePage,
		decreasePage,
	}
}
