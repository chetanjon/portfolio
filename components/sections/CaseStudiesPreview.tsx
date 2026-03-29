'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionMarker } from '@/components/ui/SectionMarker';

const previewStudies = [
  {
    slug: 'notion',
    company: 'Notion',
    headline: "The $600M activation paradox",
    impact: '15-25% activation lift / $40-60M ARR',
  },
  {
    slug: 'aatram',
    company: 'Aatram',
    headline: 'From insight to App Store in weeks',
    impact: '0-to-1 / On-device AI / 35-40% retention',
  },
  {
    slug: 'cursor',
    company: 'Cursor',
    headline: 'The $29B Fork',
    impact: '$2B annualized revenue / Zero traditional marketing',
  },
];

export function CaseStudiesPreview() {
  return (
    <section className="py-20 md:py-28 px-6 bg-bg-secondary">
      <div className="container-wide">
        <div className="flex justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
          >
            <SectionMarker number="05" label="Research" />
            <h2 className="font-serif text-2xl md:text-3xl mt-4">Case studies</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Link
              href="/casestudies"
              className="text-[10px] tracking-widest uppercase text-text-muted hover:text-text-primary transition-colors"
            >
              View all &rarr;
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {previewStudies.map((study, i) => (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/casestudies/${study.slug}`} className="block group">
                <div className="bg-bg-primary border border-border-default rounded-lg p-6 md:p-7 hover:border-border-hover transition-colors h-full">
                  <span className="text-[10px] tracking-widest uppercase text-text-muted">
                    {study.company}
                  </span>
                  <h3 className="font-serif text-lg md:text-xl mt-2 mb-3 group-hover:text-text-secondary transition-colors">
                    {study.headline}
                  </h3>
                  <p className="text-xs text-accent-primary tracking-wide">
                    {study.impact}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
