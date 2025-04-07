import { createContext, useReducer } from 'react'
import {
	IStorageContextType,
	IStorageProvider,
} from '../types/interfaces/storageTypes'

export const StorageContext = createContext<IStorageContextType | undefined>(
	undefined
)

export const StorageProvider = ({
	reducer,
	initialState,
	children,
}: IStorageProvider) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	return (
		<StorageContext.Provider value={{ state, dispatch }}>
			{children}
		</StorageContext.Provider>
	)
}
