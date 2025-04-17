/**
 * This is a Custom hook to track and reattach elements inside a target container.
 * Used for websites that has CSP (Content Security Policy) which removes injected elements.
 * @param {string, IPortalTargetOptions} selector - CSS selector for the target element.
 * @returns {HTMLElement | null} - The found element or null if not available.
 */

import { useState, useEffect } from 'react'
import { IPortalTargetOptions } from '../types/interfaces/portalTargetTypes'

export function usePortalTarget(
	selector: string,
	options?: IPortalTargetOptions
) {
	const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)
	const [targetElementChildren, setTargetElementChildren] =
		useState<HTMLCollection | null>(null)

	useEffect(() => {
		// Function to find and set the target element
		const findTargetElement = () => {
			const element = document.querySelector(selector) as HTMLElement

			if (element && element !== targetElement) {
				setTargetElement(element)
				setTargetElementChildren(element.children)

				// Invoke options
				if (options?.cleanElement) {
					// Run func first to make smoother
					cleanElementChildren(element, options?.exceptionElementId)

					// Start cleaning the children of the element every second for 20 seconds
					startCleanInterval(() =>
						cleanElementChildren(
							element,
							options?.exceptionElementId
						)
					)
				}
			}
		}

		// Initial check
		findTargetElement()

		// Create a MutationObserver to detect DOM changes
		const observer = new MutationObserver(() => {
			findTargetElement()
		})

		// Observe changes in the body (or parent container)
		observer.observe(document.body, { childList: true, subtree: true })

		return () => observer.disconnect() // Cleanup observer on unmount
	}, [selector, targetElement, options])

	// Use Tuple for return value
	let returnValue: [HTMLElement | null, HTMLCollection | null]
	returnValue = [targetElement, targetElementChildren]

	return returnValue
}

// Interval for calling clean element function
const startCleanInterval = (callback: Function) => {
	const intervalId = setInterval(() => {
		callback()
	}, 1000)

	setTimeout(() => {
		clearInterval(intervalId)
	}, 20000)
}

const cleanElementChildren = (element: HTMLElement, exception?: string) => {
	element.childNodes.forEach((child) => {
		if (child instanceof HTMLElement) {
			if (exception && child.id !== exception) {
				child.remove()
			}
		}
	})
}
