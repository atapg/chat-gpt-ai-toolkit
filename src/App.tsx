import SidebarWrapper from './components/Sidebar'
import './test.css'
import useInitialFetch from './hooks/useInitialFetch'

function App() {
	useInitialFetch()

	return (
		<>
			<SidebarWrapper />
		</>
	)
}

export default App
