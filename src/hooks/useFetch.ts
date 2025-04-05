import { useState } from 'react'
import { IUseFetch } from '../types/interfaces/useFetchTypes'
import {
	IUseFetchRequestInit,
	IUseFetchResponse,
} from '../types/interfaces/useFetchTypes'

const useFetch = <T>({
	url,
	defaultParams,
	options,
}: IUseFetch): IUseFetchResponse<T> => {
	const [data, setData] = useState<T | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	const func = async (
		newParams?: string,
		newOptions?: IUseFetchRequestInit
	) => {
		try {
			let endpoint = url

			if (newParams) {
				endpoint += `?${newParams}`
			} else {
				if (defaultParams) {
					endpoint += `?${defaultParams}`
				}
			}

			let reqOptions: IUseFetchRequestInit = {}

			if (newOptions) {
				reqOptions = { ...newOptions }
			} else {
				if (options) {
					reqOptions = { ...options }
				}
			}

			setIsLoading(true)

			const response = await fetch(endpoint, reqOptions)

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`)
			}

			const result = await response.json()

			setData(result)

			return result
		} catch (err: any) {
			setError(err.message || 'An error occurred')
		} finally {
			setIsLoading(false)
		}
	}

	return { data, isLoading, error, func }
}

export default useFetch
