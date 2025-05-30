import './style.scss'
import {
	IFolder,
	IFolderUpdateData,
} from '../../../types/interfaces/folderTypes'
import {
	ComponentPropsWithoutRef,
	ReactElement,
	ReactNode,
	useEffect,
	useRef,
	useState,
} from 'react'
import ChevronBottom from '../../SvgIcons/ChevronBottom'
import ChevronRight from '../../SvgIcons/ChevronRight'
import SidebarItems from '../../Sidebar/SidebarItems'
import DropDown from '../../ContextMenu/DropDown'
import PencilIcon from '../../SvgIcons/PencilIcon'
import DeleteIcon from '../../SvgIcons/DeleteIcon'
import ChatIcon from '../../SvgIcons/ChatIcon'
import { useFolder } from '../../../hooks/useFolder'
import MoveFolder from '../../SvgIcons/MoveFolderIcon'
import { useHelpers } from '../../../hooks/useHelpers'

const FolderItems = ({
	folder,
	level,
	children,
	dropdownButtons,
}: {
	folder: IFolder
	level: number
	children?: ReactNode
	dropdownButtons?: (f: IFolder) => ReactNode
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const cachedFolderName = useRef<string>(folder.name)
	const [folderName, setFolderName] = useState(folder.name ? folder.name : '')
	const { removeFolder, createFolder, updateFolder } = useFolder()
	const { removeWhiteSpaceFromString, debounce } = useHelpers()
	const debouncedSave = useRef(
		debounce((data: IFolderUpdateData) => {
			saveFolderName(data)
		}, 500)
	).current

	const handleToggle = () => {
		setIsOpen(!isOpen)
	}

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				inputRef.current &&
				!inputRef.current.contains(event.target as Node)
			) {
				setIsEditing(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	useEffect(() => {
		if (
			removeWhiteSpaceFromString(cachedFolderName.current, true) !==
			removeWhiteSpaceFromString(folderName, true)
		) {
			if (!folderName) {
				setFolderName(cachedFolderName.current)
			} else {
				debouncedSave({ name: removeWhiteSpaceFromString(folderName) })
			}
		}
	}, [folderName])

	useEffect(() => {
		if (folder?.isNew) {
			setIsEditing(() => true)

			inputRef.current?.focus()

			updateFolder(folder.id, folder.parentId, {
				isNew: false,
			})
		}
	}, [])

	useEffect(() => {
		if (isEditing) {
			inputRef.current?.focus()
		}
	}, [isEditing])

	const saveFolderName = async (data: IFolderUpdateData) => {
		const result = await updateFolder(folder.id, folder.parentId, data)

		if (result && result.name) {
			setFolderName(result.name)
		}
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
						{isEditing ? (
							<input
								ref={inputRef}
								value={folderName}
								onChange={(e) => setFolderName(e.target.value)}
							/>
						) : (
							<span onDoubleClick={() => setIsEditing(true)}>
								{folderName}
							</span>
						)}
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
							icon={<MoveFolder />}
							onClick={() => {
								createFolder(undefined, folder.id)
							}}
						>
							New Folder
						</DropDown.Item>
						{folder.deletable ? (
							<DropDown.Item
								icon={<PencilIcon />}
								onClick={() => setIsEditing(true)}
							>
								Rename
							</DropDown.Item>
						) : (
							<></>
						)}
						{dropdownButtons && dropdownButtons(folder)}
						{folder.deletable ? (
							<DropDown.Item
								onClick={() => removeFolder(folder.id)}
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
						) : (
							<></>
						)}
					</DropDown>
				</div>
			</div>
			<div
				className={`folder-item-subfolders ${
					isOpen ? 'open-folder' : ''
				}`}
			>
				{folder.subFolders!.map((subFolder) => (
					<FolderItems
						key={subFolder.id}
						folder={subFolder}
						level={level + 1}
						dropdownButtons={dropdownButtons}
					>
						{children}
					</FolderItems>
				))}
				{folder.conversations.length > 0 ? (
					<ol>
						{folder.conversations.map((conversation, index) => (
							<SidebarItems
								key={conversation.id}
								conversation={conversation}
								active={false}
								index={index}
								level={level}
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
				) : folder.subFolders!.length <= 0 ? (
					<div
						style={{
							paddingLeft: `${level * 10 + 23.5}px`,
						}}
						className='folder-item-no-conversations'
					>
						The folder is empty
					</div>
				) : (
					<></>
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
} & ComponentPropsWithoutRef<'li'>) => {
	return (
		<DropDown.Item icon={icon} {...rest} onClick={onClick}>
			{children}
		</DropDown.Item>
	)
}
