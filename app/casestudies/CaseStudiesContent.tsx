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
}> = [];

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
