export const useChromeStorage = () => {
	const get = <T>(key: string): Promise<T> => {
		return new Promise<T>((resolve) => {
			chrome.storage.local.get([key], (result) => {
				console.log(result)
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

	return {
		get,
		set,
	}
}
