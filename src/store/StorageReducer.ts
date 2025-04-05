import { IConversation } from '../types/interfaces/conversationTypes'
import { StorageAction, IStorageState } from '../types/interfaces/storageTypes'

export const initialStorage: IStorageState = {
	conversations: [],
	limit: 100,
	offset: 0,
	total: 0,
	finished: false,
}

export const storageReducer = (
	state: IStorageState,
	action: StorageAction
): IStorageState => {
	switch (action.type) {
		case 'ADD_CONVERSATION':
			return {
				...state,
				conversations: [
					...state.conversations,
					...(action.value as IConversation[]),
				],
			}

		case 'PREPEND_CONVERSATION':
			state.conversations.unshift(action.value[0] as IConversation)

			return state

		case 'ADD_META':
			return {
				...state,
				...action.value,
			}

		case 'ADD_FINISHED':
			return {
				...state,
				finished: action.value.finished,
			}
		default:
			return state
	}
}
