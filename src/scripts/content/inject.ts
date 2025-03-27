const injectElement = (
	element: HTMLElement,
	targetElement: HTMLElement = document.body
) => {
	console.log('Injection started')
	const existingElement = document.querySelector(`#${element.id}`)

	if (!existingElement) {
		targetElement.appendChild(element)
	}

	const observer = new MutationObserver(() => {
		if (!document.querySelector(`#${element.id}`)) {
			// Re-insert the element if it's removed from the DOM
			// Used for some websites that remove elements from the DOM for security reason
			injectElement(element, targetElement)
		}
	})

	observer.observe(targetElement, { childList: true, subtree: true })
}

export default injectElement
