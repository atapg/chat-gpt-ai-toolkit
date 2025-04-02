import { useEffect } from 'react'
import SidebarWrapper from './components/Sidebar'
import './test.css'
import { IRequestHeaders } from './types/interfaces/requestHeadersTypes'
import useFetch from './hooks/useFetch'
import appConfig from './config/appConfig'
import { useStorage } from './hooks/useStorage'
import { IConversationFetchResponse } from './types/interfaces/conversationTypes'

function App() {
	const { dispatch } = useStorage()
	const { func } = useFetch({
		url: `${appConfig.chatGPTBaseUrl}/conversations`,
	})

	useEffect(() => {
		const headersRecievedEvent = async (
			event: CustomEventInit<IRequestHeaders | undefined>
		) => {
			try {
				const data = (await func('offset=0&limit=30&order=updated', {
					headers: event.detail
						? Object.fromEntries(Object.entries(event.detail))
						: undefined,
				})) as unknown as IConversationFetchResponse

				dispatch({ type: 'ADD_CONVERSATION', value: data.items })
				dispatch({
					type: 'ADD_META',
					value: {
						offset: data.offset,
						limit: data.limit,
						total: data.total,
					},
				})
			} catch (e) {}
		}

		window.addEventListener('headersRecieved', headersRecievedEvent)

		return () => {
			window.removeEventListener('headersRecieved', headersRecievedEvent)
		}
	}, [])

	return (
		<>
			{/* <p>App</p> */}
			<SidebarWrapper />
		</>
	)
}

export default App
