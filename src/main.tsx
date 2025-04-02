import { createRoot } from 'react-dom/client'

import './styles/_globals.scss'
import App from './App'
import { initialStorage, storageReducer } from './store/StorageReducer'
import { StorageProvider } from './store/StorageContext'
import ErrorBoundary from './components/Error/ErrorBoundary'

createRoot(document.getElementById('appRoot')!).render(
	<ErrorBoundary>
		<StorageProvider initialState={initialStorage} reducer={storageReducer}>
			<App />
		</StorageProvider>
	</ErrorBoundary>
)
