chrome.webRequest.onBeforeSendHeaders.addListener(
	function (details) {
		const url = new URL(details.url)

		if (
			url.pathname === '/backend-api/conversations' &&
			details.method === 'GET'
		) {
			details.requestHeaders?.forEach((header) => {
				if (header.name === 'Authorization') {
					chrome.storage.local.set({
						authorizationHeader: header.value,
					})
				}
			})
		}

		return { requestHeaders: details.requestHeaders }
	},
	{
		urls: ['https://chatgpt.com/*'], // Filter the URLs you want to listen to
	},
	['requestHeaders', 'extraHeaders']
)
