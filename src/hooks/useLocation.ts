import { useEffect, useState } from 'react'

export const useLocation = () => {
	const [location, setLocation] = useState({
		pathname: window.location.pathname,
		search: window.location.search,
		hash: window.location.hash,
	})

	useEffect(() => {
		const updateLocation = () => {
			setLocation({
				pathname: window.location.pathname,
				search: window.location.search,
				hash: window.location.hash,
			})
		}

		const patchHistory = (type: 'pushState' | 'replaceState') => {
			const original = history[type]
			history[type] = function (...args) {
				const result = original.apply(this, args)
				window.dispatchEvent(new Event('locationchange'))
				return result
			}
		}

		patchHistory('pushState')
		patchHistory('replaceState')

		window.addEventListener('popstate', updateLocation)
		window.addEventListener('locationchange', updateLocation)

		return () => {
			window.removeEventListener('popstate', updateLocation)
			window.removeEventListener('locationchange', updateLocation)
		}
	}, [])

	return location
}
