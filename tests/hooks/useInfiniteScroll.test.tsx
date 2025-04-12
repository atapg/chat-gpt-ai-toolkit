import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import useInfiniteScroll from '../../src/hooks/useInfiniteScroll'

const mockFunc = vi.fn()

const TestComponent = () => {
	useInfiniteScroll({
		func: mockFunc,
		loading: false,
		querySelector: '#scroll-container',
	})

	return (
		<div
			id='scroll-container'
			style={{ height: '200px', overflow: 'auto' }}
		>
			<div style={{ height: '1000px' }}>Scrollable Content</div>
		</div>
	)
}

describe('useInfiniteScroll', () => {
	beforeEach(() => {
		mockFunc.mockClear()
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('calls func when scrolled near bottom', async () => {
		const { container } = render(<TestComponent />)

		const el = container.querySelector('#scroll-container')!

		Object.defineProperties(el, {
			scrollTop: {
				get: () => 825,
			},
			scrollHeight: {
				get: () => 1000,
			},
			clientHeight: {
				get: () => 150,
			},
		})

		el.dispatchEvent(new Event('scroll'))

		await new Promise((r) => setTimeout(r, 50))

		expect(mockFunc).toHaveBeenCalled()
	})
})
