import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 8080,
		cors: true,
		host: '0.0.0.0'  // this forces the dev server to use localhost instead of 127.0.0.1 which we have cors issues with
	}
});
