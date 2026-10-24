# Isabella Fear

A personal introduction website built with Next.js, Times New Roman, and dark sage green. The homepage introduces Isabella's interests in law, constitutionalism, and knowledge, with a minimal Experience section and links to LinkedIn and email.

## Run locally

Install dependencies from `pnpm-lock.yaml` using pnpm, then run:

```sh
npm run dev -- --hostname 127.0.0.1 --port 3017
```

Open http://127.0.0.1:3017. The development server updates the page when files change.

```sh
npm run build
npm run start
```

The production build includes TypeScript validation.

## Update content

- `app/page.tsx`: personal introduction, About Me, and education.
- `app/content/profile.ts`: contact links, site URL, work experience, dates, and leadership roles.
- `app/global.css`: shared colors, Times New Roman typography, and responsive layouts.

Experience was checked against Isabella's LinkedIn profile on October 24, 2026; direct corrections supplied by the user take precedence. No responsibilities are invented for entries whose source only lists a title.

## Artwork and animation

The selected generated flower/cottage study sits directly on the page background, without a heading or separate panel. A scroll-triggered animation follows 606 traced centre-line strokes over 48 seconds, with a replay control. This is a traced reveal of the original image, not the artist's original pen order. The PNG and its embedded generation prompt are unchanged; the study is not attributed to Isabella. Reduced-motion preferences show the completed drawing immediately, and a normal image remains visible if the animation cannot load.

`scripts/trace-ink.mjs` reproduces the geometry in `public/studies/ink-strokes.json` from the source PNG. The desktop cursor uses `public/gavel-cursor.svg`.

## Publishing

The existing GitHub repository has a Vercel integration. Commit and push to the existing `main` branch, then check that the Vercel commit status succeeds. Repository write access does not by itself guarantee deployment permission in the owner's Vercel account. Keep the owner's existing project and domain; do not create a duplicate project.

## Prepared GitHub Pages version

`npm run build:pages` creates a static site in `out/`, with the canonical address `https://isabellafear.github.io`, an exported social image, and `.nojekyll`. The regular build retains the current Vercel address.

The exact GitHub Pages address requires the repository `isabellafear/isabellafear.github.io`. That destination is not currently available to this workspace. When its owner can create/share the repository, copy this site's source there and enable Pages with **GitHub Actions** in its settings. The included workflow automatically publishes subsequent pushes to `main` in that repository. It is deliberately skipped in `isabella-fear/isabellafear`, where Vercel continues to publish normally.
