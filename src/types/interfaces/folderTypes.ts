import { ReactNode } from 'react'

export interface IFolder {
	id: string
	name: string
	parentId: string | null
	color?: string
	conversations: IFolderConversation[]
	subFolders: IFolder[]
	icon?: ReactNode
	createdAt: Date
	updatedAt: Date
}

export interface IFolderConversation {
	id: string
	title: string
	folderId: string
}

export interface IFoldersContextType {
	folders: IFolder[]
	setFolders: React.Dispatch<React.SetStateAction<IFolder[]>>
	addConversationToFolder: (
		conversation: IFolderConversation,
		folderId: string
	) => void
	removeConversationFromFolder: (conversationId: string) => void
	removeFolder: (folderId: string) => void
	moveConversationToFolder: (
		conversation: IFolderConversation,
		targetFolderId: string
	) => void
	isConversationInFolder(folderId: string, conversationId: string): boolean
}
