'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionMarker } from '@/components/ui/SectionMarker';

const tokens = [
  { name: 'aLavender', hex: '#B8A9D4', usage: 'Primary accent. Highlights and calls to attention.' },
  { name: 'aRose', hex: '#C9929B', usage: 'Dread tiers 1–4. Rose-coded emotional escalation.' },
  { name: 'aMint', hex: '#7DBFAB', usage: 'Momentum, calm, in-session signals.' },
  { name: 'aSand', hex: '#C9B97A', usage: 'Insights and softer informational copy.' },
  { name: 'aSlate', hex: '#8BA4B8', usage: 'Neutral metadata and secondary chrome.' },
];

const voiceRules = {
  always: [
    'The antagonist is the subject. The user is never under inspection.',
    'Best-friend text test: would your best friend actually text this?',
    'Name the obstacle directly. The dread. The resistance. Your brain.',
    'Witness, do not cheer. We saw you show up.',
    'Outcome, not content. Share that you moved, not what you avoided.',
    'Short sentences. Stronger verbs.',
    'Lowercase by default. Capitals are pressure.',
  ],
  never: [
    'No leaderboards. Ranking is a compile-time impossibility, not a copy choice.',
    'No streak panic. Misses are absorbed, not punished.',
    'No surveillance metaphors. The eye became a chart for a reason.',
    'No em-dashes. They were killed in the V2 audit.',
    'No exclamation points unless quoting a user.',
    'No “you got this.” It is not a coach. It is a witness.',
    'No countdown timers. Deadlines increase dread for avoidance-prone users.',
    'No notifications pulling users out of focus they chose to enter.',
    'No public comparisons. Crews are small. Trust over performance.',
    'No surface that earns a tap without earning the user’s permission.',
    'No “gentle reminder.” Either say what you mean or stay quiet.',
    'No fake personalization. Templated copy beats fake intimacy.',
    'No copy that survives the best-friend-text test only on a good day.',
  ],
};

const canonicalLines = [
  'We’re ON.',
  'Alright alright.',
  'Yeah we’re cooking.',
  'Procrastination took an L.',
  'Brain says no. Hands can still move.',
];

