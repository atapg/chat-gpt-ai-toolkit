import { createContext, ReactNode, useEffect, useState } from 'react'
import {
	IFolder,
	IFolderConversation,
	IFoldersContextType,
	IFolderUpdateData,
} from '../types/interfaces/folderTypes'
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
	updateFolder: async () => null,
})

export const FoldersProvider = ({ children }: { children: ReactNode }) => {
	const [folders, setFolders] = useState<IFolder[]>([])
	const { generateRandomColor, generateUUID } = useHelpers()

	useEffect(() => {
		// getOrSet('folders', defaultFolders).then((storedFolders) => {
		// 	setFolders(storedFolders)
		// })

		updateFolderState()
	}, [])

	// Build a tree structure from the flat array of folders
	// This function assumes that each folder has a unique id and a parentId
	function buildFolderTree(folders: IFolder[]): IFolder[] {
		const folderMap: { [id: string]: IFolder } = {}

		for (const folder of folders) {
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

	// Get all folders from the database and build a tree structure
	const getNestedFolders = async (): Promise<IFolder[]> => {
		const allFolders = await db.folders.toArray()
		return buildFolderTree(allFolders)
	}

	// Update the folder state in the context
	const updateFolderState = async () => {
		getNestedFolders().then((storedFolders) => {
			setFolders(storedFolders)
		})
	}

	// Find folders with the same name in the same parent folder
	// This function will append a number to the name if a folder with the same name already exists
	const findFoldersWithSameName = async (
		folderName: string,
		parentFolderId: string | null
	) => {
		let uniqueName = folderName

		const siblingFolders = parentFolderId
			? await db.folders
					.where('parentId')
					.equals(parentFolderId)
					.toArray()
			: await db.folders
					.filter((folder) => folder.parentId === null)
					.toArray()

		let counter = 1
		while (siblingFolders.some((folder) => folder.name === uniqueName)) {
			uniqueName = `${folderName} (${counter})`
			counter++
		}

		return uniqueName
	}

	// Create a new folder
	const createFolder = async (name?: string, parentFolderId?: string) => {
		// Check for same name in root
		const uniqueName = await findFoldersWithSameName(
			name || 'New Folder',
			parentFolderId ?? null
		)

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
			isNew: false,
		}

		db.folders.add(newFolder)

		// Add folder to db
		updateFolderState()
	}

	// Update folder information
	const updateFolder = async (
		folderId: string,
		parentFolderId: string | null,
		data: IFolderUpdateData
	): Promise<IFolderUpdateData | null> => {
		if (Object.keys(data).length <= 0) {
			console.error('Nothing to change')
			return null
		}

		const folderData = { ...data }

		if (folderData?.name) {
			// Check for same name in root
			const uniqueName = await findFoldersWithSameName(
				folderData.name || 'New Folder',
				parentFolderId ?? null
			)

			folderData.name = uniqueName
		}

		await db.folders.update(folderId, {
			...folderData,
			updatedAt: new Date().toISOString(),
		})

		updateFolderState()

		return folderData
	}

	// Remove folder
	const removeFolder = async (folderId: string) => {
		// When a folder is deleted, all its subfolders and conversations are deleted
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

		const allFolders = await db.folders.toArray()
		const idsToDelete = collectDescendantFolderIds(allFolders, folderId)
		await db.folders.bulkDelete(idsToDelete)
		updateFolderState()
	}

	// Add conversation to folder
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
			updateFolderState()
		}
	}

	// Remove conversation from folder
	const removeConversationFromFolder = async (
		conversationId: string,
		folderId: string
	) => {
		const folder = await db.folders.get(folderId)

		if (folder) {
			const updatedConversations = folder.conversations.filter(
				(conversation) => conversation.id !== conversationId
			)

			const updateData = {
				conversations: updatedConversations,
				updatedAt: new Date().toISOString(),
			}

			await db.folders.update(folderId, updateData)
			updateFolderState()
		}
	}

	// Move conversation to another folder
	const moveConversationToFolder = (
		_conversation: IFolderConversation,
		_targetFolderId: string
	) => {}

	// Check if conversation is in folder
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
