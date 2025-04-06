import { IConversation } from '../../../types/interfaces/conversationTypes'
import { handleNavigation } from '../../../utils/navigation'
import './style.scss'
import DropDown from '../../ContextMenu/DropDown'

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
					<DropDown
						button={(toggleFunction: () => void) => (
							<DropDown.Button
								onClick={toggleFunction}
								className='options-btn'
							>
								•••
							</DropDown.Button>
						)}
					>
						<DropDown.Item>Delete</DropDown.Item>
						<DropDown.Item>Share</DropDown.Item>
					</DropDown>
				</div>
			</div>
			{/* {showDialog ? <SidebarItemContextMenu /> : <></>} */}
		</li>
	)
}

export default SidebarItems
