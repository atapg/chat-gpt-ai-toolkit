export const useHelpers = () => {
	const generateUUID = (): string => self.crypto.randomUUID()

	const generateRandomColor = (): string =>
		'#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')

	const debounce = <T extends (...args: any[]) => void>(
		callback: T,
		wait: number = 500
	): ((...args: Parameters<T>) => void) => {
		let timeoutId: number | undefined

		return (...args: Parameters<T>) => {
			if (timeoutId !== undefined) {
				clearTimeout(timeoutId)
			}
			timeoutId = window.setTimeout(() => {
				callback(...args)
			}, wait)
		}
	}

	const removeWhiteSpaceFromString = (
		s: string,
		all: boolean = false
	): string => {
		if (all) return s.replace(/\s/g, '')
		else return s.replace(/\s\s+/g, ' ')
	}

	return {
		generateUUID,
		generateRandomColor,
		debounce,
		removeWhiteSpaceFromString,
	}
}
