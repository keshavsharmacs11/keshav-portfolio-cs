"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { ArrowUpRight, Command, Search } from "lucide-react";
import { projects } from "@/data/portfolio";

const destinations = [
  { label: "Home", href: "#home", description: "Back to the hero section", keywords: "intro start" },
  { label: "Selected work", href: "#work", description: "Explore projects and case studies", keywords: "portfolio projects" },
  { label: "Focus areas", href: "#capabilities", description: "Frontend, full-stack and ML work", keywords: "capabilities skills expertise" },
  { label: "About Keshav", href: "#about", description: "Background and technology stack", keywords: "profile about skills" },
  { label: "Contact", href: "#contact", description: "Start a conversation", keywords: "email hire collaborate" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    else setQuery("");
  }, [open]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    const nav = destinations
      .filter((item) => !term || `${item.label} ${item.description} ${item.keywords}`.toLowerCase().includes(term))
      .map((item) => ({ ...item, kind: "NAVIGATE" }));
    const projectResults = projects
      .filter((project) => !term || `${project.name} ${project.category} ${project.summary} ${project.stack.join(" ")}`.toLowerCase().includes(term))
      .map((project) => ({ label: project.name, href: "#work", description: project.category, kind: "PROJECT" }));
    return [...nav, ...projectResults].slice(0, 9);
  }, [query]);

  function goTo(href: string) {
    setOpen(false);
    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }, 30);
  }

  return (
    <>
      <button className="command-hint" type="button" onClick={() => setOpen(true)} aria-label="Open quick navigation">
        <Search size={13} /> <span>QUICK FIND</span> <kbd><Command size={10} /> K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <m.div className="command-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }} initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <m.div className="command-panel" role="dialog" aria-modal="true" aria-label="Quick navigation" initial={reduceMotion ? false : { opacity: 0, y: -18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }} transition={{ duration: 0.2 }}>
              <div className="command-search"><Search size={18} /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search sections, projects, skills..." aria-label="Search portfolio" /><kbd>ESC</kbd></div>
              <div className="command-results">
                <span className="command-results__label">JUMP TO / EXPLORE</span>
                {results.length ? results.map((item) => (
                  <button className="command-result" type="button" key={`${item.kind}-${item.label}`} onClick={() => goTo(item.href)}>
                    <span className="command-result__kind">{item.kind}</span>
                    <span className="command-result__copy"><strong>{item.label}</strong><small>{item.description}</small></span>
                    <ArrowUpRight size={15} />
                  </button>
                )) : <p className="command-empty">No matches. Try a project name or section.</p>}
              </div>
              <div className="command-footer"><span>PORTFOLIO QUICK FIND</span><span>⌘ / CTRL + K TO OPEN</span></div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
