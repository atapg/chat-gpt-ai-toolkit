/**
 * This is a Custom hook to track and reattach elements inside a target container.
 * Used for websites that has CSP (Content Security Policy) which removes injected elements.
 * @param {string} selector - CSS selector for the target element.
 * @returns {HTMLElement | null} - The found element or null if not available.
 */

import { useState, useEffect } from 'react'

export function usePortalTarget(selector: string) {
	const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)

	useEffect(() => {
		// Function to find and set the target element
		const findTargetElement = () => {
			const element = document.querySelector(selector) as HTMLElement
			if (element && element !== targetElement) {
				setTargetElement(element)
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
	}, [selector, targetElement])

	return targetElement
}
