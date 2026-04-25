'use client';

import { useState, useEffect } from "react";

const PplxMockup = ({ query, answer, sources, model = "Frontier model" }) => (
  <div style={{ background: "#fff", borderRadius: 14, border: "1.5px solid #e8e6e3", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,.07)", width: "100%", maxWidth: 380 }}>
    <div style={{ padding: "10px 14px", borderBottom: "1px solid #f0eeeb", display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 20, height: 20, borderRadius: 5, background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ color: "#fff", fontSize: 9, fontWeight: 700 }}>P</span></div>
      <span style={{ font: "600 11px/1 'Sora',sans-serif", color: "#1a1a1a" }}>Perplexity</span>
      <span style={{ font: "600 7px/1 'IBM Plex Mono',monospace", background: "#6C5CE7", color: "#fff", padding: "2px 6px", borderRadius: 3, marginLeft: "auto", flexShrink: 0 }}>PRO</span>
    </div>
    <div style={{ padding: "12px 14px 8px", background: "#faf9f7" }}>
      <div style={{ font: "500 9px/1 'IBM Plex Mono',monospace", color: "#999", letterSpacing: ".04em", marginBottom: 5, textTransform: "uppercase" }}>Search</div>
      <div style={{ font: "400 12px/1.4 'Sora',sans-serif", color: "#1a1a1a" }}>{query}</div>
    </div>
    <div style={{ padding: "12px 14px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#2d8a4e", flexShrink: 0 }} />
        <span style={{ font: "500 8px/1 'IBM Plex Mono',monospace", color: "#2d8a4e", letterSpacing: ".04em" }}>ANSWER · {model}</span>
      </div>
      <div style={{ font: "400 10.5px/1.6 'Sora',sans-serif", color: "#555" }}>{answer}</div>
      {sources && <div style={{ marginTop: 8, display: "flex", gap: 4, flexWrap: "wrap" }}>{sources.map((s,i)=>(<span key={i} style={{ font: "500 7.5px/1 'IBM Plex Mono',monospace", background: "#f0eeeb", color: "#999", padding: "3px 6px", borderRadius: 3 }}>[{i+1}] {s}</span>))}</div>}
    </div>
  </div>
);

const PositioningQuadrant = () => {
  const competitors = [
    { name: "Perplexity Pro", x: 82, y: 12, color: "#6C5CE7", size: 10, bold: true, note: "Multi-model + citations" },
    { name: "Claude Pro", x: 18, y: 32, color: "#c4841d", size: 8 },
    { name: "Gemini AI Pro", x: 28, y: 36, color: "#54A0FF", size: 8 },
    { name: "ChatGPT Plus", x: 20, y: 65, color: "#00D2D3", size: 9 },
    { name: "Copilot Pro", x: 35, y: 70, color: "#999", size: 7 },
    { name: "Grok", x: 50, y: 75, color: "#FF6B6B", size: 7 },
  ];
  return (
    <div style={{ background: "#fff", borderRadius: 10, padding: "24px 24px 16px", border: "1px solid rgba(0,0,0,.05)", margin: "32px 0" }}>
      <div style={{ font: "500 9.5px/1 'IBM Plex Mono',monospace", letterSpacing: ".08em", color: "#999", textTransform: "uppercase", marginBottom: 16 }}>Competitive Positioning · $20/mo AI Subscriptions</div>
      <div style={{ position: "relative", width: "100%", paddingBottom: "70%", background: "#faf9f7", borderRadius: 8, overflow: "hidden" }}>
        {/* Quadrant lines */}
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "#e8e6e3" }} />
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "#e8e6e3" }} />
        {/* Sweet spot shading */}
        <div style={{ position: "absolute", top: 0, left: "50%", right: 0, bottom: "50%", background: "rgba(108,92,231,.04)", borderRadius: "0 8px 0 0" }} />
        <div style={{ position: "absolute", top: 8, right: 12, font: "600 9px/1 'IBM Plex Mono',monospace", color: "#6C5CE7", letterSpacing: ".08em" }}>SWEET SPOT</div>
        {/* Axis labels */}
        <div style={{ position: "absolute", bottom: 6, left: "50%", transform: "translateX(-50%)", font: "500 8px/1 'IBM Plex Mono',monospace", color: "#ccc", letterSpacing: ".04em", whiteSpace: "nowrap" }}>GENERAL-PURPOSE → SPECIALIZED RESEARCH</div>
        <div style={{ position: "absolute", left: 6, top: "50%", transform: "translateY(-50%) rotate(-90deg)", font: "500 8px/1 'IBM Plex Mono',monospace", color: "#ccc", letterSpacing: ".04em", whiteSpace: "nowrap", transformOrigin: "center" }}>LOW TRANSPARENCY → HIGH</div>
        {/* Dots */}
        {competitors.map((c, i) => (
          <div key={i} style={{ position: "absolute", left: `${c.x}%`, top: `${c.y}%`, transform: "translate(-50%, -50%)", textAlign: "center", zIndex: c.bold ? 3 : 1 }}>
            <div style={{ width: c.size * 3.5, height: c.size * 3.5, borderRadius: "50%", background: c.color + "18", border: `2px solid ${c.color}`, margin: "0 auto 4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: c.size, height: c.size, borderRadius: "50%", background: c.color }} />
            </div>
            <div style={{ font: `${c.bold ? 600 : 500} ${c.bold ? 11 : 10}px/1.2 'Sora',sans-serif`, color: c.color, whiteSpace: "nowrap" }}>{c.name}</div>
            {c.note && <div style={{ font: "500 8px/1.2 'IBM Plex Mono',monospace", color: "#6C5CE7", background: "#f0eeff", padding: "3px 8px", borderRadius: 4, marginTop: 3, border: "1px solid #6C5CE730", whiteSpace: "nowrap", display: "inline-block" }}>{c.note}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

const ValueGapChart = () => {
  const gaps = [
    { label: "Model Access", free: 1, pro: 9, color: "#6C5CE7" },
    { label: "Deep Research", free: 1, pro: 7, color: "#54A0FF" },
    { label: "File Uploads", free: 1, pro: 9, color: "#00B4D8" },
    { label: "Citations", free: 3, pro: 9, color: "#2d8a4e" },
    { label: "Image Gen", free: 0, pro: 7, color: "#c4841d" },
    { label: "API Credits", free: 0, pro: 5, color: "#FF6B6B" },
  ];
  return (
    <div style={{ background: "#fff", borderRadius: 10, padding: "24px 28px", border: "1px solid rgba(0,0,0,.05)", margin: "32px 0" }}>
      <div style={{ font: "500 9.5px/1 'IBM Plex Mono',monospace", letterSpacing: ".08em", color: "#999", textTransform: "uppercase", marginBottom: 20 }}>Value Gap · Free vs Pro (0–10)</div>
      {gaps.map((g, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "90px 1fr 32px", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span style={{ font: "500 10px/1 'Sora',sans-serif", color: "#555", textAlign: "right" }}>{g.label}</span>
          <div style={{ position: "relative", height: 18, background: "#f5f3f0", borderRadius: 4 }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: `${g.free*10}%`, height: 8, background: "#d3d0ca", borderRadius: 4 }} />
            <div style={{ position: "absolute", top: 10, left: 0, width: `${g.pro*10}%`, height: 8, background: g.color, borderRadius: 4, opacity: 0.85 }} />
          </div>
          <span style={{ font: "700 10px/1 'IBM Plex Mono',monospace", color: "#c4841d" }}>+{g.pro-g.free}</span>
        </div>
      ))}
      <div style={{ display: "flex", gap: 16, marginTop: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}><div style={{ width: 14, height: 6, background: "#d3d0ca", borderRadius: 2 }} /><span style={{ font: "400 9px/1 'Sora',sans-serif", color: "#999" }}>Free</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}><div style={{ width: 14, height: 6, background: "#6C5CE7", borderRadius: 2, opacity: 0.85 }} /><span style={{ font: "400 9px/1 'Sora',sans-serif", color: "#999" }}>Pro $20/mo</span></div>
      </div>
    </div>
  );
};

const ProductTimeline = () => (
  <div style={{ background: "#0a0a0a", borderRadius: 10, padding: "24px 24px 20px", margin: "32px 0" }}>
    <div style={{ font: "500 9.5px/1 'IBM Plex Mono',monospace", letterSpacing: ".08em", color: "rgba(255,255,255,.3)", textTransform: "uppercase", marginBottom: 20 }}>Product & Pricing Evolution</div>
    <div style={{ position: "relative", padding: "0 0 0 12px" }}>
      <div style={{ position: "absolute", left: 16, top: 0, bottom: 0, width: 2, background: "rgba(255,255,255,.08)" }} />
      {[
        { date: "Dec 2022", event: "Search engine launch", c: "#54A0FF" },
        { date: "Apr 2024", event: "$1B valuation", c: "#54A0FF" },
        { date: "Nov 2024", event: "Shopping Hub launch", c: "#00D2D3" },
        { date: "Jul 2025", event: "Max tier ($200/mo) + Comet browser", c: "#00D2D3" },
        { date: "Sep 2025", event: "$20B valuation · $200M raise", c: "#FECA57" },
        { date: "Nov 2025", event: "Silent model substitution discovered", c: "#FF6B6B" },
        { date: "Feb 2026", event: "Pro limits slashed · Ads abandoned", c: "#FF6B6B" },
        { date: "Mar 2026", event: "Personal Computer launched", c: "#6C5CE7" },
      ].map((e, i) => (
        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 12, position: "relative" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: e.c, flexShrink: 0, marginTop: 2, position: "relative", zIndex: 1, boxShadow: `0 0 0 3px #0a0a0a` }} />
          <div>
            <div style={{ font: "500 9px/1 'IBM Plex Mono',monospace", color: "rgba(255,255,255,.4)", letterSpacing: ".04em", marginBottom: 3 }}>{e.date}</div>
            <div style={{ font: "400 12px/1.4 'Sora',sans-serif", color: "rgba(255,255,255,.7)" }}>{e.event}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const RevenueChart = () => (
  <div style={{ background: "#fff", borderRadius: 10, padding: "24px 20px 16px", border: "1px solid rgba(0,0,0,.05)" }}>
    <div style={{ font: "500 9.5px/1 'IBM Plex Mono',monospace", letterSpacing: ".08em", color: "#999", textTransform: "uppercase", marginBottom: 16 }}>Perplexity AI · Annual Recurring Revenue</div>
    <svg viewBox="0 0 480 190" width="100%" style={{ display: "block" }}>
      {[0,150,300,450,650].map((v,i)=>(<g key={i}><line x1="48" y1={165-(v/700)*145} x2="460" y2={165-(v/700)*145} stroke="#e8e6e3" strokeWidth="1"/><text x="42" y={169-(v/700)*145} textAnchor="end" fontSize="9" fontFamily="'IBM Plex Mono',monospace" fill="#999">${v}M</text></g>))}
      {[{y:"'23",v:5,l:"$5M"},{y:"'24 Q4",v:70,l:"$70M"},{y:"'25 Q1",v:100,l:"$100M"},{y:"'25 Q2",v:148,l:"$148M"},{y:"'25 Q3",v:200,l:"$200M"},{y:"'26T",v:656,l:"$656M"}].map((d,i)=>{const h=(d.v/700)*145;const x=55+i*67;return(<g key={i}><rect x={x} y={165-h} width="38" height={h} rx="4" fill={i===5?"#6C5CE7":"#1a1a1a"}/><text x={x+19} y={159-h} textAnchor="middle" fontSize="9" fontFamily="Sora,sans-serif" fontWeight="600" fill={i===5?"#6C5CE7":"#1a1a1a"}>{d.l}</text><text x={x+19} y={180} textAnchor="middle" fontSize="8.5" fontFamily="'IBM Plex Mono',monospace" fill="#999">{d.y}</text></g>);})}
    </svg>
    <div style={{ font: "400 9px/1.3 'IBM Plex Mono',monospace", color: "#bbb", marginTop: 6 }}>Sources: TechCrunch, Sacra, DemandSage</div>
  </div>
);

const FunnelChart = () => (
  <div style={{ background: "#fff", borderRadius: 10, padding: "24px 28px", border: "1px solid rgba(0,0,0,.05)", margin: "32px 0" }}>
    <div style={{ font: "500 9.5px/1 'IBM Plex Mono',monospace", letterSpacing: ".08em", color: "#999", textTransform: "uppercase", marginBottom: 20 }}>AARRR Pirate Metrics Applied to Perplexity</div>
    {[
      { label:"ACQUISITION",desc:"Tens of millions of users via Airtel, Samsung, T-Mobile, PayPal",color:"#54A0FF",pct:100 },
      { label:"ACTIVATION",desc:"3–5 free Pro searches → citation aha moment",color:"#00D2D3",pct:86 },
      { label:"RETENTION",desc:"Deep Research habit loop, multi-model switching",color:"#FECA57",pct:70 },
      { label:"REVENUE",desc:"Pro $20/mo (~2% conversion) → ~$148M+ ARR",color:"#FF6B6B",pct:56 },
      { label:"REFERRAL",desc:"Publisher partnerships, Comet browser loops",color:"#6C5CE7",pct:42 },
    ].map((s,i)=>(
      <div key={i} style={{ marginBottom: 10 }}>
        <div style={{ width: `${s.pct}%`, minWidth: 200, background: s.color+"14", border: `1.5px solid ${s.color}`, borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ font: "700 10px/1 'Sora',sans-serif", color: s.color, letterSpacing: ".04em", flexShrink: 0 }}>{s.label}</span>
          <span style={{ font: "400 10px/1.3 'Sora',sans-serif", color: "#666" }}>{s.desc}</span>
        </div>
      </div>
    ))}
  </div>
);

const DowngradeBA = () => (
  <div className="ba-grid" style={{ margin: "32px 0" }}>
    <div style={{ background: "#fff", borderRadius: 10, padding: "20px 22px", border: "1.5px solid #2d8a4e" }}>
      <div style={{ font: "500 9.5px/1.3 'IBM Plex Mono',monospace", letterSpacing: ".06em", color: "#2d8a4e", marginBottom: 12, textTransform: "uppercase" }}>✓ Pro · Before (Pre-Nov 2025)</div>
      {["Effectively unlimited Pro searches","Hundreds of Deep Research runs","Model selected = model received","Generous file uploads","No usage throttling"].map((t,i)=>(
        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6, padding: "3.5px 0" }}>
          <span style={{ color: "#2d8a4e", fontSize: 10, lineHeight: "1.4", flexShrink: 0 }}>●</span>
          <span style={{ font: "400 11px/1.5 'Sora',sans-serif", color: "#555" }}>{t}</span>
        </div>
      ))}
    </div>
    <div style={{ textAlign: "center", fontSize: 18, color: "#ccc", alignSelf: "center" }}>→</div>
    <div style={{ background: "#fff", borderRadius: 10, padding: "20px 22px", border: "1.5px solid #FF6B6B" }}>
      <div style={{ font: "500 9.5px/1.3 'IBM Plex Mono',monospace", letterSpacing: ".06em", color: "#FF6B6B", marginBottom: 12, textTransform: "uppercase" }}>✗ Pro · After (Feb 2026)</div>
      {["~200/week Pro searches","~20 Deep Research/month (~95%↓)","Secret model substitution","Weekly file upload caps","Dynamic throttling, no notice"].map((t,i)=>(
        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6, padding: "3.5px 0" }}>
          <span style={{ color: "#FF6B6B", fontSize: 10, lineHeight: "1.4", flexShrink: 0 }}>●</span>
          <span style={{ font: "400 11px/1.5 'Sora',sans-serif", color: "#555" }}>{t}</span>
        </div>
      ))}
    </div>
  </div>
);

const App = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeNav, setActiveNav] = useState("hero");
  useEffect(() => {
    const fn = () => { setScrollY(window.scrollY); document.querySelectorAll("[data-nav]").forEach(s => { const r = s.getBoundingClientRect(); if (r.top <= 180 && r.bottom >= 180) setActiveNav(s.dataset.nav); }); };
    window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
  }, []);
  const progress = typeof document !== "undefined" ? Math.min((scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100) : 0;
  const nav = [["hero","Top"],["context","Context"],["pricing","Pricing"],["funnel","Funnel"],["compete","Compete"],["crisis","Crisis"],["finance","Finance"],["risks","Risks"],["verdict","Verdict"]];
  const go = id => document.querySelector(`[data-nav="${id}"]`)?.scrollIntoView({ behavior: "smooth" });

  return (<>
    <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,600&family=Sora:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');:root{--black:#0a0a0a;--ink:#1a1a1a;--charcoal:#2d2d2d;--slate:#6b6b6b;--ash:#999;--mist:#e8e6e3;--cream:#f5f3f0;--paper:#faf9f7;--white:#fff;--purple:#6C5CE7;--purple-soft:#f0eeff;--teal:#00B4D8;--teal-soft:#e6f9fc;--coral:#FF6B6B;--coral-soft:#fff0f0;--gold:#FECA57;--gold-soft:#fffbea;--blue:#54A0FF;--blue-soft:#eef3fc;--display:'Fraunces',serif;--body:'Sora',sans-serif;--mono:'IBM Plex Mono',monospace}*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}body{font-family:var(--body);background:var(--paper);color:var(--ink);-webkit-font-smoothing:antialiased;line-height:1.6}.topbar{position:fixed;top:0;left:0;right:0;height:3px;z-index:900;background:var(--mist)}.topbar-fill{height:100%;background:var(--purple);transition:width 60ms linear}.sidenav{position:fixed;left:28px;top:50%;transform:translateY(-50%);z-index:800;display:flex;flex-direction:column;gap:14px}.sidenav-dot{width:6px;height:6px;border-radius:50%;border:1.5px solid var(--ash);background:transparent;cursor:pointer;transition:all .25s;position:relative}.sidenav-dot.on{background:var(--purple);border-color:var(--purple);transform:scale(1.6)}.sidenav-dot:hover::after{content:attr(data-tip);position:absolute;left:18px;top:50%;transform:translateY(-50%);font:500 10px/1 var(--mono);letter-spacing:.06em;white-space:nowrap;color:var(--charcoal);background:var(--white);padding:5px 10px;border-radius:4px;box-shadow:0 2px 12px rgba(0,0,0,.07)}@media(max-width:1100px){.sidenav{display:none}}.wrap{max-width:820px;margin:0 auto;padding:0 32px}.wrap-lg{max-width:1040px;margin:0 auto;padding:0 32px}.sect{padding:96px 0}.eyebrow{font:500 10.5px/1.2 var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--purple);margin-bottom:14px}.h1{font:400 clamp(38px,5.5vw,64px)/1.08 var(--display);color:var(--white);margin-bottom:24px}.h1 em{font-style:italic;color:var(--purple);font-weight:600}.h2{font:400 clamp(28px,3.8vw,44px)/1.12 var(--display);color:var(--ink);margin-bottom:16px}.lead{font:300 16px/1.75 var(--body);color:var(--slate);max-width:600px}.body{font:400 14px/1.72 var(--body);color:var(--slate)}.src{display:inline-block;font:400 9.5px/1 var(--mono);letter-spacing:.04em;color:var(--ash);background:rgba(0,0,0,.03);padding:3px 8px;border-radius:3px;margin-top:8px}.hero{min-height:100vh;background:var(--black);color:var(--white);display:flex;align-items:center;position:relative;overflow:hidden}.hero::before{content:'';position:absolute;top:-30%;right:-15%;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(108,92,231,.12) 0%,transparent 65%);pointer-events:none}.hero::after{content:'';position:absolute;bottom:-20%;left:-10%;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(0,180,216,.08) 0%,transparent 65%);pointer-events:none}.hero-sub{font:300 16px/1.7 var(--body);color:rgba(255,255,255,.5);max-width:540px;margin-bottom:48px}.hero-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border-top:1px solid rgba(255,255,255,.1)}.hero-stat{padding:24px 20px;position:relative}.hero-stat:not(:first-child)::before{content:'';position:absolute;left:0;top:16px;bottom:16px;width:1px;background:rgba(255,255,255,.1)}.hero-stat:first-child{padding-left:0}.hero-stat-val{font:400 30px/1 var(--display);color:var(--white);margin-bottom:5px}.hero-stat-lbl{font:500 9px/1.3 var(--mono);letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.3)}.hero-stat-note{font:400 8.5px/1.3 var(--mono);color:rgba(255,255,255,.18);margin-top:3px}.card{background:var(--white);border-radius:10px;padding:28px;border:1px solid rgba(0,0,0,.05);transition:box-shadow .2s}.card:hover{box-shadow:0 6px 24px rgba(0,0,0,.04)}.card-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:36px;align-items:stretch}.card-icon{font-size:22px;margin-bottom:14px}.card-title{font:600 14px/1.3 var(--body);color:var(--ink);margin-bottom:6px}.card-body{font:400 13px/1.65 var(--body);color:var(--slate)}.mockup-row{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin:32px 0}.quote{position:relative;padding:32px 36px 32px 44px;background:var(--white);border-radius:10px;margin:36px 0;border:1px solid rgba(0,0,0,.05)}.quote::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;border-radius:10px 0 0 10px}.quote-purple::before{background:var(--purple)}.quote-coral::before{background:var(--coral)}.quote-teal::before{background:var(--teal)}.quote-text{font:400 17px/1.6 var(--display);color:var(--charcoal);font-style:italic}.quote-attr{font:400 10px/1 var(--mono);color:var(--ash);margin-top:12px;letter-spacing:.03em}.insight{position:relative;padding:22px 24px 22px 36px;border-radius:10px;margin:24px 0;border:1px solid rgba(0,0,0,.05)}.insight::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;border-radius:10px 0 0 10px}.insight-purple{background:var(--purple-soft)}.insight-purple::before{background:var(--purple)}.insight-coral{background:var(--coral-soft)}.insight-coral::before{background:var(--coral)}.insight-teal{background:var(--teal-soft)}.insight-teal::before{background:var(--teal)}.insight-gold{background:var(--gold-soft)}.insight-gold::before{background:var(--gold)}.insight-lbl{font:600 9px/1 var(--mono);letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px}.insight-body{font:400 13.5px/1.7 var(--body);color:var(--slate)}.tbl{width:100%;border-collapse:collapse;margin-top:24px;font-size:13px}.tbl th{font:600 9px/1 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--ash);text-align:left;padding:10px 12px;border-bottom:2px solid var(--ink)}.tbl td{padding:10px 12px;border-bottom:1px solid var(--mist);font:400 12.5px/1.5 var(--body);color:var(--slate)}.tbl tr:hover td{background:rgba(0,0,0,.01)}.tbl .g{color:#2d8a4e;font-weight:500}.tbl .r{color:var(--coral);font-weight:500}.tbl .a{color:#c4841d;font-weight:500}.tbl .bold{font-weight:600;color:var(--ink)}.met-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:36px;align-items:stretch}.met{background:var(--white);border-radius:10px;padding:24px;border:1px solid rgba(0,0,0,.05);text-align:center}.met-val{font:400 32px/1 var(--display);color:var(--ink);margin-bottom:5px}.met-lbl{font:400 12.5px/1.4 var(--body);color:var(--slate);margin-bottom:3px}.met-note{font:500 9px/1 var(--mono);letter-spacing:.03em}.tier{background:var(--white);border-radius:10px;padding:24px 28px;border:1px solid rgba(0,0,0,.05);margin-bottom:12px;display:grid;grid-template-columns:130px 1fr;gap:18px;align-items:start}.tier-price{font:400 26px/1 var(--display);color:var(--ink)}.tier-name{font:600 13.5px/1.3 var(--body);color:var(--ink);margin-bottom:3px}.tier-desc{font:400 12.5px/1.6 var(--body);color:var(--slate)}.tier-tag{display:inline-block;font:600 8px/1 var(--mono);letter-spacing:.06em;padding:3px 7px;border-radius:3px;text-transform:uppercase;margin-bottom:6px}.pain{background:var(--white);border-radius:10px;padding:24px 28px;border:1px solid rgba(0,0,0,.05);margin-bottom:12px;display:grid;grid-template-columns:3px 1fr;gap:20px}.pain-bar{border-radius:2px}.pain-head{display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap}.pain-title{font:600 14px/1.3 var(--body);color:var(--ink)}.tag{font:600 8.5px/1 var(--mono);letter-spacing:.06em;padding:3px 7px;border-radius:3px;text-transform:uppercase}.tag-coral{background:var(--coral-soft);color:var(--coral)}.tag-gold{background:var(--gold-soft);color:#c4841d}.ba-grid{display:grid;grid-template-columns:1fr 36px 1fr;gap:0;align-items:stretch}.risk{display:grid;grid-template-columns:1fr 1fr;gap:24px;padding:24px 0;border-bottom:1px solid var(--mist);align-items:start}.risk:last-child{border-bottom:none}.risk-title{font:600 13.5px/1.3 var(--body);color:var(--ink);margin-bottom:5px}.risk-body{font:400 12.5px/1.65 var(--body);color:var(--slate)}.mit-tag{display:inline-block;font:600 8.5px/1 var(--mono);letter-spacing:.06em;padding:3px 7px;border-radius:3px;text-transform:uppercase;margin-bottom:6px}.divider{width:40px;height:2px;background:var(--ink);margin:36px 0}.footer{background:var(--ink);color:rgba(255,255,255,.35);padding:48px 0;text-align:center}.footer-name{font:400 17px/1 var(--display);color:var(--white);margin-bottom:5px}.footer-sub{font:400 10px/1.4 var(--mono);letter-spacing:.04em}.footer-disc{font:400 9px/1.5 var(--mono);max-width:600px;margin:14px auto 0;color:rgba(255,255,255,.18)}@media(max-width:768px){.wrap,.wrap-lg{padding:0 20px}.sect{padding:64px 0}.hero-grid{grid-template-columns:repeat(2,1fr)}.hero-stat::before{display:none}.card-grid,.met-grid{grid-template-columns:1fr}.tier{grid-template-columns:100px 1fr;gap:12px}.risk,.ba-grid{grid-template-columns:1fr}.ba-grid>div:nth-child(2){transform:rotate(90deg);padding:8px 0}}` }} />

    <div className="topbar"><div className="topbar-fill" style={{ width: `${progress}%` }} /></div>
    <nav className="sidenav">{nav.map(([id,label])=>(<div key={id} className={`sidenav-dot${activeNav===id?" on":""}`} data-tip={label} onClick={()=>go(id)} />))}</nav>

    {/* HERO */}
    <section className="hero sect" data-nav="hero">
      <div className="wrap" style={{ position:"relative",zIndex:1 }}>
        <div className="eyebrow" style={{ color:"rgba(108,92,231,.8)" }}>Product Management Case Study · By Chetan Jonnalagadda · March 2026</div>
        <h1 className="h1">Perplexity AI&apos;s<br/><em>$20 Billion</em> Subscription Gamble</h1>
        <p className="hero-sub">Perplexity built the fastest-growing AI subscription business in the world, then silently gutted its Pro plan, swapped premium models for cheaper ones, and pushed users toward a 10× more expensive tier.</p>
        <div className="hero-grid">
          <div className="hero-stat"><div className="hero-stat-val">$20B</div><div className="hero-stat-lbl">Valuation</div><div className="hero-stat-note">$200M raise · Sep 2025</div></div>
          <div className="hero-stat"><div className="hero-stat-val">$148M+</div><div className="hero-stat-lbl">ARR (Mid-2025)</div><div className="hero-stat-note">Sacra estimate · Jun 2025</div></div>
          <div className="hero-stat"><div className="hero-stat-val">20M+</div><div className="hero-stat-lbl">Monthly Users</div><div className="hero-stat-note">Est. 20–30M+ · End 2025</div></div>
          <div className="hero-stat"><div className="hero-stat-val">800%</div><div className="hero-stat-lbl">YoY User Growth</div><div className="hero-stat-note">Incremys · 2024→2025</div></div>
        </div>
        <ProductTimeline />
      </div>
    </section>

    {/* CONTEXT */}
    <section className="sect" data-nav="context">
      <div className="wrap">
        <div className="eyebrow">01 · Company Context</div>
        <h2 className="h2">The Answer Engine That Wants to Be a Platform</h2>
        <p className="lead">Founded in 2022. $1.5B total funding (Bezos, Nvidia, SoftBank, Accel). On the order of ~100 employees, generating hundreds of thousands in revenue per employee based on public ARR estimates.</p>
      </div>
      <div className="wrap-lg">
        <div className="card-grid">
          <div className="card"><div className="card-icon">🔍</div><div className="card-title">Citation-First Search</div><div className="card-body">Every answer includes clickable source citations: verifiability as a core product feature.</div><div className="src">Perplexity product · Wikipedia</div></div>
          <div className="card"><div className="card-icon">🔀</div><div className="card-title">Multi-Model Access</div><div className="card-body">Pro users switch between frontier OpenAI, Anthropic, Google, xAI, and Perplexity Sonar models, all under one $20/mo sub.</div><div className="src">Help Center · XDA Developers</div></div>
          <div className="card"><div className="card-icon">🚀</div><div className="card-title">Aggressive Distribution</div><div className="card-body">Free Pro bundled with Airtel (reported triple-digit India growth), Samsung, T-Mobile, PayPal. Effective CAC reduction via bundling at scale.</div><div className="src">DemandSage · Affiliate Booster</div></div>
        </div>
        <div style={{ marginTop:24 }}><RevenueChart/></div>
        <div className="mockup-row">
          <PplxMockup query="What are the latest AI search market trends?" answer="The AI search market continues rapid expansion. Perplexity leads the citation-first segment with an estimated 20M+ monthly users, while competitors converge on similar approaches..." sources={["TechCrunch","Sacra","DemandSage"]} model="Frontier model" />
          <PplxMockup query="Compare Perplexity Pro vs ChatGPT Plus" answer="Key difference: Perplexity offers multi-model access (OpenAI, Anthropic, Google) for $20/mo. ChatGPT locks you into OpenAI models only..." sources={["XDA Developers","Finout"]} model="Frontier model" />
        </div>
      </div>
      <div className="wrap" style={{ marginTop:16 }}>
        <div className="quote quote-purple"><div className="quote-text">The free tier isn&apos;t charity. It&apos;s a growth engine with a compounding advantage.</div><div className="quote-attr">Sacra · Perplexity revenue analysis, 2025</div></div>
      </div>
    </section>

    {/* PRICING */}
    <section className="sect" style={{ background:"var(--white)" }} data-nav="pricing">
      <div className="wrap">
        <div className="eyebrow">02 · Pricing Architecture</div>
        <h2 className="h2">Six Tiers, One Very Aggressive Upsell</h2>
        <p className="lead">Each tier creates upgrade friction at specific capability boundaries. The 10× jump from Pro to Max is the most aggressive upsell in AI subscriptions.</p>
        <div style={{ marginTop:36 }}>
          <div className="tier"><div><div className="tier-tag" style={{ background:"#e8e6e3",color:"#6b6b6b" }}>FREE</div><div className="tier-price">$0</div></div><div><div className="tier-name">Standard</div><div className="tier-desc">A handful of Pro-style searches/day, no model choice, auto-selected model, limited file uploads, ads may appear.</div></div></div>
          <div className="tier" style={{ border:"2px solid #6C5CE7" }}><div><div className="tier-tag" style={{ background:"#f0eeff",color:"#6C5CE7" }}>MOST POPULAR</div><div className="tier-price">$20<span style={{ font:"400 14px/1 'Sora',sans-serif",color:"#999" }}>/mo</span></div></div><div><div className="tier-name">Pro</div><div className="tier-desc">Frontier OpenAI, Anthropic, Google, and xAI models with per-query switching. ~20 Deep Research/month, generous file uploads, image gen, discounted API access, ad-free.</div></div></div>
          <div className="tier"><div><div className="tier-tag" style={{ background:"#fffbea",color:"#B8860B" }}>POWER</div><div className="tier-price">$200<span style={{ font:"400 14px/1 'Sora',sans-serif",color:"#999" }}>/mo</span></div></div><div><div className="tier-name">Max</div><div className="tier-desc">Frontier reasoning models from OpenAI, Anthropic, and Google. Much higher limits across all features, video generation (limited), significantly discounted API usage.</div></div></div>
          <div className="tier"><div><div className="tier-tag" style={{ background:"#eef3fc",color:"#54A0FF" }}>ENTERPRISE</div><div className="tier-price">$40+<span style={{ font:"400 14px/1 'Sora',sans-serif",color:"#999" }}>/seat</span></div></div><div><div className="tier-name">Enterprise Pro / Max</div><div className="tier-desc">SSO, SCIM, SOC 2 Type II, role-based permissions, internal knowledge search. Higher tiers scale into the low hundreds per seat.</div></div></div>
        </div>
        <div className="insight insight-purple"><div className="insight-lbl" style={{ color:"#6C5CE7" }}>💡 PM Insight</div><div className="insight-body">The 10× jump from Pro to Max is structurally different from ChatGPT&apos;s Plus→Pro. OpenAI offers fundamentally different models. Perplexity&apos;s Max largely <strong>restores</strong> what Pro used to include: a forced upsell, not a premium upgrade.</div></div>
        <ValueGapChart/>
      </div>
    </section>

    {/* FUNNEL */}
    <section className="sect" data-nav="funnel">
      <div className="wrap">
        <div className="eyebrow">03 · Conversion Analysis</div>
        <h2 className="h2">AARRR Framework: How the Funnel Works</h2>
        <p className="lead">~2% free-to-paid conversion from an estimated 20M+ monthly users. Consistent with SaaS benchmarks but room to grow.</p>
      </div>
      <div className="wrap-lg">
        <FunnelChart/>
        <div className="met-grid">
          <div className="met"><div className="met-val">~2%</div><div className="met-lbl">Free→Paid Conversion</div><div className="met-note" style={{ color:"#6C5CE7" }}>600K–800K est. paying subs</div></div>
          <div className="met"><div className="met-val">3–4×</div><div className="met-lbl">India User Growth (YoY)</div><div className="met-note" style={{ color:"#2d8a4e" }}>Reported after Airtel Q2 2025</div></div>
          <div className="met"><div className="met-val">780M</div><div className="met-lbl">Queries (May 2025)</div><div className="met-note" style={{ color:"#54A0FF" }}>~20% MoM growth (est.)</div></div>
        </div>
      </div>
      <div className="wrap" style={{ marginTop:16 }}>
        <div className="insight insight-purple"><div className="insight-lbl" style={{ color:"#6C5CE7" }}>💡 PM Insight</div><div className="insight-body">2% conversion = 98% get value free. Does tightening free-tier limits improve conversion or push users to competitors? The Nov–Feb backlash suggests the latter risk is real.</div></div>
      </div>
    </section>

    {/* COMPETITIVE */}
    <section className="sect" style={{ background:"var(--white)" }} data-nav="compete">
      <div className="wrap">
        <div className="eyebrow">04 · Competitive Positioning</div>
        <h2 className="h2">The $20/Month Battleground</h2>
        <p className="lead">Perplexity occupies a unique position: high transparency + specialized research. But the moat is narrowing.</p>
      </div>
      <div className="wrap-lg">
        <PositioningQuadrant/>
        <div style={{ overflowX:"auto" }}>
          <table className="tbl">
            <thead><tr><th>Capability</th><th>Perplexity Pro</th><th>ChatGPT Plus</th><th>Claude Pro</th><th>Gemini AI Pro</th></tr></thead>
            <tbody>
              <tr><td className="bold">Multi-Model</td><td className="g">✓ 4+ models</td><td className="r">✗ OpenAI only</td><td className="r">✗ Anthropic only</td><td className="r">✗ Google only</td></tr>
              <tr><td className="bold">Citations</td><td className="g">✓ Every response</td><td className="a">Limited</td><td className="g">✓ Research mode</td><td className="g">✓ Deep Research</td></tr>
              <tr><td className="bold">Image Gen</td><td className="g">✓</td><td className="g">✓ DALL-E</td><td className="r">✗</td><td className="g">✓</td></tr>
              <tr><td className="bold">Voice</td><td className="a">Limited</td><td className="g">✓ Advanced</td><td className="a">Limited</td><td className="g">✓ Gemini Live</td></tr>
              <tr><td className="bold">Ecosystem</td><td className="a">Standalone</td><td className="a">Moderate</td><td className="a">Moderate</td><td className="g">✓ Full Google</td></tr>
              <tr><td className="bold">Best For</td><td style={{ fontWeight:600,color:"#6C5CE7" }}>Research</td><td style={{ fontWeight:600,color:"#1a1a1a" }}>General-purpose</td><td style={{ fontWeight:600,color:"#1a1a1a" }}>Writing & code</td><td style={{ fontWeight:600,color:"#1a1a1a" }}>Google users</td></tr>
            </tbody>
          </table>
        </div>
        <div className="src" style={{ marginTop:8 }}>XDA Developers (Feb 2026): &quot;Perplexity broke the mold, but that&apos;s not enough when the tool started lying about which model it was using.&quot;</div>
      </div>
      <div className="wrap" style={{ marginTop:16 }}>
        <div className="insight insight-teal"><div className="insight-lbl" style={{ color:"#00B4D8" }}>🎯 Key Takeaway</div><div className="insight-body">Perplexity currently leads in &quot;high transparency + specialized research.&quot; But OpenAI&apos;s SearchGPT, Google&apos;s Deep Research, and Claude&apos;s Research mode are converging. The moat may be narrower than a $20B valuation implies.</div></div>
      </div>
    </section>

    {/* CRISIS */}
    <section className="sect" data-nav="crisis">
      <div className="wrap">
        <div className="eyebrow" style={{ color:"#FF6B6B" }}>05 · The Trust Crisis</div>
        <h2 className="h2">The Silent Downgrade (Nov 2025 – Feb 2026)</h2>
        <p className="lead">Not a feature launch. A trust breach at the core of Perplexity&apos;s value proposition.</p>
        <div style={{ marginTop:36 }}>
          <div className="pain"><div className="pain-bar" style={{ background:"#FF6B6B" }}/><div><div className="pain-head"><span className="pain-title">Deep Research Quotas Slashed</span><span className="tag tag-coral">Critical</span></div><div className="body">Dropped from hundreds of runs to ~20/month, on the order of a ~95–97% reduction vs earlier marketing promises.</div></div></div>
          <div className="pain"><div className="pain-bar" style={{ background:"#FF6B6B" }}/><div><div className="pain-head"><span className="pain-title">Silent Model Substitution</span><span className="tag tag-coral">Critical</span></div><div className="body">Queries routed to cheaper models (Haiku, Flash) while interface showed premium ones. CEO called it a &quot;bug,&quot; but many users perceived the downgrading as deliberate cost optimization.</div><div className="src">Remio.ai, XDA Developers, MakeUseOf · Nov 2025–Feb 2026</div></div></div>
          <div className="pain"><div className="pain-bar" style={{ background:"#c4841d" }}/><div><div className="pain-head"><span className="pain-title">Zero Communication</span><span className="tag tag-gold">High</span></div><div className="body">Annual subs who prepaid $200 got no notice. 72-hour refund window made recourse nearly impossible.</div></div></div>
        </div>
        <div className="quote quote-coral"><div className="quote-text">Perplexity quietly gutted the usage limits on its Pro plan, swapped the models running under the hood, and redesigned the interface, all without sending so much as an email to the people who already paid.</div><div className="quote-attr">MakeUseOf · February 2026</div></div>
        <DowngradeBA/>
        <div className="divider"/>
        <h3 style={{ font:"400 24px/1.2 'Fraunces',serif",color:"#1a1a1a",marginBottom:14 }}>How Competitors Handle Limits</h3>
        <table className="tbl">
          <thead><tr><th>Company</th><th>Approach</th><th>Communication</th></tr></thead>
          <tbody>
            <tr><td className="bold">Anthropic</td><td>Clear daily caps per model tier</td><td className="g">Published upfront</td></tr>
            <tr><td className="bold">OpenAI</td><td>Raised Plus to $22, defined caps</td><td className="g">Advance notice</td></tr>
            <tr><td className="bold">Google</td><td>Specifies &quot;high limits,&quot; explains when hit</td><td className="g">Transparent</td></tr>
            <tr><td className="bold">Perplexity</td><td>Dynamic limits, secret model swap</td><td className="r">Silent enforcement</td></tr>
          </tbody>
        </table>
        <div className="insight insight-coral"><div className="insight-lbl" style={{ color:"#FF6B6B" }}>⚠️ Red Flag</div><div className="insight-body">Textbook case of optimizing short-term unit economics at the expense of long-term trust. The subreddit was &quot;a bloodbath.&quot; XDA reviewer: went &quot;from one of my favorites to one I never reach for anymore.&quot;</div></div>
      </div>
    </section>

    {/* FINANCIALS */}
    <section className="sect" style={{ background:"var(--white)" }} data-nav="finance">
      <div className="wrap">
        <div className="eyebrow">06 · Financial Trajectory</div>
        <h2 className="h2">Fast Growth, Fragile Economics</h2>
        <p className="lead">Internal $656M ARR target for 2026 would require ~3.3× growth in 12 months, without ad revenue, which was abandoned February 2026.</p>
        <div className="met-grid">
          <div className="met"><div className="met-val">$750M</div><div className="met-lbl">Azure Commitment</div><div className="met-note" style={{ color:"#FF6B6B" }}>3-year deal · Jan 2026</div></div>
          <div className="met"><div className="met-val">~$20K</div><div className="met-lbl">Total Ad Revenue &apos;24</div><div className="met-note" style={{ color:"#FF6B6B" }}>Out of ~$34M total · Sacra</div></div>
          <div className="met"><div className="met-val">TBD</div><div className="met-lbl">IPO Timeline</div><div className="met-note" style={{ color:"#6C5CE7" }}>No IPO planned near term · CEO</div></div>
        </div>
        <div className="insight insight-gold"><div className="insight-lbl" style={{ color:"#B8860B" }}>💡 PM Insight</div><div className="insight-body">The reported $656M internal target requires massive conversion improvement OR enterprise adoption OR both. Running inference across 4+ providers at $20/mo may not be structurally sustainable. Max ($200/mo) and high-tier enterprise seats are the real margin levers.</div></div>
      </div>
    </section>

    {/* RISKS */}
    <section className="sect" data-nav="risks">
      <div className="wrap">
        <div className="eyebrow">07 · Risks & Strategic Expansion</div>
        <h2 className="h2">What Could Go Wrong (and What&apos;s Next)</h2>
        <div style={{ marginTop:28 }}>
          <div className="risk"><div><div className="risk-title">Trust Erosion from Silent Downgrades</div><div className="risk-body">Brand damaged exactly where value prop depends on credibility.</div></div><div><div className="mit-tag" style={{ background:"#e6f9fc",color:"#00B4D8" }}>Expansion</div><div className="risk-body"><strong>Comet Browser</strong> (Jul 2025): AI-native Chromium. Perplexity has pledged tens of millions (~$40M+) in publisher revenue-sharing.</div></div></div>
          <div className="risk"><div><div className="risk-title">Copyright Lawsuits (NYT, News Corp, BBC)</div><div className="risk-body">Crawlers reportedly bypass robots.txt. Amazon filed suit over agentic shopping features; legal pressure ongoing.</div></div><div><div className="mit-tag" style={{ background:"#e6f9fc",color:"#00B4D8" }}>Expansion</div><div className="risk-body"><strong>Perplexity Computer</strong> (Feb 2026): Agentic multi-model workspace, CrowdStrike security partnership.</div></div></div>
          <div className="risk"><div><div className="risk-title">Competitors Converging on Citation Search</div><div className="risk-body">SearchGPT, Google AI Overviews, Claude Research: closing the gap.</div></div><div><div className="mit-tag" style={{ background:"#e6f9fc",color:"#00B4D8" }}>Expansion</div><div className="risk-body"><strong>Personal Computer</strong> (announced Mar 2026): Persistent agent concept for Mac mini + personal data integrations.</div></div></div>
          <div className="risk"><div><div className="risk-title">Unit Economics at $20/mo</div><div className="risk-body">$750M Azure + multi-provider costs vs ~$200M ARR. VC-subsidized.</div></div><div><div className="mit-tag" style={{ background:"#e6f9fc",color:"#00B4D8" }}>Expansion</div><div className="risk-body"><strong>Enterprise</strong>: Large multi-year contracts with major social and hardware companies. Samsung bundling. Enterprise Max pricing scales into low hundreds/seat.</div></div></div>
        </div>
      </div>
    </section>

    {/* VERDICT */}
    <section className="sect" style={{ background:"var(--white)" }} data-nav="verdict">
      <div className="wrap">
        <div className="eyebrow">08 · Verdict & PM Recommendations</div>
        <h2 className="h2">If I Were Advising Perplexity</h2>
        <p className="lead">The product is strong. The economics are fragile. The trust is damaged.</p>
        <div style={{ marginTop:36 }}>
          {[
            { icon:"🔓",title:"Rebuild Trust",body:"Publish clear limits for every tier. Real-time usage dashboards. Grandfather annual subs at original terms.",tag:"P0 · IMMEDIATE" },
            { icon:"🔍",title:"Transparent Model Routing",body:"Always display the actual model used. If fallback occurs, notify in real-time and let users retry.",tag:"P0 · IMMEDIATE" },
            { icon:"💰",title:"Bridge the 10× Gap",body:"Introduce Pro+ at $50–80/month. The $20→$200 jump creates resentment and leaves money on the table.",tag:"P1 · Q2 2026" },
            { icon:"🏢",title:"Double Down on Enterprise",body:"Unit economics work at enterprise seat pricing ($40+/seat). Invest in SOC 2, HIPAA, vertical compliance.",tag:"P1 · ONGOING" },
            { icon:"🛡️",title:"Defend the Moat",body:"As competitors add citations, widen the gap: source analysis, provenance tracking, trust scores.",tag:"P2 · STRATEGIC" },
          ].map((r,i)=>(
            <div key={i} style={{ background:"#faf9f7",borderRadius:10,padding:"22px 28px",marginBottom:12,border:"1px solid rgba(0,0,0,.05)" }}>
              <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:6,flexWrap:"wrap" }}>
                <span style={{ fontSize:18 }}>{r.icon}</span>
                <span style={{ font:"600 14px/1.3 'Sora',sans-serif",color:"#1a1a1a",flex:1,minWidth:120 }}>{r.title}</span>
                <span style={{ font:"600 8.5px/1 'IBM Plex Mono',monospace",letterSpacing:".06em",padding:"3px 7px",borderRadius:3,background:"#f0eeff",color:"#6C5CE7",textTransform:"uppercase",flexShrink:0 }}>{r.tag}</span>
              </div>
              <div className="body">{r.body}</div>
            </div>
          ))}
        </div>
        <div className="quote quote-purple" style={{ marginTop:32 }}><div className="quote-text">What happens next depends on whether Perplexity treats its Pro subscribers as a community to rebuild with, or as a funnel to extract from.</div><div className="quote-attr">Final assessment · March 2026</div></div>
      </div>
    </section>

    <footer className="footer"><div className="wrap">
      <div className="footer-name">Chetan Jonnalagadda · Product Case Study</div>
      <div className="footer-sub">Perplexity AI · Pro vs. Free Tier · March 2026</div>
      <div className="footer-disc">Sources: TechCrunch, Sacra, Wikipedia, MakeUseOf, XDA Developers, DemandSage, Perplexity Help Center, SiliconANGLE, Dorianbarker.com, AICerts News, Remio.ai, CNBC, Fortune, Digiday, Benzinga, Business Standard. Cross-referenced across 15+ sources.</div>
    </div></footer>
  </>);
};

export default App;
