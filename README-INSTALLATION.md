# Project card click + case-study modal update

This update changes the project interaction model:

- For projects with a `liveUrl`, clicking the main card artwork/body opens the deployed website in a new tab.
- The card footer separately provides **View case study** and **Visit live site** actions.
- For projects without a live URL (Car Vista and SILVERTRACE), clicking the main card area opens the case study instead.
- The case-study panel has a sticky header, a contained scroll area, improved hierarchy, contribution/stack sections, project highlights, and a clear live-site CTA where applicable.
- The modal becomes a bottom-sheet-style panel on mobile and remains internally scrollable.

## Included files

- `src/components/selected-work.tsx` — complete replacement.
- `src/data/portfolio.ts` — complete replacement with the two supplied Hugging Face URLs and LIVE SITE statuses.
- `src/app/APPEND-TO-GLOBALS.css` — append-only styles for card actions and the improved case-study panel.

## Install

1. Back up or commit your current project.
2. Extract this ZIP into `D:\portfolio-ks` while preserving its folder structure.
3. Replace the included `src/components/selected-work.tsx` and `src/data/portfolio.ts`.
4. Open `src/app/APPEND-TO-GLOBALS.css`, copy its entire contents, and paste them at the very bottom of your existing `src/app/globals.css`. Do not replace `globals.css`.
5. Restart the development server:

```powershell
cd D:\portfolio-ks
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm run dev
```

## Deployment links configured

- SENTBALE: https://sentbaleperfumes.com/
- KWE: https://kwe-website.vercel.app/
- Akshaanshh Jyotish: https://akshaanshhjyotish.com/
- SafeCheck AI: https://keshav938927-safecheck-ai.hf.space/
- Image Compression: https://keshav938927-image-compression-app.hf.space/

Car Vista remains `PROJECT`; SILVERTRACE remains `CONCEPT` and has no public live URL.

## Test checklist

- Click the main area of each live project card: it should open the live site in a new tab.
- Click **View case study**: it should open the internal detail panel.
- Scroll inside the detail panel: only the panel content should scroll; its close bar should remain visible.
- Open Car Vista or SILVERTRACE: the card opens the case study.
- Repeat on phone width; the case study should appear as a bottom sheet with its own scroll.
