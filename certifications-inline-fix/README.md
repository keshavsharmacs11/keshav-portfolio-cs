# Certifications section — self-contained CSS fix

The screenshot showed the certification markup rendering without any of its CSS Module styles. This replacement avoids CSS Modules entirely: styles are included in a scoped `<style>` element inside the component.

## Install

1. In your project, replace `src/components/certifications-section.tsx` with the file at that exact path in this ZIP.
2. Keep `src/data/certifications.ts` unchanged. It already exports the `certifications` array and `CertificationCategory` type used by the component.
3. Keep your existing `page.tsx` import and `<CertificationsSection />` placement.
4. Delete the old `src/components/certifications-section.module.css` if you wish; the replacement component no longer imports it.
5. Stop the dev server, delete `.next`, then run `npm run dev` again.

PowerShell from `D:\portfolio-ks`:

```powershell
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm run dev
```

The section uses only dependencies already present in the portfolio (`lucide-react` and `motion/react`). It does not add example credentials; placeholder artwork remains until real data is added to `src/data/certifications.ts`.
