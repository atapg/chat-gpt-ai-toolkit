import { render, screen } from '@testing-library/react'

vi.mock('../src/hooks/useInitialFetch', () => ({
	default: vi.fn(),
}))

vi.mock('../src/components/Sidebar', () => ({
	default: () => <div data-testid='sidebar-wrapper' />,
}))

vi.mock('../src/components/Dev', () => ({
	default: () => <div data-testid='dev-component' />,
}))

import App from '../src/App'
import useInitialFetch from '../src/hooks/useInitialFetch'

describe('App', () => {
	it('calls useInitialFetch and renders child components', () => {
		render(<App />)

		expect(useInitialFetch).toHaveBeenCalled()
		expect(screen.getByTestId('sidebar-wrapper')).toBeInTheDocument()
		expect(screen.getByTestId('dev-component')).toBeInTheDocument()
	})
})
