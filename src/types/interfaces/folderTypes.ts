import { IConversation } from './conversationTypes'

export interface IFolder {
	id: string
	name: string
	parentId: string | null
	color?: string
	conversations: IConversation[]
	subFolders: IFolder[]
	createdAt: Date
	updatedAt: Date
}
