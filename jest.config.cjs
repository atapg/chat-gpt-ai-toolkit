module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jest-environment-jsdom',
	setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
	testMatch: ['<rootDir>/tests/**/*.(test|spec).{js,jsx,ts,tsx}'],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
		'^.+\\.(js|jsx)$': 'babel-jest',
		'^.+\\.scss$': 'jest-transform-stub',
	},
	moduleNameMapper: {
		'\\.scss$': 'jest-transform-stub',
	},
}
