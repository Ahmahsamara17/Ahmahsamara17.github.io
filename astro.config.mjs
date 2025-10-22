// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: "https://ahmahsamara17.github.io/my_website/",
  base: "/my_website/",
  integrations: [],

  vite: {
    plugins: [tailwindcss()],
  },
});
