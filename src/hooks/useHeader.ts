import { useChromeStorage } from './useChromeStorage'

export const useHeader = () => {
	const { get, set } = useChromeStorage()

	const setToken = async (token: string) => await set('token', token)

	const getToken = async (): Promise<string> => await get('token')

	return {
		setToken,
		getToken,
	}
}
