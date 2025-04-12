import React from 'react'
import { renderHook } from '@testing-library/react'
import { useFolder } from '../../src/hooks/useFolder'
import { FoldersContext } from '../../src/context/FoldersContext'
import { describe, it, expect, vi } from 'vitest'

describe('useFolder', () => {
	it('returns the context value from FoldersContext', () => {
		const mockValue = {
			folders: [
				{
					id: '1',
					name: 'Folder 1',
					parentId: null,
					conversations: [],
					subFolders: [],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			addFolder: vi.fn(),
			removeFolder: vi.fn(),
			setFolders: vi.fn(),
			addConversationToFolder: vi.fn(),
		}

		const wrapper = ({ children }: any) => (
			<FoldersContext.Provider value={mockValue}>
				{children}
			</FoldersContext.Provider>
		)

		const { result } = renderHook(() => useFolder(), { wrapper })

		expect(result.current).toEqual(mockValue)
	})
})
