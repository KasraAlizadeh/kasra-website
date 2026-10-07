import { getCollection, type CollectionEntry } from "astro:content";

export const formatDate = (d: Date) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export const readingTime = (text: string) => `${Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 200))} min read`;

/** Published posts, newest first. Drafts are hidden in production builds. */
export async function getPosts(): Promise<CollectionEntry<"blog">[]> {
  const posts = await getCollection("blog", ({ data }) => (import.meta.env.PROD ? !data.draft : true));
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf() || a.data.title.localeCompare(b.data.title));
}
