import { useEffect, useState } from 'react'
import { ISidebar } from '../../types/interfaces/sidebarTypes'
import './style.scss'
import { useStorage } from '../../hooks/useStorage'
import SidebarItems from './SidebarItems'
import Spinner from '../Spinner'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'

const Sidebar = (_: ISidebar) => {
	const [activeTab, setActiveTab] = useState('extension')
	const [loading, setLoading] = useState(false)
	const { state } = useStorage()

	const loadMoreData = () => {
		if (loading) return

		setLoading(true)

		setTimeout(() => {
			setLoading(false)
		}, 6000)
	}

	useInfiniteScroll({
		querySelector: 'nav > div:nth-child(2)',
		loading,
		func: loadMoreData,
	})

	const handleTabSwitch = (tab: string) => {
		setActiveTab(tab)
	}

	useEffect(() => {
		console.log(state.conversations)
	}, [state])

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
							/>
						))}
					</ol>
				) : (
					<></>
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
