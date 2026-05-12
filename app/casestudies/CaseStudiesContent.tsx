'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { SectionMarker } from '@/components/ui/SectionMarker';

type CaseStudyType = 'Shipped' | 'Thinking';

const caseStudies: Array<{
  slug: string;
  href?: string;
  company: string;
  title: string;
  description: string;
  tags: string[];
  metric: { value: string; label: string };
  accentColor: string;
  bgColor: string;
  year: string;
  type: CaseStudyType;
  readMin: number;
}> = [
  {
    slug: 'aatram',
    company: 'Aatram',
    title: 'Start Starting',
    description:
      'Co-founded with two friends. Shipped V1 to the App Store in seven days from first commit, then rewrote V2 as an anti-interruption product after archetype interviews showed our own notifications were pulling avoidance-prone users out of focus. Co-built the codebase across 158 commits and owned UI, brand voice, an 18-component design system, the logo drawn as 80 SwiftUI Canvas stroke segments, and aatram.com end-to-end. Drove a 22-finding pre-submission audit through App Review.',
    tags: ['0-to-1', 'iOS', 'Apple Foundation Models', 'Brand & Design', 'Anti-Interruption'],
    metric: { value: '7 days', label: 'First commit → App Store · 158 commits' },
    accentColor: '#6B5DAD',
    bgColor: '#EEEBF8',
    year: '2026',
    type: 'Shipped',
    readMin: 6,
  },
  {
    slug: 'ikt-india',
    href: '/work/ikt-india',
    company: 'IKT India',
    title: "Margins, Vendors, and a Marketplace That Worked",
    description:
      "Seed-stage curated B2B marketplace for handloom and sustainable clothing brands across 15 Indian states. Promoted from Product Operations Intern to PM in six months as the company's first dedicated PM. Designed and ran a concurrent A/B test on 50 SKUs with price floors against a matched control, scaled the winner to 500+ SKUs, lifted gross margin from 25% to 40%, doubled monthly GMV. Cut seller onboarding from 3 days to 6 hours and grew the vendor base 20 → 75+.",
    tags: ['B2B Marketplace', 'A/B Testing', 'SQL', 'Pricing Strategy', 'Vendor Growth'],
    metric: { value: '3.75x', label: 'Vendor growth · 2x GMV · 25→40% margin' },
    accentColor: '#3F8C73',
    bgColor: '#E6F2EC',
    year: '2024',
    type: 'Shipped',
    readMin: 7,
  },
  {
    slug: 'cursor',
    company: 'Cursor (Anysphere)',
    title: 'The $29B Fork',
    description:
      'How four MIT students forked VS Code, grew with almost no traditional marketing, and built what may be the fastest-growing SaaS product ever, while every model provider simultaneously funds them and competes with them.',
    tags: ['Product Teardown', 'SaaS', 'AI Coding', 'Competitive Analysis', 'Unit Economics'],
    metric: { value: '$2B', label: 'Annualized Revenue' },
    accentColor: '#0E7C6B',
    bgColor: '#E6F5F1',
    year: '2026',
    type: 'Thinking',
    readMin: 9,
  },
  {
    slug: 'duolingo',
    company: 'Duolingo',
    title: 'Breaking the B1 Wall',
    description:
      '52 million daily users. $1 billion in revenue. A learning ceiling nobody\'s fixing. A product strategy using the CIRCLES framework and PRD to address Duolingo\'s intermediate plateau.',
    tags: ['CIRCLES', 'PRD', 'UX Research', 'RICE Scoring', 'Wireframes'],
    metric: { value: '52.7M', label: 'Daily Active Users' },
    accentColor: '#D4790E',
    bgColor: '#FFF8ED',
    year: '2026',
    type: 'Thinking',
    readMin: 10,
  },
  {
    slug: 'figma',
    company: 'Figma',
    title: 'Rebuilding Trust After UI3',
    description:
      'How a major redesign and AI data-sharing controversy tested trust with Figma\'s power users, and a PM framework for earning it back through progressive migration and transparent AI.',
    tags: ['Trust Recovery', 'CIRCLES', 'PRD', 'RICE Scoring', 'Wireframes'],
    metric: { value: '$1.06B', label: 'FY2025 Revenue' },
    accentColor: '#5B3DC8',
    bgColor: '#EEEBF8',
    year: '2026',
    type: 'Thinking',
    readMin: 8,
  },
  {
    slug: 'liquid-glass',
    company: 'Apple',
    title: 'When Glass Cracked',
    description:
      'How Apple\'s most ambitious redesign since iOS 7 broke accessibility for millions, and what a better path forward looks like. A UX case study analyzing WCAG failures, heuristic violations, and solution design.',
    tags: ['UX Research', 'Accessibility', 'WCAG 2.2', 'Heuristic Evaluation', 'RICE'],
    metric: { value: '1.5:1', label: 'Contrast Measured' },
    accentColor: '#0071e3',
    bgColor: '#f5f5f7',
    year: '2026',
    type: 'Thinking',
    readMin: 10,
  },
  {
    slug: 'notion',
    company: 'Notion',
    title: 'Notion\'s $600M Paradox',
    description:
      'How AI Agents Could Solve the Onboarding Problem That Templates Never Fixed. After interviewing 10 Notion users and analyzing 10,000+ reviews, one pattern dominated: the flexibility that makes Notion powerful makes it overwhelming.',
    tags: ['AARRR Funnel', 'User Interviews', 'RICE Scoring', 'Wireframes', 'ARR Modeling'],
    metric: { value: '~$600M', label: 'Est. ARR' },
    accentColor: '#2383E2',
    bgColor: '#EBF4FD',
    year: '2026',
    type: 'Thinking',
    readMin: 12,
  },
  {
    slug: 'rivian',
    company: 'Rivian',
    title: 'Rivian\'s Broken Handshake',
    description:
      'How phone key failure rates as high as 70% threaten a $5.8B joint venture, and a PM framework for rebuilding trust through feedback, state communication, and failure recovery improvements.',
    tags: ['CIRCLES', 'PRD', 'RICE Scoring', 'UX Wireframes', 'BLE/UWB'],
    metric: { value: 'Up to 70%', label: 'Failure Rate' },
    accentColor: '#2D5A3D',
    bgColor: '#E8F0EA',
    year: '2026',
    type: 'Thinking',
    readMin: 7,
  },
  {
    slug: 'perplexity',
    company: 'Perplexity AI',
    title: 'The $20 Billion Subscription Gamble',
    description:
      'Perplexity built the fastest-growing AI subscription business, then silently gutted its Pro plan, swapped premium models for cheaper ones, and pushed users toward a 10× more expensive tier.',
    tags: ['Product Teardown', 'Pricing Strategy', 'AARRR', 'Competitive Analysis', 'Trust'],
    metric: { value: '$20B', label: 'Valuation' },
    accentColor: '#6C5CE7',
    bgColor: '#f0eeff',
    year: '2026',
    type: 'Thinking',
    readMin: 7,
  },
  {
    slug: 'sonos',
    company: 'Sonos',
    title: 'When the Music Stopped',
    description:
      'How Sonos shipped a major app rewrite that removed core features, broke accessibility, and cost the CEO his job. A PM framework for how the migration should have been managed.',
    tags: ['CIRCLES', 'PRD', 'Safe Migration', 'Accessibility', 'RICE Scoring'],
    metric: { value: '~$500M', label: 'Market Cap Lost' },
    accentColor: '#E8590C',
    bgColor: '#FFF3ED',
    year: '2026',
    type: 'Thinking',
    readMin: 8,
  },
  {
    slug: 'tiktok-shop',
    company: 'TikTok Shop',
    title: 'Redesigning Trust in Social Commerce',
    description:
      'Redesigning trust, discovery & purchase confidence in the world\'s fastest-growing social commerce platform. CIRCLES framework, wireframes, and a full PRD for a Trust Layer.',
    tags: ['CIRCLES', 'Social Commerce', 'PRD', 'Wireframes', 'Trust Design'],
    metric: { value: '~$64B', label: 'GMV 2025 Est.' },
    accentColor: '#8B4513',
    bgColor: '#FAF3ED',
    year: '2026',
    type: 'Thinking',
    readMin: 8,
  },
  {
    slug: 'spotify',
    company: 'Spotify',
    title: 'Listening Into Loyalty',
    description:
      'How Spotify turned a music player into a growth machine. A teardown of Discover Weekly and Wrapped: the two features that drive retention and acquisition through algorithmic personalization and viral data storytelling.',
    tags: ['Product Teardown', 'Growth Loops', 'Recommendation Systems', 'Viral Mechanics', 'Retention'],
    metric: { value: '751M', label: 'Monthly Active Users' },
    accentColor: '#1DB954',
    bgColor: '#E8F8EE',
    year: '2026',
    type: 'Thinking',
    readMin: 7,
  },
];

