export const useChromeStorage = () => {
	const get = <T>(key: string): Promise<T> => {
		return new Promise<T>((resolve) => {
			chrome.storage.local.get([key], (result) => {
				resolve(result[key])
			})
		})
	}

	const set = <T>(key: string, value: T): Promise<void> => {
		return new Promise<void>((resolve) => {
			chrome.storage.local.set({ [key]: value }, () => {
				resolve()
			})
		})
	}

	const getOrSet = async <T>(key: string, defaultValue: T): Promise<T> => {
		const value = await get<T>(key)

		if (value === undefined) {
			await set(key, defaultValue)
			return defaultValue
		}

		return value
	}

	return {
		get,
		set,
		getOrSet,
	}
}
