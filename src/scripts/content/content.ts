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

	// Clean observers after 20 seconds
	setTimeout(() => {
		cleanupAppObserver()
	}, 20000)
})()
