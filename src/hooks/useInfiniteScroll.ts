import { useEffect } from 'react'
import { IUseInfiniteScroll } from '../types/interfaces/infiniteScrollTypes'

const useInfiniteScroll = ({
	func,
	loading,
	querySelector,
	removeEvent,
}: IUseInfiniteScroll) => {
	useEffect(() => {
		const targetElement = document.querySelector(querySelector)

		const handleScroll = async () => {
			if (!targetElement || loading) return

			const bottom =
				targetElement.scrollHeight -
					targetElement.scrollTop -
					targetElement.clientHeight <
				75

			if (bottom) {
				await func()
			}
		}

		targetElement?.addEventListener('scroll', handleScroll)

		if (removeEvent) {
			targetElement?.removeEventListener('scroll', handleScroll)
		}

		return () => {
			targetElement?.removeEventListener('scroll', handleScroll)
		}
	}, [loading])
}

export default useInfiniteScroll
