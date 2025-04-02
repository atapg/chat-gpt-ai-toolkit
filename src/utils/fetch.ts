import { IRequestHeaders } from '../types/interfaces/requestHeadersTypes'

// *** This script must be injected into the content script at first before all requests ***
const originalFetch = window.fetch

// Override the fetch function to get the response data to  be able to get responses without sending any request from extension
window.fetch = async function (...args) {
	const response: Response = await originalFetch(...args)
	const input = args[0]
	let url

	if (input instanceof Request) {
		url = input.url
	} else if (input instanceof URL) {
		url = input.href
	} else {
		url = input
	}

	if (response) {
		url
		// fetchHandler(response, url)
	}

	if (response && response.url.includes('conversations')) {
		if (args[1] && args[1].headers) {
			const headersEvent = new CustomEvent('headersRecieved', {
				detail: args[1].headers as unknown as IRequestHeaders,
			})

			window.dispatchEvent(headersEvent)
			window.__headers__ = args[1].headers as unknown as IRequestHeaders
		}
	}

	return response
}
