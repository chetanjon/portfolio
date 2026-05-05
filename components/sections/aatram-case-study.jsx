'use client';

import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";
import { CaseStudyTOC } from "@/components/ui/CaseStudyTOC";

// ——— THEME SYSTEM ———
const darkPalette = {
  bg: "#08080C",
  surface: "#0E0E14",
  cream: "#E8E4D9",
  dim: "rgba(232,228,217,0.65)",
  dim2: "rgba(232,228,217,0.45)",
  gold: "#C4A882",
  lav: "#BFB8F3",
  sage: "#8BA88E",
  rose: "#D4878F",
  slate: "#9298A8",
  w005: "rgba(255,255,255,0.06)",
  w008: "rgba(255,255,255,0.1)",
  w01: "rgba(255,255,255,0.12)",
  w02: "rgba(255,255,255,0.04)",
  w03: "rgba(255,255,255,0.05)",
  w04: "rgba(255,255,255,0.07)",
  w06: "rgba(255,255,255,0.1)",
  w2: "rgba(255,255,255,0.2)",
  shadow: "rgba(0,0,0,0.4)",
  quoteColor: "rgba(232,228,217,0.78)",
  quoteColor2: "rgba(232,228,217,0.72)",
  quoteColor3: "rgba(232,228,217,0.62)",
  quoteColor4: "rgba(232,228,217,0.68)",
  quoteColor5: "rgba(232,228,217,0.58)",
};

const lightPalette = {
  bg: "#F5F1EB",
  surface: "#FAF8F5",
  cream: "#1A1A18",
  dim: "rgba(26,26,24,0.72)",
  dim2: "rgba(26,26,24,0.52)",
  gold: "#8A6D40",
  lav: "#5B4EB8",
  sage: "#3E6A42",
  rose: "#A84550",
  slate: "#4C5468",
  w005: "rgba(0,0,0,0.08)",
  w008: "rgba(0,0,0,0.12)",
  w01: "rgba(0,0,0,0.15)",
  w02: "rgba(0,0,0,0.06)",
  w03: "rgba(0,0,0,0.08)",
  w04: "#E0DCD4",
  w06: "rgba(0,0,0,0.15)",
  w2: "rgba(0,0,0,0.2)",
  shadow: "rgba(0,0,0,0.18)",
  quoteColor: "rgba(26,26,24,0.82)",
  quoteColor2: "rgba(26,26,24,0.75)",
  quoteColor3: "rgba(26,26,24,0.65)",
  quoteColor4: "rgba(26,26,24,0.72)",
  quoteColor5: "rgba(26,26,24,0.6)",
};

const ThemeContext = createContext(darkPalette);
const useTheme = () => useContext(ThemeContext);

// ——— SCREENSHOTS (compressed from TestFlight beta) ———
// ===============================================================
// AATRAM CASE STUDY v3 - Cosmos-inspired cinematic editorial
// ===============================================================

const SERIF = "'Cormorant Garamond','Georgia',serif";
const SANS = "'Outfit','Helvetica Neue',sans-serif";
const MONO = "'IBM Plex Mono',monospace";

// Colors are now provided via ThemeContext (see darkPalette / lightPalette above)

