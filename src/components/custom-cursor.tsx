"use client";

import { useEffect, useState } from "react";
import { useMotionValue, useSpring } from "motion/react";
import * as m from "motion/react-m";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-80);
  const y = useMotionValue(-80);
  const springX = useSpring(x, { stiffness: 520, damping: 34, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 520, damping: 34, mass: 0.45 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX - 16);
      y.set(event.clientY - 16);
      setVisible(true);
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      setActive(Boolean(target?.closest("a, button, [data-cursor='hover']")));
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("pointerenter", onEnter);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("pointerenter", onEnter);
    };
  }, [x, y]);

  return (
    <m.div
      className={`custom-cursor ${active ? "custom-cursor--active" : ""}`}
      style={{ x: springX, y: springY }}
      animate={{ opacity: visible ? 1 : 0, scale: active ? 1.5 : 1 }}
      transition={{ duration: 0.18 }}
      aria-hidden="true"
    >
      <span />
    </m.div>
  );
}
