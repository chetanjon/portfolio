'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { SectionMarker } from '@/components/ui/SectionMarker';
import type { WorkExperience } from '@/types';
import { calculateDuration } from '@/lib/utils';

interface CaseStudyContentProps {
  work: WorkExperience;
  prev: WorkExperience | null;
  next: WorkExperience | null;
}

export function CaseStudyContent({ work, prev, next }: CaseStudyContentProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const meta = [
    { label: 'Role', value: work.role },
    { label: 'Duration', value: calculateDuration(work.startDate, work.endDate) },
    { label: 'Type', value: work.type },
    { label: 'Location', value: work.location },
  ];

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-end pt-32 pb-16 overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 bg-bg-secondary pointer-events-none"
        />
        <div className="absolute inset-0 grid grid-cols-4 opacity-10 pointer-events-none">
          {[0, 1, 2, 3].map(i => <div key={i} className="border-r border-text-primary h-full" />)}
        </div>

        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-text-muted hover:text-text-primary transition-colors mb-12"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Work
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <SectionMarker label="Case Study" className="mb-6" />
            <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.9] mb-6">
              {work.company}
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mb-12">{work.description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border-default pt-8"
          >
            {meta.map((m) => (
              <div key={m.label}>
                <p className="small-caps text-text-muted mb-1">{m.label}</p>
                <p className="text-sm font-medium capitalize">{m.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 border-t border-border-default">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {work.metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <span className="text-3xl md:text-4xl font-display font-bold block mb-1">{m.value}</span>
                <p className="small-caps text-text-muted">{m.label}</p>
                {m.context && <p className="text-[10px] text-text-tertiary mt-0.5">{m.context}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {work.caseStudy && (
        <>
          {/* Overview */}
          <section className="py-16 border-t border-border-default">
            <div className="container-narrow">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.7 }}
              >
                <p className="small-caps text-text-muted mb-4">Overview</p>
                <p className="text-lg text-text-secondary leading-relaxed">{work.caseStudy.overview}</p>
              </motion.div>
            </div>
          </section>

          {/* Challenge */}
          <section className="py-16 border-t border-border-default bg-bg-secondary">
            <div className="container-wide">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                  >
                    <h2 className="font-display font-bold text-3xl md:text-4xl uppercase tracking-tight mb-4">
                      The<br />
                      <span className="font-serif italic font-normal normal-case text-2xl md:text-3xl">Challenge</span>
                    </h2>
                    <p className="text-text-secondary text-sm leading-relaxed">{work.caseStudy.challenge}</p>
                  </motion.div>
                </div>
                <div className="lg:col-span-7 lg:col-start-6">
                  <div className="space-y-3">
                    {work.caseStudy.challengePoints.map((point, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: i * 0.07 }}
                        className="flex items-start gap-4 border-b border-border-default pb-3"
                      >
                        <span className="text-[10px] font-display font-bold text-text-muted shrink-0 mt-0.5">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <p className="text-sm text-text-secondary">{point}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Approach */}
          <section className="py-16 border-t border-border-default">
            <div className="container-wide">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-display font-bold text-3xl md:text-4xl uppercase tracking-tight mb-12">
                  My Approach
                </h2>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {work.caseStudy.approach.map((phase, i) => (
                  <motion.div
                    key={phase.phase}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="border border-border-default p-8 rounded-lg"
                  >
                    <span className="text-xs font-display font-bold text-text-muted block mb-3">
                      Phase {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display font-bold text-lg uppercase tracking-tight mb-3">{phase.phase}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{phase.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Key Decisions */}
          <section className="py-16 border-t border-border-default bg-bg-secondary">
            <div className="container-wide">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-display font-bold text-3xl md:text-4xl uppercase tracking-tight mb-12">
                  Key Decisions
                </h2>
              </motion.div>
              <div className="space-y-0 border-t border-border-default">
                {work.caseStudy.decisions.map((d, i) => (
                  <motion.div
                    key={d.decision}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="border-b border-border-default py-8 grid grid-cols-1 md:grid-cols-12 gap-6"
                  >
                    <div className="md:col-span-5">
                      <span className="text-[10px] font-display font-bold text-text-muted block mb-2">
                        Decision {String(i + 1).padStart(2, '0')}
                      </span>
                      <h4 className="font-medium text-base">{d.decision}</h4>
                    </div>
                    <div className="md:col-span-3">
                      <p className="small-caps text-text-muted mb-1">Context</p>
                      <p className="text-sm text-text-secondary">{d.context}</p>
                    </div>
                    <div className="md:col-span-4">
                      <p className="small-caps text-text-muted mb-1">Outcome</p>
                      <p className="text-sm text-text-secondary">{d.outcome}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Results */}
          <section className="py-16 border-t border-border-default">
            <div className="container-wide text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="font-display font-bold text-3xl md:text-4xl uppercase tracking-tight mb-8">
                  Results &amp;
                  <span className="font-serif italic font-normal normal-case"> Impact</span>
                </h2>
                <p className="text-text-secondary leading-relaxed max-w-2xl mx-auto text-lg">
                  {work.caseStudy.results}
                </p>
              </motion.div>
            </div>
          </section>

          {/* Learnings */}
          <section className="py-16 border-t border-border-default bg-bg-secondary">
            <div className="container-narrow">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="font-display font-bold text-3xl md:text-4xl uppercase tracking-tight mb-10">
                  Learnings
                </h2>
                <div className="space-y-8">
                  <div>
                    <p className="small-caps text-text-muted mb-2">What did this teach me?</p>
                    <p className="text-text-secondary leading-relaxed">{work.caseStudy.learnings}</p>
                  </div>
                  <div>
                    <p className="small-caps text-text-muted mb-2">What would I do differently?</p>
                    <p className="text-text-secondary leading-relaxed">{work.caseStudy.whatWouldChange}</p>
                  </div>
                </div>
                <div className="mt-10 pt-8 border-t border-border-default">
                  <p className="small-caps text-text-muted mb-4">Skills Used</p>
                  <div className="flex flex-wrap gap-2">
                    {work.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-full border border-border-default text-xs hover:bg-text-primary hover:text-bg-primary transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}

      {!work.caseStudy && (
        <section className="py-16 border-t border-border-default">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-display font-bold text-3xl uppercase tracking-tight mb-8">Highlights</h2>
              <div className="space-y-0 border-t border-border-default">
                {work.highlights.map((h, i) => (
                  <motion.div
                    key={h}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    className="border-b border-border-default py-4 flex items-start gap-4"
                  >
                    <span className="text-[10px] font-display font-bold text-text-muted shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-sm text-text-secondary">{h}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-10 pt-8 border-t border-border-default">
                <p className="small-caps text-text-muted mb-4">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {work.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-full border border-border-default text-xs hover:bg-text-primary hover:text-bg-primary transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Prev / Next nav */}
      <section className="border-t border-border-default">
        <div className="container-wide py-8">
          <div className="flex justify-between items-center">
            {prev ? (
              <Link
                href={`/work/${prev.slug}`}
                className="text-xs uppercase tracking-widest text-text-muted hover:text-text-primary transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {prev.company}
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/work/${next.slug}`}
                className="text-xs uppercase tracking-widest text-text-muted hover:text-text-primary transition-colors flex items-center gap-2"
              >
                {next.company}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
