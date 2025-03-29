import { fetchHandler } from '../handlers'

// *** This script must be injected into the content script at first before all requests ***
const originalFetch = window.fetch

// Override the fetch function to get the response data to  be able to get responses without sending any request from extension
window.fetch = async function (...args) {
	const response: Response = await originalFetch(...args)

	if (response) {
		fetchHandler(response)
	}

	return response
}
