"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  CalendarDays,
  ExternalLink,
  FileCheck2,
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

const placeholderSlots: Array<{ id: string; category: CertificationCategory; accent: string; mark: string }> = [
  { id: "development-slot", category: "Development", accent: "violet", mark: "DEV" },
  { id: "ai-ml-slot", category: "AI/ML", accent: "blue", mark: "AI" },
  { id: "cloud-slot", category: "Cloud", accent: "amber", mark: "CLOUD" },
  { id: "tools-slot", category: "Tools", accent: "green", mark: "TOOLS" },
];

const CERTIFICATE_CSS = String.raw`
.certificate-section{position:relative;isolation:isolate;overflow:hidden;padding:clamp(82px,8vw,118px) 0 clamp(86px,8vw,116px);color:#f5f4fb;background:radial-gradient(ellipse at 12% 8%,rgba(91,76,180,.15),transparent 34%),radial-gradient(ellipse at 92% 66%,rgba(79,99,210,.10),transparent 33%),linear-gradient(145deg,#0b0e17 0%,#0c0e1a 52%,#0a0d16 100%);scroll-margin-top:126px}
.certificate-section *{box-sizing:border-box}
.certificate-section__ambient{position:absolute;z-index:-1;top:-330px;right:-180px;width:660px;aspect-ratio:1;border:1px solid rgba(163,122,255,.24);border-radius:50%;box-shadow:0 0 0 34px rgba(129,94,229,.025),0 0 0 82px rgba(129,94,229,.018),inset 0 0 90px rgba(131,91,255,.09);pointer-events:none}
.certificate-section__grid{position:absolute;z-index:-1;inset:0;opacity:.12;background-image:linear-gradient(rgba(187,185,225,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(187,185,225,.055) 1px,transparent 1px);background-size:68px 68px;mask-image:linear-gradient(180deg,#000,transparent 92%);pointer-events:none}
.certificate-shell{width:min(1440px,calc(100% - clamp(36px,7.5vw,120px)));margin-inline:auto}
.certificate-heading{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(280px,.8fr);align-items:end;gap:clamp(32px,6vw,96px)}
.certificate-kicker{display:inline-flex;align-items:center;gap:12px;color:#c0b7e9;font:600 10px/1.4 var(--font-mono,ui-monospace,monospace);letter-spacing:.17em}
.certificate-kicker i{display:inline-block;width:28px;height:1px;background:linear-gradient(90deg,#ae83ff,#677dff)}
.certificate-title{margin:24px 0 0;color:#f7f6fc;font:650 clamp(50px,6.8vw,88px)/.9 var(--font-display,Arial,sans-serif);letter-spacing:-.085em}
.certificate-title em{color:transparent;font-style:normal;background:linear-gradient(100deg,#b58aff 0%,#8e8aff 56%,#76a0ff 100%);background-clip:text;-webkit-background-clip:text}
.certificate-intro{max-width:460px;margin:0 0 8px;padding-left:25px;border-left:1px solid rgba(172,151,255,.46);color:#b9bfd0;font-size:clamp(14px,1.14vw,16px);line-height:1.82}
.certificate-toolbar{display:flex;align-items:center;justify-content:space-between;gap:18px;margin:34px 0 22px}
.certificate-filters{display:flex;flex-wrap:wrap;gap:9px}
.certificate-filter{min-height:38px;padding:0 18px;border:1px solid rgba(172,157,229,.25);border-radius:999px;color:#c9cce0;background:rgba(16,18,35,.6);font:500 10px/1 var(--font-body,Arial,sans-serif);cursor:pointer;transition:color .22s ease,border-color .22s ease,background .22s ease,box-shadow .22s ease}
.certificate-filter:hover{color:#fff;border-color:rgba(181,145,255,.65);background:rgba(124,91,226,.12)}
.certificate-filter.is-active{color:#fff;border-color:rgba(208,188,255,.58);background:linear-gradient(110deg,#8951ec,#625fe9);box-shadow:0 5px 22px rgba(111,77,232,.3),inset 0 1px 0 rgba(255,255,255,.2)}
.certificate-count{display:inline-flex;align-items:center;gap:8px;color:#929bb4;font:600 8px/1 var(--font-mono,ui-monospace,monospace);letter-spacing:.13em;white-space:nowrap}
.certificate-count svg{color:#a58aff}
.certificate-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));align-items:stretch;gap:18px}
.certificate-card{position:relative;display:flex;min-width:0;flex-direction:column;overflow:hidden;border:1px solid rgba(167,146,242,.3);border-radius:17px;background:linear-gradient(145deg,rgba(23,23,45,.96),rgba(14,17,31,.98));box-shadow:0 18px 48px rgba(0,0,0,.24),inset 0 1px rgba(255,255,255,.045);transition:border-color .28s ease,box-shadow .28s ease,transform .28s ease}
.certificate-card:hover{border-color:rgba(180,151,255,.68);box-shadow:0 24px 58px rgba(0,0,0,.32),0 0 30px rgba(128,91,235,.14),inset 0 1px rgba(255,255,255,.08)}
.certificate-preview{position:relative;display:grid;min-height:178px;place-items:center;overflow:hidden;padding:15px;background:linear-gradient(135deg,rgba(75,71,150,.26),rgba(24,27,55,.55));border-bottom:1px solid rgba(185,164,255,.16)}
.certificate-card--amber .certificate-preview{background:linear-gradient(135deg,rgba(121,81,43,.28),rgba(28,24,34,.72))}
.certificate-card--blue .certificate-preview{background:linear-gradient(135deg,rgba(54,81,153,.28),rgba(24,25,56,.7))}
.certificate-card--green .certificate-preview{background:linear-gradient(135deg,rgba(20,104,79,.24),rgba(16,32,40,.72))}
.certificate-preview::before{position:absolute;inset:auto -8% -53%;height:92%;border:1px solid rgba(173,139,255,.45);border-radius:50%;box-shadow:0 -12px 32px rgba(137,99,255,.14);content:"";transform:rotate(-8deg)}
.certificate-preview::after{position:absolute;inset:0;background:radial-gradient(ellipse at 15% 110%,rgba(135,106,255,.27),transparent 48%);content:"";pointer-events:none}
.certificate-card--amber .certificate-preview::after{background:radial-gradient(ellipse at 90% 110%,rgba(224,151,61,.3),transparent 48%)}
.certificate-card--blue .certificate-preview::after{background:radial-gradient(ellipse at 90% 100%,rgba(147,90,255,.28),transparent 46%)}
.certificate-card--green .certificate-preview::after{background:radial-gradient(ellipse at 80% 110%,rgba(15,194,130,.26),transparent 48%)}
.certificate-preview__paper{position:relative;z-index:1;display:flex;width:100%;min-height:144px;flex-direction:column;justify-content:space-between;gap:9px;padding:14px 15px;border:1px solid rgba(255,255,255,.72);border-radius:5px;color:#273044;background:linear-gradient(145deg,#f8f7ff 0%,#e8e9f7 100%);box-shadow:0 12px 30px rgba(0,0,0,.24);transform:rotate(-1.4deg);transition:transform .35s ease}
.certificate-card:hover .certificate-preview__paper{transform:rotate(0) translateY(-3px)}
.certificate-card--amber .certificate-preview__paper{background:linear-gradient(145deg,#fffaf0,#f3e4c8)}
.certificate-card--green .certificate-preview__paper{background:linear-gradient(145deg,#f1fff8,#d8f0e3)}
.certificate-card--blue .certificate-preview__paper{background:linear-gradient(145deg,#f6f9ff,#e1e9fa)}
.certificate-paper__top{display:flex;align-items:center;justify-content:space-between;gap:8px;color:#526078;font:700 9px/1 var(--font-body,Arial,sans-serif);letter-spacing:.06em}
.certificate-paper__seal{display:grid;width:28px;height:28px;place-items:center;border:1px solid rgba(88,99,144,.55);border-radius:50%;color:#596b9c}
.certificate-paper__line{height:5px;border-radius:5px;background:rgba(76,88,117,.19)}
.certificate-paper__line--title{width:76%;height:9px;background:rgba(52,63,92,.44)}
.certificate-paper__line--short{width:48%}
.certificate-paper__footer{display:flex;align-items:end;justify-content:space-between;color:#75809a;font:600 7px/1 var(--font-mono,monospace);letter-spacing:.07em}
.certificate-preview__placeholder{position:absolute;z-index:2;right:21px;bottom:20px;padding:5px 8px;border:1px solid rgba(255,255,255,.55);border-radius:4px;color:#fff;background:rgba(8,11,25,.55);font:600 7px/1 var(--font-mono,monospace);letter-spacing:.11em}
.certificate-preview__image{position:absolute;z-index:2;inset:0;width:100%;height:100%;object-fit:cover;background:#fff}
.certificate-body{display:flex;flex:1;flex-direction:column;padding:17px 17px 16px}
.certificate-issuer{display:flex;align-items:center;gap:8px;min-height:23px;color:#c3c9d9;font-size:10px;line-height:1.3}
.certificate-issuer__mark{display:grid;flex:0 0 23px;width:23px;height:23px;place-items:center;border:1px solid rgba(177,153,255,.35);border-radius:50%;color:#d3c2ff;background:rgba(133,103,233,.13);font:700 9px/1 var(--font-display,Arial,sans-serif)}
.certificate-name{min-height:48px;margin:12px 0 14px;color:#f4f2fb;font:600 clamp(15px,1.15vw,18px)/1.28 var(--font-display,Arial,sans-serif);letter-spacing:-.04em}
.certificate-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:auto}
.certificate-tags span{display:inline-flex;align-items:center;min-height:27px;padding:0 9px;border:1px solid rgba(182,170,225,.2);border-radius:999px;color:#cbd0e1;background:rgba(255,255,255,.035);font-size:8px;white-space:nowrap}
.certificate-footer{display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:59px;padding:10px 15px;border-top:1px solid rgba(185,164,255,.13);background:rgba(5,8,20,.28)}
.certificate-date{display:inline-flex;align-items:center;gap:6px;min-width:0;color:#b8bfd3;font-size:9px;white-space:nowrap}
.certificate-date svg{flex:0 0 auto;color:#9e91d7}
.certificate-verify{display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:34px;padding:0 12px;border:1px solid rgba(173,121,255,.8);border-radius:999px;color:#f4eaff;background:rgba(126,82,226,.1);font:650 9px/1 var(--font-body,Arial,sans-serif);white-space:nowrap;text-decoration:none;transition:background .22s ease,box-shadow .22s ease,transform .22s ease}
.certificate-verify:hover{transform:translateY(-2px);background:rgba(133,87,231,.24);box-shadow:0 0 20px rgba(147,97,255,.18)}
.certificate-placeholder-label{display:inline-flex;align-items:center;gap:6px;color:#b8a9ed;font:600 8px/1 var(--font-mono,monospace);letter-spacing:.07em}
.certificate-empty-note{margin:14px 0 0;color:#8992aa;font-size:10px;line-height:1.6}
.certificate-empty-note code{color:#b7a3f7}
.certificate-benefits{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px;margin-top:24px}
.certificate-benefit{display:flex;align-items:center;gap:14px;min-width:0;min-height:82px;padding:15px 18px;border:1px solid rgba(167,146,242,.24);border-radius:13px;background:linear-gradient(145deg,rgba(22,23,45,.76),rgba(13,17,31,.84));box-shadow:inset 0 1px rgba(255,255,255,.04)}
.certificate-benefit__icon{display:grid;flex:0 0 39px;width:39px;height:39px;place-items:center;color:#b996ff}
.certificate-benefit__copy{display:flex;min-width:0;flex-direction:column;gap:5px}
.certificate-benefit__copy strong{color:#f0effa;font:600 11px/1.25 var(--font-body,Arial,sans-serif)}
.certificate-benefit__copy span{color:#aeb6ca;font-size:9px;line-height:1.45}
.certificate-no-results{display:flex;align-items:center;gap:12px;min-height:120px;padding:22px;border:1px dashed rgba(172,157,229,.28);border-radius:16px;color:#aeb6ca;background:rgba(16,18,35,.45)}
.certificate-no-results p{margin:0;font-size:12px}
@media(max-width:1120px){.certificate-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.certificate-preview{min-height:165px}}
@media(max-width:700px){.certificate-section{padding-block:72px 78px;scroll-margin-top:90px}.certificate-shell{width:min(100% - 34px,540px)}.certificate-heading{grid-template-columns:1fr;gap:18px}.certificate-kicker{font-size:8px;letter-spacing:.13em}.certificate-title{margin-top:19px;font-size:clamp(48px,12.5vw,68px)}.certificate-intro{max-width:45ch;margin:0;padding-left:15px;font-size:13px;line-height:1.7}.certificate-toolbar{align-items:flex-start;flex-direction:column;gap:11px;margin:25px 0 17px}.certificate-filters{gap:7px}.certificate-filter{min-height:34px;padding-inline:13px;font-size:9px}.certificate-grid{grid-template-columns:1fr;gap:13px}.certificate-preview{min-height:166px}.certificate-body{padding:16px}.certificate-name{min-height:0;margin:10px 0 12px;font-size:18px}.certificate-footer{min-height:55px;padding:9px 13px}.certificate-benefits{grid-template-columns:1fr;gap:9px;margin-top:18px}.certificate-benefit{min-height:70px;padding:13px 15px}.certificate-empty-note{font-size:10px}}
@media(min-width:701px) and (max-width:1120px){.certificate-benefits{grid-template-columns:1fr 1fr}.certificate-benefit:last-child{grid-column:1/-1}}
@media(prefers-reduced-motion:reduce){.certificate-card,.certificate-preview__paper,.certificate-filter,.certificate-verify{transition:none!important}}
`;

