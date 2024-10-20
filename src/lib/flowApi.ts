/* eslint-disable @typescript-eslint/no-explicit-any */

import crypto from "crypto"

interface FlowConfig {
	apiKey: string
	secretKey: string
	apiURL: string
}

export class FlowApi {
	private config: FlowConfig

	constructor(config: FlowConfig) {
		this.config = config
	}

	private sign(params: Record<string, any>): string {
		const sortedParams = Object.keys(params)
			.sort()
			.reduce(
				(acc, key) => {
					acc[key] = params[key]
					return acc
				},
				{} as Record<string, any>
			)

		const toSign = Object.entries(sortedParams)
			.map(([key, value]) => `${key}${value}`)
			.join("")

		return crypto.createHmac("sha256", this.config.secretKey).update(toSign).digest("hex")
	}

	private buildQueryString(params: Record<string, any>): string {
		return Object.entries(params)
			.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
			.join("&")
	}

	async send(
		serviceName: string,
		params: Record<string, any>,
		method: "GET" | "POST"
	): Promise<any> {
		params.apiKey = this.config.apiKey
		const signature = this.sign(params)
		params.s = signature

		const url = `${this.config.apiURL}/${serviceName}`
		const queryString = this.buildQueryString(params)

		try {
			let response
			if (method === "GET") {
				response = await fetch(`${url}?${queryString}`)
			} else {
				response = await fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					body: queryString,
				})
			}

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`)
			}

			return await response.json()
		} catch (error) {
			console.error("Error in FlowApi:", error)
			throw error
		}
	}
}
