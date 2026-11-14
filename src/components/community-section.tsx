"use client";

import { ArrowUpRight, BookOpen, HeartHandshake, Orbit } from "lucide-react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

const pillars = [
  {
    number: "01",
    icon: HeartHandshake,
    title: "Technology for people",
    copy: "Digital experiences should make useful information, services and opportunities easier to reach.",
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Share the thinking",
    copy: "The decisions behind a build matter too. This space is designed to grow into practical notes and breakdowns.",
  },
  {
    number: "03",
    icon: Orbit,
    title: "Experiment in the open",
    copy: "From interface studies to applied machine-learning experiments, curiosity belongs in the process.",
  },
];

export function CommunitySection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="community-section section-pad" id="community">
      <div className="page-shell">
        <m.div
          className="community-heading" data-mobile-reveal
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <span className="section-kicker"><i /> 05 / BEYOND THE SCREEN</span>
            <h2 className="section-title">BUILD FOR PEOPLE.<br /><em>SHARE WHAT YOU LEARN.</em></h2>
          </div>
          <p className="section-intro">
            Good technology should do more than look impressive. It should help people find opportunities, solve real problems and make the next idea easier to build.
          </p>
        </m.div>

        <m.a
          href="https://kwe-website.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="community-feature"
          data-mobile-reveal
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.16 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          whileHover={reduceMotion ? undefined : { y: -5 }}
        >
          <div className="community-feature__visual" aria-hidden="true">
            <span className="community-feature__orbit community-feature__orbit--one" />
            <span className="community-feature__orbit community-feature__orbit--two" />
            <span className="community-feature__monogram">KWE</span>
            <span className="community-feature__caption">COMMUNITY / DIGITAL ACCESS</span>
          </div>
          <div className="community-feature__copy">
            <span className="community-feature__label">FEATURED COMMUNITY WORK / 01</span>
            <h3>A digital home for women building businesses.</h3>
            <p>
              KWE brings together community identity, events, members and opportunities in one responsive digital experience for Kurukshetra Women Entrepreneurs.
            </p>
            <span className="community-feature__link">Explore the KWE project <ArrowUpRight size={16} /></span>
          </div>
        </m.a>

        <div className="community-pillars">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <m.article
                className="community-pillar"
                key={item.number}
                data-mobile-reveal
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.56, delay: index * 0.08 }}
              >
                <div className="community-pillar__top"><span>{item.number}</span><Icon size={19} strokeWidth={1.5} /></div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </m.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
