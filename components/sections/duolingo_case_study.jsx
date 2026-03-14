'use client';

import { useState } from "react";

export default function DuolingoCaseStudy() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Instrument+Sans:wght@400;500;600;700&family=Nunito:wght@600;700;800;900&display=swap');
        
*{margin:0;padding:0;box-sizing:border-box}
:root{
--bg:#F8F6F1;--dark:#141C2B;--accent:#D4790E;--teal:#1A6B5A;
--navy:#1E293B;--muted:#6B7A8D;--light:#FFF8ED;
--border:#D6CFC3;--green:#22845A;--red:#C0392B;--blue:#2563EB;
--surface:#FFFFFF;--surface2:#F1EDE5;
}
html{font-size:16px;scroll-behavior:smooth}
body{font-family:'Instrument Sans',system-ui,sans-serif;background:var(--bg);color:var(--dark);line-height:1.72;-webkit-font-smoothing:antialiased}
h1,h2,h3,h4{font-family:'DM Serif Display',serif;line-height:1.2;font-weight:400}

/* ---- NAV TOC ---- */
.toc{position:fixed;top:50%;right:1.5rem;transform:translateY(-50%);z-index:100;display:flex;flex-direction:column;gap:.6rem}
.toc a{width:8px;height:8px;border-radius:50%;background:var(--border);display:block;transition:all .25s}
.toc a:hover,.toc a.active{background:var(--accent);transform:scale(1.5)}
@media(max-width:900px){.toc{display:none}}

/* ---- HERO ---- */
.hero{background:var(--dark);color:#fff;padding:7rem 2rem 6rem;text-align:center;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;inset:0;background:
radial-gradient(ellipse at 20% 80%,rgba(26,107,90,.2) 0%,transparent 50%),
radial-gradient(ellipse at 80% 20%,rgba(212,121,14,.12) 0%,transparent 50%),
radial-gradient(ellipse at 50% 50%,rgba(30,41,59,.8) 0%,transparent 80%)}
.hero::after{content:'';position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(212,121,14,.3),transparent)}
.hero-badge{display:inline-flex;align-items:center;gap:.5rem;font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;color:var(--accent);border:1px solid rgba(212,121,14,.35);padding:.45rem 1.3rem;border-radius:100px;margin-bottom:2.5rem;position:relative;font-weight:600}
.hero h1{font-size:clamp(2.6rem,6vw,4.8rem);max-width:800px;margin:0 auto 1.5rem;position:relative}
.hero h1 em{font-style:italic;color:var(--accent)}
.hero-sub{font-size:clamp(1rem,2vw,1.2rem);color:rgba(255,255,255,.55);max-width:600px;margin:0 auto 3rem;font-weight:400}
.hero-meta{display:flex;justify-content:center;gap:2.5rem;flex-wrap:wrap;font-size:.75rem;color:rgba(255,255,255,.35);position:relative;letter-spacing:.03em}
.hero-divider{width:40px;height:2px;background:var(--accent);margin:2rem auto 0;opacity:.6}

