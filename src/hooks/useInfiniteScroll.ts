import { useEffect } from 'react'
import { IUseInfiniteScroll } from '../types/interfaces/infiniteScrollTypes'

const useInfiniteScroll = ({
	func,
	loading,
	querySelector,
}: IUseInfiniteScroll) => {
	useEffect(() => {
		const targetElement = document.querySelector(querySelector)

		const handleScroll = () => {
			if (!targetElement || loading) return

			const bottom =
				targetElement.scrollHeight - 550 < targetElement.scrollTop

			if (bottom) {
				func()
			}
		}

		targetElement?.addEventListener('scroll', handleScroll)

		return () => {
			targetElement?.removeEventListener('scroll', handleScroll)
		}
	}, [loading])
}

export default useInfiniteScroll
