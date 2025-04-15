import { useFolder } from '../../../hooks/useFolder'
import MoveFolder from '../../SvgIcons/MoveFolderIcon'
import './style.scss'

const FolderBar = () => {
	const { createFolder } = useFolder()

	return (
		<div className='folder-bar-container mb-5'>
			<div className='search-input-container w-100'>
				<input
					type='text'
					className='search-input w-100'
					placeholder='Search folder, conversation...'
				/>
			</div>
			<div className='folder-add-btn-container'>
				<button
					onClick={() => {
						createFolder()
					}}
					className='flex items-center justify-center h-9 rounded-full border border-token-border-light text-token-text-secondary w-9 can-hover:hover:bg-token-main-surface-secondary'
				>
					<div className='flex items-center justify-center'>
						<MoveFolder
							style={{
								fill: 'var(--text-primary)',
							}}
						/>
					</div>
				</button>
			</div>
		</div>
	)
}

export default FolderBar
