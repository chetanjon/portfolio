'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionMarker } from '@/components/ui/SectionMarker';
import Image from 'next/image';
import Link from 'next/link';

const values = [
  {
    number: '01',
    quote: 'Empathy scales better than features',
    description:
      "I've interviewed artisans who'd never touched a smartphone. Watching them struggle with a 3-day onboarding flow changed what 'simple UX' meant forever. Deep user understanding is the only sustainable product advantage.",
  },
  {
    number: '02',
    quote: 'Data informs, context decides',
    description:
      'I built the seller analytics dashboard before adding new features, not because analytics is always urgent, but because flying blind is worse than moving slow. Numbers tell you what happened. Users tell you why.',
  },
  {
    number: '03',
    quote: 'Ship the 70%, kill the 90%',
    description:
      'The best insight I had at IKT India came from a half-finished feature. I would rather get a functional MVP in front of real users than perfect a spec no one has validated. Done beats perfect every time.',
  },
  {
    number: '04',
    quote: 'Every no earns a better yes',
    description:
      "At Aatram with a 3-person founding team, and at IKT India with a 4-engineer team and a growing vendor base, I learned to say no relentlessly. Scope discipline is how small teams punch above their weight. The features we didn't build were as important as the ones we did.",
  },
];

const timeline = [
  { year: '2019–2023', title: 'B.Tech in Electrical & Electronics Engineering', place: 'JNTU Hyderabad' },
  { year: '2023', title: 'Product Ops Intern', place: 'Gangothri Nutrients · Excel sales model, FAQ authoring' },
  { year: '2023', title: 'PM Intern → Product Manager', place: 'IKT India · B2B handloom marketplace (20 → 75+ vendors)' },
  { year: '2024', title: 'M.S. in Management of Technology', place: 'Arizona State University' },
  { year: '2025', title: 'Innovation Index Analysis', place: 'ASU MOT · G20 vs non-G20 (1,862 records)' },
  { year: '2025', title: 'CSPO Certified', place: 'Scrum Alliance' },
  { year: '2025', title: 'Digital Product Management', place: 'University of Virginia (Coursera)' },
  { year: '2026', title: 'Launched FrictionLens', place: 'frictionlens.net · AI review analyzer' },
  { year: '2026', title: 'Co-Founder & Product Manager', place: 'Aatram · iOS app live on the App Store' },
  { year: '2026', title: 'M.S. Graduation', place: 'Arizona State University' },
];