type Filter = 'All' | 'Shipped' | 'Thinking';

const FILTERS: Filter[] = ['All', 'Shipped', 'Thinking'];

export function CaseStudiesContent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const [filter, setFilter] = useState<Filter>('All');

  const filteredStudies = useMemo(() => {
    if (filter === 'All') return caseStudies;
    return caseStudies.filter((s) => s.type === filter);
  }, [filter]);

  const counts = useMemo(
    () => ({
      All: caseStudies.length,
      Shipped: caseStudies.filter((s) => s.type === 'Shipped').length,
      Thinking: caseStudies.filter((s) => s.type === 'Thinking').length,
    }),
    []
  );

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 bg-bg-secondary pointer-events-none"
        />
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <SectionMarker label="Work & Thinking" className="mb-8" />

            <h1 className="font-display font-bold text-5xl md:text-7xl uppercase tracking-tight leading-[0.9] mb-6">
              Selected
              <span className="font-serif italic font-normal normal-case text-4xl md:text-6xl"> work &amp; thinking</span>
            </h1>

            <p className="text-lg text-text-secondary max-w-xl">
              Shipped products I co-built and owned, plus product-thinking exercises on companies I
              don&apos;t work for. The first set is what I&apos;ve done. The second is how I think.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter chips */}
      <section className="pt-4 pb-2">
        <div className="container-wide">
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            {FILTERS.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] uppercase tracking-widest border transition-colors cursor-pointer ${
                    active
                      ? 'bg-text-primary text-bg-primary border-text-primary'
                      : 'border-border-default text-text-muted hover:text-text-primary hover:border-border-hover'
                  }`}
                >
                  <span>{f}</span>
                  <span className={`text-[10px] ${active ? 'opacity-70' : 'opacity-60'}`}>
                    {counts[f]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Study Cards */}
      <section className="py-12">
        <div className="container-wide">
          <motion.div layout className="flex flex-col gap-8">
            <AnimatePresence mode="popLayout">
            {filteredStudies.map((study, i) => (
              <motion.div
                key={study.slug}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Link href={study.href ?? `/casestudies/${study.slug}`} className="block group">
                  <motion.div
                    whileHover={{ y: -6 }}
                    whileTap={{ y: -3 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="relative border border-border-default rounded-sm overflow-hidden transition-[box-shadow,border-color] duration-500 group-hover:shadow-[0_18px_50px_-20px_rgba(0,0,0,0.22)] dark:group-hover:shadow-[0_18px_50px_-15px_rgba(0,0,0,0.6)] group-hover:border-border-hover"
                  >
                    {/* Accent bar — scales vertically on hover for a subtle "lift" cue */}
                    <div
                      className="w-full origin-top transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-[1.75]"
                      style={{ height: 4, background: study.accentColor }}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-0">
                      {/* Left: content */}
                      <div className="p-8 md:p-10">
                        <div className="flex items-center flex-wrap gap-3 mb-5">
                          {study.type === 'Shipped' ? (
                            <span
                              className="text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full font-semibold inline-flex items-center gap-1.5"
                              style={{ background: study.accentColor, color: '#fff' }}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full bg-white"
                                aria-hidden
                              />
                              Shipped
                            </span>
                          ) : (
                            <span className="text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border border-border-default text-text-muted font-medium">
                              Thinking exercise
                            </span>
                          )}
                          <span className="text-[10px] uppercase tracking-widest text-text-muted">
                            {study.company}
                          </span>
                          <span className="text-[10px] text-text-muted opacity-40">/</span>
                          <span className="text-[10px] uppercase tracking-widest text-text-muted">
                            {study.year}
                          </span>
                          <span className="text-[10px] text-text-muted opacity-40">/</span>
                          <span className="text-[10px] uppercase tracking-widest text-text-muted">
                            {study.readMin} min read
                          </span>
                        </div>

                        <h2 className="font-display font-bold text-3xl md:text-4xl uppercase tracking-tight leading-[0.95] mb-4 group-hover:text-text-secondary transition-colors">
                          {study.title}
                        </h2>

                        <p className="text-text-secondary text-base leading-relaxed max-w-2xl mb-6">
                          {study.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                          {study.tags.map((tag) => (
                            <span
                              key={tag}
                              className="border border-border-default rounded-full px-3 py-1 text-[9px] uppercase tracking-widest text-text-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <span
                          className="inline-flex items-center gap-2 text-sm font-medium tracking-wide transition-colors"
                          style={{ color: study.accentColor }}
                        >
                          {study.type === 'Shipped' ? 'Read the story' : 'Read the breakdown'}
                          <span
                            aria-hidden
                            className="inline-block transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1.5"
                          >
                            →
                          </span>
                        </span>
                      </div>

                      {/* Right: metric */}
                      <div
                        className="hidden md:flex flex-col items-center justify-center px-12 py-10 min-w-[200px]"
                        style={{ background: study.bgColor }}
                      >
                        <span
                          className="font-display font-bold text-4xl leading-none mb-2"
                          style={{ color: study.accentColor }}
                        >
                          {study.metric.value}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-center"
                          style={{ color: study.accentColor, opacity: 0.7 }}>
                          {study.metric.label}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
            </AnimatePresence>
          </motion.div>

          {filteredStudies.length === 0 && (
            <p className="text-center text-text-muted text-sm py-12">
              No studies match this filter yet.
            </p>
          )}
        </div>
      </section>

      {/* Footer callout */}
      <section className="py-24 bg-bg-secondary">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 text-[10px] uppercase tracking-widest font-medium"
          >
            <span>/ 0-to-1 Shipping</span>
            <span>/ User Research</span>
            <span>/ A/B Testing</span>
            <span>/ RICE Prioritization</span>
            <span>/ Competitive Analysis</span>
          </motion.div>
        </div>
      </section>
    </>
  );
}
