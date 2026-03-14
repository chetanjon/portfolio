'use client';

import { useState, useEffect, useRef, useCallback } from "react";

// ─── DESIGN TOKENS ───
const C = {
  black: "#000000", dark: "#1d1d1f", mid: "#86868b", light: "#f5f5f7", white: "#ffffff",
  blue: "#0071e3", red: "#ff3b30", orange: "#ff9f0a", green: "#30d158", purple: "#bf5af2",
  teal: "#64d2ff", pink: "#ff375f", card: "#fbfbfd",
};
const FONT = "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif";
const MONO = "'SF Mono', 'JetBrains Mono', 'Fira Code', ui-monospace, monospace";

// ─── HOOKS ───
const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
};

const useScrollProgress = () => {
  const [p, setP] = useState(0);
  useEffect(() => {
    const h = () => { const d = document.documentElement; setP(d.scrollTop / (d.scrollHeight - d.clientHeight)); };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return p;
};

const useCountUp = (end, duration = 1800, startOnView = false) => {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(!startOnView);
  const start = useCallback(() => setStarted(true), []);
  useEffect(() => {
    if (!started) return;
    let frame; const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * end));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, end, duration]);
  return [val, start];
};

// ─── PRIMITIVES ───
const Reveal = ({ children, delay = 0, y = 40, style = {} }) => {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0) scale(1)" : `translateY(${y}px) scale(0.98)`,
      transition: `all 0.8s cubic-bezier(.16,1,.3,1) ${delay}s`,
      willChange: "transform, opacity", ...style,
    }}>{children}</div>
  );
};

const Sect = ({ bg = C.white, children, id, style = {} }) => (
  <section id={id} style={{ background: bg, padding: "clamp(60px,10vw,120px) 24px", position: "relative", ...style }}>
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>{children}</div>
  </section>
);

const Tag = ({ children, color = C.blue }) => (
  <span style={{
    fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
    color, fontFamily: MONO, display: "inline-block", marginBottom: 14,
    background: `${color}0F`, padding: "5px 12px", borderRadius: 6,
  }}>{children}</span>
);

const H2 = ({ children, color = C.dark, style = {} }) => (
  <h2 style={{
    fontSize: "clamp(30px,4.5vw,52px)", fontWeight: 700, color, lineHeight: 1.06,
    letterSpacing: "-0.03em", margin: "0 0 20px", fontFamily: FONT, ...style,
  }}>{children}</h2>
);

const P = ({ children, color = C.mid, style = {} }) => (
  <p style={{ fontSize: 17, lineHeight: 1.7, color, margin: "0 0 20px", maxWidth: 700, fontFamily: FONT, ...style }}>{children}</p>
);

// ─── INTERACTIVE CONTRAST DEMO ───
const ContrastDemo = () => {
  const [frost, setFrost] = useState(8);
  const ratio = frost < 4 ? 1.5 : frost < 8 ? 2.8 : frost < 14 ? 3.6 : frost < 20 ? 4.5 : 6.2;
  const pass = ratio >= 4.5;
  return (
    <div style={{ background: C.dark, borderRadius: 24, padding: "clamp(24px,4vw,40px)", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: MONO }}>
          Interactive: Drag to adjust glass frost
        </div>
        <div style={{
          fontSize: 13, fontWeight: 700, color: pass ? C.green : C.red,
          background: pass ? "rgba(48,209,88,0.15)" : "rgba(255,59,48,0.15)",
          padding: "5px 14px", borderRadius: 8,
        }}>{pass ? "✓ WCAG AA Pass" : "✗ WCAG AA Fail"} — {ratio}:1</div>
      </div>
      <div style={{
        position: "relative", borderRadius: 16, overflow: "hidden", height: 220,
        background: "linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)",
      }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{
            background: `rgba(255,255,255,${0.05 + frost * 0.04})`,
            backdropFilter: `blur(${frost}px)`, WebkitBackdropFilter: `blur(${frost}px)`,
            borderRadius: 16, padding: "20px 32px", border: "1px solid rgba(255,255,255,0.18)",
            textAlign: "center", maxWidth: 340, transition: "all 0.3s ease",
          }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, fontFamily: MONO }}>Mail — Inbox</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: "#fff", marginBottom: 4 }}>Meeting Tomorrow at 9am</div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}>Hi team, just a reminder about our...</div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: MONO, flexShrink: 0 }}>0px</span>
        <input type="range" min={0} max={24} value={frost}
          onChange={e => setFrost(Number(e.target.value))}
          style={{ flex: 1, accentColor: C.blue, height: 4, cursor: "pointer" }}
        />
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: MONO, flexShrink: 0 }}>24px</span>
      </div>
      <div style={{ textAlign: "center", marginTop: 8, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
        Frost blur: {frost}px — {frost <= 8 ? "Current Liquid Glass (low frost, high transparency)" : frost <= 16 ? "Moderate frost — improved but below WCAG" : "Proposed Adaptive Glass — WCAG compliant"}
      </div>
    </div>
  );
};

// ─── ANIMATED STAT ───
const AnimStat = ({ end, suffix = "", label, sublabel, color = C.blue }) => {
  const [ref, vis] = useInView(0.3);
  const [val, startCount] = useCountUp(end, 1600, true);
  useEffect(() => { if (vis) startCount(); }, [vis, startCount]);
  return (
    <div ref={ref} style={{
      flex: "1 1 200px", minWidth: 170, textAlign: "center", padding: "32px 16px",
      background: C.card, borderRadius: 20, border: "1px solid rgba(0,0,0,0.05)",
    }}>
      <div style={{ fontSize: "clamp(36px,5vw,56px)", fontWeight: 700, color, letterSpacing: "-0.03em", lineHeight: 1, fontFamily: FONT }}>
        {val}{suffix}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: C.dark, marginTop: 10 }}>{label}</div>
      {sublabel && <div style={{ fontSize: 12, color: C.mid, marginTop: 4 }}>{sublabel}</div>}
    </div>
  );
};

