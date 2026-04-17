'use client';

import { useState, useEffect } from "react";

const S = ["Cover","Why This","Overview","CIRCLES","Users","Pain Points","Solutions","Wireframes","Metrics","Landscape","PRD","Reflection","Sources"];
const SID = ["hero","why","overview","circles","users","pain","solutions","wireframes","metrics","landscape","prd","reflection","sources"];

const useActive = () => {
  const [a, setA] = useState("hero");
  useEffect(() => {
    const o = new IntersectionObserver(e => e.forEach(x => x.isIntersecting && setA(x.target.id)), { rootMargin: "-35% 0px -35% 0px" });
    SID.forEach(id => { const el = document.getElementById(id); if (el) o.observe(el); });
    return () => o.disconnect();
  }, []);
  return a;
};

const Progress = () => {
  const [p, setP] = useState(0);
  useEffect(() => {
    const h = () => setP(Math.min(100, (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100));
    window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h);
  }, []);
  return <div style={{ position:"fixed",top:0,left:0,width:"100%",height:2,zIndex:999,background:"rgba(0,0,0,.04)" }}><div style={{ height:"100%",width:`${p}%`,background:"linear-gradient(90deg,#8B4513,#C4956A)",transition:"width .15s" }}/></div>;
};

const Nav = ({ active }) => (
  <div style={{ position:"fixed",right:16,top:"50%",transform:"translateY(-50%)",zIndex:90,display:"flex",flexDirection:"column",gap:6 }}>
    {SID.map((id,i) => <a key={id} href={`#${id}`} title={S[i]} style={{ width:active===id?20:6,height:6,borderRadius:3,background:active===id?"#8B4513":"rgba(139,69,19,.15)",transition:"all .3s ease",display:"block",textDecoration:"none" }}/>)}
  </div>
);

const Wrap = ({ children, style = {} }) => <div style={{ maxWidth:720,margin:"0 auto",padding:"0 32px",...style }}>{children}</div>;

const Head = ({ n, title, sub }) => (
  <div style={{ marginBottom:40 }}>
    {n && <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:13,letterSpacing:".2em",color:"#8B4513",marginBottom:10,fontWeight:600 }}>{String(n).padStart(2,"0")}</div>}
    <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:36,lineHeight:1.15,color:"#1C1410",margin:"0 0 10px",fontWeight:700 }}>{title}</h2>
    {sub && <p style={{ fontFamily:"'Source Serif 4',serif",fontSize:16,lineHeight:1.6,color:"#8A7E73",margin:0,fontStyle:"italic" }}>{sub}</p>}
  </div>
);

const Insight = ({ children, type = "insight" }) => {
  const c = { insight:{bg:"#FAF3ED",bdr:"#8B4513",lbl:"PM INSIGHT",lc:"#8B4513"}, takeaway:{bg:"#F2F5EF",bdr:"#5C6B4F",lbl:"KEY TAKEAWAY",lc:"#5C6B4F"}, risk:{bg:"#F9F0EE",bdr:"#A0522D",lbl:"RED FLAG",lc:"#A0522D"}, opp:{bg:"#FBF8F0",bdr:"#B8860B",lbl:"OPPORTUNITY",lc:"#9A7209"} }[type] || { bg:"#FAF3ED",bdr:"#8B4513",lbl:"PM INSIGHT",lc:"#8B4513" };
  return (
    <div style={{ background:c.bg,borderLeft:`3px solid ${c.bdr}`,borderRadius:"0 10px 10px 0",padding:"24px 28px",margin:"32px 0" }}>
      <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:11,letterSpacing:".14em",fontWeight:700,color:c.lc,marginBottom:10 }}>{c.lbl}</div>
      <div style={{ fontFamily:"'Source Serif 4',serif",fontSize:15,lineHeight:1.8,color:"#3D3229" }}>{children}</div>
    </div>
  );
};

const Stat = ({ v, l, note, accent = "#8B4513" }) => (
  <div style={{ background:"#fff",borderRadius:12,padding:"26px 20px",border:"1px solid rgba(28,20,16,.05)",textAlign:"center" }}>
    <div style={{ fontFamily:"'Playfair Display',serif",fontSize:30,fontWeight:700,color:accent,marginBottom:4 }}>{v}</div>
    <div style={{ fontFamily:"'Source Serif 4',serif",fontSize:13,fontWeight:500,color:"#1C1410",marginBottom:3 }}>{l}</div>
    {note && <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:10,letterSpacing:".06em",color:"#A89E93",fontWeight:600 }}>{note}</div>}
  </div>
);

const GMVChart = () => {
  const d = [{y:"2021",v:0.9,l:"$0.9B"},{y:"2022",v:4.4,l:"$4.4B"},{y:"2023",v:11,l:"$11B"},{y:"2024",v:33.2,l:"$33.2B"},{y:"H1'25",v:26.2,l:"$26.2B"},{y:"2025E",v:64,l:"~$64B"},{y:"2026F",v:112,l:"~$112B"}];
  return (
    <div style={{ background:"#1C1410",borderRadius:14,padding:"28px 24px 20px",margin:"28px 0" }}>
      <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:11,letterSpacing:".12em",color:"#8A7E73",fontWeight:600,marginBottom:20 }}>TIKTOK SHOP — GLOBAL GMV TRAJECTORY</div>
      <div style={{ display:"flex",alignItems:"flex-end",gap:6,height:170 }}>
        {d.map((item,i) => {
          const h = (item.v/120)*150; const fc = i >= 5;
          return (
            <div key={i} style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:10,fontWeight:700,color:fc?"#B8860B":"#C4956A",marginBottom:5 }}>{item.l}</div>
              <div style={{ width:"100%",maxWidth:42,height:h,borderRadius:"5px 5px 0 0",background:fc?"repeating-linear-gradient(135deg,rgba(184,134,11,.25),rgba(184,134,11,.25) 3px,rgba(184,134,11,.1) 3px,rgba(184,134,11,.1) 6px)":`linear-gradient(180deg,#C4956A ${i<3?"70%":"30%"},#5C6B4F)` }}/>
              <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:9,color:"#6B5E52",marginTop:7,fontWeight:600 }}>{item.y}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Persona = ({ name, age, type, emoji, bg, behaviors, pains }) => (
  <div style={{ background:"#fff",borderRadius:14,overflow:"hidden",border:"1px solid rgba(28,20,16,.05)" }}>
    <div style={{ background:bg,padding:"20px 22px",color:"#fff" }}>
      <div style={{ fontSize:26,marginBottom:4 }}>{emoji}</div>
      <div style={{ fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700 }}>{name}, {age}</div>
      <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:10,letterSpacing:".08em",fontWeight:600,opacity:.85,marginTop:3 }}>{type}</div>
    </div>
    <div style={{ padding:"16px 22px" }}>
      <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:10,letterSpacing:".1em",fontWeight:700,color:"#8A7E73",marginBottom:6 }}>BEHAVIORS</div>
      <div style={{ fontFamily:"'Source Serif 4',serif",fontSize:12.5,lineHeight:1.65,color:"#3D3229",marginBottom:14 }}>{behaviors}</div>
      <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:10,letterSpacing:".1em",fontWeight:700,color:"#A0522D",marginBottom:6 }}>PAIN POINTS</div>
      <div style={{ fontFamily:"'Source Serif 4',serif",fontSize:12.5,lineHeight:1.65,color:"#3D3229" }}>{pains}</div>
    </div>
  </div>
);

