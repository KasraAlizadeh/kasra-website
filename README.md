# kasraalizadeh.dev

Personal website and technical blog of **Kasra Alizadeh**, telecommunication engineer and AI software developer.

**Live site:** [kasraalizadeh.dev](https://kasraalizadeh.dev)

## About the project

The site presents my research, professional experience and engineering projects, and hosts a blog about signal processing, communication systems and AI software. Its visual language comes from lab instruments: the hero is a live oscilloscope that decodes a noisy signal, the career timeline is drawn as a logic analyzer, and every section is a color-coded "channel".

It is a fully static site: pages are generated at build time, there is no server or database, and it is deployed automatically to GitHub Pages on every push.

## Features

- **Interactive hero:** a Canvas 2D oscilloscope that renders a heavy-tailed noisy signal and animates its decoding into a clean trace, with Raw/Decoded controls. It pauses when off-screen and respects `prefers-reduced-motion`.
- **Logic-analyzer timeline:** education, industry, research and project periods rendered as digital traces, generated at build time with no client-side JavaScript. It switches to a list layout on narrow screens.
- **Research section:** the featured publication with the receiver pipeline diagram, key results, DOI, and a **Cite** button producing BibTeX and plain-text citations.
- **Blog:** Markdown posts with typed frontmatter, static per-post pages, tag filtering, reading time, previous/next navigation, drafts and an RSS feed.
- **Content management:** all resume content lives in JSON files, editable in code or through a Git-based admin dashboard at `/admin/` (Sveltia CMS).
- **Light and dark themes:** follows the system preference, with a manual toggle stored in `localStorage` and applied before first paint to avoid a flash.
- **SEO:** canonical URLs, Open Graph and Twitter cards, JSON-LD structured data (`Person`, `ScholarlyArticle`, `BlogPosting`), XML sitemap and `robots.txt`.
- **Responsive and accessible:** tested from 320 px to 1920 px wide, with semantic HTML, keyboard navigation, a skip link, visible focus states and ARIA labels.
- **Privacy-friendly:** fonts are self-hosted (no Google Fonts requests), there are no cookies, and no third-party trackers.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | [Astro 7](https://astro.build): static site generation, content collections, scoped component scripts |
| Language | TypeScript (strict), HTML, CSS |
| Content | Markdown with schema validation (Zod via `astro/zod`), JSON data files |
| Graphics | Canvas 2D API (oscilloscope), inline SVG (icons, diagrams, project visuals) |
| Styling | Hand-written CSS with design tokens (custom properties); no CSS framework |
| Typography | Chakra Petch, IBM Plex Sans and JetBrains Mono, self-hosted with Fontsource |
| Integrations | `@astrojs/sitemap`, `@astrojs/rss` |
| CMS | [Sveltia CMS](https://github.com/sveltia/sveltia-cms) (Git-based, commits to this repository) |
| CI/CD | GitHub Actions (`withastro/action`, `actions/deploy-pages`) |
| Hosting | GitHub Pages with a custom domain and enforced HTTPS |
| Tooling | Node.js 22+, npm, `astro check` for type checking, WebStorm |

## Architecture

```
Markdown posts ─┐
JSON content ───┼──► Astro build (TypeScript, content schema) ──► static HTML/CSS/JS ──► GitHub Pages
Components ─────┘                                                                          ▲
                                                                                            │
Push to main ──► GitHub Actions: install → build → deploy ──────────────────────────────────┘
Admin dashboard (/admin) ──► commits to main ──► same pipeline
```

- **Content and presentation are separated.** Components read typed data from `src/data/index.ts`, which wraps the JSON files. The same files feed the page sections, the structured data and the CMS forms.
- **JavaScript only where it adds behavior.** That covers the oscilloscope, theme toggle, mobile menu, citation box, tag filter and copy-to-clipboard. Everything else is server-rendered HTML.
- **Optional content degrades gracefully.** Empty fields (profile links, project code links, figures, paper PDF or slides) are omitted from the output rather than rendered empty.

## Project structure

```
├── .github/workflows/deploy.yml   Build and deploy to GitHub Pages
├── docs/                          Screenshots for this README
├── public/
│   ├── admin/                     Sveltia CMS app and configuration
│   ├── images/                    Profile photo and uploaded figures
│   ├── CNAME                      Custom domain for GitHub Pages
│   ├── Kasra_Alizadeh_CV.pdf
│   ├── favicon.svg
│   └── og-image.png               1200×630 social preview image
├── src/
│   ├── components/                Page sections (Hero, About, Trace, Research, Projects, Skills, Contact, …)
│   ├── content/blog/              Blog posts (Markdown)
│   ├── data/
│   │   ├── settings.json          Profile, research interests, links, contact details
│   │   ├── resume.json            Experience, education, projects, skills, languages
│   │   ├── publications.json      Papers, authors, metrics, DOI
│   │   ├── timeline.ts            Timeline segments
│   │   └── index.ts               Typed accessors and citation helpers
│   ├── layouts/BaseLayout.astro   Document head, SEO metadata, header, footer
│   ├── pages/                     Routes: /, /blog/, /blog/[slug]/, /rss.xml, /robots.txt, 404
│   ├── scripts/                   Oscilloscope renderer and shared utilities
│   ├── styles/global.css          Design tokens, themes and layout
│   └── content.config.ts          Blog collection schema
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Getting started

Requirements: Node.js 22.12 or newer.

```bash
npm install        # install dependencies
npm run dev        # development server at http://localhost:4321
npm run check      # type-check .astro and .ts files
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

## Content

**Blog posts** are Markdown files in `src/content/blog/`. The file name becomes the URL slug, and the frontmatter is validated at build time:

```yaml
---
title: "Post title"
description: "Summary used on cards, in search results and in link previews."
pubDate: 2026-10-01
updatedDate: 2026-10-05   # optional
tags: ["Research", "Signal Processing"]
draft: false              # true keeps the post out of production builds
---
```

**Resume content** lives in `src/data/*.json`. **Assets** go in `public/`: replace `public/images/profile.jpg` for the portrait and `public/Kasra_Alizadeh_CV.pdf` for the CV.

**Admin dashboard:** `/admin/` loads Sveltia CMS with the GitHub backend configured in `public/admin/config.yml`. Sign-in uses a fine-grained GitHub token with *Contents: read and write* on this repository. Every save is a commit, so all changes go through the normal build and deploy pipeline.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site with `withastro/action` and publishes `dist/` with `actions/deploy-pages`. GitHub Pages serves it at the custom domain in `public/CNAME`, with HTTPS enforced. The canonical site URL is set in `astro.config.mjs`, and can be overridden with the `SITE_URL` environment variable.

## Author

**Kasra Alizadeh**
M.Sc. Telecommunication Engineering, Politecnico di Milano

[Website](https://kasraalizadeh.dev) · [LinkedIn](https://www.linkedin.com/in/kasra-alizadeh) · [Google Scholar](https://scholar.google.com/citations?user=POgKEpYAAAAJ) · [ORCID](https://orcid.org/0009-0005-7468-0488)

## License

The source code is published for reference. The written content, photographs, CV and publication material are © Kasra Alizadeh, all rights reserved.