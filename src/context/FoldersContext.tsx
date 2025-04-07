import { createContext, ReactNode, useEffect, useState } from 'react'
import { IFolder } from '../types/interfaces/folderTypes'
import { useChromeStorage } from '../hooks/useChromeStorage'
import { defaultFolders } from '../config/default'

interface FoldersContextType {
	folders: IFolder[]
	setFolders: React.Dispatch<React.SetStateAction<IFolder[]>>
}

export const FoldersContext = createContext<FoldersContextType>({
	folders: [],
	setFolders: () => {},
})

export const FoldersProvider = ({ children }: { children: ReactNode }) => {
	const [folders, setFolders] = useState<IFolder[]>([])
	const { getOrSet } = useChromeStorage()

	useEffect(() => {
		getOrSet('folders', defaultFolders).then((storedFolders) => {
			const foldersData = storedFolders as IFolder[]
			setFolders(foldersData)
		})
	}, [])

	return (
		<FoldersContext.Provider value={{ folders, setFolders }}>
			{children}
		</FoldersContext.Provider>
	)
}
