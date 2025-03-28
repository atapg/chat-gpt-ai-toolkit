import { createPortal } from 'react-dom'
import './style.scss'

const ToolkitButton = () => {
	const portalElement = document.querySelector('#rooooooooooooooot')

	if (!portalElement) {
		return null
	}

	return createPortal(
		<span className='neon-button'>REACT BUTTON</span>,
		portalElement
	)
}

export default ToolkitButton
