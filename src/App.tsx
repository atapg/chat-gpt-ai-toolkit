import { createPortal } from 'react-dom'
import './test.css'
import Sidebar from './components/Sidebar'
import { usePortalTarget } from './hooks/usePortalTarget'
import { useEffect, useState } from 'react'

function App() {
	const [navElement] = usePortalTarget('.group\\/sidebar > div:nth-child(3)') // Track <nav> element
	const [el, setEl] = useState<Element | null>(null)

	useEffect(() => {
		if (navElement) {
			if (navElement.children.length > 1) {
				setEl(navElement.children[0])
			}
		}
	}, [navElement])

	return (
		<>
			{/* <p>App</p> */}
			{/* Inject Sidebar Component */}
			{navElement
				? createPortal(
						<Sidebar rootElement={navElement} content={el} />,
						navElement
				  )
				: null}
		</>
	)
}

export default App
