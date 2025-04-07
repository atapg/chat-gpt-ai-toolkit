import { useEffect, useState } from 'react'
import { IFolder } from '../types/interfaces/folderTypes'
import { defaultFolders } from '../config/default'
import { useChromeStorage } from './useChromeStorage'

export const useFolders = () => {
	const [folders, setFolders] = useState<IFolder[]>([])
	const { get, set } = useChromeStorage()

	useEffect(() => {
		get<IFolder[]>('folders').then((result) => {
			if (result) {
				setFolders(result)
			} else {
				set('folders', defaultFolders).then(() => {
					setFolders(defaultFolders)
				})
			}
		})
	}, [])

	return {
		folders,
	}
}
