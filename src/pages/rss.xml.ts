import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getPosts } from "../scripts/utils";
import { SITE } from "../data";

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: `${SITE.name} · Blog`,
    description: "Notes on signal processing, communication systems, and building AI software.",
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      categories: post.data.tags,
      link: `/blog/${post.id}/`,
    })),
  });
}
