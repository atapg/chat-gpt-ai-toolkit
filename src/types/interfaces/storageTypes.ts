import type { ReactNode } from 'react'
import { IConversation } from './conversationTypes'

export interface IStorageState {
	conversations: IConversation[] //TODO add conversations type later
	limit: Number
	offset: Number
	total: Number
}

export type StorageAction =
	| {
			type: 'ADD_CONVERSATION'
			value: IConversation[]
	  }
	| { type: 'ADD_META'; value: any }

export interface IStorageContextType {
	state: IStorageState
	dispatch: React.Dispatch<StorageAction>
}

export interface IStorageProvider {
	reducer: (state: IStorageState, action: StorageAction) => IStorageState
	initialState: IStorageState
	children: ReactNode
}