/* ---- LAYOUT ---- */
.container{max-width:800px;margin:0 auto;padding:0 2rem}
.wide-container{max-width:960px;margin:0 auto;padding:0 2rem}
.section{padding:5rem 0}
.section-alt{background:var(--surface2)}
.section-dark{background:var(--navy);color:#fff}
.section-dark .section-label{color:var(--accent)}
.section-dark p{color:rgba(255,255,255,.65)}
.section-dark strong{color:#fff}

/* ---- TYPOGRAPHY ---- */
.section-label{font-family:'Instrument Sans',sans-serif;font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;color:var(--teal);font-weight:700;margin-bottom:.75rem}
.section-title{font-size:clamp(1.8rem,3.5vw,2.8rem);margin-bottom:1.5rem}
p{margin-bottom:1.25rem;color:#3D4A5C}
p.lead{font-size:1.08rem;color:var(--dark);font-weight:400;line-height:1.8}
strong{color:var(--dark);font-weight:600}
a{color:var(--blue);text-decoration:none}

/* ---- METRIC CARDS ---- */
.metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin:2.5rem 0}
.metric-card{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:1.4rem;text-align:center;transition:transform .2s,box-shadow .2s}
.metric-card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(20,28,43,.06)}
.metric-val{font-family:'DM Serif Display',serif;font-size:1.9rem;color:var(--dark)}
.metric-val.accent{color:var(--accent)}
.metric-val.teal{color:var(--teal)}
.metric-val.red{color:var(--red)}
.metric-label{font-size:.7rem;color:var(--muted);margin-top:.3rem;text-transform:uppercase;letter-spacing:.08em;font-weight:600}
.metric-src{font-size:.6rem;color:var(--border);margin-top:.2rem;font-style:italic}

/* ---- BLOCKQUOTE ---- */
blockquote{border-left:3px solid var(--accent);padding:1.2rem 1.5rem;margin:2rem 0;background:var(--light);border-radius:0 8px 8px 0;font-style:italic;color:#4A5568}
blockquote cite{display:block;margin-top:.75rem;font-size:.78rem;color:var(--muted);font-style:normal;font-weight:600}

/* ---- FRAMEWORK STEPS ---- */
.circle-step{margin:2.5rem 0;padding:2rem 2rem 2rem 3rem;background:var(--surface);border:1px solid var(--border);border-radius:12px;position:relative}
.step-letter{position:absolute;top:1.5rem;left:-1rem;background:var(--teal);color:#fff;width:2.2rem;height:2.2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'DM Serif Display',serif;font-size:1rem}
.circle-step h3{font-size:1.25rem;margin-bottom:1rem}
.circle-step p{font-size:.92rem}

/* ---- WIREFRAME CONTAINERS ---- */
.wireframe-wrap{margin:2.5rem 0;background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden}
.wireframe-header{padding:.8rem 1.25rem;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:.6rem;background:var(--surface2)}
.wf-dot{width:8px;height:8px;border-radius:50%;background:var(--border)}
.wf-dot.active{background:var(--accent)}
.wireframe-title{font-size:.72rem;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin-left:.5rem}
.wireframe-body{padding:2rem;display:flex;justify-content:center;background:#FAFAF7}
.wireframe-body svg{max-width:100%;height:auto}

/* ---- SVG VIZ ---- */
.viz-wrap{margin:2.5rem 0;background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden}
.viz-header{padding:1rem 1.5rem;border-bottom:1px solid var(--border)}
.viz-header h4{font-size:1rem;margin-bottom:.15rem}
.viz-header p{font-size:.75rem;color:var(--muted);margin:0}
.viz-body{padding:1.5rem;display:flex;justify-content:center}
.viz-body svg{max-width:100%;height:auto}

/* ---- TABLES ---- */
.prd-table{width:100%;border-collapse:collapse;margin:2rem 0;font-size:.88rem}
.prd-table th{text-align:left;padding:.7rem 1rem;background:var(--navy);color:#fff;font-weight:500;font-size:.7rem;text-transform:uppercase;letter-spacing:.06em}
.prd-table td{padding:.7rem 1rem;border-bottom:1px solid var(--border);vertical-align:top}
.prd-table tr:hover td{background:var(--light)}
.rice-table{width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:.82rem}
.rice-table th{text-align:left;padding:.55rem .7rem;background:var(--surface2);font-weight:700;font-size:.65rem;text-transform:uppercase;letter-spacing:.07em;border-bottom:2px solid var(--border)}
.rice-table td{padding:.55rem .7rem;border-bottom:1px solid var(--border)}
.rice-score{font-family:'DM Serif Display',serif;font-size:1.1rem}
.rice-score.top{color:var(--accent)}

/* ---- PILLS ---- */
.pill{display:inline-block;font-size:.65rem;padding:.2rem .6rem;border-radius:100px;font-weight:700;margin-right:.3rem}
.pill-accent{background:var(--light);color:var(--accent)}
.pill-teal{background:#E8F5EC;color:var(--teal)}
.pill-blue{background:#EBF2FA;color:var(--blue)}
.pill-red{background:#FDECEC;color:var(--red)}

/* ---- RISK ---- */
.risk-row{display:flex;gap:1rem;margin:1rem 0;padding:1rem 1.25rem;background:var(--surface);border:1px solid var(--border);border-radius:10px}
.risk-bar{width:4px;border-radius:4px;flex-shrink:0}
.risk-bar.high{background:var(--red)}.risk-bar.med{background:var(--accent)}.risk-bar.low{background:var(--green)}
.risk-content h4{font-size:.9rem;margin-bottom:.3rem;font-family:'Instrument Sans',sans-serif;font-weight:600}
.risk-content p{font-size:.82rem;margin:0;color:var(--muted)}

/* ---- PERSONAS ---- */
.persona-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin:2rem 0}
.persona{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:1.3rem;border-top:3px solid var(--teal)}
.persona h4{font-size:.95rem;margin-bottom:.4rem}
.persona-type{font-size:.6rem;color:var(--teal);text-transform:uppercase;letter-spacing:.12em;font-weight:700;margin-bottom:.6rem}
.persona p{font-size:.82rem;margin-bottom:.4rem}

/* ---- COMPARISON ---- */
.comparison{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin:2rem 0}
.comp-card{padding:1.4rem;border-radius:10px;border:1px solid var(--border)}
.comp-card.before{background:var(--surface)}
.comp-card.after{background:var(--light);border-color:var(--accent)}
.comp-card h4{font-size:.88rem;margin-bottom:.6rem;font-family:'Instrument Sans',sans-serif;font-weight:700;display:flex;align-items:center;gap:.4rem}
.comp-card ul{list-style:none;font-size:.82rem}
.comp-card li{padding:.3rem 0 .3rem 1.1rem;position:relative}
.comp-card.before li::before{content:'✕';position:absolute;left:0;color:var(--red);font-weight:700;font-size:.7rem}
.comp-card.after li::before{content:'✓';position:absolute;left:0;color:var(--green);font-weight:700;font-size:.7rem}

/* ---- TIMELINE ---- */
.timeline{margin:2rem 0;padding-left:1.5rem;border-left:2px solid var(--border)}
.tl-item{position:relative;padding-bottom:1.8rem}
.tl-item::before{content:'';position:absolute;left:-1.85rem;top:.3rem;width:10px;height:10px;border-radius:50%;background:var(--teal);border:2px solid var(--bg)}
.tl-date{font-size:.65rem;color:var(--teal);font-weight:700;text-transform:uppercase;letter-spacing:.08em}
.tl-item h4{font-size:.9rem;margin:.2rem 0;font-family:'Instrument Sans',sans-serif;font-weight:600}
.tl-item p{font-size:.82rem;color:var(--muted);margin:0}

/* ---- CONTEXT CARDS ---- */
.context-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin:2rem 0}
.ctx-card{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:1.5rem}
.ctx-card h4{font-size:1rem;margin-bottom:.6rem;color:#fff}
.ctx-card p{font-size:.85rem;color:rgba(255,255,255,.55);margin-bottom:.5rem}
.ctx-tag{display:inline-block;font-size:.6rem;padding:.2rem .5rem;border-radius:100px;font-weight:700;background:rgba(212,121,14,.15);color:var(--accent)}

/* ---- FOOTER ---- */
.footer{background:var(--dark);color:rgba(255,255,255,.4);padding:3rem 2rem;text-align:center;font-size:.78rem}
.footer strong{color:rgba(255,255,255,.7)}

/* ---- DIVIDER ---- */
.divider{width:50px;height:2px;background:var(--teal);margin:3rem auto;border-radius:2px;opacity:.5}

@media(max-width:640px){
.hero{padding:4.5rem 1.5rem 4rem}
.metrics{grid-template-columns:1fr 1fr}
.persona-grid{grid-template-columns:1fr}
.comparison,.context-grid{grid-template-columns:1fr}
.hero-meta{flex-direction:column;align-items:center;gap:.6rem}
.circle-step{padding-left:2rem;margin-left:.5rem}
.step-letter{left:-.5rem;width:1.8rem;height:1.8rem;font-size:.85rem}
}

      ` }} />
      

{/* ===== TOC ===== */}
<nav className="toc" aria-label="Sections">
<a href="#snapshot" title="Snapshot"></a>
<a href="#context" title="Context"></a>
<a href="#problem" title="Problem"></a>
<a href="#circles" title="CIRCLES"></a>
<a href="#wireframes" title="Wireframes"></a>
<a href="#prd" title="PRD"></a>
<a href="#metrics" title="Metrics"></a>
</nav>

{/* ===== HERO ===== */}
<section className="hero">
<div className="container">
<span className="hero-badge">&#9670; Product Case Study</span>
<h1>Breaking the <em>B1 Wall</em></h1>
<p className="hero-sub">52 million daily users. $1 billion in revenue. A learning ceiling nobody&rsquo;s fixing. A product strategy to change&nbsp;that.</p>
<div className="hero-meta">
<span>Duolingo &middot; NASDAQ: DUOL</span>
<span>CIRCLES Framework + PRD</span>
<span>CJ &middot; March 2026</span>
</div>
<div className="hero-divider"></div>
</div>
</section>

{/* ===== COMPANY SNAPSHOT ===== */}
<section className="section" id="snapshot">
<div className="container">
<span className="section-label">Company Snapshot</span>
<h2 className="section-title">Duolingo at an Inflection Point</h2>
<p className="lead">Duolingo is the world&rsquo;s most downloaded education app&mdash;500M+ installs, a brand so iconic it staged its mascot&rsquo;s death as a marketing stunt, and a company that crossed $1 billion in annual revenue for the first time in 2025. But beneath the record numbers, a structural product crisis is emerging.</p>

<div className="metrics">
<div className="metric-card">
<div className="metric-val accent">$1.04B</div>
<div className="metric-label">FY 2025 Revenue</div>
<div className="metric-src">SEC 10-K, ~39% YoY</div>
</div>
<div className="metric-card">
<div className="metric-val">52.7M</div>
<div className="metric-label">Daily Active Users</div>
<div className="metric-src">Q4 2025, +30% YoY</div>
</div>
<div className="metric-card">
<div className="metric-val teal">12.2M</div>
<div className="metric-label">Paid Subscribers</div>
<div className="metric-src">Q4 2025, ~9% penetration</div>
</div>
<div className="metric-card">
<div className="metric-val">4.7&#9733;</div>
<div className="metric-label">Google Play Rating</div>
<div className="metric-src">41.4M reviews</div>
</div>
<div className="metric-card">
<div className="metric-val red">&minus;82%</div>
<div className="metric-label">Stock from ATH</div>
<div className="metric-src">$545 peak &rarr; ~$95 (Mar &rsquo;26)</div>
</div>
<div className="metric-card">
<div className="metric-val">~133M</div>
<div className="metric-label">Monthly Active Users</div>
<div className="metric-src">Q4 &rsquo;25, &darr; from 135M in Q3</div>
</div>
</div>

{/* DAU Growth Chart */}
<div className="viz-wrap">
<div className="viz-header">
<h4>DAU Growth Is Decelerating</h4>
<p>Quarterly DAUs (millions) &mdash; growth rate slowing from +65% to +30% YoY</p>
</div>
<div className="viz-body">
<svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg">
{/* Grid lines */}
<line x1="60" y1="30" x2="660" y2="30" stroke="#E8E3D9" strokeWidth=".5"/>
<line x1="60" y1="80" x2="660" y2="80" stroke="#E8E3D9" strokeWidth=".5"/>
<line x1="60" y1="130" x2="660" y2="130" stroke="#E8E3D9" strokeWidth=".5"/>
<line x1="60" y1="180" x2="660" y2="180" stroke="#E8E3D9" strokeWidth=".5"/>
<line x1="60" y1="220" x2="660" y2="220" stroke="#D6CFC3" strokeWidth="1"/>
{/* Y-axis labels */}
<text x="50" y="34" fill="#6B7A8D" fontFamily="Instrument Sans" fontSize="10" textAnchor="end">55M</text>
<text x="50" y="84" fill="#6B7A8D" fontFamily="Instrument Sans" fontSize="10" textAnchor="end">40M</text>
<text x="50" y="134" fill="#6B7A8D" fontFamily="Instrument Sans" fontSize="10" textAnchor="end">30M</text>
<text x="50" y="184" fill="#6B7A8D" fontFamily="Instrument Sans" fontSize="10" textAnchor="end">20M</text>
{/* Bars: Q4'22=16.3, Q1'23=20.3, Q2'23=21.4, Q3'23=22.5, Q4'23=26.9, Q1'24=31.4, Q2'24=34.1, Q3'24=37.2, Q4'24=40.5, Q1'25=46.6, Q2'25=47.7, Q3'25=50.5, Q4'25=52.7 */}
{/* Scale: 55M = y30, 0M = y220. So 1M = (220-30)/55 = 3.45px. y = 220 - (val * 3.45) */}
<rect x="75" y="164" width="32" height="56" rx="3" fill="#D6CFC3"/>{/* Q4'22 16.3 */}
<rect x="120" y="150" width="32" height="70" rx="3" fill="#D6CFC3"/>{/* Q1'23 20.3 */}
<rect x="165" y="146" width="32" height="74" rx="3" fill="#D6CFC3"/>{/* Q2'23 21.4 */}
<rect x="210" y="142" width="32" height="78" rx="3" fill="#D6CFC3"/>{/* Q3'23 22.5 */}
<rect x="255" y="127" width="32" height="93" rx="3" fill="#D6CFC3"/>{/* Q4'23 26.9 */}
<rect x="300" y="112" width="32" height="108" rx="3" fill="#1A6B5A" opacity=".3"/>{/* Q1'24 31.4 */}
<rect x="345" y="103" width="32" height="117" rx="3" fill="#1A6B5A" opacity=".4"/>{/* Q2'24 34.1 */}
<rect x="390" y="92" width="32" height="128" rx="3" fill="#1A6B5A" opacity=".5"/>{/* Q3'24 37.2 */}
<rect x="435" y="81" width="32" height="139" rx="3" fill="#1A6B5A" opacity=".65"/>{/* Q4'24 40.5 */}
<rect x="480" y="60" width="32" height="160" rx="3" fill="#1A6B5A" opacity=".75"/>{/* Q1'25 46.6 */}
<rect x="525" y="56" width="32" height="164" rx="3" fill="#1A6B5A" opacity=".8"/>{/* Q2'25 47.7 */}
<rect x="570" y="46" width="32" height="174" rx="3" fill="#1A6B5A" opacity=".9"/>{/* Q3'25 50.5 */}
<rect x="615" y="38" width="32" height="182" rx="3" fill="#D4790E"/>{/* Q4'25 52.7 */}
{/* Labels */}
<text x="91" y="238" fill="#6B7A8D" fontFamily="Instrument Sans" fontSize="8" textAnchor="middle">Q4'22</text>
<text x="271" y="238" fill="#6B7A8D" fontFamily="Instrument Sans" fontSize="8" textAnchor="middle">Q4'23</text>
<text x="451" y="238" fill="#6B7A8D" fontFamily="Instrument Sans" fontSize="8" textAnchor="middle">Q4'24</text>
<text x="631" y="238" fill="#D4790E" fontFamily="Instrument Sans" fontSize="8" textAnchor="middle" fontWeight="700">Q4'25</text>
{/* Growth rate annotations */}
<text x="271" y="120" fill="#6B7A8D" fontFamily="Instrument Sans" fontSize="9" textAnchor="middle">+65% YoY</text>
<text x="451" y="73" fill="#6B7A8D" fontFamily="Instrument Sans" fontSize="9" textAnchor="middle">+51% YoY</text>
<text x="631" y="30" fill="#D4790E" fontFamily="Instrument Sans" fontSize="9" textAnchor="middle" fontWeight="600">+30% YoY</text>
</svg>
</div>
</div>

<p>Revenue is record-breaking. Growth is decelerating. The stock cratered from a May 2025 all-time high of $545 to ~$95 in March 2026&mdash;an 82% decline. CEO Luis von Ahn acknowledged on the Q4 2025 earnings call that the company &ldquo;increased monetization by adding friction to the free experience&rdquo; and pledged $50M in foregone bookings to reverse course. 2026 guidance of just 15&ndash;18% revenue growth stunned Wall Street.</p>
<p>But the deepest problem isn&rsquo;t monetization mechanics. It&rsquo;s that <strong>Duolingo has a learning ceiling</strong>&mdash;and the company&rsquo;s own engagement metrics mask it.</p>
</div>
</section>

{/* ===== CONTEXT ===== */}
<section className="section-dark section" id="context">
<div className="container">
<span className="section-label">Context</span>
<h2 className="section-title" style={{"color":"#fff"}}>Three Crises, One Root Cause</h2>
<p>Duolingo entered 2026 facing three simultaneous product crises. While the Energy system and AI-first backlash dominate headlines, this case study focuses on the third and most fundamental issue&mdash;the one that makes the other two worse.</p>

<div className="context-grid">
<div className="ctx-card">
<span className="ctx-tag">Monetization</span>
<h4>The Energy System Revolt</h4>
<p>Spring 2025: Hearts replaced by Energy. Every exercise costs energy&mdash;even perfect answers. Free users limited to ~3 lessons/day. Reddit post &ldquo;So now we&rsquo;re punished for using the app?&rdquo; hit 4,700+ upvotes. Users with multi-year streaks quit in protest. CEO later acknowledged the company &ldquo;increased monetization by adding friction to the free experience.&rdquo;</p>
</div>
<div className="ctx-card">
<span className="ctx-tag">Brand</span>
<h4>The AI-First Backlash</h4>
<p>April 2025: CEO memo declares Duolingo &ldquo;AI-first,&rdquo; contractors phased out. ~10% of contractors cut in late 2023/early 2024, writers in Oct 2024. TikTok and Instagram flooded with boycott content. Duolingo deleted all posts from both platforms, losing 400K+ TikTok followers. Content quality complaints surged for non-Romance languages.</p>
</div>
</div>

<div className="ctx-card" style={{"marginTop":"1.25rem"}}>
<span className="ctx-tag" style={{"background":"rgba(26,107,90,.2)","color":"#4ECCA3"}}>Root Cause &mdash; This Case Study</span>
<h4>The Intermediate Plateau</h4>
<p>The structural product weakness neither controversy addresses: <strong style={{"color":"#fff"}}>after months or years of daily use, users cannot hold a conversation.</strong> The app&rsquo;s recognition-based drills (translate, select, match) never develop production skills (speak spontaneously, write originally, comprehend native-speed audio). This is the churn driver that makes monetization pressure necessary and brand erosion inevitable. Fix the learning ceiling, and the business model pressure eases.</p>
</div>
</div>
</section>

{/* ===== THE PROBLEM ===== */}
<section className="section section-alt" id="problem">
<div className="container">
<span className="section-label">The Problem</span>
<h2 className="section-title">The Intermediate Plateau</h2>

<p className="lead">After two years of daily Duolingo use, millions of learners share the same confession: &ldquo;I can&rsquo;t hold a conversation.&rdquo;</p>

<p>This is the <strong>B1 Wall</strong>&mdash;the point where Duolingo&rsquo;s drill-based pedagogy hits a structural ceiling. Users know vocabulary. They can translate sentences. But they cannot produce spontaneous speech, understand native speakers at natural speed, or compose original text. The app&rsquo;s exercises are almost entirely <em>recognition-based</em> rather than <em>production-based</em>.</p>

<blockquote>
&ldquo;Not a learning program, just a completion program. After two years on Duolingo, I can&rsquo;t speak any languages&mdash;of course I know some vocabulary but that&rsquo;s it.&rdquo;
<cite>&mdash; Trustpilot review, 2025</cite>
</blockquote>

<p><strong>Academic evidence.</strong> The most cited independent study (Jiang et al., 2021, <em>Foreign Language Annals</em>) assessed learners who completed the full beginner content using Duolingo as their only tool. Results: Intermediate Low in reading, Novice High in listening&mdash;and critically, <strong>no speaking or writing was assessed at all</strong>. A 2022 ACM study on gamification misuse found widespread patterns of users optimizing for XP and streaks instead of actual learning. Only three courses (English, Spanish, French) extend to approximately B2; most cap at A2&ndash;B1.</p>

<div className="comparison">
<div className="comp-card before">
<h4><span style={{"color":"var(--red)"}}>&#9679;</span> What Duolingo Drills</h4>
<ul>
<li>Multiple-choice translation</li>
<li>Word-bank sentence assembly</li>
<li>Read-aloud speaking (not spontaneous)</li>
<li>Matching pairs / fill-in-the-blank</li>
<li>Isolated, decontextualized sentences</li>
</ul>
</div>
<div className="comp-card after">
<h4><span style={{"color":"var(--green)"}}>&#9679;</span> What Fluency Requires</h4>
<ul>
<li>Spontaneous speech production</li>
<li>Comprehension of native-speed audio</li>
<li>Original composition and writing</li>
<li>Contextual conversation navigation</li>
<li>Cultural nuance and pragmatics</li>
</ul>
</div>
</div>

{/* Competitive Landscape */}
<div className="viz-wrap">
<div className="viz-header">
<h4>Competitive Landscape: Where Duolingo Loses Users</h4>
<p>Competitors exploit Duolingo&rsquo;s intermediate gap from two directions</p>
</div>
<div className="viz-body">
<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg">
{/* Axes */}
<line x1="80" y1="280" x2="660" y2="280" stroke="#D6CFC3" strokeWidth="1"/>
<line x1="80" y1="40" x2="80" y2="280" stroke="#D6CFC3" strokeWidth="1"/>
<text x="370" y="310" fill="#6B7A8D" fontFamily="Instrument Sans" fontSize="10" textAnchor="middle" fontWeight="600">PROFICIENCY CEILING &rarr;</text>
<text x="30" y="160" fill="#6B7A8D" fontFamily="Instrument Sans" fontSize="10" textAnchor="middle" fontWeight="600" transform="rotate(-90 30 160)">PRODUCTION FOCUS &rarr;</text>
{/* Axis labels */}
<text x="110" y="296" fill="#6B7A8D" fontFamily="Instrument Sans" fontSize="8">A1</text>
<text x="250" y="296" fill="#6B7A8D" fontFamily="Instrument Sans" fontSize="8">A2</text>
<text x="390" y="296" fill="#6B7A8D" fontFamily="Instrument Sans" fontSize="8">B1</text>
<text x="530" y="296" fill="#6B7A8D" fontFamily="Instrument Sans" fontSize="8">B2</text>
<text x="640" y="296" fill="#6B7A8D" fontFamily="Instrument Sans" fontSize="8">C1</text>
{/* Duolingo */}
<circle cx="280" cy="220" r="38" fill="#D4790E" opacity=".12" stroke="#D4790E" strokeWidth="2"/>
<text x="280" y="216" fill="#D4790E" fontFamily="Instrument Sans" fontSize="11" textAnchor="middle" fontWeight="700">Duolingo</text>
<text x="280" y="230" fill="#D4790E" fontFamily="Instrument Sans" fontSize="8" textAnchor="middle">52.7M DAU</text>
{/* Babbel */}
<circle cx="460" cy="170" r="22" fill="#1A6B5A" opacity=".1" stroke="#1A6B5A" strokeWidth="1.5"/>
<text x="460" y="168" fill="#1A6B5A" fontFamily="Instrument Sans" fontSize="10" textAnchor="middle" fontWeight="600">Babbel</text>
<text x="460" y="180" fill="#1A6B5A" fontFamily="Instrument Sans" fontSize="7" textAnchor="middle">Grammar + Structure</text>
{/* Busuu */}
<circle cx="420" cy="110" r="20" fill="#2563EB" opacity=".1" stroke="#2563EB" strokeWidth="1.5"/>
<text x="420" y="108" fill="#2563EB" fontFamily="Instrument Sans" fontSize="10" textAnchor="middle" fontWeight="600">Busuu</text>
<text x="420" y="120" fill="#2563EB" fontFamily="Instrument Sans" fontSize="7" textAnchor="middle">Peer Corrections</text>
{/* Speak */}
<circle cx="340" cy="80" r="18" fill="#7C3AED" opacity=".1" stroke="#7C3AED" strokeWidth="1.5"/>
<text x="340" y="78" fill="#7C3AED" fontFamily="Instrument Sans" fontSize="10" textAnchor="middle" fontWeight="600">Speak</text>
<text x="340" y="90" fill="#7C3AED" fontFamily="Instrument Sans" fontSize="7" textAnchor="middle">AI Conversation</text>
{/* LingQ */}
<circle cx="570" cy="130" r="20" fill="#6B7A8D" opacity=".1" stroke="#6B7A8D" strokeWidth="1.5"/>
<text x="570" y="128" fill="#6B7A8D" fontFamily="Instrument Sans" fontSize="10" textAnchor="middle" fontWeight="600">LingQ</text>
<text x="570" y="140" fill="#6B7A8D" fontFamily="Instrument Sans" fontSize="7" textAnchor="middle">Immersive Content</text>
{/* italki */}
<circle cx="530" cy="70" r="18" fill="#C0392B" opacity=".1" stroke="#C0392B" strokeWidth="1.5"/>
<text x="530" y="68" fill="#C0392B" fontFamily="Instrument Sans" fontSize="10" textAnchor="middle" fontWeight="600">italki</text>
<text x="530" y="80" fill="#C0392B" fontFamily="Instrument Sans" fontSize="7" textAnchor="middle">Human Tutors</text>
{/* Breakthrough target zone */}
<rect x="300" y="100" width="200" height="140" rx="12" fill="none" stroke="#D4790E" strokeWidth="1.5" strokeDasharray="6 4"/>
<text x="400" y="255" fill="#D4790E" fontFamily="Instrument Sans" fontSize="9" textAnchor="middle" fontWeight="700" opacity=".7">&#8599; BREAKTHROUGH MODE TARGET ZONE</text>
</svg>
</div>
</div>

<p>This gap is the single greatest threat to long-term value. Plateaued users churn. Churning users don&rsquo;t convert to subscribers. And intermediate learners are <em>precisely</em> the audience most likely to pay&mdash;they&rsquo;re invested enough to value progress, but frustrated enough to explore alternatives.</p>

</div>
</section>

{/* ===== CIRCLES ===== */}
<section className="section" id="circles">
<div className="container">
<span className="section-label">Framework</span>
<h2 className="section-title">CIRCLES Analysis</h2>

<div className="circle-step"><span className="step-letter">C</span>
<h3>Comprehend the Situation</h3>
<p>Duolingo&rsquo;s mission is to &ldquo;develop the best education in the world and make it universally available.&rdquo; Its freemium model serves ~133M MAUs, of which ~12.2M pay ($84&ndash;$168/year). The 2026 strategic pivot explicitly prioritizes user growth over monetization, targeting 100M DAUs by 2028.</p>
<p>The product&rsquo;s core loop (short gamified lessons &rarr; streak maintenance &rarr; social competition) is optimized for <strong>retention</strong>, not <strong>proficiency</strong>. DAUs grew from 16.3M (Q4 2022) to 52.7M (Q4 2025)&mdash;extraordinary growth that masks a ceiling where engaged users hit a wall, realize they can&rsquo;t use the language, and explore alternatives.</p>
<p>Video Call with Lily addresses speaking but is locked behind Max ($168/year) and available for only seven language pairs. Meanwhile, Speak charges $20/month ($99/year) for unlimited AI conversation, and Busuu offers peer corrections with McGraw-Hill certification at a lower price than Duolingo Super.</p>
</div>

<div className="circle-step"><span className="step-letter">I</span>
<h3>Identify the Customer</h3>
<div className="persona-grid">
<div className="persona">
<div className="persona-type">Primary</div>
<h4>The Plateaued Learner</h4>
<p><strong>Profile:</strong> 6&ndash;24 months, 100&ndash;500+ day streak, completed 30&ndash;60 units.</p>
<p><strong>Pain:</strong> Passes drills easily but freezes in real conversations.</p>
<p><strong>Risk:</strong> Highest churn risk. Most likely to convert to paid <em>if</em> given a reason.</p>
</div>
<div className="persona">
<div className="persona-type">Secondary</div>
<h4>The Motivated Beginner</h4>
<p><strong>Profile:</strong> 1&ndash;6 months, approaching A2.</p>
<p><strong>Pain:</strong> Senses drills getting repetitive. Wants to &ldquo;actually use&rdquo; the language.</p>
<p><strong>Opportunity:</strong> Clear path to conversation = long-term retention.</p>
</div>
<div className="persona">
<div className="persona-type">Tertiary</div>
<h4>The Returnee</h4>
<p><strong>Profile:</strong> Lapsed 3&ndash;12 months, prior 100+ day streak.</p>
<p><strong>Pain:</strong> Left because progress stalled.</p>
<p><strong>Opportunity:</strong> Re-engagement target for DAU growth.</p>
</div>
</div>
</div>

<div className="circle-step"><span className="step-letter">R</span>
<h3>Report Customer Needs</h3>
<p>Through analysis of user reviews (PissedConsumer: 2.2&#9733; avg across ~3,900 reviews; Trustpilot: mixed sentiment), Reddit community sentiment, academic research, and competitive user flows, four core needs emerge:</p>
<p><strong>1. Production over recognition.</strong> Exercises that require users to <em>generate</em> language, not merely recognize it.</p>
<p><strong>2. Authentic input.</strong> Native-speed speech and real-world text instead of TTS-generated textbook sentences.</p>
<p><strong>3. Contextual practice.</strong> Realistic scenarios where pragmatic choices matter, not isolated sentences.</p>
<p><strong>4. Visible proficiency progress.</strong> A clear signal of actual improvement&mdash;not just XP accumulation.</p>
</div>

<div className="circle-step"><span className="step-letter">C</span>
<h3>Cut Through Prioritization</h3>
<table className="rice-table">
<thead><tr><th>Solution</th><th>Reach</th><th>Impact</th><th>Confidence</th><th>Effort</th><th>Score</th></tr></thead>
<tbody>
<tr><td><strong>Breakthrough Mode</strong><br /><span style={{"fontSize":".72rem","color":"var(--muted)"}}>Production-first learning for A2+ users</span></td><td>9</td><td>9</td><td>8</td><td>7</td><td className="rice-score top">9.3</td></tr>
<tr><td><strong>Story Conversations</strong><br /><span style={{"fontSize":".72rem","color":"var(--muted)"}}>Branching dialogues with typed/spoken input</span></td><td>7</td><td>8</td><td>7</td><td>6</td><td className="rice-score">6.5</td></tr>
<tr><td><strong>Peer Writing Exchange</strong><br /><span style={{"fontSize":".72rem","color":"var(--muted)"}}>Community corrections (Busuu-style)</span></td><td>5</td><td>7</td><td>6</td><td>5</td><td className="rice-score">4.2</td></tr>
<tr><td><strong>Authentic Content Feed</strong><br /><span style={{"fontSize":".72rem","color":"var(--muted)"}}>Curated native media at user level</span></td><td>6</td><td>7</td><td>5</td><td>8</td><td className="rice-score">2.6</td></tr>
</tbody>
</table>
<p style={{"fontSize":".75rem","color":"var(--muted)"}}>RICE Score = (R &times; I &times; C) / E. Effort inverted: 10 = hardest.</p>
</div>

<div className="circle-step"><span className="step-letter">L</span>
<h3>List the Solution: Duolingo Breakthrough</h3>
<p><strong>Duolingo Breakthrough</strong> is a proficiency-gated learning mode that unlocks at approximately A2 level (~Unit 30). Three new exercise categories bridge the gap between drills and conversational fluency:</p>
<p><span className="pill pill-accent">Speak Free</span> Open-ended speaking prompts where users respond to a scenario in their own words. AI evaluates pronunciation, grammar, relevance, and complexity. No word bank. Example: &ldquo;Your friend invites you to dinner but you&rsquo;re busy. Explain why and suggest another time.&rdquo;</p>
<p><span className="pill pill-blue">Listen Real</span> Comprehension exercises using native-speed audio clips from DuoRadio and licensed content. Exercises progress from gist questions to detail to inference.</p>
<p><span className="pill pill-teal">Write Open</span> Guided composition prompts (2&ndash;5 sentences). AI provides grammar feedback, vocabulary range scoring, and naturalness assessment. Optional peer review layer.</p>
<p>Each category is embedded in the existing lesson path as <strong>Breakthrough Challenges</strong> every 3&ndash;5 regular lessons. Users earn &ldquo;Fluency XP&rdquo; (distinct from regular XP) that feeds into the Duolingo Score. Free tier: 2/day. Unlimited on Super. This aligns with the CEO&rsquo;s pledge to improve the free experience while driving conversion.</p>
</div>

<div className="circle-step"><span className="step-letter">E</span>
<h3>Evaluate Tradeoffs</h3>
<p><strong>Why not just expand Video Call with Lily?</strong> Video Call is locked behind Max ($168/year), available for 7 languages, and requires real-time voice processing (~$0.15&ndash;0.30/min). Breakthrough uses async exercises at ~$0.02&ndash;0.05/exercise that scale to all 42 languages. They&rsquo;re complementary, not competitive.</p>
<p><strong>Why free-tier access?</strong> CEO committed to improving the free experience for 100M DAU target. The 2/day limit creates a natural conversion prompt without degrading the experience.</p>
<p><strong>Risk: harder exercises cause engagement dip?</strong> Mitigation: Breakthrough Challenges are interspersed (not replacing) regular lessons, use adaptive difficulty, and earn premium XP. The &ldquo;I&rsquo;m not ready&rdquo; fallback downgrades to a scaffolded version.</p>
</div>

<div className="circle-step"><span className="step-letter">S</span>
<h3>Summarize</h3>
<p>Launch <strong>Duolingo Breakthrough</strong> as a proficiency-gated mode integrated into the lesson path, introducing production-first exercises for A2+ users. 2 free/day, unlimited on Super. Roll out for Spanish &amp; French first, expanding based on AI evaluation quality benchmarks. This addresses Duolingo&rsquo;s deepest product weakness, aligns with the 2026 strategic pivot, and creates a subscriber conversion lever competitors cannot replicate at Duolingo&rsquo;s 52.7M DAU scale.</p>
</div>
</div>
</section>

{/* ===== WIREFRAMES ===== */}
<section className="section section-alt" id="wireframes">
<div className="container">
<span className="section-label">Wireframes</span>
<h2 className="section-title">Product Design</h2>
<p>Three screens designed to feel native to Duolingo&rsquo;s existing UI&mdash;matching their color system (#58CC02 green, #1CB0F6 blue, #FF4B4B red), 3D raised button style, DIN Rounded typography, and playful card-based layout.</p>

{/* WIREFRAME 1: Unlock */}
<div className="wireframe-wrap">
<div className="wireframe-header">
<div className="wf-dot active"></div><div className="wf-dot"></div><div className="wf-dot"></div>
<span className="wireframe-title">Screen 1 &mdash; Breakthrough Mode Unlock</span>
</div>
<div className="wireframe-body" style={{"background":"#F7F7F7"}}>
<svg viewBox="0 0 375 812" xmlns="http://www.w3.org/2000/svg" style={{"maxWidth":"300px"}}>
{/* Phone */}
<rect width="375" height="812" rx="40" fill="#FFFFFF"/>
<rect width="375" height="812" rx="40" fill="none" stroke="#E5E5E5" strokeWidth="1"/>
{/* Status bar */}
<text x="32" y="22" fill="#4B4B4B" fontFamily="Nunito,system-ui" fontSize="14" fontWeight="700">9:41</text>
<circle cx="330" cy="17" r="5" fill="none" stroke="#4B4B4B" strokeWidth="1.5"/>
<rect x="340" y="12" width="18" height="10" rx="2" fill="none" stroke="#4B4B4B" strokeWidth="1.5"/>
{/* Top bar */}
<rect x="0" y="38" width="375" height="56" fill="#FFFFFF"/>
<line x1="0" y1="94" x2="375" y2="94" stroke="#E5E5E5" strokeWidth="1"/>
<text x="24" y="73" fill="#AFAFAF" fontFamily="Nunito,system-ui" fontSize="22">&larr;</text>
<text x="56" y="73" fill="#4B4B4B" fontFamily="Nunito,system-ui" fontSize="17" fontWeight="800">Spanish</text>
{/* Confetti burst decoration */}
<circle cx="120" cy="200" r="4" fill="#FFC800" opacity=".6"/>
<circle cx="255" cy="180" r="3" fill="#FF9600" opacity=".5"/>
<circle cx="140" cy="160" r="3" fill="#CE82FF" opacity=".5"/>
<circle cx="240" cy="230" r="4" fill="#1CB0F6" opacity=".5"/>
<circle cx="100" cy="240" r="3" fill="#58CC02" opacity=".5"/>
<circle cx="275" cy="170" r="3" fill="#FF4B4B" opacity=".4"/>
{/* Trophy + A2 badge */}
<circle cx="187" cy="210" r="56" fill="#FFF3D6"/>
<text x="187" y="205" fill="#FFC800" fontSize="48" textAnchor="middle">&#127942;</text>
<rect x="142" y="250" width="90" height="28" rx="14" fill="#FFC800"/>
<text x="187" y="270" fill="#FFFFFF" fontFamily="Nunito,system-ui" fontSize="13" textAnchor="middle" fontWeight="800">A2 REACHED!</text>
{/* Main heading */}
<text x="187" y="320" fill="#4B4B4B" fontFamily="Nunito,system-ui" fontSize="24" textAnchor="middle" fontWeight="800">Breakthrough Mode</text>
<text x="187" y="345" fill="#4B4B4B" fontFamily="Nunito,system-ui" fontSize="24" textAnchor="middle" fontWeight="800">Unlocked!</text>
{/* Subtitle */}
<text x="187" y="380" fill="#AFAFAF" fontFamily="Nunito,system-ui" fontSize="14" textAnchor="middle">Time to actually use your Spanish</text>
<text x="187" y="398" fill="#AFAFAF" fontFamily="Nunito,system-ui" fontSize="14" textAnchor="middle">in the real world.</text>
{/* Feature card 1: Speak Free */}
<rect x="24" y="424" width="327" height="68" rx="14" fill="#FFFFFF" stroke="#E5E5E5" strokeWidth="1.5"/>
<rect x="24" y="488" width="327" height="4" rx="2" fill="#E5E5E5"/>
<circle cx="62" cy="458" r="22" fill="#FFF1E0"/>
<text x="62" y="464" fill="#FF9600" fontSize="20" textAnchor="middle">&#127908;</text>
<text x="96" y="450" fill="#4B4B4B" fontFamily="Nunito,system-ui" fontSize="15" fontWeight="800">Speak Free</text>
<text x="96" y="470" fill="#AFAFAF" fontFamily="Nunito,system-ui" fontSize="12" fontWeight="600">Answer in your own words</text>
{/* Feature card 2: Listen Real */}
<rect x="24" y="504" width="327" height="68" rx="14" fill="#FFFFFF" stroke="#E5E5E5" strokeWidth="1.5"/>
<rect x="24" y="568" width="327" height="4" rx="2" fill="#E5E5E5"/>
<circle cx="62" cy="538" r="22" fill="#E5F5FF"/>
<text x="62" y="544" fill="#1CB0F6" fontSize="20" textAnchor="middle">&#127911;</text>
<text x="96" y="530" fill="#4B4B4B" fontFamily="Nunito,system-ui" fontSize="15" fontWeight="800">Listen Real</text>
<text x="96" y="550" fill="#AFAFAF" fontFamily="Nunito,system-ui" fontSize="12" fontWeight="600">Native-speed comprehension</text>
{/* Feature card 3: Write Open */}
<rect x="24" y="584" width="327" height="68" rx="14" fill="#FFFFFF" stroke="#E5E5E5" strokeWidth="1.5"/>
<rect x="24" y="648" width="327" height="4" rx="2" fill="#E5E5E5"/>
<circle cx="62" cy="618" r="22" fill="#F0E5FF"/>
<text x="62" y="624" fill="#CE82FF" fontSize="20" textAnchor="middle">&#9997;&#65039;</text>
<text x="96" y="610" fill="#4B4B4B" fontFamily="Nunito,system-ui" fontSize="15" fontWeight="800">Write Open</text>
<text x="96" y="630" fill="#AFAFAF" fontFamily="Nunito,system-ui" fontSize="12" fontWeight="600">Compose original responses</text>
{/* CTA: 3D raised green button */}
<rect x="24" y="680" width="327" height="54" rx="16" fill="#43C000"/>
<rect x="24" y="676" width="327" height="50" rx="16" fill="#58CC02"/>
<text x="187" y="707" fill="#FFFFFF" fontFamily="Nunito,system-ui" fontSize="16" textAnchor="middle" fontWeight="800">START BREAKTHROUGH</text>
{/* Bottom nav */}
<rect x="0" y="752" width="375" height="60" rx="0" fill="#FFFFFF"/>
<line x1="0" y1="752" x2="375" y2="752" stroke="#E5E5E5" strokeWidth="1"/>
<circle cx="68" cy="778" r="14" fill="#58CC02" opacity=".1"/>
<text x="68" y="784" fill="#58CC02" fontSize="16" textAnchor="middle">&#127968;</text>
<text x="187" y="784" fill="#AFAFAF" fontSize="16" textAnchor="middle">&#128170;</text>
<text x="306" y="784" fill="#AFAFAF" fontSize="16" textAnchor="middle">&#128100;</text>
</svg>
</div>
</div>

{/* WIREFRAME 2: Speak Free Exercise */}
<div className="wireframe-wrap">
<div className="wireframe-header">
<div className="wf-dot"></div><div className="wf-dot active"></div><div className="wf-dot"></div>
<span className="wireframe-title">Screen 2 &mdash; Speak Free Exercise</span>
</div>
<div className="wireframe-body" style={{"background":"#F7F7F7"}}>
<svg viewBox="0 0 375 812" xmlns="http://www.w3.org/2000/svg" style={{"maxWidth":"300px"}}>
<rect width="375" height="812" rx="40" fill="#FFFFFF"/>
<rect width="375" height="812" rx="40" fill="none" stroke="#E5E5E5" strokeWidth="1"/>
{/* Status bar */}
<text x="32" y="22" fill="#4B4B4B" fontFamily="Nunito,system-ui" fontSize="14" fontWeight="700">9:41</text>
{/* Top: close + progress bar */}
<text x="24" y="60" fill="#AFAFAF" fontFamily="Nunito,system-ui" fontSize="26" fontWeight="700">&times;</text>
{/* Progress bar */}
<rect x="56" y="48" width="260" height="16" rx="8" fill="#E5E5E5"/>
<rect x="56" y="48" width="156" height="16" rx="8" fill="#58CC02"/>
{/* Energy icon */}
<rect x="326" y="44" width="30" height="24" rx="8" fill="#FF4B4B" opacity=".1"/>
<text x="341" y="62" fill="#FF4B4B" fontFamily="Nunito,system-ui" fontSize="13" textAnchor="middle" fontWeight="800">&#9889;</text>
{/* Breakthrough badge */}
<rect x="24" y="82" width="120" height="28" rx="14" fill="#FFF1E0"/>
<text x="84" y="101" fill="#FF9600" fontFamily="Nunito,system-ui" fontSize="11" textAnchor="middle" fontWeight="800">&#127942; BREAKTHROUGH</text>
{/* Exercise title */}
<text x="24" y="145" fill="#4B4B4B" fontFamily="Nunito,system-ui" fontSize="22" fontWeight="800">Respond in Spanish:</text>
{/* Scenario card */}
<rect x="24" y="164" width="327" height="100" rx="16" fill="#F7F7F7" stroke="#E5E5E5" strokeWidth="1.5"/>
<text x="42" y="194" fill="#4B4B4B" fontFamily="Nunito,system-ui" fontSize="15" fontWeight="600">Your coworker asks what you</text>
<text x="42" y="216" fill="#4B4B4B" fontFamily="Nunito,system-ui" fontSize="15" fontWeight="600">did last weekend. Tell them</text>
<text x="42" y="238" fill="#4B4B4B" fontFamily="Nunito,system-ui" fontSize="15" fontWeight="600">about a trip you enjoyed.</text>
{/* Hint link */}
<text x="24" y="296" fill="#1CB0F6" fontFamily="Nunito,system-ui" fontSize="14" fontWeight="700">&#128161; Show vocabulary hints</text>
{/* Mic recording area */}
<rect x="36" y="326" width="303" height="240" rx="20" fill="#F7F7F7" stroke="#E5E5E5" strokeWidth="1.5" strokeDasharray="8 5"/>
<text x="187" y="370" fill="#AFAFAF" fontFamily="Nunito,system-ui" fontSize="14" textAnchor="middle" fontWeight="600">Tap to start recording</text>
{/* Waveform */}
<rect x="88" y="400" width="4" height="28" rx="2" fill="#FF9600" opacity=".3"/>
<rect x="100" y="392" width="4" height="44" rx="2" fill="#FF9600" opacity=".4"/>
<rect x="112" y="396" width="4" height="36" rx="2" fill="#FF9600" opacity=".5"/>
<rect x="124" y="386" width="4" height="56" rx="2" fill="#FF9600" opacity=".6"/>
<rect x="136" y="380" width="4" height="68" rx="2" fill="#FF9600" opacity=".8"/>
<rect x="148" y="386" width="4" height="56" rx="2" fill="#FF9600" opacity=".7"/>
<rect x="160" y="392" width="4" height="44" rx="2" fill="#FF9600" opacity=".6"/>
<rect x="172" y="380" width="4" height="68" rx="2" fill="#FF9600"/>
<rect x="184" y="386" width="4" height="56" rx="2" fill="#FF9600" opacity=".7"/>
<rect x="196" y="392" width="4" height="44" rx="2" fill="#FF9600" opacity=".6"/>
<rect x="208" y="388" width="4" height="52" rx="2" fill="#FF9600" opacity=".5"/>
<rect x="220" y="396" width="4" height="36" rx="2" fill="#FF9600" opacity=".4"/>
<rect x="232" y="392" width="4" height="44" rx="2" fill="#FF9600" opacity=".5"/>
<rect x="244" y="388" width="4" height="52" rx="2" fill="#FF9600" opacity=".6"/>
<rect x="256" y="394" width="4" height="40" rx="2" fill="#FF9600" opacity=".4"/>
<rect x="268" y="400" width="4" height="28" rx="2" fill="#FF9600" opacity=".3"/>
<rect x="280" y="404" width="4" height="20" rx="2" fill="#FF9600" opacity=".2"/>
{/* Record button */}
<circle cx="187" cy="510" r="34" fill="#FF9600"/>
<circle cx="187" cy="510" r="32" fill="#FF9600"/>
<rect x="176" y="498" width="22" height="24" rx="8" fill="#FFFFFF"/>
<text x="187" y="560" fill="#AFAFAF" fontFamily="Nunito,system-ui" fontSize="12" textAnchor="middle" fontWeight="600">Speak for 15&ndash;45 seconds. No word bank.</text>
{/* Fallback button */}
<rect x="50" y="590" width="275" height="46" rx="14" fill="none" stroke="#E5E5E5" strokeWidth="2"/>
<text x="187" y="619" fill="#AFAFAF" fontFamily="Nunito,system-ui" fontSize="13" textAnchor="middle" fontWeight="700">I&apos;m not ready &mdash; try easier version</text>
{/* Fluency XP badge */}
<rect x="115" y="656" width="145" height="32" rx="16" fill="#FFF1E0"/>
<text x="187" y="678" fill="#FF9600" fontFamily="Nunito,system-ui" fontSize="13" textAnchor="middle" fontWeight="800">+15 Fluency XP &#11088;</text>
{/* Bottom nav */}
<rect x="0" y="752" width="375" height="60" rx="0" fill="#FFFFFF"/>
<line x1="0" y1="752" x2="375" y2="752" stroke="#E5E5E5" strokeWidth="1"/>
<text x="68" y="784" fill="#AFAFAF" fontSize="16" textAnchor="middle">&#127968;</text>
<text x="187" y="784" fill="#AFAFAF" fontSize="16" textAnchor="middle">&#128170;</text>
<text x="306" y="784" fill="#AFAFAF" fontSize="16" textAnchor="middle">&#128100;</text>
</svg>
</div>
</div>

{/* WIREFRAME 3: AI Feedback */}
<div className="wireframe-wrap">
<div className="wireframe-header">
<div className="wf-dot"></div><div className="wf-dot"></div><div className="wf-dot active"></div>
<span className="wireframe-title">Screen 3 &mdash; AI Feedback</span>
</div>
<div className="wireframe-body" style={{"background":"#F7F7F7"}}>
<svg viewBox="0 0 375 812" xmlns="http://www.w3.org/2000/svg" style={{"maxWidth":"300px"}}>
<rect width="375" height="812" rx="40" fill="#FFFFFF"/>
<rect width="375" height="812" rx="40" fill="none" stroke="#E5E5E5" strokeWidth="1"/>
{/* Status bar */}
<text x="32" y="22" fill="#4B4B4B" fontFamily="Nunito,system-ui" fontSize="14" fontWeight="700">9:41</text>
{/* Green success banner */}
<rect x="0" y="38" width="375" height="72" fill="#D7FFB8"/>
<text x="187" y="68" fill="#58CC02" fontFamily="Nunito,system-ui" fontSize="14" textAnchor="middle" fontWeight="800">GREAT EFFORT!</text>
<text x="187" y="92" fill="#58CC02" fontFamily="Nunito,system-ui" fontSize="22" textAnchor="middle" fontWeight="800">&#127881; +15 Fluency XP</text>
{/* Performance breakdown */}
<rect x="24" y="128" width="327" height="130" rx="16" fill="#FFFFFF" stroke="#E5E5E5" strokeWidth="1.5"/>
<text x="42" y="155" fill="#4B4B4B" fontFamily="Nunito,system-ui" fontSize="14" fontWeight="800">YOUR PERFORMANCE</text>
{/* Pronunciation bar */}
<text x="42" y="182" fill="#AFAFAF" fontFamily="Nunito,system-ui" fontSize="12" fontWeight="700">Pronunciation</text>
<rect x="160" y="172" width="172" height="12" rx="6" fill="#E5E5E5"/>
<rect x="160" y="172" width="138" height="12" rx="6" fill="#58CC02"/>
{/* Grammar bar */}
<text x="42" y="210" fill="#AFAFAF" fontFamily="Nunito,system-ui" fontSize="12" fontWeight="700">Grammar</text>
<rect x="160" y="200" width="172" height="12" rx="6" fill="#E5E5E5"/>
<rect x="160" y="200" width="110" height="12" rx="6" fill="#FFC800"/>
{/* Relevance bar */}
<text x="42" y="238" fill="#AFAFAF" fontFamily="Nunito,system-ui" fontSize="12" fontWeight="700">Relevance</text>
<rect x="160" y="228" width="172" height="12" rx="6" fill="#E5E5E5"/>
<rect x="160" y="228" width="155" height="12" rx="6" fill="#1CB0F6"/>
{/* What you said */}
<text x="24" y="290" fill="#4B4B4B" fontFamily="Nunito,system-ui" fontSize="14" fontWeight="800">WHAT YOU SAID</text>
<rect x="24" y="300" width="327" height="72" rx="14" fill="#F7F7F7" stroke="#E5E5E5" strokeWidth="1"/>
<text x="42" y="328" fill="#4B4B4B" fontFamily="Nunito,system-ui" fontSize="14" fontStyle={{}}>&ldquo;El fin de semana pasado, yo fui</text>
<text x="42" y="350" fill="#4B4B4B" fontFamily="Nunito,system-ui" fontSize="14" fontStyle={{}}>a las monta&#241;as con mis amigos...&rdquo;</text>
{/* Feedback card */}
<text x="24" y="406" fill="#4B4B4B" fontFamily="Nunito,system-ui" fontSize="14" fontWeight="800">FEEDBACK</text>
<rect x="24" y="416" width="327" height="156" rx="14" fill="#FFF8E5" stroke="#FFC800" strokeWidth="1.5"/>
{/* Feedback items */}
<text x="42" y="444" fill="#58CC02" fontFamily="Nunito,system-ui" fontSize="13" fontWeight="800">&#10003;</text>
<text x="62" y="444" fill="#4B4B4B" fontFamily="Nunito,system-ui" fontSize="13" fontWeight="600">Nice use of preterite tense (fui).</text>
<text x="42" y="478" fill="#FFC800" fontFamily="Nunito,system-ui" fontSize="13" fontWeight="800">&#128161;</text>
<text x="62" y="478" fill="#4B4B4B" fontFamily="Nunito,system-ui" fontSize="13" fontWeight="600">Try &ldquo;fuimos&rdquo; instead of &ldquo;yo fui&rdquo;</text>
<text x="62" y="498" fill="#AFAFAF" fontFamily="Nunito,system-ui" fontSize="12" fontWeight="600">since you went with friends.</text>
<text x="42" y="530" fill="#CE82FF" fontFamily="Nunito,system-ui" fontSize="13" fontWeight="800">&#11088;</text>
<text x="62" y="530" fill="#4B4B4B" fontFamily="Nunito,system-ui" fontSize="13" fontWeight="600">Add emotion: &ldquo;me encant&#243;&rdquo;</text>
<text x="62" y="550" fill="#AFAFAF" fontFamily="Nunito,system-ui" fontSize="12" fontWeight="600">or &ldquo;fue incre&#237;ble&rdquo;</text>
{/* Model answer link */}
<text x="187" y="606" fill="#1CB0F6" fontFamily="Nunito,system-ui" fontSize="14" textAnchor="middle" fontWeight="700">&#128218; See a model answer</text>
{/* CTA: 3D raised green button */}
<rect x="24" y="640" width="327" height="54" rx="16" fill="#43C000"/>
<rect x="24" y="636" width="327" height="50" rx="16" fill="#58CC02"/>
<text x="187" y="667" fill="#FFFFFF" fontFamily="Nunito,system-ui" fontSize="16" textAnchor="middle" fontWeight="800">CONTINUE</text>
{/* Bottom nav */}
<rect x="0" y="752" width="375" height="60" rx="0" fill="#FFFFFF"/>
<line x1="0" y1="752" x2="375" y2="752" stroke="#E5E5E5" strokeWidth="1"/>
<text x="68" y="784" fill="#AFAFAF" fontSize="16" textAnchor="middle">&#127968;</text>
<text x="187" y="784" fill="#AFAFAF" fontSize="16" textAnchor="middle">&#128170;</text>
<text x="306" y="784" fill="#AFAFAF" fontSize="16" textAnchor="middle">&#128100;</text>
</svg>
</div>
</div>

</div>
</section>

{/* ===== PRD ===== */}
<section className="section" id="prd">
<div className="container">
<span className="section-label">Product Requirements Document</span>
<h2 className="section-title">PRD: Duolingo Breakthrough</h2>
<p><strong>Product Owner:</strong> Learning Experience &nbsp;|&nbsp; <strong>Priority:</strong> P0 &nbsp;|&nbsp; <strong>Target:</strong> Q3 2026 (Spanish, French) &rarr; Q4 2026 (5 additional languages)</p>

<h3 style={{"fontSize":"1.1rem","margin":"2.5rem 0 .8rem"}}>Problem Statement</h3>
<p>Users at A2+ proficiency (~Unit 30) experience a learning plateau where recognition-based exercises no longer translate to real-world ability. Academic evidence (Jiang et al., 2021) shows completers reach Intermediate Low in reading but only Novice High in listening, with speaking and writing unmeasured. Sentiment data from Trustpilot, Reddit, and app reviews consistently identifies this ceiling as the primary churn driver among dedicated learners.</p>

<h3 style={{"fontSize":"1.1rem","margin":"2rem 0 .8rem"}}>User Stories</h3>
<table className="prd-table">
<thead><tr><th>As a...</th><th>I want to...</th><th>So that...</th></tr></thead>
<tbody>
<tr><td>Plateaued learner</td><td>Practice speaking in my own words about realistic scenarios</td><td>I build spontaneous speech, not read-aloud recognition</td></tr>
<tr><td>Intermediate learner</td><td>Listen to native-speed audio with comprehension support</td><td>I understand real conversations, not slow TTS</td></tr>
<tr><td>Motivated free user</td><td>Access production exercises without paying $168/yr for Max</td><td>I stay on Duolingo instead of switching apps</td></tr>
<tr><td>Super subscriber</td><td>Get unlimited Breakthrough exercises + detailed feedback</td><td>My $84/yr subscription delivers real speaking progress</td></tr>
<tr><td>Lapsed user</td><td>Return to a meaningfully different experience</td><td>I re-engage after leaving due to plateau frustration</td></tr>
</tbody>
</table>

<h3 style={{"fontSize":"1.1rem","margin":"2rem 0 .8rem"}}>Functional Requirements</h3>
<table className="prd-table">
<thead><tr><th>ID</th><th>Requirement</th><th>Priority</th></tr></thead>
<tbody>
<tr><td>BR-01</td><td><strong>Proficiency gate:</strong> Breakthrough Mode unlocks at Unit 30 (~A2). Unlock celebration screen previews new exercise types.</td><td><span className="pill pill-red">P0</span></td></tr>
<tr><td>BR-02</td><td><strong>Speak Free:</strong> Open-ended speaking with scenario context. AI evaluates pronunciation, grammar, relevance, vocabulary complexity. 15&ndash;45 sec responses. No word bank.</td><td><span className="pill pill-red">P0</span></td></tr>
<tr><td>BR-03</td><td><strong>Listen Real:</strong> Native-speed audio clips (30&ndash;90s). Three question tiers: gist, detail, inference. Audio from DuoRadio + licensed native content.</td><td><span className="pill pill-red">P0</span></td></tr>
<tr><td>BR-04</td><td><strong>Write Open:</strong> Guided composition (2&ndash;5 sentences). AI inline grammar correction, vocabulary suggestions, naturalness scoring.</td><td><span className="pill pill-accent">P1</span></td></tr>
<tr><td>BR-05</td><td><strong>Free tier limit:</strong> 2 Breakthrough exercises/day. Unlimited on Super and Max.</td><td><span className="pill pill-red">P0</span></td></tr>
<tr><td>BR-06</td><td><strong>Fluency XP:</strong> Separate XP track for Breakthrough. Feeds into Duolingo Score for visible proficiency signal.</td><td><span className="pill pill-accent">P1</span></td></tr>
<tr><td>BR-07</td><td><strong>Adaptive difficulty:</strong> AI adjusts scenario complexity based on performance. Poor performance &rarr; simpler prompts.</td><td><span className="pill pill-accent">P1</span></td></tr>
<tr><td>BR-08</td><td><strong>Scaffolded fallback:</strong> &ldquo;I&rsquo;m not ready&rdquo; downgrades to guided version (sentence starters + hints).</td><td><span className="pill pill-blue">P2</span></td></tr>
<tr><td>BR-09</td><td><strong>Model answers:</strong> AI-generated model response after exercise completion.</td><td><span className="pill pill-blue">P2</span></td></tr>
<tr><td>BR-10</td><td><strong>Peer review:</strong> Opt-in community review for Write Open. Badge incentives for reviewers.</td><td><span className="pill pill-blue">P2</span></td></tr>
</tbody>
</table>

<h3 style={{"fontSize":"1.1rem","margin":"2rem 0 .8rem"}}>Technical Dependencies</h3>
<p><strong>AI:</strong> Leverages existing GPT-4o integration (Video Call, Explain My Answer). Speak Free = STT + LLM evaluation; Listen Real = audio pipeline; Write Open = text evaluation. Estimated incremental cost: $0.02&ndash;0.05/exercise vs. ~$0.15&ndash;0.30/min for Video Call.</p>
<p><strong>Audio:</strong> DuoRadio produces thousands of episodes across multiple languages. Additional native-speaker licensing may be needed for Listen Real.</p>
<p><strong>Testing:</strong> 300+ experiments/quarter infrastructure. 5% holdout, 8-week minimum before full rollout.</p>

<h3 style={{"fontSize":"1.1rem","margin":"2rem 0 .8rem"}}>Rollout Plan</h3>
<div className="timeline">
<div className="tl-item"><div className="tl-date">Q2 2026</div><h4>Alpha: 1% of A2+ Spanish learners</h4><p>Speak Free + Listen Real. Validate AI evaluation accuracy. Measure completion rates.</p></div>
<div className="tl-item"><div className="tl-date">Q3 2026</div><h4>Beta: 10% of A2+ Spanish + French</h4><p>Full suite. A/B test retention, Score improvement, conversion vs. control.</p></div>
<div className="tl-item"><div className="tl-date">Q4 2026</div><h4>GA: Top 5 languages</h4><p>Spanish, French, German, Italian, Portuguese. Free-to-Super conversion prompt integration.</p></div>
<div className="tl-item"><div className="tl-date">Q1 2027</div><h4>Expansion: Japanese, Korean + peer review</h4><p>Non-Romance languages. Write Open peer review with community badges.</p></div>
</div>
</div>
</section>

{/* ===== METRICS ===== */}
<section className="section section-alt" id="metrics">
<div className="container">
<span className="section-label">Success Metrics</span>
<h2 className="section-title">How We Measure Impact</h2>

<div className="metrics">
<div className="metric-card"><div className="metric-val teal">+15%</div><div className="metric-label">D30 Retention (A2+ users)</div><div className="metric-src">Primary KPI vs. control</div></div>
<div className="metric-card"><div className="metric-val accent">+8%</div><div className="metric-label">Free&rarr;Super Conversion</div><div className="metric-src">A2+ users exposed to Breakthrough</div></div>
<div className="metric-card"><div className="metric-val">+0.5</div><div className="metric-label">CEFR Score Improvement</div><div className="metric-src">Proficiency gain over 90 days</div></div>
<div className="metric-card"><div className="metric-val teal">60%+</div><div className="metric-label">Completion Rate</div><div className="metric-src">% finishing started exercises</div></div>
<div className="metric-card"><div className="metric-val accent">+10%</div><div className="metric-label">Lapsed Reactivation</div><div className="metric-src">3&ndash;12 month inactive users</div></div>
<div className="metric-card"><div className="metric-val">&lt;5%</div><div className="metric-label">Skip Rate</div><div className="metric-src">Guardrail: &gt;20% = miscalibrated</div></div>
</div>

<p><strong>North Star:</strong> <em>Production-adjusted DAU retention at 90 days for A2+ users.</em> This measures whether Breakthrough keeps intermediate learners engaged long enough to develop real skills&mdash;the exact cohort where Duolingo currently loses users to competitors.</p>

<h3 style={{"fontSize":"1.1rem","margin":"2rem 0 .8rem"}}>What We&rsquo;d Measure After 90 Days</h3>
<table className="prd-table">
<thead><tr><th>Metric</th><th>Baseline (est.)</th><th>90-Day Target</th><th>Why It Matters</th></tr></thead>
<tbody>
<tr><td><strong>D90 Retention (A2+ users)</strong></td><td>~35%</td><td>50%+</td><td>Core validation that Breakthrough reduces intermediate churn</td></tr>
<tr><td><strong>Free&rarr;Super conversion rate</strong></td><td>~4% of A2+ users</td><td>6%+</td><td>Proves the 2/day limit is an effective conversion lever</td></tr>
<tr><td><strong>Duolingo Score delta</strong></td><td>+0 (plateau)</td><td>+0.3&ndash;0.5 CEFR</td><td>Demonstrates measurable proficiency gain from production exercises</td></tr>
<tr><td><strong>Breakthrough exercise completion</strong></td><td>N/A</td><td>60%+</td><td>If below 40%, difficulty calibration needs adjustment</td></tr>
</tbody>
</table>

<h3 style={{"fontSize":"1.1rem","margin":"2.5rem 0 .8rem"}}>Risk Assessment</h3>
<div className="risk-row"><div className="risk-bar high"></div><div className="risk-content"><h4>Engagement dip from harder exercises</h4><p><strong>Medium likelihood / High impact.</strong> Mitigation: adaptive difficulty, scaffolded fallback, premium Fluency XP incentive. A/B test Breakthrough-to-regular ratio (start 1:4).</p></div></div>
<div className="risk-row"><div className="risk-bar med"></div><div className="risk-content"><h4>AI evaluation accuracy in non-Romance languages</h4><p><strong>Medium / Medium.</strong> Launch with top 5 Romance languages. Confidence scoring; flag low-confidence for human review. Expand at 90%+ accuracy threshold.</p></div></div>
<div className="risk-row"><div className="risk-bar med"></div><div className="risk-content"><h4>Max subscription cannibalization</h4><p><strong>Low / Medium.</strong> Breakthrough is async; Video Call is real-time conversation. Complementary positioning. Max is only 5% of paid base&mdash;Super conversion upside far exceeds risk.</p></div></div>
<div className="risk-row"><div className="risk-bar low"></div><div className="risk-content"><h4>Incremental GenAI compute costs</h4><p><strong>High / Low.</strong> ~$0.02&ndash;0.05/exercise is 10&ndash;20x cheaper than Video Call. Free-tier 2/day cap limits non-paying costs. Subscription revenue should exceed compute within one quarter.</p></div></div>
</div>
</section>

{/* ===== STRATEGIC CONTEXT ===== */}
<section className="section">
<div className="container">
<span className="section-label">Strategic Context</span>
<h2 className="section-title">Why This Matters Now</h2>
<p>Duolingo&rsquo;s Q4 2025 earnings call marked an explicit pivot: sacrifice near-term monetization for long-term user growth. The CEO committed $50M in foregone bookings, set a 100M DAU target for 2028, and expanded premium AI features to lower subscription tiers. The CFO departed alongside the report. Multiple analysts downgraded. Securities fraud investigations were launched.</p>
<p><strong>Breakthrough Mode is not a feature request&mdash;it&rsquo;s a strategic necessity.</strong></p>
<p><strong>1. Addresses root cause of deceleration.</strong> DAU growth slowed from +65% (Q4 2023) to +30% (Q4 2025). MAUs declined QoQ in Q4. The underlying driver is product-market fit erosion: users who plateau and churn.</p>
<p><strong>2. Justifies the subscription price.</strong> If Super included unlimited production exercises that demonstrably improve conversational ability, the value proposition becomes: &ldquo;Pay $7/month to actually learn to speak.&rdquo;</p>
<p><strong>3. Neutralizes competitive threats.</strong> Babbel and Busuu offer better grammar instruction. Speak and TalkPal offer cheaper AI conversation. Breakthrough combines Duolingo&rsquo;s 52.7M DAU distribution with production-first exercises that address the gap both competitor categories exploit.</p>
<p><strong>4. Leverages existing AI investment.</strong> GPT-4o infrastructure built for Video Call and Explain My Answer works at 10&ndash;20x lower cost for async evaluation. The marginal investment is minimal relative to the infrastructure already deployed.</p>
</div>
</section>

{/* ===== SOURCES ===== */}
<section className="section section-alt">
<div className="container">
<span className="section-label">Appendix</span>
<h2 className="section-title">Sources &amp; Verification</h2>
<p style={{"fontSize":".82rem","color":"var(--muted)"}}><strong style={{"color":"var(--dark)"}}>Financial data:</strong> SEC filings (10-K, quarterly shareholder letters), verified against MacroTrends and StockAnalysis.com. Revenue FY 2025: $1.04B (StockAnalysis: $1.038B, +38.71% YoY). <strong style={{"color":"var(--dark)"}}>User metrics:</strong> Q4 2025 shareholder letter&mdash;DAU 52.7M, MAU ~133M, paid subs 12.2M. <strong style={{"color":"var(--dark)"}}>Stock data:</strong> ATH $544.93 intraday (May 14, 2025, TradingView/MacroTrends). Closing price $94.92 (March 12, 2026, MacroTrends). 52-week range: $91.99&ndash;$544.93. <strong style={{"color":"var(--dark)"}}>App ratings:</strong> Google Play 4.7&#9733; / 41.4M reviews (play.google.com, accessed March 2026). PissedConsumer: 2.2&#9733; avg (~3,900 reviews). <strong style={{"color":"var(--dark)"}}>Academic:</strong> Jiang et al. (2021), <em>Foreign Language Annals</em>; gamification misuse research via ACM (2022). <strong style={{"color":"var(--dark)"}}>Community:</strong> r/duolingo, Class Central analysis (Oct 2025, Jan 2026, Feb 2026), Android Authority, Duoplanet. <strong style={{"color":"var(--dark)"}}>Competitor data:</strong> App store listings, Babbel efficacy studies, Busuu/LingQ marketing materials. <strong style={{"color":"var(--dark)"}}>Controversies:</strong> Fortune, TechRepublic, Entrepreneur, Snopes (fact-checked). All estimates clearly labeled.</p>
</div>
</section>

{/* ===== FOOTER ===== */}
<footer className="footer">
<p><strong>Breaking the B1 Wall</strong> &mdash; Duolingo Product Case Study</p>
<p style={{"marginTop":".4rem"}}>CIRCLES Framework + PRD &middot; March 2026 &middot; All data fact-checked against primary sources</p>
</footer>


    </>
  );
}
