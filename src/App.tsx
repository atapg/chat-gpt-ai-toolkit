import './test.css'

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<p>Hello Ataaa</p>
				<button
					onClick={() => {
						console.log('Clicked react button')
					}}
				>
					Clicker
				</button>
			</header>
		</div>
	)
}

export default App
