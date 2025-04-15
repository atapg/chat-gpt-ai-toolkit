export const useHelpers = () => {
	const generateUUID = (): string => self.crypto.randomUUID()

	const generateRandomColor = (): string =>
		'#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')

	return {
		generateUUID,
		generateRandomColor,
	}
}
