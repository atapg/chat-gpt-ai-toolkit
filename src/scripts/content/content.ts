import {
	injectHTMLElement,
	injectScript,
	injectStyle,
} from '../../utils/injectors'
;(async () => {
	// Initialize react app
	const app = document.createElement('div')
	app.id = 'appRoot'

	// Inject react app
	injectHTMLElement(app)

	// Inject react app script
	injectScript(chrome.runtime.getURL('index.js'))

	// Inject react app style
	injectStyle(chrome.runtime.getURL('index.css'))
})()
