'use client';

import { CaseStudyTOC } from "@/components/ui/CaseStudyTOC";

const FIGMA_TOC_SECTIONS = [
  { id: "fig-01", number: "01", label: "Comprehend" },
  { id: "fig-02", number: "02", label: "Research" },
  { id: "fig-03", number: "03", label: "Solution" },
  { id: "fig-04", number: "04", label: "Wireframes" },
  { id: "fig-05", number: "05", label: "Prioritize" },
  { id: "fig-06", number: "06", label: "PRD" },
  { id: "fig-07", number: "07", label: "Impact" },
];

const c = {
  bg: "#F5F1EB",
  bgWarm: "#EDE8E0",
  bgDark: "#1A1A18",
  bgCard: "#FFFFFF",
  surface: "#FAF8F5",
  border: "#E0DCD4",
  borderDark: "#2A2A28",
  accent: "#5B3DC8",
  accentLight: "#7C5CE7",
  accentPale: "#EEEBF8",
  accentDark: "#3D2896",
  indigo: "#2D2B55",
  amber: "#B8860B",
  amberPale: "#FBF5E8",
  clay: "#8B6F5E",
  slate: "#4A4A48",
  text: "#1A1A18",
  textSoft: "#5A5A56",
  textMuted: "#8A8A84",
  white: "#FFFFFF",
  red: "#A0342B",
  redPale: "#F8EEEC",
  teal: "#0D9488",
  tealPale: "#E6F5F3",
};

const fonts = {
  serif: "'Instrument Serif', 'Georgia', serif",
  sans: "'Outfit', 'Helvetica Neue', sans-serif",
  mono: "'IBM Plex Mono', monospace",
};

