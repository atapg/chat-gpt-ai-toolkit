export const getRequestData = async (response: Response): Promise<unknown> =>
	await response.clone().json()

export const getUrlPathName = (url: string): string => new URL(url).pathname

export const generateUUID = (): string => self.crypto.randomUUID()

export const generateRandomColor = (): string =>
	'#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')
