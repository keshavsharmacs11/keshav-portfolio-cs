"use client";

import { useEffect } from "react";
import { useReducedMotion } from "motion/react";
import { startPortfolioScroll } from "@/lib/portfolio-scroll";

/** Mount once near the app root. Owns the only Lenis/requestAnimationFrame loop. */
export function PortfolioScrollRuntime() {
  const reduceMotion = useReducedMotion();

  useEffect(() => startPortfolioScroll(Boolean(reduceMotion)), [reduceMotion]);

  return null;
}
