PORTFOLIO NUMBERING + DUPLICATE RESUME CLEANUP
==============================================

This package contains complete updated component files for the portfolio
repository keshavsharmacs11/keshav-portfolio-cs. The SelectedWork file is based
on the newer file you supplied in this conversation, so it retains the native
mobile horizontal swipe and the modal scroll-lock work.

INSTALL THE COMPONENT FILES
---------------------------
1. Extract this ZIP.
2. Copy the included src folder into your project folder:
   D:\portfolio-ks
3. When Windows asks, allow the matching files to be replaced.

Complete replacement files included:
  src/components/selected-work.tsx
  src/components/hero-section.tsx
  src/components/mobile-hero.tsx
  src/components/about-section.tsx
  src/components/contact-section.tsx
  src/components/capabilities-section.tsx
  src/components/hero-visual.tsx

ONE SMALL GLOBAL CSS ADDITION
-----------------------------
Do not replace your whole globals.css; you may have added other styling fixes.
Open your existing src/app/globals.css and append the contents of
APPEND-TO-GLOBALS.css to the very bottom. This removes the oversized
WORK / 01—07 watermark.

WHAT IS REMOVED
---------------
- Section serial labels: 01 / SELECTED WORK, 02 / FOCUS AREAS,
  03 / THE PERSON BEHIND THE PIXELS, 04 / TECHNICAL SKILLS, 05 / CONTACT.
- The selected-work carousel counter (current / total).
- Project serial numbers before LIVE SITE / PROJECT / CONCEPT on cards and
  in the case-study modal.
- The four Focus Areas card indices.
- The Technical Skills card indices.
- The SELECTED BUILDS 01—03 stamp on the hero artwork.
- The large WORK / 01—07 background watermark.
- Hero project and live-site numeric counters on desktop and mobile.
- Duplicate resume download actions in desktop hero, mobile hero and About.

The navbar resume button remains. The mobile menu's resume link is part of the
navbar and remains available. Meaningful dates (including the education period),
project identifiers/React keys and underlying project data are not changed.

AFTER INSTALLATION
------------------
1. Stop the development server with Ctrl+C.
2. Run npm run dev from D:\portfolio-ks.
3. Refresh http://localhost:3000 using Ctrl+Shift+R.
4. Review Home, Work, Focus Areas, About, Contact, and a case-study modal.

The ZIP intentionally does NOT replace site-header.tsx, portfolio.ts,
page.tsx, or the complete globals.css file. This preserves your current
floating glass navbar and data.
