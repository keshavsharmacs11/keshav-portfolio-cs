"use client";

import { ArrowUpRight, Blocks, BrainCircuit, Layers3, PanelsTopLeft } from "lucide-react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

const capabilities = [
  { icon: PanelsTopLeft, title: "Frontend development", text: "Responsive React and Next.js interfaces, built with reusable components and clear interaction patterns.", tags: ["Responsive layouts", "Component systems", "UI refinement"] },
  { icon: Layers3, title: "Full-stack workflows", text: "Connected application features, from API and database logic to authentication, booking and payments.", tags: ["API workflows", "Database features", "Booking & payments"] },
  { icon: Blocks, title: "Digital platforms", text: "Storefronts and community websites shaped around clear customer journeys.", tags: ["Commerce", "Community websites", "Customer journeys"] },
  { icon: BrainCircuit, title: "Applied machine learning", text: "Python projects covering dataset preparation, feature engineering and prediction workflows.", tags: ["Data preparation", "Feature engineering", "Prediction workflows"] },
];

export function CapabilitiesSection() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="capabilities-section section-pad" id="capabilities">
      <div className="page-shell">
        <m.div className="capabilities-heading" data-mobile-reveal initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.65 }}>
          <div>
            <span className="section-kicker"><i /> FOCUS AREAS</span>
            <h2 className="section-title">WHAT I<br /><em>WORK ON.</em></h2>
          </div>
          <p className="section-intro">From responsive interfaces and product workflows to applied ML experiments.</p>
        </m.div>
        <div className="capability-grid">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <m.article className="capability-card" key={item.title} data-mobile-reveal initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55, delay: index * 0.06 }}>
                <div className="capability-card__top" style={{ justifyContent: "flex-end" }}><Icon size={22} strokeWidth={1.5} /></div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <div className="capability-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <span className="capability-card__corner" aria-hidden="true"><ArrowUpRight size={18} /></span>
              </m.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
