import { useEffect, useRef, useState } from 'react'
import { ISidebar } from '../../types/interfaces/sidebarTypes'

const Sidebar = (props: ISidebar) => {
	const [activeTab, setActiveTab] = useState('extension') // Track the active tab
	const ref = useRef<HTMLDivElement | null>(null)

	// Handle tab switching
	const handleTabSwitch = (tab: string) => {
		setActiveTab(tab)
	}

	useEffect(() => {
		if (ref.current && props.content) {
			// Ensure props.content is an element before appending
			ref.current.append(props.content)
		}
	}, [props.content]) // Depend on content so it updates when it changes

	return (
		<div className='sidebar-container'>
			{/* Tabs */}
			<div>
				<button
					style={{ backgroundColor: 'red' }}
					onClick={() => handleTabSwitch('extension')}
				>
					Extension
				</button>
				<button
					style={{ backgroundColor: 'blue' }}
					onClick={() => handleTabSwitch('original')}
				>
					Original
				</button>
			</div>

			<div
				ref={ref}
				className={`${activeTab === 'extension' ? 'display-none' : ''}`}
			></div>
			<div
				className={`${activeTab === 'original' ? 'display-none' : ''}`}
			>
				EXtension details
			</div>
		</div>
	)
}

export default Sidebar
