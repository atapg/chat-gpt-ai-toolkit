import { useEffect, useState } from 'react'
import useFetchConversations from './useFetchConversations'
import { AddConversationsToStateEnum } from '../types/enums/conversationEnums'
import { useHeader } from './useHeader'

const useInitialFetch = () => {
	const { fetchConversations } = useFetchConversations()
	const [token, setToken] = useState<string>('')
	const { setToken: setHeaderToken } = useHeader()

	useEffect(() => {
		const headersRecievedEvent = async (event: CustomEventInit<any>) => {
			await setHeaderToken(event.detail)
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