export function CraftContent() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <>
      {/* Hero */}
      <section ref={ref} className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <SectionMarker label="Craft" className="mb-8" />

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-[1.05]">
              How the work
              <span className="font-serif italic font-normal lowercase"> gets made.</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl">
              Most PM portfolios show what shipped. This page shows how. Design tokens, vector logo
              construction, motion language, voice ruleset. The verb chain from research through
              brand, motion, and launch, made legible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Design Tokens */}
      <section className="py-16 border-t border-border-default">
        <div className="container-wide">
          <SectionMarker label="Design Tokens" number="01/05" className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                Five hex-locked names.
                <br />
                <span className="font-serif italic font-normal lowercase">No hardcoded colors anywhere.</span>
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                The Aatram design system runs on five named tokens on a true-black surface, with
                body copy at #F0EDE8 to pass WCAG AA 4.5:1. A no-hardcode rule is enforced in code
                review: every color must resolve through the token layer.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Naming is load-bearing. <span className="font-mono text-sm">aRose</span> tells you it
                is the rose-coded dread ramp. <span className="font-mono text-sm">aMint</span> tells
                you it is the momentum signal. Tokens describe the role, not the value.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {tokens.map((token, i) => (
                <motion.div
                  key={token.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-center gap-5 p-4 border border-border-default rounded-lg hover:border-text-muted transition-colors"
                >
                  <div
                    className="w-14 h-14 rounded-md shrink-0 border border-border-default"
                    style={{ background: token.hex }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="font-mono text-sm font-semibold">{token.name}</span>
                      <span className="font-mono text-xs text-text-muted">{token.hex}</span>
                    </div>
                    <p className="text-sm text-text-secondary leading-snug">{token.usage}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Logo as Code */}
      <section className="py-16 border-t border-border-default">
        <div className="container-wide">
          <SectionMarker label="Logo as Code" number="02/05" className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                Eighty stroke segments.
                <br />
                <span className="font-serif italic font-normal lowercase">Zero raster assets.</span>
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                AatramLogo is drawn as a SwiftUI Canvas in 80 overlapping stroke segments faking a
                continuous opacity gradient from 0.85 to 0.08 over a 25° to 145° arc, with four
                dissolving particles on golden-ratio-decay radii (3.00 / 2.16 / 1.56 / 1.12).
              </p>
              <p className="text-text-secondary leading-relaxed">
                Because the logo is code, it renders crisp at any size: 24pt widget glyph, Live
                Activity, onboarding hero, App Store icon. No exported PNGs. No rasterization. The
                same recipe, every size.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="aspect-square max-w-md mx-auto bg-bg-secondary border border-border-default rounded-lg p-8 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <radialGradient id="logoGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(184,169,212,0.18)" />
                      <stop offset="100%" stopColor="rgba(184,169,212,0)" />
                    </radialGradient>
                  </defs>
                  <circle cx="100" cy="100" r="90" fill="url(#logoGlow)" />
                  {Array.from({ length: 80 }).map((_, i) => {
                    const startAngle = 25 + (i * 120) / 80;
                    const opacity = 0.85 - (i / 80) * (0.85 - 0.08);
                    const x1 = 100 + 65 * Math.cos((startAngle * Math.PI) / 180);
                    const y1 = 100 + 65 * Math.sin((startAngle * Math.PI) / 180);
                    const x2 = 100 + 80 * Math.cos((startAngle * Math.PI) / 180);
                    const y2 = 100 + 80 * Math.sin((startAngle * Math.PI) / 180);
                    return (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#B8A9D4"
                        strokeWidth="2"
                        strokeOpacity={opacity}
                        strokeLinecap="round"
                      />
                    );
                  })}
                  {[3.0, 2.16, 1.56, 1.12].map((mult, i) => {
                    const r = 30 * mult;
                    return (
                      <circle
                        key={i}
                        cx={100 + r * Math.cos(((85 - i * 10) * Math.PI) / 180)}
                        cy={100 + r * Math.sin(((85 - i * 10) * Math.PI) / 180)}
                        r={2.5 - i * 0.4}
                        fill="#B8A9D4"
                        opacity={0.7 - i * 0.12}
                      />
                    );
                  })}
                </svg>
              </div>
              <p className="text-xs text-text-muted text-center mt-4 font-mono">
                Approximation rendered in SVG. Production uses SwiftUI Canvas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Motion Language */}
      <section className="py-16 border-t border-border-default">
        <div className="container-wide">
          <SectionMarker label="Motion Language" number="03/05" className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                Motion has rules.
                <br />
                <span className="font-serif italic font-normal lowercase">Springs are reserved.</span>
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                ~85% of motion is <span className="font-mono text-sm">.easeInOut 0.18–0.4s</span>.
                Springs are reserved for the SwipeableTaskCard, where the physical feel matters
                (response 0.3, dampingFraction 0.8).
              </p>
              <p className="text-text-secondary leading-relaxed">
                The signature interaction is the breathing pulse on DreadedTaskCard: it scales with
                dread tier so the higher the dread, the more anxious the card breathes. Motion is
                doing semantic work, not decoration.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {[
                { tier: 'Tier 1', label: 'Light', period: '3.0s', hex: '#C9929B', opacity: 0.4 },
                { tier: 'Tier 2', label: 'Steady', period: '2.0s', hex: '#C9929B', opacity: 0.55 },
                { tier: 'Tier 3', label: 'Heavy', period: '1.5s', hex: '#C9929B', opacity: 0.7 },
                { tier: 'Tier 4', label: 'Crushing', period: '1.1s', hex: '#C9929B', opacity: 0.85 },
                { tier: 'Tier 5', label: 'Massive', period: '0.8s', hex: '#C9B97A', opacity: 1 },
              ].map((row, i) => (
                <motion.div
                  key={row.tier}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-center gap-4 p-3 border border-border-default rounded-lg"
                >
                  <motion.div
                    className="w-10 h-10 rounded-full shrink-0"
                    style={{ background: row.hex, opacity: row.opacity }}
                    animate={{ scale: [1, 1.18, 1] }}
                    transition={{
                      duration: parseFloat(row.period),
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <div className="flex-1 flex items-baseline justify-between gap-3">
                    <span className="font-mono text-xs text-text-muted">{row.tier}</span>
                    <span className="font-display font-semibold">{row.label}</span>
                    <span className="font-mono text-xs text-text-muted">{row.period}</span>
                  </div>
                </motion.div>
              ))}
              <p className="text-xs text-text-muted text-right mt-2 font-mono">
                Tier 5 breaks rose for gold. The escalation has an out.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MomentumArc */}
      <section className="py-16 border-t border-border-default">
        <div className="container-wide">
          <SectionMarker label="MomentumArc" number="04/05" className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                A 240° gauge.
                <br />
                <span className="font-serif italic font-normal lowercase">Not 270° on purpose.</span>
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                MomentumArc is an instrument gauge sweeping 150° to 390° with 41 tick marks (major
                every 10, mid every 5, minor between), color-by-zone fill at 5pt round caps, and
                zone labels at 12.5 / 31 / 69 / 87.5% midpoints.
              </p>
              <p className="text-text-secondary leading-relaxed">
                240° instead of 270° leaves the bottom of the arc open so the stats row underneath
                has room to breathe. A gauge that closes feels like a verdict. A gauge that stays
                open feels like a story still being written.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="aspect-square max-w-md mx-auto bg-bg-secondary border border-border-default rounded-lg p-8 flex flex-col items-center justify-center">
                <svg viewBox="0 0 240 200" className="w-full h-auto">
                  {(() => {
                    const cx = 120;
                    const cy = 130;
                    const r = 85;
                    const startA = 150;
                    const endA = 390;
                    const ticks = [];
                    for (let i = 0; i <= 40; i++) {
                      const a = startA + ((endA - startA) * i) / 40;
                      const major = i % 10 === 0;
                      const mid = i % 5 === 0;
                      const len = major ? 12 : mid ? 8 : 5;
                      const x1 = cx + (r - len) * Math.cos((a * Math.PI) / 180);
                      const y1 = cy + (r - len) * Math.sin((a * Math.PI) / 180);
                      const x2 = cx + r * Math.cos((a * Math.PI) / 180);
                      const y2 = cy + r * Math.sin((a * Math.PI) / 180);
                      ticks.push(
                        <line
                          key={i}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="#8BA4B8"
                          strokeWidth={major ? 1.5 : 1}
                          strokeOpacity={major ? 0.7 : mid ? 0.5 : 0.3}
                          strokeLinecap="round"
                        />
                      );
                    }
                    const fillEnd = startA + (endA - startA) * 0.68;
                    const arcPath = (() => {
                      const x1 = cx + r * Math.cos((startA * Math.PI) / 180);
                      const y1 = cy + r * Math.sin((startA * Math.PI) / 180);
                      const x2 = cx + r * Math.cos((fillEnd * Math.PI) / 180);
                      const y2 = cy + r * Math.sin((fillEnd * Math.PI) / 180);
                      const largeArc = fillEnd - startA > 180 ? 1 : 0;
                      return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
                    })();
                    return (
                      <>
                        {ticks}
                        <path
                          d={arcPath}
                          fill="none"
                          stroke="#7DBFAB"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />
                        <text
                          x={cx}
                          y={cy + 5}
                          textAnchor="middle"
                          fill="currentColor"
                          className="font-serif"
                          style={{ fontSize: 48, letterSpacing: '-0.02em' }}
                        >
                          68
                        </text>
                        <text
                          x={cx}
                          y={cy + 30}
                          textAnchor="middle"
                          fill="currentColor"
                          opacity="0.5"
                          style={{ fontSize: 9, letterSpacing: '0.2em' }}
                        >
                          MOMENTUM
                        </text>
                      </>
                    );
                  })()}
                </svg>
                <div className="flex justify-between w-full text-[10px] font-mono text-text-muted mt-2 uppercase tracking-wider">
                  <span>Starting</span>
                  <span>Building</span>
                  <span>Rolling</span>
                  <span>Locked In</span>
                </div>
              </div>
              <p className="text-xs text-text-muted text-center mt-4 font-mono">
                Eight-rank UserTitle ladder: Sleeper → Awake → Standing → In the Arena → Scarred →
                Forged → Unbreakable → Settled.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Voice Ruleset */}
      <section className="py-16 border-t border-border-default">
        <div className="container-wide">
          <SectionMarker label="Voice Ruleset" number="05/05" className="mb-8" />

          <div className="mb-12 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Anti-cheerleader.
              <br />
              <span className="font-serif italic font-normal lowercase">Witness, not coach.</span>
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Codified as a 7-Always / 13-Never ruleset, enforced through code review and AI prompt
              templates. The rules exist because cheerleader copy is the failure mode the entire
              habit-tracker category falls into. Witness copy treats the user as someone who already
              decided to show up.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="small-caps text-text-muted mb-4">Always · 07</h3>
              <ul className="space-y-3">
                {voiceRules.always.map((rule, i) => (
                  <motion.li
                    key={rule}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    className="text-sm text-text-secondary flex items-start gap-3"
                  >
                    <span className="font-mono text-[10px] text-text-muted mt-1 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <span>{rule}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="small-caps text-text-muted mb-4">Never · 13</h3>
              <ul className="space-y-3">
                {voiceRules.never.map((rule, i) => (
                  <motion.li
                    key={rule}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.03 }}
                    className="text-sm text-text-secondary flex items-start gap-3"
                  >
                    <span className="font-mono text-[10px] text-text-muted mt-1 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <span>{rule}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="small-caps text-text-muted mb-6">Canonical Lines</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {canonicalLines.map((line, i) => (
                <motion.div
                  key={line}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="p-4 border border-border-default rounded-lg text-center"
                >
                  <p className="font-serif italic text-lg leading-snug">&ldquo;{line}&rdquo;</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-border-default">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Want this on
              <span className="font-serif italic font-normal lowercase"> your team?</span>
            </h2>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              I&apos;m a PM who designs end-to-end. Looking for full-time roles starting May 2026
              where design ownership and product judgment live in the same person.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-text-primary text-bg-primary text-xs uppercase tracking-widest font-medium rounded-full hover:opacity-80 transition-all"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
