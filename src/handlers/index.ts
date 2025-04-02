import { getRequestData, getUrlPathName } from '../helpers/requestHelpers'
import { userDataHandler } from './userDataHandler'

export const fetchHandler = async (response: Response, url: string) => {
	const data = await getRequestData(response)

	try {
		switch (getUrlPathName(url)) {
			case '/backend-api/me':
				userDataHandler(data)
				break

			default:
				break
		}
	} catch (e) {}
}
