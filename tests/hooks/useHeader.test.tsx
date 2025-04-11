import { renderHook } from '@testing-library/react'
import { useHeader } from '../../src/hooks/useHeader'
import * as useChromeStorageModule from '../../src/hooks/useChromeStorage'
import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('useHeader', () => {
	it('should call set with the token', async () => {
		const setMock = vi.fn().mockResolvedValue(undefined)
		vi.spyOn(useChromeStorageModule, 'useChromeStorage').mockReturnValue({
			get: vi.fn(),
			set: setMock,
		})

		const { result } = renderHook(() => useHeader())

		await result.current.setToken('abc123')

		expect(setMock).toHaveBeenCalledWith('token', 'abc123')
	})

	it('should call get and return the token', async () => {
		const getMock = vi.fn().mockResolvedValue('abc123')
		vi.spyOn(useChromeStorageModule, 'useChromeStorage').mockReturnValue({
			get: getMock,
			set: vi.fn(),
		})

		const { result } = renderHook(() => useHeader())

		const token = await result.current.getToken()

		expect(getMock).toHaveBeenCalledWith('token')
		expect(token).toBe('abc123')
	})
})
