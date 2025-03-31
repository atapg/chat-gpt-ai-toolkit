import { createPortal } from 'react-dom'
import './test.css'
import Sidebar from './components/Sidebar'
import { usePortalTarget } from './hooks/usePortalTarget'

function App() {
	const navElement = usePortalTarget('nav') // Track <nav> element

	return (
		<>
			<p>App</p>
			{navElement ? createPortal(<Sidebar />, navElement) : null}
		</>
	)
}

export default App
