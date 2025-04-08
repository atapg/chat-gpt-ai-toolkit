import Modal from '..'
import { useFolder } from '../../../hooks/useFolder'
import FolderItems from '../../Folders/FolderItems'

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
	const { folders } = useFolder()

	console.log(folders)

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
										options={{ addBtn: true }}
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
								className='btn relative btn-primary'
								onClick={() => {
									toggleShowModal(false)
									// addToFolder({
									// 	conversationId,
									// 	conversationTitle,
									// })
									console.log(conversationId)
								}}
							>
								<div className='flex items-center justify-center'>
									Move
								</div>
							</button>
							<button
								className='btn relative btn-secondary'
								onClick={() => toggleShowModal(false)}
							>
								<div className='flex items-center justify-center'>
									Cancel
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
