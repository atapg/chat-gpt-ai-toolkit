import React, {
	useState,
	useRef,
	createContext,
	useContext,
	RefObject,
	useLayoutEffect,
	ReactElement,
} from 'react'
import './style.scss'
import { createPortal } from 'react-dom'
import appConfig from '../../config/appConfig'

const DropDownContext = createContext<any>({})

const DropDown = ({
	button,
	children,
}: {
	button: (toggleFunction: () => void) => React.JSX.Element
	children: React.ReactNode
	scrollableElement?: HTMLDivElement | null
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [style, setStyle] = useState({})
	const buttonRef = useRef<HTMLButtonElement>(null)
	const menuRef = useRef<HTMLDivElement>(null)

	const toggleDropdown = () => {
		setIsOpen(!isOpen)
		setStylesForMenu()
	}

	const handleOverlayClick = () => {
		setIsOpen(false)
	}

	const setStylesForMenu = () => {
		if (buttonRef.current && menuRef.current) {
			const rect = buttonRef.current.getBoundingClientRect()
			const menuHeight = menuRef.current.offsetHeight

			const fitsBelow = rect.bottom + menuHeight <= window.innerHeight

			setStyle({
				top: `${rect.bottom}px`,
				left: `${rect.left}px`,
				transform: fitsBelow ? 'none' : 'translateY(-100%)',
			})
		}
	}

	const setButtonRef = (ref: RefObject<HTMLButtonElement>) => {
		buttonRef.current = ref.current

		// Get position of the element
		setStylesForMenu()

		// Add event listener to the scrollable element (window or element)
	}

	useLayoutEffect(() => {
		if (isOpen) {
			setStylesForMenu()
		}
	}, [isOpen])

	return (
		<DropDownContext.Provider
			value={{
				isOpen,
				toggleDropdown,
				setButtonRef,
				closeDropdown: handleOverlayClick,
			}}
		>
			<>
				{button(toggleDropdown)}
				{isOpen ? (
					createPortal(
						<>
							<div
								className='dropdown-overlay '
								onClick={handleOverlayClick}
							></div>
							<div
								className='dropdown-menu-container'
								style={style}
								ref={menuRef}
							>
								<ul className='dropdown-menu'>{children}</ul>
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
		</DropDownContext.Provider>
	)
}

export default DropDown

DropDown.Item = ({
	children,
	icon,
	onClick,
	...rest
}: {
	icon?: ReactElement
	onClick?: () => void
	[key: string]: any
}) => {
	const { closeDropdown } = useContext(DropDownContext)

	return (
		<li
			className='dropdown-item'
			{...rest}
			onClick={() => {
				closeDropdown()
				onClick && onClick()
			}}
		>
			{icon ? <div className='dropdown-icon'>{icon}</div> : null}
			{children}
		</li>
	)
}

DropDown.Button = ({ children, ...rest }: { [key: string]: any }) => {
	const ref = useRef(null)
	const { setButtonRef } = useContext(DropDownContext)

	useLayoutEffect(() => {
		if (ref.current) {
			if (setButtonRef) {
				setButtonRef(ref)
			}
		}
	}, [])

	return (
		<button ref={ref} {...rest}>
			{children}
		</button>
	)
}

DropDown.Title = ({ children }: { children: React.ReactNode }) => {
	return <h1 className='dropdown-title'>{children}</h1>
}