const Phone = ({ title, children }) => (
  <div style={{ display:"flex",flexDirection:"column",alignItems:"center" }}>
    <div style={{ width:200,height:400,borderRadius:26,border:"2.5px solid #1C1410",background:"#FDFBF8",overflow:"hidden",position:"relative",boxShadow:"0 12px 40px rgba(28,20,16,.12)" }}>
      <div style={{ height:26,background:"#1C1410",display:"flex",alignItems:"center",justifyContent:"center" }}><div style={{ width:50,height:3,borderRadius:2,background:"#3D3229" }}/></div>
      <div style={{ padding:9,height:340,overflow:"hidden" }}>{children}</div>
      <div style={{ position:"absolute",bottom:5,left:"50%",transform:"translateX(-50%)",width:70,height:3,borderRadius:2,background:"#ccc" }}/>
    </div>
    <div style={{ fontFamily:"'Source Serif 4',serif",fontSize:11.5,fontWeight:600,color:"#1C1410",marginTop:12,textAlign:"center" }}>{title}</div>
  </div>
);

const CStep = ({ letter, title, sub, color, bg, children }) => (
  <div style={{ background:bg,borderRadius:14,padding:"26px 28px",marginBottom:16,border:`1px solid ${color}15` }}>
    <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:14 }}>
      <div style={{ width:34,height:34,borderRadius:9,background:color,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:"#fff",flexShrink:0 }}>{letter}</div>
      <div>
        <div style={{ fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:"#1C1410" }}>{title}</div>
        <div style={{ fontFamily:"'Source Serif 4',serif",fontSize:11.5,color:"#8A7E73",fontStyle:"italic" }}>{sub}</div>
      </div>
    </div>
    <div style={{ fontFamily:"'Source Serif 4',serif",fontSize:14.5,lineHeight:1.8,color:"#3D3229" }}>{children}</div>
  </div>
);

