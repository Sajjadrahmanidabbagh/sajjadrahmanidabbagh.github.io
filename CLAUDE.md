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
  - expandable boxes that open and close smoothly (projects, papers, talks)
  - hover effects
  - everything respects `prefers-reduced-motion`
  - no heavy animation libraries without asking
- **Videos:** large videos are embedded from YouTube with the lazy `src/components/YouTube.astro` (set `youtubeId` in a project's frontmatter). Small videos (< ~30 MB, ideally < 10 MB) may go in `public/videos/`. Never commit a file > 50 MB.
- **Images:** go in `src/assets/images/` and are optimized by `astro:assets`. Always give alt text.
- **Quality:** must look good on mobile, be fast, and be accessible.
- **Contact info:** email is shown. Phone number is NOT published.
- **CV PDF:** not published until the owner confirms. To publish it, add `public/cv.pdf` and set `showPdf = true` in `src/pages/about.astro`.
- **Links:** links on About & CV and Contact open in a new tab. Projects, papers and talks expand in place (no separate pages).

## Content architecture: which file to edit

All personal content lives in `src/data/` and `src/content/`. Layouts and components (`src/layouts/`, `src/components/`, `src/pages/`) contain no personal content. Schemas are in `src/content.config.ts`.

| Update | File |
|---|---|
| Name, title, tagline, intro, summary, email, links (GitHub/LinkedIn/Scholar), photos, interests | `src/data/profile.yml` |
| Education (one file each, own page at `/education/<filename>/`; write the explanation in the body) | `src/content/education/<name>.md` |
| A project (box on Projects & Papers; body = expanded details) | `src/content/projects/<name>.md` |
| A paper (thin box on Projects & Papers; body = expanded details) | `src/content/papers/<name>.md` |
| A talk / poster (box on Experience & Talks; body = expanded details) | `src/content/talks/<name>.md` |
| Work / teaching experience | `src/data/experience.yml` |
| Honors & awards | `src/data/awards.yml` |
| Certificates | `src/data/certificates.yml` |
| Skills | `src/data/skills.yml` |
| Languages | `src/data/languages.yml` |
| Images | `src/assets/images/`. In a .md body: `![alt text](../../assets/images/<file>.jpg)` |
| Small videos | `public/videos/`, then set `video: /videos/<file>.mp4` in the .md frontmatter |
| YouTube video | set `youtubeId: <id>` in the .md frontmatter |
| Extra links (code, data, …) | `links:` list in the .md frontmatter. Papers also have `url:` (DOI). |

Items are sorted by the `order:` field in their frontmatter.

### Pages (V2)

- **Home** `/`: big photo, short intro, and three boxes (About & CV, Projects & Papers, Contact). It should fit one screen on desktop.
- **About & CV** `/about/`:
  - summary, profile links, education (each item opens its own page in a new tab)
  - skills, languages, certificates, interests (not clickable)
  - two summary boxes, each a single link opening in a new tab: Projects & Papers, and Experience, Awards & Talks
- **Projects & Papers** `/projects/`: project boxes (2 per row) and paper rows. Clicking expands a box in place; "Show less" collapses it.
- **Experience & Talks** `/experience/`: work experience, awards, and talk rows (expandable).
- **Contact** `/contact/`: small boxes for email and each profile link, opening in a new tab.
- A "Back to main page" button sits on About & CV, Projects & Papers, and Contact.
- `src/components/ScrollCrossfade.astro` is kept for later use but is currently not used.

### Versions

- **V1** (first version) is frozen in the git tag `v1` (and branch `v1`). It never changes.
- To restore V1 on the live site, run this on `master` and commit/push after approval:
  `git rm -r -q . && git checkout v1 -- . && git commit -m "Restore V1"`

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
