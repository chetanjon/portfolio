'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function QuickAbout() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="section-padding border-t border-border-default">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 items-start"
        >
          {/* Label side */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-accent-tertiary" />
              <span className="text-sm font-medium tracking-widest text-accent-tertiary uppercase">About</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
              A product person who cares about the details.
            </h2>
          </div>

          {/* Content side */}
          <div>
            <p className="text-text-secondary leading-relaxed mb-6">
              From electrical engineering at JNTU Hyderabad to scaling a B2B handloom
              marketplace at IKT INDIA — I&apos;ve always been drawn to solving problems at the
              intersection of technology and business. I&apos;ve shipped seller verification flows,
              built analytics dashboards, and improved activation by 30-35% with a 3-person
              engineering team. Now pursuing my MS in Management of Technology at ASU,
              combining academic rigor with hands-on product experience.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-accent-primary transition-colors"
            >
              More about me <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
