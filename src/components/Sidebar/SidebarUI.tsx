import { useEffect, useState } from 'react'
import { ISidebar } from '../../types/interfaces/sidebarTypes'
import './style.scss'
import { useStorage } from '../../hooks/useStorage'
import SidebarItems from './SidebarItems'
import Spinner from '../Spinner'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import useFetchConversations from '../../hooks/useFetchConversations'
import useLocation from '../../hooks/useLocation'

const Sidebar = (_: ISidebar) => {
	const [activeTab, setActiveTab] = useState('extension')
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

	useEffect(() => {
		console.log(location)
	}, [location])

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
				Extension details
			</div>
		</div>
	)
}

export default Sidebar
