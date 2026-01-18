// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import rehypePrettyCode from "rehype-pretty-code";

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: [".md"],
  rehypePlugins: [
    [
      rehypePrettyCode,
      {
        theme: "catppuccin-macchiato",
        keepBackground: true,
      },
    ],
  ],
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

  kit: {
    // adapter-static configuration
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: undefined,
      precompress: true,
      strict: true,
    }),
    alias: {
      $components: "src/lib/components",
      $assets: "src/lib/assets",
      $server: "src/lib/server",
    },
  },

  extensions: [".svelte", ".md"],
};

export default config;
