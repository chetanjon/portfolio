'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { MetricCard } from '@/components/shared/MetricCard';
import { TechStack } from '@/components/shared/TechStack';
import type { WorkExperience } from '@/types';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { formatDate, calculateDuration } from '@/lib/utils';

interface CaseStudyContentProps {
  work: WorkExperience;
  prev: WorkExperience | null;
  next: WorkExperience | null;
}

export function CaseStudyContent({ work, prev, next }: CaseStudyContentProps) {
  const meta = [
    { label: 'Role', value: work.role },
    { label: 'Duration', value: calculateDuration(work.startDate, work.endDate) },
    { label: 'Type', value: work.type },
    { label: 'Location', value: work.location },
  ];

  return (
    <>
      <section className="pt-32 pb-8 md:pt-40">
        <div className="container-wide">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
              <Link
                href="/work"
                className="inline-flex items-center text-sm text-text-tertiary hover:text-text-primary transition-colors mb-8"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Work
              </Link>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-text-primary mb-2"
            >
              {work.company}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-lg text-text-secondary mb-8"
            >
              {work.description}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              {meta.map((m) => (
                <div key={m.label} className="p-4 rounded-xl bg-bg-secondary border border-border-default">
                  <p className="text-xs text-text-muted uppercase tracking-wider">{m.label}</p>
                  <p className="text-sm font-semibold text-text-primary mt-1 capitalize">{m.value}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="w-full h-48 md:h-64 rounded-xl bg-gradient-to-br from-accent-secondary to-accent-primary/80 flex items-center justify-center mb-8"
            >
              <span className="text-4xl font-bold text-white/20">{work.company}</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {work.caseStudy && (
        <>
          <section className="section-padding pt-0">
            <div className="container-narrow">
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
              >
                <motion.h2
                  variants={fadeInUp}
                  transition={{ duration: 0.5 }}
                  className="text-2xl font-bold text-text-primary mb-4"
                >
                  Overview
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  transition={{ duration: 0.5 }}
                  className="text-text-secondary leading-relaxed mb-12"
                >
                  {work.caseStudy.overview}
                </motion.p>

                <motion.h2
                  variants={fadeInUp}
                  transition={{ duration: 0.5 }}
                  className="text-2xl font-bold text-text-primary mb-4"
                >
                  The Challenge
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  transition={{ duration: 0.5 }}
                  className="text-text-secondary leading-relaxed mb-4"
                >
                  {work.caseStudy.challenge}
                </motion.p>
                <motion.ul
                  variants={fadeInUp}
                  transition={{ duration: 0.5 }}
                  className="space-y-2 mb-12"
                >
                  {work.caseStudy.challengePoints.map((point) => (
                    <li key={point} className="text-sm text-text-secondary flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-primary mt-2 shrink-0" />
                      {point}
                    </li>
                  ))}
                </motion.ul>

                <motion.h2
                  variants={fadeInUp}
                  transition={{ duration: 0.5 }}
                  className="text-2xl font-bold text-text-primary mb-6"
                >
                  My Approach
                </motion.h2>
                <div className="space-y-6 mb-12">
                  {work.caseStudy.approach.map((phase, i) => (
                    <motion.div
                      key={phase.phase}
                      variants={fadeInUp}
                      transition={{ duration: 0.5 }}
                      className="p-6 rounded-xl border border-border-default bg-bg-secondary"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-8 h-8 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-semibold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <h3 className="text-base font-semibold text-text-primary">{phase.phase}</h3>
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed ml-11">
                        {phase.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <motion.h2
                  variants={fadeInUp}
                  transition={{ duration: 0.5 }}
                  className="text-2xl font-bold text-text-primary mb-6"
                >
                  Key Decisions
                </motion.h2>
                <div className="space-y-4 mb-12">
                  {work.caseStudy.decisions.map((d) => (
                    <motion.div
                      key={d.decision}
                      variants={fadeInUp}
                      transition={{ duration: 0.5 }}
                      className="p-6 rounded-xl border border-border-default bg-bg-secondary"
                    >
                      <h4 className="text-base font-semibold text-text-primary mb-2">{d.decision}</h4>
                      <p className="text-sm text-text-tertiary mb-1">
                        <span className="font-medium text-text-secondary">Context:</span> {d.context}
                      </p>
                      <p className="text-sm text-accent-tertiary">
                        <span className="font-medium">Outcome:</span> {d.outcome}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          <section className="section-padding border-t border-border-default">
            <div className="container-wide">
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
              >
                <motion.h2
                  variants={fadeInUp}
                  transition={{ duration: 0.5 }}
                  className="text-2xl font-bold text-text-primary mb-8 text-center"
                >
                  Results & Impact
                </motion.h2>
                <motion.div
                  variants={fadeInUp}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
                >
                  {work.metrics.map((m) => (
                    <MetricCard key={m.label} {...m} />
                  ))}
                </motion.div>
                <motion.p
                  variants={fadeInUp}
                  transition={{ duration: 0.5 }}
                  className="text-text-secondary leading-relaxed text-center max-w-2xl mx-auto"
                >
                  {work.caseStudy.results}
                </motion.p>
              </motion.div>
            </div>
          </section>

          <section className="section-padding">
            <div className="container-narrow">
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
              >
                <motion.h2
                  variants={fadeInUp}
                  transition={{ duration: 0.5 }}
                  className="text-2xl font-bold text-text-primary mb-4"
                >
                  Learnings
                </motion.h2>
                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }} className="space-y-4 mb-8">
                  <div>
                    <h4 className="text-sm font-semibold text-text-primary mb-1">What did this teach me?</h4>
                    <p className="text-sm text-text-secondary leading-relaxed">{work.caseStudy.learnings}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-text-primary mb-1">What would I do differently?</h4>
                    <p className="text-sm text-text-secondary leading-relaxed">{work.caseStudy.whatWouldChange}</p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <h4 className="text-sm font-semibold text-text-primary mb-3">Skills Used</h4>
                  <TechStack skills={work.skills} />
                </motion.div>
              </motion.div>
            </div>
          </section>
        </>
      )}

      {!work.caseStudy && (
        <section className="section-padding">
          <div className="container-narrow">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold text-text-primary mb-4"
              >
                Highlights
              </motion.h2>
              <motion.ul variants={fadeInUp} transition={{ duration: 0.5 }} className="space-y-2 mb-8">
                {work.highlights.map((h) => (
                  <li key={h} className="text-text-secondary flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-primary mt-2 shrink-0" />
                    {h}
                  </li>
                ))}
              </motion.ul>

              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 gap-6 mb-8"
              >
                {work.metrics.map((m) => (
                  <MetricCard key={m.label} {...m} size="sm" />
                ))}
              </motion.div>

              <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
                <TechStack skills={work.skills} />
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      <section className="border-t border-border-default">
        <div className="container-wide py-8">
          <div className="flex justify-between items-center">
            {prev ? (
              <Link
                href={`/work/${prev.slug}`}
                className="text-sm text-text-tertiary hover:text-text-primary transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                {prev.company}
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/work/${next.slug}`}
                className="text-sm text-text-tertiary hover:text-text-primary transition-colors flex items-center gap-1"
              >
                {next.company}
                <ArrowRight className="h-4 w-4" />
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
