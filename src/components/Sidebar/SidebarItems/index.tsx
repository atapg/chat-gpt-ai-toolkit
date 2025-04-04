import { IConversation } from '../../../types/interfaces/conversationTypes'
import { handleNavigation } from '../../../utils/navigation'
import './style.scss'

const SidebarItems = ({
	conversation,
	index,
	active,
}: {
	conversation: IConversation
	index: number
	active: boolean
}) => {
	// Function to handle the 3-dots button click
	const handleDotsClick = (e: React.MouseEvent) => {
		e.stopPropagation() // Prevents the list item click from being triggered
		// Here you can open a dropdown or perform actions related to the chat
		console.log('Show options for conversation:', conversation.id)
	}

	return (
		<li
			className={`sidebar-item ${active ? 'sidebar-item-active' : ''}`}
			data-testid={`history-item-${index}`}
		>
			<div draggable='true' className='sidebar-item-content group'>
				<div className='group-active-scale flex items-center'>
					<div
						onClick={() =>
							handleNavigation(`/c/${conversation.id}`)
						}
						className='sidebar-item-content'
						dir='auto'
						title={conversation.title}
						style={{
							maskImage: 'var(--sidebar-mask)',
							width: '100%',
						}}
					>
						{conversation.title}
					</div>
					{/* Add the 3-dots button */}
					<button
						className='options-btn'
						onClick={handleDotsClick}
						data-testid={`three-dots-${index}`}
					>
						•••
					</button>
				</div>
			</div>
		</li>
	)
}

export default SidebarItems
