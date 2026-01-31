'use client';

import { motion } from 'framer-motion';
import type { TimelineItem } from '@/types';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { cn } from '@/lib/utils';

const timelineData: TimelineItem[] = [
  {
    year: '2024',
    title: 'M.S. in Management of Technology',
    subtitle: 'Arizona State University, Tempe, AZ',
    description: 'Pursuing graduate studies in technology management. GPA: 3.6.',
    type: 'education',
  },
  {
    year: '2025',
    title: 'CSPO Certification',
    subtitle: 'Scrum Alliance',
    description: 'Certified Scrum Product Owner — deepened Agile product management expertise.',
    type: 'certification',
  },
  {
    year: '2023',
    title: 'Product Manager',
    subtitle: 'IKT INDIA',
    description: 'Scaled B2B handloom marketplace from 20 → 45+ vendors. Improved activation by 30-35% and retention by 20%.',
    type: 'work',
  },
  {
    year: '2023',
    title: 'Product Management Intern',
    subtitle: 'IKT INDIA',
    description: 'Conducted 15+ seller interviews, identified 3 critical drop-off points. Converted to full-time PM.',
    type: 'work',
  },
  {
    year: '2023',
    title: 'Product Operations Intern',
    subtitle: 'Gangothri Nutrients & Fertilizers',
    description: 'Analyzed 3,700+ dealer sales data; reduced stockouts by 25%. Supported GTM for 2 new SKUs.',
    type: 'work',
  },
  {
    year: '2023',
    title: 'B.E. Electrical & Electronics Engineering',
    subtitle: 'JNTU Hyderabad, India',
    description: 'Completed undergraduate studies in electrical and electronics engineering.',
    type: 'education',
  },
];

const typeDotColor = {
  education: 'bg-accent-secondary',
  work: 'bg-accent-primary',
  certification: 'bg-accent-tertiary',
};

export function Timeline() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
      className="relative"
    >
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border-default md:-translate-x-px" />

      {timelineData.map((item, i) => (
        <motion.div
          key={`${item.year}-${item.title}`}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className={cn(
            'relative pl-12 md:pl-0 mb-10 last:mb-0',
            i % 2 === 0 ? 'md:pr-[50%] md:text-right' : 'md:pl-[50%]'
          )}
        >
          <div
            className={cn(
              'absolute left-2.5 md:left-1/2 w-3 h-3 rounded-full border-2 border-bg-primary md:-translate-x-1.5 top-1.5',
              typeDotColor[item.type]
            )}
          />

          <div className={cn('p-4 rounded-xl bg-bg-secondary border border-border-default', i % 2 === 0 ? 'md:mr-8' : 'md:ml-8')}>
            <span className="text-xs font-medium text-accent-primary">{item.year}</span>
            <h4 className="text-base font-semibold text-text-primary mt-1">{item.title}</h4>
            <p className="text-sm text-text-tertiary">{item.subtitle}</p>
            <p className="text-sm text-text-secondary mt-2">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
