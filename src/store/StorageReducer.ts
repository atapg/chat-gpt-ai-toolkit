import { StorageAction, IStorageState } from '../types/interfaces/storageTypes'

export const initialStorage: IStorageState = {
	conversations: [],
	limit: 50,
	offset: 0,
	total: 0,
}

export const storageReducer = (
	state: IStorageState,
	action: StorageAction
): IStorageState => {
	switch (action.type) {
		case 'ADD_CONVERSATION':
			return { ...state, ...action.value }

		default:
			return state
	}
}
