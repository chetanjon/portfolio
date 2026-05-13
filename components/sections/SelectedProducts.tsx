'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionMarker } from '@/components/ui/SectionMarker';
import { CountUp } from '@/components/ui/CountUp';
import { TiltCard } from '@/components/ui/TiltCard';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

type Metric = { value: number; prefix?: string; suffix?: string; decimals?: number; label: string };

interface Product {
  name: string;
  initials: string;
  tagline: string;
  blurb: string;
  frame: 'phone' | 'browser';
  // Drop real screenshots into /public/products/ then list them here.
  screenshots?: string[];
  liveUrl: string;
  liveLabel: string;
  caseStudyUrl?: string;
  stack: string[];
  metrics: Metric[];
}

const products: Product[] = [
  {
    name: 'Aatram',
    initials: 'AT',
    tagline: 'Consumer iOS app · Live on the App Store · Free & bootstrapped',
    blurb:
      'Co-founded with two friends. Shipped V1 in seven days, then rewrote V2 as an anti-interruption product after archetype interviews showed our own notifications were pulling avoidance-prone users out of focus. I co-built the codebase across 158 commits and owned UI, brand voice, an 18-component design system, and the logo drawn as 80 SwiftUI Canvas stroke segments. The momentum gauge, the live-presence crew rooms, the on-device pattern detectors — all of it shipped.',
    frame: 'phone',
    screenshots: ['/products/aatram-crew.jpg', '/products/aatram-home.jpg', '/products/aatram-insights.jpg'],
    liveUrl: 'https://apps.apple.com/us/app/aatram/id6760587556',
    liveLabel: 'View on the App Store',
    caseStudyUrl: '/work/aatram',
    stack: ['SwiftUI', 'SwiftData', 'Supabase', 'Apple Foundation Models'],
    metrics: [
      { value: 7, suffix: ' days', label: 'First commit → App Store' },
      { value: 158, label: 'Commits, 3-person team' },
      { value: 16, label: 'Archetype interviews' },
    ],
  },
  {
    name: 'FrictionLens',
    initials: 'FL',
    tagline: 'AI review intelligence tool · Live at frictionlens.net',
    blurb:
      'A full-stack AI review analyzer (Next.js, TypeScript, Supabase, Google Gemini) that ingests App Store, Play Store, Reddit, and CSV reviews into a single Vibe Report. Built a 3-tier rule-based classifier that routes short reviews through keyword rules and only batches long ones to Gemini, plus BYOK with AES-256-GCM per-user key encryption.',
    frame: 'browser',
    screenshots: undefined,
    liveUrl: 'https://www.frictionlens.net/',
    liveLabel: 'Open frictionlens.net',
    caseStudyUrl: undefined,
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Google Gemini', 'Upstash Redis'],
    metrics: [
      { value: 3, label: 'Classifier tiers, AI only when needed' },
      { value: 4, label: 'Review sources unified' },
      { value: 256, suffix: '-bit', label: 'AES-GCM per-user key encryption' },
    ],
  },
];

function PhoneShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-[2rem] border-[5px] border-text-primary/85 bg-bg-secondary p-1.5 shadow-xl ${className ?? ''}`}>
      <div className="absolute left-1/2 top-1.5 z-10 h-4 w-20 -translate-x-1/2 rounded-b-xl bg-text-primary/85" />
      <div className="overflow-hidden rounded-[1.5rem]">{children}</div>
    </div>
  );
}

function PhoneCluster({ shots, name }: { shots: string[]; name: string }) {
  if (shots.length === 1) {
    return (
      <PhoneShell className="mx-auto w-full max-w-[260px]">
        <Image src={shots[0]} alt={`${name} screenshot`} width={1290} height={2560} className="w-full h-auto" />
      </PhoneShell>
    );
  }
  // 2–3 shots: staggered trio, middle one forward
  const [left, center, right] = shots.length >= 3 ? shots : [shots[0], shots[0], shots[1]];
  return (
    <div className="relative flex items-center justify-center h-[420px] md:h-[480px]">
      <PhoneShell className="absolute left-[8%] top-1/2 w-[40%] max-w-[180px] -translate-y-1/2 -rotate-6 opacity-90">
        <Image src={left} alt={`${name} screenshot`} width={1290} height={2560} className="w-full h-auto" />
      </PhoneShell>
      <PhoneShell className="absolute right-[8%] top-1/2 w-[40%] max-w-[180px] -translate-y-1/2 rotate-6 opacity-90">
        <Image src={right} alt={`${name} screenshot`} width={1290} height={2560} className="w-full h-auto" />
      </PhoneShell>
      <PhoneShell className="relative z-10 w-[46%] max-w-[210px]">
        <Image src={center} alt={`${name} screenshot`} width={1290} height={2560} className="w-full h-auto" priority />
      </PhoneShell>
    </div>
  );
}

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full overflow-hidden rounded-xl border border-border-hover bg-bg-secondary shadow-xl">
      <div className="flex items-center gap-1.5 border-b border-border-default px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-accent-soft/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent-soft/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent-soft/25" />
        <span className="ml-3 text-[10px] font-mono text-text-muted">frictionlens.net</span>
      </div>
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

export function SelectedProducts() {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <SectionMarker number="01" label="Shipped" />
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mt-4 leading-[1.05]">
            Things I&apos;ve <span className="italic">designed, built, and shipped.</span>
          </h2>
        </motion.div>

        <div className="space-y-20 md:space-y-28">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
            >
              {/* Visual */}
              <div className="lg:col-span-6 p-2 md:p-4">
                {p.frame === 'phone' ? (
                  p.screenshots && p.screenshots.length ? (
                    <PhoneCluster shots={p.screenshots} name={p.name} />
                  ) : (
                    <TiltCard tiltAmount={8} scale={1.015} glareEnabled={false}>
                      <PhoneShell className="mx-auto w-full max-w-[260px]">
                        <ImagePlaceholder initials={p.initials} aspectRatio="portrait" grayscale={false} />
                      </PhoneShell>
                    </TiltCard>
                  )
                ) : (
                  <TiltCard tiltAmount={7} scale={1.012} glareEnabled>
                    <BrowserFrame>
                      {p.screenshots && p.screenshots.length ? (
                        <Image src={p.screenshots[0]} alt={`${p.name} screenshot`} width={1280} height={800} className="w-full h-auto" />
                      ) : (
                        <ImagePlaceholder initials={p.initials} aspectRatio="video" grayscale={false} />
                      )}
                    </BrowserFrame>
                  </TiltCard>
                )}
              </div>

              {/* Copy */}
              <div className="lg:col-span-6">
                <p className="text-[10px] uppercase tracking-widest text-text-muted mb-3">{p.tagline}</p>
                <h3 className="font-serif text-2xl md:text-3xl mb-4">{p.name}</h3>
                <p className="text-text-secondary leading-relaxed mb-6">{p.blurb}</p>

                {/* Metric chips */}
                <div className="grid grid-cols-3 gap-3 mb-6 tick-rule pt-4">
                  {p.metrics.map((m) => (
                    <div key={m.label}>
                      <span className="font-serif text-2xl md:text-3xl text-accent-primary tabular-nums">
                        <CountUp to={m.value} decimals={m.decimals ?? 0} prefix={m.prefix ?? ''} suffix={m.suffix ?? ''} />
                      </span>
                      <p className="text-[9px] uppercase tracking-wider text-text-muted mt-1 leading-tight">{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* Stack */}
                <div className="flex flex-wrap gap-2 mb-7">
                  {p.stack.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-full border border-border-default text-[10px] uppercase tracking-wider text-text-muted">
                      {s}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-accent-primary text-accent-on text-xs uppercase tracking-widest font-medium hover:opacity-85 transition-opacity"
                  >
                    {p.liveLabel}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  {p.caseStudyUrl && (
                    <a
                      href={p.caseStudyUrl}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-border-default text-xs uppercase tracking-widest font-medium hover:border-text-primary transition-colors"
                    >
                      Read the story
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
