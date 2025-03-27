const observeElementRemoval = async (
	callback: Function,
	elementToCheck: HTMLElement,
	observerTarget: HTMLElement = document.body
) => {
	const observer = new MutationObserver(async () => {
		if (!document.querySelector(`#${elementToCheck.id}`)) {
			await callback()
		}
	})

	observer.observe(observerTarget, { childList: true, subtree: true })
}

export { observeElementRemoval }
