"use client";

import { useEffect } from "react";
import { useReducedMotion } from "motion/react";

/** Mobile-only reveal choreography. Desktop animation and layout remain untouched. */
export function MobileMotionRuntime() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");
    if (!media.matches || reduceMotion) return;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-mobile-reveal]"));
    if (!nodes.length) return;

    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-mobile-visible"));
      return;
    }

    document.documentElement.classList.add("mobile-motion-ready");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-mobile-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });

    nodes.forEach((node) => observer.observe(node));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("mobile-motion-ready");
    };
  }, [reduceMotion]);

  return null;
}
