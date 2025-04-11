import { renderHook, act } from '@testing-library/react'
import useFetch from '../../src/hooks/useFetch'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockData = { message: 'success' }

describe('useFetch', () => {
	beforeEach(() => {
		global.fetch = vi.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(mockData),
			})
		) as unknown as typeof fetch
	})

	it('should fetch data successfully and update states', async () => {
		const { result } = renderHook(() =>
			useFetch<{ message: string }>({
				url: 'https://api.example.com/data',
			})
		)

		await act(async () => {
			await result.current.func()
		})

		expect(result.current.data).toEqual(mockData)
		expect(result.current.isLoading).toBe(false)
		expect(result.current.error).toBe(null)
	})

	it('should handle fetch failure', async () => {
		global.fetch = vi.fn(() =>
			Promise.resolve({
				ok: false,
				statusText: 'Not Found',
			})
		) as unknown as typeof fetch

		const { result } = renderHook(() =>
			useFetch({ url: 'https://api.example.com/data' })
		)

		await act(async () => {
			await result.current.func()
		})

		expect(result.current.data).toBe(null)
		expect(result.current.isLoading).toBe(false)
		expect(result.current.error).toBe('Error: Not Found')
	})
})
