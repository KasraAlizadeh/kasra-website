// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Your domain. Used for canonical URLs, the sitemap, the RSS feed and link previews.
const SITE_URL = process.env.SITE_URL || "https://kasraalizadeh.dev";

export default defineConfig({
  site: SITE_URL,
  trailingSlash: "ignore",
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: "github-dark-dimmed" },
  },
});
