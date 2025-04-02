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
				targetElement.scrollHeight -
					targetElement.scrollTop -
					targetElement.clientHeight <
				75

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
