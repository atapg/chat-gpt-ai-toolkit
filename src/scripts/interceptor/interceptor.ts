;(async () => {
	// Create a new script element to import windows fetch modified script
	const newScriptElement = document.createElement('script')
	newScriptElement.src = chrome.runtime.getURL('fetch.js')
	newScriptElement.type = 'module'
	newScriptElement.id = 'fetchInterceptor'

	const head = document.head || document.documentElement
	head.prepend(newScriptElement)

	const messageListener = async (message: any) => {
		if (message.type === 'HEADERS_RECEIVED') {
			console.log(message)
		}
	}

	chrome.runtime.onMessage.addListener(messageListener)
})()
