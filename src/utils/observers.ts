const observeElementRemoval = async (
	callback: () => void | Promise<void>,
	elementToCheck: HTMLElement,
	observerTarget: HTMLElement = document.body
) => {
	const observer = new MutationObserver(async () => {
		if (!document.getElementById(elementToCheck.id)) {
			await callback()
			observer.disconnect() // Cleanup once element is removed
		}
	})

	observer.observe(observerTarget, { childList: true, subtree: true })

	// Return cleanup function to stop observer manually if needed
	return () => {
		observer.disconnect()
	}
}

export { observeElementRemoval }
