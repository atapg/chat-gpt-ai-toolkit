import { ReactNode } from 'react'

export interface IFolder {
	id: string
	name: string
	parentId: string | null
	color?: string
	conversations: IFolderConversation[]
	subFolders: IFolder[]
	icon?: ReactNode
	deletable: boolean
	createdAt: string
	updatedAt: string
}

export interface IFolderConversation {
	id: string
	title: string
	folderId: string
}

export interface IFolderUpdateData {
	name?: string
	color?: string
	icon?: ReactNode
}

export interface IFoldersContextType {
	folders: IFolder[]
	setFolders: React.Dispatch<React.SetStateAction<IFolder[]>>
	addConversationToFolder: (
		conversation: IFolderConversation,
		folderId: string
	) => void
	removeConversationFromFolder: (
		conversationId: string,
		folderId: string
	) => void
	removeFolder: (folderId: string) => void
	moveConversationToFolder: (
		conversation: IFolderConversation,
		targetFolderId: string
	) => void
	isConversationInFolder(folder: IFolder, conversationId: string): boolean
	createFolder: (name?: string, parentFolderId?: string) => void
	updateFolder: (folderId: string, data: IFolderUpdateData) => void
}

export interface IConversationInFolders {
	[key: string]: string[]
}
