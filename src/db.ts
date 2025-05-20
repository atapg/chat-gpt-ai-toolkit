import Dexie, { Table } from 'dexie'
import { IFolder } from './types/interfaces/folderTypes'

class ChatGPTDB extends Dexie {
	folders!: Table<IFolder, number>

	constructor() {
		super('ChatGPTDB')

		// Define the database schema
		this.version(1).stores({
			folders:
				'id, name, parentId, color, conversations, subFolders, icon, deletable, createdAt, updatedAt, isNew',
		})
	}
}

// Singleton instance of the database
export const db = new ChatGPTDB()
