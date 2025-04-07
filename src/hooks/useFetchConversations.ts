import { useEffect, useState, useRef, useCallback } from 'react'
import useFetch from './useFetch'
import { useStorage } from './useStorage'
import appConfig from '../config/appConfig'
import {
	IConversation,
	IConversationFetchResponse,
	IConversationShareData,
} from '../types/interfaces/conversationTypes'
import { AddConversationsToStateEnum } from '../types/enums/conversationEnums'

const MAX_CONVERSATIONS_LIMIT = appConfig.maxConversationFetchLimit

const useFetchConversations = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const { dispatch, state } = useStorage()
	const { func } = useFetch({
		url: `${appConfig.chatGPTBaseUrl}/conversations?`,
	})
	const { func: conversationFunc } = useFetch({
		url: `${appConfig.chatGPTBaseUrl}/conversation`,
	})
	const { func: shareFunc } = useFetch({
		url: `${appConfig.chatGPTBaseUrl}/share`,
	})

	const previousState = useRef(state)

	useEffect(() => {
		previousState.current = state
	}, [state])

	const fetchConversations = useCallback(
		async (
			limit = MAX_CONVERSATIONS_LIMIT,
			offset = 0,
			token?: string,
			state: AddConversationsToStateEnum = AddConversationsToStateEnum.APPEND
		) => {
			setLoading(true)
			try {
				const queryParams = `offset=${offset}&limit=${limit}&order=updated`
				const data = (await func(queryParams, {
					headers: {
						Authorization: token ? token : window.__token__,
					},
				})) as unknown as IConversationFetchResponse

				addToState(data, state)
			} catch (e) {
				console.error('Error fetching conversations:', e)
			} finally {
				setLoading(false)
			}
		},
		[dispatch, func]
	)

	const fetchNextConversations = useCallback(async () => {
		try {
			const { offset, limit, total } = previousState.current

			if (offset + limit < total) {
				await fetchConversations(limit, offset + limit)
			} else {
				dispatch({
					type: 'ADD_FINISHED',
					value: {
						finished: true,
					},
				})
			}
		} catch (e) {
			console.error('Error fetching next conversations:', e)
		}
	}, [fetchConversations, dispatch])

	const deleteConversation = async (
		conversationId: string,
		callback?: () => Promise<void>
	) => {
		setLoading(true)
		try {
			const data = await conversationFunc(`/${conversationId}`, {
				method: 'PATCH',
				headers: {
					Authorization: window.__token__,
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					is_visible: false,
				}),
			})

			if (!data) throw new Error('Error deleting conversation')

			dispatch({ type: 'DELETE_CONVERSATION', value: conversationId })
			dispatch({
				type: 'ADD_META',
				value: {
					total: state.total - 1,
				},
			})
		} catch (e) {
			console.log(e)
		} finally {
			setLoading(false)
			callback && (await callback())
		}
	}

	const shareConversation = async (
		conversationId: string
	): Promise<IConversationShareData | undefined> => {
		setLoading(true)
		try {
			const data = (await conversationFunc(`/${conversationId}`, {
				method: 'GET',
				headers: {
					Authorization: window.__token__,
					'content-type': 'application/json',
				},
			})) as unknown as IConversation

			if (!data) throw new Error('Error fetching conversation')

			const shareData = (await shareFunc('/create', {
				method: 'POST',
				headers: {
					Authorization: window.__token__,
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					conversation_id: conversationId,
					current_node_id: data.current_node,
					is_anonymous: true,
				}),
			})) as unknown as IConversationShareData

			if (!shareData) throw new Error('Error sharing conversation')

			return shareData
		} catch (e) {
			console.log(e)
			return undefined
		} finally {
			setLoading(false)
		}
	}

	const addToState = (
		data: IConversationFetchResponse,
		type: AddConversationsToStateEnum
	) => {
		switch (type) {
			case AddConversationsToStateEnum.APPEND:
				dispatch({ type: 'ADD_CONVERSATION', value: data.items })
				dispatch({
					type: 'ADD_META',
					value: {
						offset: data.offset,
						limit: data.limit,
						total: data.total,
					},
				})
				break

			case AddConversationsToStateEnum.PREPEND:
				dispatch({ type: 'PREPEND_CONVERSATION', value: data.items })
				dispatch({
					type: 'ADD_META',
					value: {
						total: data.total + 1,
					},
				})
				break

			default:
				break
		}
	}

	return {
		fetchConversations,
		fetchNextConversations,
		loading,
		finished: state.finished,
		deleteConversation,
		shareConversation,
	}
}

export default useFetchConversations
