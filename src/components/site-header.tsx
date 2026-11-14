"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { profile } from "@/data/portfolio";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "Focus areas", href: "#capabilities" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <m.header
        className="site-header"
        initial={reduceMotion ? false : { opacity: 0, y: -26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="site-header__inner">
          <Link href="#home" className="brand" onClick={closeMenu} aria-label="Keshav Sharma home">
            <span className="brand__mark">K<span>.</span></span>
            <span className="brand__name">KESHAV SHARMA</span>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item, index) => (
              <m.a
                key={item.href}
                href={item.href}
                className="nav-link"
                whileHover={reduceMotion ? undefined : { y: -2 }}
                transition={{ duration: 0.18 }}
              >
                <span className="nav-link__index">0{index + 1}</span>
                {item.label}
                <span className="nav-link__line" />
              </m.a>
            ))}
          </nav>

          <m.a
            href={profile.resumeUrl}
            download
            aria-label="Download Keshav Sharma's resume"
            className="header-cta"
            whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          >
            Download resume <span aria-hidden="true">↓</span>
          </m.a>

          <button
            className={`menu-toggle ${menuOpen ? "menu-toggle--open" : ""}`}
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </m.header>

      <AnimatePresence>
        {menuOpen && (
          <m.div
            className="mobile-menu"
            initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={reduceMotion ? undefined : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduceMotion ? 0.01 : 0.48, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav id="mobile-navigation" aria-label="Mobile navigation">
              {navItems.map((item, index) => (
                <m.a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduceMotion ? 0 : 0.08 + index * 0.07, duration: reduceMotion ? 0.01 : 0.42 }}
                >
                  <span>0{index + 1}</span>
                  {item.label}
                  <b aria-hidden="true">↗</b>
                </m.a>
              ))}
            </nav>
            <a className="mobile-menu__resume" href={profile.resumeUrl} download>
              Download resume <span aria-hidden="true">↓</span>
            </a>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
