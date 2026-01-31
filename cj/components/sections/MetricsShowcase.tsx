'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, BarChart3, Users } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';

const valueProps = [
  {
    icon: Target,
    title: 'Strategic Thinking',
    description:
      'Every feature ships with a clear hypothesis and success metric. Impact/effort scoring, RICE frameworks, and ruthless prioritization.',
    accent: 'rgba(224, 122, 95, 0.1)',
  },
  {
    icon: BarChart3,
    title: 'Data-Driven Decisions',
    description:
      'SQL, Mixpanel, Google Analytics — built seller dashboards that improved retention 20% by identifying at-risk sellers early.',
    accent: 'rgba(129, 178, 154, 0.1)',
  },
  {
    icon: Users,
    title: 'Cross-Functional Execution',
    description:
      'Led a 3-engineer team to ship verification flows, bulk catalog upload, and analytics dashboards. Intern to PM in 6 months.',
    accent: 'rgba(242, 204, 143, 0.1)',
  },
];

export function MetricsShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="section-padding">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-accent-secondary" />
            <span className="text-sm font-medium tracking-widest text-accent-secondary uppercase">Strengths</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
            What I Bring
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {valueProps.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <SpotlightCard className="p-6 h-full" spotlightColor={item.accent}>
                <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-border-default flex items-center justify-center mb-4">
                  <item.icon className="h-5 w-5 text-accent-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
