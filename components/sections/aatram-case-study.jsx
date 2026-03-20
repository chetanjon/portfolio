'use client';

import { useState, useEffect, useRef, useCallback } from "react";

const SERIF = "'Instrument Serif','Georgia',serif";
const SANS = "'Outfit','DM Sans',system-ui,sans-serif";
const MONO = "'JetBrains Mono','SF Mono',monospace";

const bg = "#08080C";
const cream = "#E8E4D9";
const dim = "rgba(232,228,217,0.4)";
const dim2 = "rgba(232,228,217,0.18)";
const lav = "#BFB8F3";

const useVis = (t = 0.12) => {
  const r = useRef(null); const [v, s] = useState(false);
  useEffect(() => { const e = r.current; if (!e) return; const o = new IntersectionObserver(([x]) => { if (x.isIntersecting) { s(true); o.unobserve(e); } }, { threshold: t }); o.observe(e); return () => o.disconnect(); }, [t]);
  return [r, v];
};
const useScroll = () => { const [p, s] = useState(0); useEffect(() => { const h = () => { const d = document.documentElement; s(d.scrollTop / (d.scrollHeight - d.clientHeight)); }; window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []); return p; };
const useCount = (end, dur = 2000) => { const [v, s] = useState(0); const [go, setGo] = useState(false); const start = useCallback(() => setGo(true), []); useEffect(() => { if (!go) return; let f; const t0 = performance.now(); const tick = n => { const p = Math.min((n-t0)/dur,1); s(Math.round((1-Math.pow(1-p,4))*end)); if(p<1) f=requestAnimationFrame(tick); }; f=requestAnimationFrame(tick); return ()=>cancelAnimationFrame(f); }, [go,end,dur]); return [v, start]; };

const Fade = ({ children, delay = 0, y = 50, style = {} }) => {
  const [r, v] = useVis();
  return (<div ref={r} style={{ opacity: v?1:0, transform: v?"translateY(0)":`translateY(${y}px)`, transition: `all 1.1s cubic-bezier(.22,1,.36,1) ${delay}s`, ...style }}>{children}</div>);
};

const Num = ({ end, suffix="", color=lav }) => {
  const [r,v]=useVis(0.3); const [val,go]=useCount(end);
  useEffect(()=>{if(v)go();},[v,go]);
  return <span ref={r} style={{color,fontFamily:SERIF}}>{val}{suffix}</span>;
};

const Gauge = () => {
  const [score, setScore] = useState(67);
  const [anim, setAnim] = useState(0);
  useEffect(()=>{let f;const t=()=>{setAnim(p=>{const d=score-p;if(Math.abs(d)<0.4)return score;return p+d*0.07;});f=requestAnimationFrame(t);};f=requestAnimationFrame(t);return()=>cancelAnimationFrame(f);},[score]);

  const R=72, cx=100, cy=90;
  const toXY=(deg)=>({x:cx+R*Math.cos(deg*Math.PI/180),y:cy+R*Math.sin(deg*Math.PI/180)});
  const startA=-225, endA=45, range=endA-startA;
  const scoreA=startA+(anim/100)*range;
  const mkArc=(a,b)=>{const p=toXY(a),q=toXY(b);return`M${p.x} ${p.y} A${R} ${R} 0 ${(b-a)>180?1:0} 1 ${q.x} ${q.y}`;};
  const dot=toXY(scoreA);
  const ticks=Array.from({length:25},(_,i)=>{const d=startA+(i/24)*range;const a=d*Math.PI/180;return{x1:cx+R*Math.cos(a),y1:cy+R*Math.sin(a),x2:cx+(R-4)*Math.cos(a),y2:cy+(R-4)*Math.sin(a)};});

  return (
    <div style={{textAlign:"center",maxWidth:340,margin:"0 auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",padding:"0 30px",marginBottom:4}}>
        <span style={{fontFamily:MONO,fontSize:10,color:anim>24&&anim<=49?cream:dim2,transition:"color 0.4s"}}>Building</span>
        <span style={{fontFamily:MONO,fontSize:10,color:anim>49&&anim<=74?cream:dim2,transition:"color 0.4s"}}>Rolling</span>
      </div>
      <svg viewBox="0 0 200 130" width="300" style={{display:"block",margin:"0 auto"}}>
        <path d={mkArc(startA,endA)} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" strokeLinecap="round"/>
        {ticks.map((t,i)=><line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="rgba(255,255,255,0.08)" strokeWidth="0.6"/>)}
        {anim>0.5&&<path d={mkArc(startA,scoreA)} fill="none" stroke={lav} strokeWidth="4" strokeLinecap="round" style={{filter:`drop-shadow(0 0 6px ${lav})`,transition:"stroke 0.4s"}}/>}
        <circle cx={dot.x} cy={dot.y} r="3" fill={lav} style={{filter:`drop-shadow(0 0 5px ${lav})`}}/>
        <text x={cx} y={cy-2} textAnchor="middle" fontFamily="'Instrument Serif',serif" fontSize="38" fontWeight="400" fill={cream}>{Math.round(anim)}</text>
        <text x={cx} y={cy+14} textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize="6" letterSpacing="2.5" fill={dim2}>MOMENTUM</text>
      </svg>
      <div style={{display:"flex",justifyContent:"space-between",padding:"0 16px",marginTop:-8}}>
        <span style={{fontFamily:MONO,fontSize:10,color:anim<=24?cream:dim2,transition:"color 0.4s"}}>Starting</span>
        <span style={{fontFamily:MONO,fontSize:10,color:anim>74?cream:dim2,transition:"color 0.4s"}}>Locked In</span>
      </div>
      <input type="range" min={0} max={100} value={score} onChange={e=>setScore(Number(e.target.value))} style={{width:"65%",marginTop:12,accentColor:lav,cursor:"pointer",opacity:0.5}}/>
    </div>
  );
};

const NudgeDemo = () => {
  const [a, setA] = useState(0);
  const t = [
    {time:"15 min before",label:"Action Step",copy:"Write the first line of your paper. Just the first line.",tone:"Coach",c:lav,mech:"Implementation Intention",emoji:"\u270D\uFE0F"},
    {time:"20 min after",label:"Stakes Reminder",copy:"You said this is 30% of your grade. 2 hours left.",tone:"Friend",c:lav,mech:"Momentum Anchoring",emoji:"\uD83C\uDFAF"},
    {time:"45 min after",label:"Future Self",copy:"The version of you at midnight will either be relieved or panicking.",tone:"Coach",c:lav,mech:"Identity Priming",emoji:"\uD83D\uDD2E"},
    {time:"90 min after",label:"Progress Check",copy:"You've done 0 minutes. Not judging. What's blocking you?",tone:"Therapist",c:lav,mech:"Progress Anchoring",emoji:"\uD83E\uDDE0"},
    {time:"2 hours after",label:"Small Start",copy:"2 minutes. Open the doc. That's the only ask.",tone:"Friend",c:lav,mech:"Micro Commitment",emoji:"\uD83E\uDD25"},
  ];
  const n=t[a];
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:48,position:"relative"}}>
        <div style={{position:"absolute",top:18,left:"5%",right:"5%",height:1,background:"rgba(255,255,255,0.04)"}}/>
        {t.map((x,i)=>(
          <div key={i} onClick={()=>setA(i)} style={{cursor:"pointer",textAlign:"center",zIndex:1,flex:1}}>
            <div style={{width:36,height:36,borderRadius:"50%",background:a>=i?`${x.c}15`:bg,border:`1.5px solid ${a>=i?x.c:"rgba(255,255,255,0.06)"}`,margin:"0 auto 10px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,transition:"all 0.4s",boxShadow:a===i?`0 0 20px ${x.c}30`:"none"}}>
              {a>=i?x.emoji:<span style={{fontFamily:MONO,fontSize:11,color:dim2}}>{i+1}</span>}
            </div>
            <div style={{fontFamily:MONO,fontSize:9,color:a>=i?x.c:dim2,transition:"color 0.4s"}}>{x.time}</div>
          </div>
        ))}
      </div>
      <div style={{maxWidth:480,margin:"0 auto",background:"rgba(255,255,255,0.02)",borderRadius:20,overflow:"hidden",border:`1px solid ${n.c}15`,transition:"border-color 0.4s"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,padding:"14px 20px",borderBottom:"1px solid rgba(255,255,255,0.03)"}}>
          <div style={{width:18,height:18,borderRadius:5,background:`${n.c}20`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9}}>{"\uD83D\uDD14"}</div>
          <span style={{fontFamily:SANS,fontSize:11,fontWeight:600,color:dim,flex:1,letterSpacing:"0.04em"}}>AATRAM</span>
          <span style={{fontFamily:MONO,fontSize:9,color:dim2}}>{n.time}</span>
        </div>
        <div style={{padding:"20px 24px 24px"}}>
          <div style={{fontFamily:SANS,fontSize:13,fontWeight:600,color:cream,marginBottom:10,letterSpacing:"0.02em"}}>{n.label}</div>
          <div style={{fontFamily:SERIF,fontSize:22,fontStyle:"italic",color:"rgba(232,228,217,0.7)",lineHeight:1.45}}>{"\u201C"}{n.copy}{"\u201D"}</div>
        </div>
        <div style={{display:"flex",gap:8,padding:"0 20px 16px"}}>
          <span style={{fontFamily:MONO,fontSize:9,color:n.c,background:`${n.c}10`,padding:"4px 12px",borderRadius:20}}>{n.mech}</span>
          <span style={{fontFamily:MONO,fontSize:9,color:dim,background:"rgba(255,255,255,0.03)",padding:"4px 12px",borderRadius:20}}>{n.tone}</span>
        </div>
      </div>
      <div style={{fontFamily:MONO,fontSize:10,color:dim2,marginTop:16,textAlign:"center"}}>
        {a<4?"User hasn't started. Engine escalates.":"Final touch. Then silence. No guilt."}
      </div>
    </div>
  );
};

