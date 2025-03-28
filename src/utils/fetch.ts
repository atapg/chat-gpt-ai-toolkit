const originalFetch = window.fetch

window.fetch = async function (...args) {
	const response = await originalFetch(...args)
	console.log('Here')
	console.log(response)
	return response
}
