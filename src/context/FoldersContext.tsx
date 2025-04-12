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
	removeConversationFromFolder: () => {},
	removeFolder: () => {},
	moveConversationToFolder: () => {},
	isConversationInFolder: () => false,
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

	const addConversationToFolder = (
		conversation: IFolderConversation,
		folderId: string
	) => {
		const updatedFolders = updateFolderTree(folders, folderId, conversation)

		setFolders(updatedFolders)

		set('folders', updatedFolders)

		// Make api request in the future
	}

	const removeFolderFromTree = (
		folders: IFolder[],
		folderId: string
	): IFolder[] => {
		return folders
			.map((folder) => ({
				...folder,
				subFolders: removeFolderFromTree(folder.subFolders, folderId),
			}))
			.filter((folder) => folder.id !== folderId)
	}

	const removeFolder = (folderId: string) => {
		const updatedFolders = removeFolderFromTree(folders, folderId)

		setFolders(updatedFolders)
		set('folders', updatedFolders)
	}

	const removeConversationFromTree = (
		folders: IFolder[],
		conversationId: string
	): IFolder[] => {
		return folders.map((folder) => {
			const updatedConversations = folder.conversations.filter(
				(c) => c.id !== conversationId
			)

			const updatedSubFolders = removeConversationFromTree(
				folder.subFolders,
				conversationId
			)

			return {
				...folder,
				conversations: updatedConversations,
				subFolders: updatedSubFolders,
			}
		})
	}

	const removeConversationFromFolder = (conversationId: string) => {
		const updatedFolders = removeConversationFromTree(
			folders,
			conversationId
		)

		setFolders(updatedFolders)
		set('folders', updatedFolders)

		// API call in the future
	}

	const moveConversationToFolder = (
		conversation: IFolderConversation,
		targetFolderId: string
	) => {
		const foldersWithoutConversation = removeConversationFromTree(
			folders,
			conversation.id
		)

		const updatedFolders = updateFolderTree(
			foldersWithoutConversation,
			targetFolderId,
			conversation
		)

		setFolders(updatedFolders)
		set('folders', updatedFolders)

		// Future: Sync via API
	}

	const isConversationInFolder = (
		folderId: string,
		conversationId: string
	): boolean => {
		for (const folder of folders) {
			if (folder.id === folderId) {
				return folder.conversations.some(
					(convo) => convo.id === conversationId
				)
			}

			if (folder.subFolders.length > 0) {
				const foundInSub = isConversationInFolder(
					folderId,
					conversationId
				)
				if (foundInSub) return true
			}
		}
		return false
	}

	return (
		<FoldersContext.Provider
			value={{
				folders,
				setFolders,
				addConversationToFolder,
				removeConversationFromFolder,
				removeFolder,
				moveConversationToFolder,
				isConversationInFolder,
			}}
		>
			{children}
		</FoldersContext.Provider>
	)
}
