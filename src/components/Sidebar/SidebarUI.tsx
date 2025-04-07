import { useState } from 'react'
import { ISidebar } from '../../types/interfaces/sidebarTypes'
import './style.scss'
import { useStorage } from '../../hooks/useStorage'
import SidebarItems from './SidebarItems'
import Spinner from '../Spinner'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import useFetchConversations from '../../hooks/useFetchConversations'
import useLocation from '../../hooks/useLocation'
import ExtensionSidebar from '../ExtensionSidebar'
import { IFolder } from '../../types/interfaces/folderTypes'

const Sidebar = (_: ISidebar) => {
	const [activeTab, setActiveTab] = useState('original')
	const { state } = useStorage()
	const { fetchNextConversations, loading, finished } =
		useFetchConversations()
	useInfiniteScroll({
		querySelector: 'nav > div:nth-child(2)',
		loading,
		func: fetchNextConversations,
		removeEvent: finished,
	})
	const location = useLocation()

	const handleTabSwitch = (tab: string) => {
		setActiveTab(tab)
	}

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
		<div id='sidebar-container'>
			{/* Tabs */}
			<div className='tabs'>
				<button
					className={`tab ${
						activeTab === 'extension' ? 'active' : ''
					}`}
					onClick={() => handleTabSwitch('extension')}
				>
					Extension
				</button>
				<button
					className={`tab ${
						activeTab === 'original' ? 'active' : ''
					}`}
					onClick={() => handleTabSwitch('original')}
				>
					Original
				</button>
			</div>

			{/* Tab content */}
			<div
				className={`all-chats ${
					activeTab === 'original' ? 'tab-content' : 'display-none'
				}`}
			>
				{state.conversations ? (
					<ol>
						{state.conversations.map((conversation, index) => (
							<SidebarItems
								key={conversation.id}
								conversation={conversation}
								index={index}
								active={
									location.pathname ===
									`/c/${conversation.id}`
								}
							/>
						))}
					</ol>
				) : (
					<Spinner />
				)}
				{loading ? <Spinner /> : <></>}
			</div>

			<div
				className={`${
					activeTab === 'extension' ? 'tab-content' : 'display-none'
				}`}
			>
				<ExtensionSidebar folders={dummyData} />
			</div>
		</div>
	)
}

export default Sidebar
