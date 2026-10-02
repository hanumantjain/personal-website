# Hanumant Jain — Portfolio

Single-page developer portfolio built with **React 19 + TypeScript + Vite + Tailwind CSS v4 + Three.js**.
The visual design comes from the Google Stitch "Obsidian Cyber Technologist" mockups in the parent folder.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build
```

## Editing content

All text, projects, experience and skills live in **`src/data/portfolio.ts`** — edit that file; no component changes needed.

- `profile.status` is the badge in the header and the `--status` terminal command.
- Set `featured: true` on a project to give it the large card with highlights.
- Project `categories` drive the filter chips on the Projects section.
- The resume served by the site is `public/Hanumant_Jain_Resume.pdf`.

## Structure

```
src/
  data/portfolio.ts      all site content
  components/
    Header.tsx           sticky nav, active-section tracking, mobile menu
    Hero.tsx             intro + stats + 3D panel
    CyberCore.tsx        Three.js scene (lazy-loaded, drag to rotate)
    Pillars.tsx          engineering focus cards
    Projects.tsx         filter chips + search (⌘K / Ctrl+K)
    Lab.tsx              Deploy Lab section (lazy-loads lab/)
    lab/                 simulated CI/CD pipeline: model + reducer, driver hook, UI
    Experience.tsx       timeline, education, achievements
    Stack.tsx            skills matrix
    Terminal.tsx         interactive CLI + contact links
  index.css              design tokens (@theme) + base styles
```

## Deploy

It is a static site: run `npm run build` and deploy `dist/` to Netlify, Vercel, GitHub Pages or any static host.
On Netlify use build command `npm run build` and publish directory `dist`.
