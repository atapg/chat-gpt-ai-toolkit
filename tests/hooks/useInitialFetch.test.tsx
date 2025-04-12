import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import useInitialFetch from '../../src/hooks/useInitialFetch'
import { AddConversationsToStateEnum } from '../../src/types/enums/conversationEnums'
import { act } from 'react-dom/test-utils'

const fetchConversations = vi.fn()
const setHeaderToken = vi.fn()

vi.mock('../../src/hooks/useFetchConversations', () => ({
	default: () => ({ fetchConversations }),
	__esModule: true,
}))
vi.mock('../../src/hooks/useHeader', () => ({
	useHeader: () => ({ setToken: setHeaderToken }),
	__esModule: true,
}))

const TestComponent = () => {
	useInitialFetch()
	return <div>Test</div>
}

describe('useInitialFetch', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('should handle headersRecieved event', async () => {
		render(<TestComponent />)

		const token = 'abc123'
		const event = new CustomEvent('headersRecieved', { detail: token })

		await act(async () => {
			window.dispatchEvent(event)
		})

		expect(setHeaderToken).toHaveBeenCalledWith(token)
		expect(fetchConversations).toHaveBeenCalledWith(
			undefined,
			undefined,
			token
		)
	})

	it('should handle newChatCreated event', async () => {
		render(<TestComponent />)

		await act(async () => {
			const event = new Event('newChatCreated')
			window.dispatchEvent(event)
		})

		expect(fetchConversations).toHaveBeenCalledWith(
			1,
			0,
			'',
			AddConversationsToStateEnum.PREPEND
		)
	})
})
