import './style.scss'
import { IFolder } from '../../../types/interfaces/folderTypes'
import { ReactElement, ReactNode, useState } from 'react'
import ChevronBottom from '../../SvgIcons/ChevronBottom'
import ChevronRight from '../../SvgIcons/ChevronRight'
import SidebarItems from '../../Sidebar/SidebarItems'
import DropDown from '../../ContextMenu/DropDown'
import PencilIcon from '../../SvgIcons/PencilIcon'
import DeleteIcon from '../../SvgIcons/DeleteIcon'
import ChatIcon from '../../SvgIcons/ChatIcon'

const FolderItems = ({
	folder,
	level,
	children,
}: {
	folder: IFolder
	level: number
	children?: ReactNode
}) => {
	const [isOpen, setIsOpen] = useState(false)

	const handleToggle = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div className='folder-item-container'>
			<div
				className='folder-item-content'
				style={{
					paddingLeft: `${level * 10}px`,
				}}
			>
				<div className='folder-item-icon' onClick={handleToggle}>
					<span>
						{isOpen ? (
							<ChevronBottom
								style={{
									fill: 'var(--text-primary)',
								}}
							/>
						) : (
							<ChevronRight
								style={{
									fill: 'var(--text-primary)',
								}}
							/>
						)}
					</span>
				</div>
				<div className='group-active-scale folder-details-wrapper flex items-center'>
					<div className='folder-item-title' onClick={handleToggle}>
						{folder.name}
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
						{children}
						<DropDown.Item icon={<PencilIcon />}>
							Rename
						</DropDown.Item>
						<DropDown.Item
							onClick={() => {}}
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
			<div
				className={`folder-item-subfolders ${
					isOpen ? 'open-folder' : ''
				}`}
			>
				{folder.subFolders.map((subFolder) => (
					<FolderItems
						key={subFolder.id}
						folder={subFolder}
						level={level + 1}
					/>
				))}
				{folder.conversations.length > 0 ? (
					<ol>
						{folder.conversations.map((conversation, index) => (
							<SidebarItems
								key={conversation.id}
								conversation={conversation}
								active={false}
								index={index}
								level={level - 1}
								icon={
									<ChatIcon
										style={{
											fill: 'var(--text-primary)',
										}}
									/>
								}
							/>
						))}
					</ol>
				) : (
					<div className='folder-item-no-conversations'>
						No conversations in this folder
					</div>
				)}
			</div>
		</div>
	)
}

export default FolderItems

FolderItems.Button = ({
	children,
	icon,
	onClick,
	...rest
}: {
	children: ReactNode
	icon: ReactElement
	onClick: () => void
}) => {
	return (
		<DropDown.Item icon={icon} {...rest} onClick={onClick}>
			{children}
		</DropDown.Item>
	)
}
