"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Award,
  CalendarDays,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { certifications, type CertificationCategory } from "@/data/certifications";

const filters: Array<"All" | CertificationCategory> = [
  "All",
  "Development",
  "AI/ML",
  "Cloud",
  "Tools",
];

const accents = ["violet", "amber", "blue", "green"] as const;

/*
 * Self-contained styles for the certifications section.
 * This intentionally avoids CSS Modules so the section remains styled even
 * when a separate .module.css file is misplaced during ZIP extraction.
 */
const CERTIFICATION_STYLES = `
.certs-section{position:relative;isolation:isolate;overflow:hidden;padding:clamp(84px,9vw,132px) 0 clamp(88px,10vw,142px);color:#f5f4fb;background:radial-gradient(ellipse at 12% 8%,rgba(91,76,180,.15),transparent 34%),linear-gradient(145deg,#0b0e17 0%,#0c0e1a 52%,#0a0d16 100%)}
.certs-section *{box-sizing:border-box}
.certs-shell{position:relative;z-index:2;width:min(1440px,calc(100% - clamp(36px,7.5vw,120px)));margin-inline:auto}
.certs-ambient{position:absolute;z-index:-1;top:-280px;right:-160px;width:650px;height:650px;border:1px solid rgba(163,122,255,.25);border-radius:50%;box-shadow:0 0 0 30px rgba(129,94,229,.025),0 0 0 72px rgba(129,94,229,.018),inset 0 0 70px rgba(131,91,255,.09);pointer-events:none}
.certs-orbit{position:absolute;z-index:-1;right:-8%;bottom:-53%;width:58vw;min-width:480px;aspect-ratio:1;border:1px solid rgba(144,110,248,.15);border-radius:50%;box-shadow:0 0 55px rgba(115,83,221,.08),inset 0 0 65px rgba(115,83,221,.05);pointer-events:none}
.certs-grid{position:absolute;z-index:-1;inset:0;opacity:.14;background-image:linear-gradient(rgba(187,185,225,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(187,185,225,.055) 1px,transparent 1px);background-size:72px 72px;mask-image:linear-gradient(180deg,#000,transparent 95%);pointer-events:none}
.certs-heading{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(280px,.8fr);align-items:end;gap:clamp(34px,7vw,108px)}
.certs-kicker{display:inline-flex;align-items:center;gap:12px;color:#c0b7e9;font:600 10px/1.4 var(--font-mono,ui-monospace,monospace);letter-spacing:.17em}
.certs-kicker i{display:inline-block;width:28px;height:1px;background:linear-gradient(90deg,#ae83ff,#677dff)}
.certs-title{margin:27px 0 0;color:#f7f6fc;font:650 clamp(52px,7vw,94px)/.88 var(--font-display,Arial,sans-serif);letter-spacing:-.085em}
.certs-title em{color:transparent;font-style:normal;background:linear-gradient(100deg,#b58aff 0%,#8e8aff 56%,#76a0ff 100%);background-clip:text;-webkit-background-clip:text}
.certs-intro{max-width:440px;margin:0 0 11px;padding-left:26px;border-left:1px solid rgba(172,151,255,.46);color:#b9bfd0;font-size:clamp(14px,1.2vw,17px);line-height:1.85}
.certs-toolbar{display:flex;justify-content:space-between;align-items:center;gap:20px;margin:42px 0 27px}
.certs-filters{display:flex;flex-wrap:wrap;gap:10px}
.certs-filter{min-height:42px;padding:0 21px;border:1px solid rgba(172,157,229,.25);border-radius:999px;color:#c9cce0;background:rgba(16,18,35,.6);font:500 11px/1 var(--font-body,Arial,sans-serif);cursor:pointer;transition:color .22s ease,border-color .22s ease,background .22s ease,box-shadow .22s ease}
.certs-filter:hover{color:#fff;border-color:rgba(181,145,255,.65);background:rgba(124,91,226,.12)}
.certs-filter.is-active{color:#fff;border-color:rgba(208,188,255,.58);background:linear-gradient(110deg,#8951ec,#625fe9);box-shadow:0 5px 22px rgba(111,77,232,.3),inset 0 1px 0 rgba(255,255,255,.2)}
.certs-toolbar-note{display:inline-flex;flex:0 0 auto;align-items:center;gap:8px;color:#929bb4;font:600 8px/1 var(--font-mono,ui-monospace,monospace);letter-spacing:.14em}
.certs-toolbar-note svg{color:#a58aff}
.certs-cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:22px}
.certs-card{position:relative;display:flex;flex-direction:column;min-width:0;overflow:hidden;border:1px solid rgba(167,146,242,.28);border-radius:19px;background:linear-gradient(145deg,rgba(23,23,45,.94),rgba(14,17,31,.96));box-shadow:0 18px 48px rgba(0,0,0,.22),inset 0 1px rgba(255,255,255,.045);transition:border-color .28s ease,box-shadow .28s ease}
.certs-card:hover{border-color:rgba(180,151,255,.66);box-shadow:0 24px 58px rgba(0,0,0,.3),0 0 30px rgba(128,91,235,.12),inset 0 1px rgba(255,255,255,.07)}
.certs-art{position:relative;display:grid;min-height:148px;place-items:center;overflow:hidden;border-bottom:1px solid rgba(185,164,255,.15);background:linear-gradient(135deg,rgba(75,71,150,.34),rgba(24,27,55,.6))}
.certs-card--amber .certs-art{background:linear-gradient(135deg,rgba(121,81,43,.34),rgba(28,24,34,.72))}
.certs-card--blue .certs-art{background:linear-gradient(135deg,rgba(54,81,153,.34),rgba(24,25,56,.7))}
.certs-card--green .certs-art{background:linear-gradient(135deg,rgba(20,104,79,.3),rgba(16,32,40,.72))}
.certs-art-lines{position:absolute;inset:0;opacity:.7;background:radial-gradient(ellipse at 15% 110%,rgba(135,106,255,.55),transparent 45%),radial-gradient(ellipse at 90% 120%,rgba(146,89,255,.28),transparent 38%)}
.certs-card--amber .certs-art-lines{background:radial-gradient(ellipse at 90% 110%,rgba(224,151,61,.55),transparent 48%)}
.certs-card--blue .certs-art-lines{background:radial-gradient(ellipse at 10% 110%,rgba(74,125,255,.46),transparent 48%),radial-gradient(ellipse at 90% 100%,rgba(147,90,255,.26),transparent 42%)}
.certs-card--green .certs-art-lines{background:radial-gradient(ellipse at 80% 110%,rgba(15,194,130,.42),transparent 48%)}
.certs-art-lines:after{position:absolute;right:-8%;bottom:-48%;left:-8%;height:90%;border:1px solid rgba(173,139,255,.42);border-radius:50%;box-shadow:0 -12px 32px rgba(137,99,255,.12);content:"";transform:rotate(-8deg)}
.certs-art-halo{position:absolute;width:140px;height:140px;border-radius:50%;background:rgba(143,108,255,.16);filter:blur(38px)}
.certs-art-mark{position:relative;z-index:1;display:grid;min-width:72px;min-height:62px;place-items:center;color:#ded3ff;font:700 33px/1 var(--font-display,Arial,sans-serif);letter-spacing:-.06em;text-shadow:0 0 25px rgba(182,153,255,.35)}
.certs-card--amber .certs-art-mark{color:#f0c17b}.certs-card--blue .certs-art-mark{color:#91b8ff}.certs-card--green .certs-art-mark{color:#6be2b2}
.certs-art-label{position:absolute;bottom:13px;left:16px;color:rgba(227,225,249,.69);font:600 7px/1 var(--font-mono,ui-monospace,monospace);letter-spacing:.15em}
.certs-art-arrow{position:absolute;top:17px;right:17px;color:rgba(239,235,255,.75)}
.certs-card-body{display:flex;flex:1 1 auto;flex-direction:column;padding:19px 19px 17px}
.certs-issuer{display:flex;align-items:center;gap:9px;min-height:24px;color:#bfc5d7;font-size:10px;line-height:1.35}
.certs-issuer-mark{display:grid;flex:0 0 23px;width:23px;height:23px;place-items:center;border:1px solid rgba(177,153,255,.35);border-radius:50%;color:#d3c2ff;background:rgba(133,103,233,.13);font:700 11px/1 var(--font-display,Arial,sans-serif)}
.certs-card-title{min-height:54px;margin:14px 0 17px;color:#f4f2fb;font:600 clamp(16px,1.25vw,19px)/1.28 var(--font-display,Arial,sans-serif);letter-spacing:-.045em}
.certs-tags{display:flex;flex-wrap:wrap;gap:7px;margin-top:auto}
.certs-tags span{display:inline-flex;align-items:center;min-height:30px;padding:0 11px;border:1px solid rgba(182,170,225,.2);border-radius:999px;color:#cbd0e1;background:rgba(255,255,255,.035);font-size:9px;white-space:nowrap}
.certs-card-footer{display:flex;align-items:center;justify-content:space-between;gap:9px;min-height:68px;padding:12px 18px;border-top:1px solid rgba(185,164,255,.12);background:rgba(5,8,20,.27)}
.certs-date{display:inline-flex;align-items:center;gap:7px;min-width:0;color:#b8bfd3;font-size:10px;white-space:nowrap}
.certs-date svg{flex:0 0 auto;color:#9e91d7}
.certs-verify{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:38px;padding:0 14px;border:1px solid rgba(173,121,255,.8);border-radius:999px;color:#f4eaff;background:rgba(126,82,226,.1);font:650 10px/1 var(--font-body,Arial,sans-serif);white-space:nowrap;text-decoration:none;transition:background .22s ease,box-shadow .22s ease,transform .22s ease}
.certs-verify:hover{transform:translateY(-2px);background:rgba(133,87,231,.24);box-shadow:0 0 20px rgba(147,97,255,.18)}
.certs-add,.certs-unverified{display:inline-flex;align-items:center;gap:6px;color:#b8a9ed;font:600 9px/1 var(--font-body,Arial,sans-serif);white-space:nowrap}
.certs-empty-note{margin:19px 0 0;color:#838da7;font-size:11px;line-height:1.6;text-align:right}
.certs-empty-note code{color:#b7a3f7;font-size:.95em}
.certs-no-results{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:13px;min-height:170px;padding:24px;border:1px dashed rgba(172,157,229,.28);border-radius:18px;color:#aeb6ca;background:rgba(16,18,35,.48)}
.certs-no-results svg{color:#b29aff}.certs-no-results p{margin:0;font-size:13px}.certs-no-results button{border:0;color:#c4aaff;background:none;font:600 11px var(--font-body,Arial,sans-serif);cursor:pointer}
@media(max-width:1120px){.certs-cards{grid-template-columns:repeat(2,minmax(0,1fr))}.certs-art{min-height:135px}.certs-card-title{min-height:0}}
@media(max-width:680px){.certs-section{padding-block:76px 84px}.certs-shell{width:min(100% - 36px,520px)}.certs-heading{grid-template-columns:1fr;gap:23px}.certs-kicker{font-size:8px;letter-spacing:.13em}.certs-title{margin-top:20px;font-size:clamp(49px,13vw,68px)}.certs-intro{max-width:42ch;margin:0;padding-left:15px;font-size:13px}.certs-toolbar{align-items:flex-start;flex-direction:column;gap:14px;margin:28px 0 18px}.certs-filters{gap:7px}.certs-filter{min-height:35px;padding-inline:14px;font-size:10px}.certs-cards{grid-template-columns:1fr;gap:14px}.certs-art{min-height:125px}.certs-card-body{padding:16px}.certs-card-title{min-height:0;margin:12px 0 14px;font-size:19px}.certs-card-footer{min-height:61px;padding:10px 15px}.certs-empty-note{text-align:left}}
@media(prefers-reduced-motion:reduce){.certs-card,.certs-filter,.certs-verify{transition:none!important}}
`;