export default function TikTokShopCaseStudy() {
  const active = useActive();
  const body = { fontFamily:"'Source Serif 4',serif",fontSize:15.5,lineHeight:1.85,color:"#3D3229",margin:"0 0 20px" };
  const h3s = { fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:"#1C1410",margin:"36px 0 14px" };

  return (
    <div style={{ background:"#F8F4EF",minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,500;0,8..60,600;0,8..60,700;1,8..60,400;1,8..60,500&display=swap');
        *{box-sizing:border-box;scroll-behavior:smooth}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(139,69,19,.15);border-radius:3px}
        ::selection{background:rgba(139,69,19,.12)}
      `}</style>
      <Progress /><Nav active={active} />

      {/* ══ HERO ══ */}
      <section id="hero" style={{ minHeight:"100vh",background:"linear-gradient(170deg,#1C1410 0%,#2A1F18 40%,#3D2E22 100%)",display:"flex",flexDirection:"column",justifyContent:"center",padding:"80px 0",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:-150,right:-100,width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(196,149,106,.08) 0%,transparent 70%)" }}/>
        <div style={{ position:"absolute",bottom:-100,left:-80,width:350,height:350,borderRadius:"50%",background:"radial-gradient(circle,rgba(92,107,79,.06) 0%,transparent 70%)" }}/>
        <Wrap>
          <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:12,letterSpacing:".25em",color:"#C4956A",marginBottom:28,fontWeight:600 }}>PM CASE STUDY — SOCIAL COMMERCE</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:56,lineHeight:1.05,color:"#F8F4EF",margin:"0 0 20px",fontWeight:700,maxWidth:560 }}>TikTok Shop</h1>
          <p style={{ fontFamily:"'Source Serif 4',serif",fontSize:20,lineHeight:1.55,color:"rgba(248,244,239,.5)",margin:"0 0 44px",maxWidth:500,fontStyle:"italic" }}>Redesigning trust, discovery & purchase confidence in the world&apos;s fastest-growing social commerce platform.</p>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,borderRadius:12,overflow:"hidden",maxWidth:600 }}>
            {[{v:"~$64B",l:"GMV 2025 (EST.)",c:"#C4956A"},{v:"800K+",l:"US Shops",c:"#5C6B4F"},{v:"15M+",l:"Creators Global",c:"#B8860B"},{v:"1.3/5",l:"Trustpilot",c:"#A0522D"}].map((s,i) => (
              <div key={i} style={{ background:"rgba(248,244,239,.04)",padding:"22px 14px",textAlign:"center",backdropFilter:"blur(8px)" }}>
                <div style={{ fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:s.c,marginBottom:5 }}>{s.v}</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:9,letterSpacing:".06em",color:"rgba(248,244,239,.35)",fontWeight:600 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:36,display:"flex",gap:12,flexWrap:"wrap" }}>
            {["CIRCLES Framework","Wireframes","PRD","Fact-Checked Data"].map((t,i) => (
              <span key={i} style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:10,letterSpacing:".08em",fontWeight:600,padding:"7px 14px",borderRadius:5,background:"rgba(248,244,239,.04)",color:"rgba(248,244,239,.4)",border:"1px solid rgba(248,244,239,.06)" }}>{t}</span>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ══ WHY THIS ══ */}
      <section id="why" style={{ padding:"70px 0",background:"#fff" }}>
        <Wrap>
          <Head n={0} title="Why TikTok Shop?" sub="Why I chose this product, and what makes this case study different" />
          <p style={body}>I chose TikTok Shop because it sits at the intersection of three trends I&apos;m deeply interested in: creator-driven commerce, algorithmic discovery, and marketplace trust design. As someone who studies how content platforms evolve into transactional ecosystems, TikTok Shop represents the most aggressive experiment in collapsing the entertainment-to-purchase funnel, and its growing pains are the most instructive product challenges in social commerce today.</p>
          <p style={body}>What makes this case study different from a surface-level product teardown: every data point is sourced and cross-referenced (with confidence levels noted), I&apos;ve flagged where commonly cited stats are actually unverifiable, and the proposed solutions are scoped to realistic engineering timelines with explicit trade-offs. I didn&apos;t just identify problems. I worked through why the obvious solutions might fail and what constraints a PM would actually face building within TikTok&apos;s ecosystem.</p>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,margin:"28px 0" }}>
            {[{n:"Approach",d:"Product improvement case study using the CIRCLES framework, grounded in verified market data"},{n:"Scope",d:"Trust & discovery UX for impulse buyers, the largest and highest-volume user segment on TikTok Shop"},{n:"Artifacts",d:"CIRCLES analysis, 3 wireframe mockups, full PRD with phased scope, benchmarked success metrics"}].map((x,i) => (
              <div key={i} style={{ background:"#F8F4EF",borderRadius:10,padding:"18px 20px",border:"1px solid rgba(28,20,16,.04)" }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:10,letterSpacing:".1em",fontWeight:700,color:"#8B4513",marginBottom:8 }}>{x.n.toUpperCase()}</div>
                <div style={{ fontFamily:"'Source Serif 4',serif",fontSize:13,lineHeight:1.65,color:"#3D3229" }}>{x.d}</div>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ══ OVERVIEW ══ */}
      <section id="overview" style={{ padding:"90px 0 70px" }}>
        <Wrap>
          <Head n={1} title="Company Overview" sub="From entertainment app to ~$64B commerce engine in four years" />
          <p style={body}>TikTok Shop has transformed from a bolt-on feature into one of the fastest-growing commerce platforms in history. Global GMV grew from roughly $0.9B (2021) to an estimated $64B+ in 2025 (per Momentum Works/Tabcut), approximately 70x in four years. In the US, monthly GMV grew from about $15M at launch (September 2023) to over $1.1B by mid-2025. According to Earnest Analytics, TikTok commanded 68% of tracked US social shopping GMV among marketplace platforms, with over 800K US shops and tens of millions of active buyers.</p>
          <GMVChart />
          <p style={body}>Beauty & personal care leads category sales at roughly one-fifth of GMV, followed by womenswear in the low teens. Health products were the fastest-growing category with several-hundred-percent YoY growth. In January 2026, TikTok reportedly finalized a USDS Joint Venture deal (Oracle, Silver Lake, and MGX as managing investors, ByteDance retaining a reported 19.9% minority stake) aimed at resolving the US regulatory overhang under PAFACA.</p>
          <Insight type="insight">TikTok Shop&apos;s core innovation is collapsing the &quot;discover → research → purchase&quot; funnel into a single scroll. Users arrive for entertainment, encounter products organically through creator content, and buy without ever forming explicit purchase intent. 67% of users say TikTok inspires them to shop when they weren&apos;t planning to. This inverts the Amazon model and creates new product challenges around trust, quality signals, and post-purchase satisfaction.</Insight>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,margin:"28px 0" }}>
            <Stat v="95 min" l="Daily Time on App" note="GLOBAL AVERAGE" accent="#5C6B4F"/>
            <Stat v="81.3%" l="Repeat Purchase Rate" note="EARNEST ANALYTICS" accent="#8B4513"/>
            <Stat v="~$20" l="Avg Item Price (US)" note="LOW VS. AMAZON'S $88 AOV" accent="#A0522D"/>
            <Stat v="6%" l="Seller Commission" note="STANDARD US RATE" accent="#B8860B"/>
          </div>
        </Wrap>
      </section>

      {/* ══ CIRCLES ══ */}
      <section id="circles" style={{ padding:"70px 0",background:"#fff" }}>
        <Wrap>
          <Head n={2} title="CIRCLES Framework" sub="Structured product thinking for TikTok Shop's trust & discovery challenge" />
          <CStep letter="C" title="Comprehend the Situation" sub="What problem space are we in?" color="#8B4513" bg="#FAF3ED">
            TikTok Shop is a native marketplace embedded within TikTok&apos;s content feed. Despite an estimated $64B+ GMV and explosive growth, the platform faces a critical trust deficit: its Trustpilot rating hovers around 1.3/5 with overwhelmingly negative reviews. Per TikTok&apos;s own H1 2025 Safety Report, tens of millions of product listings were rejected pre-listing and hundreds of thousands of sellers were removed, yet buyer perception hasn&apos;t meaningfully improved. The gap between content-driven discovery and purchase confidence is the central product challenge.
          </CStep>
          <CStep letter="I" title="Identify the Customer" sub="Who are we solving for?" color="#5C6B4F" bg="#F2F5EF">
            Three primary segments: (1) Impulse Discoverers: Gen Z/millennial users who buy on emotion from FYP videos (58% of TikTok users make purchases). (2) Intentional Shoppers: users who come to the Shop tab with specific needs but struggle with search, filtering, and comparison. (3) Creator-Influenced Buyers: users who trust specific creators and need confidence that affiliate recommendations are genuine.
          </CStep>
          <CStep letter="R" title="Report Customer Needs" sub="What do these users actually need?" color="#B8860B" bg="#FBF8F0">
            Trust transparency at point-of-purchase. Clear signals of seller legitimacy, product authenticity, and review credibility. Seamless content-to-commerce transition without jarring context switches. Post-purchase confidence through reliable tracking, easy dispute resolution, and consistent quality matching the video. Discovery beyond the algorithm: the ability to search, filter, and compare when users have specific intent.
          </CStep>
          <CStep letter="C" title="Cut Through Prioritization" sub="Which customer and need do we focus on?" color="#6B5E52" bg="#F5F1EC">
            Focusing on Impulse Discoverers, the largest segment generating highest transaction volume. Their trust concerns directly impact conversion rate (currently 0.3–0.6%), return rate, and the repeat purchase engine. Solving trust here has compounding effects: higher conversion lifts GMV, fewer returns improve seller economics, and better satisfaction drives sustainable commerce.
          </CStep>
          <CStep letter="L" title="List Solutions" sub="What could we build?" color="#5C6B4F" bg="#F2F5EF">
            <strong>S1: Seller Trust Score.</strong> Composite reliability metric (0–100) surfaced at purchase touchpoints, combining shipping performance, review authenticity, return rate, account age, and video-product match rate.<br/><br/>
            <strong>S2: Smart Product Card.</strong> Enhanced in-feed overlay showing price, trust score, verified reviews, and &quot;similar from trusted sellers,&quot; all without leaving the video.<br/><br/>
            <strong>S3: Creator Transparency Labels.</strong> Three-tier disclosure (Paid/Affiliate/Organic) with creator track record showing what % of promoted products maintain 4+ stars after 30 days.
          </CStep>
          <CStep letter="E" title="Evaluate Trade-offs" sub="Impact vs. effort analysis" color="#A0522D" bg="#F9F0EE">
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginTop:8 }}>
              {[{s:"Trust Score",im:"HIGH",ef:"MED",r:"Seller pushback"},{s:"Smart Card",im:"HIGH",ef:"HIGH",r:"Feed clutter"},{s:"Creator Labels",im:"MED",ef:"LOW",r:"Creator resistance"}].map((x,i)=>(
                <div key={i} style={{ background:"#fff",borderRadius:8,padding:12,border:"1px solid rgba(28,20,16,.04)" }}>
                  <div style={{ fontFamily:"'Playfair Display',serif",fontSize:12,fontWeight:600,color:"#1C1410",marginBottom:6 }}>{x.s}</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:10,lineHeight:1.7,color:"#6B5E52",fontWeight:500 }}>
                    Impact: <span style={{ color:x.im==="HIGH"?"#5C6B4F":"#B8860B",fontWeight:700 }}>{x.im}</span><br/>
                    Effort: <span style={{ color:x.ef==="HIGH"?"#A0522D":x.ef==="MED"?"#B8860B":"#5C6B4F",fontWeight:700 }}>{x.ef}</span><br/>
                    Risk: {x.r}
                  </div>
                </div>
              ))}
            </div>
          </CStep>
          <CStep letter="S" title="Summarize Recommendation" sub="" color="#1C1410" bg="linear-gradient(135deg,#1C1410,#2A1F18)">
            <span style={{ color:"rgba(248,244,239,.75)" }}><strong style={{ color:"#C4956A" }}>Build all three as an integrated &quot;Trust Layer,&quot; phased over two quarters.</strong> Phase 1 (Q1): Ship Creator Transparency Labels (low effort, regulatory goodwill) + Trust Score v1 as a simple badge. Phase 2 (Q2): Launch Smart Product Cards in-feed, leveraging trust data. Each phase generates data that improves the next.</span>
          </CStep>
        </Wrap>
      </section>

      {/* ══ USERS ══ */}
      <section id="users" style={{ padding:"70px 0" }}>
        <Wrap>
          <Head n={3} title="User Personas" sub="Who we're designing for, based on verified behavioral data" />
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14 }}>
            <Persona name="Mia" age={22} emoji="🛍️" type="IMPULSE DISCOVERER" bg="linear-gradient(135deg,#8B4513,#C4956A)" behaviors="Scrolls 95 min/day. Buys beauty & fashion from FYP. Average order $28. Shops 3x/month. 49.7% purchase frequency." pains="Received item nothing like the video. Can't distinguish real reviews from incentivized ones. No way to compare sellers for same product."/>
            <Persona name="David" age={34} emoji="🔍" type="INTENTIONAL SHOPPER" bg="linear-gradient(135deg,#5C6B4F,#8A9C76)" behaviors="Opens Shop tab with specific needs. Compares 5+ listings. Reads reviews carefully. Average order $52. Needs real filters." pains="Search degraded by Quest system. Can't filter by rating or ship speed. Product descriptions vague or AI-generated."/>
            <Persona name="Jasmine" age={28} emoji="✨" type="CREATOR-INFLUENCED" bg="linear-gradient(135deg,#6B5E52,#B8860B)" behaviors="Follows 20+ creators. Buys from affiliate links. Trusts creator judgment over reviews. Average order $41." pains="Can't tell paid promo from genuine rec. Creator link sometimes wrong variant. No creator recommendation history."/>
          </div>
        </Wrap>
      </section>

      {/* ══ PAIN POINTS ══ */}
      <section id="pain" style={{ padding:"70px 0",background:"#fff" }}>
        <Wrap>
          <Head n={4} title="Documented Pain Points" sub="Verified friction across the buyer journey, with sourced data" />
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:24 }}>
            {[
              {icon:"⚠️",title:"Product Authenticity Gap",desc:"Trustpilot hovers around 1.3/5 with overwhelmingly negative reviews. Per TikTok's Safety Report, tens of millions of listings were rejected and hundreds of thousands of sellers removed in H1 2025, but buyer perception hasn't caught up.",sev:"CRITICAL"},
              {icon:"🔍",title:"Discovery Degradation",desc:"Quest system pays $3 for 32 daily searches, inflating metrics while degrading quality. 27% of Gen Z cite shopping intrusion as top frustration (dcdx, n=195).",sev:"HIGH"},
              {icon:"💬",title:"Review Credibility Crisis",desc:"Generic incentivized reviews dominate. No verified purchase distinction. Average transaction prices declined across most categories in 2024 (Momentum Works/Tabcut) as discount strategies incentivize review farming.",sev:"HIGH"},
              {icon:"🔄",title:"Post-Purchase Friction",desc:"Bot-only customer service. No phone support. Automated disputes favor sellers. Cases marked 'final' without human review. 135 unresolved BBB complaints.",sev:"MEDIUM"}
            ].map((p,i) => (
              <div key={i} style={{ background:"#FDFBF8",borderRadius:12,padding:"22px",border:"1px solid rgba(28,20,16,.04)" }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10 }}>
                  <span style={{ fontSize:22 }}>{p.icon}</span>
                  <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:9,letterSpacing:".08em",fontWeight:700,padding:"3px 8px",borderRadius:4,background:p.sev==="CRITICAL"?"#F9F0EE":p.sev==="HIGH"?"#FBF8F0":"#F2F5EF",color:p.sev==="CRITICAL"?"#A0522D":p.sev==="HIGH"?"#9A7209":"#5C6B4F" }}>{p.sev}</span>
                </div>
                <div style={{ fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:"#1C1410",marginBottom:8 }}>{p.title}</div>
                <div style={{ fontFamily:"'Source Serif 4',serif",fontSize:13,lineHeight:1.65,color:"#6B5E52" }}>{p.desc}</div>
              </div>
            ))}
          </div>
          <Insight type="risk">The trust deficit is a business model risk. TikTok&apos;s 6% commission depends on sustained volume. Per Momentum Works/Tabcut, more than half of US shops recorded zero sales in 2025. The ecosystem concentrates revenue in a thin layer of top sellers. If quality sellers leave due to margin compression and counterfeit competition, the marketplace degrades. Every counterfeit shipped is a churned buyer.</Insight>
        </Wrap>
      </section>

      {/* ══ SOLUTIONS ══ */}
      <section id="solutions" style={{ padding:"70px 0" }}>
        <Wrap>
          <Head n={5} title="Proposed Solutions" sub="Three-part Trust Layer to transform purchase confidence" />
          <h3 style={h3s}>5.1 — Seller Trust Score</h3>
          <p style={body}>A composite reliability metric (0–100) computed from five weighted signals: on-time shipping rate (25%), review authenticity score (25%), return/dispute rate (20%), account age & verification (15%), and video-product match rate (15%). Displayed as a color-coded badge at every purchase touchpoint. Builds on TikTok&apos;s existing Shop Performance Score but makes it buyer-facing.</p>
          <div style={{ background:"#F5F1EC",borderRadius:8,padding:"14px 18px",margin:"0 0 20px",border:"1px solid rgba(28,20,16,.04)" }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:9,letterSpacing:".1em",fontWeight:700,color:"#6B5E52",marginBottom:6 }}>TECHNICAL FEASIBILITY</div>
            <div style={{ fontFamily:"'Source Serif 4',serif",fontSize:13,lineHeight:1.7,color:"#3D3229" }}>V1 is low complexity. The signals already exist in TikTok&apos;s seller analytics backend (Shop Performance Score). The work is surfacing an aggregated score client-side and designing the badge component. Eng estimate: 2–3 sprints. V2 (video-product match AI) is high complexity and requires computer vision to compare product listing images against in-video product appearances. I&apos;d propose a 2-week technical spike before committing to this, and would work with the ML team to evaluate whether existing content moderation models can be adapted.</div>
          </div>
          <h3 style={h3s}>5.2 — Smart Product Card</h3>
          <p style={body}>An enhanced overlay triggered by tapping a product tag in any video. Instead of navigating away, users see a contextual card: price with shipping estimate, trust score badge, top 3 verified-purchase review snippets, &quot;similar from trusted sellers&quot; shortcut, and one-tap add-to-cart. Collapses with a swipe, preserving content flow.</p>
          <h3 style={h3s}>5.3 — Creator Transparency Labels</h3>
          <p style={body}>Three-tier disclosure: &quot;Paid Partnership,&quot; &quot;Affiliate,&quot; or &quot;Organic.&quot; Each includes a tap-to-expand showing the creator&apos;s track record: percentage of promoted products maintaining 4+ stars after 30 days, average return rate, and total items promoted. Leverages the fact that a majority of US TikTok Shop GMV is creator-driven (Momentum Works/Tabcut report roughly half or more flows through affiliate and influencer content).</p>
          <Insight type="opp">The creator track record creates a positive flywheel: creators who recommend quality build visible credibility → attracts more brand deals → incentivizes selectivity. This turns 851K active affiliate creators into quality gatekeepers without TikTok manually policing every listing. The market incentive does the enforcement work.</Insight>
        </Wrap>
      </section>

      {/* ══ WIREFRAMES ══ */}
      <section id="wireframes" style={{ padding:"70px 0",background:"#fff" }}>
        <Wrap>
          <Head n={6} title="Key Screen Wireframes" sub="Proposed UX improvements across core purchase flows" />
          <div style={{ display:"flex",gap:20,justifyContent:"center",flexWrap:"wrap" }}>
            <Phone title="Smart Product Card (In-Feed)">
              <div style={{ background:"#1C1410",height:130,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:7 }}>
                <span style={{ color:"#6B5E52",fontFamily:"'Cormorant Garamond',serif",fontSize:10,fontWeight:600,letterSpacing:".06em" }}>▶ CREATOR VIDEO</span>
              </div>
              <div style={{ background:"#fff",borderRadius:10,padding:10,border:"1px solid #E8E2DA",boxShadow:"0 4px 16px rgba(28,20,16,.06)" }}>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:5 }}>
                  <span style={{ fontFamily:"'Playfair Display',serif",fontSize:10.5,fontWeight:700 }}>Glow Serum ✨</span>
                  <span style={{ fontFamily:"'Playfair Display',serif",fontSize:10.5,fontWeight:700,color:"#8B4513" }}>$24.99</span>
                </div>
                <div style={{ display:"flex",gap:4,marginBottom:7,flexWrap:"wrap" }}>
                  <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:8,fontWeight:700,background:"#F2F5EF",color:"#5C6B4F",padding:"2px 5px",borderRadius:3 }}>TRUST 92</span>
                  <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:8,fontWeight:600,background:"#FBF8F0",color:"#9A7209",padding:"2px 5px",borderRadius:3 }}>⭐ 4.7 (2.1K)</span>
                  <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:8,fontWeight:600,background:"#FAF3ED",color:"#8B4513",padding:"2px 5px",borderRadius:3 }}>3-DAY SHIP</span>
                </div>
                <div style={{ fontFamily:"'Source Serif 4',serif",fontSize:8.5,lineHeight:1.5,color:"#8A7E73",marginBottom:7,fontStyle:"italic" }}>&quot;Skin cleared up in 2 weeks&quot; (verified)</div>
                <div style={{ display:"flex",gap:5 }}>
                  <div style={{ flex:1,background:"#8B4513",borderRadius:5,padding:"7px 0",textAlign:"center",fontFamily:"'Cormorant Garamond',serif",fontSize:9,fontWeight:700,color:"#fff",letterSpacing:".04em" }}>Add to Cart</div>
                  <div style={{ width:30,background:"#F5F1EC",borderRadius:5,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#8A7E73" }}>≡</div>
                </div>
              </div>
            </Phone>
            <Phone title="Seller Trust Score Detail">
              <div style={{ textAlign:"center",marginBottom:10 }}>
                <div style={{ fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,marginBottom:3 }}>GlowBeauty Official</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:9,fontWeight:600,color:"#5C6B4F",letterSpacing:".04em" }}>✓ VERIFIED SELLER</div>
              </div>
              <div style={{ background:"#F2F5EF",borderRadius:50,width:64,height:64,margin:"0 auto 10px",display:"flex",alignItems:"center",justifyContent:"center" }}>
                <span style={{ fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:800,color:"#5C6B4F" }}>92</span>
              </div>
              {[{l:"On-Time Shipping",v:"97%",w:97},{l:"Review Authenticity",v:"94%",w:94},{l:"Return Rate",v:"3.2%",w:87},{l:"Video-Product Match",v:"91%",w:91},{l:"Account Age",v:"2.4 yrs",w:80}].map((m,i)=>(
                <div key={i} style={{ marginBottom:7 }}>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:2 }}>
                    <span style={{ fontFamily:"'Source Serif 4',serif",fontSize:8.5,color:"#6B5E52" }}>{m.l}</span>
                    <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:9,fontWeight:700,color:"#1C1410" }}>{m.v}</span>
                  </div>
                  <div style={{ height:4,background:"#E8E2DA",borderRadius:2,overflow:"hidden" }}>
                    <div style={{ height:"100%",width:`${m.w}%`,background:m.w>85?"#5C6B4F":m.w>60?"#B8860B":"#A0522D",borderRadius:2 }}/>
                  </div>
                </div>
              ))}
            </Phone>
            <Phone title="Creator Transparency Label">
              <div style={{ display:"flex",alignItems:"center",gap:7,marginBottom:10,paddingBottom:9,borderBottom:"1px solid #E8E2DA" }}>
                <div style={{ width:32,height:32,borderRadius:16,background:"linear-gradient(135deg,#8B4513,#B8860B)" }}/>
                <div>
                  <div style={{ fontFamily:"'Playfair Display',serif",fontSize:11,fontWeight:700 }}>@skincare.sarah</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:8.5,fontWeight:600,color:"#8A7E73" }}>412K followers</div>
                </div>
              </div>
              <div style={{ background:"#FBF8F0",borderRadius:8,padding:10,marginBottom:8,border:"1px solid rgba(184,134,11,.12)" }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:8.5,letterSpacing:".08em",fontWeight:700,color:"#9A7209",marginBottom:6 }}>AFFILIATE PARTNERSHIP</div>
                <div style={{ fontFamily:"'Source Serif 4',serif",fontSize:9.5,lineHeight:1.5,color:"#6B5E52" }}>Sarah earns commission on this product ↓</div>
              </div>
              <div style={{ background:"#F5F1EC",borderRadius:8,padding:10 }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:8.5,letterSpacing:".08em",fontWeight:700,color:"#1C1410",marginBottom:8 }}>CREATOR TRACK RECORD</div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:6 }}>
                  {[{v:"87%",l:"Keep 4+ ⭐"},{v:"4.2%",l:"Avg return rate"},{v:"143",l:"Products promoted"},{v:"96%",l:"Still available"}].map((s,i)=>(
                    <div key={i} style={{ background:"#fff",borderRadius:5,padding:"7px 8px",textAlign:"center" }}>
                      <div style={{ fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:"#1C1410" }}>{s.v}</div>
                      <div style={{ fontFamily:"'Source Serif 4',serif",fontSize:7.5,color:"#8A7E73",marginTop:1 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Phone>
          </div>
        </Wrap>
      </section>

      {/* ══ METRICS ══ */}
      <section id="metrics" style={{ padding:"70px 0" }}>
        <Wrap>
          <Head n={7} title="Success Metrics" sub="How we measure impact: north star and supporting KPIs" />
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:14 }}>
            <Stat v="+15%" l="Conversion Rate Lift" note="FROM TRUST SCORE VISIBILITY" accent="#8B4513"/>
            <Stat v="−25%" l="Return Rate Reduction" note="VIA VIDEO-PRODUCT MATCH" accent="#5C6B4F"/>
            <Stat v="+$8" l="AOV Recovery" note="REVERSING PRICE COMPRESSION" accent="#B8860B"/>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12 }}>
            <Stat v="4.2→4.6" l="Avg Seller Rating" note="TRUST SCORE INCENTIVE" accent="#6B5E52"/>
            <Stat v="+30%" l="Smart Card Tap-Through" note="IN-FEED ENGAGEMENT" accent="#A0522D"/>
            <Stat v="85%+" l="Creator Label Adoption" note="WITHIN 90 DAYS" accent="#5C6B4F"/>
          </div>
          <Insight type="takeaway">The north star metric is organic repeat purchase rate: buyers who return within 60 days at full price without a promotional trigger. Earnest Analytics reports an 81.3% repeat purchase rate, but that figure is likely inflated by deep discounts and promotional events. Each Trust Layer feature is designed to move the organic version of that number, because sustainable commerce requires buyers who come back without being bribed.</Insight>

          <h3 style={h3s}>How I derived these targets</h3>
          <p style={body}>These aren&apos;t arbitrary numbers. The +15% conversion lift is conservative. Baymard Institute research shows that improving product information visibility lifts e-commerce conversion by 10–25%, and TikTok&apos;s current 0.3–0.6% conversion rate is well below the 2–3% e-commerce average, suggesting significant headroom. The −25% return reduction is anchored in the insight that product-expectation mismatch (what you saw in the video vs. what arrived) is the primary return driver on social commerce. Addressing this directly with video-product match scoring should yield outsized results. I&apos;d validate both through a 4-week A/B test at 95% statistical significance, with holdout groups by geographic region, before scaling.</p>
        </Wrap>
      </section>

      {/* ══ LANDSCAPE ══ */}
      <section id="landscape" style={{ padding:"70px 0",background:"#fff" }}>
        <Wrap>
          <Head n={8} title="Competitive Landscape" sub="TikTok Shop vs. the social commerce field, verified 2025-26 data" />
          <div style={{ overflowX:"auto",margin:"20px 0" }}>
            <table style={{ width:"100%",borderCollapse:"collapse",fontSize:13 }}>
              <thead><tr style={{ borderBottom:"2px solid #1C1410" }}>
                {["Dimension","TikTok Shop","Instagram","YouTube","Amazon"].map((h,i) => (
                  <th key={i} style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:10,letterSpacing:".08em",fontWeight:700,color:"#8A7E73",textAlign:"left",padding:"10px" }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {[
                  ["Status","~$64B GMV (est.), scaling","Checkout removed Aug '25","5x YoY, undisclosed","Inspire shut Feb '25"],
                  ["Discovery","Algorithm-first (FYP)","Redirects to merchant","Video + Shopify sync","Intent-first (search)"],
                  ["Creator Commerce","Majority of US GMV","Limited","500K+ creators","Amazon Live (niche)"],
                  ["Trust","~1.3★ Trustpilot","Brand-verified only","YouTube trust (89%)","A-to-Z Guarantee"],
                  ["Buyer Protection","30-day, inconsistent","Varies by merchant","Varies","Industry-leading"],
                ].map((r,i)=>(
                  <tr key={i} style={{ borderBottom:"1px solid #E8E2DA" }}>
                    {r.map((c,j)=>(
                      <td key={j} style={{ padding:"10px",fontFamily:j===0?"'Playfair Display',serif":"'Source Serif 4',serif",fontSize:12,fontWeight:j===0?600:400,color:j===0?"#1C1410":"#6B5E52" }}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Insight type="insight">TikTok Shop&apos;s moat is attention. Users spend 95 min/day and content-commerce fusion at scale. No platform converts a 15-second video into a purchase this efficiently. But that moat is vulnerable to trust erosion: if products consistently don&apos;t match video demos, the &quot;see it, want it, buy it&quot; magic breaks. Meta retreated from native checkout. YouTube Shopping is growing but small. The Trust Layer protects the moat.</Insight>
        </Wrap>
      </section>

      {/* ══ PRD ══ */}
      <section id="prd" style={{ padding:"70px 0" }}>
        <Wrap>
          <Head n={9} title="Product Requirements Document" sub="Trust Layer, Phase 1 & 2 specification" />
          <div style={{ background:"#1C1410",borderRadius:14,padding:"28px 30px",marginBottom:28 }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:11,letterSpacing:".12em",fontWeight:700,color:"#C4956A",marginBottom:14 }}>PROBLEM STATEMENT</div>
            <p style={{ fontFamily:"'Source Serif 4',serif",fontSize:15,lineHeight:1.8,color:"rgba(248,244,239,.65)",margin:0 }}>
              TikTok Shop&apos;s growth ($0.9B → ~$64B+ in 4 years, per Momentum Works/Tabcut) has outpaced its trust infrastructure. Per TikTok&apos;s own Safety Report, tens of millions of listings were rejected and hundreds of thousands of sellers removed in H1 2025. Trustpilot hovers around 1.3/5. More than half of US shops record zero sales. Average transaction prices declined across most categories in 2024. The platform needs a buyer-facing trust system that translates backend enforcement into visible purchase confidence.
            </p>
          </div>
          <h3 style={h3s}>User Stories</h3>
          <div style={{ background:"#F5F1EC",borderRadius:12,padding:"20px 24px",margin:"16px 0" }}>
            <div style={{ fontFamily:"'Source Serif 4',serif",fontSize:13.5,lineHeight:1.85,color:"#3D3229" }}>
              <strong>US-1:</strong> As an impulse buyer, I want to see a seller&apos;s trust score before purchasing so I can quickly assess reliability.<br/>
              <strong>US-2:</strong> As a video scroller, I want to evaluate products without leaving the video.<br/>
              <strong>US-3:</strong> As a creator-influenced buyer, I want to know if a creator has a financial relationship with the product.<br/>
              <strong>US-4:</strong> As a repeat shopper, I want to follow creators whose picks are consistently good.<br/>
              <strong>US-5:</strong> As a seller, I want a clear path to improving my trust score.
            </div>
          </div>
          <h3 style={h3s}>Phased Scope</h3>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,margin:"16px 0" }}>
            <div style={{ background:"#F2F5EF",borderRadius:12,padding:20,border:"1px solid rgba(92,107,79,.08)" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:10,letterSpacing:".1em",fontWeight:700,color:"#5C6B4F",marginBottom:10 }}>PHASE 1 — Q1</div>
              <div style={{ fontFamily:"'Source Serif 4',serif",fontSize:13,lineHeight:1.7,color:"#3D3229" }}>Trust Score v1 (badge). Creator Transparency Labels (3-tier). Verified Purchase filter. Seller dashboard with score breakdown.</div>
            </div>
            <div style={{ background:"#FAF3ED",borderRadius:12,padding:20,border:"1px solid rgba(139,69,19,.06)" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:10,letterSpacing:".1em",fontWeight:700,color:"#8B4513",marginBottom:10 }}>PHASE 2 — Q2</div>
              <div style={{ fontFamily:"'Source Serif 4',serif",fontSize:13,lineHeight:1.7,color:"#3D3229" }}>Smart Product Card (in-feed). Creator track records. &quot;Similar from trusted sellers&quot; engine. Trust Score v2 with AI video-match.</div>
            </div>
          </div>
          <h3 style={h3s}>Metrics & Guardrails</h3>
          <div style={{ overflowX:"auto",margin:"16px 0" }}>
            <table style={{ width:"100%",borderCollapse:"collapse",fontSize:13 }}>
              <thead><tr style={{ borderBottom:"2px solid #1C1410" }}>
                {["Metric","Current","P1 Target","P2 Target","Guardrail"].map((h,i) => (
                  <th key={i} style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:10,letterSpacing:".08em",fontWeight:700,color:"#8A7E73",textAlign:"left",padding:"10px" }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {[
                  ["Conversion Rate","0.3–0.6%","+5%","+15%","No drop below baseline"],
                  ["Return Rate","Elevated","−10%","−25%","Seller CSAT ≥ 3.8"],
                  ["Organic Repeat (60d)","~35%","+8%","+20%","GMV/buyer stable"],
                  ["Creator Disclosure","~20%","60%","85%+","Creator churn < 5%"],
                ].map((r,i)=>(
                  <tr key={i} style={{ borderBottom:"1px solid #E8E2DA" }}>
                    {r.map((c,j)=>(
                      <td key={j} style={{ padding:"10px",fontFamily:j===0?"'Playfair Display',serif":"'Source Serif 4',serif",fontSize:12,fontWeight:j===0?600:400,color:j===0?"#1C1410":"#6B5E52" }}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Wrap>
      </section>

      {/* ══ REFLECTION ══ */}
      <section id="reflection" style={{ padding:"70px 0" }}>
        <Wrap>
          <Head n={10} title="Reflection" sub="What I'd do differently, and what this case study taught me" />
          <h3 style={h3s}>What I&apos;d improve with more time</h3>
          <p style={body}>If I had another two weeks, I&apos;d conduct 10–15 user interviews with actual TikTok Shop buyers who had negative experiences, to ground the pain points in primary research rather than relying on Trustpilot reviews and survey data. I&apos;d also prototype the Smart Product Card in Figma with a tap-through flow to test whether the overlay feels natural or disruptive to the content experience. The biggest risk to that feature is cluttering the feed, and only user testing can validate whether we&apos;ve struck the right balance.</p>
          <h3 style={h3s}>Trade-offs I&apos;m not fully satisfied with</h3>
          <p style={body}>The Trust Score weighting (25% shipping, 25% review authenticity, etc.) is a hypothesis, not a validated model. In practice, I&apos;d want to run a conjoint analysis with buyers to understand which signals actually drive purchase confidence. It&apos;s possible that &quot;account age&quot; matters far less than &quot;percentage of 5-star reviews with photos,&quot; and the weights should reflect revealed preference, not my assumptions. I also haven&apos;t fully addressed the seller side of this equation: making trust scores buyer-visible creates strong incentives, but could also drive gaming behaviors that require ongoing detection.</p>
          <h3 style={h3s}>What this taught me about product thinking</h3>
          <p style={body}>The deepest insight was that TikTok Shop&apos;s trust problem isn&apos;t primarily a moderation or enforcement problem. They&apos;re already blocking tens of millions of listings. It&apos;s a perception and information design problem. The platform does enormous work behind the scenes that buyers never see. That gap between backend enforcement and frontend visibility is the actual product opportunity, and it applies to any marketplace at scale. Sometimes the most impactful feature isn&apos;t building something new. It&apos;s making existing quality signals visible to the people who need them.</p>
        </Wrap>
      </section>

      {/* ══ SOURCES ══ */}
      <section id="sources" style={{ padding:"70px 0",background:"#fff" }}>
        <Wrap>
          <Head n={11} title="Sources" sub="All data cross-referenced across multiple sources" />
          <div style={{ fontFamily:"'Source Serif 4',serif",fontSize:12.5,lineHeight:1.9,color:"#6B5E52" }}>
            {[
              "Momentum Works & Tabcut (Feb 2026) — ~$64B global GMV (2025 est.); $26.2B H1 global; ~$15B US full-year; channel mix; seller concentration",
              "DealStreetAsia — $45.6B SEA 2025; channel mix breakdown (Video ~50%, Shop ~36%, Live ~14%)",
              "eMarketer — ~18–20% US social commerce share (2025); US ad revenue estimates; buyer count methodologies",
              "Earnest Analytics (Feb 2024) — 68.1% of tracked US social shopping GMV among marketplace platforms; 81.3% repeat purchase rate",
              "Charm.io / eFulfillment Service — US monthly GMV curve: ~$15M (Sep '23 launch) → $1.1B (mid-2025)",
              "TikTok Safety Report H1 2025 — Tens of millions of listings rejected; hundreds of thousands of sellers removed (exact figures per report)",
              "Trustpilot — shop.tiktok.com: ~1.3/5 (fluctuates), overwhelmingly negative; BBB: 135+ unresolved complaints",
              "Momentum Works/Tabcut — AOV compression: avg transaction prices declined in most US categories (2024)",
              "dcdx Gen Z Survey (Feb 2024, n=195) — 27% cite TikTok Shop/ads as top complaint; 1 in 3 using app less",
              "TechCrunch / AP / multiple outlets — USDS Joint Venture: Oracle, Silver Lake, MGX at 15% each; ByteDance at reported 19.9%",
              "Dashboardly / Printify — Fee structure: 6% US referral, 9% EU5, 3% first 30 days; FBT pricing",
              "Cube Asia — Gross (~$42B) vs Net (~$33B) GMV distinction for 2024; important methodology note",
            ].map((s,i) => (
              <div key={i} style={{ padding:"6px 0",borderBottom:i<11?"1px solid #E8E2DA":"none" }}>
                <span style={{ fontFamily:"'Cormorant Garamond',serif",fontWeight:700,color:"#8B4513",marginRight:8,fontSize:11 }}>[{i+1}]</span>{s}
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ══ FOOTER ══ */}
      <div style={{ background:"#1C1410",padding:"44px 0",textAlign:"center" }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:11,letterSpacing:".18em",color:"rgba(196,149,106,.4)",fontWeight:600 }}>PM CASE STUDY — TIKTOK SHOP TRUST LAYER</div>
        <div style={{ fontFamily:"'Source Serif 4',serif",fontSize:12,color:"rgba(248,244,239,.2)",marginTop:8,fontStyle:"italic" }}>CIRCLES Framework · Wireframes · PRD · March 2026</div>
      </div>
    </div>
  );
}
