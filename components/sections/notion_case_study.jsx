'use client';

import { useState, useEffect } from "react";

const Phone = ({ children, label }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
    <div style={{ width: 216, minHeight: 400, background: "#fff", borderRadius: 28, border: "2.5px solid #191919", padding: "34px 0 18px", position: "relative", boxShadow: "0 12px 40px rgba(0,0,0,.12)", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 56, height: 5, borderRadius: 3, background: "#191919" }} />
      <div style={{ padding: "0 10px" }}>{children}</div>
      <div style={{ position: "absolute", bottom: 5, left: "50%", transform: "translateX(-50%)", width: 44, height: 4, borderRadius: 2, background: "#ddd" }} />
    </div>
    {label && <div style={{ font: "500 10px/1 'IBM Plex Mono',monospace", letterSpacing: ".06em", color: "#999", textTransform: "uppercase", textAlign: "center", maxWidth: 210 }}>{label}</div>}
  </div>
);
const NBar = ({ children }) => (<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 2px 8px", borderBottom: "1px solid #f0eeeb" }}>{children}</div>);
const NIcon = ({ children, s = 10 }) => (<span style={{ fontSize: s, lineHeight: 1, opacity: 0.5 }}>{children}</span>);
const NPageTitle = ({ children }) => (<div style={{ font: "700 11px/1.2 'Fraunces',Georgia,serif", color: "#191919", padding: "6px 0 4px" }}>{children}</div>);
const NText = ({ children, c = "#787774", s = 7 }) => (<div style={{ font: `400 ${s}px/1.5 'Sora',system-ui,sans-serif`, color: c }}>{children}</div>);
const NBlock = ({ children, handle = false }) => (<div style={{ display: "flex", alignItems: "flex-start", gap: 3, padding: "2px 0" }}>{handle && <span style={{ font: "400 6px/1 monospace", color: "#ccc", marginTop: 2 }}>⋮⋮</span>}<div style={{ flex: 1 }}>{children}</div></div>);
const NLine = ({ w = "100%", c = "#e8e5e0" }) => <div style={{ width: w, height: 3, borderRadius: 2, background: c, margin: "1.5px 0" }} />;
const NBreadcrumb = ({ items }) => (<div style={{ display: "flex", alignItems: "center", gap: 2, padding: "2px 0 4px" }}>{items.map((item, i) => (<span key={i} style={{ font: "400 6px/1 'Sora',sans-serif", color: i === items.length - 1 ? "#191919" : "#b4b0a8" }}>{i > 0 && <span style={{ margin: "0 2px", color: "#d3d0ca" }}>/</span>}{item}</span>))}</div>);
const NDbRow = ({ title, status, color = "#e8e5e0" }) => (<div style={{ display: "flex", alignItems: "center", padding: "4px 0", borderBottom: "1px solid #f7f6f3" }}><div style={{ width: 10, height: 10, borderRadius: 2, border: "1.5px solid #d3d0ca", marginRight: 5, flexShrink: 0 }} /><NText s={7} c="#37352f">{title}</NText><div style={{ marginLeft: "auto" }}><span style={{ font: "500 5.5px/1 'Sora',sans-serif", color: "#fff", background: color, padding: "2px 5px", borderRadius: 3 }}>{status}</span></div></div>);
const NToolbarBtn = ({ children, active = false }) => (<div style={{ width: 20, height: 20, borderRadius: 4, background: active ? "#2f80ed" : "#fff", border: active ? "none" : "1px solid #e8e5e0", display: "flex", alignItems: "center", justifyContent: "center", font: "600 7px/1 'Sora',sans-serif", color: active ? "#fff" : "#37352f" }}>{children}</div>);

const RevenueChart = () => (
  <div style={{ background: "#fff", borderRadius: 10, padding: "28px 24px 20px", border: "1px solid rgba(0,0,0,.05)" }}>
    <div style={{ font: "500 9.5px/1 'IBM Plex Mono',monospace", letterSpacing: ".08em", color: "#999", textTransform: "uppercase", marginBottom: 16 }}>Notion Annual Revenue Growth</div>
    <svg viewBox="0 0 400 200" width="100%" style={{ maxWidth: 400 }}>
      {[0, 125, 250, 375, 500].map((v, i) => (
        <g key={i}><line x1="48" y1={170 - (v / 550) * 150} x2="380" y2={170 - (v / 550) * 150} stroke="#e8e6e3" strokeWidth="1" /><text x="42" y={174 - (v / 550) * 150} textAnchor="end" fontSize="9" fontFamily="'IBM Plex Mono',monospace" fill="#999">${v}M</text></g>
      ))}
      {[{ y: "'22", v: 67, l: "$67M" }, { y: "'23", v: 250, l: "$250M" }, { y: "'24", v: 400, l: "$400M" }, { y: "'25", v: 500, l: "$500M+" }].map((d, i) => {
        const h = (d.v / 550) * 150;
        const x = 60 + i * 82;
        return (<g key={i}><rect x={x} y={170 - h} width="44" height={h} rx="4" fill={i === 3 ? "#d94f3f" : "#1a1a1a"} /><text x={x + 22} y={164 - h} textAnchor="middle" fontSize="10" fontFamily="Sora,sans-serif" fontWeight="600" fill={i === 3 ? "#d94f3f" : "#1a1a1a"}>{d.l}</text><text x={x + 22} y={186} textAnchor="middle" fontSize="10" fontFamily="'IBM Plex Mono',monospace" fill="#6b6b6b">{d.y}</text></g>);
      })}
    </svg>
    <div style={{ font: "400 9px/1 'IBM Plex Mono',monospace", color: "#bbb", marginTop: 8 }}>Sources: CNBC ($500M+ confirmed), Sacra, SaaStr, Forbes · Higher estimates are analyst projections</div>
  </div>
);

const NotionCaseStudy = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeNav, setActiveNav] = useState("hero");
  useEffect(() => {
    const fn = () => {
      setScrollY(window.scrollY);
      document.querySelectorAll("[data-nav]").forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= 180 && r.bottom >= 180) setActiveNav(s.dataset.nav);
      });
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const progress = typeof document !== "undefined" ? Math.min((scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100) : 0;
  const nav = [["hero","Top"],["context","Context"],["problem","Problem"],["research","Research"],["circles","Framework"],["solution","Solutions"],["metrics","Metrics"],["risks","Risks"]];
  const go = (id) => document.querySelector(`[data-nav="${id}"]`)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,600&family=Sora:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        :root{--black:#0a0a0a;--ink:#1a1a1a;--charcoal:#2d2d2d;--slate:#6b6b6b;--ash:#999;--mist:#e8e6e3;--cream:#f5f3f0;--paper:#faf9f7;--white:#fff;--red:#d94f3f;--red-soft:#fef2f0;--blue:#3366cc;--blue-soft:#eef3fc;--green:#2d8a4e;--green-soft:#edf7f0;--amber:#c4841d;--amber-soft:#fef8ee;--display:'Fraunces',serif;--body:'Sora',sans-serif;--mono:'IBM Plex Mono',monospace}
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}body{font-family:var(--body);background:var(--paper);color:var(--ink);-webkit-font-smoothing:antialiased;line-height:1.6}
        .topbar{position:fixed;top:0;left:0;right:0;height:3px;z-index:900;background:var(--mist)}.topbar-fill{height:100%;background:var(--black);transition:width 60ms linear}
        .sidenav{position:fixed;left:28px;top:50%;transform:translateY(-50%);z-index:800;display:flex;flex-direction:column;gap:14px}.sidenav-dot{width:6px;height:6px;border-radius:50%;border:1.5px solid var(--ash);background:transparent;cursor:pointer;transition:all .25s;position:relative}.sidenav-dot.on{background:var(--black);border-color:var(--black);transform:scale(1.6)}.sidenav-dot:hover::after{content:attr(data-tip);position:absolute;left:18px;top:50%;transform:translateY(-50%);font:500 10px/1 var(--mono);letter-spacing:.06em;white-space:nowrap;color:var(--charcoal);background:var(--white);padding:5px 10px;border-radius:4px;box-shadow:0 2px 12px rgba(0,0,0,.07)}@media(max-width:1100px){.sidenav{display:none}}
        .wrap{max-width:820px;margin:0 auto;padding:0 32px}.wrap-lg{max-width:1040px;margin:0 auto;padding:0 32px}.sect{padding:96px 0}
        .eyebrow{font:500 10.5px/1.2 var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--red);margin-bottom:14px}
        .h1{font:400 clamp(40px,5.5vw,68px)/1.06 var(--display);color:var(--white);margin-bottom:24px}.h1 em{font-style:italic;color:var(--red);font-weight:600}
        .h2{font:400 clamp(30px,3.8vw,44px)/1.12 var(--display);color:var(--ink);margin-bottom:16px}
        .lead{font:300 17px/1.75 var(--body);color:var(--slate);max-width:600px}.body{font:400 14.5px/1.72 var(--body);color:var(--slate)}
        .caption{font:500 10px/1.3 var(--mono);letter-spacing:.06em;color:var(--ash)}.src{display:inline-block;font:400 9.5px/1 var(--mono);letter-spacing:.04em;color:var(--ash);background:rgba(0,0,0,.03);padding:3px 8px;border-radius:3px;margin-top:8px}
        .hero{min-height:100vh;background:var(--black);color:var(--white);display:flex;align-items:center;position:relative;overflow:hidden}.hero::before{content:'';position:absolute;top:-30%;right:-15%;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(217,79,63,.1) 0%,transparent 65%);pointer-events:none}
        .hero-sub{font:300 17px/1.7 var(--body);color:rgba(255,255,255,.55);max-width:540px;margin-bottom:56px}
        .hero-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border-top:1px solid rgba(255,255,255,.1)}.hero-stat{padding:28px 24px;position:relative}.hero-stat:not(:first-child)::before{content:'';position:absolute;left:0;top:16px;bottom:16px;width:1px;background:rgba(255,255,255,.1)}.hero-stat:first-child{padding-left:0}.hero-stat-val{font:400 32px/1 var(--display);color:var(--white);margin-bottom:6px}.hero-stat-lbl{font:500 9.5px/1.3 var(--mono);letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.35)}.hero-stat-note{font:400 9px/1.3 var(--mono);color:rgba(255,255,255,.2);margin-top:4px}
        .card{background:var(--white);border-radius:10px;padding:32px;border:1px solid rgba(0,0,0,.05)}.card:hover{box-shadow:0 6px 24px rgba(0,0,0,.04)}.card-grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px;align-items:stretch}.card-icon{font-size:24px;margin-bottom:16px}.card-title{font:600 15px/1.3 var(--body);color:var(--ink);margin-bottom:8px}.card-body{font:400 13.5px/1.65 var(--body);color:var(--slate)}
        .pain{background:var(--white);border-radius:10px;padding:28px 32px;border:1px solid rgba(0,0,0,.05);margin-bottom:14px;display:grid;grid-template-columns:3px 1fr;gap:24px}.pain-bar{border-radius:2px}.pain-head{display:flex;align-items:center;gap:10px;margin-bottom:8px;flex-wrap:wrap}.pain-title{font:600 15px/1.3 var(--body);color:var(--ink)}.tag{font:600 9px/1 var(--mono);letter-spacing:.06em;padding:4px 8px;border-radius:3px;text-transform:uppercase}.tag-red{background:var(--red-soft);color:var(--red)}.tag-amber{background:var(--amber-soft);color:var(--amber)}.tag-blue{background:var(--blue-soft);color:var(--blue)}
        .quote{position:relative;padding:36px 40px 36px 48px;background:var(--white);border-radius:10px;margin:40px 0;border:1px solid rgba(0,0,0,.05)}.quote::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--red);border-radius:10px 0 0 10px}.quote-text{font:400 18px/1.6 var(--display);color:var(--charcoal);font-style:italic}.quote-attr{font:400 10.5px/1 var(--mono);color:var(--ash);margin-top:14px;letter-spacing:.03em}
        .persona-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:32px;align-items:stretch}.persona{background:var(--white);border-radius:10px;padding:28px;border:1px solid rgba(0,0,0,.05)}.persona-icon{font-size:28px;margin-bottom:14px}.persona-name{font:600 15px/1.3 var(--body);color:var(--ink);margin-bottom:3px}.persona-role{font:500 10px/1.3 var(--mono);color:var(--ash);letter-spacing:.04em;margin-bottom:14px}.persona-text{font:400 13px/1.65 var(--body);color:var(--slate)}
        .tbl{width:100%;border-collapse:collapse;margin-top:28px;font-size:13px}.tbl th{font:600 9px/1 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--ash);text-align:left;padding:10px 14px;border-bottom:2px solid var(--ink)}.tbl td{padding:12px 14px;border-bottom:1px solid var(--mist);font:400 13px/1.5 var(--body);color:var(--slate)}.tbl tr:hover td{background:rgba(0,0,0,.01)}.tbl .g{color:var(--green);font-weight:500}.tbl .r{color:var(--red);font-weight:500}.tbl .a{color:var(--amber);font-weight:500}.tbl .bold{font-weight:600;color:var(--ink)}
        .cstep{display:grid;grid-template-columns:48px 1fr;gap:20px;padding:32px 0;border-bottom:1px solid var(--mist)}.cstep:last-child{border-bottom:none}.cletter{width:48px;height:48px;border-radius:12px;background:var(--ink);color:var(--white);display:flex;align-items:center;justify-content:center;font:400 22px/1 var(--display);flex-shrink:0}.cstep-title{font:600 16px/1.3 var(--body);color:var(--ink);margin-bottom:6px}.cstep-body{font:400 14px/1.7 var(--body);color:var(--slate)}
        .sol{background:var(--white);border-radius:12px;padding:36px;border:1px solid rgba(0,0,0,.05);margin-bottom:18px}.sol-phase{font:600 9.5px/1 var(--mono);letter-spacing:.1em;text-transform:uppercase;margin-bottom:10px}.sol-title{font:400 24px/1.2 var(--display);color:var(--ink);margin-bottom:10px}.sol-desc{font:400 14px/1.7 var(--body);color:var(--slate);margin-bottom:24px}.sol-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;align-items:stretch}.sol-detail{background:var(--cream);border-radius:8px;padding:14px 18px}.sol-detail-lbl{font:500 9px/1 var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--ash);margin-bottom:5px}.sol-detail-val{font:500 13px/1.5 var(--body);color:var(--charcoal)}
        .rice{width:100%;border-collapse:collapse;margin:32px 0}.rice th{font:600 9px/1 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--ash);text-align:left;padding:10px 12px;border-bottom:2px solid var(--ink)}.rice td{padding:12px;border-bottom:1px solid var(--mist);font:400 13px/1.4 var(--body);color:var(--slate)}.rice .score{font:600 14px/1 var(--mono);color:var(--blue)}.rice .fname{font-weight:600;color:var(--ink)}
        .met-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px;align-items:stretch}.met{background:var(--white);border-radius:10px;padding:28px;border:1px solid rgba(0,0,0,.05);text-align:center}.met-val{font:400 34px/1 var(--display);color:var(--ink);margin-bottom:6px}.met-lbl{font:400 13px/1.4 var(--body);color:var(--slate);margin-bottom:4px}.met-note{font:500 9.5px/1 var(--mono);color:var(--green);letter-spacing:.03em}
        .risk{display:grid;grid-template-columns:1fr 1fr;gap:28px;padding:28px 0;border-bottom:1px solid var(--mist);align-items:start}.risk:last-child{border-bottom:none}.risk-title{font:600 14px/1.3 var(--body);color:var(--ink);margin-bottom:6px}.risk-body{font:400 13px/1.65 var(--body);color:var(--slate)}.mit-tag{display:inline-block;font:600 9px/1 var(--mono);letter-spacing:.06em;padding:3px 8px;border-radius:3px;background:var(--green-soft);color:var(--green);margin-bottom:8px;text-transform:uppercase}
        .flow{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin:20px 0}.flow-s{font:500 11px/1 var(--mono);padding:8px 14px;border-radius:6px;background:var(--white);border:1px solid var(--mist);color:var(--charcoal)}.flow-s.bad{border-color:var(--red);background:var(--red-soft);color:var(--red)}.flow-s.good{border-color:var(--green);background:var(--green-soft);color:var(--green)}.flow-a{color:var(--ash);font-size:14px}
        .divider{width:40px;height:2px;background:var(--ink);margin:40px 0}
        .wireframe-row{display:flex;gap:20px;justify-content:center;flex-wrap:wrap;margin:32px 0}
        .ba-grid{display:grid;grid-template-columns:1fr 40px 1fr;gap:0;align-items:center;margin:32px 0}.ba-card{background:var(--white);border-radius:10px;padding:24px;border:1px solid rgba(0,0,0,.05)}.ba-arrow{text-align:center;font-size:20px;color:var(--ash)}
        .footer{background:var(--ink);color:rgba(255,255,255,.35);padding:56px 0;text-align:center}.footer-name{font:400 18px/1 var(--display);color:var(--white);margin-bottom:6px}.footer-sub{font:400 10px/1.4 var(--mono);letter-spacing:.04em}.footer-disc{font:400 9.5px/1.5 var(--mono);max-width:560px;margin:16px auto 0;color:rgba(255,255,255,.2)}
        @media(max-width:768px){.wrap,.wrap-lg{padding:0 20px}.sect{padding:64px 0}.hero-grid{grid-template-columns:repeat(2,1fr)}.hero-stat{border-right:none}.hero-stat::before{display:none}.card-grid-3,.persona-grid,.met-grid{grid-template-columns:1fr}.sol-grid,.risk{grid-template-columns:1fr}.cstep{grid-template-columns:40px 1fr;gap:14px}.cletter{width:40px;height:40px;font-size:18px;border-radius:10px}.wireframe-row{flex-direction:column;align-items:center}.ba-grid{grid-template-columns:1fr}.ba-arrow{transform:rotate(90deg);padding:10px 0}}
      `}} />

      <div className="topbar"><div className="topbar-fill" style={{ width: `${progress}%` }} /></div>
      <nav className="sidenav">{nav.map(([id, label]) => (<div key={id} className={`sidenav-dot${activeNav === id ? " on" : ""}`} data-tip={label} onClick={() => go(id)} />))}</nav>

      {/* HERO */}
      <section className="hero sect" data-nav="hero">
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div className="eyebrow" style={{ color: "rgba(217,79,63,.8)" }}>Product Case Study · February 2026</div>
          <h1 className="h1">Notion's Mobile App:<br />An <em>$11 Billion</em> Weak Link</h1>
          <p className="hero-sub">100 million users trust Notion as their all-in-one workspace. But on mobile, where over 60% of global web traffic now lives, the experience fractures. Slow loads, accidental edits, crippled offline, and missing features turn a power tool into a liability.</p>
          <div className="hero-grid">
            <div className="hero-stat"><div className="hero-stat-val">100M+</div><div className="hero-stat-lbl">Total Users</div><div className="hero-stat-note">Notion blog · July 2024</div></div>
            <div className="hero-stat"><div className="hero-stat-val">$500M+</div><div className="hero-stat-lbl">Annual Revenue</div><div className="hero-stat-note">CNBC confirmed · Sept 2025</div></div>
            <div className="hero-stat"><div className="hero-stat-val">$11B</div><div className="hero-stat-lbl">Valuation</div><div className="hero-stat-note">Tender offer · Jan 2026</div></div>
            <div className="hero-stat"><div className="hero-stat-val">4M+</div><div className="hero-stat-lbl">Paying Customers</div><div className="hero-stat-note">Latka, SaaStr · 2025</div></div>
          </div>
        </div>
      </section>

      {/* CONTEXT */}
      <section className="sect" data-nav="context">
        <div className="wrap">
          <div className="eyebrow">01 · Company Context</div>
          <h2 className="h2">The "Everything App" at a Crossroads</h2>
          <p className="lead">Notion grew from $67M ARR (2022) to $500M+ (2025), roughly 7.5× in three years. Teams at over 50% of Fortune 500 companies use Notion. Bloomberg reports a potential IPO as early as end of 2026. But a critical gap threatens the expansion story.</p>
        </div>
        <div className="wrap-lg">
          <div className="card-grid-3">
            <div className="card"><div className="card-icon">📈</div><div className="card-title">Hypergrowth Revenue</div><div className="card-body">$67M (2022) → $250M (2023) → $400M (2024) → $500M+ confirmed (2025). Over 50% of ARR from AI-enabled customers. Profitable with more cash than the $343M total raised.</div><div className="src">CNBC, Sacra, Notion blog Jan 2026</div></div>
            <div className="card"><div className="card-icon">🤖</div><div className="card-title">AI-First Pivot</div><div className="card-body">Notion 3.0 (Sept 18, 2025) launched autonomous AI Agents. May 2025 restructure bundled AI into Business tier ($20/user/mo) only, eliminating the $8/user add-on. Significant backlash.</div><div className="src">Notion release notes, Trustpilot</div></div>
            <div className="card"><div className="card-icon">🏢</div><div className="card-title">Enterprise & IPO</div><div className="card-body">$11B valuation via Jan 2026 tender (GIC, Sequoia, Index). Bloomberg reports potential IPO by end of 2026. Named customers: NVIDIA, Kaiser Permanente, Volvo.</div><div className="src">Notion blog Jan 2026, Bloomberg</div></div>
          </div>
          <div style={{ marginTop: 24 }}><RevenueChart /></div>
        </div>
        <div className="wrap" style={{ marginTop: 32 }}>
          <div className="quote"><div className="quote-text">They pivot projects and features without finishing them. Notion Mail, Notion AI, now agents — yet still can't work offline properly. Migrating off as soon as possible.</div><div className="quote-attr">Representative composite · Trustpilot (2.5/5, 387 reviews), Feb 2026</div></div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="sect" style={{ background: "var(--white)" }} data-nav="problem">
        <div className="wrap">
          <div className="eyebrow">02 · Problem Definition</div>
          <h2 className="h2">A Desktop Masterpiece Trapped on Small Screens</h2>
          <p className="lead">Mobile UX surfaces as one of the most common complaints across Capterra, G2, Software Advice, and Trustpilot. A growing share of young users are mobile-first or mobile-only for internet access.</p>
          <div style={{ marginTop: 40 }}>
            <div className="pain"><div className="pain-bar" style={{ background: "var(--red)" }} /><div><div className="pain-head"><span className="pain-title">Slow Load Times & Input Lag</span><span className="tag tag-red">Critical</span></div><div className="body">In a 2020 analysis, 3perf found Notion's JS bundle took 4.9s to execute on a Nexus 5. While Notion has since improved performance, its web-wrapper architecture remains a mobile bottleneck. Pages with databases can still feel noticeably slow, a recurring review complaint.</div><div className="src">3perf.com (2020) · XDA Developers 2025 · Hackceleration 2026</div></div></div>
            <div className="pain"><div className="pain-bar" style={{ background: "var(--red)" }} /><div><div className="pain-head"><span className="pain-title">Accidental Edits with No Safety Net</span><span className="tag tag-red">Critical</span></div><div className="body">Notion engineer "jitl" on Hacker News: "It's really the accidental edits at the root of the problem." Always-editable blocks + touchscreen = deleted content, moved blocks, overwritten text.</div><div className="src">Hacker News (Notion employee, Dec 2020) · GetInflow.io</div></div></div>
            <div className="pain"><div className="pain-bar" style={{ background: "var(--amber)" }} /><div><div className="pain-head"><span className="pain-title">Missing Desktop Features</span><span className="tag tag-amber">High</span></div><div className="body">No side peek. Calendar = dots only. No slash commands. Columns unsupported. Text highlighting: 4 taps through nested menus. Confirmed in Notion's Help Center.</div><div className="src">Notion Help Center · GetInflow.io · Capterra 2026</div></div></div>
            <div className="pain"><div className="pain-bar" style={{ background: "var(--amber)" }} /><div><div className="pain-head"><span className="pain-title">Offline: Launched but Crippled</span><span className="tag tag-amber">High</span></div><div className="body">Launched Aug 19, 2025. Constraints: pages pre-marked per device, databases capped at 50 rows offline, and AI, embeds, and forms break entirely.</div><div className="src">TechCrunch Aug 2025 · NotionBackups.com · Release notes</div></div></div>
            <div className="pain"><div className="pain-bar" style={{ background: "var(--blue)" }} /><div><div className="pain-head"><span className="pain-title">Navigation Complexity</span><span className="tag tag-blue">Medium</span></div><div className="body">Deep hierarchies disorienting on small screens. GetInflow.io advises: "skip the mobile version" until you master desktop. Herdr Blog lists this in top 5 complaints.</div><div className="src">GetInflow.io · Herdr Blog · Capterra reviews</div></div></div>
          </div>
          <div className="ba-grid" style={{ marginTop: 40 }}>
            <div className="ba-card"><div className="caption" style={{ marginBottom: 10, color: "var(--red)" }}>❌ CURRENT: HIGHLIGHT TEXT (4 STEPS)</div><div className="flow"><div className="flow-s">Select</div><div className="flow-a">→</div><div className="flow-s bad">Scroll toolbar</div><div className="flow-a">→</div><div className="flow-s bad">Tap style</div><div className="flow-a">→</div><div className="flow-s bad">Pick color</div></div></div>
            <div className="ba-arrow">→</div>
            <div className="ba-card"><div className="caption" style={{ marginBottom: 10, color: "var(--green)" }}>✓ PROPOSED: HIGHLIGHT TEXT (2 STEPS)</div><div className="flow"><div className="flow-s">Select</div><div className="flow-a">→</div><div className="flow-s good">Tap color in smart toolbar</div></div></div>
          </div>
        </div>
      </section>

      {/* RESEARCH */}
      <section className="sect" data-nav="research">
        <div className="wrap">
          <div className="eyebrow">03 · User Research & Competitive Analysis</div>
          <h2 className="h2">Who's Hurting, Who's Winning</h2>
          <p className="lead">Notion's mobile pain hits three segments that each represent a distinct revenue risk.</p>
        </div>
        <div className="wrap-lg">
          <div className="persona-grid">
            <div className="persona"><div className="persona-icon">💼</div><div className="persona-name">The Enterprise PM</div><div className="persona-role">Business/Enterprise · $20–40/seat/mo</div><div className="persona-text">Checks statuses between meetings. Can't use side peek, databases render poorly. Falls back to Slack, defeating "single source of truth."</div></div>
            <div className="persona"><div className="persona-icon">🎒</div><div className="persona-name">The Power Student</div><div className="persona-role">Free/Plus · High virality</div><div className="persona-text">Quick capture during commute. Mobile so clunky they default to Apple Notes, then copy-paste, fragmenting workflow and reducing engagement.</div></div>
            <div className="persona"><div className="persona-icon">✈️</div><div className="persona-name">The Mobile-First Creator</div><div className="persona-role">Plus/Business · Travel-heavy</div><div className="persona-text">Works from cafes and airports. Offline limits and slow performance make workspace inaccessible, pushing them to Obsidian or Anytype.</div></div>
          </div>
        </div>
        <div className="wrap" style={{ marginTop: 32 }}>
          <div style={{ overflowX: "auto" }}>
            <table className="tbl">
              <thead><tr><th>Capability</th><th>Notion</th><th>Apple Notes</th><th>Obsidian</th><th>Anytype</th></tr></thead>
              <tbody>
                <tr><td className="bold">Load Speed</td><td className="r">Noticeably slow (databases)</td><td className="g">Instant (native)</td><td className="g">Instant (local)</td><td className="g">Fast (native)</td></tr>
                <tr><td className="bold">Full Offline</td><td className="r">Partial (50 row cap)</td><td className="g">Full</td><td className="g">Full (local-first)</td><td className="g">Full (local-first)</td></tr>
                <tr><td className="bold">Edit/View Modes</td><td className="r">Always editable</td><td className="g">Implicit</td><td className="g">Toggle</td><td className="g">Separate</td></tr>
                <tr><td className="bold">Quick Capture</td><td className="r">No widget</td><td className="g">Lock screen widget</td><td className="g">Widgets + Siri</td><td className="a">Basic widget</td></tr>
                <tr><td className="bold">Architecture</td><td className="a">Web wrapper (+ native parts)</td><td className="g">Fully native</td><td className="a">Electron</td><td className="g">Native</td></tr>
              </tbody>
            </table>
          </div>
          <div className="src" style={{ marginTop: 8 }}>Android Police (Oct 2025): "Notion and Obsidian are powerhouses on desktop but still have a long way to go on Android. Capacities and Anytype have done an excellent job with their native mobile apps."</div>
        </div>
      </section>

      {/* CIRCLES */}
      <section className="sect" style={{ background: "var(--white)" }} data-nav="circles">
        <div className="wrap">
          <div className="eyebrow">04 · CIRCLES Framework</div>
          <h2 className="h2">Structured Problem-Solving</h2>
          <div className="cstep"><div className="cletter">C</div><div><div className="cstep-title">Comprehend the Situation</div><div className="cstep-body">100M+ users, $500M+ ARR, web wrapper mobile app. Enterprise push + potential 2026 IPO makes mobile competence table-stakes. Over 60% of global traffic is mobile; Anytype and Capacities winning mobile comparisons (Android Police, Oct 2025).</div></div></div>
          <div className="cstep"><div className="cletter">I</div><div><div className="cstep-title">Identify the Customer</div><div className="cstep-body">Primary: Enterprise PMs ($20–40/seat, highest ARPU). Secondary: Students driving viral growth but churning to simpler tools. Tertiary: Mobile-first freelancers in unreliable connectivity.</div></div></div>
          <div className="cstep"><div className="cletter">R</div><div><div className="cstep-title">Report Customer Needs</div><div className="cstep-body">(1) Page loads under 2s (2) Accidental edit protection (3) Quick capture without deep nav (4) Searchable block insertion (5) Feature parity: side peek, calendar, slash commands (6) Reliable offline beyond 50-row cap.</div></div></div>
          <div className="cstep"><div className="cletter">C</div><div><div className="cstep-title">Cut Through Prioritization</div><div className="cstep-body">RICE: View/Edit toggle = 270 (100% reach, high impact, 1 sprint). Block search = 144. Quick Capture = 79. Mobile Home = 75. Full native rebuild out of scope.</div></div></div>
          <div className="cstep"><div className="cletter">L</div><div><div className="cstep-title">List Solutions</div><div className="cstep-body">Phase 1 (Q1): View/Edit mode + Searchable block insertion. Phase 2 (Q2): Quick Capture widget + Mobile Home dashboard. Each addresses a specific, documented pain point.</div></div></div>
          <div className="cstep"><div className="cletter">E</div><div><div className="cstep-title">Evaluate Trade-offs</div><div className="cstep-body">View/Edit adds friction → smart defaults + opt-out. Quick Capture may fragment workspace → inbox + AI auto-suggest. Competes with AI dev for eng cycles → frame as IPO readiness.</div></div></div>
          <div className="cstep"><div className="cletter">S</div><div><div className="cstep-title">Summarize Recommendation</div><div className="cstep-body">Ship Phase 1 in Q1 (highest impact, lowest complexity). Phase 2 in Q2. Measure: mobile DAU/MAU, accidental edits, mobile-originated edits. Frame as IPO readiness initiative.</div></div></div>
        </div>
      </section>

      {/* SOLUTIONS + WIREFRAMES */}
      <section className="sect" data-nav="solution">
        <div className="wrap">
          <div className="eyebrow">05 · Proposed Solutions & Wireframes</div>
          <h2 className="h2">Four Features, Two Phases</h2>
          <div style={{ overflowX: "auto" }}>
            <table className="rice"><thead><tr><th>Feature</th><th>Reach</th><th>Impact</th><th>Confidence</th><th>Effort</th><th>Score</th></tr></thead><tbody>
              <tr><td className="fname">View/Edit Mode</td><td>100%</td><td>3 (High)</td><td>90%</td><td>1 sprint</td><td className="score">270</td></tr>
              <tr><td className="fname">Block Search</td><td>80%</td><td>2 (Med)</td><td>90%</td><td>1 sprint</td><td className="score">144</td></tr>
              <tr><td className="fname">Quick Capture</td><td>70%</td><td>2 (Med)</td><td>85%</td><td>1.5 sprints</td><td className="score">79</td></tr>
              <tr><td className="fname">Mobile Home</td><td>100%</td><td>2 (Med)</td><td>75%</td><td>2 sprints</td><td className="score">75</td></tr>
            </tbody></table>
          </div>

          {/* ── WIREFRAME: View/Edit Mode ── */}
          <div style={{ marginTop: 48 }}>
            <div className="caption" style={{ textAlign: "center", marginBottom: 24, fontSize: 11 }}>WIREFRAMES · NOTION-STYLED MOBILE MOCKUPS</div>
          </div>

          <div className="sol">
            <div className="wireframe-row">
              <Phone label="View Mode (default)">
                <NBreadcrumb items={["Workspace","Q3","Design Review"]} />
                <NPageTitle>Design Review</NPageTitle>
                <NBlock handle><NText s={7} c="#37352f">The mobile redesign kicked off last week with a focus on three areas.</NText></NBlock>
                <NBlock handle><NLine w="85%" /><NLine w="70%" /><NLine w="90%" /></NBlock>
                <div style={{ margin: "6px 0" }}>
                  <div style={{ font: "600 6px/1 'Sora',sans-serif", color: "#787774", letterSpacing: ".06em", marginBottom: 4 }}>DATABASE</div>
                  <NDbRow title="Header redesign" status="Done" color="#2d8a4e" />
                  <NDbRow title="Nav overhaul" status="In Progress" color="#c4841d" />
                  <NDbRow title="Perf audit" status="Not Started" color="#b4b0a8" />
                </div>
                <NBlock handle><NLine w="75%" /><NLine w="60%" /></NBlock>
                <div style={{ position: "absolute", top: 37, right: 12 }}><NIcon s={9}>🔒</NIcon></div>
                <div style={{ position: "absolute", bottom: 26, right: 14, padding: "7px 12px", borderRadius: 8, background: "#191919", boxShadow: "0 3px 12px rgba(0,0,0,.2)", display: "flex", alignItems: "center", gap: 3 }}>
                  <span style={{ font: "600 7.5px/1 'Sora',sans-serif", color: "#fff" }}>✎ Edit</span>
                </div>
                <div style={{ position: "absolute", bottom: 68, left: 10, right: 10, textAlign: "center" }}>
                  <span style={{ font: "500 6px/1 'IBM Plex Mono',monospace", color: "#2d8a4e", letterSpacing: ".03em" }}>Safe scrolling · No accidental edits</span>
                </div>
              </Phone>

              <Phone label="Edit Mode (activated)">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2px 6px", borderBottom: "1px solid #f0eeeb" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <span style={{ font: "500 7.5px/1 'Sora',sans-serif", color: "#787774" }}>↩ Undo</span>
                    <span style={{ font: "500 7.5px/1 'Sora',sans-serif", color: "#c9c6c0" }}>↪ Redo</span>
                  </div>
                  <div style={{ font: "600 7.5px/1 'Sora',sans-serif", color: "#fff", background: "#2f80ed", padding: "4px 10px", borderRadius: 5 }}>✓ Done</div>
                </div>
                <NPageTitle>Design Review</NPageTitle>
                <NBlock handle><NText s={7} c="#37352f">The mobile redesign kicked off last week with a focus on</NText></NBlock>
                <div style={{ width: 1.5, height: 14, background: "#2f80ed", margin: "2px 0 2px 16px", borderRadius: 1 }} />
                <NBlock handle><NLine w="70%" /><NLine w="55%" /></NBlock>
                <NBlock handle><NLine w="80%" /></NBlock>
                <div style={{ position: "absolute", bottom: 18, left: 8, right: 8, background: "#f7f6f3", borderRadius: 8, padding: "5px 4px", display: "flex", gap: 3, justifyContent: "center", border: "1px solid #e8e5e0" }}>
                  {["B","I","U","S","🔗","A","H","+"].map((b,i)=> <NToolbarBtn key={i} active={i===5}>{b}</NToolbarBtn>)}
                </div>
              </Phone>
            </div>
          </div>

          {/* ── WIREFRAME: Block Search ── */}
          <div className="sol">
            <div className="wireframe-row">
              <Phone label="Current: scroll 40+ blocks">
                <div style={{ font: "700 9px/1.2 'Fraunces',serif", color: "#37352f", marginBottom: 6 }}>+ Add a block</div>
                <div style={{ background: "#f7f6f3", borderRadius: 6, padding: 8, border: "1px solid #e8e5e0" }}>
                  {["Aa Text","📄 Page","☐ To-do","H₁ Heading 1","H₂ Heading 2","H₃ Heading 3","• Bulleted","1. Numbered","▸ Toggle","❝ Quote","— Divider","📌 Callout","</> Code","⊞ Table","⊟ Board","📅 Calendar"].map((b,i)=>(
                    <div key={i} style={{ padding: "4px 0", borderBottom: "1px solid #f0eeeb", font: "400 6.5px/1.3 'Sora',sans-serif", color: i < 8 ? "#37352f" : "#b4b0a8" }}>{b}</div>
                  ))}
                  <div style={{ font: "500 6px/1 'IBM Plex Mono',monospace", color: "#d94f3f", textAlign: "center", marginTop: 5 }}>⬇ Scroll for 25+ more</div>
                </div>
              </Phone>

              <Phone label="Proposed: search + recents">
                <div style={{ background: "#f7f6f3", borderRadius: 6, padding: "6px 8px", marginBottom: 8, display: "flex", alignItems: "center", gap: 4, border: "1px solid #e8e5e0" }}>
                  <span style={{ fontSize: 8, opacity: .4 }}>🔍</span>
                  <span style={{ font: "400 7.5px/1 'Sora',sans-serif", color: "#b4b0a8" }}>Filter blocks...</span>
                </div>
                <div style={{ font: "600 5.5px/1 'IBM Plex Mono',monospace", color: "#787774", letterSpacing: ".08em", marginBottom: 4 }}>RECENT</div>
                {[["▸","Toggle list"],["📌","Callout"],["☐","To-do"],["</>","Code"],["❝","Quote"]].map(([icon,name],i)=>(
                  <div key={i} style={{ padding: "4.5px 0", borderBottom: "1px solid #f0eeeb", font: "500 7px/1.2 'Sora',sans-serif", color: "#37352f", display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ width: 14, height: 14, borderRadius: 3, background: "#eef3fc", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 7, flexShrink: 0 }}>{icon}</span>{name}
                  </div>
                ))}
                <div style={{ font: "600 5.5px/1 'IBM Plex Mono',monospace", color: "#787774", letterSpacing: ".08em", margin: "8px 0 4px" }}>BASIC</div>
                {[["Aa","Text"],["📄","Page"],["H₁","Heading"]].map(([icon,name],i)=>(
                  <div key={i} style={{ padding: "4px 0", borderBottom: "1px solid #f7f6f3", font: "400 7px/1.2 'Sora',sans-serif", color: "#787774", display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ width: 14, height: 14, borderRadius: 3, background: "#f7f6f3", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 7, flexShrink: 0 }}>{icon}</span>{name}
                  </div>
                ))}
                <div style={{ font: "600 5.5px/1 'IBM Plex Mono',monospace", color: "#b4b0a8", margin: "8px 0 2px" }}>▸ MEDIA &nbsp;&nbsp; ▸ DATABASE &nbsp;&nbsp; ▸ EMBED</div>
              </Phone>
            </div>
          </div>

          {/* ── WIREFRAME: Quick Capture ── */}
          <div className="sol">
            <div className="wireframe-row">
              <Phone label="Home screen widget">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, marginBottom: 10 }}>
                  {["📷","📞","💬","🗓","🎵","📧","🗺","⚙️"].map((e,i)=>(<div key={i} style={{ aspectRatio: "1", borderRadius: 10, background: "#f7f6f3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{e}</div>))}
                </div>
                <div style={{ background: "#191919", borderRadius: 12, padding: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 8 }}>
                    <span style={{ font: "700 8px/1 'Fraunces',serif", color: "#fff" }}>N</span>
                    <span style={{ font: "400 7px/1 'Sora',sans-serif", color: "rgba(255,255,255,.5)" }}>Quick Capture</span>
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    {[["📝","Note"],["☐","Task"],["🔗","Link"]].map(([icon,label],i)=>(
                      <div key={i} style={{ flex: 1, background: "rgba(255,255,255,.08)", borderRadius: 8, padding: "8px 4px", textAlign: "center", border: "1px solid rgba(255,255,255,.06)" }}>
                        <div style={{ fontSize: 12, marginBottom: 3 }}>{icon}</div>
                        <div style={{ font: "500 6px/1 'Sora',sans-serif", color: "rgba(255,255,255,.6)" }}>{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, marginTop: 10 }}>
                  {["📰","🎮","💰","🏋️"].map((e,i)=>(<div key={i} style={{ aspectRatio: "1", borderRadius: 10, background: "#f7f6f3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{e}</div>))}
                </div>
              </Phone>

              <Phone label="Quick note capture sheet">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ font: "500 7.5px/1 'Sora',sans-serif", color: "#787774" }}>Cancel</span>
                  <span style={{ font: "600 8px/1 'Fraunces',serif", color: "#37352f" }}>Quick Capture</span>
                  <span style={{ font: "600 7.5px/1 'Sora',sans-serif", color: "#fff", background: "#2f80ed", padding: "4px 10px", borderRadius: 5 }}>Save</span>
                </div>
                <div style={{ background: "#f7f6f3", borderRadius: 6, padding: "5px 8px", marginBottom: 8, border: "1px solid #e8e5e0" }}>
                  <span style={{ font: "400 7px/1 'Sora',sans-serif", color: "#787774" }}>📁</span>
                  <span style={{ font: "500 7px/1 'Sora',sans-serif", color: "#37352f", marginLeft: 4 }}>My Workspace / Inbox</span>
                </div>
                <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
                  {[["📝","Note",true],["☐","Task",false],["🔗","Link",false]].map(([icon,label,active],i)=>(
                    <div key={i} style={{ flex: 1, padding: "6px 2px", borderRadius: 6, textAlign: "center", background: active ? "#191919" : "#f7f6f3", border: active ? "none" : "1px solid #e8e5e0" }}>
                      <div style={{ fontSize: 10 }}>{icon}</div>
                      <div style={{ font: "500 6px/1 'Sora',sans-serif", color: active ? "#fff" : "#787774", marginTop: 2 }}>{label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#f7f6f3", borderRadius: 6, padding: 8, minHeight: 80, border: "1px solid #e8e5e0" }}>
                  <div style={{ font: "400 7.5px/1.5 'Sora',sans-serif", color: "#37352f" }}>Meeting notes: Sarah mentioned the Q3 deadline moved to...</div>
                  <div style={{ width: 1.5, height: 12, background: "#2f80ed", display: "inline-block", borderRadius: 1, marginTop: 2 }} />
                </div>
                <div style={{ textAlign: "center", marginTop: 8 }}>
                  <span style={{ font: "500 6px/1 'IBM Plex Mono',monospace", color: "#c4841d", background: "#fef8ee", padding: "3px 8px", borderRadius: 3, border: "1px solid rgba(196,132,29,.15)" }}>📴 Offline — will sync when connected</span>
                </div>
              </Phone>
            </div>
          </div>

          {/* ── WIREFRAME: Mobile Home ── */}
          <div className="sol">
            <div className="wireframe-row">
              <Phone label="Current: sidebar-first">
                <div style={{ display: "flex" }}>
                  <div style={{ width: "58%", background: "#f7f6f3", borderRadius: "6px 0 0 6px", padding: 6, minHeight: 260, borderRight: "1px solid #e8e5e0" }}>
                    <div style={{ font: "700 8px/1.2 'Fraunces',serif", color: "#37352f", marginBottom: 8 }}>CJ's Workspace</div>
                    {["🚀 Getting Started","📋 Q3 Planning","📝 Meeting Notes","🎨 Design Specs","🗺 Roadmap","👥 HR Docs","⚙️ Eng Wiki","🔬 Research","📁 Templates"].map((p,i)=>(
                      <div key={i} style={{ padding: "3.5px 0", font: "400 6.5px/1.3 'Sora',sans-serif", color: i < 3 ? "#37352f" : "#b4b0a8", borderBottom: "1px solid rgba(0,0,0,.03)" }}>{p}</div>
                    ))}
                    <div style={{ font: "500 6px/1 'IBM Plex Mono',monospace", color: "#d94f3f", marginTop: 6 }}>4–5 taps to find content</div>
                  </div>
                  <div style={{ flex: 1, padding: 6, opacity: .35 }}><NLine w="80%" /><NLine w="60%" /><NLine w="70%" /></div>
                </div>
              </Phone>

              <Phone label="Proposed: Mobile Home">
                <NBar><NIcon>☰</NIcon><span style={{ font: "700 8.5px/1 'Fraunces',serif", color: "#37352f" }}>Home</span><NIcon>🔍</NIcon></NBar>
                <div style={{ display: "flex", gap: 4, margin: "8px 0" }}>
                  {[["📝","New"],["🔍","Search"],["📷","Scan"],["⚡","Note"]].map(([icon,label],i)=>(
                    <div key={i} style={{ flex: 1, background: "#f7f6f3", borderRadius: 6, padding: "6px 2px", textAlign: "center", border: "1px solid #e8e5e0" }}>
                      <div style={{ fontSize: 10 }}>{icon}</div>
                      <div style={{ font: "500 5.5px/1 'Sora',sans-serif", color: "#787774", marginTop: 2 }}>{label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ font: "600 5.5px/1 'IBM Plex Mono',monospace", color: "#787774", letterSpacing: ".06em", marginBottom: 4 }}>⭐ FAVORITES</div>
                <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
                  {["📋 Q3 Plan","🎨 Design","📝 Standup"].map((p,i)=>(
                    <div key={i} style={{ flex: 1, background: "#f7f6f3", borderRadius: 6, padding: "6px 4px", border: "1px solid #e8e5e0" }}>
                      <div style={{ font: "500 6.5px/1.2 'Sora',sans-serif", color: "#37352f" }}>{p}</div>
                    </div>
                  ))}
                </div>
                <div style={{ font: "600 5.5px/1 'IBM Plex Mono',monospace", color: "#787774", letterSpacing: ".06em", marginBottom: 4 }}>📋 TODAY</div>
                {["Review Sarah's PR","Update roadmap","Send Q3 recap"].map((t,i)=>(
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, padding: "3.5px 0", borderBottom: "1px solid #f0eeeb" }}>
                    <div style={{ width: 11, height: 11, borderRadius: 3, border: "1.5px solid #2d8a4e", flexShrink: 0 }} />
                    <span style={{ font: "400 7px/1 'Sora',sans-serif", color: "#37352f" }}>{t}</span>
                  </div>
                ))}
                <div style={{ font: "600 5.5px/1 'IBM Plex Mono',monospace", color: "#787774", letterSpacing: ".06em", margin: "8px 0 3px" }}>🕐 RECENT</div>
                {["Meeting Notes — 2h ago","API Docs — yesterday"].map((r,i)=>(
                  <div key={i} style={{ padding: "3px 0", font: "400 6.5px/1.2 'Sora',sans-serif", color: "#787774" }}>{r}</div>
                ))}
              </Phone>
            </div>
          </div>

          <div className="sol"><div className="sol-phase" style={{ color: "var(--blue)" }}>Phase 1 · RICE: 270</div><div className="sol-title">View/Edit Mode Toggle</div><div className="sol-desc">Pages open in View Mode: read-only, safe scrolling. Floating "Edit" FAB activates editing with persistent undo/redo. Based on Google Docs mobile, Obsidian, and Confluence patterns.</div><div className="sol-grid"><div className="sol-detail"><div className="sol-detail-lbl">Link Opens</div><div className="sol-detail-val">View Mode (safe)</div></div><div className="sol-detail"><div className="sol-detail-lbl">New Page</div><div className="sol-detail-val">Edit Mode (keyboard)</div></div><div className="sol-detail"><div className="sol-detail-lbl">Undo</div><div className="sol-detail-val">30-action persistent bar</div></div><div className="sol-detail"><div className="sol-detail-lbl">Opt-Out</div><div className="sol-detail-val">Settings toggle to disable</div></div></div></div>
          <div className="sol"><div className="sol-phase" style={{ color: "var(--blue)" }}>Phase 1 · RICE: 144</div><div className="sol-title">Searchable Block Insertion</div><div className="sol-desc">Replace scroll-only menu with searchable overlay. Type to filter ("tog" → Toggle). Top 5 most-used blocks pinned as "Recent." Mirrors desktop slash-command efficiency.</div><div className="sol-grid"><div className="sol-detail"><div className="sol-detail-lbl">Trigger</div><div className="sol-detail-val">"+" tap or "/" in Edit</div></div><div className="sol-detail"><div className="sol-detail-lbl">Search</div><div className="sol-detail-val">Fuzzy match, 1 char</div></div><div className="sol-detail"><div className="sol-detail-lbl">Pinned</div><div className="sol-detail-val">Top 5 most-used blocks</div></div><div className="sol-detail"><div className="sol-detail-lbl">Groups</div><div className="sol-detail-val">Basic, Media, DB, Embed</div></div></div></div>
          <div className="sol"><div className="sol-phase" style={{ color: "var(--green)" }}>Phase 2 · RICE: 79</div><div className="sol-title">Quick Capture Widget</div><div className="sol-desc">Home screen widget + share extension. Capture notes, tasks, and links into configurable Inbox without opening the app. Queues locally, syncs on connect.</div><div className="sol-grid"><div className="sol-detail"><div className="sol-detail-lbl">Types</div><div className="sol-detail-val">Note, Checklist, Bookmark</div></div><div className="sol-detail"><div className="sol-detail-lbl">Destination</div><div className="sol-detail-val">Configurable Inbox page</div></div><div className="sol-detail"><div className="sol-detail-lbl">Share Ext</div><div className="sol-detail-val">Clip from any app</div></div><div className="sol-detail"><div className="sol-detail-lbl">Offline</div><div className="sol-detail-val">Queue + sync on connect</div></div></div></div>
          <div className="sol"><div className="sol-phase" style={{ color: "var(--green)" }}>Phase 2 · RICE: 75</div><div className="sol-title">Mobile Home Dashboard</div><div className="sol-desc">Favorites, Recents, Today's Tasks, Quick Actions. Reduces taps-to-content from 4–5 to 1. Sidebar remains via hamburger menu.</div><div className="sol-grid"><div className="sol-detail"><div className="sol-detail-lbl">Sections</div><div className="sol-detail-val">Favorites, Recents, Today</div></div><div className="sol-detail"><div className="sol-detail-lbl">Tasks</div><div className="sol-detail-val">Auto from date properties</div></div><div className="sol-detail"><div className="sol-detail-lbl">Actions</div><div className="sol-detail-val">New, Search, Scan, Note</div></div><div className="sol-detail"><div className="sol-detail-lbl">Custom</div><div className="sol-detail-val">Drag reorder, hide sections</div></div></div></div>
        </div>
      </section>

      {/* METRICS */}
      <section className="sect" style={{ background: "var(--white)" }} data-nav="metrics">
        <div className="wrap"><div className="eyebrow">06 · Success Metrics</div><h2 className="h2">Measuring Impact</h2><p className="lead">North Star: mobile DAU/MAU ratio. Users returning daily rather than defaulting to desktop or competitors.</p></div>
        <div className="wrap-lg">
          <div className="met-grid">
            <div className="met"><div className="met-val">+25%</div><div className="met-lbl">Mobile DAU/MAU</div><div className="met-note">Est. baseline ~30% → 37.5% in 90 days</div></div>
            <div className="met"><div className="met-val">−40%</div><div className="met-lbl">Accidental Edits</div><div className="met-note">Via View/Edit toggle</div></div>
            <div className="met"><div className="met-val">+35%</div><div className="met-lbl">Mobile Edits</div><div className="met-note">Editing vs read-only</div></div>
            <div className="met"><div className="met-val">&lt;2s</div><div className="met-lbl">Page Load (P50)</div><div className="met-note">Target meaningful improvement</div></div>
            <div className="met"><div className="met-val">+20%</div><div className="met-lbl">Widget Adoption</div><div className="met-note">Weekly Quick Capture users</div></div>
            <div className="met"><div className="met-val">−30%</div><div className="met-lbl">Taps-to-Content</div><div className="met-note">4–5 → 1–2 via Home</div></div>
          </div>
        </div>
        <div className="wrap" style={{ marginTop: 32 }}><div className="quote"><div className="quote-text" style={{ fontSize: 16 }}>Guardrails: Session duration shouldn't drop. Desktop DAU shouldn't decline. Quick Capture orphan rate (items never organized) below 30%.</div><div className="quote-attr">Guardrail framework for A/B testing</div></div></div>
      </section>

      {/* RISKS */}
      <section className="sect" data-nav="risks">
        <div className="wrap">
          <div className="eyebrow">07 · Risks & Mitigations</div>
          <h2 className="h2">What Could Go Wrong</h2>
          <div style={{ marginTop: 28 }}>
            <div className="risk"><div><div className="risk-title">View Mode Adds Friction</div><div className="risk-body">Extra tap to edit could frustrate power users accustomed to direct manipulation.</div></div><div><div className="mit-tag">Mitigation</div><div className="risk-body">Smart defaults (new pages → Edit). Settings opt-out. A/B test with top 10% of mobile editors first.</div></div></div>
            <div className="risk"><div><div className="risk-title">Quick Capture Creates Sprawl</div><div className="risk-body">Low-friction capture could flood Inbox with unprocessed items.</div></div><div><div className="mit-tag">Mitigation</div><div className="risk-body">Weekly digest: "12 items in Inbox." AI agent auto-suggests where each item belongs.</div></div></div>
            <div className="risk"><div><div className="risk-title">Eng Resources Compete with AI</div><div className="risk-body">Mobile UX deprioritized against AI features (50%+ of ARR from AI customers).</div></div><div><div className="mit-tag">Mitigation</div><div className="risk-body">Frame as IPO readiness. View/Edit + block search = 1 sprint each. Uses existing widget infra.</div></div></div>
            <div className="risk"><div><div className="risk-title">Mobile Home Fragments IA</div><div className="risk-body">Mobile-specific home diverging from desktop sidebar could confuse cross-platform users.</div></div><div><div className="mit-tag">Mitigation</div><div className="risk-body">Additive, not replacement. Sidebar via hamburger. "Today's Tasks" mirrors existing manual database filters.</div></div></div>
          </div>
        </div>
      </section>

      <footer className="footer"><div className="wrap"><div className="footer-name">CJ · Product Case Study</div><div className="footer-sub">Notion Mobile UX Redesign · CIRCLES Framework · February 2026</div><div className="footer-disc">Sources: CNBC, Bloomberg, Notion blog (financials) · Trustpilot 2.5/5, Capterra 4.7/5, G2, Gartner Peer Insights 4.6/5 (reviews) · Notion Help Center, release notes (product) · 3perf.com (2020), XDA Developers (technical) · Android Police Oct 2025 (competitive) · StatCounter, Sensor Tower (market). User quotes are representative composites. Revenue above $500M is analyst projection. Wireframes are original work.</div></div></footer>
    </>
  );
};

export default NotionCaseStudy;
