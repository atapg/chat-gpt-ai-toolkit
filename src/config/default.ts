import { IFolder } from '../types/interfaces/folderTypes'

export const defaultFolders: IFolder[] = [
	{
		id: '1',
		name: 'Favorites',
		parentId: '1',
		color: '#33c3ff',
		conversations: [],
		subFolders: [],
		createdAt: new Date('2025-04-06T10:15:00Z'),
		updatedAt: new Date('2025-04-06T10:20:00Z'),
	},
	{
		id: '2',
		name: 'Archived',
		parentId: '1',
		color: '#33c3ff',
		conversations: [],
		subFolders: [],
		createdAt: new Date('2025-04-06T10:15:00Z'),
		updatedAt: new Date('2025-04-06T10:20:00Z'),
	},
]
