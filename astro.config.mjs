// @ts-check
import { defineConfig } from 'astro/config';
import remarkEmoji from 'remark-emoji';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: "https://ahmahsamara17.github.io",
  integrations: [],

  markdown: {
    remarkPlugins: [remarkEmoji],
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
      langAlias: {
        vba: "vb",
        vbscript: "vb",
      },
      transformers: [
        {
          name: "phoenix-code-width",
          pre(node) {
            const rawMeta = this.options.meta?.__raw ?? "";
            const width = rawMeta.match(
              /(?:^|\s)width=(\d+(?:\.\d+)?(?:px|rem|em|vw|%))(?:\s|$)/,
            )?.[1];

            if (!width) return;

            const currentClass = String(node.properties.class ?? "");
            const currentStyle = String(node.properties.style ?? "");
            node.properties.class = `${currentClass} code-custom-width`.trim();
            node.properties.style = `${currentStyle}; --code-width: ${width};`;
          },
        },
      ],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
