import { useEffect } from 'react'
import useFetchConversations from './useFetchConversations'
import { useHeader } from './useHeader'

const useInitialFetch = () => {
	const { fetchConversations, clearConversations } = useFetchConversations()
	const { setToken: setHeaderToken } = useHeader()

	useEffect(() => {
		const headersRecievedEvent = async (event: CustomEventInit<any>) => {
			await setHeaderToken(event.detail)
			fetchConversations(undefined, undefined, event.detail)
		}

		window.addEventListener('headersRecieved', headersRecievedEvent)

		return () => {
			window.removeEventListener('headersRecieved', headersRecievedEvent)
		}
	}, [fetchConversations])

	useEffect(() => {
		const newChatCreated = () => {
			clearConversations()
			fetchConversations()
		}

		window.addEventListener('newChatCreated', newChatCreated)

		return () => {
			window.removeEventListener('newChatCreated', newChatCreated)
		}
	}, [])
}

export default useInitialFetch
