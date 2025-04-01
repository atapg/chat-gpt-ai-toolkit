import { IRequestHeaders } from '../types/interfaces/requestHeadersTypes'

window.addEventListener(
	'headersRecieved',
	(event: CustomEventInit<IRequestHeaders | undefined>) => {
		chrome.storage.sync.set({ token: event.detail?.Authorization })
	}
)
