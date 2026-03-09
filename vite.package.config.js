import { resolve } from 'node:path';

import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

const external = [/^svelte(\/|$)/, 'esm-env'];

export default defineConfig({
	plugins: [svelte()],
	build: {
		ssr: resolve('src/lib/index.ts'),
		outDir: 'dist/runtime',
		emptyOutDir: false,
		rollupOptions: {
			external,
			output: {
				format: 'es',
				entryFileNames: 'index.js',
				chunkFileNames: 'chunks/[name]-[hash].js'
			}
		}
	}
});
