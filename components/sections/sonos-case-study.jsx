'use client';

import { useState } from "react";

const c = {
  bg: "#F5F1EB",
  bgWarm: "#EDE8E0",
  bgDark: "#1A1A18",
  bgCard: "#FFFFFF",
  surface: "#FAF8F5",
  border: "#E0DCD4",
  borderDark: "#2A2A28",
  accent: "#E8590C",
  accentLight: "#F97316",
  accentPale: "#FFF3ED",
  accentDark: "#C2410C",
  charcoal: "#292524",
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
  serif: "'Cormorant Garamond', 'Georgia', serif",
  sans: "'Outfit', 'Helvetica Neue', sans-serif",
  mono: "'IBM Plex Mono', monospace",
};

export default function SonosCaseStudy() {
  const [hoveredMetric, setHoveredMetric] = useState(null);

  return (
    <div style={{ background: c.bg, color: c.text, minHeight: "100vh", fontFamily: fonts.sans, lineHeight: 1.7 }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@200;300;400;500;600&family=IBM+Plex+Mono:wght@300;400;500&display=swap" rel="stylesheet"/>

      {/* ─── HERO ─── */}
      <div style={{ position: "relative", width: "100%", height: 340, overflow: "hidden", background: `linear-gradient(135deg, ${c.charcoal} 0%, #44403C 40%, #78716C 80%, #A8A29E 100%)` }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(245,241,235,0.5) 75%, #F5F1EB 100%)" }}/>
        {/* Sound wave decoration */}
        <svg style={{ position: "absolute", bottom: 60, left: 0, width: "100%", height: 120, opacity: 0.06 }} viewBox="0 0 1200 120" preserveAspectRatio="none">
          {Array.from({length: 60}, (_, i) => (
            <rect key={i} x={i * 20} y={60 - Math.sin(i * 0.3) * 40} width="4" height={Math.sin(i * 0.3) * 80 + 10} rx="2" fill="white"/>
          ))}
        </svg>
        <div style={{ position: "absolute", bottom: 24, left: 48, right: 48 }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <span style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 2, color: c.textMuted, background: "rgba(245,241,235,0.85)", padding: "4px 10px", borderRadius: 4 }}>Sonos · Product Improvement Case Study</span>
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
          When the Music<br/><em style={{ fontStyle: "italic" }}>Stopped</em>
        </h1>
        <p style={{ fontSize: 19, color: c.textSoft, lineHeight: 1.8, maxWidth: 640, margin: 0, fontWeight: 300 }}>
          How Sonos shipped a major app rewrite that removed or degraded core features, broke accessibility, and cost the CEO his job. A PM framework for how the migration should have been managed.
        </p>
      </header>

      {/* ─── DIVIDER ─── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px" }}><div style={{ height: 1, background: c.border }}/></div>

      {/* ─── STATS BAR ─── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
          {[
            { val: "~$500M", label: "Market Cap Lost", sub: "Direct impact of app disaster" },
            { val: "30K+", label: "Customer Complaints", sub: "Forums, reviews, and social media" },
            { val: "15 mo", label: "Queue Restore Time", sub: "Basic feature missing May 2024 to Sep 2025" },
            { val: "CEO Fired", label: "Patrick Spence", sub: "Departed January 2025" },
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
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px" }}><div style={{ height: 1, background: c.border }}/></div>
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 80 }}>
          <div>
            <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 3, color: c.accent, textTransform: "uppercase" }}>01 — Comprehend</span>
            <h2 style={{ fontFamily: fonts.serif, fontSize: 36, fontWeight: 400, margin: "12px 0 0", lineHeight: 1.2 }}>The Problem</h2>
          </div>
          <div>
            <p style={{ fontSize: 17, color: c.textSoft, lineHeight: 1.9, margin: "0 0 32px", fontWeight: 300 }}>
              On May 7, 2024, Sonos released a major rewrite of its mobile app, in part to prepare for its upcoming Ace headphones. The new app removed or significantly degraded core features that customers depended on daily: sleep timers, alarms, queue management, local music library access, and playlist editing. Accessibility for blind and visually impaired users was effectively broken. Because Sonos did not support reverting to the old app and backend changes were tied to the new release, customers effectively had no official rollback path.
            </p>

            {[
              { q: "I have 23 Sonos zones in my house. The moment I downloaded the app, everything fell apart. Music cuts out, unable to play, app takes forever to load.", s: "Representative composite, based on Sonos Community forum posts" },
              { q: "The new app was not accessible at all, despite assurances from the company prior to the update that the app would have basic accessibility features.", s: "Representative composite, based on reports from blind Sonos users" },
            ].map((quote, i) => (
              <div key={i} style={{ borderLeft: `2px solid ${c.accent}`, paddingLeft: 24, margin: "28px 0" }}>
                <p style={{ fontFamily: fonts.serif, fontSize: 18, fontStyle: "italic", color: c.slate, lineHeight: 1.7, margin: 0 }}>"{quote.q}"</p>
                <p style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textMuted, marginTop: 10, letterSpacing: 1 }}>— {quote.s}</p>
              </div>
            ))}
            <p style={{ fontSize: 11, color: c.textMuted, marginTop: 4, fontStyle: "italic" }}>Quotes are anonymized composites derived from public Sonos Community forum posts, edited for brevity and clarity.</p>
          </div>
        </div>

        {/* Failure Taxonomy */}
        <div style={{ marginTop: 60, background: c.white, borderRadius: 16, padding: 40, border: `1px solid ${c.border}` }}>
          <h3 style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 3, color: c.accent, margin: "0 0 28px", textTransform: "uppercase" }}>What Went Wrong: Failure Taxonomy</h3>
          {[
            { mode: "Core Features Removed or Degraded at Launch", sev: "Critical", freq: "All users", desc: "Sleep timers, alarms, queue management, local library, playlist editing removed or significantly impaired. Sonos initially called this 'courage.'", color: c.red },
            { mode: "No Official Rollback Path", sev: "Critical", freq: "All users", desc: "Backend changes tied to new release meant the old app was not officially supported. Some Android users sideloaded old APKs, but this was fragile and unofficial.", color: c.red },
            { mode: "Accessibility Broken for Blind Users", sev: "Critical", freq: "VoiceOver users", desc: "Screen reader support effectively non-functional. 3-4 swipes per speaker vs. direct access before. Sonos had promised 'basic accessibility.'", color: c.red },
            { mode: "Hardware-Software Launch Coupling", sev: "High", freq: "Systemic", desc: "App rewrite deadline was reportedly linked to the Ace headphones timeline. This case argues that software flexibility was sacrificed for an immovable hardware date.", color: c.amber },
            { mode: "QA and Internal Warning Signs", sev: "High", freq: "Systemic", desc: "Reporting suggests quality assurance resources may have been insufficient for the scope of the rewrite. Internal teams who raised concerns were reportedly overruled.", color: c.amber },
            { mode: "Product Team Familiarity Gap", sev: "Medium", freq: "Systemic", desc: "Some reporting suggests newer product managers leading the rewrite may not have had deep familiarity with legacy Sonos ecosystem and customer usage patterns.", color: c.clay },
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
      <section style={{ background: c.white, padding: "80px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 80, marginBottom: 60 }}>
            <div>
              <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 3, color: c.accent, textTransform: "uppercase" }}>02 — Research</span>
              <h2 style={{ fontFamily: fonts.serif, fontSize: 36, fontWeight: 400, margin: "12px 0 0", lineHeight: 1.2 }}>Business<br/>Context</h2>
            </div>
            <div>
              <p style={{ fontSize: 17, color: c.textSoft, lineHeight: 1.9, margin: "0 0 24px", fontWeight: 300 }}>
                Sonos was a beloved premium audio brand with over 16 million active households, according to its investor materials. The app rewrite wasn't a design failure in isolation. From a process perspective, this case suggests it was the result of tying an immovable hardware timeline to a flexible software rewrite, likely compressing QA for a highly complex release, and sidelining internal warnings from people closest to the product.
              </p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 60 }}>
            {[
              { title: "Financials", body: "FY2024 revenue: $1.518B. FY2025 revenue: $1.443B (-5% YoY). App disaster caused an estimated $100M revenue hit. Sonos pledged $20-30M for app recovery. Executive bonuses suspended Oct 2024 to Sep 2025. Two hardware launches delayed." },
              { title: "Leadership Fallout", body: "CEO Patrick Spence fired January 2025. Tom Conrad (Pandora co-founder, Sonos board member) became interim CEO. 12% workforce reduction announced February 2025. Conrad: 'This year we've let far too many people down.'" },
              { title: "Legal Exposure", body: "Multiple proposed class-action lawsuits filed in 2025 (Blair et al., Goodrow v. Sonos). Allegations: breach of contract, violations of Computer Fraud and Abuse Act, California False Advertising Law. Mass arbitration campaign organized via ClassAction.org." },
              { title: "Recovery Efforts", body: "Public Trello board for feature tracking (later retired). 7 commitments plan (Oct 2024): Customer Advisory Board, extended warranties, quality ombudsperson. As of March 2026, some features still not fully restored (Android notification controls took ~2 years)." },
            ].map((card, i) => (
              <div key={i} style={{ background: c.surface, borderRadius: 12, padding: 32, border: `1px solid ${c.border}` }}>
                <h4 style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 2, color: c.accent, margin: "0 0 16px", textTransform: "uppercase" }}>{card.title}</h4>
                <p style={{ fontSize: 14, color: c.textSoft, lineHeight: 1.7, margin: 0 }}>{card.body}</p>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div style={{ background: c.surface, borderRadius: 16, padding: 40, border: `1px solid ${c.border}` }}>
            <h3 style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 3, color: c.accent, margin: "0 0 32px", textTransform: "uppercase" }}>The Disaster Timeline</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {[
                { date: "May 7, 2024", event: "New App Ships", desc: "Major app rewrite launches ahead of Ace headphones (available June 5). Core features missing or degraded. No official rollback." },
                { date: "May-Jun 2024", event: "Backlash Erupts", desc: "30K+ complaints. Blind users report app 'not accessible at all.' Community calls it 'Sonos's Windows Vista moment.'" },
                { date: "Jul 26, 2024", event: "CEO Apologizes", desc: "Spence issues public apology nearly 3 months after launch. Pledges $20-30M for recovery. Sets feature restoration timeline." },
                { date: "Oct 1, 2024", event: "Turnaround Plan", desc: "7 commitments published. Exec bonuses suspended. 80%+ features restored. Warranty extensions announced." },
                { date: "Jan 13, 2025", event: "CEO Fired", desc: "Patrick Spence departs. Tom Conrad named interim CEO. Board begins permanent CEO search." },
                { date: "Sep 2025", event: "Queue Returns", desc: "Queue position feature finally restored after 15 months. Android notification controls still missing until March 2026." },
              ].map((t, i) => (
                <div key={i} style={{ position: "relative", paddingLeft: 20, borderLeft: `2px solid ${i <= 1 || i === 4 ? c.red : c.accent}30` }}>
                  <div style={{ position: "absolute", left: -5, top: 4, width: 8, height: 8, borderRadius: "50%", background: i <= 1 || i === 4 ? c.red : c.accent }}/>
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
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 80, marginBottom: 60 }}>
          <div>
            <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 3, color: c.accent, textTransform: "uppercase" }}>03 — Solution</span>
            <h2 style={{ fontFamily: fonts.serif, fontSize: 36, fontWeight: 400, margin: "12px 0 0", lineHeight: 1.2 }}>The Safe<br/><em style={{ fontStyle: "italic" }}>Migration</em></h2>
          </div>
          <p style={{ fontSize: 17, color: c.textSoft, lineHeight: 1.9, fontWeight: 300, margin: 0 }}>
            This case study proposes the migration framework Sonos should have used. The core principle: never ship a platform rewrite that removes functionality users depend on, and always preserve a rollback path. A phased migration with feature parity gates, accessibility-first QA, and decoupled hardware/software timelines could have significantly reduced the severity of this crisis.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
          {[
            { num: "01", title: "Feature Parity Scorecard", desc: "Before any migration, audit every feature in the existing app. Assign priority tiers (P0/P1/P2). Block launch until all P0 features pass QA. Sleep timers, alarms, and queue were P0." },
            { num: "02", title: "Parallel App Strategy", desc: "Run old and new apps simultaneously. Let users opt into the new version while maintaining the legacy app. Deprecate legacy only after 90%+ voluntary migration." },
            { num: "03", title: "Accessibility Gate", desc: "No launch without passing WCAG 2.1 AA and platform-specific accessibility audits (VoiceOver, TalkBack). Include blind/low-vision beta testers in every sprint." },
            { num: "04", title: "Decouple Hardware + Software", desc: "Ship the Ace headphones with the existing app. Let the new app mature independently. Hardware dates should never dictate software readiness." },
            { num: "05", title: "Progressive Rollout", desc: "New app to 5% of users first, then 25%, then 50%, then GA. Each gate requires meeting quality metrics: crash rate <0.5%, feature parity ≥95%, NPS ≥baseline." },
            { num: "06", title: "Transparent Recovery Dashboard", desc: "If issues arise, publish a live status board (not a Trello board that gets retired). Weekly video updates from the PM lead. Never close forum threads while active." },
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
      <section style={{ background: c.bgDark, padding: "80px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px" }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 3, color: c.accentLight, textTransform: "uppercase" }}>04 — Wireframes</span>
          <h2 style={{ fontFamily: fonts.serif, fontSize: 36, fontWeight: 400, margin: "12px 0 48px", lineHeight: 1.2, color: c.white }}>Before → After</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 48px 1fr", gap: 24, alignItems: "stretch" }}>
            {/* WHAT SONOS DID */}
            <div style={{ background: "#242424", borderRadius: 16, padding: 32, border: `1px solid ${c.borderDark}`, display: "flex", flexDirection: "column" }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.red, letterSpacing: 2, marginBottom: 20 }}>WHAT SONOS DID: BIG BANG REWRITE</div>
              <svg style={{ flex: 1 }} viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="320" height="260" rx="8" fill="#1E1E1E"/>
                {/* Old app crossed out */}
                <rect x="20" y="16" width="120" height="28" rx="6" fill="#2C2C2C" stroke="#444" strokeWidth="0.5"/>
                <text x="40" y="34" fontFamily="IBM Plex Mono" fontSize="8" fill="#666">Old App (S2)</text>
                <line x1="20" y1="30" x2="140" y2="30" stroke={c.red} strokeWidth="2"/>
                {/* Arrow down */}
                <text x="75" y="60" fontFamily="Outfit" fontSize="10" fill={c.red}>↓ Forced update</text>
                {/* New app with missing features */}
                <rect x="20" y="72" width="280" height="168" rx="8" fill="#2C2C2C" stroke={c.red} strokeWidth="0.5"/>
                <text x="32" y="92" fontFamily="IBM Plex Mono" fontSize="8" fill="#888">New App (May 2024)</text>
                <rect x="32" y="104" width="256" height="124" rx="6" fill="#3A1515"/>
                <text x="44" y="124" fontFamily="IBM Plex Mono" fontSize="7" fill={c.red}>✗ Sleep timers removed</text>
                <text x="44" y="140" fontFamily="IBM Plex Mono" fontSize="7" fill={c.red}>✗ Alarms removed</text>
                <text x="44" y="156" fontFamily="IBM Plex Mono" fontSize="7" fill={c.red}>✗ Queue management removed</text>
                <text x="44" y="172" fontFamily="IBM Plex Mono" fontSize="7" fill={c.red}>✗ Local music library removed</text>
                <text x="44" y="188" fontFamily="IBM Plex Mono" fontSize="7" fill={c.red}>✗ Playlist editing removed</text>
                <text x="44" y="204" fontFamily="IBM Plex Mono" fontSize="7" fill={c.red}>✗ VoiceOver/accessibility broken</text>
                <text x="44" y="220" fontFamily="IBM Plex Mono" fontSize="7" fill={c.red}>✗ No rollback possible</text>
              </svg>
            </div>

            {/* Arrow */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="32" height="32" viewBox="0 0 32 32"><path d="M6 16 L22 16 M17 11 L22 16 L17 21" stroke={c.accentLight} strokeWidth="2" fill="none"/></svg>
            </div>

            {/* WHAT SHOULD HAVE HAPPENED */}
            <div style={{ background: "#242424", borderRadius: 16, padding: 32, border: `1px solid ${c.borderDark}`, display: "flex", flexDirection: "column" }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.accentLight, letterSpacing: 2, marginBottom: 20 }}>PROPOSED: PHASED SAFE MIGRATION</div>
              <svg style={{ flex: 1 }} viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="320" height="260" rx="8" fill="#1E1E1E"/>
                {/* Old app still available */}
                <rect x="20" y="16" width="120" height="28" rx="6" fill="#2C2C2C" stroke={c.teal} strokeWidth="0.5"/>
                <text x="32" y="34" fontFamily="IBM Plex Mono" fontSize="8" fill={c.teal}>✓ Old App (active)</text>
                {/* New app opt-in */}
                <rect x="160" y="16" width="140" height="28" rx="6" fill="#2C2C2C" stroke={c.accentLight} strokeWidth="0.5"/>
                <text x="172" y="34" fontFamily="IBM Plex Mono" fontSize="8" fill={c.accentLight}>New App (opt-in beta)</text>
                {/* Feature parity gate */}
                <rect x="20" y="60" width="280" height="36" rx="6" fill="#1A2A1A"/>
                <text x="32" y="78" fontFamily="IBM Plex Mono" fontSize="7" fill={c.teal}>✓ Feature Parity Gate: P0 features verified</text>
                <text x="32" y="90" fontFamily="IBM Plex Mono" fontSize="7" fill={c.teal}>  Timers ✓  Alarms ✓  Queue ✓  Library ✓  A11y ✓</text>
                {/* Progressive rollout */}
                <rect x="20" y="106" width="280" height="44" rx="6" fill="#1A1A2A"/>
                <text x="32" y="124" fontFamily="IBM Plex Mono" fontSize="7" fill={c.accentLight}>Progressive Rollout Gates</text>
                <text x="32" y="138" fontFamily="IBM Plex Mono" fontSize="6" fill="#888">5% → crash &lt;0.5%, NPS ≥baseline</text>
                <text x="32" y="148" fontFamily="IBM Plex Mono" fontSize="6" fill="#888">25% → 50% → GA (only after 90%+ voluntary)</text>
                {/* Accessibility gate */}
                <rect x="20" y="160" width="280" height="32" rx="6" fill="#1A2020"/>
                <text x="32" y="180" fontFamily="IBM Plex Mono" fontSize="7" fill={c.teal}>✓ Accessibility Gate: WCAG 2.1 AA + VoiceOver audit</text>
                {/* Decoupled timeline */}
                <rect x="20" y="202" width="280" height="40" rx="6" fill="#202020"/>
                <text x="32" y="220" fontFamily="IBM Plex Mono" fontSize="7" fill="#A0A0A0">Ace headphones ship with OLD app</text>
                <text x="32" y="234" fontFamily="IBM Plex Mono" fontSize="6" fill={c.teal}>New app launches when ready, not when hardware ships</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 05: PRIORITIZATION ─── */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 48px" }}>
        <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 3, color: c.accent, textTransform: "uppercase" }}>05 — Prioritize</span>
        <h2 style={{ fontFamily: fonts.serif, fontSize: 36, fontWeight: 400, margin: "12px 0 40px" }}>RICE Scoring</h2>

        <div style={{ background: c.white, borderRadius: 12, border: `1px solid ${c.border}`, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 1fr 1fr 1fr", padding: "16px 24px", borderBottom: `1px solid ${c.border}`, background: c.surface }}>
            {["Feature", "Reach", "Impact", "Confidence", "Effort", "Score"].map((h, i) => (
              <span key={i} style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 2, color: c.textMuted, textTransform: "uppercase", textAlign: i > 0 ? "center" : "left" }}>{h}</span>
            ))}
          </div>
          {[
            { f: "Feature parity scorecard + gate", r: "All users (est.)", i: "3", conf: "95%", e: "1", s: "285.0", top: true },
            { f: "Parallel app / rollback path", r: "All users (est.)", i: "3", conf: "90%", e: "2", s: "135.0", top: true },
            { f: "Accessibility-first QA gate", r: "A11y users (est.)", i: "3", conf: "95%", e: "1", s: "28.5", top: true },
            { f: "Decouple HW/SW launch timelines", r: "Systemic", i: "2", conf: "85%", e: "2", s: "17.0", top: false },
            { f: "Progressive rollout (5→25→50→GA)", r: "All users (est.)", i: "2", conf: "90%", e: "2", s: "90.0", top: false },
            { f: "Transparent recovery dashboard", r: "All users (est.)", i: "1", conf: "80%", e: "1", s: "80.0", top: false },
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
      <section style={{ background: c.white, padding: "80px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px" }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 3, color: c.accent, textTransform: "uppercase" }}>06 — PRD Excerpt</span>
          <h2 style={{ fontFamily: fonts.serif, fontSize: 36, fontWeight: 400, margin: "12px 0 48px" }}>Product Requirements</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
            {[
              { label: "Problem", text: "Sonos shipped a major app rewrite that removed or significantly degraded core features, broke accessibility, and offered no official rollback path. The result: approximately $500M in lost market cap, 30K+ customer complaints, multiple proposed class-action lawsuits, and the departure of the CEO." },
              { label: "Goal", text: "Establish a platform migration framework ensuring no feature-stripping launches. Targets: 100% P0 feature parity before any migration, ≥90% voluntary adoption before legacy deprecation, zero accessibility regressions, and decoupled hardware/software timelines." },
              { label: "Users", text: "Over 16 million active Sonos households (per investor materials). Primary: daily music listeners who depend on alarms, timers, and queue. Secondary: multi-room power users (10+ zones). Tertiary: blind and visually impaired users relying on VoiceOver/TalkBack." },
              { label: "Metrics", text: "P0: Feature parity score ≥95% before any rollout gate. P1: App crash rate <0.5% in new version. P2: NPS in new app ≥ old app baseline. Guardrail: Zero P0 accessibility regressions." },
              { label: "Non-Goals", text: "Not canceling the app rewrite entirely. Not preventing the Ace headphones launch. Not reverting the cloud architecture. The goal is a better process, not avoiding modernization." },
              { label: "Risks", text: "Running parallel apps doubles maintenance cost. Decoupling from hardware may delay revenue. Progressive rollout slows time-to-market. Feature parity gates require strong PM discipline against scope pressure." },
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
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 48px" }}>
        <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 3, color: c.accent, textTransform: "uppercase" }}>07 — Impact</span>
        <h2 style={{ fontFamily: fonts.serif, fontSize: 36, fontWeight: 400, margin: "12px 0 48px" }}>What Could Have Been Different</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 60 }}>
          {[
            { label: "Revenue Impact", from: "~$100M loss", to: "Avoided", delta: "Protected" },
            { label: "Feature Restoration", from: "15+ months", to: "0 days (never removed)", delta: "No gap" },
            { label: "CEO Tenure", from: "Fired Jan 2025", to: "Retained", delta: "Stability" },
            { label: "Accessibility", from: "Broken at launch", to: "Tested before launch", delta: "Inclusive" },
          ].map((m, i) => (
            <div key={i} style={{ background: c.white, borderRadius: 12, padding: 28, border: `1px solid ${c.border}`, cursor: "default" }}
              onMouseEnter={() => setHoveredMetric(i)} onMouseLeave={() => setHoveredMetric(null)}>
              <div style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 2, color: c.textMuted, marginBottom: 16, textTransform: "uppercase" }}>{m.label}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ fontFamily: fonts.serif, fontSize: 24, color: c.textMuted, fontWeight: 300, textDecoration: "line-through", textDecorationColor: c.red }}>{m.from}</span>
              </div>
              <div style={{ fontFamily: fonts.serif, fontSize: 32, color: c.accent, fontWeight: 400, marginTop: 4 }}>{m.to}</div>
              <div style={{ fontFamily: fonts.mono, fontSize: 11, color: c.accent, marginTop: 8, padding: "2px 8px", background: c.accentPale, borderRadius: 4, display: "inline-block" }}>{m.delta}</div>
            </div>
          ))}
        </div>

        {/* Migration Timeline */}
        <div style={{ background: c.white, borderRadius: 12, padding: 40, border: `1px solid ${c.border}` }}>
          <h3 style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 3, color: c.accent, margin: "0 0 28px", textTransform: "uppercase" }}>Proposed Migration Timeline (Alternative History)</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {[
              { phase: "Month 1-3", title: "Feature Parity Audit", desc: "Map every S2 feature. Assign P0/P1/P2 tiers. Build automated parity test suite. Begin accessibility audit." },
              { phase: "Month 3-6", title: "Closed Beta (5%)", desc: "New app to opt-in early adopters. Old app still primary. Measure crash rate, NPS, feature gaps. Fix before expanding." },
              { phase: "Month 6-9", title: "Open Beta (25-50%)", desc: "Ship Ace headphones with old app compatibility. Expand new app to willing users. Gate: parity ≥95%, NPS ≥baseline." },
              { phase: "Month 9-12", title: "GA + Legacy Sunset", desc: "New app to all users. Old app maintained for 6 more months. Deprecate only after 90%+ voluntary migration." },
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
      <section style={{ background: c.charcoal, padding: "80px 0" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 48px", textAlign: "center" }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 3, color: c.accentLight, textTransform: "uppercase" }}>What I Learned</span>
          <p style={{ fontFamily: fonts.serif, fontSize: 26, fontWeight: 300, color: c.white, lineHeight: 1.7, margin: "24px 0 0", fontStyle: "italic" }}>
            The Sonos disaster was not a design failure. Reporting suggests the design team tried to warn leadership. From a process perspective, this case points to a core mistake: tying an immovable hardware deadline to a flexible software project, likely compressing QA at the worst possible moment, and removing the rollback path that would have been the safety net for everything else.
          </p>
          <p style={{ fontFamily: fonts.serif, fontSize: 20, fontWeight: 400, color: c.accentLight, marginTop: 32, lineHeight: 1.6 }}>
            The magic of Sonos was making complex technology invisible.<br/>You just wanted to play music, and it worked.<br/>The PM's job is to protect that simplicity, even during modernization.
          </p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ padding: "48px", textAlign: "center", borderTop: `1px solid ${c.border}` }}>
        <p style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textMuted, letterSpacing: 1 }}>
          Case study by <strong style={{ color: c.text, fontWeight: 500 }}>Chetan Jonnalagadda</strong> · <a href="https://chetanjonnalagadda.com" style={{ color: c.accent, textDecoration: "none" }}>chetanjonnalagadda.com</a>
        </p>
        <p style={{ fontFamily: fonts.mono, fontSize: 9, color: c.textMuted, letterSpacing: 0.5, marginTop: 8, maxWidth: 500, margin: "8px auto 0" }}>
          Financial data from Sonos SEC filings (FY2024-FY2025). Quotes are representative composites. RICE scores, proposed solutions, and alternative timeline are illustrative PM exercises.
        </p>
      </footer>
    </div>
  );
}
