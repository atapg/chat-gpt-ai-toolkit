import React, {
	useState,
	useRef,
	createContext,
	useContext,
	RefObject,
	useLayoutEffect,
} from 'react'
import './style.scss'
import { createPortal } from 'react-dom'

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
	const overlayRef = useRef<HTMLDivElement | null>(null)
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
			value={{ isOpen, toggleDropdown, setButtonRef }}
		>
			<>
				{button(toggleDropdown)}
				{isOpen &&
					createPortal(
						<>
							<div
								className='dropdown-overlay'
								ref={overlayRef}
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
						document.getElementById('modalRoot') as HTMLElement
					)}
			</>
		</DropDownContext.Provider>
	)
}

export default DropDown

DropDown.Item = ({ children, ...rest }: { [key: string]: any }) => {
	return (
		<li className='dropdown-item' {...rest}>
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
