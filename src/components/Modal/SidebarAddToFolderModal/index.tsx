import Modal from '..'
import { useFolder } from '../../../hooks/useFolder'
import { IFolder } from '../../../types/interfaces/folderTypes'
import FolderItems from '../../Folders/FolderItems'
import MoveFolder from '../../SvgIcons/MoveFolderIcon'
import RemoveIcon from '../../SvgIcons/RemoveIcon'

const SidebarAddToFolderModal = ({
	conversationId,
	conversationTitle,
	showModal,
	toggleShowModal,
}: {
	conversationId: string
	conversationTitle: string
	showModal: boolean
	toggleShowModal: (show?: boolean) => void
}) => {
	const {
		folders,
		addConversationToFolder,
		removeConversationFromFolder,
		isConversationInFolder,
	} = useFolder()

	return (
		<Modal
			show={showModal}
			toggleShow={toggleShowModal}
			title={<Modal.Title>Move to folder</Modal.Title>}
		>
			<Modal.Content>
				<div className='grow overflow-y-auto'>
					This will move <strong>{conversationTitle}</strong> to{' '}
					<i>Folder</i>.
				</div>
				<div className='text-token-text-tertiary mt-2 text-sm'>
					<div className='folders-wrapper'>
						<div className='folders-sidebar-container'>
							{folders.length > 0 ? (
								folders.map((folder, index) => (
									<FolderItems
										key={index}
										folder={folder}
										level={1}
										dropdownButtons={(f: IFolder) => (
											<>
												{!isConversationInFolder(
													f,
													conversationId
												) ? (
													<FolderItems.Button
														icon={<MoveFolder />}
														onClick={() => {
															addConversationToFolder(
																{
																	folderId:
																		f.id,
																	id: conversationId,
																	title: conversationTitle,
																},
																f.id
															)
														}}
													>
														Add To Folder
													</FolderItems.Button>
												) : (
													<FolderItems.Button
														style={{
															color: 'var(--text-error)',
														}}
														icon={
															<RemoveIcon
																style={{
																	fill: 'var(--text-error)',
																}}
															/>
														}
														onClick={() => {
															removeConversationFromFolder(
																conversationId,
																f.id
															)
														}}
													>
														Remove From Folder
													</FolderItems.Button>
												)}
											</>
										)}
									/>
								))
							) : (
								<p>No folders available</p>
							)}
						</div>
					</div>
				</div>
				<div className='flex w-full flex-row items-center justify-end'>
					<div className='flex-0'>
						<div className='flex flex-col gap-3 sm:flex-row-reverse mt-5 sm:mt-4'>
							<button
								className='btn relative btn-secondary'
								onClick={() => toggleShowModal(false)}
							>
								<div className='flex items-center justify-center'>
									Close
								</div>
							</button>
						</div>
					</div>
				</div>
			</Modal.Content>
		</Modal>
	)
}

export default SidebarAddToFolderModal
