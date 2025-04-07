import { IFolder } from '../../types/interfaces/folderTypes'
import FolderItems from '../Folders/FolderItems'
import './style.scss'

const ExtensionSidebar = ({ folders }: { folders: IFolder[] }) => {
	return (
		<div className='folders-wrapper'>
			<div className='folders-sidebar-container'>
				{folders.length > 0 ? (
					folders.map((folder, index) => (
						<FolderItems key={index} folder={folder} level={1} />
					))
				) : (
					<p>No folders available</p>
				)}
			</div>
		</div>
	)
}

export default ExtensionSidebar
