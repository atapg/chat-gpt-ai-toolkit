import { useEffect, useState } from 'react'
import { ISidebar } from '../../types/interfaces/sidebarTypes'
import './style.scss'
import { useStorage } from '../../hooks/useStorage'
import SidebarItems from './SidebarItems'
import Spinner from '../Spinner'

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

	const handleTabSwitch = (tab: string) => {
		setActiveTab(tab)
	}

	useEffect(() => {
		console.log(state.conversations)
	}, [state])

	useEffect(() => {
		const targetElement = document.querySelector('nav > div:nth-child(2)')

		const handleScroll = () => {
			if (!targetElement || loading) return

			const bottom =
				targetElement.scrollHeight - 550 < targetElement.scrollTop

			if (bottom) {
				loadMoreData()
			}
		}

		targetElement?.addEventListener('scroll', handleScroll)

		return () => {
			targetElement?.removeEventListener('scroll', handleScroll)
		}
	}, [loading])

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
