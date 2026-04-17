'use client';

import { useState, useEffect, useRef, useCallback } from "react";

const SERIF = "'Instrument Serif','Georgia',serif";
const SANS = "'Outfit','DM Sans',system-ui,sans-serif";
const MONO = "'JetBrains Mono','SF Mono',monospace";

const bg = "#08080C";
const cream = "#E8E4D9";
const dim = "rgba(232,228,217,0.4)";
const dim2 = "rgba(232,228,217,0.18)";
const grn = "#1DB954";

const useVis = (t = 0.12) => { const r = useRef(null); const [v, s] = useState(false); useEffect(() => { const e = r.current; if (!e) return; const o = new IntersectionObserver(([x]) => { if (x.isIntersecting) { s(true); o.unobserve(e); } }, { threshold: t }); o.observe(e); return () => o.disconnect(); }, [t]); return [r, v]; };
const useScroll = () => { const [p, s] = useState(0); useEffect(() => { const h = () => { const d = document.documentElement; s(d.scrollTop / (d.scrollHeight - d.clientHeight)); }; window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []); return p; };
const useCount = (end, dur = 2000) => { const [v, s] = useState(0); const [go, setGo] = useState(false); const start = useCallback(() => setGo(true), []); useEffect(() => { if (!go) return; let f; const t0 = performance.now(); const tick = n => { const p = Math.min((n - t0) / dur, 1); s(Math.round((1 - Math.pow(1 - p, 4)) * end)); if (p < 1) f = requestAnimationFrame(tick); }; f = requestAnimationFrame(tick); return () => cancelAnimationFrame(f); }, [go, end, dur]); return [v, start]; };

const Fade = ({ children, delay = 0, y = 50, style = {} }) => { const [r, v] = useVis(); return (<div ref={r} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : `translateY(${y}px)`, transition: `all 1.1s cubic-bezier(.22,1,.36,1) ${delay}s`, ...style }}>{children}</div>); };
const Num = ({ end, suffix = "" }) => { const [r, v] = useVis(0.3); const [val, go] = useCount(end); useEffect(() => { if (v) go(); }, [v, go]); return <span ref={r} style={{ color: grn, fontFamily: SERIF }}>{val}{suffix}</span>; };
const Src = ({children}) => <span style={{fontFamily:MONO,fontSize:9,color:dim2,letterSpacing:"0.04em"}}>{children}</span>;

