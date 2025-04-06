import Modal from '..'

const SidebarShareModal = ({
	showModal,
	toggleShowModal,
}: {
	showModal: boolean
	toggleShowModal: (show?: boolean) => void
}) => {
	const handleLinkCopy = () => {}

	return (
		<Modal
			show={showModal}
			toggleShow={toggleShowModal}
			title={<Modal.Title>Share public link to chat</Modal.Title>}
			loading={false}
		>
			<Modal.Content>
				<div className='w-full'>
					<p className='mb-6'>
						<span>
							Your name, custom instructions, and any messages you
							add after sharing stay private.{' '}
							<a
								href='https://help.openai.com/en/articles/7925741-chatgpt-shared-links-faq'
								className='text-token-text-secondary hover:text-token-text-tertiary inline-flex items-center gap-2 underline'
								target='_blank'
								rel='noreferrer'
							>
								Learn more
							</a>
						</span>
					</p>
				</div>
				<div className='border-token-border-medium bg-token-main-surface-primary text-token-text-secondary has-focus-visible:border-token-border-xheavy mb-2 flex items-center justify-between rounded-full border p-1.5 last:mb-2 sm:p-2'>
					<div className='relative ms-1 grow'>
						<input
							readOnly={true}
							className='bg-token-main-surface-primary w-full rounded-xl border-0 px-2 py-1 text-lg focus:ring-0 sm:py-2.5 text-token-text-tertiary'
							type='text'
							value='https://chatgpt.com/share/…'
						/>
						<div className='from-token-main-surface-primary pointer-events-none absolute top-0 right-0 bottom-0 w-12 bg-linear-to-l'></div>
					</div>
					<button
						className='btn relative btn-primary ms-4 mt-0 mr-0 rounded-full px-4 py-1 text-base font-bold sm:py-3'
						data-testid='create-link-shared-chat-button'
						onClick={handleLinkCopy}
					>
						<div className='flex w-full items-center justify-center gap-1.5'>
							<svg
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								aria-label=''
								className='icon-sm'
							>
								<path
									fill-rule='evenodd'
									clip-rule='evenodd'
									d='M18.2929 5.70711C16.4743 3.88849 13.5257 3.88849 11.7071 5.7071L10.7071 6.70711C10.3166 7.09763 9.68341 7.09763 9.29289 6.70711C8.90236 6.31658 8.90236 5.68342 9.29289 5.29289L10.2929 4.29289C12.8926 1.69323 17.1074 1.69323 19.7071 4.29289C22.3068 6.89256 22.3068 11.1074 19.7071 13.7071L18.7071 14.7071C18.3166 15.0976 17.6834 15.0976 17.2929 14.7071C16.9024 14.3166 16.9024 13.6834 17.2929 13.2929L18.2929 12.2929C20.1115 10.4743 20.1115 7.52572 18.2929 5.70711ZM15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L9.7071 15.7071C9.31658 16.0976 8.68341 16.0976 8.29289 15.7071C7.90236 15.3166 7.90236 14.6834 8.29289 14.2929L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289ZM6.7071 9.29289C7.09763 9.68342 7.09763 10.3166 6.7071 10.7071L5.7071 11.7071C3.88849 13.5257 3.88849 16.4743 5.7071 18.2929C7.52572 20.1115 10.4743 20.1115 12.2929 18.2929L13.2929 17.2929C13.6834 16.9024 14.3166 16.9024 14.7071 17.2929C15.0976 17.6834 15.0976 18.3166 14.7071 18.7071L13.7071 19.7071C11.1074 22.3068 6.89255 22.3068 4.29289 19.7071C1.69322 17.1074 1.69322 12.8926 4.29289 10.2929L5.29289 9.29289C5.68341 8.90237 6.31658 8.90237 6.7071 9.29289Z'
									fill='currentColor'
								></path>
							</svg>
							Create link
						</div>
					</button>
				</div>
			</Modal.Content>
		</Modal>
	)
}

export default SidebarShareModal
