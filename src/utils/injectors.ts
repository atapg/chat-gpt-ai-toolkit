import { observeElementRemoval } from './observers'

const injectHTMLElement = async (
	element: HTMLElement,
	targetElement: HTMLElement = document.body
) => {
	const existingElement = document.querySelector(`#${element.id}`)

	if (!existingElement) {
		targetElement.appendChild(element)
	}

	observeElementRemoval(
		() => {
			injectHTMLElement(element, targetElement)
		},
		element,
		targetElement
	)
}

const injectScript = async (src: string) => {
	await import(src)
}

const injectStyle = (href: string) => {
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

export {
	injectHTMLElement,
	injectScript,
	injectStyle,
	//  injectReactElement
}
