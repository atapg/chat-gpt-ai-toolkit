import { useEffect, useState } from 'react'
import useFetchConversations from './useFetchConversations'
import { AddConversationsToStateEnum } from '../types/interfaces/conversationTypes'

const useInitialFetch = () => {
	const { fetchConversations } = useFetchConversations()
	const [token, setToken] = useState<string>('')

	useEffect(() => {
		const headersRecievedEvent = (event: CustomEventInit<any>) => {
			window.__token__ = event.detail
			fetchConversations(undefined, undefined, event.detail)
			setToken(event.detail)
		}

		window.addEventListener('headersRecieved', headersRecievedEvent)

		return () => {
			window.removeEventListener('headersRecieved', headersRecievedEvent)
		}
	}, [fetchConversations])

	useEffect(() => {
		const newChatCreated = () => {
			console.log('NEW chat event')
			fetchConversations(1, 0, token, AddConversationsToStateEnum.PREPEND)
		}

		window.addEventListener('newChatCreated', newChatCreated)

		return () => {
			window.removeEventListener('newChatCreated', newChatCreated)
		}
	}, [])
}

export default useInitialFetch
