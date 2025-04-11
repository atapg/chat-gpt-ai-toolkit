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
import SidebarAddToFolderModal from '../../Modal/SidebarAddToFolderModal'

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
	const [showDeleteModal, setshowDeleteModal] = useState<boolean>(false)
	const [showShareModal, setShowShareModal] = useState<boolean>(false)
	const [showMoveToFolderModal, setShowMoveToFolderModal] =
		useState<boolean>(false)

	const toggleAddToFolderModal = (show?: boolean) => {
		setShowMoveToFolderModal((prevShow) => (show ? show : !prevShow))
	}

	const toggleshowDeleteModal = (show?: boolean) => {
		setshowDeleteModal((prevShow) => (show ? show : !prevShow))
	}

	const toggleShowShareModal = (show?: boolean) => {
		setShowShareModal((prevShow) => (show ? show : !prevShow))
	}

	return (
		<>
			<li
				className={`sidebar-item ${
					active ? 'sidebar-item-active' : ''
				}`}
				data-testid={`history-item-${index}`}
			>
				<div
					draggable='true'
					className='sidebar-item-content group sidebar-item-wrapper'
				>
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
								onClick={() => toggleAddToFolderModal(true)}
								icon={<MoveFolder />}
							>
								Move to Folder
							</DropDown.Item>
							<DropDown.Item icon={<PencilIcon />}>
								Rename
							</DropDown.Item>
							<DropDown.Item
								onClick={() => toggleshowDeleteModal(true)}
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
			{showDeleteModal ? (
				<SidebarDeleteModal
					conversationId={conversation.id}
					conversationTitle={conversation.title}
					showModal={showDeleteModal}
					toggleShowModal={toggleshowDeleteModal}
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
			{showMoveToFolderModal ? (
				<SidebarAddToFolderModal
					conversationId={conversation.id}
					conversationTitle={conversation.title}
					showModal={showMoveToFolderModal}
					toggleShowModal={toggleAddToFolderModal}
				/>
			) : (
				<> </>
			)}
		</>
	)
}

export default SidebarItems
