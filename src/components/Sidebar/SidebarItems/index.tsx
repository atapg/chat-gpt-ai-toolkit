import { IConversation } from '../../../types/interfaces/conversationTypes'
import './style.scss'
import DropDown from '../../ContextMenu/DropDown'
import { useNavigation } from '../../../hooks/useNavigation'
import ShareIcon from '../../SvgIcons/ShareIcon'
import DeleteIcon from '../../SvgIcons/DeleteIcon'
import PencilIcon from '../../SvgIcons/PencilIcon'
import { ReactNode, useState } from 'react'
import SidebarDeleteModal from '../../Modal/SidebarDeleteModal'
import SidebarShareModal from '../../Modal/SidebarShareModal'
import { IFolderConversation } from '../../../types/interfaces/folderTypes'
import MoveFolder from '../../SvgIcons/MoveFolder'

const SidebarItems = ({
	conversation,
	index,
	active,
	level = 0,
	icon,
}: {
	conversation: IConversation | IFolderConversation
	index: number
	active: boolean
	level?: number
	icon?: ReactNode
}) => {
	const { push } = useNavigation()
	const [showModal, setShowModal] = useState<boolean>(false)
	const [showShareModal, setShowShareModal] = useState<boolean>(false)

	const toggleShowModal = (show?: boolean) => {
		if (show) {
			setShowModal(show)
		} else {
			setShowModal((prevShow) => !prevShow)
		}
	}

	const toggleShowShareModal = (show?: boolean) => {
		if (show) {
			setShowShareModal(show)
		} else {
			setShowShareModal((prevShow) => !prevShow)
		}
	}

	return (
		<>
			<li
				className={`sidebar-item ${
					active ? 'sidebar-item-active' : ''
				}`}
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
								paddingLeft: `${level * 10}px`,
							}}
						>
							<span style={{ marginRight: '4px' }}>
								{icon ? icon : <></>}
							</span>
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
							<DropDown.Item
								onClick={() => toggleShowShareModal(true)}
								icon={<ShareIcon />}
							>
								Share
							</DropDown.Item>
							<DropDown.Item
								onClick={() => {}}
								icon={<MoveFolder />}
							>
								Move to Folder
							</DropDown.Item>
							<DropDown.Item icon={<PencilIcon />}>
								Rename
							</DropDown.Item>
							<DropDown.Item
								onClick={() => toggleShowModal(true)}
								style={{
									color: 'var(--text-error)',
								}}
								icon={
									<DeleteIcon
										style={{
											fill: 'var(--text-error)',
										}}
									/>
								}
							>
								Delete
							</DropDown.Item>
						</DropDown>
					</div>
				</div>
			</li>
			{showModal ? (
				<SidebarDeleteModal
					conversationId={conversation.id}
					conversationTitle={conversation.title}
					showModal={showModal}
					toggleShowModal={toggleShowModal}
				/>
			) : (
				<></>
			)}
			{showShareModal ? (
				<SidebarShareModal
					conversationId={conversation.id}
					showModal={showShareModal}
					toggleShowModal={toggleShowShareModal}
				/>
			) : (
				<> </>
			)}
		</>
	)
}

export default SidebarItems
