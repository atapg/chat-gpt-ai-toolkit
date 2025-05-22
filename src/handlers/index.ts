import { getUrlPathName } from '../utils/helpers'
import {
	conversationPostHandler,
	conversationsGetHandler,
} from './conversationsHandler'

export const fetchHandler = async (
	response: Response,
	url: string,
	args: [input: RequestInfo | URL, init?: RequestInit | undefined]
) => {
	try {
		switch (getUrlPathName(url)) {
			case '/backend-api/me':
				// userDataHandler(data)
				break
			case '/backend-api/conversation':
				conversationPostHandler(response, args)
				break
			case '/backend-api/conversations':
				console.log({ response, args })
				conversationsGetHandler(response, args)
				break
			default:
				break
		}
	} catch (e) {
		console.log(e)
	}
}
