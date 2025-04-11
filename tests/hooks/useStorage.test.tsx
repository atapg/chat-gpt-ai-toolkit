import { renderHook } from '@testing-library/react'
import { useStorage } from '../../src/hooks/useStorage'
import { StorageContext } from '../../src/context/StorageContext'
import { ReactNode } from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockDispatch = vi.fn()

const mockState = {
	conversations: [],
	offset: 0,
	limit: 20,
	total: 0,
	finished: false,
}

const wrapper = ({ children }: { children: ReactNode }) => (
	<StorageContext.Provider
		value={{ dispatch: mockDispatch, state: mockState }}
	>
		{children}
	</StorageContext.Provider>
)

describe('useStorage', () => {
	it('should return storage context value', () => {
		const { result } = renderHook(() => useStorage(), { wrapper })

		expect(result.current).toBeDefined()
		expect(result.current?.state).toEqual(mockState)
		expect(result.current?.dispatch).toBe(mockDispatch)
	})
})
