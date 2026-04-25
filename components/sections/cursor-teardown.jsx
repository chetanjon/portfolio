'use client';

import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════
   CURSOR TEARDOWN — "The $29B Fork"
   Editorial teardown · Chetan Jonnalagadda · March 2026
   Light theme — matches Figma case study design system
   ═══════════════════════════════════════════════════════════════ */

const c = {
  bg: "#F5F1EB",
  bgAlt: "#FFFFFF",
  bgDark: "#1A1A18",
  surface: "#FAF8F5",
  border: "#E0DCD4",
  borderDark: "#2A2A28",
  accent: "#0E7C6B",
  accentLight: "#2BA88F",
  accentPale: "#E6F5F1",
  accentDark: "#085C4F",
  indigo: "#1B2D3A",
  plum: "#7B4F72",
  plumPale: "#F3ECF1",
  teal: "#0D9488",
  bull: "#3D7A4A",
  bullPale: "#EDF5EE",
  bear: "#A0342B",
  bearPale: "#F8EEEC",
  amber: "#B8860B",
  slate: "#3A3A38",
  text: "#1A1A18",
  textSoft: "#3D3D3A",
  textMuted: "#6A6A64",
  white: "#FFFFFF",
};

const fonts = {
  serif: "'Cormorant Garamond', 'Georgia', serif",
  sans: "'Outfit', 'Helvetica Neue', sans-serif",
  mono: "'IBM Plex Mono', monospace",
};

/* —— Shared layout —— */
const Wrap = ({ children, style, narrow }) => (
  <div style={{ maxWidth: narrow ? 720 : 1100, margin: "0 auto", padding: "0 48px", ...style }}>{children}</div>
);
const SectionLabel = ({ children, light }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
    <div style={{ width: 6, height: 6, borderRadius: "50%", background: light ? c.accentLight : c.accent, flexShrink: 0 }} />
    <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 3, color: light ? c.accentLight : c.accent, textTransform: "uppercase" }}>{children}</span>
  </div>
);
const SectionTitle = ({ children, style }) => (
  <h2 style={{ fontFamily: fonts.serif, fontSize: 38, fontWeight: 400, margin: 0, lineHeight: 1.15, color: c.text, ...style }}>{children}</h2>
);
const Body = ({ children, style }) => (
  <p style={{ fontSize: 15, color: c.textSoft, lineHeight: 1.85, margin: "0 0 16px", fontWeight: 400, ...style }}>{children}</p>
);
const Source = ({ children }) => (
  <div style={{ fontFamily: fonts.mono, fontSize: 9, color: c.textMuted, marginTop: 16, letterSpacing: 0.3 }}>{children}</div>
);
const Divider = () => (
  <Wrap><div style={{ height: 1, background: c.border }} /></Wrap>
);
const PullQuote = ({ text, attr }) => (
  <div style={{ borderLeft: `3px solid ${c.accent}`, paddingLeft: 24, margin: "40px 0" }}>
    <p style={{ fontFamily: fonts.serif, fontSize: 20, fontStyle: "italic", color: c.slate, lineHeight: 1.7, margin: 0, fontWeight: 300 }}>{text}</p>
    {attr && <p style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textMuted, marginTop: 12, letterSpacing: 0.5 }}>{attr}</p>}
  </div>
);
const Insight = ({ children, label = "KEY INSIGHT" }) => (
  <div style={{ borderLeft: `3px solid ${c.accent}`, background: c.accentPale, borderRadius: "0 10px 10px 0", padding: "24px 28px", margin: "36px 0" }}>
    <div style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 2, fontWeight: 600, color: c.accent, marginBottom: 10, textTransform: "uppercase" }}>{label}</div>
    <div style={{ fontSize: 14, lineHeight: 1.8, color: c.textSoft, fontWeight: 400 }}>{children}</div>
  </div>
);

/* —— Scroll-aware section tracker —— */
const SIDS = ["hero","context","model","compete","moat","crisis","risks","verdict","sources"];
const SLBL = ["Top","Context","Model","Compete","Moat","Crisis","Risks","Verdict","Sources"];
const useActive = () => {
  const [a, setA] = useState("hero");
  useEffect(() => {
    const o = new IntersectionObserver(e => e.forEach(x => x.isIntersecting && setA(x.target.id)), { rootMargin: "-30% 0px -30% 0px" });
    SIDS.forEach(id => { const el = document.getElementById(id); if (el) o.observe(el); });
    return () => o.disconnect();
  }, []);
  return a;
};

