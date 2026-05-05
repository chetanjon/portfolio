'use client';

import { useState, useEffect } from "react";
import { CaseStudyTOC } from "@/components/ui/CaseStudyTOC";

const NOTION_TOC_SECTIONS = [
  { id: "not-overview", number: "00", label: "Overview" },
  { id: "not-01", number: "01", label: "Context" },
  { id: "not-02", number: "02", label: "Research" },
  { id: "not-03", number: "03", label: "Personas" },
  { id: "not-04", number: "04", label: "AARRR" },
  { id: "not-05", number: "05", label: "Compete" },
  { id: "not-06", number: "06", label: "Onboarding" },
  { id: "not-07", number: "07", label: "UX" },
  { id: "not-08", number: "08", label: "Lessons" },
  { id: "not-09", number: "09", label: "RICE" },
  { id: "not-10", number: "10", label: "Risks" },
  { id: "not-11", number: "11", label: "Wireframes" },
  { id: "not-12", number: "12", label: "Metrics" },
  { id: "not-13", number: "13", label: "Outlook" },
];

const CSS = `*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#FAFAF8;--bg2:#F2F1ED;--bg3:#E8E7E3;
  --text:#1A1A1A;--text2:#4A4A48;--text3:#7A7A78;
  --accent:#2383E2;--accent2:#1A6BC4;--accent-light:#EBF4FD;--accent-glow:rgba(35,131,226,.12);
  --red:#E24B4A;--green:#2D9D78;--amber:#D4940B;--purple:#6B4FBB;
  --border:#E0DFDB;--card:#FFFFFF;
  --serif:'Instrument Serif',Georgia,serif;
  --sans:'DM Sans',system-ui,sans-serif;
  --mono:'JetBrains Mono',monospace;
  --shadow-sm:0 1px 3px rgba(0,0,0,.04),0 1px 2px rgba(0,0,0,.06);
  --shadow-md:0 4px 16px rgba(0,0,0,.06),0 1px 3px rgba(0,0,0,.04);
  --shadow-lg:0 12px 40px rgba(0,0,0,.08),0 4px 12px rgba(0,0,0,.04);
  --shadow-glow:0 0 30px rgba(35,131,226,.08);
  --radius:12px;--radius-lg:16px;
}
body{font-family:var(--sans);color:var(--text);background:var(--bg);line-height:1.72;font-size:17px;-webkit-font-smoothing:antialiased;overflow-x:hidden}
.container{max-width:760px;margin:0 auto;padding:0 24px}
.wide{max-width:900px}

/* ===== READING PROGRESS BAR ===== */
.progress-bar{position:fixed;top:0;left:0;width:0%;height:3px;background:linear-gradient(90deg,var(--accent),var(--purple));z-index:1000;transition:width .1s linear}

/* ===== HERO ===== */
.hero{padding:120px 0 72px;text-align:center;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background:
  radial-gradient(ellipse 80% 60% at 50% 0%,rgba(35,131,226,.06) 0%,transparent 70%),
  radial-gradient(ellipse 60% 50% at 80% 20%,rgba(107,79,187,.04) 0%,transparent 60%),
  radial-gradient(ellipse 50% 40% at 20% 30%,rgba(45,157,120,.03) 0%,transparent 60%);
  pointer-events:none}
.hero::after{content:'';position:absolute;bottom:0;left:5%;right:5%;height:1px;background:linear-gradient(90deg,transparent,var(--border),transparent)}
.hero-label{font-size:12px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:var(--accent);margin-bottom:24px;display:inline-flex;align-items:center;gap:8px}
.hero-label::before,.hero-label::after{content:'';width:24px;height:1px;background:var(--accent);opacity:.4}
.hero h1{font-family:var(--serif);font-size:clamp(34px,5vw,52px);line-height:1.12;color:var(--text);font-weight:400;margin-bottom:28px;max-width:720px;margin-left:auto;margin-right:auto;letter-spacing:-.01em}
.hero-meta{font-size:15px;color:var(--text3)}
.hero-meta strong{color:var(--text2)}
.hero-meta a{color:var(--accent);text-decoration:none;border-bottom:1px solid transparent;transition:border-color .2s}
.hero-meta a:hover{border-bottom-color:var(--accent)}

/* ===== SCROLL ANIMATIONS ===== */
.reveal{opacity:0;transform:translateY(28px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
.reveal.visible{opacity:1;transform:translateY(0)}
.reveal-delay-1{transition-delay:.1s}
.reveal-delay-2{transition-delay:.2s}
.reveal-delay-3{transition-delay:.3s}

/* ===== SECTIONS ===== */
section{padding:72px 0;position:relative}
section::after{content:'';position:absolute;bottom:0;left:5%;right:5%;height:1px;background:linear-gradient(90deg,transparent,var(--border),transparent)}
section:last-of-type::after{display:none}
.section-num{font-family:var(--mono);font-size:12px;color:var(--accent);font-weight:700;letter-spacing:1.5px;margin-bottom:8px;display:inline-block;padding:4px 10px;background:var(--accent-light);border-radius:6px}
h2{font-family:var(--serif);font-size:clamp(28px,3.5vw,38px);line-height:1.2;font-weight:400;margin-bottom:28px;color:var(--text)}
h3{font-size:19px;font-weight:700;margin:36px 0 14px;color:var(--text)}
h4{font-size:16px;font-weight:600;margin:24px 0 10px;color:var(--text2)}
p{margin-bottom:18px;color:var(--text2)}
strong{color:var(--text);font-weight:600}

/* ===== TLDR BOX ===== */
.tldr{background:var(--card);border:1px solid var(--border);border-left:4px solid var(--accent);border-radius:var(--radius);padding:28px 32px;margin:32px 0;box-shadow:var(--shadow-sm);transition:box-shadow .3s ease}
.tldr:hover{box-shadow:var(--shadow-md)}
.tldr p{margin-bottom:12px;font-size:16px}
.tldr p:last-child{margin-bottom:0}

/* ===== QUOTES ===== */
.quote{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:24px 28px 24px 52px;margin:20px 0;position:relative;box-shadow:var(--shadow-sm);transition:transform .25s ease,box-shadow .25s ease}
.quote:hover{transform:translateY(-2px);box-shadow:var(--shadow-md)}
.quote::before{content:'\\201C';font-family:var(--serif);font-size:56px;color:var(--accent);position:absolute;top:4px;left:18px;line-height:1;opacity:.6}
.quote p{font-style:italic;margin-bottom:6px;color:var(--text);font-size:16px;line-height:1.7}
.quote .quote-author{font-style:normal;font-size:13px;font-weight:600;color:var(--accent);display:inline-flex;align-items:center;gap:6px}
.quote .quote-author::before{content:'';width:16px;height:1.5px;background:var(--accent);opacity:.5}

/* ===== TABLES ===== */
table{width:100%;border-collapse:separate;border-spacing:0;margin:24px 0;font-size:15px;border:1px solid var(--border);border-radius:var(--radius);overflow:hidden}
thead th{text-align:left;padding:14px 18px;background:var(--bg2);font-weight:600;color:var(--text);font-size:12px;text-transform:uppercase;letter-spacing:.8px;border-bottom:2px solid var(--border)}
tbody td{padding:13px 18px;border-bottom:1px solid var(--border);color:var(--text2);transition:background .15s}
tbody tr:last-child td{border-bottom:none}
tbody tr:hover td{background:rgba(35,131,226,.03)}

/* ===== METRIC CARDS ===== */
.metrics{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:16px;margin:28px 0}
.metric-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:24px 20px;text-align:center;box-shadow:var(--shadow-sm);transition:all .3s ease;position:relative;overflow:hidden}
.metric-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--accent),var(--purple));opacity:0;transition:opacity .3s}
.metric-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg),var(--shadow-glow)}
.metric-card:hover::before{opacity:1}
.metric-card .value{font-family:var(--mono);font-size:28px;font-weight:700;color:var(--accent);display:block;transition:transform .3s}
.metric-card:hover .value{transform:scale(1.05)}
.metric-card .label{font-size:13px;color:var(--text3);margin-top:6px;display:block}

/* ===== GRADE BADGES ===== */
.grade{display:inline-flex;align-items:center;gap:6px;padding:5px 14px;border-radius:20px;font-size:13px;font-weight:700;letter-spacing:.5px;transition:transform .2s}
.grade:hover{transform:scale(1.08)}
.grade-a{background:#E8F5E9;color:#2D7D46}
.grade-b{background:#FFF8E1;color:#9A7B1B}
.grade-c{background:#FFF3E0;color:#BF6C0A}

/* ===== PERSONA CARDS ===== */
.persona{background:var(--card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:32px;margin:24px 0;box-shadow:var(--shadow-sm);transition:box-shadow .3s ease,transform .3s ease}
.persona:hover{box-shadow:var(--shadow-md);transform:translateY(-2px)}
.persona-header{display:flex;align-items:center;gap:16px;margin-bottom:16px}
.persona-icon{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:24px;transition:transform .3s}
.persona:hover .persona-icon{transform:rotate(-4deg) scale(1.08)}
.persona-icon.builder{background:#E3F2FD}
.persona-icon.champion{background:#F3E5F5}
.persona-icon.dabbler{background:#FFF3E0}
.persona-icon.skeptic{background:#E8F5E9}
.persona-name{font-weight:700;font-size:18px}
.persona-represents{font-size:13px;color:var(--text3)}
.persona-jtbd{background:var(--bg2);border-radius:10px;padding:16px 20px;margin:14px 0;font-style:italic;font-size:15px;color:var(--text);border-left:3px solid var(--accent);line-height:1.65}

/* ===== RICE TABLE ===== */
.rice-table{overflow-x:auto;margin:24px 0}
.rice-table table{min-width:600px}
.rice-rank{display:inline-flex;width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;align-items:center;justify-content:center;font-size:13px;font-weight:700;box-shadow:0 2px 8px rgba(35,131,226,.25)}
.rice-score{font-family:var(--mono);font-weight:700;color:var(--accent);font-size:17px}

/* ===== WIREFRAME MOCKUPS ===== */
.wireframe{background:var(--card);border:1px solid var(--border);border-radius:var(--radius-lg);overflow:hidden;margin:32px 0;box-shadow:var(--shadow-lg);transition:box-shadow .3s ease}
.wireframe:hover{box-shadow:0 16px 50px rgba(0,0,0,.1),0 6px 16px rgba(0,0,0,.06)}
.wireframe-header{background:linear-gradient(180deg,#F7F7F5,#EEEDEA);padding:14px 20px;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--border)}
.wireframe-dot{width:11px;height:11px;border-radius:50%;transition:transform .2s}
.wireframe:hover .wireframe-dot{transform:scale(1.15)}
.wireframe-dot.r{background:#FF5F57}.wireframe-dot.y{background:#FFBD2E}.wireframe-dot.g{background:#28CA42}
.wireframe-title{font-size:13px;font-weight:600;color:var(--text3);margin-left:8px}
.wireframe-body{padding:32px}
.wireframe-label{font-size:12px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:16px}

/* Wireframe internals */
.wf-card{background:var(--bg);border-radius:var(--radius-lg);padding:36px;text-align:center;max-width:420px;margin:0 auto;border:1px solid var(--border)}
.wf-input{background:var(--card);border:1.5px solid var(--border);border-radius:10px;padding:14px 18px;width:100%;font-size:15px;color:var(--text3);text-align:left;margin:16px 0;transition:border-color .2s}
.wf-input:hover{border-color:var(--accent)}
.wf-btn{background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;border:none;border-radius:10px;padding:13px 28px;font-size:15px;font-weight:600;cursor:pointer;margin:8px 0;display:inline-block;box-shadow:0 2px 12px rgba(35,131,226,.25);transition:all .25s ease}
.wf-btn:hover{transform:translateY(-2px);box-shadow:0 4px 20px rgba(35,131,226,.35)}
.wf-btn-outline{background:transparent;border:1.5px solid var(--border);color:var(--text3);border-radius:10px;padding:10px 24px;font-size:14px;cursor:pointer;transition:all .2s}
.wf-btn-outline:hover{border-color:var(--accent);color:var(--accent)}
.wf-loader{display:flex;flex-direction:column;gap:12px;text-align:left;padding:12px 0}
.wf-loader-item{display:flex;align-items:center;gap:10px;font-size:15px;color:var(--text2)}
.wf-loader-item .check{color:var(--green);font-weight:700}
.wf-loader-item .pending{color:var(--text3)}

/* Database mockup */
.wf-db{width:100%;border:1px solid var(--border);border-radius:10px;overflow:hidden;font-size:14px;text-align:left}
.wf-db-header{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;background:var(--bg2);border-bottom:1px solid var(--border)}
.wf-db-header span{padding:10px 14px;font-weight:600;font-size:13px;color:var(--text3)}
.wf-db-row{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;border-bottom:1px solid var(--border);transition:background .15s}
.wf-db-row:last-child{border-bottom:none}
.wf-db-row:hover{background:var(--accent-light)}
.wf-db-row span{padding:10px 14px;color:var(--text2)}
.wf-status{padding:3px 10px;border-radius:20px;font-size:12px;font-weight:600;display:inline-block}
.wf-status.todo{background:#F3E5F5;color:#7B1FA2}

/* Coach mark */
.wf-coach{background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;border-radius:12px;padding:18px 22px;margin-top:16px;position:relative;font-size:14px;text-align:left;box-shadow:0 4px 20px rgba(35,131,226,.3)}
.wf-coach::before{content:'';position:absolute;top:-8px;left:24px;width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-bottom:8px solid var(--accent)}
.wf-coach strong{color:#fff}

/* Progress bar */
.wf-progress{background:var(--bg3);border-radius:20px;height:8px;width:100%;margin:12px 0;overflow:hidden}
.wf-progress-fill{height:100%;border-radius:20px;transition:width 1.5s cubic-bezier(.16,1,.3,1)}
.wf-progress-fill.blue{background:linear-gradient(90deg,var(--accent),var(--purple))}
.wf-progress-fill.green{background:linear-gradient(90deg,var(--green),#34d399)}

/* Health card */
.wf-health-item{display:flex;align-items:flex-start;gap:12px;padding:16px 0;border-bottom:1px solid var(--border)}
.wf-health-item:last-child{border-bottom:none}
.wf-health-dot{width:10px;height:10px;border-radius:50%;margin-top:6px;flex-shrink:0}
.wf-health-dot.red{background:var(--red);box-shadow:0 0 8px rgba(226,75,74,.3)}
.wf-health-dot.yellow{background:var(--amber);box-shadow:0 0 8px rgba(212,148,11,.3)}
.wf-health-dot.green{background:var(--green);box-shadow:0 0 8px rgba(45,157,120,.3)}
.wf-health-actions{display:flex;gap:8px;margin-top:8px}
.wf-health-actions button{font-size:12px;padding:5px 14px;border-radius:6px;border:1px solid var(--border);background:var(--card);color:var(--text2);cursor:pointer;font-weight:500;transition:all .2s}
.wf-health-actions button:first-child{background:var(--accent);color:#fff;border-color:var(--accent)}
.wf-health-actions button:hover{transform:translateY(-1px)}

/* Mail save panel */
.wf-mail-field{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border)}
.wf-mail-field:last-child{border-bottom:none}
.wf-mail-label{font-size:13px;color:var(--text3);font-weight:500}
.wf-mail-value{font-size:14px;color:var(--text);padding:6px 14px;border:1px solid var(--border);border-radius:6px;background:var(--card);min-width:180px;text-align:left;transition:border-color .2s}
.wf-mail-value:hover{border-color:var(--accent)}

/* 2x2 matrix */
.matrix{position:relative;width:100%;max-width:500px;margin:32px auto;aspect-ratio:1}
.matrix-grid{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;width:100%;height:100%;border:1px solid var(--border);border-radius:var(--radius-lg);overflow:hidden;min-height:300px;box-shadow:var(--shadow-md)}
.matrix-cell{padding:24px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:6px;border:1px solid var(--border);transition:all .3s ease}
.matrix-cell:hover{transform:scale(1.02);z-index:1}
.matrix-cell .dot{width:14px;height:14px;border-radius:50%;background:var(--accent);transition:transform .3s}
.matrix-cell:hover .dot{transform:scale(1.3)}
.matrix-cell .name{font-weight:700;font-size:15px;color:var(--text)}
.matrix-cell .desc{font-size:12px;color:var(--text3)}
.matrix-label{font-size:12px;color:var(--text3);font-weight:600;text-transform:uppercase;letter-spacing:1px;text-align:center;padding:4px 0}

/* Funnel grade */
.funnel-row{display:flex;align-items:center;gap:16px;padding:20px 0;border-bottom:1px solid var(--border);transition:background .15s}
.funnel-row:hover{background:rgba(35,131,226,.02);border-radius:8px;margin:0 -8px;padding-left:8px;padding-right:8px}
.funnel-row:last-child{border-bottom:none}
.funnel-stage{font-weight:700;min-width:120px;font-size:15px}
.funnel-desc{flex:1;font-size:15px;color:var(--text2)}

/* Comparison split */
.compare{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:24px 0}
.compare>div{border:1px solid var(--border);border-radius:var(--radius-lg);padding:28px;background:var(--card);box-shadow:var(--shadow-sm);transition:transform .3s,box-shadow .3s}
.compare>div:hover{transform:translateY(-3px);box-shadow:var(--shadow-md)}
.compare .compare-label{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:14px}
.compare .compare-label.bad{color:var(--red)}
.compare .compare-label.good{color:var(--green)}
@media(max-width:640px){.compare{grid-template-columns:1fr}}

/* Stat highlight */
.stat-highlight{font-family:var(--mono);font-size:24px;font-weight:700;color:var(--accent)}

/* ===== AUTHOR BOX ===== */
.author-box{background:var(--card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:36px;margin:40px 0;display:flex;gap:24px;align-items:flex-start;box-shadow:var(--shadow-md);position:relative;overflow:hidden}
.author-box::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--accent),var(--purple),var(--green))}
.author-avatar{width:68px;height:68px;border-radius:16px;background:linear-gradient(135deg,var(--accent),var(--accent2));display:flex;align-items:center;justify-content:center;color:#fff;font-size:24px;font-weight:700;flex-shrink:0;box-shadow:0 4px 16px rgba(35,131,226,.25)}
.author-info h4{margin:0 0 4px;font-size:18px}
.author-info p{font-size:14px;color:var(--text3);margin-bottom:4px}
.author-info a{color:var(--accent);text-decoration:none;font-size:14px;font-weight:500;transition:color .2s}
.author-info a:hover{color:var(--accent2)}

/* ===== BACK TO TOP ===== */
.back-to-top{position:fixed;bottom:32px;right:32px;width:44px;height:44px;border-radius:50%;background:var(--card);border:1px solid var(--border);box-shadow:var(--shadow-md);display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;transform:translateY(12px);transition:all .3s ease;z-index:99;font-size:18px;color:var(--text3)}
.back-to-top.visible{opacity:1;transform:translateY(0)}
.back-to-top:hover{background:var(--accent);color:#fff;border-color:var(--accent);box-shadow:var(--shadow-lg)}

/* ===== ARR MODEL ===== */
.model-box{background:var(--card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:32px;margin:32px 0;box-shadow:var(--shadow-md);position:relative;overflow:hidden}
.model-box::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--green),var(--accent))}
.model-row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--bg2);font-size:15px}
.model-row:last-child{border-bottom:none}
.model-row.total{border-top:2px solid var(--text);border-bottom:none;margin-top:4px;padding-top:14px;font-weight:700;font-size:17px}
.model-row .label{color:var(--text2)}
.model-row .val{font-family:var(--mono);font-weight:600;color:var(--text)}
.model-row.total .val{color:var(--accent);font-size:19px}
.model-row .sub{font-size:13px;color:var(--text3);font-weight:400}
.model-tag{display:inline-block;font-size:11px;font-weight:600;letter-spacing:.5px;padding:3px 8px;border-radius:4px;margin-left:8px;vertical-align:middle}
.model-tag.est{background:#FFF8E1;color:var(--amber)}
.model-tag.known{background:#E8F5E9;color:var(--green)}

/* ===== ASSUMPTION FOOTNOTES ===== */
.assumptions{background:var(--bg2);border-radius:10px;padding:20px 24px;margin:16px 0;font-size:14px;color:var(--text3);line-height:1.7}
.assumptions strong{color:var(--text2);font-size:13px;text-transform:uppercase;letter-spacing:.5px}

/* ===== RISK CARDS ===== */
.risk-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:24px 0}
@media(max-width:640px){.risk-grid{grid-template-columns:1fr}}
.risk-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:24px;box-shadow:var(--shadow-sm);transition:transform .25s,box-shadow .25s;position:relative;overflow:hidden}
.risk-card:hover{transform:translateY(-2px);box-shadow:var(--shadow-md)}
.risk-card::before{content:'';position:absolute;top:0;left:0;width:4px;height:100%}
.risk-card.high::before{background:var(--red)}
.risk-card.med::before{background:var(--amber)}
.risk-card.low::before{background:var(--green)}
.risk-card h4{margin:0 0 8px;font-size:15px;font-weight:700;color:var(--text)}
.risk-card .risk-rec{font-size:14px;color:var(--text3);margin-bottom:6px}
.risk-card .risk-level{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px}
.risk-card.high .risk-level{color:var(--red)}
.risk-card.med .risk-level{color:var(--amber)}
.risk-card.low .risk-level{color:var(--green)}
.risk-card p{font-size:14px;color:var(--text2);margin-bottom:8px;line-height:1.6}
.risk-card .mitigation{font-size:13px;color:var(--green);font-weight:600}

/* ===== ONBOARDING FLOW STEPS ===== */
.ob-flow{display:flex;gap:0;margin:28px 0 32px;overflow-x:auto;padding-bottom:8px}
.ob-step{flex:1;min-width:110px;text-align:center;position:relative;padding:0 4px}
.ob-step::after{content:'→';position:absolute;right:-8px;top:14px;font-size:14px;color:var(--text3);font-weight:600}
.ob-step:last-child::after{display:none}
.ob-step-num{display:inline-flex;width:32px;height:32px;border-radius:50%;align-items:center;justify-content:center;font-size:13px;font-weight:700;margin-bottom:6px;border:2px solid var(--border);color:var(--text3);background:var(--card)}
.ob-step-num.warn{border-color:var(--red);color:var(--red);background:#FFF5F5}
.ob-step-label{font-size:11px;font-weight:600;color:var(--text3);line-height:1.3}
.ob-step-label.warn{color:var(--red)}
.ob-annotation{font-size:12px;font-weight:600;color:var(--red);background:#FFF5F5;border:1px dashed var(--red);border-radius:6px;padding:6px 10px;margin-top:12px;display:inline-block}
.ob-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:24px 0}
@media(max-width:640px){.ob-grid{grid-template-columns:1fr}.ob-flow{gap:0;justify-content:flex-start}}

/* ===== RESPONSIVE ===== */
@media(max-width:640px){
.hero{padding:72px 0 48px}
.hero h1{font-size:28px}
section{padding:48px 0}
.metrics{grid-template-columns:repeat(2,1fr)}
.wf-db-header,.wf-db-row{grid-template-columns:1.5fr 1fr 1fr}
.wf-db-header span:last-child,.wf-db-row span:last-child{display:none}
.author-box{flex-direction:column;align-items:center;text-align:center}
.persona{padding:24px}
.wireframe-body{padding:20px}
}

/* ===== SELECTION COLOR ===== */
::selection{background:rgba(35,131,226,.15);color:var(--text)}

/* ===== SMOOTH SCROLL ===== */
html{scroll-behavior:smooth}
`;

