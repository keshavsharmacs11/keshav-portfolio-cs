"use client";

import type { ReactNode } from "react";
import { LazyMotion } from "motion/react";

const loadFeatures = () => import("./motion-features").then((module) => module.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
}
