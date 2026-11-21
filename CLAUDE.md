# Personal website – Sajjad Rahmani Dabbagh

Academic/professional website, a companion to the CV.
Live URL: https://sajjadrahmanidabbagh.github.io

## Decisions (do not change without asking)

- **Hosting:** GitHub Pages, deployed by GitHub Actions (`.github/workflows/deploy.yml`, official `withastro/action`). Deploys on push to `master`. The repo needs one setting: Settings → Pages → Source: "GitHub Actions".
- **Framework:** Astro 7 (static output). Node 22 (≥ 22.23.4). Keep dependencies minimal; no heavy UI frameworks unless approved.
- **Structure:** multi-page site (no single scrolling page).
- **Visual style:** modern, plus some minimal elements: generous whitespace, large images, light/dark mode (follows the system, with a toggle in the header).
- **Animations:** subtle only.
  - fade/slide-in on scroll: add `data-reveal` to any element
  - page transitions via Astro View Transitions (`<ClientRouter />`)
  - scroll-driven image crossfade on the home page
  - hover effects
  - everything respects `prefers-reduced-motion`
  - no heavy animation libraries without asking
- **Videos:** large videos are embedded from YouTube with the lazy `src/components/YouTube.astro` (set `youtubeId` in a project's frontmatter). Small videos (< ~30 MB, ideally < 10 MB) may go in `public/videos/`. Never commit a file > 50 MB.
- **Images:** go in `src/assets/images/` and are optimized by `astro:assets`. Always give alt text.
- **Quality:** must look good on mobile, be fast, and be accessible.
- **Contact info:** email is shown. Phone number is NOT published.
- **CV PDF:** not published until the owner confirms. To publish it, add `public/cv.pdf` and set `showPdf = true` in `src/pages/cv.astro`.

## Content architecture: which file to edit

All personal content lives in `src/data/` and `src/content/`. Layouts and components (`src/layouts/`, `src/components/`, `src/pages/`) contain no personal content. Schemas are in `src/content.config.ts`.

| Update | File |
|---|---|
| Name, title, tagline, bio, email, links, headshot, hobbies, home-page scroll highlights | `src/data/profile.yml` |
| Education | `src/data/education.yml` |
| Work / teaching experience | `src/data/experience.yml` |
| Honors & awards | `src/data/awards.yml` |
| Certificates | `src/data/certificates.yml` |
| Skills | `src/data/skills.yml` |
| Languages | `src/data/languages.yml` |
| Publications | `src/data/publications.yml` |
| Conference talks / posters | `src/data/talks.yml` |
| A project (one file = one detail page at `/projects/<filename>/`) | `src/content/projects/<name>.md` |
| A news item | `src/content/news/<name>.md` |
| Images | `src/assets/images/` (reference with a path relative to the file using it) |
| Small videos | `public/videos/` |

Pages: Home `/`, About `/about/`, Research `/research/`, Projects `/projects/` (+ detail pages), Experience `/experience/`, News `/news/`, CV `/cv/`, Contact `/contact/`.

## Commands

- Install: `npm install`
- Preview (dev server): `npm run dev -- --host 127.0.0.1`, then open http://127.0.0.1:4321. On a remote SSH server, forward the port first: `ssh -L 4321:127.0.0.1:4321 <server>`.
- Build: `npm run build` (output in `dist/`)
- Preview the build: `npm run preview -- --host 127.0.0.1`

## Rules

- Make minimal changes. Only edit the files needed for the requested update. Don't refactor or restyle things that weren't asked about.
- Never delete, move, or rename files without asking.
- Never invent personal content. Use `TODO:` and ask.
- Never commit large files (> 50 MB) or anything in `_source/`. `_source/` holds private source material (CV, instructions) and is git-ignored.
- Never `git push` without explicit approval. Commit locally with clear messages.
- Ask before installing anything globally or doing anything outside this repo.
