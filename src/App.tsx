import SidebarWrapper from './components/Sidebar'
import useInitialFetch from './hooks/useInitialFetch'
// import Dev from './components/Dev'

function App() {
	useInitialFetch()

	return (
		<>
			{/* <Dev /> */}
			<SidebarWrapper />
		</>
	)
}

export default App
