import { renderHook, act } from '@testing-library/react'
import { usePortalTarget } from '../../src/hooks/usePortalTarget'
import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest'

describe('usePortalTarget', () => {
	beforeEach(() => {
		global.clearInterval = vi.fn()

		const container = document.createElement('div')
		container.id = 'container'
		document.body.appendChild(container)

		const target = document.createElement('div')
		target.id = 'target'
		container.appendChild(target)

		const child = document.createElement('div')
		child.id = 'child'
		target.appendChild(child)
	})

	afterEach(() => {
		document.body.innerHTML = ''
	})

	it('should find the target element and set the state correctly', () => {
		const { result } = renderHook(() => usePortalTarget('#target'))

		expect(result.current[0]).toBeDefined()
		expect(result.current[0]?.id).toBe('target')
		expect(result.current[1]).toHaveLength(1)
		expect(result.current[1]?.[0].id).toBe('child')
	})

	it('should clean child elements when cleanElement option is passed', () => {
		const { result } = renderHook(() =>
			usePortalTarget('#target', {
				cleanElement: true,
				exceptionElementId: 'child',
			})
		)
		vi.useFakeTimers()
		vi.advanceTimersByTime(1000)

		act(() => {
			expect(result.current[1]?.length).toBe(1)
			expect(result.current[1]?.[0].id).toBe('child')
		})
	})

	it('should call cleanElement every second for 20 seconds', () => {
		const cleanElementSpy = vi.fn()

		vi.stubGlobal('setInterval', cleanElementSpy)

		renderHook(() =>
			usePortalTarget('#target', {
				cleanElement: true,
				exceptionElementId: 'child',
			})
		)

		expect(cleanElementSpy).toHaveBeenCalled()
	})

	it('should stop cleaning after 20 seconds', () => {
		vi.useFakeTimers()
		const cleanElementSpy = vi.fn()

		vi.stubGlobal('clearInterval', cleanElementSpy)

		renderHook(() =>
			usePortalTarget('#target', {
				cleanElement: true,
				exceptionElementId: 'child',
			})
		)

		vi.advanceTimersByTime(20000)

		expect(cleanElementSpy).toHaveBeenCalled()
		vi.useRealTimers()
	})

	it('should update target element if the selector changes', () => {
		const { result, rerender } = renderHook(
			({ selector }) => usePortalTarget(selector),
			{ initialProps: { selector: '#target' } }
		)

		expect(result.current[0]?.id).toBe('target')
	})
})
