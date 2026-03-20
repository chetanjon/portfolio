'use client';

import { useState, useEffect, useRef, useCallback } from "react";

const SERIF = "'Fraunces','Georgia',serif";
const SANS = "'DM Sans','Outfit',system-ui,sans-serif";
const MONO = "'JetBrains Mono','SF Mono',monospace";

const bg = "#0F0E0C";
const cream = "#E8E2D9";
const dim = "rgba(232,226,217,0.4)";
const dim2 = "rgba(232,226,217,0.18)";
const accent = "#5B9A8B";

const useVis = (t = 0.12) => { const r = useRef(null); const [v, s] = useState(false); useEffect(() => { const e = r.current; if (!e) return; const o = new IntersectionObserver(([x]) => { if (x.isIntersecting) { s(true); o.unobserve(e); } }, { threshold: t }); o.observe(e); return () => o.disconnect(); }, [t]); return [r, v]; };
const useScroll = () => { const [p, s] = useState(0); useEffect(() => { const h = () => { const d = document.documentElement; s(d.scrollTop / (d.scrollHeight - d.clientHeight)); }; window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []); return p; };
const useCount = (end, dur = 2000) => { const [v, s] = useState(0); const [go, setGo] = useState(false); const start = useCallback(() => setGo(true), []); useEffect(() => { if (!go) return; let f; const t0 = performance.now(); const tick = n => { const p = Math.min((n - t0) / dur, 1); s(Math.round((1 - Math.pow(1 - p, 4)) * end)); if (p < 1) f = requestAnimationFrame(tick); }; f = requestAnimationFrame(tick); return () => cancelAnimationFrame(f); }, [go, end, dur]); return [v, start]; };

const Fade = ({ children, delay = 0, y = 50, style = {} }) => { const [r, v] = useVis(); return (<div ref={r} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : `translateY(${y}px)`, transition: `all 1.1s cubic-bezier(.22,1,.36,1) ${delay}s`, ...style }}>{children}</div>); };
const Num = ({ end, suffix = "", prefix = "" }) => { const [r, v] = useVis(0.3); const [val, go] = useCount(end); useEffect(() => { if (v) go(); }, [v, go]); return <span ref={r} style={{ color: accent, fontFamily: SERIF }}>{prefix}{val}{suffix}</span>; };
const Src = ({ children }) => <span style={{ fontFamily: MONO, fontSize: 9, color: dim2, letterSpacing: "0.04em" }}>{children}</span>;