// ─── HEURISTIC DONUT ───
const HeuristicDonut = ({ name, severity, violation }) => {
  const [ref, vis] = useInView(0.3);
  const pct = severity === "Critical" ? 92 : severity === "High" ? 70 : 45;
  const col = severity === "Critical" ? C.red : severity === "High" ? C.orange : C.blue;
  const r = 36; const circ = 2 * Math.PI * r;
  return (
    <div ref={ref} style={{ display: "flex", gap: 16, alignItems: "center", padding: "16px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
      <svg width="80" height="80" viewBox="0 0 80 80" style={{ flexShrink: 0 }}>
        <circle cx="40" cy="40" r={r} fill="none" stroke="#e8e8ed" strokeWidth="6" />
        <circle cx="40" cy="40" r={r} fill="none" stroke={col} strokeWidth="6"
          strokeDasharray={circ} strokeDashoffset={vis ? circ * (1 - pct / 100) : circ}
          strokeLinecap="round" transform="rotate(-90 40 40)"
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.16,1,.3,1)" }} />
        <text x="40" y="44" textAnchor="middle" fontSize="14" fontWeight="700" fill={col} fontFamily={FONT}>{pct}%</text>
      </svg>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: C.dark }}>{name}</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: col, background: `${col}12`, padding: "3px 10px", borderRadius: 5, textTransform: "uppercase", fontFamily: MONO }}>{severity}</span>
        </div>
        <div style={{ fontSize: 13, color: C.mid, lineHeight: 1.5 }}>{violation}</div>
      </div>
    </div>
  );
};

// ─── SOLUTION CARD ───
const SolutionCard = ({ num, title, what, why, nongoal, icon }) => {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.04)",
        borderRadius: 24, padding: "clamp(24px,4vw,36px)", position: "relative", overflow: "hidden",
        border: `1px solid ${hover ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"}`,
        transition: "all 0.4s ease",
      }}>
      <div style={{ position: "absolute", top: -20, right: -20, fontSize: 120, opacity: 0.04, lineHeight: 1 }}>{icon}</div>
      <div style={{
        display: "inline-block", fontSize: 13, fontWeight: 700, color: C.teal, fontFamily: MONO,
        background: "rgba(100,210,255,0.1)", padding: "4px 12px", borderRadius: 6, marginBottom: 16,
      }}>{num}</div>
      <div style={{ fontSize: "clamp(20px,3vw,26px)", fontWeight: 600, color: C.white, marginBottom: 16, letterSpacing: "-0.02em" }}>{title}</div>
      <div style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 16 }}>
        <strong style={{ color: "rgba(255,255,255,0.85)" }}>What: </strong>{what}
      </div>
      <div style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 20 }}>
        <strong style={{ color: "rgba(255,255,255,0.85)" }}>Why: </strong>{why}
      </div>
      <div style={{
        fontSize: 13, color: C.teal, background: "rgba(100,210,255,0.06)", padding: "12px 16px",
        borderRadius: 12, borderLeft: `3px solid ${C.teal}`,
      }}>
        <strong>Non-goal:</strong> {nongoal}
      </div>
    </div>
  );
};

// ─── QUOTE ───
const Quote = ({ text, author, borderColor = C.red }) => (
  <div style={{
    position: "relative", padding: "28px 32px 28px 36px", borderRadius: 16,
    background: C.light, borderLeft: `4px solid ${borderColor}`, marginBottom: 20,
  }}>
    <div style={{ position: "absolute", top: 16, left: 12, fontSize: 48, color: `${borderColor}20`, fontFamily: "Georgia, serif", lineHeight: 1 }}>"</div>
    <div style={{ fontSize: 16, fontStyle: "italic", color: C.dark, lineHeight: 1.65, marginBottom: 10 }}>{text}</div>
    <div style={{ fontSize: 13, color: C.mid, fontWeight: 500 }}>— {author}</div>
  </div>
);

