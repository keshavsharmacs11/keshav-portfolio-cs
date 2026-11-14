"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { ArrowUpRight, Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { profile, projects, skillGroups } from "@/data/portfolio";

type ChatRole = "user" | "assistant";
type ChatMessage = { id: number; role: ChatRole; content: string };

const quickPrompts = [
  "About Keshav",
  "Explore the projects",
  "Technology stack",
  "Education",
  "Collaboration",
];

function localAnswer(question: string) {
  const q = question.toLowerCase();
  const matchedProject = projects.find((project) => {
    const name = project.name.toLowerCase();
    if (q.includes(name)) return true;
    if (project.theme === "kwe" && /\bkwe\b|women entrepreneur/.test(q)) return true;
    if (project.theme === "jyotish" && /akshaanshh|jyotish|astrology platform/.test(q)) return true;
    if (project.theme === "sentbale" && /sentbale|fragrance storefront/.test(q)) return true;
    if (project.theme === "carvista" && /car\s?vista|car comparison/.test(q)) return true;
    if (project.theme === "hpcm" && /hpcm|image compress/.test(q)) return true;
    if (project.theme === "drug" && /drug interaction|medicine interaction/.test(q)) return true;
    if (project.theme === "silvertrace" && /silvertrace|jewellery concept/.test(q)) return true;
    return false;
  });

  if (matchedProject) {
    const safetyNote = matchedProject.theme === "drug"
      ? "\n\nThis is an academic prototype, not a clinically validated tool. Do not use it for medication or treatment decisions."
      : "";
    return `${matchedProject.name}\n${matchedProject.summary}\n\nContribution: ${matchedProject.contribution}\n\nTechnology: ${matchedProject.stack.join(", ")}${matchedProject.liveUrl ? `\n\nLive project: ${matchedProject.liveUrl}` : ""}${safetyNote}`;
  }

  if (/project|portfolio|work|built|builds|case stud/.test(q)) {
    return `Here are the featured projects:\n\n${projects.map((project) => `• ${project.name} — ${project.summary}`).join("\n\n")}\n\nAsk me about any project by name to see its details.`;
  }

  if (/skill|stack|technology|technologies|tools|framework|machine learning|ai\/ml/.test(q)) {
    return skillGroups.map((group) => `${group.title}: ${group.items.join(", ")}`).join("\n\n");
  }

  if (/about|who|background|introduc|keshav/.test(q)) {
    return `${profile.name} is a ${profile.role} and ${profile.secondaryRole}. ${profile.introduction}\n\n${profile.about}`;
  }

  if (/contact|email|hire|collaborat|freelance|opportunit|work together/.test(q)) {
    const email = profile.email.trim();
    return `${profile.opportunities} Use the contact form on this page to start a conversation.${email ? ` Email: ${email}.` : ""}`;
  }

  if (/education|degree|university|college|coursework|study/.test(q)) {
    return `${profile.education.qualification}\n${profile.education.institution} · ${profile.education.period}\n\nRelevant coursework: ${profile.education.coursework.join(", ")}`;
  }

  if (/resume|cv|curriculum/.test(q)) {
    return profile.resumeUrl
      ? `You can view or download Keshav's resume here: ${profile.resumeUrl}`
      : "The resume link has not been configured yet. Please use the contact form to request it.";
  }

  if (/github|repository|source code/.test(q)) {
    return `Keshav's GitHub repository: ${profile.githubUrl}`;
  }

  return "I can help with Keshav's background, projects, technology stack, resume and collaboration. Try one of the suggested questions, or ask about SENTBALE, KWE, Akshaanshh Jyotish, SILVERTRACE or the image-compression project.";
}

export function PortfolioAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [mode, setMode] = useState<"ai" | "local">("local");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      role: "assistant",
      content: "Hi, I’m Keshav’s portfolio assistant. Ask me about his projects, skills, education or ways to collaborate.",
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: reduceMotion ? "auto" : "smooth" });
  }, [messages, sending, open, reduceMotion]);

  async function sendMessage(text: string) {
    const content = text.trim();
    if (!content || sending) return;

    const userMessage: ChatMessage = { id: nextId.current++, role: "user", content };
    const history = [...messages, userMessage].slice(-10);
    setMessages(history);
    setInput("");
    setSending(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.map(({ role, content: message }) => ({ role, content: message })) }),
      });

      if (!response.ok) {
        setMode("local");
        const reply: ChatMessage = { id: nextId.current++, role: "assistant", content: localAnswer(content) };
        setMessages((current) => [...current, reply]);
        return;
      }

      const data = (await response.json()) as { reply?: string };
      setMode("ai");
      const reply: ChatMessage = {
        id: nextId.current++,
        role: "assistant",
        content: data.reply?.trim() || localAnswer(content),
      };
      setMessages((current) => [...current, reply]);
    } catch {
      setMode("local");
      const reply: ChatMessage = { id: nextId.current++, role: "assistant", content: localAnswer(content) };
      setMessages((current) => [...current, reply]);
    } finally {
      setSending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className="portfolio-assistant">
      <AnimatePresence>
        {open && (
          <m.aside
            className="assistant-panel"
            role="dialog"
            aria-modal="false"
            aria-label="Keshav portfolio assistant"
            initial={reduceMotion ? false : { opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="assistant-header">
              <div className="assistant-avatar"><Sparkles size={17} /></div>
              <div className="assistant-header__copy">
                <strong>PORTFOLIO ASSISTANT</strong>
                <span><i /> {mode === "ai" ? "AI assistant online" : "Portfolio guide · instant answers"}</span>
              </div>
              <button type="button" className="assistant-close" onClick={() => setOpen(false)} aria-label="Close assistant"><X size={18} /></button>
            </div>

            <div className="assistant-messages" ref={listRef} aria-live="polite">
              {messages.map((message) => (
                <div className={`assistant-message assistant-message--${message.role}`} key={message.id}>
                  {message.role === "assistant" && <span className="assistant-message__avatar"><Bot size={14} /></span>}
                  <p>{message.content}</p>
                </div>
              ))}
              {sending && (
                <div className="assistant-message assistant-message--assistant">
                  <span className="assistant-message__avatar"><Bot size={14} /></span>
                  <p className="assistant-typing" aria-label="Assistant is typing"><i /><i /><i /></p>
                </div>
              )}
            </div>

            {messages.length === 1 && (
              <div className="assistant-suggestions">
                {quickPrompts.map((prompt) => (
                  <button type="button" key={prompt} onClick={() => void sendMessage(prompt)} disabled={sending}>{prompt}<ArrowUpRight size={12} /></button>
                ))}
              </div>
            )}

            <form className="assistant-form" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about projects, skills..."
                aria-label="Ask Keshav's portfolio assistant a question"
                maxLength={1200}
              />
              <button type="submit" disabled={!input.trim() || sending} aria-label="Send message"><Send size={17} /></button>
            </form>
            <p className="assistant-footnote">Answers are based on the portfolio information provided.</p>
          </m.aside>
        )}
      </AnimatePresence>

      <m.button
        type="button"
        className={`assistant-launcher ${open ? "assistant-launcher--open" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close portfolio assistant" : "Open portfolio assistant"}
        aria-expanded={open}
        whileHover={reduceMotion ? undefined : { y: -3, scale: 1.04 }}
        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
      >
        {open ? <X size={22} /> : <MessageCircle size={23} />}
        <span className="assistant-launcher__pulse" />
      </m.button>
    </div>
  );
}
