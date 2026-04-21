import { resolve } from 'node:path';

import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

const external = [/^svelte(\/|$)/, 'esm-env'];

function isUnusedTransitionWarning(warning) {
	return (
		warning.code === 'UNUSED_EXTERNAL_IMPORT' &&
		warning.exporter === 'svelte/transition' &&
		warning.names?.includes('fly')
	);
}

export default defineConfig({
	plugins: [svelte()],
	build: {
		ssr: resolve('src/lib/index.ts'),
		outDir: 'dist/runtime',
		emptyOutDir: false,
		rollupOptions: {
			external,
			onwarn(warning, warn) {
				if (isUnusedTransitionWarning(warning)) return;
				warn(warning);
			},
			output: {
				format: 'es',
				entryFileNames: 'index.js',
				chunkFileNames: 'chunks/[name]-[hash].js'
			}
		}
	}
});