function CertificatePaper({ mark }: { mark: string }) {
  return (
    <div className="certificate-preview__paper" aria-hidden="true">
      <div className="certificate-paper__top"><span>{mark}</span><span className="certificate-paper__seal"><Award size={16} /></span></div>
      <span className="certificate-paper__line certificate-paper__line--title" />
      <span className="certificate-paper__line" />
      <span className="certificate-paper__line certificate-paper__line--short" />
      <div className="certificate-paper__footer"><span>CERTIFICATE PREVIEW</span><span>ISSUER SEAL</span></div>
    </div>
  );
}

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
  const visiblePlaceholders = placeholderSlots.filter((item) => activeFilter === "All" || item.category === activeFilter);

  return (
    <>
      <style data-certificate-gallery="true">{CERTIFICATE_CSS}</style>
      <section className="certificate-section" id="certifications" aria-labelledby="certificate-title">
        <div className="certificate-section__ambient" aria-hidden="true" />
        <div className="certificate-section__grid" aria-hidden="true" />
        <div className="certificate-shell">
          <m.div
            className="certificate-heading"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <span className="certificate-kicker"><i /> CERTIFICATIONS &amp; CREDENTIALS</span>
              <h2 className="certificate-title" id="certificate-title">LEARNING,<br /><em>PROVEN.</em></h2>
            </div>
            <p className="certificate-intro">A curated collection of verified learning, technical growth and the skills I bring into real-world projects.</p>
          </m.div>

          <div className="certificate-toolbar">
            <div className="certificate-filters" role="group" aria-label="Filter certificates">
              {filters.map((filter) => (
                <button key={filter} type="button" className={`certificate-filter ${activeFilter === filter ? "is-active" : ""}`} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>
                  {filter}
                </button>
              ))}
            </div>
            <div className="certificate-count"><ShieldCheck size={14} /> {isEmpty ? "YOUR CREDENTIAL ARCHIVE" : `${visibleCertifications.length} CREDENTIAL${visibleCertifications.length === 1 ? "" : "S"}`}</div>
          </div>

          {isEmpty ? (
            <>
              <div className="certificate-grid">
                {visiblePlaceholders.map((slot, index) => (
                  <m.article
                    className={`certificate-card certificate-card--${slot.accent}`}
                    key={slot.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.14 }}
                    transition={{ duration: 0.52, delay: reduceMotion ? 0 : index * 0.06 }}
                    whileHover={reduceMotion ? undefined : { y: -5 }}
                  >
                    <div className="certificate-preview">
                      <CertificatePaper mark={slot.mark} />
                      <span className="certificate-preview__placeholder">ADD CERTIFICATE IMAGE</span>
                    </div>
                    <div className="certificate-body">
                      <div className="certificate-issuer"><span className="certificate-issuer__mark">+</span><span>ISSUING ORGANIZATION</span></div>
                      <h3 className="certificate-name">Your certificate title</h3>
                      <div className="certificate-tags"><span>{slot.category}</span><span>Add skills</span></div>
                    </div>
                    <div className="certificate-footer">
                      <span className="certificate-date"><CalendarDays size={14} /> Completion date</span>
                      <span className="certificate-placeholder-label"><FileCheck2 size={13} /> ADD DETAILS</span>
                    </div>
                  </m.article>
                ))}
              </div>
              <p className="certificate-empty-note">These are editable design placeholders, not claimed qualifications. Add your real certificate details and image paths in <code>src/data/certifications.ts</code>.</p>
            </>
          ) : visibleCertifications.length ? (
            <div className="certificate-grid">
              {visibleCertifications.map((item, index) => (
                <m.article
                  className={`certificate-card certificate-card--${["violet", "amber", "blue", "green"][index % 4]}`}
                  key={item.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.14 }}
                  transition={{ duration: 0.52, delay: reduceMotion ? 0 : index * 0.06 }}
                  whileHover={reduceMotion ? undefined : { y: -5 }}
                >
                  <div className="certificate-preview">
                    {item.previewImage ? (
                      // Certificate artwork is user-supplied from /public.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="certificate-preview__image" src={item.previewImage} alt={`${item.title} certificate`} loading="lazy" />
                    ) : <CertificatePaper mark={item.issuerMark} />}
                  </div>
                  <div className="certificate-body">
                    <div className="certificate-issuer"><span className="certificate-issuer__mark">{item.issuerMark.slice(0, 2)}</span><span>{item.issuer}</span></div>
                    <h3 className="certificate-name">{item.title}</h3>
                    <div className="certificate-tags">{item.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
                  </div>
                  <div className="certificate-footer">
                    <span className="certificate-date"><CalendarDays size={14} /> {item.completedAt}</span>
                    {item.credentialUrl ? (
                      <a className="certificate-verify" href={item.credentialUrl} target="_blank" rel="noopener noreferrer">Verify <ExternalLink size={13} /></a>
                    ) : <span className="certificate-placeholder-label"><BadgeCheck size={13} /> NO LINK ADDED</span>}
                  </div>
                </m.article>
              ))}
            </div>
          ) : (
            <div className="certificate-no-results"><Sparkles size={19} /><p>No certificates in this category yet.</p></div>
          )}

          <div className="certificate-benefits">
            <div className="certificate-benefit"><span className="certificate-benefit__icon"><ShieldCheck size={29} /></span><span className="certificate-benefit__copy"><strong>Verified credentials</strong><span>Authentic, verifiable learning records</span></span></div>
            <div className="certificate-benefit"><span className="certificate-benefit__icon"><Award size={29} /></span><span className="certificate-benefit__copy"><strong>Continuous learning</strong><span>Building expertise in modern technologies</span></span></div>
            <div className="certificate-benefit"><span className="certificate-benefit__icon"><ArrowUpRight size={29} /></span><span className="certificate-benefit__copy"><strong>Real-world application</strong><span>Applying knowledge in practical projects</span></span></div>
          </div>
        </div>
      </section>
    </>
  );
}
