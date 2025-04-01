export {}

declare global {
	interface Window {
		__headers__: IRequestHeaders // Ensure this matches the type you are using
	}
}
