// Typed access to the site's content.
// The content itself lives in the JSON files next to this one, so it can be edited
// in VS Code or from the admin dashboard (/admin).
import settingsJson from "./settings.json";
import resumeJson from "./resume.json";
import publicationsJson from "./publications.json";

export type Channel = "ch1" | "ch2" | "ch3" | "ch4";
export const channelColor = (c: string) => (["ch1", "ch2", "ch3", "ch4"].includes(c) ? `var(--${c})` : "var(--accent)");

export type Links = { linkedin: string; github: string; scholar: string; orcid: string };
export type Settings = {
  name: string;
  jobTitle: string;
  description: string;
  heroLine: string;
  profile: string;
  researchInterests: string;
  interestTags: string[];
  email: string;
  location: string;
  photo: string;
  photoAlt: string;
  cv: string;
  links: Links;
  facts: { k: string; v: string }[];
};
export type Card = { when: string; title: string; org: string; channel: string; points: string[] };
export type Project = {
  year: string; title: string; with: string; channel: string; viz: string; text: string;
  tags: string[]; post: string; code: string; image: string; imageAlt: string;
};
export type SkillBand = { name: string; band: string; channel: string; items: string[] };
export type Publication = {
  id: string; featured: boolean; title: string; authors: string[]; venue: string; venueFull: string;
  date: string; doi: string; award: string; summary: string;
  metrics: { k: string; v: string; unit: string }[]; pdf: string; slides: string; post: string;
};

export const SETTINGS = settingsJson as Settings;
export const RESUME = resumeJson as {
  experience: Card[]; education: Card[]; projects: Project[]; skills: SkillBand[];
  languages: { name: string; level: string }[];
};
export const PUBLICATIONS = (publicationsJson as { publications: Publication[] }).publications;

export const SITE = {
  ...SETTINGS,
  title: `${SETTINGS.name} · ${SETTINGS.jobTitle}`,
  ogImage: "/og-image.png",
  lang: "en",
};

/** Profile links that are filled in, in display order. Empty links are hidden everywhere. */
export const PROFILE_LINKS = [
  { key: "github", label: "GitHub", href: SETTINGS.links.github },
  { key: "scholar", label: "Google Scholar", href: SETTINGS.links.scholar },
  { key: "orcid", label: "ORCID", href: SETTINGS.links.orcid },
  { key: "linkedin", label: "LinkedIn", href: SETTINGS.links.linkedin },
].filter((l) => l.href && l.href.trim() !== "");

export const prettyUrl = (u: string) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export const NAV = [
  { href: "/#about", label: "About", ch: "CH0", color: "var(--accent)" },
  { href: "/#trace", label: "Trace", ch: "CH1", color: "var(--ch1)" },
  { href: "/#research", label: "Research", ch: "CH2", color: "var(--ch3)" },
  { href: "/#projects", label: "Projects", ch: "CH3", color: "var(--ch2)" },
  { href: "/#skills", label: "Skills", ch: "CH4", color: "var(--ch4)" },
  { href: "/blog/", label: "Blog", ch: "LOG", color: "var(--ink-2)" },
  { href: "/#contact", label: "Contact", ch: "TX", color: "var(--accent)" },
];

// ---------- Citation helpers ----------
const year = (p: Publication) => p.date.slice(0, 4);
const lastName = (n: string) => n.trim().split(/\s+/).slice(-1)[0];
export function bibtex(p: Publication): string {
  const key = `${lastName(p.authors[0] ?? SETTINGS.name).toLowerCase()}${year(p)}${p.title.split(/\s+/)[0].toLowerCase().replace(/[^a-z]/g, "")}`;
  const lines = [
    `@inproceedings{${key},`,
    `  title     = {${p.title}},`,
    `  author    = {${p.authors.join(" and ")}},`,
    `  booktitle = {${p.venueFull}},`,
    `  year      = {${year(p)}},`,
    `  publisher = {Association for Computing Machinery},`,
    p.doi ? `  doi       = {${p.doi}},` : "",
    p.doi ? `  url       = {https://doi.org/${p.doi}}` : "",
    `}`,
  ].filter(Boolean);
  return lines.join("\n");
}
export function plainCitation(p: Publication): string {
  const names = p.authors.map((a) => {
    const parts = a.trim().split(/\s+/);
    const last = parts.pop();
    return `${parts.map((x) => x[0] + ".").join(" ")} ${last}`;
  });
  const who = names.length > 2 ? `${names.slice(0, -1).join(", ")}, and ${names.at(-1)}` : names.join(" and ");
  return `${who}. ${year(p)}. ${p.title}. In ${p.venueFull}. ACM.${p.doi ? ` https://doi.org/${p.doi}` : ""}`;
}
