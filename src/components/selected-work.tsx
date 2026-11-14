"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { ArrowUpRight, X } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { onPortfolioFrame, pinProgress, segment } from "@/lib/portfolio-scroll";

type ProjectFilter = "All" | Project["filter"];
const filters: ProjectFilter[] = ["All", "Commerce", "Platforms", "Concepts", "AI & ML"];

export function SelectedWork() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLButtonElement[]>([]);
  const artRefs = useRef<HTMLSpanElement[]>([]);
  const progressRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  const visibleProjects = activeFilter === "All"
    ? projects
    : projects.filter((project) => project.filter === activeFilter);

  // Rebuild the ref lists after filtering so removed cards cannot be measured.
  cardRefs.current = [];
  artRefs.current = [];

  // One scroll-scrubbed project reel on laptop and phone. On mobile the cards
  // are narrower and rotate through a stronger perspective as vertical scroll
  // carries the track sideways, mirroring the laptop choreography.
  useEffect(() => {
    return onPortfolioFrame(() => {
      const root = rootRef.current;
      const track = trackRef.current;
      const viewport = windowRef.current;
      if (!root || !track || !viewport || reduceMotion) return;
      const isMobile = window.innerWidth <= 760;
      const { progress, rect, viewportHeight } = pinProgress(root);
      if (rect.bottom < 0 || rect.top > viewportHeight) return;

      const p = segment(progress, isMobile ? 0.02 : 0.04, isMobile ? 0.98 : 0.96);
      const travel = Math.max(0, track.scrollWidth - (isMobile ? viewport.clientWidth : window.innerWidth * 0.88));
      track.style.transform = `translate3d(${-p * travel}px, 0, 0)`;

      const viewportRect = viewport.getBoundingClientRect();
      const focusLine = isMobile
        ? viewportRect.left + viewportRect.width * 0.5
        : window.innerWidth * 0.61;
      const offsetWidth = isMobile ? viewportRect.width : window.innerWidth;
      let nearest = 0;
      let closest = Number.POSITIVE_INFINITY;
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const bounds = card.getBoundingClientRect();
        const center = bounds.left + bounds.width / 2;
        const offset = (center - focusLine) / Math.max(1, offsetWidth);
        const distance = Math.abs(offset);
        if (isMobile) {
          const depth = Math.min(1, distance * 1.35);
          const rotateY = Math.max(-15, Math.min(15, -offset * 18));
          card.style.opacity = String(1 - depth * 0.2);
          card.style.transform = `translate3d(0, ${depth * 9}px, ${-depth * 58}px) rotateY(${rotateY}deg) scale(${1 - depth * 0.055})`;
          const art = artRefs.current[index];
          if (art) art.style.transform = `translate3d(${-offset * 22}px, ${depth * -5}px, 34px) rotateZ(${-offset * 2.4}deg) scale(1.08)`;
        } else {
          const dim = Math.min(1, distance * 1.38);
          card.style.opacity = String(1 - dim * 0.44);
          card.style.transform = `translate3d(0, ${distance * 15}px, 0) scale(${1 - dim * 0.045})`;
          const art = artRefs.current[index];
          if (art) art.style.transform = `translate3d(${offset * -34}px, 0, 0) scale(1.1)`;
        }
        if (distance < closest) {
          closest = distance;
          nearest = index;
        }
      });
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
      if (indexRef.current) indexRef.current.textContent = String(nearest + 1).padStart(2, "0");
    });
  }, [reduceMotion, visibleProjects.length]);

  useEffect(() => {
    if (!activeProject) return;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const frame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveProject(null);
      if (event.key === "Tab") {
        const dialog = document.querySelector<HTMLElement>("[data-case-dialog]");
        const focusables = dialog?.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), [tabindex='0']");
        if (!focusables?.length) return;
        const first = focusables.item(0);
        const last = focusables.item(focusables.length - 1);
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = oldOverflow;
      previousFocusRef.current?.focus();
    };
  }, [activeProject]);

  return (
    <>
      <section ref={rootRef} className="work-section work-reel-section" id="work">
        <div className="work-reel-pin">
          <div className="page-shell work-reel-shell">
            <div className="work-reel-heading">
              <div>
                <span className="section-kicker"><i /> 01 / SELECTED WORK</span>
                <h2 className="section-title">PROJECTS.<br /><em>BUILT TO BE USEFUL.</em></h2>
              </div>
              <p className="section-intro">Selected websites and projects. Open a card for my contribution, tools and highlights.</p>
            </div>

            <div className="work-reel-controls">
              <div className="project-filters" role="group" aria-label="Filter projects">
                {filters.map((filter) => (
                  <button key={filter} type="button" className={`project-filter ${activeFilter === filter ? "is-active" : ""}`} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>
                    {filter}
                  </button>
                ))}
              </div>
              <span className="work-reel-count"><span ref={indexRef}>01</span> / {String(visibleProjects.length).padStart(2, "0")}</span>
            </div>

            <div ref={windowRef} className="project-reel-window" role="region" aria-label="Project showcase">
              <div ref={trackRef} className="project-reel-track" aria-live="polite">
                <AnimatePresence initial={false} mode="popLayout">
                  {visibleProjects.map((project, index) => (
                    <m.button
                      type="button"
                      key={project.number}
                      ref={(element) => { if (element) cardRefs.current[index] = element; }}
                      className={`project-card project-card--${project.theme} project-reel-card`}
                      onClick={() => setActiveProject(project)}
                      aria-label={`Open ${project.name} case study`}
                      initial={reduceMotion ? false : { opacity: 0, x: 36, scale: 0.97 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={reduceMotion ? undefined : { opacity: 0, x: -24, scale: 0.97 }}
                      transition={{ duration: 0.44, delay: index * 0.045 }}
                      whileHover={reduceMotion ? undefined : { y: -7 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                    >
                      <span className="project-card__topline"><span>{project.number} / {project.status}</span><ArrowUpRight size={17} /></span>
                      <span
                        ref={(element) => { if (element) artRefs.current[index] = element; }}
                        className={`project-artwork project-artwork--${project.theme} project-reel-artwork`}
                        aria-hidden="true"
                      >
                        <span className="project-artwork__image" style={{ backgroundImage: `url("${project.image}")` }} />
                        <span className="project-artwork__grain" />
                      </span>
                      <span className="project-card__bottom"><span><strong>{project.name}</strong><small>{project.category}</small></span><span className="project-card__open">View case study ↗</span></span>
                    </m.button>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="work-reel-progress" aria-hidden="true"><span ref={progressRef} /></div>
            <div className="work-reel-note"><span className="work-reel-note__desktop">Scroll to explore projects</span><span className="work-reel-note__mobile">Scroll to explore projects</span></div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeProject && (
          <m.div className="case-modal-backdrop" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) setActiveProject(null); }} initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduceMotion ? undefined : { opacity: 0 }}>
            <m.section className={`case-modal case-modal--${activeProject.theme}`} role="dialog" aria-modal="true" aria-labelledby="case-title" data-case-dialog tabIndex={-1} initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduceMotion ? undefined : { opacity: 0, y: 18, scale: 0.98 }} transition={{ duration: reduceMotion ? 0.01 : 0.28 }}>
              <div className="case-modal__top"><span>{activeProject.number} / {activeProject.status}</span><button ref={closeButtonRef} type="button" onClick={() => setActiveProject(null)} aria-label="Close project details"><X size={18} /></button></div>
              <div className={`case-modal__art case-modal__art--${activeProject.theme}`} style={{ backgroundImage: `linear-gradient(90deg, rgba(7,7,17,.28), rgba(7,7,17,.02)), url("${activeProject.image}")` }}>
                <span>{activeProject.mark}</span><small>{activeProject.artLabel}</small>
              </div>
              <div className="case-modal__content">
                <span className="section-kicker">{activeProject.category}</span>
                <h3 id="case-title">{activeProject.name}</h3>
                <p>{activeProject.details}</p>
                <div className="case-modal__meta"><div><small>MY CONTRIBUTION</small><p>{activeProject.contribution}</p></div><div><small>TECHNOLOGY</small><div className="skill-pills">{activeProject.stack.map((item) => <span key={item}>{item}</span>)}</div></div></div>
                <div className="case-modal__highlights">{activeProject.highlights.map((item) => <span key={item}>↗ {item}</span>)}</div>
                {activeProject.liveUrl ? <a className="button button--glow" href={activeProject.liveUrl} target="_blank" rel="noopener noreferrer">Visit live site <ArrowUpRight size={16} /></a> : <span className="project-status-note">No public demo link is available yet. The case study details describe the project work.</span>}
              </div>
            </m.section>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
