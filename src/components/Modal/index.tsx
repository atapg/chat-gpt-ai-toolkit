import { createPortal } from 'react-dom'
import appConfig from '../../config/appConfig'
import { ReactNode } from 'react'
import Divider from '../UI/Divider'
import './style.scss'

const Modal = ({
	children,
	title,
	show,
	toggleShow,
}: {
	children?: ReactNode
	title?: ReactNode
	show: boolean
	toggleShow: (show?: boolean) => void
}) => {
	const handleOverlayClick = () => {
		toggleShow(false)
	}

	return (
		<>
			{show ? (
				createPortal(
					<>
						<div
							className='modal-overlay '
							onClick={handleOverlayClick}
						></div>
						<div className='modal-container flex flex-col items-center justify-between'>
							{title ? (
								<div
									style={{
										width: '100%',
										fontWeight: 'bold',
									}}
								>
									{title}
								</div>
							) : (
								<></>
							)}
							<Divider />
							{children}
						</div>
					</>,
					document.getElementById(
						appConfig.modalRootName
					) as HTMLElement
				)
			) : (
				<></>
			)}
		</>
	)
}

export default Modal

Modal.Content = ({ children }: { children?: ReactNode }) => {
	return (
		<div className='modal-content grow overflow-y-auto p-4 sm:p-6'>
			{children}
		</div>
	)
}

Modal.Title = ({ children }: { children?: ReactNode }) => {
	return <div className='modal-title p-4 sm:p-6'>{children}</div>
}