export default function SpotifyTeardown() {
  const progress = useScroll();

  return (
    <div style={{ background: bg, color: cream, minHeight: "100vh", fontFamily: SANS, WebkitFontSmoothing: "antialiased", overflowX: "hidden" }}>
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: 1.5, zIndex: 999 }}>
        <div style={{ height: "100%", width: `${progress * 100}%`, background: grn, opacity: 0.5, transition: "width 60ms linear" }} />
      </div>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 32px", position: "relative", textAlign: "center" }}>
        <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle,${grn}08,transparent 70%)`, filter: "blur(100px)" }} />
        <div style={{ maxWidth: 800, position: "relative" }}>
          <Fade><div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.25em", color: dim2, marginBottom: 40 }}>GROWTH TEARDOWN</div></Fade>
          <Fade delay={0.1}>
            <h1 style={{ fontFamily: SERIF, fontSize: "clamp(44px,7vw,90px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.02em", margin: "0 0 12px" }}>How Spotify turned</h1>
          </Fade>
          <Fade delay={0.18}>
            <h1 style={{ fontFamily: SERIF, fontSize: "clamp(44px,7vw,90px)", fontWeight: 400, lineHeight: 1.05, fontStyle: "italic", color: grn, margin: "0 0 40px" }}>listening into loyalty.</h1>
          </Fade>
          <Fade delay={0.3}>
            <p style={{ fontSize: 17, color: dim, lineHeight: 1.8, maxWidth: 480, margin: "0 auto 60px" }}>
              A teardown of the two features that turned a music player into a growth machine: Discover Weekly and Wrapped.
            </p>
          </Fade>
          <Fade delay={0.4}>
            <div style={{ display: "flex", gap: 40, justifyContent: "center", fontFamily: MONO, fontSize: 10, color: dim2, letterSpacing: "0.06em", flexWrap: "wrap" }}>
              <span>751M MAU</span>
              <span style={{ opacity: 0.3 }}>.</span>
              <span>290M premium subscribers</span>
              <span style={{ opacity: 0.3 }}>.</span>
              <span>~$19.4B annual revenue</span>
            </div>
            <div style={{fontFamily:MONO,fontSize:8,color:dim2,marginTop:8,letterSpacing:"0.06em"}}>Q4 2025 earnings, Spotify Shareholder Deck</div>
          </Fade>
        </div>
      </section>

      {/* THE NUMBERS */}
      <section style={{ padding: "80px 32px 120px", textAlign: "center" }}>
        <Fade>
          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(40px,8vw,100px)", flexWrap: "wrap" }}>
            {[
              { end: 751, suf: "M", l: "Monthly active users", s: "Q4 2025 earnings" },
              { end: 300, suf: "M+", l: "Wrapped engaged users (2025)", s: "Spotify Q4 filing" },
              { end: 630, suf: "M+", l: "Wrapped social shares (2025)", s: "Spotify Q4 filing" },
              { end: 100, suf: "B+", l: "DW tracks streamed (10 yrs)", s: "Spotify Newsroom, June 2025" },
            ].map((s, i) => (
              <Fade key={i} delay={i * 0.08}>
                <div style={{maxWidth:160}}>
                  <div style={{ fontFamily: SERIF, fontSize: "clamp(36px,5vw,64px)", fontWeight: 400, lineHeight: 1 }}><Num end={s.end} suffix={s.suf} /></div>
                  <div style={{ fontFamily: MONO, fontSize: 9, color: dim2, marginTop: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.l}</div>
                  <div style={{fontFamily:MONO,fontSize:7,color:dim2,marginTop:4,opacity:0.6}}>{s.s}</div>
                </div>
              </Fade>
            ))}
          </div>
        </Fade>
      </section>

      {/* TWO ENGINES */}
      <section style={{ padding: "clamp(80px,14vw,180px) 32px", maxWidth: 720, margin: "0 auto" }}>
        <Fade><div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em", color: grn, marginBottom: 20 }}>01 TWO ENGINES</div></Fade>
        <Fade delay={0.06}>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(36px,5vw,60px)", fontWeight: 400, lineHeight: 1.1, margin: "0 0 40px" }}>
            Every Monday, <em style={{ fontStyle: "italic", color: grn }}>pull</em>.<br />Every December, <em style={{ fontStyle: "italic", color: grn }}>push</em>.
          </h2>
        </Fade>
        <Fade delay={0.1}>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: dim, marginBottom: 48 }}>{"Spotify's retention story isn't one feature. It's two features operating on completely different timescales, solving different problems, and reinforcing each other in a flywheel that competitors haven't been able to replicate."}</p>
        </Fade>

        {[
          { name: "Discover Weekly", type: "Pull mechanic", freq: "Every Monday", what: "30 personalized songs you've never heard but will probably love. Born from a Hack Week experiment in 2014 when engineers merged two internal concepts. A bug that let semi-familiar songs through was kept because recognizable tracks built trust. Launched July 2015. Hit 40 million users and 5 billion streams in year one.", metric: "56M new artist discoveries per week. 77% feature emerging artists. 100B+ total tracks streamed.", src: "Spotify Newsroom (June 2025), Spotify Engineering Blog", why: "Solves the daily 'what should I listen to?' problem. Creates a Monday habit loop. Builds the perception that Spotify knows you better than you know yourself." },
          { name: "Wrapped", type: "Push mechanic", freq: "Every December", what: "Your year in music, packaged as shareable story-format slides. Top songs, artists, genres, minutes listened. Each year adds new hooks: 2024 added an AI podcast (via Google NotebookLM). 2025 introduced Listening Age, Clubs, and Wrapped Party (live multiplayer stat comparison).", metric: "300M+ engaged users. 630M+ social shares. 200M users in first 24 hours alone (19% YoY increase). Shares up 41% YoY.", src: "Spotify Q4 2025 earnings, TechCrunch, Variety", why: "Turns passive listeners into active promoters. Every share is an organic ad. Creates FOMO among non-users. App downloads jumped 21% in Wrapped week 2020. The single biggest annual acquisition event in consumer tech." },
        ].map((f, i) => (
          <Fade key={i} delay={0.12 + i * 0.06}>
            <div style={{ padding: "36px 0", borderBottom: `1px solid rgba(255,255,255,0.04)` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                <div style={{ fontFamily: SERIF, fontSize: 24, color: cream }}>{f.name}</div>
                <span style={{ fontFamily: MONO, fontSize: 9, color: grn, letterSpacing: "0.06em" }}>{f.freq}</span>
              </div>
              <div style={{ fontFamily: MONO, fontSize: 10, color: dim2, marginBottom: 12 }}>{f.type}</div>
              <p style={{ fontSize: 14, color: dim, lineHeight: 1.8, margin: "0 0 12px" }}>{f.what}</p>
              <p style={{ fontSize: 13, color: grn, lineHeight: 1.6, margin: "0 0 8px", fontFamily: MONO }}>{f.metric}</p>
              <Src>{f.src}</Src>
              <p style={{ fontSize: 14, color: "rgba(232,228,217,0.55)", lineHeight: 1.75, margin: "10px 0 0" }}><strong style={{ color: cream }}>Why it works: </strong>{f.why}</p>
            </div>
          </Fade>
        ))}
      </section>

      {/* UNDER THE HOOD */}
      <section style={{ padding: "clamp(80px,14vw,180px) 32px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle,${grn}05,transparent 70%)`, filter: "blur(100px)" }} />
        <div style={{ maxWidth: 700, margin: "0 auto", position: "relative" }}>
          <Fade><div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em", color: grn, marginBottom: 20 }}>02 UNDER THE HOOD</div></Fade>
          <Fade delay={0.06}>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(36px,5vw,60px)", fontWeight: 400, lineHeight: 1.1, margin: "0 0 48px" }}>
              Three layers. <em style={{ fontStyle: "italic", color: grn }}>One recommendation.</em>
            </h2>
          </Fade>
          <div style={{ textAlign: "left" }}>
            {[
              { name: "Collaborative Filtering", desc: "Users who listen to tracks A, B, C also listen to track D. If you match their pattern but haven't heard D, it gets recommended. Trained on a sample of roughly 700 million user-generated playlists. Uses matrix factorization and RNNs for sequential listening patterns. The system doesn't care about genre tags. It cares about behavior.", detail: "Spotify's Home screen uses BaRT (Bandits for Recommendations as Treatments), a contextual multi-armed bandit system that balances exploration (new music) vs. exploitation (safe picks) based on device, time of day, and listening context.", src: "McInerney et al., RecSys 2018; Spotify Engineering Blog" },
              { name: "Audio Analysis (CNNs)", desc: "Convolutional neural networks process Mel-spectrograms (599 frames x 128 frequency bins from 30-second excerpts) through 4 convolutional layers to predict 40 latent factors. This solves the cold-start problem: brand-new tracks with zero listening history can be recommended based on how they sound.", detail: "Foundational work by Sander Dieleman during a 2014 Spotify internship. Capabilities expanded through acquisitions of Niland (2017, deep learning audio) and Sonalytic (2017, audio recognition). Production systems use a 42-dimensional audio feature vector per track.", src: "Dieleman & van den Oord, NIPS 2013; Spotify Research 2021" },
              { name: "NLP and Cultural Context", desc: "Natural language processing scans song titles, artist bios, playlist descriptions, reviews, lyrics, blogs, and social media to create 'cultural vectors.' This captures context that pure listening data can't: 'lo-fi study vibes' or 'summer road trip energy.'", detail: "Significantly enhanced by the 2014 acquisition of The Echo Nest (~$100M). As of 2025, these have evolved into LLM-based embeddings that place lyrics, cover art, press coverage, and social chatter into a shared vector space.", src: "Music Tomorrow (Sept 2025); The Echo Nest acquisition filings" },
            ].map((a, i) => (
              <Fade key={i} delay={0.1 + i * 0.06}>
                <div style={{ padding: "32px 0", borderBottom: `1px solid rgba(255,255,255,0.04)` }}>
                  <div style={{ fontFamily: SERIF, fontSize: 22, color: cream, marginBottom: 10 }}>{a.name}</div>
                  <p style={{ fontSize: 15, color: dim, lineHeight: 1.85, margin: "0 0 10px" }}>{a.desc}</p>
                  <p style={{ fontSize: 13, color: "rgba(232,228,217,0.3)", lineHeight: 1.7, margin: "0 0 6px" }}>{a.detail}</p>
                  <Src>{a.src}</Src>
                </div>
              </Fade>
            ))}
          </div>

          <Fade delay={0.3}>
            <div style={{marginTop:32,padding:"20px 24px",background:"rgba(255,255,255,0.02)",borderRadius:16,border:`1px solid rgba(255,255,255,0.04)`,textAlign:"left"}}>
              <div style={{fontFamily:MONO,fontSize:10,color:grn,letterSpacing:"0.1em",marginBottom:10}}>PM INSIGHT: FEATURE-SPECIFIC REWARD FUNCTIONS</div>
              <p style={{fontSize:14,color:dim,lineHeight:1.75,margin:0}}>{"Each recommendation surface runs a separate algorithm with its own success metric. Autoplay optimizes for listen-through rates and saves. Release Radar optimizes for weekly return rate, since users skim rather than listen sequentially. Discover Weekly uses a separate ML model trained on user satisfaction surveys, then feeds that prediction as the reward signal for the playlist composition algorithm. Same data foundation, completely different optimization targets."}</p>
              <div style={{marginTop:8}}><Src>Music Tomorrow, Spotify Engineering Blog (Dec 2021)</Src></div>
            </div>
          </Fade>
        </div>
      </section>

      {/* THE VIRAL MACHINE */}
      <section style={{ padding: "clamp(80px,14vw,180px) 32px", maxWidth: 720, margin: "0 auto" }}>
        <Fade><div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em", color: grn, marginBottom: 20 }}>03 THE VIRAL MACHINE</div></Fade>
        <Fade delay={0.06}>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(36px,5vw,60px)", fontWeight: 400, lineHeight: 1.1, margin: "0 0 20px" }}>
            Wrapped is not a <em style={{ fontStyle: "italic", color: grn }}>feature</em>.
          </h2>
        </Fade>
        <Fade delay={0.1}>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 400, lineHeight: 1.1, color: dim, margin: "0 0 48px" }}>
            {"It's a marketing campaign that ships as a product."}
          </h2>
        </Fade>

        {[
          { insight: "Identity as content", detail: "Wrapped doesn't show you data. It tells you who you are. 'Your Listening Age is 23.' 'You're in the Collector club.' These are identity statements, and people share identity statements. Meltwater found 81% of users whose Listening Age was higher than their real age posted it positively. The Listening Age feature alone drove 65 million shares.", src: "Meltwater analysis (Dec 2025), Variety" },
          { insight: "Manufactured scarcity", detail: "Wrapped drops once a year. You can't access last year's data. The window is narrow. This creates urgency and anticipation: users start tweeting 'where's Wrapped?' in November. The result: 200 million users in the first 24 hours. That same milestone took Wrapped 2024 over 62 hours.", src: "TechCrunch, Music Business Worldwide" },
          { insight: "The 2024 failure proves the model", detail: "Wrapped 2024 leaned hard on AI: a NotebookLM-powered podcast that garbled stats and felt robotic. Users noted missing favorites like Top Genres and Sound Towns. CPO Gustav Soderstrm acknowledged: 'The numbers were our biggest ever. But there was more negative feedback than we've seen before.' Spotify responded by cutting AI gimmicks and doubling down on shareable data. Wrapped 2025 shares jumped 41%.", src: "TechCrunch, Music Ally (Soderstrm quote, May 2025)" },
          { insight: "Social mechanics that compound", detail: "2025 introduced Wrapped Party: real-time multiplayer comparison with friends. In-app messaging grew 100% during Wrapped week. Instagram shares nearly doubled YoY. The design is social-first by architecture: 9:16 vertical format, one-tap share buttons, pre-formatted assets with subtle Spotify branding baked in.", src: "Variety, Music Week" },
          { insight: "Ecosystem lock-in through data", detail: "The more you listen, the better your Wrapped. Users subconsciously invest throughout the year. Switching to Apple Music means losing years of personalized intelligence. Morningstar calls the 4+ billion user-generated playlists an 'effort-based switching cost.' 12.5% of Apple Music users have reported feeling left out during Wrapped season.", src: "FourWeekMBA, Morningstar, 9to5Mac" },
        ].map((x, i) => (
          <Fade key={i} delay={0.1 + i * 0.05}>
            <div style={{ padding: "28px 0", borderBottom: `1px solid rgba(255,255,255,0.04)` }}>
              <div style={{ fontFamily: SERIF, fontSize: 20, color: cream, marginBottom: 8 }}>{x.insight}</div>
              <p style={{ fontSize: 14, color: dim, lineHeight: 1.8, margin: "0 0 6px" }}>{x.detail}</p>
              <Src>{x.src}</Src>
            </div>
          </Fade>
        ))}
      </section>

      {/* THE FLYWHEEL */}
      <section style={{ padding: "clamp(80px,14vw,180px) 32px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle,${grn}06,transparent 70%)`, filter: "blur(80px)" }} />
        <div style={{ maxWidth: 640, margin: "0 auto", position: "relative" }}>
          <Fade><div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em", color: grn, marginBottom: 20 }}>04 THE FLYWHEEL</div></Fade>
          <Fade delay={0.06}>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(36px,5vw,60px)", fontWeight: 400, lineHeight: 1.1, margin: "0 0 48px" }}>
              How the two engines <em style={{ fontStyle: "italic", color: grn }}>feed each other</em>.
            </h2>
          </Fade>
          <Fade delay={0.12}>
            <div style={{ textAlign: "left" }}>
              {[
                "Discover Weekly surfaces new music every Monday. User saves tracks, follows new artists.",
                "More listening data improves the algorithm. Next week's recommendations are better.",
                "Better recommendations increase session time. The system processes ~1 trillion events daily.",
                "A full year of accumulated listening data produces a compelling Wrapped in December.",
                "User shares Wrapped across social media. 630M+ shares become organic acquisition.",
                "Non-users see Wrapped, experience FOMO, sign up. Spotify added 38M users in Q4 2025 alone.",
                "New users start listening. Their data feeds the recommendation engine. The flywheel accelerates.",
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 16, padding: "16px 0", borderBottom: i < 6 ? `1px solid rgba(255,255,255,0.04)` : "none" }}>
                  <span style={{ fontFamily: SERIF, fontSize: 24, color: grn, flexShrink: 0, width: 28 }}>{i+1}</span>
                  <span style={{ fontSize: 15, color: dim, lineHeight: 1.7 }}>{s}</span>
                </div>
              ))}
            </div>
          </Fade>
          <Fade delay={0.2}>
            <div style={{ marginTop: 40, borderLeft: `2px solid ${grn}`, paddingLeft: 20, textAlign: "left" }}>
              <p style={{ fontFamily: SERIF, fontSize: 18, fontStyle: "italic", color: "rgba(232,228,217,0.5)", lineHeight: 1.6, margin: 0 }}>
                {"Discover Weekly solves daily retention. Wrapped solves annual acquisition. Together, they create a flywheel where usage feeds virality and virality feeds usage. No competitor has replicated both sides."}
              </p>
            </div>
          </Fade>
        </div>
      </section>

      {/* WHAT'S BROKEN */}
      <section style={{ padding: "clamp(80px,14vw,180px) 32px", maxWidth: 720, margin: "0 auto" }}>
        <Fade><div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em", color: grn, marginBottom: 20 }}>{"05 WHAT'S BROKEN"}</div></Fade>
        <Fade delay={0.06}>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(36px,5vw,60px)", fontWeight: 400, lineHeight: 1.1, margin: "0 0 48px" }}>
            The algorithm got <em style={{ fontStyle: "italic", color: grn }}>conservative</em>.
          </h2>
        </Fade>
        <Fade delay={0.1}>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: dim, marginBottom: 40 }}>{"In 2024-2025, Spotify quietly shifted its algorithm to prioritize familiarity over discovery. Better short-term retention metrics. But a weaker long-term value proposition, and real consequences for the artists who make the platform worth using."}</p>
        </Fade>

        {[
          { signal: "Discover Weekly feels repetitive", detail: "The Guardian called Spotify's algorithmic experience a 'tentative, calculated, dull meander' of safe picks. MIT Technology Review noted at least 30% of all Spotify streams are now algorithm-driven, with playlists 'too often resembling one another, filled with songs that offer different variants of the same sound.' Spotify Community forums are filled with long complaint threads: 'I remember DW being brilliant around 2018, then a constant decline.'", src: "The Guardian, MIT Technology Review (Aug 2024), Spotify Community" },
          { signal: "Familiarity over discovery", detail: "Spotify's own researchers published a paper acknowledging the tension: 'While familiarity helps drive short-term engagement, jointly optimizing for discovery enables the platform to influence and shape consumption across suppliers.' They know. The shift wasn't accidental. It was a business decision to maximize session time at the cost of musical diversity.", src: "Spotify Research, CIKM 2021 conference paper" },
          { signal: "Independent artists are squeezed", detail: "A 1,000-stream minimum royalty threshold (January 2024) affects roughly 60% of tracks on the platform. One analysis estimates this withheld ~$47 million in royalties from small artists in 2024, redistributed to artists exceeding the threshold. Discovery Mode asks artists to accept ~30% lower per-stream royalties in exchange for algorithmic boosts. That's pay-to-play.", src: "Chris Robley analysis, Musosoup" },
          { signal: "The spam arms race", detail: "Spotify removed over 75 million spammy tracks in the 12 months ending September 2025 and implemented a $10 per-track fine for artificial streaming. The shift to retention metrics was partly defensive: saves and replays are harder to fake than raw plays. Smart short-term. But legitimate new artists get caught in the crossfire.", src: "Music Business Worldwide, Spotify official blog, Variety" },
        ].map((x, i) => (
          <Fade key={i} delay={0.1 + i * 0.05}>
            <div style={{ padding: "28px 0", borderBottom: `1px solid rgba(255,255,255,0.04)` }}>
              <div style={{ fontFamily: SERIF, fontSize: 20, color: cream, marginBottom: 8 }}>{x.signal}</div>
              <p style={{ fontSize: 14, color: dim, lineHeight: 1.8, margin: "0 0 6px" }}>{x.detail}</p>
              <Src>{x.src}</Src>
            </div>
          </Fade>
        ))}
      </section>

      {/* KEY METRICS */}
      <section style={{ padding: "80px 32px 120px", maxWidth: 720, margin: "0 auto" }}>
        <Fade><div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em", color: grn, marginBottom: 20 }}>06 KEY METRICS</div></Fade>
        <Fade delay={0.06}>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(32px,4.5vw,52px)", fontWeight: 400, lineHeight: 1.1, margin: "0 0 48px" }}>
            The numbers that <em style={{ fontStyle: "italic", color: grn }}>matter</em>.
          </h2>
        </Fade>
        {[
          { m: "Premium churn rate", v: "~2%/mo", n: "Estimated, ~33% lower than Netflix", s: "Antenna/Bloomberg" },
          { m: "Q4 2025 gross margin", v: "33.1%", n: "All-time high", s: "Spotify Q4 filing" },
          { m: "Full-year operating profit", v: "\u20AC2.2B", n: "First sustained profitability", s: "Spotify Q4 filing" },
          { m: "Free cash flow (FY2025)", v: "\u20AC2.9B", n: "Record", s: "Spotify Q4 filing" },
          { m: "Wrapped 2025 reach (24hr)", v: "200M", n: "19% YoY increase", s: "TechCrunch, MBW" },
          { m: "Wrapped social shares", v: "630M+", n: "41% YoY increase", s: "Spotify Q4 filing" },
          { m: "DW artist discoveries/week", v: "56M", n: "77% emerging artists", s: "Spotify Newsroom" },
          { m: "Q4 2025 stock reaction", v: "+15%", n: "Best day since 2019", s: "CNBC" },
        ].map((r, i) => (
          <Fade key={i} delay={0.04 * i}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "14px 0", borderBottom: `1px solid rgba(255,255,255,0.04)`, gap: 12 }}>
              <span style={{ fontSize: 14, color: cream, flex: 1 }}>{r.m}</span>
              <span style={{ fontFamily: MONO, fontSize: 15, fontWeight: 600, color: grn, flexShrink: 0 }}>{r.v}</span>
              <span style={{ fontFamily: MONO, fontSize: 9, color: dim2, minWidth: 120, textAlign: "right", flexShrink: 0 }}>{r.n}</span>
            </div>
          </Fade>
        ))}
        <Fade delay={0.35}>
          <div style={{marginTop:16}}><Src>All financial metrics from Spotify Q4 2025 Shareholder Deck (Feb 10, 2026). Engagement metrics verified through TechCrunch, Variety, and Music Business Worldwide.</Src></div>
        </Fade>
      </section>

      {/* IF I WERE PM */}
      <section style={{ padding: "clamp(80px,14vw,180px) 32px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle,${grn}05,transparent 70%)`, filter: "blur(80px)" }} />
        <div style={{ maxWidth: 640, margin: "0 auto", position: "relative" }}>
          <Fade><div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em", color: grn, marginBottom: 20 }}>07 IF I WERE PM</div></Fade>
          <Fade delay={0.06}>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(36px,5vw,60px)", fontWeight: 400, lineHeight: 1.1, margin: "0 0 48px" }}>
              {"Three bets I'd"} <em style={{ fontStyle: "italic", color: grn }}>make</em>.
            </h2>
          </Fade>
          <div style={{ textAlign: "left" }}>
            {[
              { bet: "Give users a Discovery Dial", detail: "The algorithm's conservative shift was a top-down decision. Give it back to users. Add a slider to Discover Weekly: 'Comfort Zone' to 'Surprise Me.' Spotify's own 2021 research paper on 'algorithmic balancing of familiarity, similarity, and discovery' proves they have the infrastructure. Let users choose their own exploration level instead of optimizing everyone for session time.", measure: "DW save rate by dial position, 30-day retention by cohort, NPS delta" },
              { bet: "Make Wrapped continuous", detail: "Wrapped's magic is personalized data storytelling. Why spike once a year? Ship 'Monthly Moments': lightweight, snackable mid-year recaps. Smaller, still shareable. The 41% YoY share increase proves the format works. Running it monthly keeps the viral engine warm year-round instead of cold-starting every December.", measure: "Monthly share rate, DAU lift post-Moment, premium conversion from shared links" },
              { bet: "Social listening sessions", detail: "Spotify's social features are underdeveloped relative to its social data. Users want to listen together. Ship 'Listening Rooms': join a friend's live session, see what they're hearing, react in real-time. Strava proved social feeds drive 35+ app opens/month (Sensor Tower). In-app messaging already grew 100% during Wrapped Party. The demand is there.", measure: "Sessions with 2+ listeners, weekly active social users, churn delta for social vs. solo" },
            ].map((x, i) => (
              <Fade key={i} delay={0.1 + i * 0.06}>
                <div style={{ padding: "28px 0", borderBottom: i < 2 ? `1px solid rgba(255,255,255,0.04)` : "none" }}>
                  <div style={{ fontFamily: SERIF, fontSize: 20, color: cream, marginBottom: 10 }}>{x.bet}</div>
                  <p style={{ fontSize: 14, color: dim, lineHeight: 1.8, margin: "0 0 10px" }}>{x.detail}</p>
                  <div style={{fontFamily:MONO,fontSize:10,color:grn,letterSpacing:"0.04em"}}>Measure: {x.measure}</div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section style={{ padding: "clamp(100px,16vw,200px) 32px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle,${grn}04,transparent 70%)`, filter: "blur(100px)" }} />
        <Fade>
          <div style={{ maxWidth: 600, margin: "0 auto", position: "relative" }}>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(36px,6vw,72px)", fontWeight: 400, lineHeight: 1.08, margin: "0 0 20px" }}>
              The algorithm is the product.
            </h2>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(36px,6vw,72px)", fontWeight: 400, lineHeight: 1.08, fontStyle: "italic", color: grn, margin: "0 0 40px" }}>
              The data is the moat.
            </h2>
            <p style={{ fontSize: 14, color: dim, lineHeight: 1.7, marginBottom: 48, maxWidth: 440, margin: "0 auto 48px" }}>
              A growth teardown analyzing {"Spotify's"} two most powerful retention and acquisition features. The AI architecture, the virality mechanics, the 2024-2025 algorithm shift, and three bets for what comes next. All data sourced and verified.
            </p>
            <div style={{ fontFamily: MONO, fontSize: 10, color: dim2, letterSpacing: "0.08em" }}>
              Chetan Jonnalagadda . March 2026
            </div>
          </div>
        </Fade>
      </section>
    </div>
  );
}
