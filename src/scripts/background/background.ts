chrome.webRequest.onBeforeSendHeaders.addListener(
	function (details) {
		const url = new URL(details.url)

		if (
			url.pathname === '/backend-api/conversations' &&
			details.method === 'GET'
		) {
			details.requestHeaders?.forEach((header) => {
				if (header.name === 'Authorization') {
					chrome.runtime.sendMessage({
						type: 'HEADERS_RECIEVED',
						data: header.value,
					})
				}
			})
		}

		return {} // Required for Chrome manifest v3, no modifications
	},
	{
		urls: ['https://chatgpt.com/*'], // Filter the URLs you want to listen to
	},
	['requestHeaders', 'extraHeaders']
)
