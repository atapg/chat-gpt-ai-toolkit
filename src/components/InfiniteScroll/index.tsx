import React, { useEffect, useRef } from 'react'

interface InfiniteScrollProps {
	loadMore: () => void
	children: React.ReactNode
	hasMore: boolean
	loading: boolean
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
	loadMore,
	children,
	hasMore,
	loading,
}) => {
	const containerRef = useRef<HTMLDivElement | null>(null)

	const handleScroll = () => {
		if (!containerRef.current || loading || !hasMore) return

		const bottom =
			containerRef.current.scrollHeight ===
			containerRef.current.scrollTop + containerRef.current.clientHeight
		if (bottom) {
			loadMore()
		}
	}

	useEffect(() => {
		const currentContainer = containerRef.current
		if (currentContainer) {
			currentContainer.addEventListener('scroll', handleScroll)
		}

		return () => {
			if (currentContainer) {
				currentContainer.removeEventListener('scroll', handleScroll)
			}
		}
	}, [loading, hasMore])

	return (
		<div
			ref={containerRef}
			style={{ overflowY: 'auto', maxHeight: '800px' }}
			className='hide-scroll'
		>
			{children}
			{loading && <div>Loading...</div>}
			{!hasMore && <div>No more items to load.</div>}{' '}
		</div>
	)
}

export default InfiniteScroll
