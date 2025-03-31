import { observeElementRemoval } from './observers'

export const injectHTMLElement = async (
	element: HTMLElement,
	targetElement: HTMLElement = document.body,
	appendType: 'append' | 'prepend' = 'append'
) => {
	// Check if element already exists
	const existingElement = document.getElementById(element.id)

	if (!existingElement) {
		if (appendType === 'append') {
			targetElement.appendChild(element)
		} else {
			targetElement.prepend(element)
		}
	}

	// Cleanup function to prevent multiple observers
	let cleanupObserver: (() => void) | null = null

	// Observe element removal and reinject
	cleanupObserver = await observeElementRemoval(
		() => {
			injectHTMLElement(element, targetElement, appendType)
		},
		element,
		targetElement
	)

	// Return cleanup function to stop observing if needed manually
	return () => {
		if (cleanupObserver) {
			cleanupObserver() // Stop observing
		}
	}
}

export const injectScript = async (src: string) => {
	await import(src)
}

export const injectStyle = (href: string) => {
	const link = document.createElement('link')
	link.rel = 'stylesheet'
	link.href = href
	document.head.appendChild(link)
}

// const injectReactElement = (
// 	reactComponent: ComponentType<any>,
// 	rootId: string,
// 	targetElement: HTMLElement = document.body
// ) => {
// 	console.log('Injecting react')
// 	const container = document.createElement('div')
// 	container.id = rootId
// 	targetElement.appendChild(container)

// 	const root = ReactDOM.createRoot(container)
// 	root.render(React.createElement(reactComponent))

// 	injectHTMLElement(container, targetElement)
// }
