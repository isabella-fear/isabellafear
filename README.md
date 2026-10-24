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

- `app/page.tsx`: personal introduction, About Me, education, and community material.
- `app/content/profile.ts`: contact links, site URL, work experience, dates, and leadership roles.
- `app/global.css`: shared colors, Times New Roman typography, and responsive layouts.

Experience was checked against Isabella's LinkedIn profile on October 24, 2026; direct corrections supplied by the user take precedence. No responsibilities are invented for entries whose source only lists a title.

## Artwork and animation

The homepage includes a nine-second, scroll-triggered ink reveal near the footer, with a replay control. The user explicitly selected the generated cottage/flower study for the published site. It is labelled as an illustrative study; it is not presented as Isabella's own artwork. The generation prompt is embedded in the PNG. The animation preserves the image and reveals small regions; it does not reconstruct an original pen-stroke sequence. True stroke-by-stroke animation needs a stroke-based SVG or a carefully traced mask. Reduced-motion preferences show the completed drawing immediately.

## Publishing

The existing GitHub repository has a Vercel integration. Commit and push to the existing `main` branch, then check that the Vercel commit status succeeds. Repository write access does not by itself guarantee deployment permission in the owner's Vercel account. Keep the owner's existing project and domain; do not create a duplicate project.
