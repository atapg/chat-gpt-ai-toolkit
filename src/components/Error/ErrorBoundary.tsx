import React, { Component, ReactNode } from 'react'
import { IErrorBoundaryState } from '../../types/interfaces/errorBoundaryTypes'

class ErrorBoundary extends Component<
	{ children: ReactNode },
	IErrorBoundaryState
> {
	constructor(props: { children: ReactNode }) {
		super(props)
		this.state = { hasError: false, error: null, errorInfo: null }
	}

	static getDerivedStateFromError(error: Error): IErrorBoundaryState {
		// Update state so the next render will show the fallback UI
		return { hasError: true, error: error, errorInfo: null }
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		// You can log the error to an error reporting service here
		console.error('Error caught by Error Boundary:', error, errorInfo)
		this.setState({
			errorInfo: errorInfo,
		})
	}

	render() {
		if (this.state.hasError) {
			// Customize the fallback UI based on error information
			return (
				<div>
					<h1>Something went wrong.</h1>
					<details style={{ whiteSpace: 'pre-wrap' }}>
						{this.state.error && this.state.error.toString()}
						<br />
						{this.state.errorInfo?.componentStack}
					</details>
				</div>
			)
		}

		return this.props.children
	}
}

export default ErrorBoundary
