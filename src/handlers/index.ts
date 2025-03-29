import { getRequestData, getUrlPathName } from '../helpers/requestHelpers'
import { userDataHandler } from './userDataHandler'

export const fetchHandler = async (response: Response) => {
	const data = await getRequestData(response)

	switch (getUrlPathName(response.url)) {
		case '/backend-api/me':
			userDataHandler(data)
			break

		default:
			break
	}
}
