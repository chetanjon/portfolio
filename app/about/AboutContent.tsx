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
  { year: '2026', title: 'M.S. Graduation (Expected)', place: 'Arizona State University' },
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
                  Tempe, AZ
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
                My path from electrical engineering to product management wasn&apos;t a pivot. It was
                an evolution. Engineering trained me to think in systems: identify inputs, model behaviors,
                debug failures. Product management just means applying those same mental models to human
                systems instead of electrical ones.
              </p>

              <p className="text-text-secondary leading-relaxed mb-6">
                Right now I&apos;m Co-Founder &amp; Product Manager at Aatram, a consumer iOS app live
                on the App Store. With a 3-person founding team we shipped V1 seven days from first
                commit on a SwiftUI, SwiftData, WidgetKit, and FamilyControls stack, and launched at
                a 5.0 App Store rating. I own product, design, and brand: the design system, the logo,
                aatram.com, and the positioning that reframes procrastination as an emotion-regulation
                problem rather than a discipline one. After 16 segmented interviews across procrastination
                archetypes I killed V1&apos;s Plan Mode, shipped V2 Study Rooms and Crew for social
                accountability, and specced an on-device nudge engine on Apple Foundation Models.
              </p>

              <p className="text-text-secondary leading-relaxed mb-6">
                Before Aatram, I cut my teeth at IKT India, where I took a seed-stage B2B handloom
                marketplace from 20 vendors to 75+ across multiple states, promoted from intern to PM
                inside of six months. The unlock was a concurrent A/B test on 50 SKUs with price floors
                against a matched control; order volume held flat, so I scaled the winner to 500+ SKUs,
                lifted gross margin from 25% to 40%, and doubled monthly GMV. Along the way I cut seller
                onboarding from 3 days to 6 hours, built the SQL + Mixpanel seller-health dashboard
                whose inactivity triggers lifted 60-day retention 20%, and ran weekly standups with a
                4-engineer team shipping across web, mobile, and ops.
              </p>

              <p className="text-text-secondary leading-relaxed mb-8">
                I&apos;m finishing my M.S. in Management of Technology at Arizona State University
                (May 2026, 3.7 GPA), where my coursework includes a Python-driven G20 vs non-G20
                innovation index analysis across 1,862 records. CSPO (Scrum Alliance) and Digital
                Product Management (UVA, Coursera) certified.
              </p>

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
            className="max-w-2xl"
          >
            <SectionMarker number="04" label="Personal" className="mb-8" />

            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
              Beyond
              <span className="font-serif italic font-normal lowercase"> work</span>
            </h2>

            <p className="text-text-secondary leading-relaxed mb-6">
              When I&apos;m not rebuilding funnels or writing PRDs, I&apos;m watching cricket
              (die-hard India fan), exploring every new restaurant that opens in Tempe, or reading
              about behavioral economics and how people actually make decisions, which turns out
              to be very useful for a PM. I&apos;m also mildly obsessed with how startups in
              emerging markets solve problems that Silicon Valley tools weren&apos;t designed for.
              There&apos;s a whole product design language invented out of necessity, and it&apos;s
              where I feel most at home.
            </p>

            <p className="text-text-secondary leading-relaxed">
              My engineering background keeps me grounded in &ldquo;is this actually buildable?&rdquo;
              while my business education keeps me asking &ldquo;but does this move the needle?&rdquo;
              The best product decisions sit at that intersection: technically pragmatic and
              commercially ambitious at the same time.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
