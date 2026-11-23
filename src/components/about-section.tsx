"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { profile, skillGroups } from "@/data/portfolio";

export function AboutSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="about-section section-pad" id="about">
      <div className="page-shell">
        <div className="about-layout">
          <m.div
            className="about-stamp"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.86, rotate: -8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="about-stamp__circle"><span>KS</span></div>
            <span className="about-stamp__caption">CURIOUS BY NATURE<br />BUILDER BY CHOICE</span>
            <span className="about-stamp__orbit about-stamp__orbit--one" />
            <span className="about-stamp__orbit about-stamp__orbit--two" />
          </m.div>

          <m.div
            className="about-copy"
            initial={reduceMotion ? false : { opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-kicker"><i /> THE PERSON BEHIND THE PIXELS</span>
            <h2 className="section-title">ENGINEERING<br />WITH A <em>BUILDER'S MINDSET.</em></h2>
            <p>{profile.about}</p>
          </m.div>
        </div>

        <m.div
          className="education-panel"
          id="education"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <span className="education-panel__label">EDUCATION</span>
            <h3>{profile.education.qualification}</h3>
            <p>{profile.education.institution} <span>·</span> {profile.education.period}</p>
          </div>
          <div className="education-panel__coursework">
            <span>RELEVANT COURSEWORK</span>
            <p>{profile.education.coursework.join(" · ")}</p>
          </div>
        </m.div>

        <div className="skills-section" id="skills">
          <m.div
            className="skills-heading"
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <span className="section-kicker"><i /> TECHNICAL SKILLS</span>
            <h3>BUILT WITH <em>INTENTION.</em></h3>
          </m.div>

          <div className="skill-groups">
            {skillGroups.map((group, index) => (
              <m.div
                className="skill-group"
                key={group.number}
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h4>{group.title}</h4>
                <div className="skill-pills">
                  {group.items.map((item) => (
                    <m.span
                      key={item}
                      whileHover={reduceMotion ? undefined : { y: -4, color: "#ffffff", borderColor: "rgba(164,122,255,.8)" }}
                      transition={{ duration: 0.18 }}
                    >
                      {item}
                    </m.span>
                  ))}
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