const Progress = () => {
  const [p, setP] = useState(0);
  useEffect(() => {
    const h = () => setP(Math.min(100, (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100));
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: 2, zIndex: 999, background: "rgba(0,0,0,.04)" }}><div style={{ height: "100%", width: `${p}%`, background: c.accent, transition: "width .12s" }} /></div>;
};

const SideNav = ({ active }) => (
  <div className="side-nav" style={{ position: "fixed", left: 28, top: "50%", transform: "translateY(-50%)", zIndex: 90, display: "flex", flexDirection: "column", gap: 14 }}>
    {SIDS.map((id, i) => (
      <a key={id} href={`#${id}`} title={SLBL[i]} style={{ width: active === id ? 22 : 5, height: 5, borderRadius: 3, background: active === id ? c.accent : c.border, transition: "all .3s", display: "block", textDecoration: "none" }} />
    ))}
  </div>
);

/* —— Data visualizations (light theme) —— */
const ARRChart = () => {
  const pts = [
    { d: "Mar '23", v: 0 }, { d: "Dec '23", v: 4 }, { d: "Jun '24", v: 20 },
    { d: "Jan '25", v: 100, lbl: "$100M" }, { d: "Mar '25", v: 200 },
    { d: "Jun '25", v: 500, lbl: "$500M" }, { d: "Sep '25", v: 800 },
    { d: "Dec '25", v: 1300 }, { d: "Feb '26", v: 2000, lbl: "$2B" },
  ];
  const W = 780, H = 240, px = 52, py = 32, mx = 2200;
  const x = i => px + (i / (pts.length - 1)) * (W - px * 2);
  const y = v => H - py - (v / mx) * (H - py * 2);
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(p.v)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
      {[0, 500, 1000, 1500, 2000].map((v, i) => (
        <g key={i}>
          <line x1={px} y1={y(v)} x2={W - px} y2={y(v)} stroke={c.border} strokeWidth="1" />
          <text x={px - 10} y={y(v) + 3} textAnchor="end" fontFamily="IBM Plex Mono" fontSize="8" fill={c.textMuted}>${v >= 1000 ? `${v / 1000}B` : `${v}M`}</text>
        </g>
      ))}
      <path d={d + ` L${x(pts.length - 1)},${H - py} L${px},${H - py} Z`} fill="url(#ag)" />
      <path d={d} fill="none" stroke={c.plum} strokeWidth="2" />
      {pts.map((p, i) => (
        <g key={i}>
          {p.lbl && <circle cx={x(i)} cy={y(p.v)} r="4" fill={c.bg} stroke={c.plum} strokeWidth="1.5" />}
          {p.lbl && <>
            <rect x={x(i) - 26} y={y(p.v) - 24} width={52} height={16} rx={3} fill={c.plum} />
            <text x={x(i)} y={y(p.v) - 13} textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="8" fill="#fff" fontWeight="600">{p.lbl}</text>
          </>}
          <text x={x(i)} y={H - py + 18} textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="7.5" fill={c.textMuted}>{p.d}</text>
        </g>
      ))}
      <defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={c.plum} stopOpacity=".12" /><stop offset="100%" stopColor={c.plum} stopOpacity="0" /></linearGradient></defs>
    </svg>
  );
};

