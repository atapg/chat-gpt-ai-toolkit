import { renderHook, act } from '@testing-library/react'
import { useChromeStorage } from '../../src/hooks/useChromeStorage'

global.chrome = {
	storage: {
		local: {
			get: vi.fn(),
			set: vi.fn(),
		},
	},
} as any

describe('useChromeStorage', () => {
	it('should get value from chrome storage', async () => {
		const mockGet = chrome.storage.local.get as vi.Mock
		mockGet.mockImplementation((keys, callback) => {
			callback({ 'some-key': 'stored-value' })
		})

		const { result } = renderHook(() => useChromeStorage())
		const value = await result.current.get('some-key')

		expect(value).toBe('stored-value')
		expect(mockGet).toHaveBeenCalledWith(['some-key'], expect.any(Function))
	})

	it('should set value in chrome storage', async () => {
		const mockSet = chrome.storage.local.set as vi.Mock
		mockSet.mockImplementation((items, callback) => {
			callback()
		})

		const { result } = renderHook(() => useChromeStorage())
		await act(async () => {
			await result.current.set('some-key', 'new-value')
		})

		expect(mockSet).toHaveBeenCalledWith(
			{ 'some-key': 'new-value' },
			expect.any(Function)
		)
	})

	it('should get or set default value when no value exists', async () => {
		const mockGet = chrome.storage.local.get as vi.Mock
		const mockSet = chrome.storage.local.set as vi.Mock

		// Simulate that no value exists for the key
		mockGet.mockImplementation((keys, callback) => {
			callback({})
		})
		mockSet.mockImplementation((items, callback) => {
			callback()
		})

		const { result } = renderHook(() => useChromeStorage())
		const defaultValue = 'default-value'

		const value = await result.current.getOrSet('some-key', defaultValue)

		expect(value).toBe(defaultValue)
		expect(mockSet).toHaveBeenCalledWith(
			{ 'some-key': defaultValue },
			expect.any(Function)
		)
	})

	it('should get existing value if present', async () => {
		const mockGet = chrome.storage.local.get as vi.Mock
		mockGet.mockImplementation((keys, callback) => {
			callback({ 'some-key': 'stored-value' })
		})

		const { result } = renderHook(() => useChromeStorage())
		const defaultValue = 'default-value'

		const value = await result.current.getOrSet('some-key', defaultValue)

		expect(value).toBe('stored-value')
		expect(mockGet).toHaveBeenCalledWith(['some-key'], expect.any(Function))
	})
})
