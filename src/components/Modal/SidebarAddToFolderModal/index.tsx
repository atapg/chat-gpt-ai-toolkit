import Modal from '..'
import { useFolder } from '../../../hooks/useFolder'
import FolderItems from '../../Folders/FolderItems'
import DeleteIcon from '../../SvgIcons/DeleteIcon'
import MoveFolder from '../../SvgIcons/MoveFolderIcon'

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
		moveConversationToFolder,
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
									>
										{/* If conversation is not in the folder then show this */}
										{!isConversationInFolder(
											folder.id,
											conversationId
										) ? (
											<>
												<FolderItems.Button
													icon={<MoveFolder />}
													onClick={() => {
														moveConversationToFolder(
															{
																folderId:
																	folder.id,
																id: conversationId,
																title: conversationTitle,
															},
															folder.id
														)
													}}
												>
													Move Here
												</FolderItems.Button>

												<FolderItems.Button
													icon={<MoveFolder />}
													onClick={() => {
														addConversationToFolder(
															{
																folderId:
																	folder.id,
																id: conversationId,
																title: conversationTitle,
															},
															folder.id
														)
													}}
												>
													Add Here
												</FolderItems.Button>
											</>
										) : (
											<></>
										)}
										{/* If conversation is in the folder, then show remove btn */}
										{isConversationInFolder(
											folder.id,
											conversationId
										) ? (
											<FolderItems.Button
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
												onClick={() => {
													removeConversationFromFolder(
														conversationId
													)
												}}
											>
												Remove
											</FolderItems.Button>
										) : (
											<></>
										)}
									</FolderItems>
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
