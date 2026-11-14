"use client";

import { useScroll, useSpring } from "motion/react";
import * as m from "motion/react-m";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <m.div
      className="scroll-progress"
      style={{ scaleX, transformOrigin: "0% 50%" }}
      aria-hidden="true"
    />
  );
}
