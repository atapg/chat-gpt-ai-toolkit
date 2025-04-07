export interface IFolder {
	id: string
	name: string
	parentId: string | null
	color?: string
	conversations: IFolderConversation[]
	subFolders: IFolder[]
	createdAt: Date
	updatedAt: Date
}

export interface IFolderConversation {
	id: string
	title: string
}
