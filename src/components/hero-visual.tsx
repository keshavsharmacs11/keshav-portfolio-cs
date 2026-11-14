"use client";

import Image from "next/image";

/**
 * A project-led hero visual. It uses actual local project artwork instead of
 * a generic neon sculpture, so visitors immediately see the kind of products
 * Keshav has built. The parent hero applies restrained pointer parallax.
 */
export function HeroVisual() {
  return (
    <div className="hero-project-stack" role="img" aria-label="Layered previews of SENTBALE, KWE and Akshaanshh Jyotish project work">
      <div className="hero-project-window hero-project-window--kwe" aria-hidden="true">
        <div className="hero-project-window__bar">
          <span /><span /><span />
          <small>kwe-website.vercel.app</small>
        </div>
        <div className="hero-project-window__image hero-project-window__image--kwe">
          <Image src="/images/projects/kwe.svg" alt="" fill sizes="(max-width: 760px) 52vw, 28vw" />
        </div>
        <div className="hero-project-window__caption"><strong>KWE</strong><span>COMMUNITY PLATFORM</span></div>
      </div>

      <div className="hero-project-window hero-project-window--jyotish" aria-hidden="true">
        <div className="hero-project-window__bar">
          <span /><span /><span />
          <small>akshaanshhjyotish.com</small>
        </div>
        <div className="hero-project-window__image hero-project-window__image--jyotish">
          <Image src="/images/projects/jyotish.svg" alt="" fill sizes="(max-width: 760px) 48vw, 24vw" />
        </div>
        <div className="hero-project-window__caption"><strong>AKSHAANSHH JYOTISH</strong><span>BOOKING PLATFORM</span></div>
      </div>

      <div className="hero-project-window hero-project-window--sentbale">
        <div className="hero-project-window__bar">
          <span /><span /><span />
          <small>sentbaleperfumes.com</small>
        </div>
        <div className="hero-project-window__image hero-project-window__image--sentbale">
          <Image src="/images/projects/sentbale.webp" alt="SENTBALE fragrance storefront project artwork" fill sizes="(max-width: 760px) 72vw, 38vw" priority />
        </div>
        <div className="hero-project-window__caption"><strong>SENTBALE</strong><span>BRAND / E-COMMERCE</span></div>
      </div>

      <div className="hero-project-index" aria-hidden="true">
        <span>SELECTED BUILDS</span>
        <strong>01 — 03</strong>
      </div>
    </div>
  );
}
