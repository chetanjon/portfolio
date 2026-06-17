'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { SectionMarker } from '@/components/ui/SectionMarker';
import { workExperiences } from '@/data/work';

export function WorkContent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  // The sticky exhibit follows whichever entry is in view.
  const [active, setActive] = useState(0);
  const focus = workExperiences[active];

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
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
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

      {/* Work exhibit — a sticky metric pane tracks the entry currently in view */}
      <section className="py-16">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20">
            {/* Left: sticky "in focus" readout (desktop only) */}
            <div className="hidden lg:block">
              <div className="lg:sticky lg:top-28">
                <SectionMarker label="In focus" className="mb-6" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={focus.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <p className="font-display font-bold text-3xl md:text-4xl tracking-tight">
                      {focus.company}
                    </p>
                    <p className="small-caps text-text-muted mt-2">{focus.role}</p>
                    <div className="gauge-divider w-40 my-8" aria-hidden />
                    <div className="text-accent-primary font-display font-black tabular-nums leading-[0.9] text-[clamp(3.5rem,7vw,5.5rem)]">
                      {focus.metrics[0].value}
                    </div>
                    <p className="text-text-secondary mt-2 max-w-xs">{focus.metrics[0].label}</p>
                    <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
                      {focus.metrics.slice(1, 3).map((m) => (
                        <div key={m.label}>
                          <p className="font-display font-bold text-xl">{m.value}</p>
                          <p className="small-caps text-text-muted mt-1">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right: the entries; each updates the focus as it scrolls into view */}
            <div>
              {workExperiences.map((work, i) => (
                <motion.div
                  key={work.id}
                  onViewportEnter={() => setActive(i)}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="tick-rule py-10 group"
                >
                  <Link href={`/work/${work.slug}`} className="block">
                    <div className="flex items-baseline justify-between gap-4 mb-3">
                      <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight group-hover:text-text-secondary transition-colors">
                        {work.company}
                      </h3>
                      <span className="text-[10px] uppercase tracking-widest text-text-muted tabular-nums flex-shrink-0">
                        {work.startDate.split('-')[0]}
                      </span>
                    </div>
                    <p className="text-lg font-display font-semibold">{work.role}</p>
                    <p className="small-caps text-text-muted mt-1">
                      {work.type} / {work.location}
                    </p>
                    <p className="text-text-secondary mt-4 max-w-prose leading-relaxed">
                      {work.description}
                    </p>
                    {/* Inline metrics — also the mobile fallback where the exhibit is hidden */}
                    <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3 lg:hidden">
                      {work.metrics.slice(0, 2).map((m) => (
                        <div key={m.label}>
                          <span className="text-2xl font-display font-bold">{m.value}</span>
                          <p className="small-caps text-text-muted">{m.label}</p>
                        </div>
                      ))}
                    </div>
                    {work.caseStudy && (
                      <p className="mt-5 text-sm text-accent-primary inline-flex items-center gap-1.5">
                        View case study
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          &rarr;
                        </span>
                      </p>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
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
