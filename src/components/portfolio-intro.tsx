"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { projects, profile } from "@/data/portfolio";
import styles from "./portfolio-intro.module.css";

const INTRO_KEY = "keshav-portfolio-intro-seen-v1";
const INTRO_DURATION = 3400;

export function PortfolioIntro() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const finishedRef = useRef(false);

  const finishIntro = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    try {
      window.sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      // The intro still works when browser storage is unavailable.
    }

    setProgress(100);
    setLeaving(true);
    window.setTimeout(() => setVisible(false), 720);
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasHash = window.location.hash.length > 0;
    let alreadySeen = false;

    try {
      alreadySeen = window.sessionStorage.getItem(INTRO_KEY) === "1";
    } catch {
      alreadySeen = false;
    }

    if (reduceMotion || hasHash || alreadySeen) return;

    setVisible(true);
    const startedAt = performance.now();
    let loadedPosters = 0;
    let frame = 0;
    let exitTimer = 0;
    let lastProgress = -1;
    const totalPosters = projects.length;
    const posterImages: HTMLImageElement[] = [];

    const markPosterReady = () => {
      loadedPosters += 1;
    };

    projects.forEach((project) => {
      const image = new window.Image();
      image.onload = markPosterReady;
      image.onerror = markPosterReady;
      image.src = project.image;
      posterImages.push(image);
    });

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const timeProgress = Math.min(1, elapsed / INTRO_DURATION);
      const posterProgress = totalPosters > 0 ? loadedPosters / totalPosters : 1;
      const nextProgress = Math.min(99, Math.round(timeProgress * 72 + posterProgress * 27));

      if (nextProgress !== lastProgress) {
        lastProgress = nextProgress;
        setProgress(nextProgress);
      }

      if (elapsed >= INTRO_DURATION) {
        setProgress(100);
        exitTimer = window.setTimeout(finishIntro, 420);
        return;
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter") finishIntro();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(exitTimer);
      window.removeEventListener("keydown", onKeyDown);
      posterImages.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
    // This is a one-time entry sequence; project posters are static portfolio data.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`${styles.intro} ${leaving ? styles.leaving : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${profile.name} portfolio introduction`}
    >
      <div className={styles.ambient} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.orb} aria-hidden="true" />

      <header className={styles.topbar}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>K<span>.</span></span>
          <span className={styles.brandText}>KESHAV SHARMA<br />PORTFOLIO / 2026</span>
        </div>
        <span className={styles.topIndex}>INDEPENDENT DEVELOPER <i /> INDIA</span>
      </header>

      <main className={styles.main}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}><span /> DIGITAL PRODUCTS · FULL-STACK · AI / ML</p>
          <h1 className={styles.name} aria-label={profile.name}>
            <span className={styles.nameLine}>Keshav</span>
            <span className={styles.nameLine}><em>Sharma.</em></span>
          </h1>
          <p className={styles.statement}>
            Turning ideas into <span>digital experiences</span> that work in the real world.
          </p>
          <div className={styles.tags}>
            <span>REACT / NEXT.JS</span><b>✳</b><span>TYPESCRIPT</span><b>✳</b><span>PYTHON / ML</span>
          </div>
        </div>

        <div className={styles.stage} aria-hidden="true">
          <div className={styles.stageGlow} />
          <div className={styles.ring}>
            {projects.map((project, index) => {
              const cardStyle = {
                "--angle": `${(360 / projects.length) * index}deg`,
                "--depth": "clamp(145px, 21vw, 278px)",
                "--card-delay": `${index * 70}ms`,
              } as CSSProperties;

              return (
                <div className={styles.card} style={cardStyle} key={project.number}>
                  <div
                    className={styles.cardImage}
                    style={{ backgroundImage: `linear-gradient(180deg, rgba(7,9,18,.02) 15%, rgba(7,9,18,.82) 100%), url("${project.image}")` }}
                  />
                  <span className={styles.cardTop}>{project.number} / {project.status}</span>
                  <span className={styles.cardTitle}>{project.name}</span>
                  <span className={styles.cardCategory}>{project.category}</span>
                </div>
              );
            })}
          </div>
          <div className={styles.ringCore} />
          <span className={styles.stageCaption}>SELECTED WORK / 01—07</span>
        </div>
      </main>

      <footer className={styles.bottomBar}>
        <div className={styles.loadingCopy}>
          <span className={styles.loadingLabel}>PREPARING THE EXPERIENCE</span>
          <span className={styles.loadingTrack}><i style={{ width: `${progress}%` }} /></span>
        </div>
        <div className={styles.counter} aria-live="polite">
          <strong>{String(progress).padStart(3, "0")}</strong><span>%</span>
        </div>
        <button className={styles.skip} type="button" onClick={finishIntro}>
          SKIP INTRO <span aria-hidden="true">↗</span>
        </button>
      </footer>
    </div>
  );
}
