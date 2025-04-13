import type { ReactNode } from 'react'
import { IConversation } from './conversationTypes'

export interface IStorageState {
	conversations: IConversation[]
	limit: number
	offset: number
	total: number
	finished: boolean
}

export type StorageAction =
	| {
			type: 'ADD_CONVERSATION'
			value: IConversation[]
	  }
	| { type: 'ADD_META'; value: any }
	| { type: 'ADD_FINISHED'; value: any }
	| { type: 'PREPEND_CONVERSATION'; value: any }
	| { type: 'DELETE_CONVERSATION'; value: any }
	| { type: 'CLEAR_CONVERSATION' }

export interface IStorageContextType {
	state: IStorageState
	dispatch: React.Dispatch<StorageAction>
}

export interface IStorageProvider {
	reducer: (state: IStorageState, action: StorageAction) => IStorageState
	initialState: IStorageState
	children: ReactNode
}
