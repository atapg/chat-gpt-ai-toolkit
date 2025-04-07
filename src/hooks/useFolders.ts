import { useEffect, useState } from 'react'
import { IFolder } from '../types/interfaces/folderTypes'
import { defaultFolders } from '../config/default'

export const useFolders = () => {
	const [folders, setFolders] = useState<IFolder[]>([])

	useEffect(() => {
		chrome.storage.local.get(['folders'], (result) => {
			if (result.folders) {
				setFolders(result.folders)
			} else {
				chrome.storage.local.set({ folders: defaultFolders }, () => {
					setFolders(defaultFolders)
				})
			}
		})
	}, [])

	return {
		folders,
	}
}
