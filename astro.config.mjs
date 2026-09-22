// @ts-check
import { defineConfig } from 'astro/config';
import emojiKeywords from 'emojilib';

import tailwindcss from '@tailwindcss/vite';

const emojiByShortcode = new Map();

function normalizeEmojiName(name) {
  return name.trim().toLowerCase().replace(/[\s-]+/g, "_");
}

function addEmojiName(name, emoji) {
  const shortcode = normalizeEmojiName(name);
  if (/^[\w+-]+$/.test(shortcode) && !emojiByShortcode.has(shortcode)) {
    emojiByShortcode.set(shortcode, emoji);
  }
}

// Add canonical names first so broad search aliases cannot overwrite them.
for (const [emoji, [canonicalName]] of Object.entries(emojiKeywords)) {
  addEmojiName(canonicalName, emoji);
}

for (const [emoji, names] of Object.entries(emojiKeywords)) {
  for (const name of names.slice(1)) addEmojiName(name, emoji);
}

function remarkModernEmoji() {
  return (tree) => {
    const visitText = (node) => {
      if (node.type === "text") {
        node.value = node.value.replace(
          /:([a-zA-Z0-9_+-]+):/g,
          (match, name) => emojiByShortcode.get(name.toLowerCase()) ?? match,
        );
      }

      node.children?.forEach(visitText);
    };

    visitText(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  site: "https://ahmahsamara17.github.io",
  integrations: [],

  markdown: {
    remarkPlugins: [remarkModernEmoji],
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
