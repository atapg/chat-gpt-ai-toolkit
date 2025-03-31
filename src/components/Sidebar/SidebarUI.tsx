import { useState } from 'react'
import { ISidebar } from '../../types/interfaces/sidebarTypes'
import './style.scss'

const Sidebar = (_: ISidebar) => {
	const [activeTab, setActiveTab] = useState('extension')

	const handleTabSwitch = (tab: string) => {
		setActiveTab(tab)
	}

	return (
		<div className='sidebar-container'>
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
				All chats rendered here
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
