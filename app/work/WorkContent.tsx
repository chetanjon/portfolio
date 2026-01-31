'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CaseStudyCard } from '@/components/shared/CaseStudyCard';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { workExperiences } from '@/data/work';

export function WorkContent() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const featured = workExperiences.filter((w) => w.featured);
  const other = workExperiences.filter((w) => !w.featured);

  return (
    <>
      <section ref={ref} className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-accent-primary" />
              <span className="text-sm font-medium tracking-widest text-accent-primary uppercase">Experience</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Work Experience
            </h1>
            <p className="text-lg text-text-secondary max-w-xl">
              Products I&apos;ve built and teams I&apos;ve worked with.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-wide">
          {featured.map((work, i) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="mb-8"
            >
              <CaseStudyCard work={work} featured className="max-w-3xl" />
            </motion.div>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {other.map((work, i) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <CaseStudyCard work={work} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
