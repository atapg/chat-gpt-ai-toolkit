import { useContext } from 'react'
import { FoldersContext } from '../context/FoldersContext'

export const useFolders = () => useContext(FoldersContext)
