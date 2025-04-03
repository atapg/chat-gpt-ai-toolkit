import { useEffect } from 'react'
import SidebarWrapper from './components/Sidebar'
import './test.css'
import useFetchConversations from './hooks/useFetchConversations'

function App() {
	const { fetchConversations } = useFetchConversations()

	useEffect(() => {
		const headersRecievedEvent = (event: CustomEventInit<any>) => {
			window.__headers__ = event.detail['Authorization']
			fetchConversations(undefined, undefined, event.detail)
		}

		window.addEventListener('headersRecieved', headersRecievedEvent)

		return () => {
			window.removeEventListener('headersRecieved', headersRecievedEvent)
		}
	}, [fetchConversations])

	return (
		<>
			<SidebarWrapper />
		</>
	)
}

export default App
