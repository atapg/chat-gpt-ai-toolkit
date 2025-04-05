import { fetchHandler } from '../handlers'

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
		fetchHandler(response, url, args)
	}

	return response
}
