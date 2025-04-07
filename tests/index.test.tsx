import { render } from '@testing-library/react'
import ErrorBoundary from '../src/components/Error/ErrorBoundary'
import { StorageProvider } from '../src/context/StorageContext'
import { initialStorage, storageReducer } from '../src/reducers/StorageReducer'
import App from '../src/App'

describe('App Initialization', () => {
	it('renders the application without crashing', () => {
		const { container } = render(
			<ErrorBoundary>
				<StorageProvider
					initialState={initialStorage}
					reducer={storageReducer}
				>
					<App />
				</StorageProvider>
			</ErrorBoundary>
		)

		expect(container).toBeInTheDocument()
	})
})
