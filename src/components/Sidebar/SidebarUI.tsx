import { useEffect, useState } from 'react'
import { ISidebar } from '../../types/interfaces/sidebarTypes'
import './style.scss'
import { useStorage } from '../../hooks/useStorage'
import SidebarItems from './SidebarItems'

const Sidebar = (_: ISidebar) => {
	const [activeTab, setActiveTab] = useState('extension')
	const { state } = useStorage()

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
				className={`${
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
