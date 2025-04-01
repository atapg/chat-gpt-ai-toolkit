import { usePortalTarget } from '../../hooks/usePortalTarget'
import { createPortal } from 'react-dom'
import Sidebar from './SidebarUI'
import { useEffect, useState } from 'react'

const SidebarWrapper = () => {
	const [navElement] = usePortalTarget(
		'.group\\/sidebar > div:nth-child(3)',
		{
			cleanElement: true,
		}
	) // Track <nav> element

	const [navElementGPTSPath] = usePortalTarget(
		'nav > div:nth-child(2) > div:nth-child(3)',
		{
			cleanElement: true,
		}
	) // Track <nav> element

	// const { state, dispatch } = useStorage()

	const [renderElement, setRenderElement] = useState<HTMLElement | null>(null)

	const url = new URL(window.location.href)

	useEffect(() => {
		console.log(url.pathname)
		if (url.pathname === '/gpts') {
			setRenderElement(navElementGPTSPath)
		} else {
			setRenderElement(navElement)
		}
	}, [navElement, navElementGPTSPath, url.pathname])

	useEffect(() => {
		// Fetch conversations
	}, [])

	return (
		<>
			{/* Inject Sidebar Component */}
			{renderElement
				? createPortal(
						<Sidebar rootElement={renderElement} />,
						renderElement
				  )
				: null}
		</>
	)
}

export default SidebarWrapper
