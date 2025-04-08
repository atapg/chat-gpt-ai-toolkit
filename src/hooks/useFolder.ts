import { useContext } from 'react'
import { FoldersContext } from '../context/FoldersContext'

export const useFolder = () => useContext(FoldersContext)
