import { createRoot } from 'react-dom/client'

import './styles/_globals.scss'
import App from './App'
import { initialStorage, storageReducer } from './reducers/StorageReducer'
import { StorageProvider } from './context/StorageContext'
import ErrorBoundary from './components/Error/ErrorBoundary'

createRoot(document.getElementById('appRoot')!).render(
	<ErrorBoundary>
		<StorageProvider initialState={initialStorage} reducer={storageReducer}>
			<App />
		</StorageProvider>
	</ErrorBoundary>
)
