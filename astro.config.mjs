import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Note: @astrojs/cloudflare adapter is kept in package.json for future SSR use.
// This site is fully prerendered — Cloudflare Pages serves the static output
// from dist/ without needing the Workers adapter. Add the adapter back when
// any page needs runtime server-side rendering.

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
