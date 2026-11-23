"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { ArrowDown, ArrowUpRight, Command, Menu, Search, X } from "lucide-react";
import { profile } from "@/data/portfolio";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "Focus Areas", href: "#capabilities" },
  { label: "About", href: "#about" },
  { label: "Credentials", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const sectionIds = ["home", "work", "capabilities", "about", "contact"];

/*
 * The stylesheet is embedded in this component on purpose. This avoids CSS
 * Module path/import problems and makes this navbar a drop-in replacement.
 */
const NAV_CSS = String.raw`
.ks-floatnav, .ks-floatnav * { box-sizing: border-box; }
.ks-floatnav {
  position: fixed; z-index: 120; top: 20px; left: 0; width: 100%;
  padding-inline: clamp(18px, 4.1vw, 72px); pointer-events: none;
  transition: top .35s ease, padding .35s ease;
}
.ks-floatnav.ks-is-scrolled { top: 12px; }
.ks-floatnav__bar {
  position: relative; isolation: isolate; display: grid;
  grid-template-columns: minmax(205px, 1fr) auto minmax(290px, 1fr);
  align-items: center; gap: clamp(14px, 2vw, 30px);
  width: min(100%, 1580px); min-height: 88px; margin-inline: auto;
  padding: 12px 19px 12px 27px;
  border: 1px solid rgba(166,151,255,.27); border-radius: 29px;
  background: radial-gradient(ellipse at 8% 0%, rgba(130,91,255,.14), transparent 42%),
    linear-gradient(110deg, rgba(14,17,32,.93), rgba(12,16,30,.86) 54%, rgba(13,19,37,.92));
  box-shadow: 0 18px 52px rgba(0,0,0,.34), 0 0 28px rgba(121,88,255,.14), inset 0 1px 0 rgba(255,255,255,.09);
  -webkit-backdrop-filter: blur(24px) saturate(150%); backdrop-filter: blur(24px) saturate(150%);
  pointer-events: auto; transition: min-height .35s ease, border-color .35s ease, box-shadow .35s ease;
}
.ks-floatnav__bar::before {
  position: absolute; z-index: -1; inset: 0; padding: 1px; border-radius: inherit;
  content: ""; pointer-events: none; opacity: .5;
  background: linear-gradient(115deg, rgba(183,151,255,.4), rgba(111,142,255,.22) 48%, rgba(255,255,255,.04));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
}
.ks-floatnav.ks-is-scrolled .ks-floatnav__bar {
  min-height: 78px; border-color: rgba(166,151,255,.34);
  box-shadow: 0 14px 42px rgba(0,0,0,.4), 0 0 25px rgba(121,88,255,.16), inset 0 1px 0 rgba(255,255,255,.08);
}
.ks-floatnav__brand { display: inline-flex; align-items: center; justify-self: start; gap: 13px; min-width: 0; color: #f8f7ff; text-decoration: none; }
.ks-floatnav__monogram {
  display: inline-block; flex: 0 0 auto; color: #fbfaff;
  font-family: var(--font-display), sans-serif; font-size: 45px; font-weight: 700;
  line-height: .9; letter-spacing: -.105em; text-shadow: 0 0 24px rgba(173,145,255,.32);
}
.ks-floatnav__monogram span { color: #a889ff; }
.ks-floatnav__brand-copy { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
.ks-floatnav__brand-copy strong { color: #f1efff; font: 700 10px/1 var(--font-body), sans-serif; letter-spacing: .15em; white-space: nowrap; }
.ks-floatnav__brand-copy small { color: #9da8c0; font: 500 10px/1.2 var(--font-body), sans-serif; white-space: nowrap; }
.ks-floatnav__desktop-nav {
  display: flex; align-items: center; justify-self: center; gap: 4px; padding: 6px;
  border: 1px solid rgba(173,164,231,.2); border-radius: 999px;
  background: rgba(6,9,19,.44); box-shadow: inset 0 1px 0 rgba(255,255,255,.035);
}
.ks-floatnav__link {
  position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  min-height: 42px; padding: 0 clamp(12px,1.35vw,21px); border: 1px solid transparent;
  border-radius: 999px; color: #c4c9d9; font: 600 12px/1 var(--font-body), sans-serif;
  white-space: nowrap; text-decoration: none; transition: color .25s ease, background .25s ease, border-color .25s ease, box-shadow .25s ease;
}
.ks-floatnav__link:hover { color: #fff; background: rgba(255,255,255,.055); }
.ks-floatnav__link.ks-active {
  color: #fff; border-color: rgba(211,191,255,.27);
  background: linear-gradient(115deg, rgba(142,83,255,.9), rgba(91,103,239,.94));
  box-shadow: 0 0 0 1px rgba(187,154,255,.1), 0 5px 20px rgba(107,78,237,.34), 0 0 22px rgba(133,96,255,.24);
}
.ks-floatnav__actions { display: flex; align-items: center; justify-self: end; gap: 10px; }
.ks-floatnav__icon {
  display: inline-grid; flex: 0 0 auto; width: 46px; height: 46px; place-items: center;
  border: 1px solid rgba(186,190,222,.24); border-radius: 50%; color: #edf0ff;
  background: linear-gradient(145deg, rgba(255,255,255,.09), rgba(255,255,255,.025));
  box-shadow: inset 0 1px 0 rgba(255,255,255,.07), 0 6px 18px rgba(0,0,0,.15);
  cursor: pointer; transition: transform .25s ease, color .25s ease, border-color .25s ease, background .25s ease, box-shadow .25s ease;
}
.ks-floatnav__icon:hover { transform: translateY(-2px); color: #fff; border-color: rgba(180,151,255,.68); background: rgba(139,92,246,.17); box-shadow: 0 0 20px rgba(135,95,255,.2); }
.ks-floatnav__divider { width: 1px; height: 30px; margin-inline: 3px 7px; background: linear-gradient(180deg,transparent,rgba(201,204,231,.34),transparent); }
.ks-floatnav__resume {
  display: inline-flex; align-items: center; justify-content: center; gap: 15px; min-height: 50px; padding: 0 20px;
  border: 1px solid rgba(208,190,255,.65); border-radius: 999px; color: #fff;
  background: linear-gradient(108deg,#8d4cf0 0%,#6c61f0 55%,#526fe9 100%);
  box-shadow: 0 8px 24px rgba(97,73,218,.3), 0 0 26px rgba(136,93,255,.21), inset 0 1px 0 rgba(255,255,255,.23);
  font: 700 11px/1 var(--font-body), sans-serif; text-decoration: none; white-space: nowrap; transition: box-shadow .25s ease, filter .25s ease;
}
.ks-floatnav__resume:hover { filter: brightness(1.08); box-shadow: 0 11px 30px rgba(97,73,218,.4), 0 0 34px rgba(136,93,255,.29), inset 0 1px 0 rgba(255,255,255,.27); }
.ks-floatnav__resume svg { transition: transform .25s ease; }
.ks-floatnav__resume:hover svg { transform: translateY(3px); }
.ks-floatnav__toggle { display: none; flex: 0 0 auto; width: 44px; height: 44px; align-items: center; justify-content: center; border: 1px solid rgba(186,190,222,.25); border-radius: 50%; color: #f4f2ff; background: rgba(255,255,255,.055); cursor: pointer; }
.ks-floatnav__mobile-menu {
  position: absolute; top: calc(100% + 11px); right: clamp(18px,4.1vw,72px); width: min(410px,calc(100vw - 36px));
  padding: 14px; border: 1px solid rgba(166,151,255,.3); border-radius: 23px;
  background: linear-gradient(145deg,rgba(18,21,39,.98),rgba(10,14,27,.97));
  box-shadow: 0 24px 60px rgba(0,0,0,.5), 0 0 28px rgba(121,88,255,.13), inset 0 1px 0 rgba(255,255,255,.08);
  -webkit-backdrop-filter: blur(24px); backdrop-filter: blur(24px); pointer-events: auto;
}
.ks-floatnav__mobile-menu nav { display: flex; flex-direction: column; gap: 5px; }
.ks-floatnav__mobile-menu nav a {
  display: grid; grid-template-columns: 1fr auto; align-items: center; min-height: 48px; padding: 0 13px;
  border: 1px solid transparent; border-radius: 13px; color: #e7e8f4; font: 600 13px/1 var(--font-body),sans-serif;
  text-decoration: none; transition: background .2s ease,border-color .2s ease,color .2s ease;
}
.ks-floatnav__mobile-menu nav a:hover, .ks-floatnav__mobile-menu nav a.ks-active { border-color: rgba(173,145,255,.22); color: #fff; background: rgba(139,92,246,.16); }
.ks-floatnav__mobile-menu nav a svg { color: #9e8ad9; }
.ks-floatnav__mobile-resume {
  display: flex; align-items: center; justify-content: space-between; min-height: 47px; margin-top: 11px; padding: 0 15px;
  border: 1px solid rgba(208,190,255,.54); border-radius: 13px; color: #fff;
  background: linear-gradient(108deg,#8d4cf0,#536fe9); font: 700 11px/1 var(--font-body),sans-serif; text-decoration: none;
}
.ks-floatnav__mobile-search { display: flex; align-items: center; gap: 9px; width: 100%; min-height: 42px; margin-top: 9px; padding: 0 12px; border: 1px solid rgba(186,190,222,.16); border-radius: 12px; color: #bfc5d8; background: rgba(255,255,255,.04); font: 500 10px/1 var(--font-body),sans-serif; cursor: pointer; }
.ks-floatnav__mobile-search kbd { margin-left: auto; padding: 4px 6px; border: 1px solid rgba(186,190,222,.2); border-radius: 5px; color: #9fa6bd; font: 9px/1 var(--font-mono),monospace; }
@media (max-width: 1120px) {
  .ks-floatnav { top: 16px; padding-inline: clamp(14px,2.5vw,28px); }
  .ks-floatnav.ks-is-scrolled { top: 10px; }
  .ks-floatnav__bar { grid-template-columns: minmax(0,1fr) auto; min-height: 78px; padding: 10px 13px 10px 20px; border-radius: 24px; }
  .ks-floatnav.ks-is-scrolled .ks-floatnav__bar { min-height: 72px; }
  .ks-floatnav__desktop-nav { display: none; }
  .ks-floatnav__actions { gap: 8px; }
  .ks-floatnav__toggle { display: inline-flex; }
  .ks-floatnav__mobile-menu { right: clamp(14px,2.5vw,28px); }
}
@media (max-width: 560px) {
  .ks-floatnav { top: 10px; padding-inline: 10px; }
  .ks-floatnav.ks-is-scrolled { top: 7px; }
  .ks-floatnav__bar { min-height: 68px; padding: 8px 9px 8px 14px; border-radius: 20px; gap: 8px; }
  .ks-floatnav.ks-is-scrolled .ks-floatnav__bar { min-height: 64px; }
  .ks-floatnav__brand { gap: 9px; }
  .ks-floatnav__monogram { font-size: 37px; }
  .ks-floatnav__brand-copy { gap: 4px; }
  .ks-floatnav__brand-copy strong { font-size: 8px; letter-spacing: .12em; }
  .ks-floatnav__brand-copy small { font-size: 9px; }
  .ks-floatnav__actions { gap: 7px; }
  .ks-floatnav__icon { width: 39px; height: 39px; }
  .ks-floatnav__shortcut, .ks-floatnav__divider, .ks-floatnav__resume { display: none; }
  .ks-floatnav__toggle { width: 40px; height: 40px; }
  .ks-floatnav__mobile-menu { top: calc(100% + 8px); right: 10px; width: min(410px,calc(100vw - 20px)); padding: 11px; border-radius: 19px; }
}
@media (prefers-reduced-motion: reduce) {
  .ks-floatnav, .ks-floatnav__bar, .ks-floatnav__link, .ks-floatnav__icon, .ks-floatnav__resume, .ks-floatnav__resume svg, .ks-floatnav__mobile-menu nav a { transition: none !important; }
}
`;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const [isScrolled, setIsScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  const closeMenu = () => setMenuOpen(false);
  const openQuickFind = () => {
    closeMenu();
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true, metaKey: true, bubbles: true }));
  };

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 28);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    const targets = sectionIds.map((id) => document.getElementById(id)).filter((element): element is HTMLElement => Boolean(element));
    if (!targets.length || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target instanceof HTMLElement) setActiveHref(`#${visible.target.id}`);
    }, { rootMargin: "-22% 0px -62% 0px", threshold: [0, 0.12, 0.3, 0.55] });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <style data-ks-floating-navbar="true">{NAV_CSS}</style>
      <m.header
        className={`ks-floatnav ${isScrolled ? "ks-is-scrolled" : ""}`}
        initial={reduceMotion ? false : { opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.72, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="ks-floatnav__bar">
          <Link href="#home" className="ks-floatnav__brand" onClick={closeMenu} aria-label="Keshav Sharma home">
            <span className="ks-floatnav__monogram">K<span>.</span></span>
            <span className="ks-floatnav__brand-copy"><strong>KESHAV SHARMA</strong><small>{profile.role}</small></span>
          </Link>

          <nav className="ks-floatnav__desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => {
              const active = activeHref === item.href;
              return (
                <m.a key={item.href} href={item.href} className={`ks-floatnav__link ${active ? "ks-active" : ""}`} aria-current={active ? "page" : undefined}
                  whileHover={reduceMotion ? undefined : { y: -1 }} whileTap={reduceMotion ? undefined : { scale: 0.97 }} onClick={() => setActiveHref(item.href)}>
                  {item.label}
                </m.a>
              );
            })}
          </nav>

          <div className="ks-floatnav__actions">
            <button className="ks-floatnav__icon" type="button" onClick={openQuickFind} aria-label="Search portfolio" title="Search portfolio"><Search size={18} strokeWidth={2} /></button>
            <button className="ks-floatnav__icon ks-floatnav__shortcut" type="button" onClick={openQuickFind} aria-label="Open quick find with Control K" title="Quick find · Ctrl K"><Command size={17} strokeWidth={1.9} /></button>
            <span className="ks-floatnav__divider" aria-hidden="true" />
            <m.a href={profile.resumeUrl} download aria-label="Download Keshav Sharma's resume" className="ks-floatnav__resume"
              whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }}>
              <span>Download Resume</span><ArrowDown size={17} strokeWidth={2.2} />
            </m.a>
            <button className="ks-floatnav__toggle" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="ks-mobile-navigation" onClick={() => setMenuOpen((value) => !value)}>
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <m.div className="ks-floatnav__mobile-menu" initial={reduceMotion ? false : { opacity: 0, y: -10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8, scale: 0.98 }} transition={{ duration: reduceMotion ? 0.01 : 0.24, ease: [0.22, 1, 0.36, 1] }}>
              <nav id="ks-mobile-navigation" aria-label="Mobile navigation">
                {navItems.map((item) => {
                  const active = activeHref === item.href;
                  return <a key={item.href} href={item.href} onClick={() => { setActiveHref(item.href); closeMenu(); }} aria-current={active ? "page" : undefined} className={active ? "ks-active" : ""}>
                    <span>{item.label}</span><ArrowUpRight size={16} />
                  </a>;
                })}
              </nav>
              <a className="ks-floatnav__mobile-resume" href={profile.resumeUrl} download>Download Resume <ArrowDown size={16} /></a>
              <button className="ks-floatnav__mobile-search" type="button" onClick={openQuickFind}><Search size={15} /> Search projects and sections <kbd>CTRL K</kbd></button>
            </m.div>
          )}
        </AnimatePresence>
      </m.header>
    </>
  );
}
