import Lenis from "lenis";

/**
 * One scroll clock for the portfolio.
 * Lenis advances first; then pinned sections read their own geometry and
 * update transforms directly. Scroll choreography never writes React state.
 */

type FrameSubscriber = (time: number) => void;

const subscribers = new Set<FrameSubscriber>();
let lenis: Lenis | null = null;
let rafId = 0;
let running = false;
let reducedMotion = false;

export function startPortfolioScroll(reduceMotion: boolean): () => void {
  if (running) return stopPortfolioScroll;

  running = true;
  reducedMotion = reduceMotion;
  if (!reduceMotion) {
    lenis = new Lenis({
      autoRaf: false,
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      syncTouch: false,
      anchors: true,
    });
  }

  const tick = (time: number) => {
    lenis?.raf(time);
    subscribers.forEach((subscriber) => subscriber(time));
    rafId = window.requestAnimationFrame(tick);
  };

  rafId = window.requestAnimationFrame(tick);
  return stopPortfolioScroll;
}

export function stopPortfolioScroll() {
  if (!running) return;
  window.cancelAnimationFrame(rafId);
  lenis?.destroy();
  lenis = null;
  running = false;
}

export function onPortfolioFrame(subscriber: FrameSubscriber): () => void {
  subscribers.add(subscriber);
  return () => subscribers.delete(subscriber);
}

export function scrollPortfolioTo(target: string | number) {
  if (typeof target === "number") {
    if (lenis && !reducedMotion) lenis.scrollTo(target, { duration: 1.25 });
    else window.scrollTo({ top: target, behavior: reducedMotion ? "auto" : "smooth" });
    return;
  }

  const element = document.querySelector<HTMLElement>(target);
  if (!element) return;
  if (lenis && !reducedMotion) lenis.scrollTo(element, { duration: 1.25, offset: -72 });
  else element.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
}

export function pinProgress(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const range = Math.max(1, rect.height - viewportHeight);
  const progress = Math.min(1, Math.max(0, -rect.top / range));
  return { progress, rect, viewportHeight };
}

export function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function segment(value: number, start: number, end: number) {
  return clamp01((value - start) / Math.max(0.0001, end - start));
}

export function easeOutCubic(value: number) {
  const t = clamp01(value);
  return 1 - Math.pow(1 - t, 3);
}