const EmotionDemo = () => {
  const [emo, setEmo] = useState("steady");
  const d = {
    energized:{emoji:"\u26A1",label:"Energized",tasks:"Full list: 3 tasks visible",session:"45 min",nudge:"Coach: \"Let's aim high. 3 tasks, 45 min each.\"",intensity:"High"},
    steady:{emoji:"\uD83D\uDE0C",label:"Steady",tasks:"Priorities only: 2 tasks",session:"25 min",nudge:"Friend: \"Solid day ahead. Start with your update?\"",intensity:"Medium"},
    resistant:{emoji:"\uD83E\uDD28",label:"Resistant",tasks:"Stripped down: 1 task",session:"10 min",nudge:"Therapist: \"What's the resistance about? Name it.\"",intensity:"Low"},
    overwhelmed:{emoji:"\uD83D\uDE30",label:"Overwhelmed",tasks:"Minimal: \"One thing. You pick.\"",session:"5 min",nudge:"Friend: \"Breathe. Just 5 minutes. That's all.\"",intensity:"Gentle"},
  };
  const e=d[emo];
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:40}}>
        {Object.entries(d).map(([k,v])=>(
          <div key={k} onClick={()=>setEmo(k)} style={{padding:"22px 14px",borderRadius:16,background:emo===k?"rgba(255,255,255,0.04)":"transparent",border:`1px solid ${emo===k?lav+"30":"rgba(255,255,255,0.04)"}`,cursor:"pointer",textAlign:"center",transition:"all 0.35s"}}>
            <div style={{fontSize:28,marginBottom:6}}>{v.emoji}</div>
            <div style={{fontFamily:SANS,fontSize:13,fontWeight:600,color:emo===k?cream:dim}}>{v.label}</div>
          </div>
        ))}
      </div>
      <div style={{maxWidth:560,margin:"0 auto"}}>
        {[
          {label:"Task view",value:e.tasks},
          {label:"Session length",value:e.session},
          {label:"Nudge style",value:e.nudge},
          {label:"App intensity",value:e.intensity},
        ].map((row,i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",padding:"14px 0",borderBottom:i<3?`1px solid rgba(255,255,255,0.04)`:"none",gap:20}}>
            <span style={{fontFamily:MONO,fontSize:10,color:dim2,letterSpacing:"0.06em",flexShrink:0,minWidth:100}}>{row.label}</span>
            <span style={{fontFamily:SANS,fontSize:14,color:cream,textAlign:"right"}}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function AatramCaseStudy() {
  const progress = useScroll();

  return (
    <div style={{background:bg,color:cream,minHeight:"100vh",fontFamily:SANS,WebkitFontSmoothing:"antialiased",overflowX:"hidden"}}>
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet"/>

      <div style={{position:"fixed",top:0,left:0,width:"100%",height:1.5,zIndex:999}}>
        <div style={{height:"100%",width:`${progress*100}%`,background:`linear-gradient(90deg,${lav}40,${lav})`,opacity:0.6,transition:"width 60ms linear"}}/>
      </div>

      {/* HERO */}
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"100px 32px",position:"relative",textAlign:"center"}}>
        <div style={{position:"absolute",top:"30%",left:"50%",transform:"translate(-50%,-50%)",width:700,height:700,borderRadius:"50%",background:`radial-gradient(circle,${lav}06,transparent 70%)`,filter:"blur(100px)"}}/>
        <div style={{maxWidth:800,position:"relative"}}>
          <Fade><div style={{fontFamily:MONO,fontSize:10,letterSpacing:"0.25em",color:dim2,marginBottom:40}}>A 0-TO-1 PRODUCT CASE STUDY</div></Fade>
          <Fade delay={0.1}>
            <h1 style={{fontFamily:SERIF,fontSize:"clamp(48px,8vw,100px)",fontWeight:400,lineHeight:1.05,letterSpacing:"-0.02em",margin:0}}>You know what to do.</h1>
          </Fade>
          <Fade delay={0.2}>
            <h1 style={{fontFamily:SERIF,fontSize:"clamp(48px,8vw,100px)",fontWeight:400,lineHeight:1.05,letterSpacing:"-0.02em",margin:"0 0 40px",fontStyle:"italic",color:lav}}>Starting is the problem.</h1>
          </Fade>
          <Fade delay={0.35}>
            <p style={{fontFamily:SANS,fontSize:17,color:dim,lineHeight:1.8,maxWidth:460,margin:"0 auto 60px"}}>Three roommates built an app that treats procrastination as what it actually is: an emotion problem, not a discipline problem.</p>
          </Fade>
          <Fade delay={0.45}>
            <div style={{display:"flex",gap:40,justifyContent:"center",fontFamily:MONO,fontSize:10,color:dim2,letterSpacing:"0.06em"}}>
              <span>PM / Co-Founder</span><span style={{opacity:0.3}}>{"."}</span><span>3 co-founders</span><span style={{opacity:0.3}}>{"."}</span><span>iOS (Swift)</span><span style={{opacity:0.3}}>{"."}</span><span>{"Beta \u2192 App Store"}</span>
            </div>
          </Fade>
        </div>
      </section>

      {/* STATS */}
      <section style={{padding:"80px 32px 120px",textAlign:"center"}}>
        <Fade>
          <div style={{display:"flex",justifyContent:"center",gap:"clamp(40px,8vw,100px)",flexWrap:"wrap"}}>
            {[{end:88,suf:"%",l:"of students procrastinate"},{end:12,suf:"B+",l:"productivity app market"},{end:0,suf:"",l:"apps treating the emotion"},{end:120,suf:"+",l:"waitlist signups"}].map((s,i)=>(
              <Fade key={i} delay={i*0.08}><div>
                <div style={{fontFamily:SERIF,fontSize:"clamp(40px,6vw,72px)",fontWeight:400,lineHeight:1}}><Num end={s.end} suffix={s.suf}/></div>
                <div style={{fontFamily:MONO,fontSize:9,color:dim2,marginTop:10,letterSpacing:"0.08em",textTransform:"uppercase"}}>{s.l}</div>
              </div></Fade>
            ))}
          </div>
        </Fade>
      </section>

      {/* ORIGIN */}
      <section style={{padding:"clamp(80px,14vw,180px) 32px",maxWidth:720,margin:"0 auto"}}>
        <Fade><div style={{fontFamily:MONO,fontSize:10,letterSpacing:"0.2em",color:lav,marginBottom:20}}>01 THE SPARK</div></Fade>
        <Fade delay={0.06}><h2 style={{fontFamily:SERIF,fontSize:"clamp(36px,5vw,60px)",fontWeight:400,lineHeight:1.1,margin:"0 0 40px"}}>A 30-minute brainstorm that became a <em style={{fontStyle:"italic",color:lav}}>startup</em>.</h2></Fade>
        <Fade delay={0.12}>
          <p style={{fontSize:16,lineHeight:1.9,color:dim,marginBottom:24}}>{"It started the way most good ideas start: complaining. Three roommates, late at night. Chetan had wasted an entire day despite having nothing stopping him. Sai admitted the same. Ujjwal set a 30-minute timer."}</p>
          <p style={{fontSize:16,lineHeight:1.9,color:dim,marginBottom:40}}>{"The conversation kept circling back to one feeling: "}<em style={{fontFamily:SERIF,fontSize:18,color:cream,fontStyle:"italic"}}>{"\"I wish someone would just push me to start.\""}</em>{" Not plan. Not organize. Just start."}</p>
        </Fade>
        <Fade delay={0.18}>
          <div style={{display:"flex",gap:32,flexWrap:"wrap"}}>
            {[{n:"Chetan Jonnalagadda",r:"PM / Co-Founder",d:"M.S. Management of Technology"},{n:"Sai Teja Dassari",r:"Engineering",d:"M.S. Robotics Engineering"},{n:"Ujjwal Reddy",r:"Engineering",d:"B.S. Computer Science"}].map((p,i)=>(
              <div key={i} style={{flex:"1 1 180px"}}>
                <div style={{fontFamily:SANS,fontSize:14,fontWeight:600,color:cream}}>{p.n}</div>
                <div style={{fontFamily:MONO,fontSize:10,color:lav,marginTop:2}}>{p.r}</div>
                <div style={{fontFamily:SANS,fontSize:12,color:dim2,marginTop:2}}>{p.d}</div>
              </div>
            ))}
          </div>
        </Fade>
      </section>

      {/* THESIS */}
      <section style={{padding:"clamp(100px,16vw,220px) 32px",textAlign:"center",position:"relative"}}>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:600,borderRadius:"50%",background:`radial-gradient(circle,${lav}05,transparent 70%)`,filter:"blur(100px)"}}/>
        <div style={{maxWidth:700,margin:"0 auto",position:"relative"}}>
          <Fade><div style={{fontFamily:MONO,fontSize:10,letterSpacing:"0.2em",color:lav,marginBottom:20}}>02 THE THESIS</div></Fade>
          <Fade delay={0.08}><h2 style={{fontFamily:SERIF,fontSize:"clamp(40px,6vw,72px)",fontWeight:400,lineHeight:1.08,margin:"0 0 40px"}}>{"Procrastination isn't a "}<em style={{fontStyle:"italic",color:lav}}>discipline</em> problem.</h2></Fade>
          <Fade delay={0.16}>
            <p style={{fontSize:17,lineHeight:1.85,color:dim,maxWidth:520,margin:"0 auto 48px"}}>{"Dr. Timothy Pychyl proved it. Piers Steel's meta-analysis of 691 correlations confirmed it. Task aversiveness - an emotional variable - is the strongest predictor of procrastination. Not laziness. Not poor planning. Emotion."}</p>
          </Fade>
        </div>
      </section>

      {/* PRODUCT */}
      <section style={{padding:"clamp(80px,14vw,180px) 32px",textAlign:"center"}}>
        <Fade><div style={{fontFamily:MONO,fontSize:10,letterSpacing:"0.2em",color:lav,marginBottom:20}}>03 WHAT WE BUILT</div></Fade>
        <Fade delay={0.06}><h2 style={{fontFamily:SERIF,fontSize:"clamp(36px,5vw,60px)",fontWeight:400,lineHeight:1.1,margin:"0 0 20px"}}>Five features. One philosophy.</h2></Fade>
        <Fade delay={0.1}><p style={{fontFamily:SERIF,fontSize:"clamp(24px,3.5vw,42px)",fontWeight:400,fontStyle:"italic",color:lav,margin:"0 0 60px"}}>Start gentle, build momentum.</p></Fade>
        <div style={{maxWidth:640,margin:"0 auto",textAlign:"left"}}>
          {[
            {n:"Emotion Check-In",d:"One question before every session: 'How are you feeling?' Four options. The entire app adapts.",cite:"Lieberman et al., affect labeling reduces amygdala activation"},
            {n:"Count-Up Timer",d:"The stopwatch counts UP, not down. No countdown anxiety. You set a target. Even 2 minutes counts.",cite:"PMC 2022, perceived time pressure diminishes cognition"},
            {n:"Smart Nudges",d:"Not reminders. Psychology. AI sends an escalating chain of 5 touches, each using a different behavioral technique.",cite:"Gollwitzer meta-analysis, d = 0.65 effect size"},
            {n:"Failure Recovery",d:"Missed a task? No red badge. Four gentle options: move it, shrink it, do the first step, or let it go.",cite:"Wohl, Pychyl & Bennett, 2010"},
            {n:"Momentum Meter",d:"Streaks reset to zero. Momentum doesn't. It fills as you work, decays gently overnight, and never punishes a bad day.",cite:"Amabile & Kramer, the Progress Principle"},
          ].map((f,i)=>(
            <Fade key={i} delay={0.06*i}>
              <div style={{padding:"36px 0",borderBottom:`1px solid rgba(255,255,255,0.04)`}}>
                <div style={{fontFamily:SERIF,fontSize:24,color:cream,marginBottom:10}}>{f.n}</div>
                <p style={{fontSize:15,lineHeight:1.85,color:dim,margin:"0 0 10px"}}>{f.d}</p>
                <div style={{fontFamily:MONO,fontSize:9,color:lav,letterSpacing:"0.03em"}}>{"\u23F3"} {f.cite}</div>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* INTERACTIVE DEMOS */}
      <section style={{padding:"clamp(80px,14vw,180px) 32px"}}>
        <div style={{maxWidth:800,margin:"0 auto"}}>
          <Fade><div style={{fontFamily:MONO,fontSize:10,letterSpacing:"0.2em",color:lav,marginBottom:20,textAlign:"center"}}>04 TRY THE CORE MECHANICS</div></Fade>
          <Fade delay={0.06}><h2 style={{fontFamily:SERIF,fontSize:"clamp(36px,5vw,60px)",fontWeight:400,lineHeight:1.1,margin:"0 0 60px",textAlign:"center"}}>The emotion shapes <em style={{fontStyle:"italic",color:lav}}>everything</em>.</h2></Fade>
          <Fade delay={0.12}><EmotionDemo/></Fade>

          <div style={{height:100}}/>
          <Fade><div style={{fontFamily:MONO,fontSize:10,letterSpacing:"0.2em",color:lav,marginBottom:20,textAlign:"center"}}>NUDGE ESCALATION</div></Fade>
          <Fade delay={0.06}><h2 style={{fontFamily:SERIF,fontSize:"clamp(28px,4vw,44px)",fontWeight:400,lineHeight:1.1,margin:"0 0 48px",textAlign:"center"}}>Five touches. Five techniques. <em style={{fontStyle:"italic",color:lav}}>Then silence.</em></h2></Fade>
          <Fade delay={0.12}><NudgeDemo/></Fade>

          <div style={{height:100}}/>
          <Fade><div style={{fontFamily:MONO,fontSize:10,letterSpacing:"0.2em",color:lav,marginBottom:20,textAlign:"center"}}>MOMENTUM</div></Fade>
          <Fade delay={0.06}><h2 style={{fontFamily:SERIF,fontSize:"clamp(28px,4vw,44px)",fontWeight:400,lineHeight:1.1,margin:"0 0 48px",textAlign:"center"}}>Never resets. <em style={{fontStyle:"italic",color:lav}}>Never punishes.</em></h2></Fade>
          <Fade delay={0.12}><Gauge/></Fade>
        </div>
      </section>

      {/* COMPETITIVE */}
      <section style={{padding:"80px 32px 120px",maxWidth:720,margin:"0 auto"}}>
        <Fade><div style={{fontFamily:MONO,fontSize:10,letterSpacing:"0.2em",color:lav,marginBottom:20}}>05 THE LANDSCAPE</div></Fade>
        <Fade delay={0.06}><h2 style={{fontFamily:SERIF,fontSize:"clamp(32px,4.5vw,52px)",fontWeight:400,lineHeight:1.1,margin:"0 0 48px"}}>Everyone punishes. <em style={{fontStyle:"italic",color:lav}}>Nobody asks why.</em></h2></Fade>
        {[
          {app:"Forest",what:"Grows a tree. Kills it if you leave.",aware:"No"},
          {app:"Opal",what:"Blocks apps via VPN. $60-100/year.",aware:"No"},
          {app:"Focusmate",what:"Virtual coworking. Social pressure.",aware:"No"},
          {app:"Dawdle AI",what:"2-min reflection exercise. Academic project.",aware:"Yes"},
          {app:"Aatram",what:"Emotion-first. AI nudges. Momentum. Recovery.",aware:"Yes"},
        ].map((r,i)=>(
          <Fade key={i} delay={0.06*i}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 0",borderBottom:`1px solid rgba(255,255,255,0.04)`}}>
              <div><span style={{fontFamily:SANS,fontSize:15,fontWeight:r.app==="Aatram"?600:400,color:r.app==="Aatram"?lav:cream}}>{r.app}</span><span style={{fontFamily:SANS,fontSize:13,color:dim,marginLeft:16}}>{r.what}</span></div>
              <span style={{fontFamily:MONO,fontSize:9,color:r.aware==="Yes"?lav:dim2,letterSpacing:"0.06em"}}>{r.aware==="Yes"?"EMOTION \u2713":"EMOTION \u2717"}</span>
            </div>
          </Fade>
        ))}
      </section>

      {/* METRICS */}
      <section style={{padding:"80px 32px 120px",maxWidth:720,margin:"0 auto"}}>
        <Fade><div style={{fontFamily:MONO,fontSize:10,letterSpacing:"0.2em",color:lav,marginBottom:20}}>06 SUCCESS FRAMEWORK</div></Fade>
        <Fade delay={0.06}><h2 style={{fontFamily:SERIF,fontSize:"clamp(32px,4.5vw,52px)",fontWeight:400,lineHeight:1.1,margin:"0 0 48px"}}>What {"we're"} <em style={{fontStyle:"italic",color:lav}}>measuring</em>.</h2></Fade>
        {[
          {m:"Day 7 retention",t:">25%",type:"North Star"},
          {m:"Day 30 retention",t:">10%",type:"North Star"},
          {m:"Sessions / user / week",t:">5",type:"Engagement"},
          {m:"Nudge \u2192 session conversion",t:">35%",type:"Core Loop"},
          {m:"Emotion check-in rate",t:">90%",type:"Core Loop"},
          {m:"Failure recovery usage",t:">60%",type:"Differentiation"},
        ].map((r,i)=>(
          <Fade key={i} delay={0.04*i}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 0",borderBottom:`1px solid rgba(255,255,255,0.04)`}}>
              <span style={{fontFamily:SANS,fontSize:14,color:cream}}>{r.m}</span>
              <div style={{display:"flex",alignItems:"center",gap:16}}>
                <span style={{fontFamily:MONO,fontSize:13,fontWeight:600,color:cream}}>{r.t}</span>
                <span style={{fontFamily:MONO,fontSize:9,color:lav,letterSpacing:"0.06em"}}>{r.type}</span>
              </div>
            </div>
          </Fade>
        ))}
      </section>

      {/* FOOTER */}
      <section style={{padding:"clamp(100px,16vw,200px) 32px",textAlign:"center",position:"relative"}}>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:500,height:500,borderRadius:"50%",background:`radial-gradient(circle,${lav}04,transparent 70%)`,filter:"blur(100px)"}}/>
        <Fade>
          <div style={{maxWidth:600,margin:"0 auto",position:"relative"}}>
            <h2 style={{fontFamily:SERIF,fontSize:"clamp(36px,6vw,72px)",fontWeight:400,lineHeight:1.08,margin:"0 0 20px"}}>Stop planning.</h2>
            <h2 style={{fontFamily:SERIF,fontSize:"clamp(36px,6vw,72px)",fontWeight:400,lineHeight:1.08,fontStyle:"italic",color:lav,margin:"0 0 40px"}}>Start starting.</h2>
            <p style={{fontSize:14,color:dim,lineHeight:1.7,maxWidth:440,margin:"0 auto 48px"}}>A 0-to-1 case study documenting the journey from a roommate conversation to App Store submission. User research, behavioral science, competitive analysis, beta-driven iteration, and metrics-first product thinking.</p>
            <div style={{fontFamily:MONO,fontSize:10,color:dim2,letterSpacing:"0.08em"}}>Chetan Jonnalagadda {"\u00B7"} March 2026</div>
          </div>
        </Fade>
      </section>
    </div>
  );
}
