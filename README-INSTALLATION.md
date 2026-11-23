# Portfolio professional finishing pass

This patch is based on the latest `main` branch reviewed for `keshavsharmacs11/keshav-portfolio-cs`.

## Files included

- `src/components/site-header.tsx`
  - Adds the Certifications section to reliable scroll-based active-section tracking.
  - Uses a shared Motion `layoutId` for a sliding active nav pill.
  - Keeps the glass navbar, quick search, resume link, keyboard support and mobile menu.
  - Tightens tablet and small-phone header breakpoints.

- `src/components/certifications-section.tsx`
  - Keeps the approved `LEARNING, PROVEN.` concept.
  - Shows a single designed empty state instead of four repeated placeholder certificate cards when no real credentials are entered.
  - Still renders real certificate cards and category filters from `src/data/certifications.ts` when that array is populated.

- `src/app/portfolio-finish.css`
  - Refines spacing, alignment, responsive section rhythm and the credentials card/empty-state layout.
  - Adds anchor scroll clearance for the fixed navbar.
  - Includes specific mobile layout rules for capability cards, About, Education, Skills, Credentials and Contact.

- `src/app/layout.tsx`
  - Imports the new finishing stylesheet after the existing styles so the refinements take precedence.

## Apply

1. Back up your current project or commit your work first.
2. Extract this ZIP into the project root, `D:\portfolio-ks`, preserving the folder structure.
3. Replace the included files when prompted.
4. Make sure your existing `src/data/certifications.ts` remains in place. Do not replace it; it contains the real credential data source.
5. Restart the dev server:

```powershell
Ctrl + C
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm run dev
```

6. Test desktop scrolling through Home → Work → Focus Areas → About → Credentials → Contact.
7. Test at phone widths around 390px and 430px, and a tablet width around 820px.

## Important

The video shows a desktop browsing session; it does not include a phone viewport. The mobile refinements are based on the current mobile CSS and responsive components in the repository. Please check them on a real or emulated mobile viewport before deploying.

No real certification details have been added or invented. When you add credentials to `src/data/certifications.ts`, the card grid and category filters will appear automatically.
