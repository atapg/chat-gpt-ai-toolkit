import { createContext, ReactNode, useEffect, useState } from 'react'
import {
	IConversationInFolders,
	IFolder,
	IFolderConversation,
	IFoldersContextType,
	IFolderUpdateData,
} from '../types/interfaces/folderTypes'
import { useChromeStorage } from '../hooks/useChromeStorage'
import { useHelpers } from '../hooks/useHelpers'
import { db } from '../db'

export const FoldersContext = createContext<IFoldersContextType>({
	folders: [],
	setFolders: () => {},
	addConversationToFolder: () => {},
	removeConversationFromFolder: () => {},
	removeFolder: () => {},
	moveConversationToFolder: () => {},
	isConversationInFolder: () => false,
	createFolder: () => {},
	updateFolder: () => null,
})

export const FoldersProvider = ({ children }: { children: ReactNode }) => {
	const [folders, setFolders] = useState<IFolder[]>([])
	const [conversationFolders, setConversationFolders] =
		useState<IConversationInFolders>({})
	const { set } = useChromeStorage()
	const { generateRandomColor, generateUUID } = useHelpers()

	useEffect(() => {
		// getOrSet('folders', defaultFolders).then((storedFolders) => {
		// 	setFolders(storedFolders)
		// })

		updateFolderState()
	}, [])

	function buildFolderTree(folders: IFolder[]): IFolder[] {
		const folderMap: { [id: string]: IFolder } = {}

		for (const folder of folders) {
			folder.subFolders = []
			folderMap[folder.id] = folder
		}

		const rootFolders: IFolder[] = []

		for (const folder of folders) {
			if (folder.parentId) {
				const parent = folderMap[folder.parentId]
				if (parent) {
					parent.subFolders!.push(folder)
				}
			} else {
				rootFolders.push(folder)
			}
		}

		return rootFolders
	}

	const getNestedFolders = async (): Promise<IFolder[]> => {
		const allFolders = await db.folders.toArray()
		return buildFolderTree(allFolders)
	}

	const updateFolderState = async () => {
		getNestedFolders().then((storedFolders) => {
			setFolders(storedFolders)
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

			const found = findFolder(folderId, folder.subFolders!)

			if (found) {
				return found
			}
		}

		return null
	}

	const findFoldersWithSameParent = (
		parentFolderId: string | null,
		folders: IFolder[]
	): IFolder[] => {
		const foldersList: IFolder[] = []

		for (let i = 0; i < folders.length; i++) {
			const folder = folders[i]

			if (folder.parentId === parentFolderId) {
				foldersList.push(folder)
			}

			const subMatches = findFoldersWithSameParent(
				parentFolderId,
				folder.subFolders!
			)

			foldersList.push(...subMatches)
		}

		return foldersList
	}

	const removeConversationFromoConversationFolders = (
		conversationId: string,
		folderId: string
	) => {
		let folders: string[] = []

		if (conversationFolders[conversationId]) {
			folders = conversationFolders[conversationId]
		}

		console.log(folders)

		folders = folders.filter((fId) => fId !== folderId)

		const updatedConversationFolders = {
			...conversationFolders,
			[conversationId]: folders,
		}

		console.log(updatedConversationFolders)

		setConversationFolders(updatedConversationFolders)
		set('conversationFolders', updatedConversationFolders)
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
					updatedAt: new Date().toISOString(),
				}
			}

			if (folder.subFolders!.length > 0) {
				return {
					...folder,
					subFolders: updateFolderTree(
						folder.subFolders!,
						folderId,
						conversation
					),
				}
			}

			return folder
		})
	}

	const addConversationToFolder = async (
		conversation: IFolderConversation,
		folderId: string
	) => {
		const folder = await db.folders.get(folderId)

		if (folder) {
			const updateData = {
				conversations: [...folder.conversations, conversation],
				updatedAt: new Date().toISOString(),
			}

			await db.folders.update(folderId, updateData)
		}
	}

	const collectDescendantFolderIds = (
		folders: IFolder[],
		targetId: string
	): string[] => {
		const idSet = new Set<string>()

		function traverse(currentId: string) {
			idSet.add(currentId)
			for (const folder of folders) {
				if (folder.parentId === currentId) {
					traverse(folder.id)
				}
			}
		}

		traverse(targetId)
		return Array.from(idSet)
	}

	const removeFolderFromTree = (
		folders: IFolder[],
		folderId: string
	): IFolder[] => {
		return folders
			.map((folder) => ({
				...folder,
				subFolders: removeFolderFromTree(folder.subFolders!, folderId),
			}))
			.filter((folder) => folder.id !== folderId)
	}

	const removeFolder = async (folderId: string) => {
		const allFolders = await db.folders.toArray()
		const idsToDelete = collectDescendantFolderIds(allFolders, folderId)
		await db.folders.bulkDelete(idsToDelete)
		updateFolderState()
		// const updatedFolders = removeFolderFromTree(folders, folderId)

		// setFolders(updatedFolders)
		// set('folders', updatedFolders)
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
				folder.subFolders!,
				conversationId
			)

			return {
				...folder,
				conversations: updatedConversations,
				subFolders: updatedSubFolders,
			}
		})
	}

	const removeConversationFromFolderTree = (
		folders: IFolder[],
		conversationId: string,
		folderId: string
	): IFolder[] => {
		return folders.map((folder) => {
			if (folder.id === folderId) {
				return {
					...folder,
					conversations: folder.conversations.filter(
						(c) => c.id !== conversationId
					),
				}
			} else {
				return {
					...folder,
					subFolders: removeConversationFromFolderTree(
						folder.subFolders!,
						conversationId,
						folderId
					),
				}
			}
		})
	}

	const removeConversationFromFolder = (
		conversationId: string,
		folderId: string
	) => {
		const updatedFolders = removeConversationFromFolderTree(
			folders,
			conversationId,
			folderId
		)

		removeConversationFromoConversationFolders(conversationId, folderId)

		// console.log(folderId)
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

		// toggleConversationInChatsInFolderStorage(
		// 	conversation.id,
		// 	targetFolderId
		// )

		// Future: Sync via API
	}

	const isConversationInFolder = (
		folder: IFolder,
		conversationId: string
	): boolean => {
		for (let i = 0; i < folder.conversations.length; i++) {
			const conversation = folder.conversations[i]

			if (conversation.id === conversationId) return true
		}

		return false
	}

	const addSubFolder = (
		folders: IFolder[],
		parentId: string,
		newSubFolder: IFolder
	): IFolder[] => {
		return folders.map((folder) => {
			if (folder.id === parentId) {
				return {
					...folder,
					subFolders: [...folder.subFolders!, newSubFolder],
				}
			} else if (folder.subFolders!.length > 0) {
				return {
					...folder,
					subFolders: addSubFolder(
						folder.subFolders!,
						parentId,
						newSubFolder
					),
				}
			}
			return folder
		})
	}

	const createFolder = (name?: string, parentFolderId?: string) => {
		const baseName = name || 'New Folder'

		// Check in db
		const siblingFolders = findFoldersWithSameParent(
			parentFolderId ? parentFolderId : null,
			folders
		)

		// Check for same name in db
		let uniqueName = baseName
		let counter = 1
		while (siblingFolders.some((folder) => folder.name === uniqueName)) {
			uniqueName = `${baseName} (${counter})`
			counter++
		}

		const newFolder: IFolder = {
			name: uniqueName,
			id: generateUUID(),
			conversations: [],
			parentId: parentFolderId || null,
			subFolders: [],
			color: generateRandomColor(),
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			deletable: true,
			isNew: true,
		}

		let newFoldersList: IFolder[] = []

		if (!parentFolderId) {
			newFoldersList = [...folders, newFolder]
		} else {
			newFoldersList = addSubFolder(folders, parentFolderId, newFolder)
		}

		// Add folder to db
		db.folders.add(newFolder)

		setFolders(newFoldersList)
		set('folders', newFoldersList)
	}

	const updateFolderTreeByEdit = (
		folders: IFolder[],
		folderId: string,
		data: IFolderUpdateData
	): IFolder[] => {
		return folders.map((folder) => {
			if (folder.id === folderId) {
				return {
					...folder,
					...data,
					updatedAt: new Date().toISOString(),
				}
			}

			if (folder.subFolders!.length > 0) {
				return {
					...folder,
					subFolders: updateFolderTreeByEdit(
						folder.subFolders!,
						folderId,
						data
					),
				}
			}

			return folder
		})
	}

	const updateFolder = (
		folderId: string,
		parentFolderId: string | null,
		data: IFolderUpdateData
	): IFolderUpdateData | null => {
		if (Object.keys(data).length <= 0) {
			console.error('Nothing to change')
			return null
		}

		const folderData = { ...data }

		if (folderData?.name) {
			const baseName = folderData.name || 'New Folder'

			const siblingFolders = findFoldersWithSameParent(
				parentFolderId ? parentFolderId : null,
				folders
			)

			let uniqueName = baseName
			let counter = 1
			while (
				siblingFolders.some((folder) => folder.name === uniqueName)
			) {
				uniqueName = `${baseName} (${counter})`
				counter++
			}

			folderData.name = uniqueName
		}

		const updatedFolders = updateFolderTreeByEdit(
			folders,
			folderId,
			folderData
		)

		setFolders(updatedFolders)
		set('folders', updatedFolders)

		return folderData
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
				createFolder,
				updateFolder,
			}}
		>
			{children}
		</FoldersContext.Provider>
	)
}
