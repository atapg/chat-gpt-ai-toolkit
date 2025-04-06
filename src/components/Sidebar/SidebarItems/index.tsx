import { IConversation } from '../../../types/interfaces/conversationTypes'
import './style.scss'
import DropDown from '../../ContextMenu/DropDown'
import { useNavigation } from '../../../hooks/useNavigation'

const SidebarItems = ({
	conversation,
	index,
	active,
}: {
	conversation: IConversation
	index: number
	active: boolean
}) => {
	const { push } = useNavigation()
	return (
		<li
			className={`sidebar-item ${active ? 'sidebar-item-active' : ''}`}
			data-testid={`history-item-${index}`}
		>
			<div draggable='true' className='sidebar-item-content group'>
				<div className='group-active-scale flex items-center'>
					<div
						onClick={() => push(`/c/${conversation.id}`)}
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
						<DropDown.Item>Share</DropDown.Item>
						<DropDown.Item
							style={{
								color: 'var(--text-error)',
							}}
						>
							Delete
						</DropDown.Item>
					</DropDown>
				</div>
			</div>
			{/* {showDialog ? <SidebarItemContextMenu /> : <></>} */}
		</li>
	)
}

export default SidebarItems
