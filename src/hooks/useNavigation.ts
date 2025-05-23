export const useNavigation = () => {
	const push = (url: string) => {
		window.history.pushState({}, '', url)

		window.dispatchEvent(new Event('popstate'))
	}

	return {
		push,
	}
}
