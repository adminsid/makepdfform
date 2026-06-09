import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit() as any],
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:8787',
				changeOrigin: true,
				ws: true
			}
		}
	},
	ssr: {
		noExternal: [
			'@tiptap/core', 
			'@tiptap/starter-kit', 
			'@tiptap/extension-table', 
			'@tiptap/extension-table-row', 
			'@tiptap/extension-table-cell', 
			'@tiptap/extension-table-header'
		]
	}
});
