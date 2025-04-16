import { usePortalTarget } from '../../hooks/usePortalTarget'
import { createPortal } from 'react-dom'
import Sidebar from './SidebarUI'
import { useEffect, useState } from 'react'

const SidebarWrapper = () => {
	const [navElement] = usePortalTarget(
		// 'nav > div:nth-child(2) > div:nth-child(1) > div:nth-child(4)',
		'#history',
		{
			cleanElement: true,
			exceptionElementId: 'sidebar-container',
		}
	) // Track <nav> element

	// const [navElementGPTSPath] = usePortalTarget(
	// 	'nav > div:nth-child(2) > div:nth-child(4)',
	// 	{
	// 		cleanElement: true,
	// 		exceptionElementId: 'sidebar-container',
	// 	}
	// ) // Track <nav> element

	const [renderElement, setRenderElement] = useState<HTMLElement | null>(null)

	const url = new URL(window.location.href)

	useEffect(() => {
		// if (url.pathname === '/gpts') {
		// 	setRenderElement(navElementGPTSPath)
		// } else {
		// 	setRenderElement(navElement)
		// }
		setRenderElement(navElement)
	}, [navElement, /* navElementGPTSPath, */ url.pathname])

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