export default function CursorTeardown() {
  const progress = useScroll();

  return (
    <div style={{ background: bg, color: cream, minHeight: "100vh", fontFamily: SANS, WebkitFontSmoothing: "antialiased", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* PROGRESS BAR */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: 1.5, zIndex: 999 }}>
        <div style={{ height: "100%", width: `${progress * 100}%`, background: accent, opacity: 0.5, transition: "width 60ms linear" }} />
      </div>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 32px", position: "relative", textAlign: "center" }}>
        <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle,${accent}08,transparent 70%)`, filter: "blur(100px)" }} />
        <div style={{ maxWidth: 800, position: "relative" }}>
          <Fade><div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.25em", color: dim2, marginBottom: 40 }}>GROWTH TEARDOWN</div></Fade>
          <Fade delay={0.1}>
            <h1 style={{ fontFamily: SERIF, fontSize: "clamp(48px,8vw,100px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.02em", margin: "0 0 12px" }}>
              The <em style={{ fontStyle: "italic", color: accent }}>$29B</em> Fork
            </h1>
          </Fade>
          <Fade delay={0.2}>
            <p style={{ fontSize: 17, color: dim, lineHeight: 1.8, maxWidth: 500, margin: "0 auto 60px" }}>
              How Anysphere turned a VS Code fork into the fastest-growing developer tool in history.
            </p>
          </Fade>
          <Fade delay={0.3}>
            <div style={{ display: "flex", gap: 40, justifyContent: "center", fontFamily: MONO, fontSize: 10, color: dim2, letterSpacing: "0.06em", flexWrap: "wrap" }}>
              <span>$2B ARR</span>
              <span style={{ opacity: 0.3 }}>.</span>
              <span>$29.3B valuation</span>
              <span style={{ opacity: 0.3 }}>.</span>
              <span>1M+ DAU</span>
              <span style={{ opacity: 0.3 }}>.</span>
              <span>PLG growth motion</span>
            </div>
          </Fade>
        </div>
      </section>

      {/* THE NUMBERS */}
      <section style={{ padding: "80px 32px 120px", textAlign: "center" }}>
        <Fade>
          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(40px,8vw,100px)", flexWrap: "wrap" }}>
            {[
              { end: 2, suf: "B", prefix: "$", l: "Annual recurring revenue", s: "2025 reporting" },
              { end: 29, suf: "B", prefix: "$", l: "Valuation (Series C)", s: "Anysphere fundraise" },
              { end: 1, suf: "M+", l: "Daily active users", s: "Company disclosures" },
              { end: 40, suf: "%+", l: "Code written by AI", s: "Cursor user data" },
            ].map((s, i) => (
              <Fade key={i} delay={i * 0.08}>
                <div style={{ maxWidth: 160 }}>
                  <div style={{ fontFamily: SERIF, fontSize: "clamp(36px,5vw,64px)", fontWeight: 400, lineHeight: 1 }}><Num end={s.end} suffix={s.suf} prefix={s.prefix || ""} /></div>
                  <div style={{ fontFamily: MONO, fontSize: 9, color: dim2, marginTop: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.l}</div>
                  <div style={{ fontFamily: MONO, fontSize: 7, color: dim2, marginTop: 4, opacity: 0.6 }}>{s.s}</div>
                </div>
              </Fade>
            ))}
          </div>
        </Fade>
      </section>

      {/* THE ORIGIN */}
      <section style={{ padding: "clamp(80px,14vw,180px) 32px", maxWidth: 720, margin: "0 auto" }}>
        <Fade><div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em", color: accent, marginBottom: 20 }}>01 THE ORIGIN</div></Fade>
        <Fade delay={0.06}>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(36px,5vw,60px)", fontWeight: 400, lineHeight: 1.1, margin: "0 0 40px" }}>
            A bet on the <em style={{ fontStyle: "italic", color: accent }}>editor</em>.
          </h2>
        </Fade>
        <Fade delay={0.1}>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: dim, marginBottom: 32 }}>
            {"Founded in 2022 by MIT alumni Michael Truell, Sualeh Asif, Arvid Lunnemark, and Aman Sanger, Anysphere made a contrarian bet: the future of AI coding isn't a chatbot or a plugin. It's the editor itself. They forked VS Code and rebuilt it around AI-native workflows."}
          </p>
        </Fade>
        <Fade delay={0.15}>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: dim, marginBottom: 32 }}>
            {"While GitHub Copilot treated AI as an autocomplete layer, Cursor reimagined the entire editing experience. Tab completion that understands your whole codebase. A Cmd+K interface for inline edits. A chat panel with full project context. Multi-file edits orchestrated by a single prompt. The AI isn't bolted on. It's the product."}
          </p>
        </Fade>
        <Fade delay={0.2}>
          <div style={{ marginTop: 16, padding: "20px 24px", background: "rgba(255,255,255,0.02)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ fontFamily: MONO, fontSize: 10, color: accent, letterSpacing: "0.1em", marginBottom: 10 }}>THE FORK DECISION</div>
            <p style={{ fontSize: 14, color: dim, lineHeight: 1.75, margin: 0 }}>
              {"Forking VS Code gave Cursor instant access to the world's most popular editor ecosystem: extensions, keybindings, themes, settings sync. Users could switch in minutes, not days. The switching cost was near zero. This was the single most important product decision Anysphere made."}
            </p>
          </div>
        </Fade>
      </section>

      {/* THE PRODUCT */}
      <section style={{ padding: "clamp(80px,14vw,180px) 32px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle,${accent}05,transparent 70%)`, filter: "blur(100px)" }} />
        <div style={{ maxWidth: 700, margin: "0 auto", position: "relative" }}>
          <Fade><div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em", color: accent, marginBottom: 20 }}>02 THE PRODUCT</div></Fade>
          <Fade delay={0.06}>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(36px,5vw,60px)", fontWeight: 400, lineHeight: 1.1, margin: "0 0 48px" }}>
              Three surfaces. <em style={{ fontStyle: "italic", color: accent }}>One intelligence.</em>
            </h2>
          </Fade>
          <div style={{ textAlign: "left" }}>
            {[
              { name: "Tab (Autocomplete)", desc: "Context-aware code completion that predicts not just the next token, but the next meaningful edit. It reads your recent changes, open files, and project structure to suggest multi-line completions. Trained on patterns from how developers actually write code, not just what code looks like.", why: "Reduces friction on every keystroke. The completions are good enough that developers enter a flow state where Tab becomes muscle memory." },
              { name: "Cmd+K (Inline Edits)", desc: "Highlight code, describe what you want in natural language, and the AI rewrites it in place. Refactor a function, add error handling, convert types, translate between languages. The edit happens inline with a diff view so you see exactly what changed.", why: "Turns English into code edits. Developers think in intent, not syntax. This closes the gap between what you want and what you type." },
              { name: "Chat (Agent Mode)", desc: "A side panel that understands your entire codebase. Ask questions, generate new files, orchestrate multi-file refactors. Agent mode can run terminal commands, read compiler errors, and iterate autonomously until the task is done.", why: "Handles the complex, multi-step tasks that autocomplete can't. New feature scaffolding, debugging, large-scale refactors across dozens of files." },
            ].map((a, i) => (
              <Fade key={i} delay={0.1 + i * 0.06}>
                <div style={{ padding: "32px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <div style={{ fontFamily: SERIF, fontSize: 22, color: cream, marginBottom: 10 }}>{a.name}</div>
                  <p style={{ fontSize: 15, color: dim, lineHeight: 1.85, margin: "0 0 10px" }}>{a.desc}</p>
                  <p style={{ fontSize: 14, color: "rgba(232,226,217,0.55)", lineHeight: 1.75, margin: 0 }}><strong style={{ color: cream }}>Why it works: </strong>{a.why}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* THE GROWTH ENGINE */}
      <section style={{ padding: "clamp(80px,14vw,180px) 32px", maxWidth: 720, margin: "0 auto" }}>
        <Fade><div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em", color: accent, marginBottom: 20 }}>03 THE GROWTH ENGINE</div></Fade>
        <Fade delay={0.06}>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(36px,5vw,60px)", fontWeight: 400, lineHeight: 1.1, margin: "0 0 20px" }}>
            PLG at <em style={{ fontStyle: "italic", color: accent }}>developer speed</em>.
          </h2>
        </Fade>
        <Fade delay={0.1}>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 400, lineHeight: 1.1, color: dim, margin: "0 0 48px" }}>
            {"No sales team needed."}
          </h2>
        </Fade>

        {[
          { insight: "Product-led acquisition", detail: "Developers try Cursor because another developer showed them something magical. A clip of a multi-file refactor. A tweet about an Agent mode session. A pair programming stream. The product sells itself through visible output. Cursor grew from $1M to $100M ARR in roughly 18 months without a traditional sales motion." },
          { insight: "Zero switching cost", detail: "Import your VS Code settings, extensions, and keybindings in one click. The first session feels like home but with superpowers. This is the fork dividend: familiarity plus capability. Users don't have to relearn anything to access AI-native features." },
          { insight: "Bottom-up enterprise", detail: "Individual developers adopt Cursor on personal machines. They build something impressive. Their team notices. The team adopts it. IT gets a procurement request. This bottom-up motion means Cursor enters enterprises through engineering, not through a sales cycle. By the time leadership is involved, the tool is already embedded in workflows." },
          { insight: "Speed as moat", detail: "Cursor ships updates at a pace that incumbents cannot match. New model integrations land in days, not quarters. Features move from idea to production in weeks. A 50-person team making decisions at founder speed, versus Microsoft's organizational layers. Every week, the gap widens." },
        ].map((x, i) => (
          <Fade key={i} delay={0.1 + i * 0.05}>
            <div style={{ padding: "28px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ fontFamily: SERIF, fontSize: 20, color: cream, marginBottom: 8 }}>{x.insight}</div>
              <p style={{ fontSize: 14, color: dim, lineHeight: 1.8, margin: 0 }}>{x.detail}</p>
            </div>
          </Fade>
        ))}
      </section>

      {/* THE COMPETITIVE LANDSCAPE */}
      <section style={{ padding: "clamp(80px,14vw,180px) 32px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle,${accent}06,transparent 70%)`, filter: "blur(80px)" }} />
        <div style={{ maxWidth: 640, margin: "0 auto", position: "relative" }}>
          <Fade><div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em", color: accent, marginBottom: 20 }}>04 THE LANDSCAPE</div></Fade>
          <Fade delay={0.06}>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(36px,5vw,60px)", fontWeight: 400, lineHeight: 1.1, margin: "0 0 48px" }}>
              Everyone wants to be the <em style={{ fontStyle: "italic", color: accent }}>AI editor</em>.
            </h2>
          </Fade>
          <div style={{ textAlign: "left" }}>
            {[
              { name: "GitHub Copilot", detail: "First mover with 77M+ developers on GitHub. Copilot is deeply integrated into VS Code and JetBrains. But it is a feature, not a product. Constrained by Microsoft's organizational complexity and the need to serve every IDE. Cursor's advantage: a single-surface, opinionated experience." },
              { name: "Windsurf (Codeium)", detail: "Direct competitor with a similar VS Code fork approach. Acquired by OpenAI. Strong on autocomplete, building toward agentic workflows. The acquisition signal: the AI editor category is real and the foundation model companies want to own the surface." },
              { name: "Claude Code / Agentic CLI", detail: "Terminal-first AI coding from Anthropic. No editor UI. Pure agentic execution. Different philosophy: let the AI drive the entire workflow from the command line. Complementary for some users, competitive for others. The question is whether developers want AI in the editor or AI instead of the editor." },
            ].map((c, i) => (
              <Fade key={i} delay={0.1 + i * 0.06}>
                <div style={{ padding: "28px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <div style={{ fontFamily: SERIF, fontSize: 20, color: cream, marginBottom: 8 }}>{c.name}</div>
                  <p style={{ fontSize: 14, color: dim, lineHeight: 1.8, margin: 0 }}>{c.detail}</p>
                </div>
              </Fade>
            ))}
          </div>

          <Fade delay={0.3}>
            <div style={{ marginTop: 32, borderLeft: `2px solid ${accent}`, paddingLeft: 20, textAlign: "left" }}>
              <p style={{ fontFamily: SERIF, fontSize: 18, fontStyle: "italic", color: "rgba(232,226,217,0.5)", lineHeight: 1.6, margin: 0 }}>
                {"The moat isn't the model. Models are commoditizing. The moat is the UX layer: how seamlessly AI integrates into the act of writing code. Cursor understood this before anyone else."}
              </p>
            </div>
          </Fade>
        </div>
      </section>

      {/* WHAT TO WATCH */}
      <section style={{ padding: "clamp(80px,14vw,180px) 32px", maxWidth: 720, margin: "0 auto" }}>
        <Fade><div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em", color: accent, marginBottom: 20 }}>05 WHAT TO WATCH</div></Fade>
        <Fade delay={0.06}>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(36px,5vw,60px)", fontWeight: 400, lineHeight: 1.1, margin: "0 0 48px" }}>
            The risks <em style={{ fontStyle: "italic", color: accent }}>ahead</em>.
          </h2>
        </Fade>

        {[
          { signal: "Model dependency", detail: "Cursor routes to frontier models from OpenAI, Anthropic, and Google. The quality of the product is tightly coupled to the quality of the underlying models. If a model provider decides to build a competing editor surface, Cursor loses both a supplier and gains a competitor. The Windsurf acquisition by OpenAI is the proof point." },
          { signal: "VS Code upstream risk", detail: "Microsoft controls the upstream codebase. Changes to VS Code's licensing, extension API, or AI integration could force costly re-engineering. Microsoft has every incentive to make Copilot's VS Code integration so deep that forks can't keep up." },
          { signal: "The agent question", detail: "As AI models get more capable, the value shifts from 'AI-assisted editing' to 'AI-driven execution.' If agents can autonomously write entire features, the editor UI becomes less central. Cursor needs to own the agentic workflow, not just the editing surface." },
        ].map((x, i) => (
          <Fade key={i} delay={0.1 + i * 0.05}>
            <div style={{ padding: "28px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ fontFamily: SERIF, fontSize: 20, color: cream, marginBottom: 8 }}>{x.signal}</div>
              <p style={{ fontSize: 14, color: dim, lineHeight: 1.8, margin: 0 }}>{x.detail}</p>
            </div>
          </Fade>
        ))}
      </section>

      {/* FOOTER */}
      <section style={{ padding: "clamp(100px,16vw,200px) 32px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle,${accent}04,transparent 70%)`, filter: "blur(100px)" }} />
        <Fade>
          <div style={{ maxWidth: 600, margin: "0 auto", position: "relative" }}>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(36px,6vw,72px)", fontWeight: 400, lineHeight: 1.08, margin: "0 0 20px" }}>
              The editor is the interface.
            </h2>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(36px,6vw,72px)", fontWeight: 400, lineHeight: 1.08, fontStyle: "italic", color: accent, margin: "0 0 40px" }}>
              The AI is the product.
            </h2>
            <p style={{ fontSize: 14, color: dim, lineHeight: 1.7, marginBottom: 48, maxWidth: 440, margin: "0 auto 48px" }}>
              {"A growth teardown of Cursor, the AI-native code editor by Anysphere. From VS Code fork to $29B valuation. The product architecture, the PLG flywheel, the competitive landscape, and the risks ahead."}
            </p>
            <div style={{ fontFamily: MONO, fontSize: 10, color: dim2, letterSpacing: "0.08em" }}>
              Chetan Jonnalagadda &middot; March 2026
            </div>
          </div>
        </Fade>
      </section>
    </div>
  );
}
