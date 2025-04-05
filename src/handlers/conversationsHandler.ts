export const conversationPostHandler = async (
	_: Response,
	args: [input: RequestInfo | URL, init?: RequestInit | undefined]
) => {
	// Check for new conversation post request
	if (args[1] && args[1]?.method) {
		if (args[1]?.method === 'POST') {
			const headersEvent = new CustomEvent('newChatCreated')

			window.dispatchEvent(headersEvent)
		}
	}
}

export const conversationsGetHandler = async (
	_: Response,
	args: [input: RequestInfo | URL, init?: RequestInit | undefined]
) => {
	// Check for conversations get request
	if (args[1] && args[1].headers) {
		// TODO Implement request body data for conversations without refetching it
		const headers = args[1].headers as Record<string, string>

		const headersEvent = new CustomEvent('headersRecieved', {
			detail: headers['Authorization'],
		})

		window.dispatchEvent(headersEvent)
		window.__token__ = headers['Authorization']
	}
}
