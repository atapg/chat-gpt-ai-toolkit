;(async () => {
	// Create a new script element to import windows fetch modified script
	const newScriptElement = document.createElement('script')
	newScriptElement.src = chrome.runtime.getURL('fetch.js')
	newScriptElement.type = 'module'
	newScriptElement.id = 'fetchInterceptor'

	const head = document.head || document.documentElement
	head.prepend(newScriptElement)

	newScriptElement.onload = () => {
		console.log('fetch.js script injected successfully')
		// @ts-ignore
		this.remove()
	}
})()