export function AboutContent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 bg-bg-secondary pointer-events-none"
        />
        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <SectionMarker number="01" label="About" className="mb-8" />
              <div className="relative group max-w-md">
                <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                  <Image
                    src="/potrait.jpg"
                    alt="Chetan Jonnalagadda"
                    fill
                    className="object-cover object-top img-grayscale transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 border border-border-default pointer-events-none" />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="absolute -bottom-4 -right-4 bg-text-primary text-bg-primary text-[9px] uppercase tracking-widest px-3 py-2"
                >
                  Phoenix, AZ
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-[0.95]">
                About
                <br />
                <span className="font-serif italic font-normal lowercase">me</span>
              </h1>

              <p className="text-text-secondary leading-relaxed mb-6">
                PM by title, designer by instinct. Co-Founder at{' '}
                <span className="font-serif italic text-text-primary">Aatram</span>, a consumer iOS app
                live on the App Store. Solo designer + engineer behind{' '}
                <span className="font-serif italic text-text-primary">FrictionLens</span>, a full-stack
                AI review analyzer. Before that, grew a seed-stage B2B handloom marketplace from 20 to
                75+ vendors and doubled GMV. Just graduated with my M.S. in Management of Technology
                from Arizona State University, 3.7 GPA.
              </p>

              <p className="text-text-secondary leading-relaxed mb-10">
                The throughline: I find the problem worth solving, then ship the fix. End-to-end.
                Product, design, brand, and increasingly the code.
              </p>

              {/* By the numbers */}
              <div className="mb-10">
                <p className="small-caps text-text-muted mb-4">By the numbers</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6 border-t border-border-default pt-6">
                  {[
                    { value: '7 days', label: 'V1 to App Store' },
                    { value: '158', label: 'SwiftUI commits' },
                    { value: '20 → 75+', label: 'Vendors at IKT' },
                    { value: '2x', label: 'Monthly GMV' },
                    { value: '3.7', label: 'M.S. GPA · ASU' },
                    { value: '5.0★', label: 'Launch rating' },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="font-display font-bold text-2xl md:text-3xl">{stat.value}</p>
                      <p className="small-caps text-text-muted mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  href="/work"
                  className="px-6 py-3 rounded-full border border-text-primary hover:bg-text-primary hover:text-bg-primary transition-colors text-sm uppercase tracking-wider"
                >
                  View Work
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-full bg-text-primary text-bg-primary hover:opacity-80 transition-opacity text-sm uppercase tracking-wider"
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-bg-secondary">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <SectionMarker number="02" label="Philosophy" className="mb-8" />

            <h2 className="text-4xl md:text-5xl font-display font-bold mb-16">
              What I
              <span className="font-serif italic font-normal lowercase"> believe in</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.quote}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 border border-border-default rounded-lg hover:border-border-hover transition-colors"
              >
                <span className="text-4xl font-display font-bold text-text-muted/30 mb-4 block">
                  {v.number}
                </span>
                <p className="text-lg font-display font-semibold mb-2">
                  &ldquo;{v.quote}&rdquo;
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <SectionMarker number="03" label="Journey" className="mb-8" />

            <h2 className="text-4xl md:text-5xl font-display font-bold mb-16">
              My
              <span className="font-serif italic font-normal lowercase"> path</span>
            </h2>
          </motion.div>

          <div className="max-w-2xl border-t border-border-default">
            {timeline.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-8 py-6 border-b border-border-default"
              >
                <span className="text-text-muted small-caps w-16 shrink-0">{item.year}</span>
                <div>
                  <h3 className="font-display font-semibold">{item.title}</h3>
                  <p className="text-sm text-text-muted">{item.place}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond Work Section */}
      <section className="py-24 bg-bg-secondary">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <SectionMarker number="04" label="Personal" className="mb-8" />

            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Beyond
              <span className="font-serif italic font-normal lowercase"> work</span>
            </h2>

            <p className="text-text-secondary leading-relaxed max-w-2xl mb-12">
              The stuff that keeps me sharp outside of product. Heavy on input, heavy on output,
              and a lot of coffee in between.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border-default border border-border-default">
            {[
              { name: 'Books', detail: 'Behavioral econ, founder memoirs, anything about how people actually decide.' },
              { name: 'Running', detail: 'Long, slow, alone. The best PRD edits happen around mile three.' },
              { name: 'Coffee', detail: 'Mildly obsessed. Pour-over at home, espresso anywhere worth lining up for.' },
              { name: 'Gym', detail: 'Five days a week. Hard physical work is the cheapest reset button I know.' },
              { name: 'Friends & parties', detail: 'Throwing them, hosting them, ending up at them. The best teams I have built started over food.' },
              { name: 'Cricket', detail: 'Die-hard India fan. The closest I get to letting a result actually ruin my week.' },
            ].map((hobby, i) => (
              <motion.div
                key={hobby.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                className="bg-bg-secondary p-6 md:p-8 hover:bg-bg-primary transition-colors"
              >
                <p className="font-serif italic text-2xl md:text-3xl mb-3 lowercase">{hobby.name}</p>
                <p className="text-sm text-text-secondary leading-relaxed">{hobby.detail}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-text-secondary leading-relaxed max-w-2xl mt-12"
          >
            Engineering background keeps me grounded in &ldquo;is this actually buildable?&rdquo;
            Business education keeps me asking &ldquo;but does this move the needle?&rdquo; The best
            product decisions sit at that intersection.
          </motion.p>
        </div>
      </section>
    </>
  );
}