// ——— HOOKS ———
const useVis = () => {
  const r = useRef(null); const [v] = useState(true);
  return [r, v];
};
const useScroll = () => {
  const ref = useRef(null);
  useEffect(() => {
    const h = () => {
      if (!ref.current) return;
      const d = document.documentElement;
      ref.current.style.width = `${(d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100}%`;
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return ref;
};
const useCount = (end, dur = 2000) => { const [v, s] = useState(0); const [go, setGo] = useState(false); const start = useCallback(() => setGo(true), []); useEffect(() => { if (!go) return; let f; const t0 = performance.now(); const tick = n => { const p = Math.min((n-t0)/dur,1); s(Math.round((1-Math.pow(1-p,4))*end)); if(p<1) f=requestAnimationFrame(tick); }; f=requestAnimationFrame(tick); return ()=>cancelAnimationFrame(f); }, [go,end,dur]); return [v, start]; };

// ——— PRIMITIVES ———
const Fade = ({ children, delay = 0, y = 50, style = {} }) => {
  const [r, v] = useVis();
  return (<div ref={r} style={{ opacity: v?1:0, transform: v?"translateY(0)":`translateY(${y}px)`, transition: `all 1.1s cubic-bezier(.22,1,.36,1) ${delay}s`, ...style }}>{children}</div>);
};

const Num = ({ end, suffix="", color }) => {
  const t = useTheme();
  const c = color || t.lav;
  const [r,v]=useVis(0.3); const [val,go]=useCount(end);
  useEffect(()=>{if(v)go();},[v,go]);
  return <span ref={r} style={{color:c,fontFamily:SERIF}}>{val}{suffix}</span>;
};

// ——— NUDGE DEMO ———
const NudgeDemo = () => {
  const {cream,dim,lav,w03,w04,quoteColor} = useTheme();
  const t = [
    {time:"15 min before",label:"Action Step",copy:"Write the first line of your paper. Just the first line.",tone:"Coach",mech:"Implementation Intention",emoji:"\u{1F4DD}"},
    {time:"20 min after",label:"Stakes Reminder",copy:"You said this is 30% of your grade. 2 hours left.",tone:"Friend",mech:"Momentum Anchoring",emoji:"\u{1F3AF}"},
    {time:"45 min after",label:"Future Self",copy:"The version of you at midnight will either be relieved or panicking.",tone:"Coach",mech:"Identity Priming",emoji:"\u{1F52E}"},
    {time:"90 min after",label:"Progress Check",copy:"You've done 0 minutes. Not judging. What's blocking you?",tone:"Therapist",mech:"Progress Anchoring",emoji:"\u{1F9E0}"},
    {time:"2 hours after",label:"Small Start",copy:"2 minutes. Open the doc. That's the only ask.",tone:"Friend",mech:"Micro Commitment",emoji:"\u{1F525}"},
  ];
  return (
    <div style={{maxWidth:560,margin:"0 auto"}}>
      {t.map((x,i)=>(
        <Fade key={i} delay={i*0.06}>
          <div style={{padding:"28px 0",borderBottom:i<4?`1px solid ${w04}`:"none"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
              <span style={{fontSize:20}}>{x.emoji}</span>
              <span style={{fontFamily:MONO,fontSize:10,color:lav,letterSpacing:"0.04em"}}>{x.time}</span>
              <span style={{fontFamily:SANS,fontSize:14,fontWeight:600,color:cream}}>{x.label}</span>
            </div>
            <div style={{fontFamily:SERIF,fontSize:19,fontStyle:"italic",color:quoteColor,lineHeight:1.5,marginBottom:12,paddingLeft:32}}>&quot;{x.copy}&quot;</div>
            <div style={{display:"flex",gap:8,paddingLeft:32}}>
              <span style={{fontFamily:MONO,fontSize:9,color:lav,background:`${lav}10`,padding:"3px 10px",borderRadius:12}}>{x.mech}</span>
              <span style={{fontFamily:MONO,fontSize:9,color:dim,background:w03,padding:"3px 10px",borderRadius:12}}>{x.tone}</span>
            </div>
          </div>
        </Fade>
      ))}
      <div style={{fontFamily:MONO,fontSize:11,color:dim,marginTop:24,textAlign:"center"}}>
        Five nudges. Then silence. No guilt.
      </div>
    </div>
  );
};

// ——— EMOTION DEMO ———
const EmotionDemo = () => {
  const {cream,dim,lav,w04} = useTheme();
  const [emo, setEmo] = useState("steady");
  const d = {
    energized:{emoji:"\u26A1",label:"Energized",tasks:"Full list: 3 tasks visible",session:"45 min",nudge:"Coach: \"Let's aim high. 3 tasks, 45 min each.\"",intensity:"High"},
    steady:{emoji:"\u{1F60A}",label:"Steady",tasks:"Priorities only: 2 tasks",session:"25 min",nudge:"Friend: \"Solid day ahead. Start with your update?\"",intensity:"Medium"},
    resistant:{emoji:"\u{1F624}",label:"Resistant",tasks:"Stripped down: 1 task",session:"10 min",nudge:"Therapist: \"What's the resistance about? Name it.\"",intensity:"Low"},
    overwhelmed:{emoji:"\u{1F630}",label:"Overwhelmed",tasks:"Minimal: \"One thing. You pick.\"",session:"5 min",nudge:"Friend: \"Breathe. Just 5 minutes. That's all.\"",intensity:"Gentle"},
  };
  const e=d[emo];
  return (
    <div>
      {/* Emotion picker row */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:40}}>
        {Object.entries(d).map(([k,v])=>(
          <div key={k} onClick={()=>setEmo(k)} style={{padding:"22px 14px",borderRadius:16,background:emo===k?"rgba(91,78,184,0.08)":"transparent",border:`1.5px solid ${emo===k?lav+"60":w04}`,cursor:"pointer",textAlign:"center",transition:"all 0.35s"}}>
            <div style={{fontSize:28,marginBottom:6}}>{v.emoji}</div>
            <div style={{fontFamily:SANS,fontSize:13,fontWeight:600,color:emo===k?cream:dim}}>{v.label}</div>
          </div>
        ))}
      </div>
      {/* Adaptation display */}
      <div style={{maxWidth:560,margin:"0 auto"}}>
        {[
          {label:"Task view",value:e.tasks},
          {label:"Session length",value:e.session},
          {label:"Nudge style",value:e.nudge},
          {label:"App intensity",value:e.intensity},
        ].map((row,i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",padding:"14px 0",borderBottom:i<3?`1px solid ${w04}`:"none",gap:20}}>
            <span style={{fontFamily:MONO,fontSize:11,color:dim,letterSpacing:"0.06em",flexShrink:0,minWidth:100}}>{row.label}</span>
            <span style={{fontFamily:SANS,fontSize:14,color:cream,textAlign:"right"}}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ===================================================
// MAIN
// ===================================================
const AATRAM_TOC_SECTIONS = [
  { id: "cs-01", number: "01", label: "The Spark" },
  { id: "cs-02", number: "02", label: "The Thesis" },
  { id: "cs-03", number: "03", label: "What We Built", children: [
    { id: "cs-03b", label: "A real PM decision" },
  ]},
  { id: "cs-04", number: "04", label: "Core Mechanics" },
  { id: "cs-05", number: "05", label: "The Landscape" },
  { id: "cs-06", number: "06", label: "Beta Learnings" },
  { id: "cs-07", number: "07", label: "What I Got Wrong" },
  { id: "cs-08", number: "08", label: "Success Framework" },
  { id: "cs-09", number: "09", label: "What's Next" },
  { id: "cs-10", number: "10", label: "On The Horizon" },
];

export default function AatramCaseStudy() {
  const progressRef = useScroll();
  const theme = lightPalette;
  const {bg,cream,dim,dim2,lav,w01,w04,quoteColor2,quoteColor3,quoteColor4,quoteColor5} = theme;

  const tocTheme = {
    accent: lav,
    text: cream,
    textMuted: dim,
    textDim: dim2,
    bg: "rgba(245, 241, 235, 0.94)",
    border: w04,
    fontMono: MONO,
    fontSans: SANS,
    fontSerif: SERIF,
  };

  return (
    <ThemeContext.Provider value={theme}>
    <div className="aatram-cs" style={{background:bg,color:cream,minHeight:"100vh",fontFamily:SANS,WebkitFontSmoothing:"antialiased",position:"relative",zIndex:1}}>
      <style dangerouslySetInnerHTML={{__html:`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@200;300;400;500;600&family=IBM+Plex+Mono:wght@300;400;500&display=swap');
        .aatram-cs.aatram-cs.aatram-cs,
        .aatram-cs.aatram-cs.aatram-cs *,
        .aatram-cs.aatram-cs.aatram-cs *::before,
        .aatram-cs.aatram-cs.aatram-cs *::after {
          -webkit-text-fill-color: initial !important;
          -webkit-background-clip: initial !important;
          background-clip: initial !important;
          text-shadow: none !important;
          visibility: visible !important;
          clip: auto !important;
          clip-path: none !important;
          text-indent: 0 !important;
          box-sizing: border-box;
        }
        .aatram-cs.aatram-cs.aatram-cs {
          background: #F5F1EB !important;
          color: #1A1A18 !important;
          font-family: 'Outfit', 'Helvetica Neue', sans-serif !important;
          -webkit-font-smoothing: antialiased !important;
          overflow-x: hidden !important;
          -webkit-overflow-scrolling: touch;
          touch-action: pan-y pinch-zoom;
        }
        .aatram-cs.aatram-cs.aatram-cs h1,
        .aatram-cs.aatram-cs.aatram-cs h2,
        .aatram-cs.aatram-cs.aatram-cs h3,
        .aatram-cs.aatram-cs.aatram-cs h4,
        .aatram-cs.aatram-cs.aatram-cs p,
        .aatram-cs.aatram-cs.aatram-cs span,
        .aatram-cs.aatram-cs.aatram-cs div,
        .aatram-cs.aatram-cs.aatram-cs a,
        .aatram-cs.aatram-cs.aatram-cs footer,
        .aatram-cs.aatram-cs.aatram-cs section,
        .aatram-cs.aatram-cs.aatram-cs header,
        .aatram-cs.aatram-cs.aatram-cs em,
        .aatram-cs.aatram-cs.aatram-cs strong {
          color: inherit; text-decoration: none; margin: 0; padding: 0; border: 0; background: transparent;
        }
        .aatram-cs.aatram-cs.aatram-cs svg text { -webkit-text-fill-color: initial !important; }
        .aatram-cs.aatram-cs.aatram-cs ::selection { background: rgba(91,78,184,.15) !important; color: #1A1A18 !important; }
        html { scroll-behavior: smooth; }
      `}}/>

      {/* Progress */}
      <div style={{position:"fixed",top:0,left:0,width:"100%",height:1.5,zIndex:999,pointerEvents:"none"}}>
        <div ref={progressRef} style={{height:"100%",width:"0%",background:`linear-gradient(90deg,${lav}40,${lav})`,opacity:0.6,transition:"width 60ms linear"}}/>
      </div>

      {/* Section TOC: cinematic scrubber rail + mobile pill */}
      <CaseStudyTOC sections={AATRAM_TOC_SECTIONS} theme={tocTheme} variant="scrubber" />

      {/* === HERO === */}
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"100px 32px",position:"relative",textAlign:"center"}}>
        <div style={{position:"absolute",top:"30%",left:"50%",transform:"translate(-50%,-50%)",width:700,height:700,borderRadius:"50%",background:`radial-gradient(circle,${lav}06,transparent 70%)`,filter:"blur(100px)"}}/>
        <div style={{position:"absolute",bottom:"20%",right:"30%",width:500,height:500,borderRadius:"50%",background:`radial-gradient(circle,${lav}03,transparent 70%)`,filter:"blur(80px)"}}/>
        <div style={{maxWidth:800,position:"relative"}}>
          <Fade>
            <div style={{fontFamily:MONO,fontSize:10,letterSpacing:"0.25em",color:dim2,marginBottom:40}}>A 0-TO-1 PRODUCT CASE STUDY</div>
          </Fade>
          <Fade delay={0.1}>
            <h1 style={{fontFamily:SERIF,fontSize:"clamp(48px,8vw,100px)",fontWeight:400,lineHeight:1.05,letterSpacing:"-0.02em",margin:0}}>
              You know what to do.
            </h1>
          </Fade>
          <Fade delay={0.2}>
            <h1 style={{fontFamily:SERIF,fontSize:"clamp(48px,8vw,100px)",fontWeight:400,lineHeight:1.05,letterSpacing:"-0.02em",margin:"0 0 40px",fontStyle:"italic",color:lav}}>
              Starting is the problem.
            </h1>
          </Fade>
          <Fade delay={0.35}>
            <p style={{fontFamily:SANS,fontSize:17,color:dim,lineHeight:1.8,maxWidth:460,margin:"0 auto 60px"}}>
              Three roommates built an app that treats procrastination as what it actually is: an emotion problem, not a discipline problem.
            </p>
          </Fade>
          <Fade delay={0.45}>
            <div style={{display:"flex",gap:40,justifyContent:"center",fontFamily:MONO,fontSize:11,color:dim2,letterSpacing:"0.08em"}}>
              <span>PM / Co-Founder</span>
              <span style={{opacity:0.3}}>{"\u00B7"}</span>
              <span>3 co-founders</span>
              <span style={{opacity:0.3}}>{"\u00B7"}</span>
              <span>iOS (Swift)</span>
              <span style={{opacity:0.3}}>{"\u00B7"}</span>
              <span>{"Beta \u2192 App Store"}</span>
            </div>
          </Fade>
        </div>
      </section>

      {/* === THE NUMBERS (cinematic stats) === */}
      <section style={{padding:"80px 32px 120px",textAlign:"center"}}>
        <Fade>
          <div style={{display:"flex",justifyContent:"center",gap:"clamp(40px,8vw,100px)",flexWrap:"wrap"}}>
            {[
              {end:88,suf:"%",l:"of students procrastinate",c:lav},
              {end:12,suf:"B+",l:"productivity app market",c:lav},
              {end:0,suf:"",l:"apps treating the emotion",c:lav},
              {end:120,suf:"+",l:"waitlist signups",c:lav},
            ].map((s,i)=>(
              <Fade key={i} delay={i*0.08}>
                <div>
                  <div style={{fontFamily:SERIF,fontSize:"clamp(40px,6vw,72px)",fontWeight:400,lineHeight:1}}><Num end={s.end} suffix={s.suf} color={s.c}/></div>
                  <div style={{fontFamily:MONO,fontSize:9,color:dim2,marginTop:10,letterSpacing:"0.08em",textTransform:"uppercase"}}>{s.l}</div>
                </div>
              </Fade>
            ))}
          </div>
        </Fade>
      </section>

      {/* === ORIGIN === */}
      <section id="cs-01" style={{padding:"clamp(80px,14vw,180px) 32px",maxWidth:720,margin:"0 auto"}}>
        <Fade><div style={{fontFamily:MONO,fontSize:11,letterSpacing:"0.24em",color:lav,marginBottom:20}}>01 THE SPARK</div></Fade>
        <Fade delay={0.06}>
          <h2 style={{fontFamily:SERIF,fontSize:"clamp(36px,5vw,60px)",fontWeight:400,lineHeight:1.05,margin:"0 0 40px"}}>
            A 30-minute brainstorm that became a <em style={{fontStyle:"italic",color:lav}}>startup</em>.
          </h2>
        </Fade>
        <Fade delay={0.12}>
          <p style={{fontSize:17.5,lineHeight:1.8,color:dim,marginBottom:24}}>
            It started the way most good ideas start: complaining. Three roommates, late at night. Chetan had wasted an entire day despite having nothing stopping him. Sai admitted the same. Ujjwal set a 30-minute timer.
          </p>
          <p style={{fontSize:17.5,lineHeight:1.8,color:dim,marginBottom:40}}>
            The conversation kept circling back to one feeling: <em style={{fontFamily:SERIF,fontSize:18,color:cream,fontStyle:"italic"}}>&quot;I wish someone would just push me to start.&quot;</em> Not plan. Not organize. Just start.
          </p>
        </Fade>
        <Fade delay={0.18}>
          <div style={{display:"flex",gap:32,flexWrap:"wrap"}}>
            {[
              {n:"Chetan Jonnalagadda",r:"PM / Co-Founder",d:"M.S. Management of Technology"},
              {n:"Sai Teja Dassari",r:"Engineering",d:"M.S. Robotics Engineering"},
              {n:"Ujjwal Reddy",r:"Engineering",d:"B.S. Computer Science"},
            ].map((p,i)=>(
              <div key={i} style={{flex:"1 1 180px"}}>
                <div style={{fontFamily:SANS,fontSize:14,fontWeight:600,color:cream}}>{p.n}</div>
                <div style={{fontFamily:MONO,fontSize:11,color:lav,marginTop:2}}>{p.r}</div>
                <div style={{fontFamily:SANS,fontSize:12,color:dim2,marginTop:2}}>{p.d}</div>
              </div>
            ))}
          </div>
        </Fade>
      </section>

      {/* === THESIS (full-width cinematic) === */}
      <section id="cs-02" style={{padding:"clamp(100px,16vw,220px) 32px",textAlign:"center",position:"relative"}}>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:600,borderRadius:"50%",background:`radial-gradient(circle,${lav}05,transparent 70%)`,filter:"blur(100px)"}}/>
        <div style={{maxWidth:700,margin:"0 auto",position:"relative"}}>
          <Fade><div style={{fontFamily:MONO,fontSize:11,letterSpacing:"0.24em",color:lav,marginBottom:20}}>02 THE THESIS</div></Fade>
          <Fade delay={0.08}>
            <h2 style={{fontFamily:SERIF,fontSize:"clamp(40px,6vw,72px)",fontWeight:400,lineHeight:1.08,margin:"0 0 40px"}}>
              Procrastination isn&apos;t a <em style={{fontStyle:"italic",color:lav}}>discipline</em> problem.
            </h2>
          </Fade>
          <Fade delay={0.16}>
            <p style={{fontSize:17,lineHeight:1.85,color:dim,maxWidth:520,margin:"0 auto 48px"}}>
              Dr. Timothy Pychyl proved it. Piers Steel&apos;s meta-analysis of 691 correlations confirmed it. Task aversiveness - an emotional variable - is the strongest predictor of procrastination. Not laziness. Not poor planning. Emotion.
            </p>
          </Fade>
          <Fade delay={0.24}>
            <div style={{borderLeft:`2px solid ${lav}`,padding:"24px 0 24px 28px",textAlign:"left",maxWidth:520,margin:"0 auto"}}>
              <div style={{fontFamily:SERIF,fontSize:20,fontStyle:"italic",color:quoteColor2,lineHeight:1.55}}>
                &quot;I&apos;ve tried Forest, Focusmate, Todoist, and TickTick. They all worked for about two weeks. This is the first app that understood the problem isn&apos;t my to-do list - it&apos;s what I&apos;m feeling when I look at it.&quot;
              </div>
              <div style={{fontFamily:MONO,fontSize:10,color:dim2,marginTop:14}}>- Beta tester</div>
            </div>
          </Fade>
        </div>
      </section>

      {/* === THE GAP (three insights, flowing) === */}
      <section style={{padding:"60px 32px 120px",maxWidth:720,margin:"0 auto"}}>
        {[
          {emoji:"\u{1F914}",text:"Every productivity app assumes you're ready to work. You're not. You're overwhelmed, avoiding, or stuck. More structure makes it worse.",c:lav},
          {emoji:"\u{1F494}",text:"Streaks punish instead of support. Miss one day, lose a 47-day record. Loss aversion makes restarting feel pointless. Users quit entirely.",c:lav},
          {emoji:"\u{1F573}",text:"No commercial app asks 'why are you stuck?' The gap between 'I should work' and 'I can't start' is entirely emotional. Zero products address it.",c:lav},
        ].map((x,i)=>(
          <Fade key={i} delay={i*0.08}>
            <div style={{display:"flex",gap:20,alignItems:"flex-start",padding:"36px 0",borderBottom:i<2?`1px solid ${w04}`:"none"}}>
              <span style={{fontSize:28,flexShrink:0,marginTop:2}}>{x.emoji}</span>
              <p style={{fontSize:17.5,lineHeight:1.8,color:dim,margin:0}}>{x.text}</p>
            </div>
          </Fade>
        ))}
      </section>

      {/* === THE PRODUCT (screenshots) === */}
      <section id="cs-03" style={{padding:"clamp(80px,14vw,180px) 32px",textAlign:"center"}}>
        <Fade><div style={{fontFamily:MONO,fontSize:11,letterSpacing:"0.24em",color:lav,marginBottom:20}}>03 WHAT WE BUILT</div></Fade>
        <Fade delay={0.06}>
          <h2 style={{fontFamily:SERIF,fontSize:"clamp(36px,5vw,60px)",fontWeight:400,lineHeight:1.05,margin:"0 0 20px"}}>
            Five features. One philosophy.
          </h2>
        </Fade>
        <Fade delay={0.1}>
          <p style={{fontFamily:SERIF,fontSize:"clamp(24px,3.5vw,42px)",fontWeight:400,fontStyle:"italic",color:lav,margin:"0 0 60px"}}>
            Start gentle, build momentum.
          </p>
        </Fade>

        {/* Feature descriptions - flowing, not cards */}
        <div style={{maxWidth:640,margin:"0 auto",textAlign:"left"}}>
          {[
            {n:"Emotion Check-In",d:"One question before every session: 'How are you feeling?' Four options. The entire app adapts. Overwhelmed? One task, 10 minutes. Energized? Full list, ambitious targets.",c:lav,cite:"Lieberman et al., affect labeling reduces amygdala activation"},
            {n:"Count-Up Timer",d:"The stopwatch counts UP, not down. No countdown anxiety, no 'you have 24 minutes left' pressure. You set a target. Even 2 minutes counts.",c:lav,cite:"PMC 2022, perceived time pressure diminishes cognition"},
            {n:"Smart Nudges",d:"Not reminders. Psychology. AI sends an escalating chain of 5 touches, each using a different behavioral technique. Four personalities: Coach, Friend, Drill Sgt, Therapist. All generated on-device.",c:lav,cite:"Gollwitzer meta-analysis, d = 0.65 effect size"},
            {n:"Failure Recovery",d:"Missed a task? No red badge. Four gentle options: move it, shrink it, do the first step, or let it go. Self-forgiveness reduces future procrastination.",c:lav,cite:"Wohl, Pychyl & Bennett, 2010"},
            {n:"Momentum Meter",d:"Streaks reset to zero. Momentum doesn't. It fills as you work, decays gently overnight, and never punishes a bad day. Four zones: Starting, Building, Rolling, Locked In.",c:lav,cite:"Amabile & Kramer, the Progress Principle"},
          ].map((f,i)=>(
            <Fade key={i} delay={0.06*i}>
              <div style={{padding:"36px 0",borderBottom:`1px solid ${w04}`}}>
                <div style={{fontFamily:SERIF,fontSize:24,color:cream,marginBottom:10}}>{f.n}</div>
                <p style={{fontSize:15,lineHeight:1.85,color:dim,margin:"0 0 10px"}}>{f.d}</p>
                <div style={{fontFamily:MONO,fontSize:9,color:f.c,letterSpacing:"0.03em"}}>{"\u23F3"} {f.cite}</div>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* === PRIVACY CALLOUT === */}
      <section style={{padding:"60px 32px",textAlign:"center"}}>
        <Fade>
          <div style={{maxWidth:500,margin:"0 auto"}}>
            <div style={{fontSize:32,marginBottom:16}}>{"\u{1F512}"}</div>
            <div style={{fontFamily:SERIF,fontSize:24,color:cream,marginBottom:8}}>100% On-Device AI.</div>
            <p style={{fontSize:14,color:dim,lineHeight:1.7}}>Everything runs on Apple Intelligence. Your emotions, patterns, and triggers never leave your phone. No cloud. No accounts. No tracking.</p>
          </div>
        </Fade>
      </section>

      {/* === KEY TRADEOFF === */}
      <section id="cs-03b" style={{padding:"clamp(60px,10vw,120px) 32px",maxWidth:720,margin:"0 auto"}}>
        <Fade><div style={{fontFamily:MONO,fontSize:11,letterSpacing:"0.24em",color:lav,marginBottom:20}}>A REAL PM DECISION</div></Fade>
        <Fade delay={0.06}>
          <h2 style={{fontFamily:SERIF,fontSize:"clamp(28px,4vw,44px)",fontWeight:400,lineHeight:1.05,margin:"0 0 20px"}}>
            Why we killed <em style={{fontStyle:"italic",color:lav}}>streaks</em>.
          </h2>
        </Fade>
        <Fade delay={0.1}>
          <p style={{fontSize:15,color:dim,lineHeight:1.85,marginBottom:36}}>Every productivity app uses streaks. They&apos;re proven engagement drivers. Duolingo&apos;s streak mechanic is responsible for 3.6x higher retention among 7-day users. Killing streaks was a risky, contrarian call. Here&apos;s how we decided.</p>
        </Fade>

        <Fade delay={0.14}>
          <div style={{fontFamily:MONO,fontSize:10,letterSpacing:"0.12em",color:lav,marginBottom:16}}>THREE OPTIONS ON THE TABLE</div>
          {[
            {opt:"Option A: Traditional Streaks",desc:"Binary counter. Miss one day, reset to zero. Industry standard. Duolingo, Snapchat, Forest all use it.",verdict:"Rejected",reason:"Duolingo's own data shows 90+ day streaks have the highest abandonment risk. For our users (who already struggle with guilt), a broken streak would reinforce the 'I'm a failure' narrative. The reset-to-zero mechanic directly contradicts our thesis that self-forgiveness reduces procrastination."},
            {opt:"Option B: Forgiving Streaks",desc:"Streak with freeze days, grace periods, or weekend pauses. Duolingo added Streak Freeze and reduced churn 21%.",verdict:"Considered",reason:"Better, but still binary framing. Users either have a streak or don't. The anxiety of 'will I break it?' remains. Freeze mechanics feel like a band-aid on a fundamentally punitive system."},
            {opt:"Option C: Momentum Meter",desc:"Logarithmic score that fills with work, decays gently overnight (8% per missed day), and never resets to zero. Four zones instead of a number.",verdict:"Shipped",reason:"Preserves the progress signal (users can see they're building something) without the punishment. Skip a day, lose 8%. Skip five, lose 34%. But you never start from zero. Backed by Amabile's Progress Principle: small losses have outsized negative impact on motivation."},
          ].map((x,i)=>(
            <Fade key={i} delay={0.16+i*0.06}>
              <div style={{padding:"24px 0",borderBottom:i<2?`1px solid ${w04}`:"none"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                  <div style={{fontFamily:SERIF,fontSize:18,color:cream}}>{x.opt}</div>
                  <span style={{fontFamily:MONO,fontSize:9,color:x.verdict==="Shipped"?lav:dim2,letterSpacing:"0.06em"}}>{x.verdict}</span>
                </div>
                <p style={{fontSize:13,color:dim,lineHeight:1.7,margin:"0 0 8px",fontStyle:"italic"}}>{x.desc}</p>
                <p style={{fontSize:14,color:dim,lineHeight:1.75,margin:0}}>{x.reason}</p>
              </div>
            </Fade>
          ))}
        </Fade>

        <Fade delay={0.35}>
          <div style={{marginTop:28,borderLeft:`2px solid ${lav}`,paddingLeft:20}}>
            <p style={{fontFamily:SERIF,fontSize:17,fontStyle:"italic",color:quoteColor3,lineHeight:1.6,margin:0}}>
              &quot;The hardest part wasn&apos;t building momentum. It was deleting the streak code that was already working. But if we&apos;re serious about emotion-first design, we can&apos;t keep the one mechanic most responsible for guilt in productivity apps.&quot;
            </p>
          </div>
        </Fade>
      </section>

      {/* === INTERACTIVE DEMOS === */}
      <section id="cs-04" style={{padding:"clamp(80px,14vw,180px) 32px"}}>
        <div style={{maxWidth:800,margin:"0 auto"}}>
          <Fade><div style={{fontFamily:MONO,fontSize:11,letterSpacing:"0.24em",color:lav,marginBottom:20,textAlign:"center"}}>04 TRY THE CORE MECHANICS</div></Fade>
          <Fade delay={0.06}>
            <h2 style={{fontFamily:SERIF,fontSize:"clamp(36px,5vw,60px)",fontWeight:400,lineHeight:1.05,margin:"0 0 60px",textAlign:"center"}}>
              The emotion shapes <em style={{fontStyle:"italic",color:lav}}>everything</em>.
            </h2>
          </Fade>
          <Fade delay={0.12}><EmotionDemo/></Fade>

          <div style={{height:100}}/>

          <Fade><div style={{fontFamily:MONO,fontSize:11,letterSpacing:"0.2em",color:lav,marginBottom:20,textAlign:"center",fontWeight:500}}>NUDGE ESCALATION</div></Fade>
          <Fade delay={0.06}>
            <h2 style={{fontFamily:SERIF,fontSize:"clamp(28px,4vw,44px)",fontWeight:400,lineHeight:1.05,margin:"0 0 48px",textAlign:"center"}}>
              Five touches. Five techniques. <em style={{fontStyle:"italic",color:lav}}>Then silence.</em>
            </h2>
          </Fade>
          <Fade delay={0.12}><NudgeDemo/></Fade>

          <div style={{height:100}}/>

          <Fade><div style={{fontFamily:MONO,fontSize:11,letterSpacing:"0.2em",color:lav,marginBottom:20,textAlign:"center",fontWeight:500}}>FRIENDS ZONE</div></Fade>
          <Fade delay={0.06}>
            <h2 style={{fontFamily:SERIF,fontSize:"clamp(28px,4vw,44px)",fontWeight:400,lineHeight:1.05,margin:"0 0 16px",textAlign:"center"}}>
              Accountability without <em style={{fontStyle:"italic",color:lav}}>competition.</em>
            </h2>
          </Fade>
          <Fade delay={0.1}>
            <p style={{fontSize:15,color:dim,lineHeight:1.7,textAlign:"center",maxWidth:440,margin:"0 auto 36px",fontWeight:400}}>No rankings. No scores. Just the quiet awareness that your people are showing up too.</p>
          </Fade>
          <Fade delay={0.14}>
            <div style={{maxWidth:400,margin:"0 auto"}}>
              {[
                {name:"Sarah",zone:"Locked In",time:"48 min",status:"green"},
                {name:"Ujjwal",zone:"Rolling",time:"22 min",status:"green"},
                {name:"Sai",zone:"Building",time:"idle",status:"yellow"},
                {name:"Alex",zone:"Starting",time:"offline",status:"off"},
              ].map((f,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 0",borderBottom:i<3?`1px solid ${w04}`:"none"}}>
                  <div style={{width:10,height:10,borderRadius:"50%",background:f.status==="green"?lav:f.status==="yellow"?`${lav}70`:w01,boxShadow:f.status==="green"?`0 0 10px ${lav}`:"none",flexShrink:0}}/>
                  <div style={{flex:1}}>
                    <span style={{fontFamily:SANS,fontSize:14,color:cream}}>{f.name}</span>
                  </div>
                  <span style={{fontFamily:MONO,fontSize:11,color:f.status==="off"?dim:lav,background:f.status==="off"?"transparent":`${lav}12`,padding:"4px 12px",borderRadius:10,fontWeight:500}}>{f.zone}</span>
                  <span style={{fontFamily:MONO,fontSize:10,color:dim,minWidth:50,textAlign:"right",fontWeight:500}}>{f.time}</span>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* === COMPETITIVE === */}
      <section id="cs-05" style={{padding:"80px 32px 120px",maxWidth:720,margin:"0 auto"}}>
        <Fade><div style={{fontFamily:MONO,fontSize:11,letterSpacing:"0.24em",color:lav,marginBottom:20}}>05 THE LANDSCAPE</div></Fade>
        <Fade delay={0.06}>
          <h2 style={{fontFamily:SERIF,fontSize:"clamp(32px,4.5vw,52px)",fontWeight:400,lineHeight:1.05,margin:"0 0 48px"}}>
            Everyone punishes. <em style={{fontStyle:"italic",color:lav}}>Nobody asks why.</em>
          </h2>
        </Fade>
        {[
          {app:"Forest",what:"Grows a tree. Kills it if you leave.",aware:"No",c:lav},
          {app:"Opal",what:"Blocks apps via VPN. $60-100/year.",aware:"No",c:lav},
          {app:"Focusmate",what:"Virtual coworking. Social pressure.",aware:"No",c:lav},
          {app:"Dawdle AI",what:"2-min reflection exercise. Academic project.",aware:"Yes",c:lav},
          {app:"Aatram",what:"Emotion-first. AI nudges. Momentum. Recovery.",aware:"Yes",c:lav},
        ].map((r,i)=>(
          <Fade key={i} delay={0.06*i}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 0",borderBottom:`1px solid ${w04}`}}>
              <div>
                <span style={{fontFamily:SANS,fontSize:15,fontWeight:r.app==="Aatram"?600:400,color:r.app==="Aatram"?lav:cream}}>{r.app}</span>
                <span style={{fontFamily:SANS,fontSize:13,color:dim,marginLeft:16}}>{r.what}</span>
              </div>
              <span style={{fontFamily:MONO,fontSize:9,color:r.aware==="Yes"?lav:dim2,letterSpacing:"0.06em"}}>{r.aware==="Yes"?"EMOTION \u2713":"EMOTION \u2717"}</span>
            </div>
          </Fade>
        ))}
      </section>

      {/* === BETA LEARNINGS === */}
      <section id="cs-06" style={{padding:"clamp(80px,14vw,180px) 32px",maxWidth:720,margin:"0 auto"}}>
        <Fade><div style={{fontFamily:MONO,fontSize:11,letterSpacing:"0.24em",color:lav,marginBottom:20}}>06 BETA LEARNINGS</div></Fade>
        <Fade delay={0.06}>
          <h2 style={{fontFamily:SERIF,fontSize:"clamp(36px,5vw,60px)",fontWeight:400,lineHeight:1.05,margin:"0 0 48px"}}>
            16 testers. <em style={{fontStyle:"italic",color:lav}}>Brutally honest.</em>
          </h2>
        </Fade>
        {[
          {fb:"I don't understand what this app does.",fix:"Added 3-screen onboarding reframe. Lead with 'it's emotion, not discipline' before showing any features.",st:"Shipped",sc:lav},
          {fb:"Why can't I set nudge times freely?",fix:"Expanded from 3 fixed windows to full custom scheduling plus smart timing that adapts to your patterns.",st:"Shipped",sc:lav},
          {fb:"The leaderboard should show what friends are doing.",fix:"Redesigning as 'Friends Zone' with ambient status, not rankings. '\u{1F7E2} Sarah is in the zone.'",st:"Building",sc:lav},
          {fb:"Too many features. I got lost.",fix:"Implementing progressive disclosure. Week 1 = mood + timer + one nudge style. Features unlock over time.",st:"Building",sc:lav},
        ].map((x,i)=>(
          <Fade key={i} delay={0.06*i}>
            <div style={{padding:"32px 0",borderBottom:`1px solid ${w04}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <div style={{fontFamily:SERIF,fontSize:18,fontStyle:"italic",color:quoteColor4}}>&quot;{x.fb}&quot;</div>
                <span style={{fontFamily:MONO,fontSize:9,color:x.sc,letterSpacing:"0.06em",flexShrink:0,marginLeft:16}}>{x.st}</span>
              </div>
              <p style={{fontSize:14,color:dim,lineHeight:1.7,margin:0}}>{x.fix}</p>
            </div>
          </Fade>
        ))}

        {/* Real beta data */}
        <Fade delay={0.3}>
          <div style={{marginTop:48,padding:"32px 0",borderTop:`1px solid ${w04}`}}>
            <div style={{fontFamily:MONO,fontSize:10,letterSpacing:"0.14em",color:lav,marginBottom:24}}>REAL DATA FROM 16 BETA TESTERS</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20}}>
              {[
                {n:"12",label:"Focus sessions completed"},
                {n:"282",label:"Total focus minutes logged"},
                {n:"100%",label:"Task rescue rate"},
                {n:"23.5",label:"Avg minutes per session"},
              ].map((s,i)=>(
                <div key={i} style={{textAlign:"center"}}>
                  <div style={{fontFamily:SERIF,fontSize:32,color:cream}}>{s.n}</div>
                  <div style={{fontFamily:MONO,fontSize:9,color:dim2,marginTop:6,letterSpacing:"0.04em",lineHeight:1.4}}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Fade>

        <Fade delay={0.35}>
          <div style={{padding:"28px 0",borderTop:`1px solid ${w04}`}}>
            <div style={{fontFamily:MONO,fontSize:10,letterSpacing:"0.14em",color:lav,marginBottom:16}}>EMOTION CHECK-IN DISTRIBUTION</div>
            {[
              {emotion:"Energized",pct:66},
              {emotion:"Steady",pct:25},
              {emotion:"Overwhelmed",pct:8},
              {emotion:"Resistant",pct:0},
            ].map((e,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                <span style={{fontFamily:SANS,fontSize:13,color:cream,minWidth:100}}>{e.emotion}</span>
                <div style={{flex:1,height:4,borderRadius:2,background:w04}}>
                  <div style={{width:`${e.pct}%`,height:"100%",borderRadius:2,background:e.pct>0?lav:"transparent",transition:"width 0.6s"}}/>
                </div>
                <span style={{fontFamily:MONO,fontSize:11,color:e.pct>0?cream:dim2,minWidth:36,textAlign:"right"}}>{e.pct}%</span>
              </div>
            ))}
            <p style={{fontFamily:SANS,fontSize:13,color:dim,marginTop:16,lineHeight:1.7}}>The surprise: 66% of check-ins were &quot;Energized.&quot; Our hypothesis was that most users would check in as Resistant or Overwhelmed. Instead, the app attracted users who already had energy but needed help directing it. This changes our nudge strategy entirely.</p>
          </div>
        </Fade>
      </section>
      <section id="cs-07" style={{padding:"clamp(100px,16vw,220px) 32px",textAlign:"center",position:"relative"}}>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:500,height:500,borderRadius:"50%",background:`radial-gradient(circle,${lav}04,transparent 70%)`,filter:"blur(100px)"}}/>
        <div style={{maxWidth:640,margin:"0 auto",position:"relative"}}>
          <Fade><div style={{fontFamily:MONO,fontSize:11,letterSpacing:"0.24em",color:lav,marginBottom:20}}>07 WHAT I GOT WRONG</div></Fade>
          <Fade delay={0.08}>
            <h2 style={{fontFamily:SERIF,fontSize:"clamp(36px,5vw,60px)",fontWeight:400,lineHeight:1.05,margin:"0 0 60px"}}>
              Mistakes I made. <em style={{fontStyle:"italic",color:lav}}>What they taught me.</em>
            </h2>
          </Fade>
          {[
            {wrong:"I assumed the product would explain itself.",lesson:"It didn't. Beta testers opened the app and saw an emotion check-in with zero context. They expected a timer. The concept is counterintuitive - you have to tell people WHY before they'll engage."},
            {wrong:"I built too many features before validating the core loop.",lesson:"We shipped with 5 tabs, 4 nudge personalities, a leaderboard, calendar, and stats. Testers said 'I got lost.' The core loop is just: check in \u2192 focus \u2192 see momentum rise. Everything else should have been gated."},
            {wrong:"I designed nudge timing around my schedule, not theirs.",lesson:"Three time windows: morning, afternoon, evening. Obvious, right? But one user's productive window is 1 AM. The assumption that three slots would cover everyone was lazy."},
            {wrong:"I treated the leaderboard as motivation. It was demotivating.",lesson:"Rankings help the top 10% and depress everyone else. Users wanted to see what friends are doing, not how they rank. We're replacing it with ambient status."},
          ].map((x,i)=>(
            <Fade key={i} delay={0.08+i*0.06}>
              <div style={{textAlign:"left",padding:"32px 0",borderBottom:`1px solid ${w04}`}}>
                <div style={{fontFamily:SERIF,fontSize:20,color:lav,marginBottom:10,fontStyle:"italic"}}>&quot;{x.wrong}&quot;</div>
                <p style={{fontSize:14,lineHeight:1.8,color:dim,margin:0}}>{x.lesson}</p>
              </div>
            </Fade>
          ))}
          <Fade delay={0.4}>
            <p style={{fontFamily:SERIF,fontSize:18,fontStyle:"italic",color:quoteColor5,lineHeight:1.6,marginTop:40}}>
              Every mistake came from the same place: designing for how I thought users should behave, not how they actually do.
            </p>
          </Fade>
        </div>
      </section>

      {/* === METRICS === */}
      <section id="cs-08" style={{padding:"80px 32px 120px",maxWidth:720,margin:"0 auto"}}>
        <Fade><div style={{fontFamily:MONO,fontSize:11,letterSpacing:"0.24em",color:lav,marginBottom:20}}>08 SUCCESS FRAMEWORK</div></Fade>
        <Fade delay={0.06}>
          <h2 style={{fontFamily:SERIF,fontSize:"clamp(32px,4.5vw,52px)",fontWeight:400,lineHeight:1.05,margin:"0 0 48px"}}>
            What we&apos;re <em style={{fontStyle:"italic",color:lav}}>measuring</em>.
          </h2>
        </Fade>
        {[
          {m:"Day 7 retention",t:">25%",type:"North Star",c:lav},
          {m:"Day 30 retention",t:">10%",type:"North Star",c:lav},
          {m:"Sessions / user / week",t:">5",type:"Engagement",c:lav},
          {m:"Nudge \u2192 session conversion",t:">35%",type:"Core Loop",c:lav},
          {m:"Emotion check-in rate",t:">90%",type:"Core Loop",c:lav},
          {m:"Failure recovery usage",t:">60%",type:"Differentiation",c:lav},
        ].map((r,i)=>(
          <Fade key={i} delay={0.04*i}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 0",borderBottom:`1px solid ${w04}`}}>
              <span style={{fontFamily:SANS,fontSize:14,color:cream}}>{r.m}</span>
              <div style={{display:"flex",alignItems:"center",gap:16}}>
                <span style={{fontFamily:MONO,fontSize:13,fontWeight:600,color:cream}}>{r.t}</span>
                <span style={{fontFamily:MONO,fontSize:9,color:r.c,letterSpacing:"0.06em"}}>{r.type}</span>
              </div>
            </div>
          </Fade>
        ))}
      </section>

      {/* === ROADMAP === */}
      <section id="cs-09" style={{padding:"80px 32px 120px",maxWidth:640,margin:"0 auto"}}>
        <Fade><div style={{fontFamily:MONO,fontSize:11,letterSpacing:"0.24em",color:lav,marginBottom:20}}>09 WHAT&apos;S NEXT</div></Fade>
        <Fade delay={0.06}>
          <h2 style={{fontFamily:SERIF,fontSize:"clamp(32px,4.5vw,52px)",fontWeight:400,lineHeight:1.05,margin:"0 0 48px"}}>
            From beta to <em style={{fontStyle:"italic",color:lav}}>launch</em>.
          </h2>
        </Fade>
        {[
          {ph:"Now",t:"App Store submission. Onboarding polish. Privacy review.",c:lav,on:true},
          {ph:"Month 1",t:"Campus launch. 5-10 ambassadors. TikTok StudyTok. Day 7/30 retention tracking.",c:lav},
          {ph:"Month 2-3",t:"Friends Zone. Invite system. Weekly group challenges.",c:lav},
          {ph:"Month 4-6",t:"AI learns individual patterns. Expand to 3-5 campuses. Premium tier.",c:lav},
        ].map((x,i)=>(
          <Fade key={i} delay={0.06*i}>
            <div style={{display:"flex",gap:20,padding:"24px 0",borderBottom:`1px solid ${w04}`}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:x.on?x.c:`${x.c}40`,marginTop:6,flexShrink:0,boxShadow:x.on?`0 0 10px ${x.c}`:""}}/>
              <div>
                <div style={{fontFamily:MONO,fontSize:10,color:x.c,letterSpacing:"0.1em",marginBottom:4}}>{x.ph}</div>
                <div style={{fontSize:15,color:dim,lineHeight:1.7}}>{x.t}</div>
              </div>
            </div>
          </Fade>
        ))}
      </section>

      {/* === WHAT'S COMING === */}
      <section id="cs-10" style={{padding:"clamp(80px,14vw,180px) 32px",textAlign:"center",position:"relative"}}>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:400,height:400,borderRadius:"50%",background:`radial-gradient(circle,${lav}06,transparent 70%)`,filter:"blur(80px)"}}/>
        <div style={{maxWidth:600,margin:"0 auto",position:"relative"}}>
          <Fade><div style={{fontFamily:MONO,fontSize:11,letterSpacing:"0.24em",color:lav,marginBottom:20}}>10 ON THE HORIZON</div></Fade>
          <Fade delay={0.06}>
            <h2 style={{fontFamily:SERIF,fontSize:"clamp(32px,4.5vw,52px)",fontWeight:400,lineHeight:1.05,margin:"0 0 40px"}}>
              Nudges that know <em style={{fontStyle:"italic",color:lav}}>you</em>.
            </h2>
          </Fade>
          <Fade delay={0.1}>
            <p style={{fontSize:15,color:dim,lineHeight:1.85,marginBottom:40}}>
              Right now, nudges adapt to task urgency and your chosen personality. Next: they&apos;ll learn your individual procrastination patterns over time, delivered as exclusive, hyper-personalized interventions.
            </p>
          </Fade>
          <div style={{textAlign:"left",maxWidth:480,margin:"0 auto"}}>
            {[
              {title:"Pattern Recognition",desc:"AI learns when you typically stall, which tasks you avoid, and what time of day you're most vulnerable."},
              {title:"Contextual Triggers",desc:"Phone usage spikes, friend session starts, momentum decay warnings. The right nudge at the exact right moment."},
              {title:"Evolving Copy",desc:"Nudge language that adapts to what's worked for you before. If micro-commitments land, you get more. If identity priming works, it leads."},
            ].map((x,i)=>(
              <Fade key={i} delay={0.12+i*0.06}>
                <div style={{padding:"24px 0",borderBottom:i<2?`1px solid ${w04}`:"none"}}>
                  <div style={{fontFamily:SERIF,fontSize:20,color:cream,marginBottom:8}}>{x.title}</div>
                  <p style={{fontSize:14,color:dim,lineHeight:1.75,margin:0}}>{x.desc}</p>
                </div>
              </Fade>
            ))}
          </div>
          <Fade delay={0.3}>
            <div style={{marginTop:40,fontFamily:MONO,fontSize:10,color:lav,letterSpacing:"0.1em",padding:"10px 20px",border:`1px solid ${lav}20`,borderRadius:20,display:"inline-block"}}>{"100% ON-DEVICE \u00B7 YOUR DATA NEVER LEAVES"}</div>
          </Fade>
        </div>
      </section>

      {/* === FOOTER === */}
      <section style={{padding:"clamp(100px,16vw,200px) 32px",textAlign:"center",position:"relative"}}>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:500,height:500,borderRadius:"50%",background:`radial-gradient(circle,${lav}04,transparent 70%)`,filter:"blur(100px)"}}/>
        <Fade>
          <div style={{maxWidth:600,margin:"0 auto",position:"relative"}}>
            <h2 style={{fontFamily:SERIF,fontSize:"clamp(36px,6vw,72px)",fontWeight:400,lineHeight:1.08,margin:"0 0 20px"}}>
              Stop planning.
            </h2>
            <h2 style={{fontFamily:SERIF,fontSize:"clamp(36px,6vw,72px)",fontWeight:400,lineHeight:1.08,fontStyle:"italic",color:lav,margin:"0 0 40px"}}>
              Start starting.
            </h2>
            <p style={{fontSize:14,color:dim,lineHeight:1.7,marginBottom:48,maxWidth:440,margin:"0 auto 48px"}}>
              A 0-to-1 case study documenting the journey from a roommate conversation to App Store submission. User research, behavioral science, competitive analysis, beta-driven iteration, and metrics-first product thinking.
            </p>
            <div style={{fontFamily:MONO,fontSize:10,color:dim2,letterSpacing:"0.08em"}}>
              {"Chetan Jonnalagadda \u00B7 March 2026"}
            </div>
          </div>
        </Fade>
      </section>
    </div>
    </ThemeContext.Provider>
  );
}
