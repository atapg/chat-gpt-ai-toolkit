import { IFolder } from '../types/interfaces/folderTypes'
import ExtensionSidebar from './ExtensionSidebar'

const Dev = () => {
	const dummyData: IFolder[] = [
		{
			id: '5',
			name: 'Second Main',
			parentId: '1',
			color: '#33c3ff',
			conversations: [
				{
					id: '1231',
					title: 'titleee',
				},
			],
			subFolders: [
				{
					id: '5',
					name: 'Second Main',
					parentId: '1',
					color: '#33c3ff',
					conversations: [
						{
							id: '1231',
							title: 'titleee',
						},
					],
					subFolders: [],
					createdAt: new Date('2025-04-06T10:15:00Z'),
					updatedAt: new Date('2025-04-06T10:20:00Z'),
				},
			],
			createdAt: new Date('2025-04-06T10:15:00Z'),
			updatedAt: new Date('2025-04-06T10:20:00Z'),
		},
		{
			id: '5',
			name: 'Main Main',
			parentId: '1',
			color: '#33c3ff',
			conversations: [
				{
					id: '1231',
					title: 'titldsadsadsadsaeee',
				},
			],
			subFolders: [],
			createdAt: new Date('2025-04-06T10:15:00Z'),
			updatedAt: new Date('2025-04-06T10:20:00Z'),
		},
	]

	return (
		<div>
			<ExtensionSidebar folders={dummyData} />
		</div>
	)
}

export default Dev
