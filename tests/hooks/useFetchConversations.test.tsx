import { renderHook, act } from '@testing-library/react'
import useFetchConversations from '../../src/hooks/useFetchConversations'
import { useFetch } from '../../src/hooks/useFetch'
import { useStorage } from '../../src/hooks/useStorage'
import { useHeader } from '../../src/hooks/useHeader'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../src/hooks/useFetch')
vi.mock('../../src/hooks/useStorage')
vi.mock('../../src/hooks/useHeader')

describe('useFetchConversations', () => {
	const mockDispatch = vi.fn()
	const mockGetToken = vi.fn().mockResolvedValue('token')
	const mockConversations = {
		items: [{ id: 'abc', title: 'Test' }],
		offset: 0,
		limit: 20,
		total: 40,
	}

	beforeEach(() => {
		vi.clearAllMocks()
		;(useStorage as any).mockReturnValue({
			dispatch: mockDispatch,
			state: { offset: 0, limit: 20, total: 40, finished: false },
		})
		;(useHeader as any).mockReturnValue({
			getToken: mockGetToken,
		})
		;(useFetch as any).mockImplementation(({ url }: any) => {
			if (url.includes('/conversations?')) {
				return { func: vi.fn().mockResolvedValue(mockConversations) }
			}

			if (url.includes('/conversation')) {
				return {
					func: vi.fn().mockResolvedValue({ current_node: '123' }),
				}
			}

			if (url.includes('/share')) {
				return {
					func: vi.fn().mockResolvedValue({ share_path: '/s/xyz' }),
				}
			}
		})
	})

	it('fetchConversations should fetch and dispatch correctly', async () => {
		const { result } = renderHook(() => useFetchConversations())

		await act(async () => {
			await result.current.fetchConversations()
		})

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'ADD_CONVERSATION',
			value: mockConversations.items,
		})
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'ADD_META',
			value: {
				offset: mockConversations.offset,
				limit: mockConversations.limit,
				total: mockConversations.total,
			},
		})
	})

	it('fetchNextConversations fetches if more remain', async () => {
		const { result } = renderHook(() => useFetchConversations())

		await act(async () => {
			await result.current.fetchNextConversations()
		})

		expect(mockDispatch).toHaveBeenCalled()
	})

	it('fetchNextConversations marks finished if no more items', async () => {
		// Set offset + limit >= total
		;(useStorage as any).mockReturnValue({
			dispatch: mockDispatch,
			state: { offset: 40, limit: 20, total: 40, finished: false },
		})

		const { result } = renderHook(() => useFetchConversations())

		await act(async () => {
			await result.current.fetchNextConversations()
		})

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'ADD_FINISHED',
			value: { finished: true },
		})
	})

	it('deleteConversation updates state and calls callback', async () => {
		const mockCallback = vi.fn().mockResolvedValue(undefined)

		const { result } = renderHook(() => useFetchConversations())

		await act(async () => {
			await result.current.deleteConversation('abc', mockCallback)
		})

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'DELETE_CONVERSATION',
			value: 'abc',
		})
		expect(mockCallback).toHaveBeenCalled()
	})

	it('shareConversation returns shared data', async () => {
		const { result } = renderHook(() => useFetchConversations())

		const shareData = await act(() =>
			result.current.shareConversation('abc')
		)

		expect(shareData).toEqual({ share_path: '/s/xyz' })
	})
})
