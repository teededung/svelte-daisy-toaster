import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',  // output directory
      assets: 'build',
      fallback: null,  // don't use fallback for SPA
      precompress: false,
      strict: true
    })
  }
};

export default config; 