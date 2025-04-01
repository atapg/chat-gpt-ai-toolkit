import { IConversation } from '../types/interfaces/conversationTypes'
import { StorageAction, IStorageState } from '../types/interfaces/storageTypes'

export const initialStorage: IStorageState = {
	conversations: [],
	limit: 100,
	offset: 0,
	total: 0,
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

		case 'ADD_META':
			return {
				...state,
				limit: action.value.limit,
				offset: action.value.offset,
				total: action.value.total,
			}
		default:
			return state
	}
}