// ─── MAIN ───
export default function LiquidGlassCaseStudy() {
  const progress = useScrollProgress();
  const [activeSection, setActiveSection] = useState("");
  const sections = ["problem", "users", "research", "apps", "competitive", "solution", "priority", "metrics", "learnings"];
  const labels = ["Problem", "Users", "Research", "App Impact", "Competitive", "Solution", "Priority", "Metrics", "Learnings"];

  useEffect(() => {
    const h = () => {
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top < 200) { setActiveSection(sections[i]); return; }
      }
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ fontFamily: FONT, color: C.dark, background: C.white, WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(0,113,227,0.2); }
        input[type=range] { -webkit-appearance: none; appearance: none; background: rgba(255,255,255,0.15); border-radius: 4px; outline: none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%; background: #0071e3; cursor: pointer; border: 2px solid #fff; }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes pulse { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
      `}</style>

      {/* ─── SCROLL PROGRESS ─── */}
      <div style={{ position: "fixed", top: 0, left: 0, width: `${progress * 100}%`, height: 3, background: `linear-gradient(90deg, ${C.blue}, ${C.purple})`, zIndex: 1000, transition: "width 0.1s linear" }} />

      {/* ─── STICKY NAV ─── */}
      <nav style={{
        position: "fixed", top: 12, left: "50%", transform: "translateX(-50%)", zIndex: 999,
        background: "rgba(29,29,31,0.82)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderRadius: 22, padding: "6px 8px", display: "flex", gap: 2,
        border: "1px solid rgba(255,255,255,0.08)", maxWidth: "calc(100vw - 32px)", overflowX: "auto",
        opacity: progress > 0.03 ? 1 : 0, pointerEvents: progress > 0.03 ? "auto" : "none",
        transition: "opacity 0.3s ease",
      }}>
        {sections.map((s, i) => (
          <a key={s} href={`#${s}`} style={{
            fontSize: 11, fontWeight: 600, color: activeSection === s ? C.white : "rgba(255,255,255,0.4)",
            background: activeSection === s ? "rgba(255,255,255,0.12)" : "transparent",
            padding: "6px 12px", borderRadius: 16, textDecoration: "none", whiteSpace: "nowrap",
            transition: "all 0.2s ease", letterSpacing: "0.01em",
          }}>{labels[i]}</a>
        ))}
      </nav>

      {/* ═══════════════ HERO ═══════════════ */}
      <section style={{
        background: C.black, color: C.white, minHeight: "100vh", display: "flex",
        flexDirection: "column", justifyContent: "center", alignItems: "center",
        padding: "140px 24px 100px", textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        {/* Animated orbs */}
        <div style={{ position: "absolute", top: "20%", left: "15%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,113,227,0.15), transparent 70%)", filter: "blur(60px)", animation: "float 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "10%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(191,90,242,0.12), transparent 70%)", filter: "blur(60px)", animation: "float 10s ease-in-out infinite 2s" }} />
        <div style={{ position: "absolute", top: "60%", left: "60%", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(100,210,255,0.1), transparent 70%)", filter: "blur(50px)", animation: "float 6s ease-in-out infinite 4s" }} />

        <Reveal>
          <Tag color="rgba(255,255,255,0.3)">UX Case Study — iOS 26</Tag>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 style={{
            fontSize: "clamp(44px,8vw,88px)", fontWeight: 700, letterSpacing: "-0.04em",
            lineHeight: 1.02, maxWidth: 900, margin: "0 auto 28px",
          }}>
            When Glass{" "}
            <span style={{
              background: "linear-gradient(135deg, #64d2ff, #0071e3, #bf5af2, #ff375f)",
              backgroundSize: "200% 200%", animation: "shimmer 4s ease infinite",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Cracked.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p style={{ fontSize: "clamp(17px,2.2vw,21px)", color: "rgba(255,255,255,0.5)", maxWidth: 600, lineHeight: 1.55, margin: "0 auto 56px" }}>
            How Apple's most ambitious redesign since iOS 7 broke accessibility for millions — and what a better path forward looks like.
          </p>
        </Reveal>
        <Reveal delay={0.35}>
          <div style={{ display: "flex", gap: "clamp(24px,4vw,48px)", flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { n: "1.5:1", l: "Contrast measured", s: "vs. 4.5:1 WCAG min" },
              { n: "8K+", l: "Forum votes to disable", s: "Single Apple Community thread" },
              { n: "13%", l: "Battery drain", s: "vs. 1% on iOS 18" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center", minWidth: 120 }}>
                <div style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 700, letterSpacing: "-0.02em" }}>{s.n}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{s.l}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>{s.s}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.5} style={{ marginTop: 72 }}>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", fontSize: 12, color: "rgba(255,255,255,0.25)", fontFamily: MONO }}>
            <span>iOS 26 — Liquid Glass</span><span style={{ opacity: 0.4 }}>•</span>
            <span>Released Sept 15, 2025</span><span style={{ opacity: 0.4 }}>•</span>
            <span>WCAG 2.2 AA Analysis</span>
          </div>
        </Reveal>
        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", animation: "float 2s ease-in-out infinite" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
        </div>
      </section>

      {/* ═══════════════ PROBLEM ═══════════════ */}
      <Sect bg={C.white} id="problem">
        <Reveal><Tag>Step 1 — Problem Definition</Tag></Reveal>
        <Reveal delay={0.05}><H2>Apple shipped beauty.<br />Users got barriers.</H2></Reveal>
        <Reveal delay={0.1}>
          <P>In September 2025, Apple released iOS 26 — its biggest visual overhaul since iOS 7. At its center: Liquid Glass, a translucent design language that makes every UI element shimmer, refract, and float. It looked stunning in WWDC demos. But within days of public release, accessibility experts, UX researchers, and millions of everyday users discovered the same thing: Liquid Glass made their phones harder to use.</P>
          <P>The core problem is deceptively simple. When you make interface elements transparent, they inherit whatever is behind them. Text becomes illegible over busy backgrounds. Buttons blur into content. Tap targets shrink. And constant animation turns routine phone use into a source of eye strain and nausea.</P>
        </Reveal>
        <Reveal delay={0.15} style={{ marginTop: 40 }}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <div style={{
              flex: "1 1 200px", minWidth: 170, textAlign: "center", padding: "32px 16px",
              background: C.card, borderRadius: 20, border: "1px solid rgba(0,0,0,0.05)",
            }}>
              <div style={{ fontSize: "clamp(36px,5vw,56px)", fontWeight: 700, color: C.red, letterSpacing: "-0.03em", lineHeight: 1, fontFamily: FONT }}>1.5:1</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.dark, marginTop: 10 }}>Contrast measured</div>
              <div style={{ fontSize: 12, color: C.mid, marginTop: 4 }}>vs. 4.5:1 WCAG AA min — Infinum audit</div>
            </div>
            <AnimStat end={8000} suffix="+" label="Forum votes to disable" sublabel="Thread 256136970 — Apple Community" color={C.orange} />
            <AnimStat end={13} suffix="%" label="Battery drain (iOS 26)" sublabel="vs. 1% same actions — In Depth Tech Reviews" color={C.purple} />
          </div>
        </Reveal>

        {/* Interactive contrast demo */}
        <Reveal delay={0.2} style={{ marginTop: 48 }}>
          <ContrastDemo />
        </Reveal>

        <Reveal delay={0.25} style={{ marginTop: 48 }}>
          <Quote
            text="There is a serious issue around accessibility with the Liquid Glass display... I work for a charity for blind people and in terms of Apple's usual excellence with accessibility this is a huge fail."
            author="Apple Community forum — Representative feedback from a charity worker supporting blind users"
            borderColor={C.red}
          />
          <Quote
            text="My phone updated to iOS 26.2 and I hate this so much. I turned on the reduce transparency and motion, but the whole update has changed so much it's making me nauseous most of the time. I'm actually considering switching to Android."
            author="Apple Community user — iOS 26.2 update feedback"
            borderColor={C.orange}
          />
        </Reveal>
      </Sect>

      {/* ═══════════════ USER SEGMENTS ═══════════════ */}
      <Sect bg={C.light} id="users">
        <Reveal><Tag>Who Is Affected</Tag></Reveal>
        <Reveal delay={0.05}><H2>Three user segments.<br />One shared frustration.</H2></Reveal>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 40 }}>
          {[
            { emoji: "👁️", title: "Low Vision Users", stat: "2.2B", statLabel: "people globally (WHO)", desc: "Dynamic contrast makes text unreadable over varied backgrounds. Users must navigate 4+ accessibility menus to achieve basic legibility.", pain: "Cannot read emails or notifications without workarounds", color: C.red },
            { emoji: "🧠", title: "Vestibular Sensitivity", stat: "35%", statLabel: "of adults 40+ affected (NIH)", desc: "Constant animations — bubbling tabs, morphing controls, pulsating buttons — trigger nausea, eye strain, and disorientation.", pain: "Physical symptoms from routine phone use", color: C.orange },
            { emoji: "📱", title: "Older Device Owners", stat: "15-20%", statLabel: "est. battery drop (projected)", desc: "GPU-intensive rendering strains older A-series chips. Battery tests on iPhone 16 Pro Max showed 13% drain vs. 1% on iOS 18 — impact is expected to be worse on older hardware. Apple's Adaptive Power Mode is iPhone 15 Pro+ only.", pain: "Phone feels years older overnight after update", color: C.purple },
          ].map((seg, i) => (
            <Reveal key={i} delay={i * 0.1} style={{ flex: "1 1 280px", minWidth: 260 }}>
              <div style={{
                background: C.white, borderRadius: 24, padding: "32px 28px", height: "100%",
                border: "1px solid rgba(0,0,0,0.05)", position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: -8, right: -8, fontSize: 80, opacity: 0.06, lineHeight: 1 }}>{seg.emoji}</div>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{seg.emoji}</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: C.dark, marginBottom: 8 }}>{seg.title}</div>
                <div style={{ display: "flex", gap: 8, alignItems: "baseline", marginBottom: 14 }}>
                  <span style={{ fontSize: 28, fontWeight: 700, color: seg.color, letterSpacing: "-0.02em" }}>{seg.stat}</span>
                  <span style={{ fontSize: 12, color: C.mid }}>{seg.statLabel}</span>
                </div>
                <div style={{ fontSize: 14, color: C.mid, lineHeight: 1.6, marginBottom: 16 }}>{seg.desc}</div>
                <div style={{ fontSize: 13, color: seg.color, fontWeight: 600, background: `${seg.color}08`, padding: "10px 14px", borderRadius: 12 }}>
                  {seg.pain}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Sect>

      {/* ═══════════════ RESEARCH ═══════════════ */}
      <Sect bg={C.white} id="research">
        <Reveal><Tag>Step 2 — Research & Discovery</Tag></Reveal>
        <Reveal delay={0.05}><H2>What the evidence says.</H2></Reveal>
        <Reveal delay={0.1}>
          <P>Triangulated across four research streams: expert UX analysis (NNG), quantitative accessibility audits (Infinum), community sentiment (Apple Forums, Reddit, Hacker News), and competitive analysis (iOS 7, Material You, visionOS).</P>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 36 }}>
          {[
            { icon: "🔬", title: "NNG published its most critical Apple analysis in a decade", desc: "Raluca Budiu documented floating controls obscuring content, animations that distract, truncated Safari URLs, hidden tabs, and shrunken targets. She described Apple as prioritizing spectacle over usability.", src: "Nielsen Norman Group — October 9, 2025" },
            { icon: "📊", title: "Contrast failures are measurable, not subjective", desc: "Infinum's team measured 1.5:1 contrast over busy backgrounds — 3x below the 4.5:1 WCAG AA minimum. This isn't aesthetic preference; it's a quantified barrier.", src: "Infinum Accessibility Team — June 2025" },
            { icon: "🤢", title: "Physical symptoms are widespread and documented", desc: "TechRadar: eye strain and vertigo. Phandroid: 'Café Wall Illusion' in Dark Mode. Reddit: 3,000+ upvote post on icon distortion. Users describe nausea within seconds.", src: "TechRadar, Phandroid, Reddit — September 2025" },
            { icon: "⚡", title: "Performance creates a two-tier experience", desc: "13% battery drain for 150 actions on iOS 26 vs. 1% on iOS 18 (iPhone 16 Pro Max). Mac Observer reported est. 15–20% battery impact on iPhone 12. Older devices report lag resembling 30Hz despite 60Hz displays.", src: "BGR (Sept 22, 2025), Mac Observer — September 2025" },
            { icon: "⚖️", title: "EU regulatory risk is real and ticking", desc: "European Accessibility Act enforceable June 28, 2025. Mandates 4.5:1 contrast (EN 301 549). App developers using Liquid Glass bear compliance risk. Penalties vary by member state and are now enforceable.", src: "EU Directive 2019/882 — EN 301 549" },
          ].map((d, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start", background: C.card, borderRadius: 18, padding: "24px 22px", border: "1px solid rgba(0,0,0,0.05)" }}>
                <div style={{ width: 46, height: 46, borderRadius: 13, background: `${C.blue}0C`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 22 }}>{d.icon}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.dark, marginBottom: 5 }}>{d.title}</div>
                  <div style={{ fontSize: 14, color: C.mid, lineHeight: 1.6 }}>{d.desc}</div>
                  <div style={{ fontSize: 12, color: C.blue, marginTop: 8, fontWeight: 500, fontFamily: MONO }}>{d.src}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Heuristic donuts */}
        <Reveal delay={0.4} style={{ marginTop: 48 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: C.dark, marginBottom: 20 }}>Nielsen's Heuristics Violated</div>
          <HeuristicDonut name="Aesthetic & Minimalist Design" severity="Critical" violation="Animations, reflections, translucency add visual noise without functional purpose" />
          <HeuristicDonut name="Consistency & Standards" severity="Critical" violation="Search moved top→bottom; back breadcrumbs removed; swipe behaviors changed" />
          <HeuristicDonut name="Recognition Rather Than Recall" severity="High" violation="Interactive vs. decorative elements indistinguishable on busy backgrounds" />
          <HeuristicDonut name="Visibility of System Status" severity="High" violation="Truncated URLs in Safari; status bar competes with in-page content" />
          <HeuristicDonut name="User Control & Freedom" severity="High" violation="No Liquid Glass disable; accessibility workarounds buried in 4+ menus" />
        </Reveal>
      </Sect>

      {/* ═══════════════ APP IMPACT ═══════════════ */}
      <Sect bg={C.light} id="apps">
        <Reveal><Tag>App-Level Impact</Tag></Reveal>
        <Reveal delay={0.05}><H2>Where Liquid Glass hurts most.</H2></Reveal>
        <Reveal delay={0.1}>
          <P>NNG and community reports reveal specific failures across Apple's most-used apps. These aren't edge cases.</P>
        </Reveal>
        <Reveal delay={0.15} style={{ marginTop: 32 }}>
          <div style={{ background: C.white, borderRadius: 20, padding: "12px 24px", border: "1px solid rgba(0,0,0,0.05)", overflowX: "auto" }}>
            {[
              { app: "Mail", issue: "Search bar overlaps email previews; text on text — NNG: 'cryptographic decoder skills' needed", sev: "Severe" },
              { app: "Safari", issue: "Floating URL bar competes with page elements; tabs hidden behind overflow; URLs truncated", sev: "Severe" },
              { app: "Messages", issue: "Photo backgrounds camouflage message text; typing indicator blurs into conversation", sev: "High" },
              { app: "Photos", issue: "Smaller tap targets vs. iOS 18; selection indicators indistinguishable from decoration", sev: "High" },
              { app: "Maps", issue: "Navigation icons blend into map imagery; floating controls obscure route details", sev: "High" },
              { app: "Settings", issue: "Search moved top→bottom; back breadcrumbs removed; floating bar missed by users", sev: "Moderate" },
            ].map((r, i) => {
              const col = r.sev === "Severe" ? C.red : r.sev === "High" ? C.orange : C.blue;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "15px 0", borderBottom: i < 5 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
                  <div style={{ width: 80, fontWeight: 600, fontSize: 14, color: C.dark, flexShrink: 0 }}>{r.app}</div>
                  <div style={{ flex: 1, fontSize: 14, color: C.mid, lineHeight: 1.5 }}>{r.issue}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: col, background: `${col}10`, padding: "4px 10px", borderRadius: 6, textTransform: "uppercase", fontFamily: MONO, flexShrink: 0 }}>{r.sev}</div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Sect>

      {/* ═══════════════ COMPETITIVE ═══════════════ */}
      <Sect bg={C.white} id="competitive">
        <Reveal><Tag>Competitive Analysis</Tag></Reveal>
        <Reveal delay={0.05}><H2>How others handle translucency.</H2></Reveal>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 40 }}>
          {[
            { name: "Android Material You", grade: "B+", approach: "Dynamic color from wallpaper, but solid backgrounds behind text. Translucency limited to quick settings.", lesson: "Personalization without sacrificing readability." },
            { name: "visionOS (Apple)", grade: "A-", approach: "Heavy glassmorphism, but background complexity is managed by the OS — not random wallpapers.", lesson: "Apple already solved this — in VR, they control what's behind the glass. On iPhone, they don't." },
            { name: "Windows 11 Mica", grade: "B+", approach: "Mica samples wallpaper but heavily desaturates and blurs. Acrylic adds noise texture for contrast.", lesson: "Aggressive blur + noise guarantees minimum contrast while keeping glass aesthetic." },
          ].map((c, i) => (
            <Reveal key={i} delay={i * 0.1} style={{ flex: "1 1 280px", minWidth: 260 }}>
              <div style={{ background: C.card, borderRadius: 24, padding: "28px 24px", height: "100%", border: "1px solid rgba(0,0,0,0.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div style={{ fontSize: 17, fontWeight: 600, color: C.dark }}>{c.name}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.blue, background: `${C.blue}0C`, padding: "5px 14px", borderRadius: 10 }}>{c.grade}</div>
                </div>
                <div style={{ fontSize: 14, color: C.mid, lineHeight: 1.65, marginBottom: 14 }}>{c.approach}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.dark, background: C.light, padding: "10px 14px", borderRadius: 10 }}>{c.lesson}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Sect>

      {/* ═══════════════ SOLUTION ═══════════════ */}
      <Sect bg={C.dark} id="solution" style={{ color: C.white }}>
        <Reveal><Tag color={C.teal}>Step 3 — Solution Design</Tag></Reveal>
        <Reveal delay={0.05}><H2 color={C.white}>Adaptive Glass.<br />Beautiful and readable.</H2></Reveal>
        <Reveal delay={0.1}><P color="rgba(255,255,255,0.5)">The goal isn't to kill Liquid Glass — it's to make it work for everyone. Three architectural changes preserve Apple's visual ambition while restoring accessibility.</P></Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 48 }}>
          <Reveal delay={0.15}>
            <SolutionCard num="01" icon="🎯" title="Dynamic Contrast Floor"
              what="Real-time pipeline measuring foreground text contrast against blurred background. When contrast drops below WCAG AA, the system auto-increases frost or adds a subtle scrim — pixel by pixel, frame by frame."
              why="visionOS already does this in spatial environments. The compositing shader exists in Apple's GPU toolkit. This extends it to 2D."
              nongoal="Does NOT remove transparency — it modulates it. Glass stays glassy; text stays readable." />
          </Reveal>
          <Reveal delay={0.2}>
            <SolutionCard num="02" icon="✨" title="Motion Intelligence System"
              what="Context-aware motion: first interaction animates fully (delight). Subsequent ones in the same session reduce to subtle transitions. Scrolling animations pause during active reading. Per-animation Reduce Motion vs. binary kill switch."
              why="NNG's core critique: 'delight turns to distraction on the tenth time.' Users need animation that rewards discovery, then fades to functional."
              nongoal="Does NOT eliminate motion — it makes motion earn its presence." />
          </Reveal>
          <Reveal delay={0.25}>
            <SolutionCard num="03" icon="💡" title="Legibility Mode Toggle"
              what="Single toggle in Display & Brightness (not Accessibility) switching between 'Vivid' (current) and 'Clear' (guaranteed WCAG contrast). Surfaced during first-run setup. Applies to ALL floating elements — not just background tinting."
              why="Current Clear/Tinted toggle only adjusts background opacity. Users shouldn't stack 4 accessibility settings to read email."
              nongoal="Does NOT treat accessibility as afterthought — makes readability a first-class preference." />
          </Reveal>
        </div>
      </Sect>

      {/* ═══════════════ PRIORITIZATION ═══════════════ */}
      <Sect bg={C.white} id="priority">
        <Reveal><Tag>Step 4 — Prioritization (RICE)</Tag></Reveal>
        <Reveal delay={0.05}><H2>What to build first.</H2></Reveal>
        <Reveal delay={0.1}>
          <P>Reach estimated from iOS 26's ~1.1B eligible devices (est.). Impact 0–3. Confidence reflects technical precedent. Effort in person-months.</P>
        </Reveal>
        <Reveal delay={0.15} style={{ marginTop: 32 }}>
          <div style={{ background: C.card, borderRadius: 20, padding: "12px 24px", border: "1px solid rgba(0,0,0,0.05)", overflowX: "auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2.2fr repeat(5, 1fr)", gap: 8, padding: "12px 0", borderBottom: "2px solid rgba(0,0,0,0.06)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: C.mid, fontFamily: MONO, minWidth: 520 }}>
              <div>Feature</div><div style={{ textAlign: "center" }}>Reach</div><div style={{ textAlign: "center" }}>Impact</div><div style={{ textAlign: "center" }}>Conf.</div><div style={{ textAlign: "center" }}>Effort</div><div style={{ textAlign: "center" }}>Score</div>
            </div>
            {[
              { f: "Legibility Mode Toggle", r: "1.1B", im: "3", co: "90%", ef: "2 mo", sc: "1,485", top: true },
              { f: "Dynamic Contrast Floor", r: "1.1B", im: "3", co: "75%", ef: "4 mo", sc: "619", top: false },
              { f: "Motion Intelligence", r: "800M", im: "2", co: "70%", ef: "3 mo", sc: "373", top: false },
            ].map((row, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "2.2fr repeat(5, 1fr)", gap: 8, padding: "14px 0",
                borderBottom: "1px solid rgba(0,0,0,0.04)", fontSize: 14, minWidth: 520,
                background: row.top ? `${C.blue}06` : "transparent", borderRadius: row.top ? 8 : 0,
              }}>
                <div style={{ fontWeight: 600, color: C.dark }}>{row.f}</div>
                <div style={{ textAlign: "center", color: C.mid }}>{row.r}</div>
                <div style={{ textAlign: "center", color: C.mid }}>{row.im}</div>
                <div style={{ textAlign: "center", color: C.mid }}>{row.co}</div>
                <div style={{ textAlign: "center", color: C.mid }}>{row.ef}</div>
                <div style={{ textAlign: "center", fontWeight: 700, color: C.blue }}>{row.sc}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Timeline */}
        <Reveal delay={0.2} style={{ marginTop: 48 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: C.dark, marginBottom: 24 }}>Phased Delivery</div>
          {[
            { ph: "1", color: C.green, title: "iOS 26.3 — Quick Wins (Wk 1–6)", items: ["Ship Legibility Mode in Display & Brightness", "Surface toggle during first-run for upgraders", "Fix Mail search bar overlap (highest-severity NNG finding)", "Restore Safari back-button breadcrumbs"] },
            { ph: "2", color: C.blue, title: "iOS 26.4 — Contrast Engine (Wk 7–16)", items: ["Deploy Dynamic Contrast Floor across system UI", "Per-element frost modulation based on background analysis", "Add 'Reduce Bright Effects' toggle for vestibular sensitivity", "A/B test contrast thresholds: 3:1 vs. 4.5:1 for UI components"] },
            { ph: "3", color: C.purple, title: "iOS 27 — Motion Intelligence (Fall 2026)", items: ["Context-aware animation: full delight → functional fade", "Granular Reduce Motion: per-animation vs. binary", "Performance-adaptive rendering by chip generation", "Developer API for contrast-aware Liquid Glass components"] },
          ].map((t, i) => (
            <Reveal key={i} delay={0.25 + i * 0.08}>
              <div style={{ display: "flex", gap: 20, marginBottom: 32 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: t.color, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700 }}>{t.ph}</div>
                  {i < 2 && <div style={{ width: 2, flex: 1, background: `${t.color}25`, marginTop: 8 }} />}
                </div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 600, color: C.dark, marginBottom: 10 }}>{t.title}</div>
                  {t.items.map((item, j) => <div key={j} style={{ fontSize: 14, color: C.mid, lineHeight: 1.75 }}>→ {item}</div>)}
                </div>
              </div>
            </Reveal>
          ))}
        </Reveal>

        <Reveal delay={0.4} style={{ marginTop: 32 }}>
          <div style={{ background: C.light, borderRadius: 16, padding: "24px 28px" }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.dark, marginBottom: 8 }}>Trade-off: Why not remove Liquid Glass?</div>
            <P style={{ maxWidth: "none", marginBottom: 0 }}>Rolling back would undermine Apple's design credibility and strand thousands of developers rebuilding around it. The better path: adaptive rendering — keeping the visual identity while engineering accessibility in. Apple did this with Dark Mode (iOS 13), which required similar system-wide contrast management.</P>
          </div>
        </Reveal>
      </Sect>

      {/* ═══════════════ METRICS ═══════════════ */}
      <Sect bg={C.light} id="metrics">
        <Reveal><Tag>Step 5 — Impact & Metrics</Tag></Reveal>
        <Reveal delay={0.05}><H2>How we'd measure success.</H2></Reveal>
        <Reveal delay={0.1}>
          <P>Success means users stop needing accessibility workarounds for basic readability.</P>
        </Reveal>
        <Reveal delay={0.15} style={{ marginTop: 32 }}>
          <div style={{ background: C.white, borderRadius: 20, padding: "12px 24px", border: "1px solid rgba(0,0,0,0.05)", overflowX: "auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1.5fr 1.5fr 1fr", gap: 8, padding: "12px 0", borderBottom: "2px solid rgba(0,0,0,0.06)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: C.mid, fontFamily: MONO, minWidth: 520 }}>
              <div>Metric</div><div>Current</div><div>Target (90d)</div><div>Type</div>
            </div>
            {[
              { m: "Min contrast ratio (system UI)", c: "1.5:1 worst case", t: "≥4.5:1 all surfaces", type: "North Star", col: C.blue },
              { m: "Accessibility settings workaround rate", c: "Elevated (est.)", t: "Reduce by 40%", type: "Supporting", col: C.green },
              { m: "'Disable' forum activity", c: "8K+ votes (single thread)", t: "<500 new votes/mo", type: "Supporting", col: C.green },
              { m: "Vestibular complaint reports", c: "Widespread", t: "70% reduction", type: "Supporting", col: C.green },
              { m: "Battery drain delta vs. iOS 18", c: "13% vs 1%", t: "<3% on older devices", type: "Guardrail", col: C.red },
              { m: "iOS 26 adoption rate", c: "~56% (TelemetryDeck)", t: "≥60% within 6 months", type: "Guardrail", col: C.red },
            ].map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "2.5fr 1.5fr 1.5fr 1fr", gap: 8, padding: "13px 0", borderBottom: "1px solid rgba(0,0,0,0.04)", fontSize: 14, alignItems: "center", minWidth: 520 }}>
                <div style={{ fontWeight: 500, color: C.dark }}>{row.m}</div>
                <div style={{ color: C.mid }}>{row.c}</div>
                <div style={{ color: C.dark, fontWeight: 600 }}>{row.t}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: row.col, background: `${row.col}10`, padding: "4px 8px", borderRadius: 5, textTransform: "uppercase", textAlign: "center", fontFamily: MONO }}>{row.type}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.25} style={{ marginTop: 40 }}>
          <div style={{ background: C.white, borderRadius: 20, padding: "28px", border: "1px solid rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.dark, marginBottom: 10 }}>Estimated Impact (Fermi)</div>
            <P style={{ maxWidth: "none", marginBottom: 0 }}>
              If 2% of iOS 26's ~1.1B eligible users (est.) delay upgrading due to Liquid Glass — that's ~22M users on older iOS. At an estimated ~$1.50/user/year in reduced Services revenue (App Store, iCloud), that's ~$33M in annual opportunity cost. Restoring adoption parity recovers this while strengthening Apple's accessibility positioning ahead of EU enforcement.
            </P>
          </div>
        </Reveal>
      </Sect>

      {/* ═══════════════ LEARNINGS ═══════════════ */}
      <Sect bg={C.white} id="learnings">
        <Reveal><Tag>Step 6 — Learnings & Reflection</Tag></Reveal>
        <Reveal delay={0.05}><H2>What I'd do differently.<br />What I'd test next.</H2></Reveal>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 40 }}>
          <Reveal style={{ flex: "1 1 300px" }}>
            <div style={{ background: C.card, borderRadius: 24, padding: "32px 28px", border: "1px solid rgba(0,0,0,0.05)", height: "100%" }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: C.dark, marginBottom: 16 }}>Constraints I'd acknowledge</div>
              {[
                { b: "No internal data.", d: "Contrast measurements rely on Infinum and NNG. Apple's telemetry would reveal exact settings adoption and engagement deltas." },
                { b: "Battery test limits.", d: "The 13% vs. 1% figure is from one creator's test. MacRumors found negligible Clear vs. Tinted differences separately." },
                { b: "Adoption narrative was noisy.", d: "The 'iOS 26 crisis' was largely a StatCounter error (Safari anti-fingerprinting). Corrected data shows ~56% adoption — marginally below prior years, not catastrophic." },
              ].map((c, i) => (
                <div key={i} style={{ marginBottom: 14, fontSize: 14, color: C.mid, lineHeight: 1.65 }}>
                  <strong style={{ color: C.dark }}>{c.b}</strong> {c.d}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} style={{ flex: "1 1 300px" }}>
            <div style={{ background: C.card, borderRadius: 24, padding: "32px 28px", border: "1px solid rgba(0,0,0,0.05)", height: "100%" }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: C.dark, marginBottom: 16 }}>Experiments I'd run next</div>
              {[
                { b: "A/B test Legibility Mode as default.", d: "Hypothesis: if 'Clear' is opt-out (not opt-in), complaints drop 60%+ with minimal satisfaction impact from Vivid fans." },
                { b: "Wallpaper-aware preview.", d: "Before setting a wallpaper, show simulated Control Center overlay so users see legibility impact at the decision point." },
                { b: "Longitudinal nausea tracking.", d: "Partner with vestibular researchers: does Liquid Glass nausea habituate (like the notch, 78% stopped noticing) or worsen?" },
              ].map((c, i) => (
                <div key={i} style={{ marginBottom: 14, fontSize: 14, color: C.mid, lineHeight: 1.65 }}>
                  <strong style={{ color: C.dark }}>{c.b}</strong> {c.d}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Sect>

      {/* ═══════════════ SOURCES ═══════════════ */}
      <Sect bg={C.light}>
        <Reveal><Tag>Sources & Evidence</Tag></Reveal>
        <Reveal delay={0.05}><H2 style={{ fontSize: "clamp(24px,3.5vw,36px)" }}>Every claim is verifiable.</H2></Reveal>
        <Reveal delay={0.1} style={{ marginTop: 24 }}>
          <div style={{ columns: "2 300px", columnGap: 32, fontSize: 13, color: C.mid, lineHeight: 1.85 }}>
            {[
              ["NNG", "\"Liquid Glass Is Cracked\" — Raluca Budiu, Oct 9 2025"],
              ["Infinum", "\"Sleek, Shiny, Questionably Accessible\" — June 2025"],
              ["Apple Community", "Thread 256136970 (8K+ votes) + thousands more across related threads"],
              ["UX Collective", "\"Did Apple abandon its own heuristics?\" — June 12 2025"],
              ["BGR", "iOS 26 vs iOS 18 battery test — Sept 22 2025"],
              ["TechRadar", "Eye strain and vertigo reports — Sept 2025"],
              ["MacRumors", "iOS 26.1 Liquid Glass toggle — Oct 2025"],
              ["Mac Observer", "Older iPhone hands-on testing — Sept 2025"],
              ["Access Advisors NZ", "Accessibility challenges analysis"],
              ["EU Directive 2019/882", "European Accessibility Act — June 28 2025"],
              ["Daring Fireball", "Adoption rate analysis — John Gruber, Jan–Feb 2026"],
              ["TelemetryDeck", "iOS 26 adoption tracking data — Jan 2026"],
              ["OSnews", "Editorial commentary — Thom Holwerda, Oct 11 2025"],
            ].map(([src, desc], i) => (
              <div key={i} style={{ marginBottom: 6, breakInside: "avoid" }}>
                <strong style={{ color: C.dark }}>{src}:</strong> {desc}
              </div>
            ))}
          </div>
        </Reveal>
      </Sect>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <section style={{
        background: C.black, color: C.white, padding: "100px 24px", textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,113,227,0.08), transparent 70%)", filter: "blur(60px)" }} />
        <Reveal>
          <div style={{ maxWidth: 640, margin: "0 auto", position: "relative" }}>
            <h2 style={{ fontSize: "clamp(28px,4.5vw,44px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 24 }}>
              Good design is invisible.<br />
              <span style={{ color: "rgba(255,255,255,0.35)" }}>Liquid Glass isn't — and that's the problem.</span>
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.65, marginBottom: 40 }}>
              This case study demonstrates UX research, accessibility analysis (WCAG 2.2), heuristic evaluation, competitive benchmarking, RICE prioritization, and solution design for a product used by over 1 billion people.
            </p>
            <div style={{
              display: "inline-flex", gap: 16, flexWrap: "wrap", justifyContent: "center",
              fontSize: 12, color: "rgba(255,255,255,0.2)", fontFamily: MONO,
            }}>
              <span>iOS 26 Liquid Glass</span><span style={{ opacity: 0.4 }}>•</span>
              <span>Accessibility Analysis</span><span style={{ opacity: 0.4 }}>•</span>
              <span>March 2026</span>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
