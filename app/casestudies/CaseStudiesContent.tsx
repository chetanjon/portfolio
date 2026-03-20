'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionMarker } from '@/components/ui/SectionMarker';

const caseStudies: Array<{
  slug: string;
  company: string;
  title: string;
  description: string;
  tags: string[];
  metric: { value: string; label: string };
  accentColor: string;
  bgColor: string;
  year: string;
  type?: string;
}> = [
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
  },
  {
    slug: 'figma',
    company: 'Figma',
    title: 'Rebuilding Trust After UI3',
    description:
      'How a major redesign and AI data-sharing controversy tested trust with Figma\'s power users — and a PM framework for earning it back through progressive migration and transparent AI.',
    tags: ['Trust Recovery', 'CIRCLES', 'PRD', 'RICE Scoring', 'Wireframes'],
    metric: { value: '$1.06B', label: 'FY2025 Revenue' },
    accentColor: '#5B3DC8',
    bgColor: '#EEEBF8',
    year: '2026',
  },
  {
    slug: 'liquid-glass',
    company: 'Apple',
    title: 'When Glass Cracked',
    description:
      'How Apple\'s most ambitious redesign since iOS 7 broke accessibility for millions — and what a better path forward looks like. A UX case study analyzing WCAG failures, heuristic violations, and solution design.',
    tags: ['UX Research', 'Accessibility', 'WCAG 2.2', 'Heuristic Evaluation', 'RICE'],
    metric: { value: '1.5:1', label: 'Contrast Measured' },
    accentColor: '#0071e3',
    bgColor: '#f5f5f7',
    year: '2026',
  },
  {
    slug: 'notion-teardown',
    company: 'Notion',
    title: 'Notion\'s $600M Paradox',
    description:
      'How AI Agents Could Solve the Onboarding Problem That Templates Never Fixed. After interviewing 10 Notion users and analyzing 10,000+ reviews, one pattern dominated: the flexibility that makes Notion powerful makes it overwhelming.',
    tags: ['AARRR Funnel', 'User Interviews', 'RICE Scoring', 'Wireframes', 'ARR Modeling'],
    metric: { value: '~$600M', label: 'Est. ARR' },
    accentColor: '#2383E2',
    bgColor: '#EBF4FD',
    year: '2026',
    type: 'Teardown',
  },
  {
    slug: 'rivian',
    company: 'Rivian',
    title: 'Rivian\'s Broken Handshake',
    description:
      'How phone key failure rates as high as 70% threaten a $5.8B joint venture — and a PM framework for rebuilding trust through feedback, state communication, and failure recovery improvements.',
    tags: ['CIRCLES', 'PRD', 'RICE Scoring', 'UX Wireframes', 'BLE/UWB'],
    metric: { value: 'Up to 70%', label: 'Failure Rate' },
    accentColor: '#2D5A3D',
    bgColor: '#E8F0EA',
    year: '2026',
  },
  {
    slug: 'perplexity',
    company: 'Perplexity AI',
    title: 'The $20 Billion Subscription Gamble',
    description:
      'Perplexity built the fastest-growing AI subscription business — then silently gutted its Pro plan, swapped premium models for cheaper ones, and pushed users toward a 10× more expensive tier.',
    tags: ['Product Teardown', 'Pricing Strategy', 'AARRR', 'Competitive Analysis', 'Trust'],
    metric: { value: '$20B', label: 'Valuation' },
    accentColor: '#6C5CE7',
    bgColor: '#f0eeff',
    year: '2026',
    type: 'Teardown',
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
  },
];

export function CaseStudiesContent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

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
            <SectionMarker label="Research & Strategy" className="mb-8" />

            <h1 className="font-display font-bold text-5xl md:text-7xl uppercase tracking-tight leading-[0.9] mb-6">
              Case
              <span className="font-serif italic font-normal normal-case text-4xl md:text-6xl"> Studies</span>
            </h1>

            <p className="text-lg text-text-secondary max-w-xl">
              In-depth product teardowns applying CIRCLES, PRD writing, UX research, and
              competitive analysis — the frameworks that drive real product decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Study Cards */}
      <section className="py-16">
        <div className="container-wide">
          <div className="flex flex-col gap-8">
            {caseStudies.map((study, i) => (
              <motion.div
                key={study.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Link href={`/casestudies/${study.slug}`} className="block group">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="border border-border-default rounded-sm overflow-hidden"
                  >
                    {/* Accent bar */}
                    <div
                      className="h-1 w-full"
                      style={{ background: study.accentColor }}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-0">
                      {/* Left: content */}
                      <div className="p-8 md:p-10">
                        <div className="flex items-center gap-3 mb-5">
                          <span className="text-[10px] uppercase tracking-widest text-text-muted">
                            {study.company}
                          </span>
                          <span className="text-[10px] text-text-muted opacity-40">/</span>
                          <span className="text-[10px] uppercase tracking-widest text-text-muted">
                            {study.year}
                          </span>
                          {'type' in study && study.type && (
                            <>
                              <span className="text-[10px] text-text-muted opacity-40">/</span>
                              <span
                                className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full border font-medium"
                                style={{ color: study.accentColor, borderColor: study.accentColor, opacity: 0.85 }}
                              >
                                {study.type}
                              </span>
                            </>
                          )}
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
                          className="text-sm font-medium tracking-wide transition-colors"
                          style={{ color: study.accentColor }}
                        >
                          {'type' in study && study.type ? `Read ${study.type} →` : 'Read Case Study →'}
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
          </div>
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
            <span>/ CIRCLES Framework</span>
            <span>/ PRD Writing</span>
            <span>/ RICE Prioritization</span>
            <span>/ UX Research</span>
            <span>/ Competitive Analysis</span>
          </motion.div>
        </div>
      </section>
    </>
  );
}