export default function NotionTeardown() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    // Inject font
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Scroll handler
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(pct);
      setShowTop(h.scrollTop > 600);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  const tocTheme = {
    accent: "#2383E2",
    text: "#1A1A1A",
    textMuted: "#7A7A78",
    textDim: "#4A4A48",
    bg: "rgba(250, 250, 248, 0.94)",
    border: "#E0DFDB",
    fontMono: "'JetBrains Mono', monospace",
    fontSans: "'DM Sans', system-ui, sans-serif",
    fontSerif: "'Instrument Serif', Georgia, serif",
  };

  return (
    <>
      <CaseStudyTOC sections={NOTION_TOC_SECTIONS} theme={tocTheme} variant="scrubber" />
      <style>{CSS}</style>

      <div className="progress-bar" style={{width: progress + "%"}} />

      <button
        className={"back-to-top" + (showTop ? " visible" : "")}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>

      
{/* Reading Progress Bar */}
<div className="progress-bar" id="progressBar"></div>

{/* Back to Top */}
<button className="back-to-top" id="backToTop" onClick={() => window.scrollTo({top:0})}>↑</button>

{/* ==================== HERO ==================== */}
<header className="hero">
<div className="container">
<div className="hero-label reveal">Strategic Product Teardown</div>
<h1 className="reveal reveal-delay-1">Notion&apos;s $600M Paradox: How AI Agents Could Solve the Onboarding Problem That Templates Never Fixed</h1>
<p className="hero-meta reveal reveal-delay-2">By <strong>Chetan Jonnalagadda</strong> · March 2026</p>
</div>
</header>

{/* ==================== TL;DR ==================== */}
<section id="not-overview">
<div className="container">
<span className="section-num reveal">Overview</span>
<h2 className="reveal">TL;DR</h2>
<div className="tldr reveal">
<p><strong>Notion has 100M+ users, ~$600M ARR (as of late 2025 estimates), and the most ambitious AI agent platform in productivity software.</strong> But its biggest lever for the next $400M isn&apos;t another feature launch. It&apos;s fixing the activation gap that loses users in their first three weeks.</p>
<p>After interviewing <strong>10 Notion users</strong> across 5 segments and analyzing <strong>9,000+ reviews</strong>, one pattern dominated: the same flexibility that makes Notion powerful makes it overwhelming. Templates only paper over the problem.</p>
<p>I propose <strong>5 RICE-scored improvements</strong>, led by an AI-guided onboarding redesign and an AI pricing ramp, that I estimate could improve 90-day activation by 15–25% and unlock an estimated <strong>$40–60M in incremental ARR</strong> (modeled assumptions below).</p>
</div>

<div className="metrics reveal">
<div className="metric-card"><span className="value">~$600M</span><span className="label">Est. Annual Recurring Revenue</span></div>
<div className="metric-card"><span className="value">$11B</span><span className="label">Valuation (Dec 2025)</span></div>
<div className="metric-card"><span className="value">100M+</span><span className="label">Registered Users</span></div>
<div className="metric-card"><span className="value">~4%</span><span className="label">Free → Paid Conversion</span></div>
</div>
</div>
</section>

{/* ==================== 1. CONTEXT ==================== */}
<section id="not-01">
<div className="container">
<span className="section-num reveal">01</span>
<h2 className="reveal">Product & Business Context</h2>

<p className="reveal">Notion is an all-in-one workspace combining docs, databases, project management, wikis, and AI in a single platform. Founded in 2013 by Ivan Zhao and Simon Last, the company nearly died twice before finding product-market fit after a full rebuild in Kyoto, Japan. When Docs + Databases launched in 2018, it changed the category.</p>

<h3 className="reveal">Where Notion stands in early 2026</h3>

<div className="reveal">
<table>
<thead><tr><th>Metric</th><th>Value</th></tr></thead>
<tbody>
<tr><td>ARR</td><td><strong>~$600M</strong> (estimated; grew from tens of millions in 2022 to ~$600M+ by late 2025)</td></tr>
<tr><td>Valuation</td><td><strong>$11B</strong> (Dec 2025 employee tender offer)</td></tr>
<tr><td>Registered users</td><td><strong>100M+</strong>, ~4M paying (~4% conversion)</td></tr>
<tr><td>Fortune 500 adoption</td><td>Widely used across many Fortune 500 companies</td></tr>
<tr><td>International users</td><td><strong>~80%</strong> outside the US (major markets include South Korea, Japan, and Brazil)</td></tr>
<tr><td>Revenue mix</td><td>Majority from team plans; over half of customers use paid AI features</td></tr>
<tr><td>IPO timeline</td><td>Many analysts and investors expect a possible IPO window in <strong>2026–2027</strong>, though Notion hasn&apos;t committed publicly</td></tr>
</tbody>
</table>
</div>

<h3 className="reveal">The product suite (2026)</h3>

<div className="reveal">
<table>
<thead><tr><th>Product</th><th>Origin</th><th>Launched</th><th>Status</th></tr></thead>
<tbody>
<tr><td>Docs + Databases</td><td>Core product</td><td>2018</td><td>Mature; leading market share in collaborative workspaces (per 6sense)</td></tr>
<tr><td>AI / Agents</td><td>Internal + OpenAI</td><td>2023 / 2025</td><td>Custom Agents launched Feb 2026</td></tr>
<tr><td>Calendar</td><td>Cron acquisition</td><td>Jan 2024</td><td>Free; beautiful, limited enterprise</td></tr>
<tr><td>Sites</td><td>Internal</td><td>Jun 2024</td><td>Basic; can&apos;t compete with Webflow</td></tr>
<tr><td>Forms</td><td>Internal</td><td>Oct 2024</td><td>Functional; no conditional logic</td></tr>
<tr><td>Mail</td><td>Skiff acquisition</td><td>Apr 2025</td><td>Gmail-only; weak workspace integration</td></tr>
</tbody>
</table>
</div>

<h3 className="reveal">The strategic thesis</h3>
<p className="reveal">Notion&apos;s strategy is a <strong>platform flywheel</strong>: each new product (Calendar, Mail, Sites) adds user context → richer context makes AI Agents more valuable → better AI drives stickiness → stickiness funds more expansion. CEO Ivan Zhao has stated his vision clearly: Notion should be &quot;the connective tissue of how a company operates.&quot; The bet is that breadth, combined with AI, will compound into a moat no point solution can match.</p>
</div>
</section>

{/* ==================== 2. RESEARCH ==================== */}
<section id="not-02">
<div className="container">
<span className="section-num reveal">02</span>
<h2 className="reveal">Research Methodology</h2>

<p className="reveal">I use Notion daily for docs, databases, AI features, and Calendar. This teardown comes from lived experience: managing my knowledge base, coordinating team projects during my M.S. at Arizona State University, and testing every major feature Notion shipped in the past year.</p>

<h3 className="reveal">10 user interviews across 5 segments</h3>

<div className="reveal">
<table>
<thead><tr><th>Segment</th><th>Interviewees</th><th>Profile</th></tr></thead>
<tbody>
<tr><td>Heavy daily users</td><td><strong>Sai Teja, Kruthik</strong></td><td>Solo power users, complex workspaces</td></tr>
<tr><td>Team leads / admins</td><td><strong>Varshini, Vishwajith</strong></td><td>Running teams of 5–20 on Notion</td></tr>
<tr><td>Students</td><td><strong>Ujjwal Reddy</strong></td><td>Tried for school, ultimately bounced</td></tr>
<tr><td>Creators / PMs</td><td><strong>Heber, Abhishek, Avishka</strong></td><td>Professional use alongside other tools</td></tr>
<tr><td>Confused / churned</td><td><strong>Sharath, Jayanth</strong></td><td>Frustrated by pricing or integration gaps</td></tr>
</tbody>
</table>
</div>

<p className="reveal"><strong>Additional sources:</strong> G2 (9,014 reviews), Trustpilot (2.5/5 stars), Capterra, Reddit r/Notion (210K+ members), Hacker News.</p>

<div className="tldr reveal">
<p><strong>Key finding:</strong> 8 of 10 users discovered Notion&apos;s core value through YouTube tutorials or friends, not through anything inside the product itself. This single data point anchors my primary recommendation.</p>
</div>
</div>
</section>

{/* ==================== 3. PERSONAS ==================== */}
<section id="not-03">
<div className="container">
<span className="section-num reveal">03</span>
<h2 className="reveal">User Personas & Jobs to Be Done</h2>

{/* Persona 1: Builder */}
<div className="persona reveal">
<div className="persona-header">
<div className="persona-icon builder">🔨</div>
<div><div className="persona-name">The Builder (Solo Power User)</div>
<div className="persona-represents">Represents: Sai Teja, Kruthik, Avishka</div></div>
</div>
<div className="persona-jtbd">&quot;I need one place to organize my entire life: notes, tasks, projects, goals, all in a way that makes sense to me.&quot;</div>
<div className="quote"><p>It looked beautiful, but I had no idea where to start or which templates to trust. I bounced between YouTube tutorials and template galleries, constantly feeling like I was doing Notion wrong.</p><div className="quote-author">Sai Teja</div></div>
<div className="quote"><p>Databases plus relations could basically model anything: content pipelines, OKRs, even a lightweight CRM. That flexibility is still why I use it.</p><div className="quote-author">Kruthik</div></div>
<p><strong>Frustrations:</strong> Performance on large databases, steep learning curve, AI locked behind $20/mo, slow mobile app (6–7 seconds).</p>
</div>

{/* Persona 2: Champion */}
<div className="persona reveal">
<div className="persona-header">
<div className="persona-icon champion">🏆</div>
<div><div className="persona-name">The Champion (Team Lead)</div>
<div className="persona-represents">Represents: Varshini, Vishwajith</div></div>
</div>
<div className="persona-jtbd">&quot;I need to replace 5 tools with one that my whole team will actually adopt.&quot;</div>
<div className="quote"><p>The first week was a honeymoon phase. Everyone on my team was thrilled to have docs, tasks, and wikis in one place. It felt modern and collaborative.</p><div className="quote-author">Vishwajith</div></div>
<div className="quote"><p>They upgraded us in a way that resulted in a large unexpected charge with almost no warning. Trying to get a refund was painful.</p><div className="quote-author">Varshini</div></div>
<p><strong>Frustrations:</strong> The &quot;evangelist burden,&quot; billing surprises, limited offline, email-only support.</p>
</div>

{/* Persona 3: Dabbler */}
<div className="persona reveal">
<div className="persona-header">
<div className="persona-icon dabbler">📚</div>
<div><div className="persona-name">The Dabbler (Student / Casual User)</div>
<div className="persona-represents">Represents: Ujjwal Reddy</div></div>
</div>
<div className="persona-jtbd">&quot;I need a simple, clean tool for notes and tasks that doesn&apos;t require a PhD to use.&quot;</div>
<div className="quote"><p>I spent more time decorating pages than actually studying. After about a month, I accepted I was spending more time building a system than using it. That&apos;s when I went back to Google Docs and Apple Notes.</p><div className="quote-author">Ujjwal Reddy</div></div>
<p><strong>Current usage:</strong> &quot;This week I opened Notion once to grab an old syllabus and then closed it again.&quot;</p>
<p><strong>Frustrations:</strong> Steep learning curve, AI trial too limited, no student-friendly pricing.</p>
</div>

{/* Persona 4: Skeptic */}
<div className="persona reveal">
<div className="persona-header">
<div className="persona-icon skeptic">🔍</div>
<div><div className="persona-name">The Skeptic (PM / Professional)</div>
<div className="persona-represents">Represents: Abhishek, Heber, Sharath, Jayanth</div></div>
</div>
<div className="persona-jtbd">&quot;I need a workspace that genuinely replaces multiple tools, not one that just adds to the pile.&quot;</div>
<div className="quote"><p>Notion wants to be my entire operating system but doesn&apos;t fully replace specialized tools. I still need Jira, Figma, and others, so Notion becomes yet another tool rather than the only one.</p><div className="quote-author">Abhishek</div></div>
<div className="quote"><p>Even after connecting Calendar and Mail, Notion AI still can&apos;t answer basic questions like &quot;What meetings do I have tomorrow?&quot; The tools coexist more than they collaborate.</p><div className="quote-author">Sharath</div></div>
<div className="quote"><p>We actually left Notion a month ago. I only log in to export old PDFs.</p><div className="quote-author">Jayanth</div></div>
<p><strong>Frustrations:</strong> Calendar/Mail feel disconnected, pricing bait-and-switch, AI governance concerns.</p>
</div>
</div>
</section>

{/* ==================== 4. AARRR ==================== */}
<section id="not-04">
<div className="container">
<span className="section-num reveal">04</span>
<h2 className="reveal">AARRR Funnel Analysis</h2>

<div className="reveal">
<div className="funnel-row">
<div className="funnel-stage">Acquisition</div>
<div className="funnel-desc">Template SEO + creator content + workspace virality. 20M+ monthly visits, 40K+ referring domains.</div>
<span className="grade grade-a">A</span>
</div>

<div className="funnel-row">
<div className="funnel-stage">Activation</div>
<div className="funnel-desc">Aha moment = linking pages to databases. But 8/10 users learned value from YouTube, not the product. Week 3 cliff is real.</div>
<span className="grade grade-c">C+</span>
</div>

<div className="funnel-row">
<div className="funnel-stage">Retention</div>
<div className="funnel-desc">Data gravity creates deep moat for activated users. Data volume grew 10x (2021–2024). But unactivated users churn silently.</div>
<span className="grade grade-a">A-</span>
</div>

<div className="funnel-row">
<div className="funnel-stage">Referral</div>
<div className="funnel-desc">Shared workspaces, template sharing, 300+ ambassadors, affiliate program ($50/signup + 20% year-one).</div>
<span className="grade grade-a">A</span>
</div>

<div className="funnel-row">
<div className="funnel-stage">Revenue</div>
<div className="funnel-desc">AI bundled into Business ($20/user). Over half of customers now use paid AI. But 7/10 interviewees expressed pricing frustration.</div>
<span className="grade grade-b">B+</span>
</div>
</div>

<h3 className="reveal">The pricing trust deficit</h3>

<div className="reveal">
<div className="quote"><p>That pricing feels like it&apos;s meant for companies, not individuals who just want better AI inside their notes.</p><div className="quote-author">Sai Teja (Plus plan)</div></div>
<div className="quote"><p>I&apos;m not upgrading to Business just for unlimited AI when I can pay the same $20/month directly to a standalone AI product.</p><div className="quote-author">Heber (Plus plan)</div></div>
<div className="quote"><p>It went from &quot;nice upgrade&quot; to &quot;expensive requirement&quot; very quickly.</p><div className="quote-author">Jayanth (churned)</div></div>
</div>

<p className="reveal"><strong>7 of 10 interviewees</strong> expressed frustration with AI pricing. This is a brand risk that financial metrics alone don&apos;t capture, and it compounds with every price-sensitive user who tells their network.</p>
</div>
</section>

{/* ==================== 5. COMPETITIVE ==================== */}
<section id="not-05">
<div className="container">
<span className="section-num reveal">05</span>
<h2 className="reveal">Competitive Positioning</h2>

<h3 className="reveal">Positioning matrix</h3>
<div className="matrix reveal">
<div className="matrix-label">← Simple · · · Complex →</div>
<div className="matrix-grid">
<div className="matrix-cell" style={{background:"#F0F7FF"}}><div className="dot" style={{background:"var(--accent)"}}></div><div className="name">Notion</div><div className="desc">Flexible + Simple</div></div>
<div className="matrix-cell" style={{background:"#F3E8FF"}}><div className="dot" style={{background:"var(--purple)"}}></div><div className="name">Coda</div><div className="desc">Flexible + Complex</div></div>
<div className="matrix-cell" style={{background:"#FFF8E1"}}><div className="dot" style={{background:"var(--amber)"}}></div><div className="name">Loop</div><div className="desc">Structured + Simple</div></div>
<div className="matrix-cell" style={{background:"#E8F5E9"}}><div className="dot" style={{background:"var(--green)"}}></div><div className="name">Confluence</div><div className="desc">Structured + Complex</div></div>
</div>
<div className="matrix-label">← Flexible · · · Structured →</div>
</div>

<h3 className="reveal">50-person team pricing comparison</h3>
<p className="reveal" style={{fontSize:"13px",color:"var(--text3)",marginBottom:"8px"}}><em>Based on published list prices as of early 2026. Annual billing, 50 seats unless noted. Actual pricing may vary with negotiated discounts.</em></p>
<div className="reveal">
<table>
<thead><tr><th>Platform</th><th>Plan</th><th>Annual Cost</th><th>AI Included?</th></tr></thead>
<tbody>
<tr><td>Confluence Standard</td><td>Standard</td><td><strong>~$3,252</strong></td><td>✅ Rovo AI</td></tr>
<tr><td>Coda Team (10 makers)</td><td>Team</td><td>~$3,600</td><td>Partial</td></tr>
<tr><td>Notion Plus (no AI)</td><td>Plus</td><td>$6,000</td><td>❌</td></tr>
<tr><td>Microsoft 365 + Loop</td><td>Business Standard</td><td>$7,500</td><td>❌ (Copilot +$18K)</td></tr>
<tr><td><strong>Notion Business</strong></td><td>Business</td><td><strong>$12,000</strong></td><td>✅ Full AI</td></tr>
</tbody>
</table>
</div>

<p className="reveal">Based on list prices for a 50-seat annual plan, Confluence is often significantly cheaper, around 3–4x less in the example above. This gap matters at enterprise scale.</p>

<h3 className="reveal">Threat assessment</h3>
<div className="reveal">
<table>
<thead><tr><th>Competitor</th><th>Threat Level</th><th>Why</th></tr></thead>
<tbody>
<tr><td>Microsoft Loop + Copilot</td><td><strong style={{color:"var(--red)"}}>High</strong></td><td>Free with M365 (400M+ users). Less mature but distribution wins.</td></tr>
<tr><td>Confluence + Rovo AI</td><td><strong style={{color:"var(--amber)"}}>Medium-High</strong></td><td>Entrenched in eng teams. 3–4x cheaper. Better compliance.</td></tr>
<tr><td>Obsidian</td><td><strong style={{color:"var(--green)"}}>Low–Medium</strong></td><td>Local-first, privacy-maximalist. Pulls individuals, not teams.</td></tr>
<tr><td>Coda</td><td><strong style={{color:"var(--amber)"}}>Medium</strong></td><td>Stronger automation/formulas. Grammarly acquisition boosts AI.</td></tr>
</tbody>
</table>
</div>
</div>
</section>

{/* ==================== 6. ONBOARDING ==================== */}
<section id="not-06">
<div className="container">
<span className="section-num reveal">06</span>
<h2 className="reveal">User Journey Deep Dive: Onboarding</h2>

<h3 className="reveal">Current flow (March 2026)</h3>
<p className="reveal">The onboarding has six steps. I walked through it myself and mapped each screen:</p>

{/* Step Flow Indicator */}
<div className="ob-flow reveal">
<div className="ob-step"><div className="ob-step-num">1</div><div className="ob-step-label">Social Login</div></div>
<div className="ob-step"><div className="ob-step-num">2</div><div className="ob-step-label">Self-Sorting</div></div>
<div className="ob-step"><div className="ob-step-num">3</div><div className="ob-step-label">Use Case</div></div>
<div className="ob-step"><div className="ob-step-num warn">4</div><div className="ob-step-label warn">Paywall</div></div>
<div className="ob-step"><div className="ob-step-num">5</div><div className="ob-step-label">Templates</div></div>
<div className="ob-step"><div className="ob-step-num">6</div><div className="ob-step-label">Checklist</div></div>
</div>

{/* Wireframes: Steps 1 & 2 */}
<div className="ob-grid reveal">
<div className="wireframe" style={{margin:"0"}}>
<div className="wireframe-header"><div className="wireframe-dot r"></div><div className="wireframe-dot y"></div><div className="wireframe-dot g"></div><div className="wireframe-title">Step 1: Social Login (~50 sec)</div></div>
<div className="wireframe-body" style={{padding:"28px"}}>
<div style={{textAlign:"center"}}>
<div style={{fontSize:"28px",marginBottom:"8px"}}>📝</div>
<div style={{fontFamily:"var(--serif)",fontSize:"20px",marginBottom:"20px"}}>Welcome to Notion</div>
<div style={{display:"flex",flexDirection:"column",gap:"10px",maxWidth:"280px",margin:"0 auto"}}>
<div style={{display:"flex",alignItems:"center",gap:"10px",padding:"11px 16px",border:"1.5px solid var(--border)",borderRadius:"8px",fontSize:"14px",color:"var(--text2)"}}><span style={{fontSize:"16px"}}>G</span> Continue with Google</div>
<div style={{display:"flex",alignItems:"center",gap:"10px",padding:"11px 16px",border:"1.5px solid var(--border)",borderRadius:"8px",fontSize:"14px",color:"var(--text2)"}}><span style={{fontSize:"16px"}}>🍎</span> Continue with Apple</div>
<div style={{textAlign:"center",fontSize:"13px",color:"var(--text3)",margin:"4px 0"}}>or</div>
<div style={{padding:"11px 16px",border:"1.5px solid var(--border)",borderRadius:"8px",fontSize:"14px",color:"var(--text3)"}}>Enter your email...</div>
</div>
<div style={{fontSize:"12px",color:"var(--text3)",marginTop:"16px"}}>By continuing, you agree to Notion&apos;s Terms</div>
</div>
</div>
</div>

<div className="wireframe" style={{margin:"0"}}>
<div className="wireframe-header"><div className="wireframe-dot r"></div><div className="wireframe-dot y"></div><div className="wireframe-dot g"></div><div className="wireframe-title">Step 2: Self-Sorting Gateway</div></div>
<div className="wireframe-body" style={{padding:"28px"}}>
<div style={{textAlign:"center"}}>
<div style={{fontFamily:"var(--serif)",fontSize:"20px",marginBottom:"6px"}}>How will you use Notion?</div>
<div style={{fontSize:"14px",color:"var(--text3)",marginBottom:"20px"}}>We&apos;ll streamline your setup experience.</div>
<div style={{display:"flex",flexDirection:"column",gap:"10px",maxWidth:"280px",margin:"0 auto",textAlign:"left"}}>
<div style={{padding:"14px 16px",border:"1.5px solid var(--border)",borderRadius:"10px",fontSize:"14px",cursor:"pointer"}}>
<div style={{fontWeight:"600",marginBottom:"2px"}}>🧑‍💻 For myself</div>
<div style={{fontSize:"12px",color:"var(--text3)"}}>Personal notes, tasks, projects</div>
</div>
<div style={{padding:"14px 16px",border:"1.5px solid var(--accent)",borderRadius:"10px",fontSize:"14px",background:"var(--accent-light)"}}>
<div style={{fontWeight:"600",marginBottom:"2px"}}>👥 With my team</div>
<div style={{fontSize:"12px",color:"var(--text3)"}}>Collaborate on docs, projects, wikis</div>
</div>
<div style={{padding:"14px 16px",border:"1.5px solid var(--border)",borderRadius:"10px",fontSize:"14px"}}>
<div style={{fontWeight:"600",marginBottom:"2px"}}>🎓 For school</div>
<div style={{fontSize:"12px",color:"var(--text3)"}}>Notes, assignments, study</div>
</div>
</div>
</div>
</div>
</div>
</div>

{/* Wireframes: Steps 3 & 4 */}
<div className="ob-grid reveal">
<div className="wireframe" style={{margin:"0"}}>
<div className="wireframe-header"><div className="wireframe-dot r"></div><div className="wireframe-dot y"></div><div className="wireframe-dot g"></div><div className="wireframe-title">Step 3: Use Case Selection</div></div>
<div className="wireframe-body" style={{padding:"28px"}}>
<div style={{textAlign:"center"}}>
<div style={{fontFamily:"var(--serif)",fontSize:"20px",marginBottom:"6px"}}>What would you like to do?</div>
<div style={{fontSize:"14px",color:"var(--text3)",marginBottom:"20px"}}>Select all that apply. We&apos;ll set things up for you.</div>
<div style={{display:"flex",flexWrap:"wrap",gap:"8px",justifyContent:"center",maxWidth:"300px",margin:"0 auto"}}>
<span style={{padding:"8px 14px",border:"1.5px solid var(--accent)",borderRadius:"20px",fontSize:"13px",fontWeight:"500",background:"var(--accent-light)",color:"var(--accent)"}}>📋 Project management</span>
<span style={{padding:"8px 14px",border:"1.5px solid var(--border)",borderRadius:"20px",fontSize:"13px",fontWeight:"500",color:"var(--text2)"}}>📝 Docs & notes</span>
<span style={{padding:"8px 14px",border:"1.5px solid var(--border)",borderRadius:"20px",fontSize:"13px",fontWeight:"500",color:"var(--text2)"}}>📚 Wiki</span>
<span style={{padding:"8px 14px",border:"1.5px solid var(--accent)",borderRadius:"20px",fontSize:"13px",fontWeight:"500",background:"var(--accent-light)",color:"var(--accent)"}}>🎯 Goals & OKRs</span>
<span style={{padding:"8px 14px",border:"1.5px solid var(--border)",borderRadius:"20px",fontSize:"13px",fontWeight:"500",color:"var(--text2)"}}>📊 CRM</span>
<span style={{padding:"8px 14px",border:"1.5px solid var(--border)",borderRadius:"20px",fontSize:"13px",fontWeight:"500",color:"var(--text2)"}}>📅 Calendar</span>
</div>
<button className="wf-btn" style={{marginTop:"20px",fontSize:"14px",padding:"10px 32px"}}>Continue →</button>
</div>
</div>
</div>

<div className="wireframe" style={{margin:"0",position:"relative"}}>
<div className="wireframe-header"><div className="wireframe-dot r"></div><div className="wireframe-dot y"></div><div className="wireframe-dot g"></div><div className="wireframe-title">Step 4: Paywall Exposure</div></div>
<div className="wireframe-body" style={{padding:"28px"}}>
<div style={{textAlign:"center"}}>
<div style={{fontFamily:"var(--serif)",fontSize:"20px",marginBottom:"6px"}}>Choose your plan</div>
<div style={{fontSize:"14px",color:"var(--text3)",marginBottom:"20px"}}>Start free. Upgrade when you&apos;re ready.</div>
<div style={{display:"flex",flexDirection:"column",gap:"10px",maxWidth:"280px",margin:"0 auto",textAlign:"left"}}>
<div style={{padding:"14px 16px",border:"1.5px solid var(--border)",borderRadius:"10px",fontSize:"14px"}}>
<div style={{fontWeight:"600"}}>Free <span style={{color:"var(--text3)",fontWeight:"400",fontSize:"13px"}}>$0</span></div>
<div style={{fontSize:"12px",color:"var(--text3)",marginTop:"2px"}}>Basic features, limited AI</div>
</div>
<div style={{padding:"14px 16px",border:"1.5px solid var(--purple)",borderRadius:"10px",fontSize:"14px",background:"#F8F5FF",position:"relative"}}>
<div style={{position:"absolute",top:"-8px",right:"12px",fontSize:"10px",fontWeight:"700",background:"var(--purple)",color:"#fff",padding:"2px 8px",borderRadius:"10px"}}>POPULAR</div>
<div style={{fontWeight:"600"}}>Business <span style={{color:"var(--text3)",fontWeight:"400",fontSize:"13px"}}>$20/user/mo</span></div>
<div style={{fontSize:"12px",color:"var(--text3)",marginTop:"2px"}}>Unlimited AI, agents, advanced features</div>
</div>
</div>
<button style={{marginTop:"14px",fontSize:"13px",color:"var(--accent)",background:"none",border:"none",cursor:"pointer",textDecoration:"underline"}}>Skip for now</button>
</div>
</div>
<div className="ob-annotation" style={{position:"absolute",bottom:"12px",right:"12px"}}>⚠ Paywall before any value delivered</div>
</div>
</div>

{/* Wireframes: Steps 5 & 6 */}
<div className="ob-grid reveal">
<div className="wireframe" style={{margin:"0"}}>
<div className="wireframe-header"><div className="wireframe-dot r"></div><div className="wireframe-dot y"></div><div className="wireframe-dot g"></div><div className="wireframe-title">Step 5: Template Landing</div></div>
<div className="wireframe-body" style={{padding:"28px"}}>
<div style={{textAlign:"center"}}>
<div style={{fontFamily:"var(--serif)",fontSize:"20px",marginBottom:"6px"}}>Your workspace is ready</div>
<div style={{fontSize:"14px",color:"var(--text3)",marginBottom:"20px"}}>We added templates based on your selections.</div>
</div>
<div style={{display:"flex",flexDirection:"column",gap:"8px",textAlign:"left"}}>
<div style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px 14px",border:"1px solid var(--border)",borderRadius:"8px",fontSize:"14px",background:"var(--card)"}}>
<span style={{fontSize:"18px"}}>📋</span>
<div><div style={{fontWeight:"600",fontSize:"13px"}}>Project Tracker</div><div style={{fontSize:"11px",color:"var(--text3)"}}>Manage tasks & timelines</div></div>
</div>
<div style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px 14px",border:"1px solid var(--border)",borderRadius:"8px",fontSize:"14px",background:"var(--card)"}}>
<span style={{fontSize:"18px"}}>📝</span>
<div><div style={{fontWeight:"600",fontSize:"13px"}}>Meeting Notes</div><div style={{fontSize:"11px",color:"var(--text3)"}}>Capture & share notes</div></div>
</div>
<div style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px 14px",border:"1px solid var(--border)",borderRadius:"8px",fontSize:"14px",background:"var(--card)"}}>
<span style={{fontSize:"18px"}}>📚</span>
<div><div style={{fontWeight:"600",fontSize:"13px"}}>Team Wiki</div><div style={{fontSize:"11px",color:"var(--text3)"}}>Central knowledge base</div></div>
</div>
<div style={{fontSize:"12px",color:"var(--text3)",textAlign:"center",marginTop:"8px"}}>+ 2 more templates</div>
</div>
</div>
</div>

<div className="wireframe" style={{margin:"0"}}>
<div className="wireframe-header"><div className="wireframe-dot r"></div><div className="wireframe-dot y"></div><div className="wireframe-dot g"></div><div className="wireframe-title">Step 6: Getting Started Checklist</div></div>
<div className="wireframe-body" style={{padding:"28px"}}>
<div style={{fontSize:"14px",color:"var(--text3)",marginBottom:"4px"}}>👋 Welcome to your workspace</div>
<div style={{fontFamily:"var(--serif)",fontSize:"20px",marginBottom:"20px"}}>Getting Started</div>
<div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
<div style={{display:"flex",alignItems:"center",gap:"10px",fontSize:"14px"}}>
<div style={{width:"20px",height:"20px",borderRadius:"4px",border:"2px solid var(--green)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",color:"var(--green)"}}>✓</div>
<span style={{textDecoration:"line-through",color:"var(--text3)"}}>Create your account</span>
</div>
<div style={{display:"flex",alignItems:"center",gap:"10px",fontSize:"14px"}}>
<div style={{width:"20px",height:"20px",borderRadius:"4px",border:"2px solid var(--border)"}}></div>
<span>Write your first page</span>
</div>
<div style={{display:"flex",alignItems:"center",gap:"10px",fontSize:"14px"}}>
<div style={{width:"20px",height:"20px",borderRadius:"4px",border:"2px solid var(--border)"}}></div>
<span>Import from other tools</span>
</div>
<div style={{display:"flex",alignItems:"center",gap:"10px",fontSize:"14px"}}>
<div style={{width:"20px",height:"20px",borderRadius:"4px",border:"2px solid var(--border)"}}></div>
<span>Invite team members</span>
</div>
<div style={{display:"flex",alignItems:"center",gap:"10px",fontSize:"14px"}}>
<div style={{width:"20px",height:"20px",borderRadius:"4px",border:"2px solid var(--border)"}}></div>
<span>Try Notion AI</span>
</div>
</div>
<div className="ob-annotation" style={{marginTop:"16px"}}>No mention of databases: the core &quot;aha&quot;</div>
</div>
</div>
</div>

<p className="reveal" style={{marginTop:"8px",fontSize:"15px"}}><strong>The critical gap:</strong> This flow teaches users <em>what Notion has</em> (templates, features, plans) but never shows them <em>what makes Notion special</em>: the moment a page connects to a database and becomes something more than a doc. The checklist doesn&apos;t even mention databases.</p>

<h3 className="reveal">What&apos;s broken: The Lego problem</h3>
<p className="reveal">My interviews revealed three failing paths, each losing users in a different way:</p>

<h4 className="reveal">Path A: Random pieces (blank page)</h4>
<div className="quote reveal"><p>I spent more time decorating pages than actually studying.</p><div className="quote-author">Ujjwal Reddy (churned after 1 month)</div></div>

<h4 className="reveal">Path B: Homework (template exploration)</h4>
<div className="quote reveal"><p>I bounced between YouTube tutorials and template galleries, constantly feeling like I was doing Notion wrong.</p><div className="quote-author">Sai Teja (stuck for 2 weeks)</div></div>

<h4 className="reveal">Path C: Pre-built set (someone else&apos;s system)</h4>
<div className="quote reveal"><p>Once it became a boring-but-reliable table, Notion started to help instead of hinder.</p><div className="quote-author">Heber (took 1 month to simplify)</div></div>

<p className="reveal"><strong>None of these paths efficiently guide users to the aha moment:</strong> building a connected page + database. The onboarding teaches what Notion has, not what makes Notion special.</p>

<h3 className="reveal">My proposed redesign: AI-guided interactive building</h3>
<p className="reveal">Replace templates with a <strong>5-minute guided build</strong> where AI generates a workspace from the user&apos;s actual project, then walks them through customizing it. The goal: get every new user to the aha moment on Day 1, not Week 3. Full wireframe below in Section 11.</p>
</div>
</section>

{/* ==================== 7. AI/CAL/MAIL ==================== */}
<section id="not-07">
<div className="container">
<span className="section-num reveal">07</span>
<h2 className="reveal">UX Analysis: AI Agents, Calendar & Mail</h2>

<h3 className="reveal">AI Agents: Powerful but gated and opaque</h3>
<p className="reveal">In September 2025, Notion launched AI Agents (the &quot;Personal Agent&quot;) capable of autonomous multi-step sessions. By early 2026, Custom Agents arrived: trigger-based and running 24/7. Early adoption appeared strong, with Notion highlighting rapid uptake in its announcements.</p>

<div className="reveal">
<div className="quote"><p>Agents feel confusing and a bit overkill for an individual user, so I haven&apos;t invested time to set them up.</p><div className="quote-author">Sai Teja</div></div>
<div className="quote"><p>I tried Notion AI to ask about my schedule and inbox, but it responded that it couldn&apos;t access that information, which was confusing after I&apos;d just connected those integrations.</p><div className="quote-author">Sharath</div></div>
<div className="quote"><p>Agents are still more of a novelty; I don&apos;t trust them enough to automate important workflows.</p><div className="quote-author">Avishka</div></div>
</div>

<h3 className="reveal">Calendar: Beautiful acquisition lever, frustrating daily driver</h3>
<p className="reveal">Free on all plans. Beautifully designed (inherited from the Cron acquisition). The database deadline overlay is the killer feature. But polish gaps keep users from committing:</p>
<div className="quote reveal"><p>I keep drifting back to my old tools because Notion&apos;s versions feel half a step behind in UX and reliability.</p><div className="quote-author">Avishka</div></div>
<p className="reveal"><strong>The missing month view on mobile</strong> forces every user to keep a second calendar installed.</p>

<h3 className="reveal">Mail: Promising concept, premature launch</h3>
<p className="reveal">Gmail-only. Custom Views with AI auto-labeling (~60–70% accuracy) are innovative. But the product shipped before the integration layer was ready:</p>
<div className="quote reveal"><p>Notion&apos;s AI can&apos;t really see my events and emails in a meaningful way yet, which defeats the point.</p><div className="quote-author">Heber</div></div>
<p className="reveal"><strong>0 of 10 interviewees</strong> had fully replaced Gmail with Notion Mail.</p>
</div>
</section>

{/* ==================== 8. COMPETITIVE LESSONS ==================== */}
<section id="not-08">
<div className="container">
<span className="section-num reveal">08</span>
<h2 className="reveal">What Notion Should Learn From Competitors</h2>

<div className="reveal">
<table>
<thead><tr><th>From</th><th>Lesson</th><th>User Evidence</th></tr></thead>
<tbody>
<tr><td><strong>Obsidian</strong></td><td>Local-first earns trust. Offline must feel real.</td><td>Vishwajith: <em>&quot;On flights, Notion becomes unreliable or read-only in weird ways.&quot;</em></td></tr>
<tr><td><strong>Confluence</strong></td><td>Price the floor, not the ceiling. A 3–4x premium needs justification.</td><td>Abhishek: <em>&quot;I worry about the per-seat cost scaling.&quot;</em></td></tr>
<tr><td><strong>Microsoft Loop</strong></td><td>&quot;Good enough + already included&quot; beats &quot;better but separate&quot;</td><td>400M+ M365 users get Loop free</td></tr>
<tr><td><strong>Coda</strong></td><td>Deep automation wins power users; be connective tissue, not replacement</td><td>Abhishek: <em>&quot;I&apos;d improve deep integrations so Notion becomes the connective tissue.&quot;</em></td></tr>
</tbody>
</table>
</div>
</div>
</section>

{/* ==================== 9. RICE ==================== */}
<section id="not-09">
<div className="container wide">
<span className="section-num reveal">09</span>
<h2 className="reveal">RICE-Scored Recommendations</h2>

<div className="rice-table reveal">
<table>
<thead><tr><th>Rank</th><th>Recommendation</th><th>Reach</th><th>Impact</th><th>Confidence</th><th>Effort</th><th>RICE</th></tr></thead>
<tbody>
<tr><td><span className="rice-rank">1</span></td><td><strong>AI trial ramp</strong> (graduated, not cliff)</td><td>10M/Q</td><td>2</td><td>70%</td><td>2 mo</td><td className="rice-score">7,000</td></tr>
<tr><td><span className="rice-rank">2</span></td><td><strong>AI-guided onboarding</strong> (&quot;Build With Me&quot;)</td><td>8M/Q</td><td>2</td><td>80%</td><td>4 mo</td><td className="rice-score">3,200</td></tr>
<tr><td><span className="rice-rank">3</span></td><td><strong>AI Workspace Doctor</strong> (proactive health checks)</td><td>3M/Q</td><td>2</td><td>80%</td><td>3 mo</td><td className="rice-score">1,600</td></tr>
<tr><td><span className="rice-rank">4</span></td><td><strong>Progressive skill tree</strong> (feature unlocking)</td><td>6M/Q</td><td>2</td><td>70%</td><td>6 mo</td><td className="rice-score">1,400</td></tr>
<tr><td><span className="rice-rank">5</span></td><td><strong>Mail ↔ Database</strong> integration</td><td>1M/Q</td><td>3</td><td>60%</td><td>6 mo</td><td className="rice-score">300</td></tr>
</tbody>
</table>
</div>

<div className="assumptions reveal">
<strong>How I estimated Reach</strong><br />
Notion reports 100M+ registered users with ~20M monthly visits. I assume ~40M quarterly active users (QAUs) based on typical freemium engagement ratios (monthly active ≈ 60–70% of quarterly active).<br />
<strong>#1 AI trial ramp (10M/Q):</strong> Notion states over half of paying customers use AI, suggesting high AI trial intent across the user base. I estimate ~25% of QAUs trigger the AI limit in a given quarter: some try it once, some hit the wall repeatedly. That&apos;s ~10M quarterly.<br />
<strong>#2 Onboarding (8M/Q):</strong> Notion grew from ~30M users (2022) to 100M+ (2024), adding ~70M in roughly 2 years, or ~8–9M per quarter in that growth phase. I use 8M/Q as a conservative current-state estimate.<br />
<strong>#3 Workspace Doctor (3M/Q):</strong> Scoped to active team workspaces. ~4M paying users × ~75% on team plans = ~3M quarterly.<br />
<strong>#4 Skill tree (6M/Q):</strong> All active users past onboarding who haven&apos;t used advanced features. ~40M QAUs × ~15% who are past basics but haven&apos;t used databases/relations = ~6M.<br />
<strong>#5 Mail integration (1M/Q):</strong> Gmail-only, limited to users who have opted into Notion Mail. Conservative estimate based on early adoption of a new product.
</div>

<div className="tldr reveal">
<p><strong>The top 2 recommendations</strong> (AI trial ramp + guided onboarding) could ship in a single quarter with a small team, together addressing both sides of the conversion equation: helping users <em>experience</em> AI value and reach the aha moment faster.</p>
</div>

<h3 className="reveal">Rec #1: AI Trial Ramp (RICE: 7,000)</h3>
<p className="reveal"><strong>Problem:</strong> 20 lifetime AI responses is a cliff, not a funnel. Users hit the wall before forming the habit. 7/10 interviewees were frustrated by this.</p>
<p className="reveal"><strong>Solution:</strong> Graduated daily limits. Week 1–2: 10/day → Week 3–4: 5/day → Month 2+: 2/day. Creates an addiction curve instead of a dead end.</p>
<p className="reveal"><strong>Metrics:</strong> Free/Plus → Business conversion (+3–5 pp), AI usage in first 30 days, upgrade timeline reduction.</p>

<h3 className="reveal">Rec #2: AI-Guided Onboarding (RICE: 3,200)</h3>
<p className="reveal"><strong>Problem:</strong> 8/10 users learned Notion&apos;s value from YouTube, not from the product itself. Ujjwal churned entirely. The product teaches features, not value.</p>
<p className="reveal"><strong>Solution:</strong> A 5-minute guided build where AI asks one question, generates a workspace, and walks users through customizing it.</p>
<p className="reveal"><strong>Evidence:</strong> Sai Teja&apos;s aha moment (<em>&quot;It clicked when I built a very simple tasks database&quot;</em>) is exactly what this flow creates in 5 minutes instead of 2 weeks.</p>
<p className="reveal"><strong>Metrics:</strong> 30-day retention (+15–20%), time-to-first-database (&lt;10 min), activation rate (+10–15%).</p>

<h3 className="reveal">Rec #3: Workspace Doctor (RICE: 1,600)</h3>
<p className="reveal"><strong>Problem:</strong> Workspaces degrade over time. Stale pages, duplicate databases, broken links. Users blame Notion for the entropy they created.</p>
<p className="reveal"><strong>Solution:</strong> Weekly AI health check digest with one-click fixes. Score tracks workspace quality over time.</p>
<p className="reveal"><strong>Evidence:</strong> Avishka: <em>&quot;They&apos;re racing toward all-in-one instead of polishing the core.&quot;</em></p>

<h3 className="reveal">Rec #4: Skill Tree (RICE: 1,400)</h3>
<p className="reveal"><strong>Problem:</strong> The gap between &quot;make a page&quot; and &quot;build relational databases with rollups&quot; is enormous, with no guided path bridging it.</p>
<p className="reveal"><strong>Solution:</strong> A visual progression system: Pages → Databases → Views → Relations → Automations → Agents. Each level unlocks with real usage, not tutorials.</p>

<h3 className="reveal">Rec #5: Mail ↔ Database Integration (RICE: 300)</h3>
<p className="reveal"><strong>Problem:</strong> 0/10 users fully replaced Gmail. Sharath: <em>&quot;Tools coexist more than they collaborate.&quot;</em></p>
<p className="reveal"><strong>Solution:</strong> &quot;Save to Notion&quot; on every email, email property type in databases, inline email embeds.</p>

{/* ARR MODEL */}
<h3 className="reveal" style={{marginTop:"48px"}}>Back-of-Napkin ARR Model: How I Get to $40–60M</h3>
<p className="reveal">A hiring manager will ask &quot;where did that number come from?&quot; Here&apos;s the math, with every assumption labeled.</p>

<div className="model-box reveal">
<div style={{fontSize:"13px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"1px",color:"var(--text3)",marginBottom:"20px"}}>Lever 1: AI Trial Ramp → Conversion Lift</div>
<div className="model-row"><span className="label">Current paying users (all plans) <span className="model-tag known">Known</span></span><span className="val">~4M</span></div>
<div className="model-row"><span className="label">Overall free → any paid conversion <span className="model-tag known">Known</span></span><span className="val">~4%</span></div>
<div className="model-row"><span className="label">Among paid, Plus → Business upgrade rate <span className="model-tag est">Est.</span></span><span className="val">~8%</span></div>
<div className="model-row"><span className="label"><span className="sub">The 8% is a narrower funnel: of users already on Plus who could step up to Business for unlimited AI. The AI ramp widens this funnel.</span></span><span className="val"></span></div>
<div className="model-row"><span className="label">Free/Plus users eligible for upgrade <span className="model-tag est">Est.</span></span><span className="val">~96M</span></div>
<div className="model-row"><span className="label">Expected conversion lift from graduated ramp <span className="model-tag est">Est.</span></span><span className="val">+3–5 pp</span></div>
<div className="model-row"><span className="label">Gross incremental upgrades (96M × 3–5pp)</span><span className="val">~2.9M–4.8M</span></div>
<div className="model-row"><span className="label">Upgrade-eligible filter (active + team use case) <span className="model-tag est">Est.</span></span><span className="val">×10%</span></div>
<div className="model-row"><span className="label">Realistic incremental upgrades</span><span className="val">~290K–480K</span></div>
<div className="model-row"><span className="label">Business plan ARPU <span className="model-tag known">Known</span></span><span className="val">$240/yr</span></div>
<div className="model-row total"><span className="label">Lever 1 incremental ARR</span><span className="val">$70M–$115M</span></div>
</div>

<div className="model-box reveal">
<div style={{fontSize:"13px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"1px",color:"var(--text3)",marginBottom:"20px"}}>Lever 2: Onboarding → Retention Lift</div>
<div className="model-row"><span className="label">New signups per year <span className="model-tag est">Est.</span></span><span className="val">~32M</span></div>
<div className="model-row"><span className="label">Current 30-day retention <span className="model-tag est">Est.</span></span><span className="val">~25%</span></div>
<div className="model-row"><span className="label">Target 30-day retention (with AI onboarding) <span className="model-tag est">Est.</span></span><span className="val">~35%</span></div>
<div className="model-row"><span className="label">Incremental retained users/yr (32M × 10pp)</span><span className="val">~3.2M</span></div>
<div className="model-row"><span className="label">Of those, eventual conversion to paid (~4%) <span className="model-tag est">Est.</span></span><span className="val">~128K</span></div>
<div className="model-row"><span className="label">Blended ARPU (mix of Plus + Business) <span className="model-tag est">Est.</span></span><span className="val">$150/yr</span></div>
<div className="model-row total"><span className="label">Lever 2 incremental ARR</span><span className="val">~$19M</span></div>
</div>

<div className="model-box reveal" style={{border:"2px solid var(--accent)"}}>
<div style={{fontSize:"13px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"1px",color:"var(--accent)",marginBottom:"20px"}}>Combined Estimate</div>
<div className="model-row"><span className="label">Lever 1 (conservative end) + Lever 2</span><span className="val">~$70M + ~$19M = ~$89M</span></div>
<div className="model-row"><span className="label">Execution & overlap discount <span className="model-tag est">Est.</span></span><span className="val">33–55%</span></div>
<div className="model-row"><span className="label"><span className="sub">Accounts for: shared cohort overlap, cannibalization of users who would have upgraded anyway, and real-world execution gaps vs. modeled assumptions</span></span><span className="val"></span></div>
<div className="model-row"><span className="label">Conservative (55% discount): $89M × 0.45</span><span className="val">~$40M</span></div>
<div className="model-row"><span className="label">Optimistic (33% discount): $89M × 0.67</span><span className="val">~$60M</span></div>
<div className="model-row total"><span className="label">Net incremental ARR range</span><span className="val">$40M–$60M</span></div>
</div>

<div className="assumptions reveal">
<strong>Key assumptions & caveats</strong><br />
These are order-of-magnitude estimates, not forecasts. The two most sensitive variables: (1) the 10% upgrade-eligible filter on Lever 1 (if it&apos;s 5%, the number halves; if 15%, it grows proportionally), and (2) the execution discount, which I range from 33–55% to account for cohort overlap, cannibalization of organic upgrades, and the gap between modeled and real-world behavior. A real PM would A/B test the ramp first (fastest to ship, lowest effort) to validate the conversion lift before investing in the onboarding rebuild.<br /><br />
<em>In an interview, I&apos;d present this as &quot;here&apos;s my hypothesis and how I&apos;d test it,&quot; not as a prediction.</em>
</div>
</div>
</section>

{/* ==================== 10. RISKS & TRADEOFFS ==================== */}
<section id="not-10">
<div className="container wide">
<span className="section-num reveal">10</span>
<h2 className="reveal">Risks & Tradeoffs</h2>
<p className="reveal">Every recommendation has a way it could fail. Acknowledging these upfront makes the case stronger, not weaker: it shows the thinking behind what I&apos;d test first and what I&apos;d watch for.</p>

<div className="risk-grid reveal">

<div className="risk-card high">
<div className="risk-rec">Rec #1 · AI Trial Ramp</div>
<div className="risk-level">High Risk</div>
<h4>Cannibalization of Business upgrades</h4>
<p>If daily free AI is &quot;good enough,&quot; users who would have upgraded at the cliff now never convert. Revenue impact could be negative in the short term.</p>
<div className="mitigation">Mitigation: A/B test ramp vs. cliff on a 10% cohort for 8 weeks. Track 60-day conversion, not just 30-day. Kill if net revenue per user drops &gt;5%.</div>
</div>

<div className="risk-card med">
<div className="risk-rec">Rec #1 · AI Trial Ramp</div>
<div className="risk-level">Medium Risk</div>
<h4>Increased AI compute costs without proportional revenue</h4>
<p>Giving more free AI usage means more inference cost on Notion&apos;s side. If conversion doesn&apos;t follow, margins compress.</p>
<div className="mitigation">Mitigation: Set a per-user cost cap. Use smaller/faster models for free-tier AI. Monitor cost-per-conversion as a guardrail metric.</div>
</div>

<div className="risk-card med">
<div className="risk-rec">Rec #2 · AI-Guided Onboarding</div>
<div className="risk-level">Medium Risk</div>
<h4>AI-generated workspaces feel generic or wrong</h4>
<p>If the AI builds a workspace that doesn&apos;t match what the user imagined, it could create a worse first impression than a blank page. &quot;This isn&apos;t what I meant&quot; is a hard hole to climb out of.</p>
<div className="mitigation">Mitigation: Offer 2–3 generated options, not one. Always show &quot;Start from scratch&quot; as an escape hatch. Track rage-clicks and immediate deletion rates.</div>
</div>

<div className="risk-card low">
<div className="risk-rec">Rec #2 · AI-Guided Onboarding</div>
<div className="risk-level">Low Risk</div>
<h4>Eng effort exceeds 4-month estimate</h4>
<p>Deep integration with Notion&apos;s block editor + AI pipeline could surface unexpected complexity, especially around real-time generation and template linking.</p>
<div className="mitigation">Mitigation: Ship V1 with pre-built AI templates (lower eng lift) before building real-time generation. Validate the concept before over-investing.</div>
</div>

<div className="risk-card high">
<div className="risk-rec">Rec #3 · Workspace Doctor</div>
<div className="risk-level">High Risk</div>
<h4>&quot;Your workspace is messy&quot; feels judgmental</h4>
<p>Users who get a low health score may feel blamed rather than helped. This is especially dangerous for Champions who&apos;ve invested heavily in their workspace and take pride in it.</p>
<div className="mitigation">Mitigation: Frame scores as &quot;opportunities,&quot; not grades. Default to opt-in. Test messaging with 5–10 power users before broad launch. Never show score to anyone except the admin.</div>
</div>

<div className="risk-card med">
<div className="risk-rec">Rec #4 · Skill Tree</div>
<div className="risk-level">Medium Risk</div>
<h4>Gamification feels patronizing to power users</h4>
<p>Experienced PMs and engineers don&apos;t want badges. If the skill tree feels like a tutorial game, it&apos;ll reduce perceived product seriousness, especially in enterprise evaluations.</p>
<div className="mitigation">Mitigation: Make it invisible to users who&apos;ve already passed each level organically. Frame as &quot;feature discovery,&quot; not &quot;achievements.&quot; Test with The Dabbler segment first, not Builders.</div>
</div>

</div>

<div className="tldr reveal">
<p><strong>What I&apos;d test first:</strong> The AI trial ramp (Rec #1) is the fastest to ship and the riskiest to revenue. I&apos;d run a controlled A/B test with 10% of new free users for 8 weeks before committing. If 60-day conversion holds or improves, green-light the full rollout and start building the onboarding redesign in parallel.</p>
</div>
</div>
</section>

{/* ==================== 11. WIREFRAMES ==================== */}
<section id="not-11">
<div className="container wide">
<span className="section-num reveal">11</span>
<h2 className="reveal">Wireframe Mockups</h2>

{/* WIREFRAME 1: Onboarding */}
<h3 className="reveal">Mockup 1: AI-Guided Onboarding, &quot;Build With Me&quot;</h3>

<div className="wireframe reveal">
<div className="wireframe-header"><div className="wireframe-dot r"></div><div className="wireframe-dot y"></div><div className="wireframe-dot g"></div><div className="wireframe-title">Screen 1: The One Question</div></div>
<div className="wireframe-body">
<div className="wf-card">
<div style={{fontSize:"28px",marginBottom:"4px"}}>✨</div>
<h3 style={{fontFamily:"var(--serif)",fontSize:"24px",margin:"8px 0"}}>Let&apos;s build something together.</h3>
<p style={{color:"var(--text3)",fontSize:"15px",marginBottom:"16px"}}>What&apos;s the most important project you&apos;re working on right now?</p>
<div className="wf-input">e.g., &quot;Planning a product launch&quot;</div>
<button className="wf-btn">Build my workspace →</button>
<br />
<button className="wf-btn-outline" style={{marginTop:"12px"}}>Skip and explore templates</button>
</div>
</div>
</div>

<div className="wireframe reveal" style={{marginTop:"16px"}}>
<div className="wireframe-header"><div className="wireframe-dot r"></div><div className="wireframe-dot y"></div><div className="wireframe-dot g"></div><div className="wireframe-title">Screen 2: AI Building</div></div>
<div className="wireframe-body">
<div className="wf-card">
<div style={{fontSize:"28px",marginBottom:"4px"}}>🔨</div>
<h3 style={{fontFamily:"var(--serif)",fontSize:"22px",margin:"8px 0 20px"}}>Building your workspace...</h3>
<div className="wf-loader">
<div className="wf-loader-item"><span className="check">✓</span> Creating your project page</div>
<div className="wf-loader-item"><span className="check">✓</span> Adding a task tracker database</div>
<div className="wf-loader-item"><span className="pending">○</span> Linking everything together</div>
<div className="wf-loader-item"><span className="pending">○</span> Adding starter content</div>
</div>
<p style={{fontSize:"13px",color:"var(--text3)",marginTop:"16px"}}>This takes about 10 seconds.</p>
</div>
</div>
</div>

<div className="wireframe reveal" style={{marginTop:"16px"}}>
<div className="wireframe-header"><div className="wireframe-dot r"></div><div className="wireframe-dot y"></div><div className="wireframe-dot g"></div><div className="wireframe-title">Screen 3: Guided Customization</div></div>
<div className="wireframe-body">
<p style={{fontSize:"13px",color:"var(--text3)",marginBottom:"4px"}}>← Your workspace</p>
<h3 style={{fontSize:"20px",marginBottom:"16px"}}>📋 Product Launch</h3>
<div className="wf-db">
<div className="wf-db-header"><span>Task</span><span>Status</span><span>Owner</span><span>Due Date</span></div>
<div className="wf-db-row"><span>Write PRD draft</span><span><span className="wf-status todo">To Do</span></span><span>—</span><span>Mar 25</span></div>
<div className="wf-db-row"><span>Design mockups</span><span><span className="wf-status todo">To Do</span></span><span>—</span><span>Mar 28</span></div>
<div className="wf-db-row"><span>Set up analytics</span><span><span className="wf-status todo">To Do</span></span><span>—</span><span>Apr 1</span></div>
</div>
<div className="wf-coach">
<strong>👆 Step 1 of 3:</strong> Try adding a new column! Click the &quot;+&quot; on the table header to add a Priority property.
<br /><br />
<button style={{background:"rgba(255,255,255,.2)",border:"1px solid rgba(255,255,255,.4)",color:"#fff",padding:"6px 16px",borderRadius:"6px",fontSize:"13px",cursor:"pointer"}}>Got it →</button>
</div>
</div>
</div>
<p className="reveal" style={{marginTop:"12px"}}><strong>Design rationale:</strong> Sai Teja&apos;s aha moment (building a simple database) happens in 5 minutes instead of 2 weeks. Users learn building blocks through their own project.</p>

{/* WIREFRAME 2: AI Ramp */}
<h3 className="reveal" style={{marginTop:"48px"}}>Mockup 2: AI Trial Ramp, Current vs. Proposed</h3>

<div className="compare reveal">
<div>
<div className="compare-label bad">❌ Current: Hard Paywall</div>
<div style={{textAlign:"center",padding:"24px 0"}}>
<div style={{fontSize:"32px",marginBottom:"8px"}}>⚠️</div>
<p style={{fontWeight:"600",color:"var(--text)",marginBottom:"8px"}}>You&apos;ve used all 20 AI trial responses.</p>
<p style={{fontSize:"14px",color:"var(--text3)",marginBottom:"16px"}}>Upgrade to Business ($20/mo) for unlimited AI.</p>
<button className="wf-btn" style={{width:"100%"}}>Upgrade Now</button>
<p style={{fontSize:"12px",color:"var(--text3)",marginTop:"12px"}}>(No other option. Dead end.)</p>
</div>
</div>
<div>
<div className="compare-label good">✅ Proposed: Graduated Ramp</div>
<div style={{padding:"24px 0"}}>
<p style={{fontWeight:"600",marginBottom:"4px"}}>✨ AI responses today: 3 of 5</p>
<div className="wf-progress"><div className="wf-progress-fill blue" style={{width:"60%"}}></div></div>
<p style={{fontSize:"14px",color:"var(--text3)",marginBottom:"16px"}}>Resets tomorrow at 9:00 AM.</p>
<p style={{fontSize:"14px",color:"var(--text2)",marginBottom:"12px"}}>Want unlimited AI + agents?</p>
<button className="wf-btn" style={{width:"100%",background:"var(--green)",fontSize:"14px"}}>See Business Plan →</button>
<div style={{fontSize:"12px",color:"var(--text3)",marginTop:"12px",lineHeight:"1.6"}}>
Week 1–2: 10/day<br />
Week 3–4: 5/day<br />
Month 2+: 2/day
</div>
</div>
</div>
</div>
<p className="reveal"><strong>Design rationale:</strong> 7/10 interviewees frustrated with AI pricing. A graduated ramp builds AI habits before asking for the upgrade.</p>

{/* WIREFRAME 3: Workspace Doctor */}
<h3 className="reveal" style={{marginTop:"48px"}}>Mockup 3: Workspace Doctor, Weekly Health Digest</h3>

<div className="wireframe reveal">
<div className="wireframe-header"><div className="wireframe-dot r"></div><div className="wireframe-dot y"></div><div className="wireframe-dot g"></div><div className="wireframe-title">Weekly Health Report</div></div>
<div className="wireframe-body">
<div style={{textAlign:"center",marginBottom:"24px"}}>
<div style={{fontSize:"14px",color:"var(--text3)",marginBottom:"8px"}}>🩺 Workspace Health Report · Mar 17, 2026</div>
<div style={{fontFamily:"var(--mono)",fontSize:"36px",fontWeight:"700",color:"var(--green)"}}>82<span style={{fontSize:"18px",color:"var(--text3)"}}>/100</span></div>
<div className="wf-progress" style={{maxWidth:"300px",margin:"8px auto"}}><div className="wf-progress-fill green" style={{width:"82%"}}></div></div>
<div style={{fontSize:"13px",color:"var(--text3)"}}>Up from 76 last week. Nice work!</div>
</div>

<div className="wf-health-item">
<div className="wf-health-dot red"></div>
<div>
<div style={{fontWeight:"600",fontSize:"15px"}}>5 pages not updated in 90+ days</div>
<div style={{fontSize:"13px",color:"var(--text3)"}}>Marketing Q3 Plan, Old Roadmap, Event Notes...</div>
<div className="wf-health-actions"><button>Archive All</button><button>Review →</button></div>
</div>
</div>

<div className="wf-health-item">
<div className="wf-health-dot yellow"></div>
<div>
<div style={{fontWeight:"600",fontSize:"15px"}}>2 duplicate databases detected</div>
<div style={{fontSize:"13px",color:"var(--text3)"}}>&quot;Meeting Notes&quot; appears in two teamspaces</div>
<div className="wf-health-actions"><button>Merge</button><button>Ignore</button></div>
</div>
</div>

<div className="wf-health-item">
<div className="wf-health-dot green"></div>
<div>
<div style={{fontWeight:"600",fontSize:"15px"}}>3 team members joined this week</div>
<div style={{fontSize:"13px",color:"var(--text3)"}}>They haven&apos;t completed onboarding yet</div>
<div className="wf-health-actions"><button>Send Reminder</button></div>
</div>
</div>

<div style={{textAlign:"center",marginTop:"20px",paddingTop:"16px",borderTop:"1px solid var(--border)"}}>
<span style={{fontSize:"13px",color:"var(--text3)"}}>Next scan: March 24</span>
<button style={{marginLeft:"12px",fontSize:"12px",padding:"4px 12px",border:"1px solid var(--border)",borderRadius:"6px",background:"var(--card)",color:"var(--text2)",cursor:"pointer"}}>Adjust Settings</button>
</div>
</div>
</div>
<p className="reveal"><strong>Design rationale:</strong> Avishka&apos;s critique (&quot;racing toward all-in-one instead of polishing the core&quot;) speaks to workspace entropy. A self-maintaining system addresses this directly.</p>

{/* WIREFRAME 4: Mail */}
<h3 className="reveal" style={{marginTop:"48px"}}>Mockup 4: Mail → Database Integration</h3>

<div className="wireframe reveal">
<div className="wireframe-header"><div className="wireframe-dot r"></div><div className="wireframe-dot y"></div><div className="wireframe-dot g"></div><div className="wireframe-title">Notion Mail: Save to Database</div></div>
<div className="wireframe-body">
<div style={{borderBottom:"1px solid var(--border)",paddingBottom:"16px",marginBottom:"16px"}}>
<div style={{fontSize:"13px",color:"var(--text3)"}}>From: sarah.chen@client.com</div>
<div style={{fontWeight:"600",fontSize:"16px",marginTop:"4px"}}>Q2 deliverables feedback</div>
</div>
<p style={{fontSize:"15px",color:"var(--text2)",marginBottom:"20px"}}>Hi team, here&apos;s our feedback on the Q2 deliverables. Overall the direction is strong but we have concerns about...</p>
<div style={{display:"flex",gap:"12px",marginBottom:"24px"}}>
<button className="wf-btn" style={{fontSize:"14px"}}>💾 Save to Notion</button>
<button className="wf-btn-outline">↩ Reply</button>
</div>

<div style={{background:"var(--bg)",borderRadius:"10px",padding:"24px",border:"1px solid var(--border)"}}>
<div style={{fontSize:"13px",fontWeight:"600",color:"var(--text3)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:"16px"}}>Save to Notion Database</div>
<div className="wf-mail-field"><span className="wf-mail-label">Save to</span><span className="wf-mail-value">Client Feedback DB ▼</span></div>
<div className="wf-mail-field"><span className="wf-mail-label">Title</span><span className="wf-mail-value">Q2 deliverables feedback</span></div>
<div className="wf-mail-field"><span className="wf-mail-label">Status</span><span className="wf-mail-value">Needs Review ▼</span></div>
<div className="wf-mail-field"><span className="wf-mail-label">Client</span><span className="wf-mail-value">Sarah Chen ▼</span></div>
<div className="wf-mail-field"><span className="wf-mail-label">Priority</span><span className="wf-mail-value">High ▼</span></div>
<div style={{marginTop:"16px",fontSize:"14px",color:"var(--text2)"}}>
<label style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}><input type="checkbox" defaultChecked /> Include email body as page content</label>
<label style={{display:"flex",alignItems:"center",gap:"8px"}}><input type="checkbox" /> Link attachments</label>
</div>
<button className="wf-btn" style={{width:"100%",marginTop:"16px"}}>Save to Database</button>
</div>
</div>
</div>
<p className="reveal"><strong>Design rationale:</strong> Sharath&apos;s complaint (&quot;tools coexist more than they collaborate&quot;) is solved by making emails actionable within the database workflow.</p>

</div>
</section>

{/* ==================== 12. METRICS ==================== */}
<section id="not-12">
<div className="container">
<span className="section-num reveal">12</span>
<h2 className="reveal">Success Framework</h2>

<h3 className="reveal">North Star Metric</h3>
<p className="reveal"><strong>Weekly Active Teams creating or modifying AI-generated content.</strong> This captures collaboration, AI adoption, and active usage in a single measure.</p>

<div className="reveal">
<table>
<thead><tr><th>Level</th><th>Metric</th><th>Current (est.)</th><th>Target</th><th>Linked to</th></tr></thead>
<tbody>
<tr><td>North Star</td><td>Weekly active teams using AI</td><td>~200K</td><td><strong>350K</strong></td><td>All recs</td></tr>
<tr><td>L1</td><td>New user 30-day retention</td><td>~25%</td><td><strong>35%</strong></td><td>Onboarding</td></tr>
<tr><td>L1</td><td>Time to first database</td><td>~7–14 days</td><td><strong>&lt;10 min</strong></td><td>Onboarding</td></tr>
<tr><td>L1</td><td>Plus → Business upgrade rate</td><td>~8%</td><td><strong>13%</strong></td><td>AI ramp</td></tr>
<tr><td>L1</td><td>180-day admin retention</td><td>~65%</td><td><strong>78%</strong></td><td>Doctor</td></tr>
<tr><td>L2</td><td>Feature adoption (relations, agents)</td><td>~12%</td><td><strong>25%</strong></td><td>Skill tree</td></tr>
<tr><td>L2</td><td>Mail daily active users</td><td>~150K</td><td><strong>400K</strong></td><td>Mail integration</td></tr>
</tbody>
</table>
</div>

<h3 className="reveal">Do-not-disturb metrics</h3>
<p className="reveal">These must NOT degrade: signup completion rate, existing user NPS, page load time p95, enterprise security audit pass rate.</p>
</div>
</section>

{/* ==================== 13. OUTLOOK ==================== */}
<section id="not-13">
<div className="container">
<span className="section-num reveal">13</span>
<h2 className="reveal">Strategic Outlook</h2>

<h3 className="reveal">What Notion&apos;s paradox reveals about productivity</h3>

<p className="reveal"><strong>1. AI agents will compress the activation timeline.</strong> The Week 3 cliff exists because humans learn slowly. AI-guided onboarding could collapse weeks into minutes, not just for Notion but for every complex SaaS product.</p>

<p className="reveal"><strong>2. &quot;All-in-one&quot; works until it doesn&apos;t.</strong> Abhishek: <em>&quot;Notion wants to be my entire operating system but doesn&apos;t fully replace specialized tools.&quot;</em> Each new product adds maintenance burden. The question isn&apos;t whether Notion can build everything. It&apos;s whether those products work together better than best-of-breed alternatives.</p>

<p className="reveal"><strong>3. Pricing is the primary battleground.</strong> Confluence at $5/user with AI included. Loop free with M365. Notion&apos;s $20/user Business tier must deliver clearly superior value to justify the premium. The AI Agent capabilities are differentiated today, but the window is narrowing fast.</p>

<div className="quote reveal" style={{borderLeft:"4px solid var(--accent)",background:"var(--card)"}}><p>I&apos;d pause big new feature launches for a cycle and focus entirely on speed, offline mode, and making existing features feel truly integrated and reliable.</p><div className="quote-author">Avishka</div></div>

<p className="reveal"><strong>My bet:</strong> The winner of the &quot;AI work OS&quot; category won&apos;t be the company with the most powerful agents. It will be the one that gets the most users to a state where agents are actually useful to them. That&apos;s an activation problem, not a feature problem. And it&apos;s the single highest-leverage investment Notion can make right now.</p>
</div>
</section>


    </>
  );
}
