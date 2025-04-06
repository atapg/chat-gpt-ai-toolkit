import Modal from '..'
import useFetchConversations from '../../../hooks/useFetchConversations'
import { useNavigation } from '../../../hooks/useNavigation'
import { IConversation } from '../../../types/interfaces/conversationTypes'

const SidebarDeleteModal = ({
	conversation,
	showModal,
	toggleShowModal,
}: {
	conversation: IConversation
	showModal: boolean
	toggleShowModal: (show?: boolean) => void
}) => {
	const { push } = useNavigation()
	const { deleteConversation } = useFetchConversations()

	return (
		<Modal
			show={showModal}
			toggleShow={toggleShowModal}
			title={<Modal.Title>Delete chat?</Modal.Title>}
		>
			<Modal.Content>
				<div className='grow overflow-y-auto'>
					This will delete <strong>{conversation.title}</strong>.
				</div>
				<div className='text-token-text-tertiary mt-2 text-sm'>
					To clear any memories from this chat, visit your{' '}
					<span
						onClick={() => {
							toggleShowModal(false)
							push(
								`/c/${conversation.id}#settings/Personalization`
							)
						}}
						className='underline cursor-pointer'
						data-discover='true'
					>
						settings
					</span>
					.
				</div>
				<div className='flex w-full flex-row items-center justify-end'>
					<div className='flex-0'>
						<div className='flex flex-col gap-3 sm:flex-row-reverse mt-5 sm:mt-4'>
							<button
								className='btn relative btn-danger'
								onClick={() => {
									toggleShowModal(false)
									deleteConversation(conversation.id)
								}}
							>
								<div className='flex items-center justify-center'>
									Delete
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

export default SidebarDeleteModal
