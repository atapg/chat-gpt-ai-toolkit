console.log(chrome)
console.log(chrome.action)

function injectedFunction() {
	console.log('Heree')
	document.body.style.backgroundColor = 'orange'
}

chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript({
		target: { tabId: tab.id! },
		func: injectedFunction,
	})
})
