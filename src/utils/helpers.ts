export const getRequestData = async (response: Response): Promise<unknown> =>
	await response.clone().json()

export const getUrlPathName = (url: string): string => new URL(url).pathname

export const generateUUID = (): string => self.crypto.randomUUID()
