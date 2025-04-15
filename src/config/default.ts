import { IFolder } from '../types/interfaces/folderTypes'

export const defaultFolders: IFolder[] = [
	{
		id: '1',
		name: 'Favorites',
		parentId: null,
		color: '#33c3ff',
		conversations: [],
		subFolders: [],
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		deletable: false,
	},
	{
		id: '2',
		name: 'Archived',
		parentId: null,
		color: '#33c3ff',
		conversations: [],
		subFolders: [],
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		deletable: false,
	},
]
