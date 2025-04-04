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
	return (
		<li
			className={`sidebar-item ${active ? 'sidebar-item-active' : ''}`}
			data-testid={`history-item-${index}`}
			onClick={() => handleNavigation(`/c/${conversation.id}`)}
		>
			<div draggable='true' className='sidebar-item-content group'>
				<div
					className='group-active-scale flex items-center'
					style={{ maskImage: 'var(--sidebar-mask)', width: '100%' }}
				>
					<div
						className='sidebar-item-content'
						dir='auto'
						title={conversation.title}
					>
						{conversation.title}
					</div>
				</div>
			</div>
		</li>
	)
}

export default SidebarItems
