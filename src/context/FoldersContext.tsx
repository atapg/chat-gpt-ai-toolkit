import { createContext, ReactNode, useEffect, useState } from 'react'
import {
	IFolder,
	IFolderConversation,
	IFoldersContextType,
} from '../types/interfaces/folderTypes'
import { useChromeStorage } from '../hooks/useChromeStorage'
import { defaultFolders } from '../config/default'

export const FoldersContext = createContext<IFoldersContextType>({
	folders: [],
	setFolders: () => {},
	addConversationToFolder: () => {},
})

export const FoldersProvider = ({ children }: { children: ReactNode }) => {
	const [folders, setFolders] = useState<IFolder[]>([])
	const { getOrSet, set } = useChromeStorage()

	useEffect(() => {
		getOrSet('folders', defaultFolders).then((storedFolders) => {
			const foldersData = storedFolders as IFolder[]
			setFolders(foldersData)
		})
	}, [])
	const updateFolderTree = (
		folders: IFolder[],
		folderId: string,
		conversation: IFolderConversation
	): IFolder[] => {
		return folders.map((folder) => {
			if (folder.id === folderId) {
				const alreadyExists = folder.conversations.some(
					(c) => c.id === conversation.id
				)

				if (alreadyExists) return folder

				return {
					...folder,
					conversations: [...folder.conversations, conversation],
					updatedAt: new Date(), //TODO change date format
				}
			}

			if (folder.subFolders.length > 0) {
				return {
					...folder,
					subFolders: updateFolderTree(
						folder.subFolders,
						folderId,
						conversation
					),
				}
			}

			return folder
		})
	}

	const findFolder = (
		folderId: string,
		folders: IFolder[]
	): IFolder | null => {
		for (let i = 0; i < folders.length; i++) {
			const folder = folders[i]

			if (folder.id === folderId) {
				return folder
			}

			const found = findFolder(folderId, folder.subFolders)

			if (found) {
				return found
			}
		}

		return null
	}

	const addConversationToFolder = (
		conversation: IFolderConversation,
		folderId: string
	) => {
		const updatedFolders = updateFolderTree(folders, folderId, conversation)

		setFolders(updatedFolders)

		set('folders', updatedFolders)

		// Make api request in the future
	}

	return (
		<FoldersContext.Provider
			value={{ folders, setFolders, addConversationToFolder }}
		>
			{children}
		</FoldersContext.Provider>
	)
}
