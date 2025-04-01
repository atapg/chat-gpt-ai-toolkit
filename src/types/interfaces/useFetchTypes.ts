export interface IUseFetchResponse<T> {
	data: T | null
	isLoading: boolean
	error: string | null
	func: (
		newParams?: string,
		newOptions?: IUseFetchRequestInit
	) => Promise<T | null>
}

export interface IUseFetchRequestInit extends RequestInit {
	params?: string
}

export interface IUseFetchFunc {
	newParams?: string
	newOptions?: IUseFetchRequestInit
}

export interface IUseFetch {
	url: string
	options?: IUseFetchRequestInit
	defaultParams?: string
}
