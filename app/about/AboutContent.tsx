'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Timeline } from '@/components/sections/Timeline';
import { ContactCTA } from '@/components/sections/ContactCTA';
import SpotlightCard from '@/components/ui/SpotlightCard';

const values = [
  {
    quote: 'Ship early, learn fast',
    description:
      "Perfect is the enemy of good. I'd rather get a 70% solution in users' hands than a 100% solution that never ships.",
  },
  {
    quote: 'Data tells stories',
    description:
      'Numbers without context are just numbers. I focus on the narrative metrics tell us about our users.',
  },
  {
    quote: 'Users first, always',
    description:
      'The best product decisions come from deeply understanding the people who use your product. Everything starts with empathy.',
  },
  {
    quote: 'Simplicity is sophistication',
    description:
      'The hardest part of product management is deciding what not to build. Constraint breeds creativity.',
  },
];

export function AboutContent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.2 });

  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-wide">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-accent-primary" />
              <span className="text-sm font-medium tracking-widest text-accent-primary uppercase">About</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              About Me
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              From electrical engineering to product management — I&apos;ve always been drawn
              to solving complex problems at the intersection of technology and business.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-wide">
          <div className="max-w-3xl space-y-6 text-text-secondary leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              My path to product management started in electrical engineering at JNTU Hyderabad.
              While studying circuits and systems, I discovered that my real passion was
              understanding how technology could solve real-world problems — not just the
              technical challenge, but the human one.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              That curiosity led me to product operations at Gangothri Nutrients, where I analyzed
              regional sales data across 3,700+ dealers and supported go-to-market launches that
              achieved 85% dealer adoption. I earned my CSPO certification and dove deeper into
              Agile methodologies.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              At IKT INDIA, everything came together. Starting as a PM Intern, I conducted 15+
              seller interviews and mapped the end-to-end journey, identifying 3 critical drop-off
              points. After converting to Product Manager in 6 months, I scaled the B2B handloom
              marketplace from 20 to 45+ vendors, improved activation by 30-35%, and built seller
              analytics dashboards that improved 60-day retention by 20%.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Now at Arizona State University pursuing my MS in Management of Technology (GPA: 3.6),
              I&apos;m combining academic rigor with hands-on experience — working on projects
              from behavioral compatibility platforms to global innovation analytics using Python
              and statistical methods.
            </motion.p>
          </div>
        </div>
      </section>

      <section ref={valuesRef} className="section-padding border-t border-border-default">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
              What I Believe In
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.quote}
                initial={{ opacity: 0, y: 20 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <SpotlightCard className="p-6 h-full">
                  <p className="text-lg font-semibold text-accent-primary mb-2">
                    &ldquo;{v.quote}&rdquo;
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">{v.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-border-default">
        <div className="container-wide">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-text-primary mb-10"
          >
            My Path
          </motion.h2>
          <Timeline />
        </div>
      </section>

      <section className="section-padding border-t border-border-default">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
              Beyond Work
            </h2>
            <p className="text-text-secondary leading-relaxed">
              When I&apos;m not thinking about product metrics, you&apos;ll find me exploring
              the food scene in Tempe, reading about behavioral economics, or debating the merits
              of different prioritization frameworks with fellow PMs. I believe the best product
              thinkers are curious about everything — because great ideas come from unexpected places.
            </p>
          </motion.div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
