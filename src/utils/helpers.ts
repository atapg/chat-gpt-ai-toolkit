export const getRequestData = async (response: Response): Promise<unknown> =>
	await response.clone().json()

export const getUrlPathName = (url: string): string => new URL(url).pathname

export const generateUUID = (): string => self.crypto.randomUUID()

export const generateRandomColor = (): string =>
	'#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')

export const getCookie = (cname: string): string => {
	let name = cname + '='
	let decodedCookie = decodeURIComponent(document.cookie)
	let ca = decodedCookie.split(';')

	for (let i = 0; i < ca.length; i++) {
		let c = ca[i]
		while (c.charAt(0) == ' ') {
			c = c.substring(1)
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length)
		}
	}
	return ''
}
