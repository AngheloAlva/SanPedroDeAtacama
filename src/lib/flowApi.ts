/* eslint-disable @typescript-eslint/no-explicit-any */

import crypto from "crypto"

interface FlowConfig {
	apiKey: string
	secretKey: string
	apiURL: string
	baseURL: string
}

export class FlowApi {
	private config: FlowConfig

	constructor(config: FlowConfig) {
		this.config = config
	}

	private async sign(params: Record<string, any>): Promise<string> {
		const sorted = Object.keys(params)
			.sort()
			.reduce(
				(acc, key) => {
					acc[key] = params[key]
					return acc
				},
				{} as Record<string, any>
			)

		const concatenated = Object.entries(sorted)
			.map(([key, value]) => `${key}${value}`)
			.join("")

		const hmac = crypto.createHmac("sha256", this.config.secretKey)
		hmac.update(concatenated)
		return hmac.digest("hex")
	}

	async send(
		serviceName: string,
		params: Record<string, any>,
		method: "GET" | "POST"
	): Promise<any> {
		params.apiKey = this.config.apiKey
		const sign = await this.sign(params)

		const url = new URL(`${this.config.apiURL}/${serviceName}`)

		if (method === "GET") {
			Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]))
		}

		const options: RequestInit = {
			method,
			headers: {
				"Content-Type": "application/json",
			},
		}

		if (method === "POST") {
			options.body = JSON.stringify(params)
		}

		options.headers = {
			...options.headers,
			"X-FLOW-SIGN": sign,
		}

		const response = await fetch(url.toString(), options)
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}
		return response.json()
	}
}