export function CertificationsSection() {
  const [activeFilter, setActiveFilter] = useState<"All" | CertificationCategory>("All");
  const reduceMotion = useReducedMotion();

  const visibleCertifications = useMemo(
    () => activeFilter === "All"
      ? certifications
      : certifications.filter((item) => item.category === activeFilter),
    [activeFilter],
  );

  const isEmpty = certifications.length === 0;

  return (
    <>
      <style>{CERTIFICATION_STYLES}</style>
      <section className="certs-section" id="certifications" aria-labelledby="certifications-title">
        <div className="certs-ambient" aria-hidden="true" />
        <div className="certs-orbit" aria-hidden="true" />
        <div className="certs-grid" aria-hidden="true" />

        <div className="certs-shell">
          <m.div
            className="certs-heading"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <span className="certs-kicker"><i /> CERTIFICATIONS &amp; CREDENTIALS</span>
              <h2 className="certs-title" id="certifications-title">LEARNING,<br /><em>PROVEN.</em></h2>
            </div>
            <p className="certs-intro">
              Certifications that reflect continuous learning, technical depth and a commitment to building real-world solutions.
            </p>
          </m.div>

          <div className="certs-toolbar">
            {isEmpty ? (
              <div className="certs-toolbar-note"><ShieldCheck size={15} /> CREDENTIALS WILL APPEAR HERE</div>
            ) : (
              <div className="certs-filters" role="group" aria-label="Filter certifications">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={`certs-filter ${activeFilter === filter ? "is-active" : ""}`}
                    aria-pressed={activeFilter === filter}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            )}
            <div className="certs-toolbar-note"><ShieldCheck size={15} /> VERIFIED LEARNING</div>
          </div>

          {isEmpty ? (
            <div className="certs-cards">
              {accents.map((accent, index) => (
                <m.article
                  className={`certs-card certs-card--${accent}`}
                  key={accent}
                  initial={reduceMotion ? false : { opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.16 }}
                  transition={{ duration: 0.55, delay: reduceMotion ? 0 : index * 0.07 }}
                  whileHover={reduceMotion ? undefined : { y: -6 }}
                >
                  <div className="certs-art">
                    <div className="certs-art-lines" />
                    <div className="certs-art-halo" />
                    <div className="certs-art-mark"><Award size={52} strokeWidth={1.35} /></div>
                    <span className="certs-art-label">YOUR NEXT CREDENTIAL</span>
                    <ArrowUpRight className="certs-art-arrow" size={19} />
                  </div>
                  <div className="certs-card-body">
                    <div className="certs-issuer">
                      <span className="certs-issuer-mark">+</span>
                      <span>YOUR ISSUING ORGANIZATION</span>
                    </div>
                    <h3 className="certs-card-title">Add your certificate title</h3>
                    <div className="certs-tags"><span>Skills</span><span>Technology</span><span>Topic</span></div>
                  </div>
                  <div className="certs-card-footer">
                    <span className="certs-date"><CalendarDays size={15} /> Completion date</span>
                    <span className="certs-add">Add details <ArrowUpRight size={14} /></span>
                  </div>
                </m.article>
              ))}
            </div>
          ) : visibleCertifications.length ? (
            <div className="certs-cards">
              {visibleCertifications.map((item, index) => {
                const accent = accents[index % accents.length];
                return (
                  <m.article
                    className={`certs-card certs-card--${accent}`}
                    key={item.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.16 }}
                    transition={{ duration: 0.55, delay: reduceMotion ? 0 : index * 0.06 }}
                    whileHover={reduceMotion ? undefined : { y: -6 }}
                  >
                    <div className="certs-art">
                      <div className="certs-art-lines" />
                      <div className="certs-art-halo" />
                      <div className="certs-art-mark">{item.issuerMark}</div>
                      <span className="certs-art-label">{item.category.toUpperCase()}</span>
                      <ArrowUpRight className="certs-art-arrow" size={19} />
                    </div>
                    <div className="certs-card-body">
                      <div className="certs-issuer">
                        <span className="certs-issuer-mark">{item.issuerMark.slice(0, 2)}</span>
                        <span>{item.issuer}</span>
                      </div>
                      <h3 className="certs-card-title">{item.title}</h3>
                      <div className="certs-tags">
                        {item.skills.map((skill) => <span key={skill}>{skill}</span>)}
                      </div>
                    </div>
                    <div className="certs-card-footer">
                      <span className="certs-date"><CalendarDays size={15} /> {item.completedAt}</span>
                      {item.credentialUrl ? (
                        <a className="certs-verify" href={item.credentialUrl} target="_blank" rel="noopener noreferrer">
                          Verify <ExternalLink size={14} />
                        </a>
                      ) : (
                        <span className="certs-unverified">Details available</span>
                      )}
                    </div>
                  </m.article>
                );
              })}
            </div>
          ) : (
            <div className="certs-no-results">
              <Sparkles size={20} />
              <p>No credentials in this category yet.</p>
              <button type="button" onClick={() => setActiveFilter("All")}>View all credentials</button>
            </div>
          )}

          {isEmpty && (
            <p className="certs-empty-note">
              Add your real credentials in <code>src/data/certifications.ts</code> when ready.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
