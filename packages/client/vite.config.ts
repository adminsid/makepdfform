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
	}
});
