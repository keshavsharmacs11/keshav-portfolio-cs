"use client";

import { useState } from "react";
import { AnimatePresence, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import * as m from "motion/react-m";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 720;
    setVisible((current) => current === next ? current : next);
  });

  return (
    <AnimatePresence>
      {visible && (
        <m.a className="back-to-top" href="#home" aria-label="Back to top" initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.94 }} whileHover={reduceMotion ? undefined : { y: -4 }} whileTap={{ scale: 0.94 }}>
          ↑ <span>TOP</span>
        </m.a>
      )}
    </AnimatePresence>
  );
}
