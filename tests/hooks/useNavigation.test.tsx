import { renderHook } from '@testing-library/react'
import { useNavigation } from '../../src/hooks/useNavigation'
import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('useNavigation', () => {
	it('should call pushState and dispatch popstate event', () => {
		const pushStateSpy = vi.spyOn(window.history, 'pushState')
		const dispatchEventSpy = vi.spyOn(window, 'dispatchEvent')

		const { result } = renderHook(() => useNavigation())
		result.current.push('/test-url')

		expect(pushStateSpy).toHaveBeenCalledWith({}, '', '/test-url')
		expect(dispatchEventSpy).toHaveBeenCalledWith(new Event('popstate'))
	})
})
