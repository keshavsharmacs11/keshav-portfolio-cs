"use client";

import { useRef } from "react";
import { useReducedMotion, useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { HeroVisual } from "@/components/hero-visual";
import { profile } from "@/data/portfolio";

const easing = [0.22, 1, 0.36, 1] as const;

/**
 * A deliberately separate mobile art direction. The laptop hero stays intact;
 * phones get a cleaner editorial hierarchy and a larger, animated project stage.
 */
export function MobileHero() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const artY = useTransform(scrollYProgress, [0, 1], [0, 54]);
  const artScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const artRotate = useTransform(scrollYProgress, [0, 1], [0, -4]);
  const headingY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <section ref={sectionRef} className="mobile-hero" aria-labelledby="mobile-hero-title">
      <div className="mobile-hero__ambient mobile-hero__ambient--violet" aria-hidden="true" />
      <div className="mobile-hero__ambient mobile-hero__ambient--blue" aria-hidden="true" />
      <div className="mobile-hero__grid" aria-hidden="true" />
      <div className="mobile-hero__orbit mobile-hero__orbit--outer" aria-hidden="true" />
      <div className="mobile-hero__orbit mobile-hero__orbit--inner" aria-hidden="true" />

      <div className="mobile-hero__inner">
        <m.div
          className="mobile-hero__topline"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: easing }}
        >
          <span className="mobile-hero__signature">{profile.name}</span>
          <span className="mobile-hero__availability"><i /> OPEN TO OPPORTUNITIES</span>
        </m.div>

        <m.div
          className="mobile-hero__heading"
          style={reducedMotion ? undefined : { y: headingY }}
        >
          <m.p
            className="mobile-hero__eyebrow"
            initial={reducedMotion ? false : { opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: easing }}
          >
            FULL-STACK DEVELOPER
          </m.p>
          <h1 id="mobile-hero-title" className="mobile-hero__title">
            <span className="mobile-hero__title-line">
              <m.span initial={reducedMotion ? false : { y: "115%" }} animate={{ y: "0%" }} transition={{ duration: 0.82, delay: 0.22, ease: easing }}>
                BUILDING
              </m.span>
            </span>
            <span className="mobile-hero__title-line mobile-hero__title-line--accent">
              <m.span initial={reducedMotion ? false : { y: "115%" }} animate={{ y: "0%" }} transition={{ duration: 0.9, delay: 0.32, ease: easing }}>
                DIGITAL
              </m.span>
            </span>
            <span className="mobile-hero__title-line">
              <m.span initial={reducedMotion ? false : { y: "115%" }} animate={{ y: "0%" }} transition={{ duration: 0.98, delay: 0.42, ease: easing }}>
                PRODUCTS<span className="mobile-hero__period">.</span>
              </m.span>
            </span>
          </h1>
        </m.div>

        <m.div
          className="mobile-hero__visual"
          style={reducedMotion ? undefined : { y: artY, scale: artScale, rotateX: artRotate }}
          initial={reducedMotion ? false : { opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.05, delay: 0.35, ease: easing }}
        >
          <div className="mobile-hero__visual-glow" aria-hidden="true" />
          <div className="mobile-hero__project-art">
            <HeroVisual />
          </div>
        </m.div>

        <m.div
          className="mobile-hero__summary"
          initial={reducedMotion ? false : { opacity: 0, y: 17 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.72, ease: easing }}
        >
          <p>
            {profile.introduction}
          </p>
          <div className="mobile-hero__actions">
            <m.a
              href="#work"
              className="mobile-hero__primary"
              whileHover={reducedMotion ? undefined : { y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore projects <span aria-hidden="true">↗</span>
            </m.a>

            <m.a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="mobile-hero__github"
              style={{ gridColumn: "1 / -1" }}
              whileHover={reducedMotion ? undefined : { y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              GitHub repository <span aria-hidden="true">↗</span>
            </m.a>
          </div>
        </m.div>

        <m.div
          className="mobile-hero__bottomline"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.95 }}
        >

          <a className="mobile-hero__scroll" href="#work">
            <span>SCROLL</span><b aria-hidden="true">↓</b>
          </a>
        </m.div>
      </div>
    </section>
  );
}
