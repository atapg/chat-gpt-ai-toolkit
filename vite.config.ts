import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig({
	plugins: [react()],
	build: {
		minify: false,
		rollupOptions: {
			input: {
				index: 'index.html',
				background: 'src/scripts/background/background.ts',
				content: 'src/scripts/content/content.ts',
				interceptor: 'src/scripts/interceptor/interceptor.ts',
				fetch: 'src/utils/fetch.ts',
			},
			output: {
				dir: 'dist',
				entryFileNames: '[name].js',
				chunkFileNames: '[name].js',
				assetFileNames: '[name].[ext]',
				// Create a separate vendor.js file for third-party libraries
				manualChunks(id) {
					// This will include all modules from node_modules in the 'vendor' chunk
					if (id.includes('node_modules')) {
						return 'vendor'
					}
				},
			},
		},
	},
})