export default function FigmaCaseStudy() {
  const tocTheme = {
    accent: c.accent,
    text: c.text,
    textMuted: c.textMuted,
    textDim: c.textSoft,
    bg: "rgba(245, 241, 235, 0.94)",
    border: c.border,
    fontMono: fonts.mono,
    fontSans: fonts.sans,
    fontSerif: fonts.serif,
  };

  return (
    <div style={{ background: c.bg, color: c.text, minHeight: "100vh", fontFamily: fonts.sans, lineHeight: 1.7 }}>
      <CaseStudyTOC sections={FIGMA_TOC_SECTIONS} theme={tocTheme} variant="scrubber" />
      {/* ─── HERO GRADIENT ─── */}
      <div style={{ position: "relative", width: "100%", height: 360, overflow: "hidden", background: `linear-gradient(135deg, ${c.indigo} 0%, ${c.accent} 40%, ${c.accentLight} 70%, #A78BFA 100%)` }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(245,241,235,0.5) 75%, #F5F1EB 100%)" }}/>
        {/* Decorative grid pattern */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.08 }} viewBox="0 0 1200 360" preserveAspectRatio="none">
          {Array.from({length: 20}, (_, i) => <line key={`v${i}`} x1={i*60} y1="0" x2={i*60} y2="360" stroke="white" strokeWidth="1"/>)}
          {Array.from({length: 6}, (_, i) => <line key={`h${i}`} x1="0" y1={i*60} x2="1200" y2={i*60} stroke="white" strokeWidth="1"/>)}
        </svg>
        <div style={{ position: "absolute", bottom: 24, left: 48, right: 48 }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <span style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 2, color: c.textMuted, background: "rgba(245,241,235,0.85)", padding: "4px 10px", borderRadius: 4 }}>Figma · Product Improvement Case Study</span>
          </div>
        </div>
      </div>

      {/* ─── HERO TEXT ─── */}
      <header style={{ padding: "48px 48px 60px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: c.accent }}/>
          <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 3, color: c.textMuted, textTransform: "uppercase" }}>Product Improvement Case Study</span>
        </div>
        <h1 style={{ fontFamily: fonts.serif, fontSize: 68, fontWeight: 300, lineHeight: 1.05, margin: "0 0 24px", color: c.text, letterSpacing: "-1px", maxWidth: 800 }}>
          Rebuilding Trust<br/>After <em style={{ fontStyle: "italic" }}>UI3</em>
        </h1>
        <p style={{ fontSize: 19, color: c.textSoft, lineHeight: 1.8, maxWidth: 640, margin: 0, fontWeight: 300 }}>
          How a major redesign and AI data-sharing controversy tested trust with Figma&apos;s power users, and a PM framework for earning it back through progressive migration and transparent AI.
        </p>
      </header>

      {/* ─── DIVIDER ─── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ height: 1, background: c.border }}/>
      </div>

      {/* ─── STATS BAR ─── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
          {[
            { val: "$1.06B", label: "FY2025 Revenue", sub: "+41% YoY, first billion-dollar year" },
            { val: "~2–3★", label: "Trustpilot Rating", sub: "Rated 'Poor': UI3 & pricing backlash" },
            { val: "Dominant", label: "Designer Market Share", sub: "Default tool for pro UI/UX design" },
            { val: "136%", label: "Net Dollar Retention", sub: "Highest in 10 quarters" },
          ].map((s, i) => (
            <div key={i} style={{ padding: "0 24px", borderLeft: i > 0 ? `1px solid ${c.border}` : "none" }}>
              <div style={{ fontFamily: fonts.serif, fontSize: 42, fontWeight: 300, color: c.accent, lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: c.text, marginTop: 8 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: c.textMuted, marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── SECTION 01: PROBLEM ─── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ height: 1, background: c.border }}/>
      </div>
      <section id="fig-01" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 80 }}>
          <div>
            <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 3, color: c.accent, textTransform: "uppercase" }}>01 · Comprehend</span>
            <h2 style={{ fontFamily: fonts.serif, fontSize: 36, fontWeight: 400, margin: "12px 0 0", lineHeight: 1.2 }}>The Problem</h2>
          </div>
          <div>
            <p style={{ fontSize: 17, color: c.textSoft, lineHeight: 1.9, margin: "0 0 32px", fontWeight: 300 }}>
              Figma began rolling out its UI3 redesign around Config 2024 and fully migrated users on April 30, 2025, effectively retiring the previous interface. At the same time, Figma introduced new AI features and a data-sharing policy that, by default, enrolled Starter and Professional teams to let their content be used for AI training, while Organization and Enterprise customers were opted out by default. These changes triggered intense backlash across forums and social media, and later became part of the context for a proposed class-action lawsuit alleging that Figma misused customer designs to train its AI models without proper consent.
            </p>

            {/* Quotes */}
            {[
              { q: "UI3 is, without a doubt, the most unfriendly design possible. It has made my workflow painfully slow and incredibly unproductive.", s: "Representative composite, based on Figma Forum feedback threads" },
              { q: "UI3 feels like Illustrator for babies. The interface is so horrifyingly oversimplified that it makes Microsoft Paint look like feature-rich professional software.", s: "Representative composite, based on Figma Forum and Reddit posts" },
            ].map((quote, i) => (
              <div key={i} style={{ borderLeft: `2px solid ${c.accent}`, paddingLeft: 24, margin: "28px 0" }}>
                <p style={{ fontFamily: fonts.serif, fontSize: 18, fontStyle: "italic", color: c.slate, lineHeight: 1.7, margin: 0 }}>&quot;{quote.q}&quot;</p>
                <p style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textMuted, marginTop: 10, letterSpacing: 1 }}>{quote.s}</p>
              </div>
            ))}
            <p style={{ fontSize: 11, color: c.textMuted, marginTop: 4, fontStyle: "italic" }}>Quotes are anonymized composites derived from public Figma Forum and Reddit posts, edited for brevity and clarity.</p>
          </div>
        </div>

        {/* Trust Erosion Taxonomy */}
        <div style={{ marginTop: 60, background: c.white, borderRadius: 16, padding: 40, border: `1px solid ${c.border}` }}>
          <h3 style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 3, color: c.accent, margin: "0 0 28px", textTransform: "uppercase" }}>Trust Erosion Taxonomy</h3>
          {[
            { mode: "Forced UI3 Migration (Apr 30, 2025)", sev: "Critical", freq: "All users", desc: "UI2 fallback permanently removed. No opt-out. Power users report noticeable productivity drops and friction.", color: c.red },
            { mode: "AI Training Default Opt-In", sev: "Critical", freq: "Free + Pro users", desc: "Individual/small team designs opted in to AI training by default. Organization/Enterprise tiers were not auto-enrolled. Opt-out buried in team settings.", color: c.red },
            { mode: "Make Designs → Apple Weather Clone", sev: "High", freq: "Public incident", desc: "AI feature generated near-replica of Apple's Weather app. Feature pulled within days of Config 2024 launch.", color: c.amber },
            { mode: "Proposed Class-Action Lawsuit (Nov 2025)", sev: "Critical", freq: "Pending litigation", desc: "Khan v. Figma: plaintiffs seek substantial damages and injunctive relief over alleged secret IP harvesting for AI training.", color: c.red },
            { mode: "Dev Mode Paywall ($25–35/seat/mo)", sev: "Medium", freq: "Org + Enterprise", desc: "Previously free feature became paid. Teams reported near-doubling of annual spend. 'Very Adobe of you.'", color: c.clay },
            { mode: "Bottom Toolbar: Non-Configurable", sev: "High", freq: "All users", desc: "#1 unresolved UI3 complaint through March 2026. Conflicts with OS docks, overlaps work.", color: c.amber },
          ].map((f, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 120px 120px", gap: 24, padding: "20px 0", borderTop: `1px solid ${c.border}`, alignItems: "start" }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 500, color: c.text }}>{f.mode}</div>
                <div style={{ fontSize: 13, color: c.textMuted, marginTop: 4 }}>{f.desc}</div>
              </div>
              <div style={{ fontSize: 12, color: c.textMuted }}>{f.freq}</div>
              <div><span style={{ fontSize: 10, fontFamily: fonts.mono, padding: "3px 10px", borderRadius: 4, background: `${f.color}15`, color: f.color, border: `1px solid ${f.color}30` }}>{f.sev}</span></div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 02: RESEARCH ─── */}
      <section id="fig-02" style={{ background: c.white, padding: "80px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 80, marginBottom: 60 }}>
            <div>
              <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 3, color: c.accent, textTransform: "uppercase" }}>02 · Research</span>
              <h2 style={{ fontFamily: fonts.serif, fontSize: 36, fontWeight: 400, margin: "12px 0 0", lineHeight: 1.2 }}>Business<br/>Context</h2>
            </div>
            <div>
              <p style={{ fontSize: 17, color: c.textSoft, lineHeight: 1.9, margin: "0 0 24px", fontWeight: 300 }}>
                Figma&apos;s situation created a clear tension: the product continues to grow as a core design platform, but some of its most engaged users voiced strong frustration with how major changes were rolled out. The metrics that matter to investors (revenue, retention, expansion) can diverge from the sentiment that matters to the community using the product every day.
              </p>
            </div>
          </div>

          {/* Business Context Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 60 }}>
            {[
              { title: "IPO & Market Cap", body: "IPO July 31, 2025 at $33/share on NYSE (FIG). Closed first day at $115.50, implying ~$68B market cap, before trading well below that peak by early 2026. $1B breakup fee from failed $20B Adobe acquisition (Dec 2023) padded the balance sheet." },
              { title: "Revenue & Retention", body: "FY2025 revenue $1.056B (+41% YoY). Q4 2025 revenue $304M (+40% YoY). 136% net dollar retention, highest in 10 quarters. 95% of Fortune 500 companies use Figma. 1,405 customers at $100K+ ARR; 67 at $1M+." },
              { title: "Platform Expansion", body: "Config 2025 doubled products from 4 to 8: Figma Make (AI code gen), Sites (web publishing), Draw (illustration), Buzz (marketing). Strong multi-product adoption driving expansion revenue. Strategy: 'design tool → product development platform.'" },
              { title: "Competitive Landscape", body: "Figma holds dominant share among pro UI/UX designers. Sketch at ~4.5% (Mac-only). Penpot (open source) has grown meaningfully on the back of Figma backlash. Adobe XD in maintenance mode. AI competitors: v0.dev, Lovable, Bolt.new, Google Stitch." },
            ].map((card, i) => (
              <div key={i} style={{ background: c.surface, borderRadius: 12, padding: 32, border: `1px solid ${c.border}` }}>
                <h4 style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 2, color: c.accent, margin: "0 0 16px", textTransform: "uppercase" }}>{card.title}</h4>
                <p style={{ fontSize: 14, color: c.textSoft, lineHeight: 1.7, margin: 0 }}>{card.body}</p>
              </div>
            ))}
          </div>

          {/* UI3 Timeline */}
          <div style={{ background: c.surface, borderRadius: 16, padding: 40, border: `1px solid ${c.border}` }}>
            <h3 style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 3, color: c.accent, margin: "0 0 32px", textTransform: "uppercase" }}>UI3 + AI Trust Erosion Timeline</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {[
                { date: "Jun 26, 2024", event: "Config 2024", desc: "UI3 announced. AI features debut. 'Make Designs' enters beta. Limited opt-in." },
                { date: "Jul 2, 2024", event: "Apple Weather Clone", desc: "AI generates Apple Weather replica. Feature pulled. CEO admits can't confirm training data." },
                { date: "Aug 15, 2024", event: "AI Opt-In Default", desc: "AI training on customer data begins. Org/Enterprise not auto-enrolled. Free + Pro users opted IN by default." },
                { date: "Oct 10, 2024", event: "UI3 Available to All", desc: "Full rollout with opt-out toggle. Users can revert to UI2. Feedback overwhelmingly negative." },
                { date: "Apr 30, 2025", event: "UI2 Killed", desc: "Forced migration. No revert option. Forum threads explode. Chrome extension built to override CSS." },
                { date: "Nov 21, 2025", event: "Class-Action Filed", desc: "Khan v. Figma (N.D. Cal.): proposed class action alleges secret IP harvesting for AI training without consent." },
              ].map((t, i) => (
                <div key={i} style={{ position: "relative", paddingLeft: 20, borderLeft: `2px solid ${i === 4 || i === 5 ? c.red : c.accent}30` }}>
                  <div style={{ position: "absolute", left: -5, top: 4, width: 8, height: 8, borderRadius: "50%", background: i === 4 || i === 5 ? c.red : c.accent }}/>
                  <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textMuted, letterSpacing: 1 }}>{t.date}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: c.text, margin: "4px 0" }}>{t.event}</div>
                  <div style={{ fontSize: 12, color: c.textMuted, lineHeight: 1.5 }}>{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 03: SOLUTION ─── */}
      <section id="fig-03" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 80, marginBottom: 60 }}>
          <div>
            <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 3, color: c.accent, textTransform: "uppercase" }}>03 · Solution</span>
            <h2 style={{ fontFamily: fonts.serif, fontSize: 36, fontWeight: 400, margin: "12px 0 0", lineHeight: 1.2 }}>The Trust<br/><em style={{ fontStyle: "italic" }}>Recovery</em></h2>
          </div>
          <p style={{ fontSize: 17, color: c.textSoft, lineHeight: 1.9, fontWeight: 300, margin: 0 }}>
            This case study explores two interconnected frameworks that could have reduced friction and preserved more trust during this transition. First, a Progressive Migration System that gives power users more agency over interface changes. Second, an AI Transparency Layer that makes data use and consent more visible, granular, and easy to manage.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
          {[
            { num: "01", title: "Configurable Workspace", desc: "Toolbar position (top/bottom/side), panel docking (floating/fixed), and density presets (compact/default/spacious). Save per-user. Never force a single layout." },
            { num: "02", title: "Gradual Feature Introduction", desc: "New UI features launch as opt-in toggles with clear before/after previews. Users adopt on their timeline. Deprecate legacy only after 80%+ voluntary adoption." },
            { num: "03", title: "AI Consent Dashboard", desc: "Account-level (not team-level) AI data controls. Visual log of what data was used, when, and for which model. One-click opt-out for all AI training. Same default protections across all tiers." },
            { num: "04", title: "Design Provenance Tracking", desc: "Every AI-generated element tagged with origin metadata: model version, prompt, training data scope. Exportable provenance certificate for IP protection." },
            { num: "05", title: "AI Output Guardrails", desc: "Similarity detection against known design systems (iOS, Material, etc.) before output. Flagging when generated UI resembles existing products. User controls threshold sensitivity." },
            { num: "06", title: "Community Feedback Loop", desc: "Public feature status board with voting. Monthly 'Design Council': top 20 power users by usage get direct access to product team. Forum threads never locked while active." },
          ].map((s, i) => (
            <div key={i} style={{ background: c.white, borderRadius: 12, padding: 32, border: `1px solid ${c.border}` }}>
              <span style={{ fontFamily: fonts.serif, fontSize: 36, fontWeight: 300, color: c.accent, opacity: 0.35 }}>{s.num}</span>
              <h4 style={{ fontFamily: fonts.serif, fontSize: 19, fontWeight: 500, margin: "8px 0 10px" }}>{s.title}</h4>
              <p style={{ fontSize: 13, color: c.textSoft, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 04: WIREFRAMES ─── */}
      <section id="fig-04" style={{ background: c.bgDark, padding: "80px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px" }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 3, color: c.accentLight, textTransform: "uppercase" }}>04 · Wireframes</span>
          <h2 style={{ fontFamily: fonts.serif, fontSize: 36, fontWeight: 400, margin: "12px 0 48px", lineHeight: 1.2, color: c.white }}>Before → After</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 48px 1fr", gap: 24, alignItems: "stretch" }}>
            {/* CURRENT UI3 */}
            <div style={{ background: "#242424", borderRadius: 16, padding: 32, border: `1px solid ${c.borderDark}`, display: "flex", flexDirection: "column" }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.red, letterSpacing: 2, marginBottom: 20 }}>CURRENT: UI3 (FORCED)</div>
              <svg style={{ flex: 1 }} viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="320" height="240" rx="8" fill="#1E1E1E"/>
                {/* Bottom toolbar */}
                <rect x="80" y="200" width="160" height="32" rx="8" fill="#2C2C2C" stroke="#444" strokeWidth="0.5"/>
                <text x="115" y="220" fontFamily="Outfit" fontSize="9" fill="#888">▢ ◇ T ✎ ⊕</text>
                <text x="225" y="220" fontFamily="IBM Plex Mono" fontSize="6" fill={c.red}>⚠ FIXED</text>
                {/* Side panels, floating */}
                <rect x="8" y="8" width="60" height="180" rx="6" fill="#2C2C2C" stroke="#444" strokeWidth="0.5" strokeDasharray="3 2"/>
                <text x="14" y="24" fontFamily="IBM Plex Mono" fontSize="7" fill="#666">Layers</text>
                <text x="14" y="38" fontFamily="IBM Plex Mono" fontSize="6" fill="#555">Floating panel</text>
                <text x="14" y="50" fontFamily="IBM Plex Mono" fontSize="6" fill="#555">Gap shows canvas</text>
                {/* Missing features */}
                <rect x="80" y="36" width="160" height="52" rx="6" fill="#3A1515"/>
                <text x="92" y="54" fontFamily="IBM Plex Mono" fontSize="7" fill={c.red}>✗ Boolean ops in overflow menu</text>
                <text x="92" y="68" fontFamily="IBM Plex Mono" fontSize="7" fill={c.red}>✗ Toolbar position not configurable</text>
                <text x="92" y="82" fontFamily="IBM Plex Mono" fontSize="7" fill={c.red}>✗ No density controls</text>
                {/* Properties panel */}
                <rect x="252" y="8" width="60" height="180" rx="6" fill="#2C2C2C" stroke="#444" strokeWidth="0.5"/>
                <text x="258" y="24" fontFamily="IBM Plex Mono" fontSize="7" fill="#666">Properties</text>
                <text x="258" y="38" fontFamily="IBM Plex Mono" fontSize="6" fill="#555">Reorganized</text>
                <text x="258" y="50" fontFamily="IBM Plex Mono" fontSize="6" fill={c.red}>Position/size</text>
                <text x="258" y="62" fontFamily="IBM Plex Mono" fontSize="6" fill={c.red}>location varies</text>
              </svg>
            </div>

            {/* Arrow */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="32" height="32" viewBox="0 0 32 32"><path d="M6 16 L22 16 M17 11 L22 16 L17 21" stroke={c.accentLight} strokeWidth="2" fill="none"/></svg>
            </div>

            {/* PROPOSED */}
            <div style={{ background: "#242424", borderRadius: 16, padding: 32, border: `1px solid ${c.borderDark}`, display: "flex", flexDirection: "column" }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.accentLight, letterSpacing: 2, marginBottom: 20 }}>PROPOSED: CONFIGURABLE WORKSPACE</div>
              <svg style={{ flex: 1 }} viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="320" height="240" rx="8" fill="#1E1E1E"/>
                {/* Top toolbar */}
                <rect x="8" y="8" width="304" height="28" rx="6" fill="#2C2C2C" stroke={c.accentLight} strokeWidth="0.5"/>
                <text x="18" y="26" fontFamily="Outfit" fontSize="9" fill="#CCC">▢ ◇ T ✎ ⊕ ∪ ∩ −</text>
                <text x="218" y="26" fontFamily="IBM Plex Mono" fontSize="6" fill={c.accentLight}>✓ Position: configurable</text>
                {/* Docked layers */}
                <rect x="8" y="44" width="64" height="188" rx="0" fill="#2C2C2C"/>
                <text x="14" y="62" fontFamily="IBM Plex Mono" fontSize="7" fill="#999">Layers</text>
                <text x="14" y="76" fontFamily="IBM Plex Mono" fontSize="6" fill={c.teal}>Docked, no gap</text>
                {/* Density + boolean */}
                <rect x="84" y="50" width="148" height="36" rx="6" fill="#1A2A1A"/>
                <text x="94" y="66" fontFamily="IBM Plex Mono" fontSize="7" fill={c.teal}>✓ Density: Compact / Default / Spacious</text>
                <text x="94" y="80" fontFamily="IBM Plex Mono" fontSize="7" fill={c.teal}>✓ Boolean ops restored to toolbar</text>
                {/* AI consent */}
                <rect x="84" y="96" width="148" height="44" rx="6" fill="#1A1A2A"/>
                <text x="94" y="114" fontFamily="IBM Plex Mono" fontSize="7" fill={c.accentLight}>AI Consent Dashboard</text>
                <text x="94" y="128" fontFamily="IBM Plex Mono" fontSize="6" fill="#888">Training: OFF · Provenance: ON</text>
                <text x="94" y="140" fontFamily="IBM Plex Mono" fontSize="6" fill="#888">Account-level · One-click toggle</text>
                {/* Feature opt-in */}
                <rect x="84" y="150" width="148" height="36" rx="6" fill="#1A2020"/>
                <text x="94" y="168" fontFamily="IBM Plex Mono" fontSize="7" fill="#A0A0A0">New Feature: Figma Draw</text>
                <text x="94" y="180" fontFamily="IBM Plex Mono" fontSize="6" fill={c.teal}>⬤ Opt-in · Preview available</text>
                {/* Docked properties */}
                <rect x="248" y="44" width="64" height="188" rx="0" fill="#2C2C2C"/>
                <text x="254" y="62" fontFamily="IBM Plex Mono" fontSize="7" fill="#999">Properties</text>
                <text x="254" y="76" fontFamily="IBM Plex Mono" fontSize="6" fill={c.teal}>Stable layout</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 05: PRIORITIZATION ─── */}
      <section id="fig-05" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 48px" }}>
        <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 3, color: c.accent, textTransform: "uppercase" }}>05 · Prioritize</span>
        <h2 style={{ fontFamily: fonts.serif, fontSize: 36, fontWeight: 400, margin: "12px 0 40px" }}>RICE Scoring</h2>

        <div style={{ background: c.white, borderRadius: 12, border: `1px solid ${c.border}`, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 1fr 1fr 1fr", padding: "16px 24px", borderBottom: `1px solid ${c.border}`, background: c.surface }}>
            {["Feature", "Reach", "Impact", "Confidence", "Effort", "Score"].map((h, i) => (
              <span key={i} style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 2, color: c.textMuted, textTransform: "uppercase", textAlign: i > 0 ? "center" : "left" }}>{h}</span>
            ))}
          </div>
          {[
            { f: "Configurable workspace (toolbar + panels)", r: "All users (est.)", i: "3", conf: "95%", e: "2", s: "185.3", top: true },
            { f: "AI Consent Dashboard (account-level)", r: "All users (est.)", i: "3", conf: "90%", e: "2", s: "175.5", top: true },
            { f: "Gradual feature introduction (opt-in)", r: "All users (est.)", i: "2", conf: "90%", e: "2", s: "117.0", top: true },
            { f: "Design provenance tracking", r: "Paid teams (est.)", i: "2", conf: "80%", e: "3", s: "28.8", top: false },
            { f: "AI output similarity guardrails", r: "Paid teams (est.)", i: "2", conf: "70%", e: "3", s: "25.2", top: false },
            { f: "Community Design Council", r: "~1K power users", i: "2", conf: "85%", e: "1", s: "1.7", top: false },
          ].map((row, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 1fr 1fr 1fr", padding: "16px 24px", borderBottom: `1px solid ${c.border}`, background: row.top ? c.accentPale : "transparent" }}>
              <span style={{ fontSize: 14, fontWeight: row.top ? 500 : 400, color: c.text }}>{row.f}</span>
              {[row.r, row.i, row.conf, row.e].map((v, j) => (
                <span key={j} style={{ fontSize: 13, color: c.textMuted, textAlign: "center" }}>{v}</span>
              ))}
              <span style={{ fontSize: 14, fontWeight: 600, color: row.top ? c.accent : c.textSoft, textAlign: "center", fontFamily: fonts.mono }}>{row.s}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 06: PRD ─── */}
      <section id="fig-06" style={{ background: c.white, padding: "80px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px" }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 3, color: c.accent, textTransform: "uppercase" }}>06 · PRD Excerpt</span>
          <h2 style={{ fontFamily: fonts.serif, fontSize: 36, fontWeight: 400, margin: "12px 0 48px" }}>Product Requirements</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
            {[
              { label: "Problem", text: "Figma's UI3 migration and default opt-in AI training created significant friction with power users. Trustpilot rating in the 'Poor' range (~2–3★), dozens of forum threads documented widespread backlash, and a proposed class-action lawsuit was filed over AI data practices. Power users report noticeable productivity drops and feel their feedback is not being heard." },
              { label: "Goal", text: "Restore Trustpilot rating to 3.5★+ within 180 days. Reduce UI-related support tickets by 35%. Achieve 90%+ opt-in to new features within 120 days of launch (voluntary, not forced). No additional AI-related legal actions." },
              { label: "Users", text: "Millions of MAUs across tiers. Primary: power designers (heavy daily users on paid Professional/Organization seats). Secondary: design-adjacent roles (PMs, devs, marketers) who represent ~2/3 of user base per S-1. Tertiary: enterprise admins concerned about IP protection." },
              { label: "Metrics", text: "P0: Voluntary feature adoption rate ≥90% within 120 days. P1: Forum sentiment shift from majority-negative to ≤20% negative threads. P2: AI consent dashboard engagement ≥50% of paid users. Guardrail: No increase in churn among $100K+ ARR accounts." },
              { label: "Non-Goals", text: "Not reverting UI3 entirely. Not removing AI features. Not matching Penpot's open-source model. Not eliminating Dev Mode as a paid feature." },
              { label: "Risks", text: "Configurable workspace increases maintenance surface. AI consent dashboard may reduce training data volume. Gradual adoption may slow feature velocity. Community Council could amplify rather than resolve complaints." },
            ].map((item, i) => (
              <div key={i} style={{ padding: "28px 32px", borderBottom: `1px solid ${c.border}`, borderRight: i % 2 === 0 ? `1px solid ${c.border}` : "none" }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 3, color: c.accent, marginBottom: 12, textTransform: "uppercase" }}>{item.label}</div>
                <p style={{ fontSize: 14, color: c.textSoft, lineHeight: 1.7, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 07: METRICS ─── */}
      <section id="fig-07" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 48px" }}>
        <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 3, color: c.accent, textTransform: "uppercase" }}>07 · Impact</span>
        <h2 style={{ fontFamily: fonts.serif, fontSize: 36, fontWeight: 400, margin: "12px 0 48px" }}>Projected Outcomes</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 60 }}>
          {[
            { label: "Trustpilot Rating", from: "~2–3★", to: "3.5★+", delta: "Exit 'Poor'" },
            { label: "Voluntary Adoption", from: "0% (forced)", to: "≥90%", delta: "Agency restored" },
            { label: "Forum Sentiment", from: "Majority negative", to: "≤20% negative", delta: "Trust rebuilt" },
            { label: "AI Consent Engagement", from: "~0% (hidden)", to: "≥50%", delta: "Transparency" },
          ].map((m, i) => (
            <div key={i} style={{ background: c.white, borderRadius: 12, padding: 28, border: `1px solid ${c.border}`, cursor: "default" }}
              onMouseEnter={() => setHoveredMetric(i)} onMouseLeave={() => setHoveredMetric(null)}>
              <div style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 2, color: c.textMuted, marginBottom: 16, textTransform: "uppercase" }}>{m.label}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ fontFamily: fonts.serif, fontSize: 28, color: c.textMuted, fontWeight: 300, textDecoration: "line-through", textDecorationColor: c.red }}>{m.from}</span>
              </div>
              <div style={{ fontFamily: fonts.serif, fontSize: 36, color: c.accent, fontWeight: 400, marginTop: 4 }}>{m.to}</div>
              <div style={{ fontFamily: fonts.mono, fontSize: 11, color: c.accent, marginTop: 8, padding: "2px 8px", background: c.accentPale, borderRadius: 4, display: "inline-block" }}>{m.delta}</div>
            </div>
          ))}
        </div>

        {/* Validation Timeline */}
        <div style={{ background: c.white, borderRadius: 12, padding: 40, border: `1px solid ${c.border}` }}>
          <h3 style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 3, color: c.accent, margin: "0 0 28px", textTransform: "uppercase" }}>180-Day Validation Plan</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {[
              { phase: "Day 0–30", title: "Workspace Controls", desc: "Ship toolbar position + panel docking toggles. A/B test on 10% of Pro users. Measure task completion time." },
              { phase: "Day 30–60", title: "AI Consent Dashboard", desc: "Account-level opt-in/out with data usage log. Track engagement rate and opt-out percentage." },
              { phase: "Day 60–120", title: "Gradual Feature Intro", desc: "Pilot opt-in toggle for next major feature. Measure voluntary adoption curve vs. forced baseline." },
              { phase: "Day 120–180", title: "Full Rollout + Council", desc: "All workspace controls GA. Design Council launches. Monitor Trustpilot, forum sentiment, NPS." },
            ].map((p, i) => (
              <div key={i}>
                <div style={{ fontFamily: fonts.mono, fontSize: 9, color: c.accent, letterSpacing: 2, marginBottom: 8 }}>{p.phase}</div>
                <div style={{ fontSize: 15, fontWeight: 500, color: c.text, marginBottom: 8 }}>{p.title}</div>
                <div style={{ fontSize: 13, color: c.textMuted, lineHeight: 1.6 }}>{p.desc}</div>
                {i < 3 && <div style={{ width: "100%", height: 2, background: `linear-gradient(90deg, ${c.accent}, ${c.border})`, marginTop: 16, borderRadius: 1 }}/>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REFLECTION ─── */}
      <section style={{ background: c.indigo, padding: "80px 0" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 48px", textAlign: "center" }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 3, color: c.accentLight, textTransform: "uppercase" }}>What I Learned</span>
          <p style={{ fontFamily: fonts.serif, fontSize: 26, fontWeight: 300, color: c.white, lineHeight: 1.7, margin: "24px 0 0", fontStyle: "italic" }}>
            The UI3 backlash was not only about the redesign itself, but about how quickly choice was removed. The AI controversy was not simply about using AI, but about how customer work was included in training with defaults many users did not expect. Both moments highlight the same underlying risk: it is possible to prioritize shipping velocity in ways that leave power users feeling like they have less agency than before.
          </p>
          <p style={{ fontFamily: fonts.serif, fontSize: 20, fontWeight: 400, color: c.accentLight, marginTop: 32, lineHeight: 1.6 }}>
            Growth metrics can temporarily hide early signs of trust erosion.<br/>As a PM, I try to design rollouts so that the people<br/>who helped build the moat always feel heard.
          </p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ padding: "48px", textAlign: "center", borderTop: `1px solid ${c.border}` }}>
        <p style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textMuted, letterSpacing: 1 }}>
          Case study by <strong style={{ color: c.text, fontWeight: 500 }}>Chetan Jonnalagadda</strong> · <a href="https://chetanjonnalagadda.com" style={{ color: c.accent, textDecoration: "none" }}>chetanjonnalagadda.com</a>
        </p>
        <p style={{ fontFamily: fonts.mono, fontSize: 9, color: c.textMuted, letterSpacing: 0.5, marginTop: 8, maxWidth: 500, margin: "8px auto 0" }}>
          Financial data from Figma FY2025 earnings. Quotes are representative composites. RICE scores, projected metrics, and solutions are illustrative PM exercises.
        </p>
      </footer>
    </div>
  );
}
