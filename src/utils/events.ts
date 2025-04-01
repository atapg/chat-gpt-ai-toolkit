import { IRequestHeaders } from '../types/interfaces/requestHeadersTypes'

window.addEventListener(
	'headersRecieved',
	(event: CustomEventInit<IRequestHeaders | undefined>) => {
		chrome.runtime.sendMessage({
			type: 'HEADERS_RECIEVED',
			data: event.detail,
		})
	}
)
