"use client";

import { useState, type FormEvent } from "react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { profile } from "@/data/portfolio";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion();
  const email = profile.email.trim();
  const emailReady = email.length > 0 && !email.includes("YOUR_") && email.includes("@");

  async function copyEmail() {
    if (!emailReady) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!emailReady) {
      window.alert("Add your real email address in src/data/portfolio.ts before using the contact form.");
      return;
    }
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const sender = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${sender}\n\n${message}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  return (
    <section className="contact-section section-pad" id="contact">
      <div className="contact-orb contact-orb--one" aria-hidden="true" />
      <div className="contact-orb contact-orb--two" aria-hidden="true" />
      <div className="page-shell">
        <m.div
          className="contact-heading"
          initial={reduceMotion ? false : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-kicker"><i /> 05 / CONTACT</span>
          <h2>LET'S TALK ABOUT<br /><em>YOUR NEXT BUILD.</em></h2>
          <p>{profile.opportunities}</p>
        </m.div>

        <div className="contact-layout">
          <m.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.65, delay: 0.08 }}
          >
            <label><span>Name</span><input name="name" type="text" autoComplete="name" placeholder="Your name" required /></label>
            <label><span>Email</span><input name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></label>
            <label><span>Message</span><textarea name="message" rows={4} placeholder="Tell me a little about your enquiry..." required /></label>
            <m.button className="button button--glow contact-submit" type="submit" whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              Open email draft <span>↗</span>
            </m.button>
            <p className="contact-config-note">Opens your email app so you can review and send the message.</p>
          </m.form>

          <m.aside
            className="contact-direct"
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.65, delay: 0.18 }}
          >
            <span className="contact-direct__kicker">EMAIL</span>
            <a className="contact-email" href={emailReady ? `mailto:${email}` : undefined} aria-disabled={!emailReady}>
              <span className="contact-email__icon">@</span>
              <span>{emailReady ? email : "Email address unavailable"}</span>
              <span className="contact-email__action">Send email ↗</span>
            </a>
            <button type="button" className="contact-copy-email" onClick={copyEmail} disabled={!emailReady}>
              {copied ? "Email address copied" : "Copy email address"}
            </button>
            <a className="contact-github-link" href={profile.githubUrl} target="_blank" rel="noreferrer">
              <span>GITHUB REPOSITORY</span><strong>Open repository on GitHub ↗</strong>
            </a>
          </m.aside>
        </div>
      </div>
    </section>
  );
}
