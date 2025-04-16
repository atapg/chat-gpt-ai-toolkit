import '../../utils/events'
import {
	injectHTMLElement,
	injectScript,
	injectStyle,
} from '../../utils/injectors'
;(async () => {
	// Initialize react app
	const app = document.createElement('div')
	app.id = 'appRoot'

	// Inject react app root element and get the observer cleanup function
	const cleanupAppObserver = await injectHTMLElement(app)

	// Inject react app script
	injectScript(chrome.runtime.getURL('index.js'))

	// Inject react app style
	injectStyle(chrome.runtime.getURL('index.css'))

	// Inject modal root element
	const modal = document.createElement('div')
	modal.id = 'modalRoot'

	const cleanupModalObserver = await injectHTMLElement(modal)

	// Clean observers after 20 seconds
	setTimeout(() => {
		cleanupAppObserver()
		cleanupModalObserver()
	}, 20000)

	// // Remove original conversations element
	// document.getElementById('history')?.remove()
})()
