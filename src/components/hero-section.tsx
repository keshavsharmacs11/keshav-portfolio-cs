"use client";

import type { PointerEvent } from "react";
import { useEffect, useRef } from "react";
import { useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { HeroVisual } from "@/components/hero-visual";
import { MobileHero } from "@/components/mobile-hero";
import { profile } from "@/data/portfolio";
import { easeOutCubic, onPortfolioFrame, pinProgress, segment } from "@/lib/portfolio-scroll";

const ease = [0.22, 1, 0.36, 1] as const;
const tech = ["REACT.JS", "JAVASCRIPT", "PYTHON", "JAVA", "NEXT.JS", "TYPESCRIPT", "MONGODB", "NUMPY", "PANDAS", "SCIKIT-LEARN", "GIT & GITHUB"];

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const shellRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLAnchorElement>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 80, damping: 22, mass: 0.6 });
  const smoothY = useSpring(pointerY, { stiffness: 80, damping: 22, mass: 0.6 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const driftX = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const driftY = useTransform(smoothY, [-0.5, 0.5], [-5, 5]);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  // Laptop uses the original pinned, scroll-scrubbed layered hero.
  // Mobile renders a separate composition with its own parallax and 3D motion.
  useEffect(() => {
    // The phone layout has its own motion system; keep the laptop scrollytelling
    // loop out of the mobile runtime entirely.
    if (reduceMotion || window.matchMedia("(max-width: 760px)").matches) return;
    return onPortfolioFrame(() => {
      const shell = shellRef.current;
      if (!shell || reduceMotion) return;
      const isMobile = window.innerWidth <= 760;
      const { progress, rect, viewportHeight } = pinProgress(shell);
      if (rect.bottom < 0 || rect.top > viewportHeight) return;

      const dustOut = easeOutCubic(segment(progress, 0.02, isMobile ? 0.3 : 0.24));
      const reveal = easeOutCubic(segment(progress, isMobile ? 0.1 : 0.16, isMobile ? 0.68 : 0.56));
      const exit = segment(progress, isMobile ? 0.68 : 0.76, 1);
      const distance = isMobile ? 1 : 1.0;

      if (dustRef.current) {
        dustRef.current.style.opacity = String((isMobile ? 0.62 : 0.78) * (1 - dustOut));
        dustRef.current.style.transform = `translate3d(0, ${-dustOut * (isMobile ? 34 : 54)}px, 0) scale(${1 + dustOut * (isMobile ? 0.06 : 0.1)})`;
      }
      if (backRef.current) {
        backRef.current.style.transform = `translate3d(0, ${-progress * (isMobile ? 54 : 34)}px, 0) scale(${1.08 - reveal * 0.08})`;
      }
      if (gridRef.current) {
        gridRef.current.style.transform = `translate3d(0, ${-progress * (isMobile ? 88 : 62)}px, 0) scale(${1 + progress * (isMobile ? 0.035 : 0)})`;
        gridRef.current.style.opacity = String(0.58 - exit * (isMobile ? 0.22 : 0.35));
      }
      if (orbitRef.current) {
        orbitRef.current.style.transform = `translate3d(0, ${progress * (isMobile ? 118 : 92)}px, 0) rotate(${progress * (isMobile ? 23 : 16)}deg) scale(${0.94 + reveal * 0.08})`;
        orbitRef.current.style.opacity = String(0.8 - exit * (isMobile ? 0.3 : 0.6));
      }
      if (artRef.current) {
        const lift = isMobile ? 42 : 72;
        const shrink = isMobile ? 0.1 : 0.1;
        artRef.current.style.transform = `translate3d(0, ${(1 - reveal) * lift - exit * (isMobile ? 28 : 42)}px, 0) scale(${0.9 + reveal * shrink - exit * (isMobile ? 0.12 : 0.05)}) rotateX(${progress * (isMobile ? 5 : 0)}deg)`;
        artRef.current.style.filter = `blur(${(1 - reveal) * (isMobile ? 5 : 8)}px)`;
      }
      if (foregroundRef.current) {
        foregroundRef.current.style.transform = `translate3d(0, ${progress * (isMobile ? -155 : -125)}px, 0)`;
        foregroundRef.current.style.opacity = String(0.72 - exit * 0.72);
      }
      if (copyRef.current) {
        copyRef.current.style.transform = `translate3d(0, ${-exit * (isMobile ? 24 : 44)}px, 0) scale(${1 - exit * (isMobile ? 0.025 : 0)})`;
        copyRef.current.style.opacity = String(1 - exit * (isMobile ? 0.18 : 1));
      }
      if (cueRef.current) cueRef.current.style.opacity = String(1 - segment(progress, 0.08, isMobile ? 0.28 : 0.22));
      stageRef.current?.style.setProperty("--hero-scroll-progress", String(progress * distance));
    });
  }, [reduceMotion]);

  return (
    <>
      <div ref={shellRef} className="hero-scroll-shell" id="home">
        <section
          ref={stageRef}
          className="hero-section hero-section--pinned"
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointer}
          aria-label="Portfolio introduction"
        >
          <div ref={backRef} className="hero-depth-layer hero-depth-layer--nebula" aria-hidden="true" />
          <div ref={gridRef} className="hero-depth-layer hero-depth-layer--grid" aria-hidden="true" />
          <div ref={orbitRef} className="hero-depth-layer hero-depth-layer--orbits" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-ambient hero-ambient--one" aria-hidden="true" />
          <div className="hero-ambient hero-ambient--two" aria-hidden="true" />

          <div className="hero-desktop-content">
          <div className="hero-layout page-shell">
            <div ref={copyRef} className="hero-copy hero-copy--scroll">
              <m.div className="eyebrow-pill" initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12, ease }}>
                <span className="eyebrow-pulse" /> FULL-STACK DEVELOPER <i>/</i> REACT.JS · PYTHON · AI/ML
              </m.div>

              <h1 id="hero-title" className="hero-title">
                <span className="hero-title__line"><m.span initial={reduceMotion ? false : { y: "115%" }} animate={{ y: "0%" }} transition={{ duration: 0.85, delay: 0.24, ease }}>COMPLEX PROBLEMS,</m.span></span>
                <span className="hero-title__line"><m.span initial={reduceMotion ? false : { y: "115%" }} animate={{ y: "0%" }} transition={{ duration: 0.9, delay: 0.34, ease }}>CLEAR DIGITAL</m.span></span>
                <span className="hero-title__line"><m.span initial={reduceMotion ? false : { y: "115%" }} animate={{ y: "0%" }} transition={{ duration: 0.95, delay: 0.44, ease }}><em>PRODUCTS.</em></m.span></span>
              </h1>

              <m.p className="hero-description" initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.66, ease }}>
                {profile.introduction}
              </m.p>

              <m.div className="hero-actions" initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.76, ease }}>
                <m.a href="#work" className="button button--glow" whileHover={reduceMotion ? undefined : { y: -3, scale: 1.025 }} whileTap={{ scale: 0.97 }}>Explore projects <span>↗</span></m.a>
                <m.a href={profile.githubUrl} target="_blank" rel="noreferrer" className="hero-github-link" whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={{ scale: 0.98 }}>GitHub repository <span>↗</span></m.a>
              </m.div>

              <m.div className="hero-facts" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.95 }}>
                <div><strong>WEB + AI/ML</strong><span>FOCUS</span></div>
              </m.div>
            </div>

            <div ref={artRef} className="hero-art-scroll-layer">
              <m.div className="hero-art-stage" initial={reduceMotion ? false : { opacity: 0, scale: 0.9, y: 22 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.05, delay: 0.18, ease }} style={reduceMotion ? undefined : { x: driftX, y: driftY }}>
                <div className="hero-art-glow" aria-hidden="true" />
                <m.div className="hero-art-float" style={reduceMotion ? undefined : { rotateX, rotateY }} animate={reduceMotion ? undefined : { y: [0, -8, 0], rotateZ: [-0.6, 0.6, -0.6] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}>
                  <HeroVisual />
                </m.div>
              </m.div>
            </div>
          </div>

          <div ref={foregroundRef} className="hero-depth-layer hero-depth-layer--foreground" aria-hidden="true" />
          <div ref={dustRef} className="hero-dust-veil" aria-hidden="true">
          </div>
          <m.a ref={cueRef} className="scroll-cue" href="#marquee" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.5 }}>
            <span>Scroll to explore</span>
            <m.i animate={reduceMotion ? undefined : { y: [0, 7, 0] }} transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}>↓</m.i>
          </m.a>
          </div>
          <MobileHero />
        </section>
      </div>

      <div className="tech-marquee" id="marquee" aria-label="Technologies and disciplines">
        <div className="tech-marquee__track" aria-hidden="true">
          {[...tech, ...tech].map((item, index) => <span key={`${item}-${index}`}>{item}<b>✳</b></span>)}
        </div>
      </div>
    </>
  );
}
