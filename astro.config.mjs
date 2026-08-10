import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://szerlingjan.github.io/portfolio/",
  base: "/portfolio",
  devToolbar: {
    enabled: false,
  },
  integrations: [sitemap()],
  prefetch: true,
  vite: {
    ssr: {
      noExternal: ["smartypants"],
    },
  },
});
