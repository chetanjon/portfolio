'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { SectionMarker } from '@/components/ui/SectionMarker';
import { workExperiences } from '@/data/work';
import { formatDate } from '@/lib/utils';

const REVEAL_EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function WorkContent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const total = String(workExperiences.length).padStart(2, '0');

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 bg-bg-secondary pointer-events-none"
        />
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: REVEAL_EASE }}
          >
            <SectionMarker label="Experience" className="mb-8" />

            <h1 className="font-display font-bold text-5xl md:text-7xl uppercase tracking-tight leading-[0.9] mb-6">
              Work
              <span className="font-display-serif italic font-normal normal-case text-4xl md:text-6xl gloss-serif">
                {' '}experience
              </span>
            </h1>

            <p className="text-lg text-text-secondary max-w-xl">
              Currently co-leading product at Aatram (consumer iOS app live on the App Store,
              240 organic downloads at an 18% conversion rate). Previously scaled a B2B marketplace
              from 20 to 75+ vendors and doubled monthly GMV with a 4-engineer team. Here&apos;s the
              full path.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Track record — self-contained entries. Each role's headline metric sits
          next to its own narrative, so what you read always matches what you see. */}
      <section className="pb-8">
        <div className="container-wide">
          <SectionMarker label="Track record" className="mb-2" />

          <div className="flex flex-col">
            {workExperiences.map((work, i) => (
              <motion.article
                key={work.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: REVEAL_EASE }}
                className="tick-rule grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-8 lg:gap-16 py-12 lg:py-16"
              >
                {/* Identity + metric panel */}
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-text-muted tabular-nums">
                      {String(i + 1).padStart(2, '0')} / {total}
                    </span>
                    <span className="font-mono text-xs text-text-muted tabular-nums">
                      {formatDate(work.startDate)} – {work.endDate === 'Present' ? 'Present' : formatDate(work.endDate)}
                    </span>
                  </div>

                  <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight mt-3 leading-[0.95]">
                    {work.company}
                  </h2>
                  <p className="small-caps text-text-muted mt-2">
                    {work.role} · {work.location}
                  </p>

                  <div className="mt-8">
                    <div className="text-accent-primary font-display font-black tabular-nums leading-[0.9] text-[clamp(3rem,6vw,4.5rem)]">
                      {work.metrics[0].value}
                    </div>
                    <p className="text-text-secondary mt-1 max-w-xs">{work.metrics[0].label}</p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                    {work.metrics.slice(1, 3).map((m) => (
                      <div key={m.label}>
                        <p className="font-display font-bold text-lg">{m.value}</p>
                        <p className="small-caps text-text-muted mt-0.5">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Narrative — kept short on purpose. The depth lives in the
                    case study; this page is for scanning. */}
                <div className="min-w-0 lg:pt-1">
                  <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-prose">
                    {work.tagline ?? work.description}
                  </p>

                  {work.caseStudy && (
                    <Link
                      href={`/work/${work.slug}`}
                      className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent-primary hover:opacity-80 transition-opacity"
                    >
                      View case study
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </Link>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Summary — the page's one dark-contrast band */}
      <div className="dark">
        <section className="py-24 bg-bg-secondary text-text-primary">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <SectionMarker label="Skills" className="mb-8" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap justify-center gap-8 md:gap-16 text-[10px] uppercase tracking-widest font-medium mb-12"
            >
              <span>/ 0-to-1 Product</span>
              <span>/ AI / On-Device ML</span>
              <span>/ B2B Marketplace Growth</span>
              <span>/ Retention Analytics</span>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
              {['PRDs', 'Jobs-to-be-Done', 'A/B Testing', 'Cohort Analysis', 'SQL', 'Python', 'Apple Foundation Models', 'Gemini (AI SDK)', 'Zod Structured Outputs', 'Figma', 'SwiftUI', 'Next.js'].map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="border border-border-default rounded-full px-4 py-1 text-[9px] uppercase tracking-widest hover:bg-text-primary hover:text-bg-primary transition-colors"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
