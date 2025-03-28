import { observeElementRemoval } from './observers'

export const injectHTMLElement = async (
	element: HTMLElement,
	targetElement: HTMLElement = document.body,
	appendType: 'append' | 'prepend' = 'append'
) => {
	const existingElement = document.querySelector(`#${element.id}`)

	if (!existingElement) {
		if (appendType === 'append') {
			targetElement.appendChild(element)
		} else if (appendType === 'prepend') {
			targetElement.prepend(element)
		}
	}

	observeElementRemoval(
		() => {
			injectHTMLElement(element, targetElement)
		},
		element,
		targetElement
	)
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