const ShareBars = () => {
  const d = [
    { n: "GitHub Copilot", s: 42 }, { n: "Cursor", s: 18, hl: true },
    { n: "Claude Code", s: 8 }, { n: "Windsurf (acq.)", s: 6 }, { n: "Others", s: 26 },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {d.map((item, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "120px 1fr 40px", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: fonts.sans, fontSize: 12, color: item.hl ? c.plum : c.textSoft, textAlign: "right", fontWeight: item.hl ? 500 : 400 }}>{item.n}</span>
          <div style={{ height: 6, background: c.border, borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(item.s / 50) * 100}%`, background: item.hl ? c.plum : c.textMuted, borderRadius: 3 }} />
          </div>
          <span style={{ fontFamily: fonts.mono, fontSize: 11, color: item.hl ? c.plum : c.textMuted, fontWeight: 500 }}>{item.s}%</span>
        </div>
      ))}
    </div>
  );
};

/* ═══════════════ MAIN ═══════════════ */
export default function CursorTeardown() {
  const active = useActive();

  return (
    <div style={{ background: c.bg, color: c.text, minHeight: "100vh", fontFamily: fonts.sans, lineHeight: 1.7 }}>
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@200;300;400;500;600&family=IBM+Plex+Mono:wght@300;400;500&display=swap');::selection{background:rgba(14,124,107,.15);color:#1A1A18}html{scroll-behavior:smooth}@media(max-width:900px){.side-nav{display:none!important}}` }} />

      <Progress />
      <SideNav active={active} />

      {/* ═══════ HERO GRADIENT ═══════ */}
      <div style={{ position: "relative", width: "100%", height: 360, overflow: "hidden", background: `linear-gradient(135deg, ${c.indigo} 0%, #1B4D5A 40%, ${c.accent} 70%, ${c.accentLight} 100%)` }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(245,241,235,0.5) 75%, #F5F1EB 100%)" }} />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.08 }} viewBox="0 0 1200 360" preserveAspectRatio="none">
          {Array.from({ length: 20 }, (_, i) => <line key={`v${i}`} x1={i * 60} y1="0" x2={i * 60} y2="360" stroke="white" strokeWidth="1" />)}
          {Array.from({ length: 6 }, (_, i) => <line key={`h${i}`} x1="0" y1={i * 60} x2="1200" y2={i * 60} stroke="white" strokeWidth="1" />)}
        </svg>
        <div style={{ position: "absolute", bottom: 24, left: 48, right: 48 }}>
          <Wrap>
            <span style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 2, color: c.textMuted, background: "rgba(245,241,235,0.9)", padding: "4px 10px", borderRadius: 4 }}>Cursor · Product Teardown</span>
          </Wrap>
        </div>
      </div>

      {/* ═══════ HERO TEXT ═══════ */}
      <header id="hero" style={{ padding: "48px 48px 60px", maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>Product Teardown</SectionLabel>
        <h1 style={{ fontFamily: fonts.serif, fontSize: 68, fontWeight: 300, lineHeight: 1.05, margin: "16px 0 28px", color: c.text, letterSpacing: "-1px", maxWidth: 800 }}>
          The $29B<br />Fork
        </h1>
        <p style={{ fontSize: 19, color: c.textSoft, lineHeight: 1.85, maxWidth: 600, margin: "0 0 0", fontWeight: 300 }}>
          How four MIT students forked VS Code, grew with almost no traditional marketing, and built what may be the fastest-growing SaaS product ever, while every model provider simultaneously funds them and competes with them.
        </p>
      </header>

      <Divider />

      {/* ═══════ STATS BAR ═══════ */}
      <Wrap style={{ padding: "48px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
          {[
            { v: "$2B", l: "Annualized revenue", s: "Feb 2026" },
            { v: "$29.3B", l: "Valuation", s: "Series D · Nov 2025" },
            { v: "1M+", l: "Daily active users", s: "50%+ Fortune 500" },
            { v: "PLG", l: "Growth motion", s: "No traditional marketing" },
          ].map((s, i) => (
            <div key={i} style={{ padding: "0 24px", borderLeft: i > 0 ? `1px solid ${c.border}` : "none" }}>
              <div style={{ fontFamily: fonts.serif, fontSize: 42, fontWeight: 300, color: c.accent, lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: c.text, marginTop: 10 }}>{s.l}</div>
              <div style={{ fontSize: 11, color: c.textMuted, marginTop: 4 }}>{s.s}</div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textMuted, marginTop: 32 }}>Chetan Jonnalagadda · March 2026</div>
      </Wrap>

      {/* ═══════ 01 · CONTEXT ═══════ */}
      <Divider />
      <section id="context" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <SectionLabel>01 · Context</SectionLabel>
            <SectionTitle>One of the Fastest SaaS Ramps Ever</SectionTitle>
          </div>
          <div>
            <Body style={{ fontSize: 16 }}>
              Cursor is an AI-native code editor built by Anysphere, founded in 2022 by four MIT classmates. They forked Microsoft&apos;s open-source VS Code (the editor used by 74% of developers) and built an AI layer directly into the editing experience.
            </Body>
            <Body>
              From launch in March 2023 to an estimated $100M ARR by January 2025, roughly 22 months. Past $500M by June 2025. To over $2 billion in annualized run-rate by early 2026. The team grew from around 60 people in early 2025 to over 300 by late 2025, all with an almost entirely product-led growth motion.
            </Body>
            <Body>
              The company raised over $3.3B across multiple funding rounds (seed through Series D), reaching a $29.3B valuation at its November 2025 Series D. More than half of Fortune 500 companies reportedly use Cursor. Analyst estimates put free-to-paid conversion at roughly 36%, well over ten times the typical freemium SaaS benchmark of 2–5%.
            </Body>
          </div>
        </div>

        {/* ARR Chart */}
        <Wrap style={{ marginTop: 64, padding: 0 }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 2, color: c.textMuted, marginBottom: 20, textTransform: "uppercase" }}>Annualized Revenue Run-Rate</div>
          <ARRChart />
          <Source>$100M Jan 2025 (Contrary Research) · $500M+ Jun 2025 · $2B Feb 2026 (Bloomberg, via TechCrunch) · intermediate points interpolated</Source>
        </Wrap>

        {/* Funding Table */}
        <div style={{ marginTop: 72 }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 2, color: c.textMuted, marginBottom: 20, textTransform: "uppercase" }}>Funding History</div>
          <div style={{ background: c.white, borderRadius: 12, border: `1px solid ${c.border}`, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "80px 80px 100px 100px 1fr", gap: 16, padding: "14px 20px", background: c.surface, borderBottom: `1px solid ${c.border}` }}>
              {["Round", "Date", "Amount", "Valuation", "Led By"].map((h, i) => (
                <span key={i} style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 2, color: c.textMuted, textTransform: "uppercase", fontWeight: 500 }}>{h}</span>
              ))}
            </div>
            {[
              { round: "Seed", date: "Oct 2023", amount: "~$8M", val: "—", led: "OpenAI Startup Fund" },
              { round: "Series A", date: "Aug 2024", amount: "~$60M", val: "~$400M", led: "Andreessen Horowitz" },
              { round: "Series B", date: "Dec 2024", amount: "~$105M", val: "~$2.6B", led: "Thrive Capital" },
              { round: "Series C", date: "Jun 2025", amount: "$900M", val: "$9.9B", led: "Thrive Capital" },
              { round: "Series D", date: "Nov 2025", amount: "$2.3B", val: "$29.3B", led: "Accel, Coatue" },
            ].map((r, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 80px 100px 100px 1fr", gap: 16, padding: "14px 20px", borderBottom: `1px solid ${c.border}`, alignItems: "center" }}>
                <span style={{ fontFamily: fonts.mono, fontSize: 11, color: c.accent, fontWeight: 500 }}>{r.round}</span>
                <span style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textMuted }}>{r.date}</span>
                <span style={{ fontFamily: fonts.serif, fontSize: 18, fontWeight: 400, color: c.text }}>{r.amount}</span>
                <span style={{ fontSize: 13, color: c.textSoft }}>{r.val}</span>
                <span style={{ fontSize: 13, color: c.textSoft }}>{r.led}</span>
              </div>
            ))}
          </div>
          <Source>Seed, Series A, B: TechCrunch, Tracxn, community reconstructions (amounts/dates approximate). Series C: TechCrunch Jun 2025. Series D: BusinessWire/CNBC Nov 2025.</Source>
        </div>
      </section>

      {/* ═══════ 02 · BUSINESS MODEL ═══════ */}
      <section id="model" style={{ background: c.white, padding: "80px 0" }}>
        <Wrap>
          <SectionLabel>02 · Business Model</SectionLabel>
          <SectionTitle style={{ marginBottom: 12 }}>Pricing & the Unit Economics Question</SectionTitle>
          <Body style={{ fontSize: 16, maxWidth: 640, marginBottom: 48 }}>Cursor runs a PLG SaaS model with a generous free tier, a $20/month Pro plan that drives most revenue, and an Ultra tier at $200/month for power users.</Body>

          {/* Pricing table */}
          <div style={{ background: c.surface, borderRadius: 12, border: `1px solid ${c.border}`, overflow: "hidden", marginBottom: 48 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 8, color: c.textMuted, padding: "12px 20px", borderBottom: `1px solid ${c.border}`, letterSpacing: 0.5 }}>PRE-JUNE 2025 MODEL · REQUEST QUOTAS SHIFTED TO CREDIT-BASED SYSTEM JUNE 16, 2025</div>
            {[
              { name: "Hobby", price: "$0/mo", detail: "~2,000 completions · ~50 premium requests · Community support", hl: false },
              { name: "Pro", price: "$20/mo", detail: "Unlimited completions · ~500 fast premium requests · Unlimited slow", hl: true },
              { name: "Business", price: "$40/seat/mo", detail: "Team admin · SSO/SAML · Usage analytics · Centralized billing", hl: false },
            ].map((t, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "120px 120px 1fr", gap: 24, padding: "20px", borderBottom: `1px solid ${c.border}`, alignItems: "center", background: t.hl ? c.accentPale : "transparent" }}>
                <span style={{ fontSize: 14, fontWeight: t.hl ? 500 : 400, color: t.hl ? c.accent : c.textSoft }}>{t.name}</span>
                <span style={{ fontFamily: fonts.serif, fontSize: 20, fontWeight: 400, color: t.hl ? c.text : c.textSoft }}>{t.price}</span>
                <span style={{ fontSize: 13, color: c.textMuted }}>{t.detail}</span>
              </div>
            ))}
          </div>

          {/* Bull / Bear */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={{ background: c.bullPale, borderRadius: 12, padding: 32, border: `1px solid #C8DCC9` }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 2, color: c.bull, marginBottom: 14, textTransform: "uppercase", fontWeight: 500 }}>BULL CASE</div>
              <div style={{ fontFamily: fonts.serif, fontSize: 28, fontWeight: 400, color: c.text, marginBottom: 16 }}>~70%+ gross margins</div>
              <Body style={{ margin: 0 }}>Bullish analyst models suggest healthy margins driven by proprietary model development and efficient inference routing. Cursor is building its own models (Composer, a custom Tab model) specifically to reduce dependency on expensive third-party APIs. These are modeled estimates, not audited figures.</Body>
            </div>
            <div style={{ background: c.bearPale, borderRadius: 12, padding: 32, border: `1px solid #E0C9C6` }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 2, color: c.bear, marginBottom: 14, textTransform: "uppercase", fontWeight: 500 }}>BEAR CASE</div>
              <div style={{ fontFamily: fonts.serif, fontSize: 28, fontWeight: 400, color: c.text, marginBottom: 16 }}>Most revenue → inference</div>
              <Body style={{ margin: 0 }}>Bearish estimates and insider commentary suggest Cursor may spend the vast majority of revenue on AI compute costs, making the business structurally challenging at current pricing. The June 2025 pricing change supports this interpretation.</Body>
            </div>
          </div>
          <Source>Sources: Contrary Research, AI Funding Tracker, Sacra</Source>
        </Wrap>
      </section>

      {/* ═══════ 03 · COMPETITIVE LANDSCAPE ═══════ */}
      <section id="compete" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 48px" }}>
        <SectionLabel>03 · Competitive Landscape</SectionLabel>
        <SectionTitle style={{ marginBottom: 12 }}>The Battleground</SectionTitle>
        <Body style={{ fontSize: 16, maxWidth: 640, marginBottom: 48 }}>AI-assisted coding is the most contested market in software. Every major model provider is simultaneously funding Cursor and building products that compete directly with it.</Body>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginBottom: 60 }}>
          <div>
            <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 2, color: c.textMuted, marginBottom: 24, textTransform: "uppercase" }}>Estimated Market Share</div>
            <ShareBars />
            <Source>Source: Contrary Research, industry estimates</Source>
          </div>
          <div>
            <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 2, color: c.textMuted, marginBottom: 24, textTransform: "uppercase" }}>Key Competitors</div>
            {[
              { n: "GitHub Copilot", d: "Distribution moat. Bundled in VS Code, 180M+ GitHub developers (Octoverse 2025). 4.7M paid subscribers (Microsoft Q2 FY2026 earnings)" },
              { n: "Claude Code", d: "Terminal-native agentic coding. Anthropic's own tool, reportedly a major ARR contributor" },
              { n: "Gemini Code Assist", d: "Deep IDE integration + Google acqui-hired Windsurf's leadership in a reported multi-billion-dollar deal" },
              { n: "Devin (Cognition)", d: "Fully autonomous AI agent. A different paradigm that could make IDEs irrelevant" },
            ].map((comp, i) => (
              <div key={i} style={{ padding: "16px 0", borderBottom: `1px solid ${c.border}` }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: c.text, marginBottom: 4 }}>{comp.n}</div>
                <div style={{ fontSize: 13, color: c.textSoft, lineHeight: 1.65 }}>{comp.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Frenemy section */}
        <div style={{ background: c.indigo, borderRadius: 16, padding: 48, marginBottom: 60 }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 2, color: c.accentLight, marginBottom: 14, textTransform: "uppercase" }}>The Paradox</div>
          <div style={{ fontFamily: fonts.serif, fontSize: 28, fontWeight: 300, color: c.white, lineHeight: 1.3, maxWidth: 700, marginBottom: 40 }}>Every company that powers Cursor is also trying to replace it.</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {[
              { name: "Microsoft", role: "Owns VS Code (Cursor's foundation) + GitHub Copilot (est. ~42% market share per Contrary Research)", tension: "Could change VS Code licensing at any time. Copilot is bundled into the world's most popular editor." },
              { name: "Anthropic", role: "Provides Claude, Cursor's most popular model. Also built Claude Code, a direct competitor.", tension: "Claude Code has reportedly become a significant revenue driver for Anthropic. They have every incentive to own the coding workflow." },
              { name: "OpenAI", role: "Seed investor. Provides GPT models. Reportedly bid multiple billions for Windsurf.", tension: "After Cursor rejected an acquisition offer, OpenAI went after the next-largest player. The seed investment creates messy dynamics." },
              { name: "Google", role: "Series D investor. Provides Gemini models. Acqui-hired Windsurf's CEO in a reported multi-billion-dollar deal.", tension: "Invested in Cursor while simultaneously absorbing its closest competitor's talent. Classic Big Tech hedge." },
            ].map((f, i) => (
              <div key={i} style={{ padding: "24px 0", borderTop: "1px solid rgba(255,255,255,.1)" }}>
                <div style={{ fontSize: 16, fontWeight: 500, color: c.white, marginBottom: 8 }}>{f.name}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,.6)", lineHeight: 1.75, marginBottom: 10 }}>{f.role}</div>
                <div style={{ fontSize: 13, color: c.accentLight, fontStyle: "italic", lineHeight: 1.7 }}>{f.tension}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Windsurf saga */}
        <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 2, color: c.textMuted, marginBottom: 24, textTransform: "uppercase" }}>The Windsurf Saga</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            { act: "I", title: "OpenAI bids billions", body: "OpenAI reportedly attempts to acquire Windsurf (Codeium) for a reported ~$3B, after Cursor rejected their acquisition offer. The deal would give OpenAI an instant competitor to Cursor." },
            { act: "II", title: "Deal collapses", body: "Microsoft's IP rights under its OpenAI partnership become the obstacle. Microsoft expected its contractual rights to extend to any acquired technology, but OpenAI refused to share Windsurf's code (which would compete with Copilot). The exclusivity period expires in July 2025." },
            { act: "III", title: "Google & Cognition split it", body: "Google acqui-hires Windsurf's CEO and co-founder in a reported multi-billion-dollar deal. Cognition (makers of Devin) acquires remaining assets. Windsurf effectively ceases to exist." },
          ].map((a, i) => (
            <div key={i} style={{ background: c.white, borderRadius: 12, padding: 32, border: `1px solid ${c.border}` }}>
              <span style={{ fontFamily: fonts.serif, fontSize: 48, fontWeight: 300, color: c.border }}>{a.act}</span>
              <div style={{ fontFamily: fonts.serif, fontSize: 19, fontWeight: 500, margin: "8px 0 10px", color: c.text }}>{a.title}</div>
              <Body style={{ margin: 0 }}>{a.body}</Body>
            </div>
          ))}
        </div>
        <Source>Sources: Bloomberg, Fortune, DeepLearning.AI, CNBC, Elephas</Source>
      </section>

      {/* ═══════ 04 · MOAT ANALYSIS ═══════ */}
      <section id="moat" style={{ background: c.white, padding: "80px 0" }}>
        <Wrap>
          <SectionLabel>04 · Moat Analysis</SectionLabel>
          <SectionTitle style={{ marginBottom: 12 }}>Does Cursor Have a Defensible Moat?</SectionTitle>
          <Body style={{ fontSize: 16, maxWidth: 640, marginBottom: 48 }}>This is the $29 billion question. Cursor&apos;s growth is undeniable, but growth is not a moat. Every layer of potential defensibility has a credible counter-argument.</Body>

          <div style={{ background: c.surface, borderRadius: 12, border: `1px solid ${c.border}`, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr", padding: "16px 24px", background: c.surface, borderBottom: `1px solid ${c.border}` }}>
              <span style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 2, color: c.textMuted, textTransform: "uppercase", fontWeight: 500 }}>Layer</span>
              <span style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 2, color: c.bull, textTransform: "uppercase", fontWeight: 500 }}>Bull</span>
              <span style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 2, color: c.bear, textTransform: "uppercase", fontWeight: 500 }}>Bear</span>
            </div>
            {[
              { layer: "UX & Interaction Design", bull: "Tab completion, inline edits, and Composer feel magical. Developers build muscle memory around Cursor-specific workflows. The editing experience creates real switching costs.", bear: "UX is copyable. GitHub Copilot could replicate any interaction pattern in a few sprints. The underlying editor is literally Microsoft's own code." },
              { layer: "Proprietary Models", bull: "Cursor is training custom models optimized for code editing, including Composer and a custom Tab model. These can't be replicated by general-purpose LLMs and directly reduce inference costs.", bear: "Foundation models advance so fast that specialized fine-tunes may become unnecessary. What's differentiated today is table stakes tomorrow." },
              { layer: "Data Flywheel", bull: "1M+ daily users generating billions of edits, completions, and accept/reject signals. This proprietary dataset compounds and makes Cursor's models better over time.", bear: "GitHub Copilot has 4.7M paid users (per Microsoft Q2 FY2026 earnings). Their data flywheel is significantly larger. Anthropic has Claude Code usage data. Cursor's advantage may be relative, not absolute." },
              { layer: "Enterprise Lock-in", bull: "50%+ Fortune 500 on contracts. Enterprise procurement cycles create 12-24 month switching inertia. SSO, admin tooling, and usage analytics create organizational lock-in.", bear: "Enterprises hedge. Many large companies run Copilot and Cursor simultaneously. There's no exclusive commitment, just parallel subscriptions." },
            ].map((m, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr", gap: 24, padding: "24px", borderBottom: `1px solid ${c.border}`, alignItems: "start" }}>
                <div style={{ fontFamily: fonts.serif, fontSize: 18, fontWeight: 500, color: c.text, lineHeight: 1.3 }}>{m.layer}</div>
                <Body style={{ fontSize: 13, margin: 0 }}>{m.bull}</Body>
                <Body style={{ fontSize: 13, margin: 0 }}>{m.bear}</Body>
              </div>
            ))}
          </div>

          <Insight>The strongest moat argument is the combination: UX + proprietary models + data flywheel working together. No single layer is defensible alone, but the integrated system creates compound switching costs that are harder to replicate than any individual feature.</Insight>
        </Wrap>
      </section>

      {/* ═══════ 05 · PRICING CRISIS ═══════ */}
      <section id="crisis" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 48px" }}>
        <SectionLabel>05 · The Pricing Crisis</SectionLabel>
        <SectionTitle style={{ marginBottom: 12 }}>The Pricing Crisis</SectionTitle>
        <Body style={{ fontSize: 16, maxWidth: 640, marginBottom: 48 }}>In June 2025, Cursor quietly replaced its 500-fast-requests/month model with a usage-based credit system. The backlash was immediate and severe.</Body>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 40 }}>
          {[
            { phase: "The Change", date: "June 16, 2025", body: "500 fast requests/month replaced by a $20 usage credit pool priced at API rates, and a new $200/month Ultra tier introduced. The headline number dropped from 500 to roughly 225 for Claude Sonnet, though Sonnet already cost 2 requests each under the old system, making the real reduction smaller than it appeared. The perception gap fueled the backlash." },
            { phase: "The Backlash", date: "Jun–Jul 2025", body: "Mass cancellations, Reddit outrage, and accusations of a 'bait and switch.' Developers migrated to Windsurf and Claude Code. The r/cursor subreddit erupted with complaints." },
            { phase: "The Response", date: "July 4, 2025", body: "CEO Michael Truell posts a public apology. Cursor issues refunds for unexpected charges and improves pricing documentation and usage dashboards. The trust damage was real, and the episode confirmed inference cost pressure." },
          ].map((p, i) => (
            <div key={i} style={{ background: c.white, borderRadius: 12, padding: 32, border: `1px solid ${c.border}` }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 9, color: c.textMuted, marginBottom: 8, letterSpacing: 1 }}>{p.date}</div>
              <div style={{ fontFamily: fonts.serif, fontSize: 20, fontWeight: 500, color: c.text, marginBottom: 12 }}>{p.phase}</div>
              <Body style={{ margin: 0 }}>{p.body}</Body>
            </div>
          ))}
        </div>

        <PullQuote
          text="If Cursor, the market's pricing leader, couldn't maintain 500 requests per month at $20, it signals that per-query inference costs remain structurally challenging for the entire category."
          attr="Implication for the AI coding market"
        />

        <Insight label="WHY IT MATTERS">The pricing crisis is the strongest evidence that AI coding tools may not be sustainably profitable at current price points. The move toward proprietary models is a direct response: Cursor needs to own its inference stack or remain permanently squeezed between model costs and user expectations.</Insight>
        <Source>Sources: DigitrendZ, Reddit r/cursor, AI Tool Discovery, CEO public response</Source>
      </section>

      {/* ═══════ 06 · RISKS ═══════ */}
      <section id="risks" style={{ background: c.white, padding: "80px 0" }}>
        <Wrap>
          <SectionLabel>06 · Risks</SectionLabel>
          <SectionTitle style={{ marginBottom: 48 }}>What Could Kill Cursor</SectionTitle>

          {[
            { risk: "VS Code Platform Risk", sev: "Critical", sevColor: c.bear, desc: "Cursor's entire editor is built on a fork of Microsoft's open-source Code–OSS. While the MIT license cannot be retroactively revoked, Microsoft already restricts fork access to the VS Code Marketplace and could accelerate development divergence or embed Copilot so deeply that maintaining the fork becomes untenable.", mit: "Cursor is reportedly exploring its own editor architecture. The move to Cursor 2.0 with proprietary Composer model suggests a gradual decoupling strategy." },
            { risk: "Model Provider Vertical Integration", sev: "High", sevColor: c.amber, desc: "Every model provider Cursor depends on is building a competitor. If any provider degrades API quality, raises prices, or adds latency for Cursor specifically, the product immediately suffers.", mit: "Multi-model routing and proprietary model development reduce single-provider dependency. But no proprietary model yet matches Claude or GPT for quality." },
            { risk: "Paradigm Shift to Autonomous Agents", sev: "Emerging", sevColor: c.textMuted, desc: "Cursor augments human developers. Devin replaces them. If autonomous coding agents reach reliability thresholds, the IDE-centric model may be disrupted entirely.", mit: "Cursor is expanding toward agentic features. The paradigm may converge, and human-in-the-loop augmentation may prove more reliable than full autonomy for years." },
          ].map((r, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, padding: "36px 0", borderTop: `1px solid ${c.border}` }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <span style={{ fontFamily: fonts.serif, fontSize: 20, fontWeight: 500, color: c.text }}>{r.risk}</span>
                  <span style={{ fontFamily: fonts.mono, fontSize: 9, fontWeight: 500, padding: "3px 10px", borderRadius: 4, background: `${r.sevColor}18`, color: r.sevColor, border: `1px solid ${r.sevColor}35` }}>{r.sev}</span>
                </div>
                <Body style={{ margin: 0 }}>{r.desc}</Body>
              </div>
              <div style={{ borderLeft: `1px solid ${c.border}`, paddingLeft: 40 }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 2, color: c.bull, marginBottom: 12, textTransform: "uppercase", fontWeight: 500 }}>MITIGATION</div>
                <Body style={{ margin: 0 }}>{r.mit}</Body>
              </div>
            </div>
          ))}
        </Wrap>
      </section>

      {/* ═══════ 07 · VERDICT ═══════ */}
      <section id="verdict" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 48px" }}>
        <Wrap narrow style={{ padding: 0 }}>
          <SectionLabel>07 · Verdict</SectionLabel>
          <SectionTitle style={{ marginBottom: 12 }}>What to Watch</SectionTitle>
          <Body style={{ fontSize: 16, marginBottom: 48 }}>
            Cursor is the most consequential product in developer tools since VS Code itself. Its growth is real, its product is genuinely loved, and its strategic position is genuinely precarious. That combination makes it the most interesting company in software right now.
          </Body>

          {[
            { signal: "Proprietary Model Quality", q: "Can Cursor's custom models match Claude and GPT quality? If yes, unit economics transform and the moat deepens. If no, the margin squeeze continues indefinitely." },
            { signal: "Editor Independence", q: "Does Cursor ship a non-VS-Code editor? This is the single most important strategic move they could make, and the hardest. It would eliminate the platform dependency but risk alienating users who chose Cursor because it felt like VS Code." },
            { signal: "Enterprise Revenue Mix", q: "What percentage of ARR comes from Business/Enterprise vs. individual Pro subscriptions? Enterprise lock-in is the only moat that durably resists Big Tech distribution advantages." },
          ].map((s, i) => (
            <div key={i} style={{ padding: "28px 0", borderTop: `1px solid ${c.border}` }}>
              <div style={{ fontFamily: fonts.serif, fontSize: 20, fontWeight: 500, color: c.text, marginBottom: 10 }}>{s.signal}</div>
              <Body style={{ margin: 0 }}>{s.q}</Body>
            </div>
          ))}
        </Wrap>
      </section>

      {/* ═══════ SOURCES ═══════ */}
      <section id="sources" style={{ background: c.indigo, padding: "72px 0" }}>
        <Wrap>
          <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,.35)", marginBottom: 24, textTransform: "uppercase" }}>Sources & Methodology</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)", lineHeight: 1.75 }}>
              Confirmed figures: $500M+ ARR (TechCrunch, Jun 2025), $2B+ ARR (Bloomberg/TechCrunch, Mar 2026), $100M ARR by Jan 2025 (Contrary Research), $900M Series C at $9.9B (TechCrunch), $2.3B Series D at $29.3B led by Accel and Coatue (BusinessWire press release, CNBC). Seed Oct 2023 (TechCrunch), Series A Aug 2024 (TechCrunch), Series B Dec 2024 (TechCrunch). GitHub developer count from Octoverse 2025 (180M+). Copilot 4.7M subscribers from Microsoft Q2 FY2026 earnings call.
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)", lineHeight: 1.75 }}>
              Estimated figures: early round sizes approximate per Tracxn and secondary trackers. ~36% conversion rate is analyst-derived (paying users ÷ total users). Market share from Contrary Research (not official disclosures). Windsurf saga synthesized from TechCrunch, DeepLearning.AI, and Elephas; bid amounts are reported, not confirmed by parties. Margin estimates from analyst models (Newcomer, Contrary Research), not audited financials. Pricing controversy from TechCrunch, cursor.com/blog (CEO July 4 response), and r/cursor.
            </div>
          </div>
        </Wrap>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer style={{ padding: "48px", textAlign: "center", borderTop: `1px solid ${c.border}` }}>
        <p style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textMuted, letterSpacing: 1, margin: 0 }}>
          Teardown by <strong style={{ color: c.text, fontWeight: 600 }}>Chetan Jonnalagadda</strong> · <a href="https://chetanjonnalagadda.com" style={{ color: c.accent, textDecoration: "none" }}>chetanjonnalagadda.com</a>
        </p>
        <p style={{ fontFamily: fonts.mono, fontSize: 9, color: c.textMuted, letterSpacing: 0.5, maxWidth: 500, margin: "8px auto 0", lineHeight: 1.6 }}>
          Independent analysis for portfolio purposes. All data from public reporting. Not affiliated with Anysphere or any company mentioned.
        </p>
      </footer>
    </div>
  );
}
