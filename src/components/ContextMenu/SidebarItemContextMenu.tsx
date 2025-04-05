import { useEffect, useRef, useState } from 'react'
import './style.scss'
const SidebarItemContextMenu = ({
	elementToBeStickedTo,
}: {
	elementToBeStickedTo: React.RefObject<null>
}) => {
	const [style, setStyle] = useState({})
	const [initial, setInitial] = useState(false)
	const element = useRef(null)

	useEffect(() => {
		const handleScroll = () => {
			if (elementToBeStickedTo.current) {
				const rect = (
					elementToBeStickedTo.current as HTMLElement
				).getBoundingClientRect()

				if (rect.bottom > 0 || rect.right > 0) {
					setInitial(true)
				}

				const s = {
					top: rect.bottom,
					left: rect.right,
				}

				setStyle(s)

				// if (element.current) {
				// 	const menuElement = (
				// 		element.current as HTMLElement
				// 	).getBoundingClientRect()

				// if (window.innerHeight - 150 < menuElement.top) {
				// 	const s = {
				// 		top: rect.top,
				// 		left: rect.right,
				// 		transform: `translate(0, -100%)`,
				// 	}

				// 	setStyle(s)
				// } else {

				// }
				// }
			}
		}

		handleScroll()

		window.addEventListener('scroll', handleScroll, { passive: true })

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		<>
			{initial ? (
				<div
					ref={element}
					className='sidebar-item-context-menu'
					style={style}
				>
					<ol>
						<li>Share</li>
						<li>Delete</li>
					</ol>
				</div>
			) : (
				<></>
			)}
		</>
	)
}

export default SidebarItemContextMenu
