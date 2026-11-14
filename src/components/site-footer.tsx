import Link from "next/link";
import { profile } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell site-footer__inner">
        <Link href="#home" className="brand brand--footer" aria-label="Keshav Sharma, back to top">
          <span className="brand__mark">K<span>.</span></span>
          <span className="brand__name">KESHAV SHARMA</span>
        </Link>
        <span className="site-footer__note">{`${profile.role.toUpperCase()} · ${profile.location.toUpperCase()}`}</span>
        <div className="site-footer__right">
          <a className="site-footer__github" href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>
          <span className="site-footer__copy">© {new Date().getFullYear()} {profile.name.toUpperCase()}</span>
        </div>
      </div>
    </footer>
  );
}
