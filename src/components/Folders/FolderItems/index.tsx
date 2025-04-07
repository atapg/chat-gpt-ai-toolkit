import './style.scss'
import { IFolder } from '../../../types/interfaces/folderTypes'
import { useState } from 'react'
import ChevronBottom from '../../SvgIcons/ChevronBottom'
import ChevronRight from '../../SvgIcons/ChevronRight'
import SidebarItems from '../../Sidebar/SidebarItems'

const FolderItems = ({ folder, level }: { folder: IFolder; level: number }) => {
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
				onClick={handleToggle}
			>
				<div className='folder-item-icon'>
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
				<div className='folder-item-title'>{folder.name}</div>
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
