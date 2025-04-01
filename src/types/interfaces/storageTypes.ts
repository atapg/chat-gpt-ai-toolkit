import type { ReactNode } from 'react'

export interface IStorageState {
	conversations: [] //TODO add conversations type later
	limit: Number
	offset: Number
	total: Number
}

export type StorageAction = {
	type: 'ADD_CONVERSATION'
	key: string
	value: any
}

export interface IStorageContextType {
	state: IStorageState
	dispatch: React.Dispatch<StorageAction>
}

export interface IStorageProvider {
	reducer: (state: IStorageState, action: StorageAction) => IStorageState
	initialState: IStorageState
	children: ReactNode
}
