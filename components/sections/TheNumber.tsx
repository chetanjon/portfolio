'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { CountUp } from '@/components/ui/CountUp';

export function TheNumber() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative py-32 md:py-40 px-6 bg-bg-primary overflow-hidden">
      <div className="container-wide">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="small-caps text-text-muted mb-6">[ The number that earns the call ]</p>

          <h2 className="font-display font-black tracking-tight leading-[0.9] tabular-nums text-accent-primary text-[clamp(7rem,22vw,20rem)] min-w-0">
            <CountUp to={7} />
          </h2>

          <p className="mt-8 font-display text-xl md:text-2xl lg:text-3xl text-text-primary leading-tight max-w-2xl mx-auto">
            Days. First commit to App Store.
            <br />
            <span className="text-text-secondary">Aatram V1, three-person founding team.</span>
          </p>

          <p className="mt-10 font-display text-base md:text-lg text-text-tertiary max-w-2xl mx-auto leading-relaxed">
            158 commits. 16 archetype interviews. SwiftUI Canvas logo drawn in code.
            On-device AI nudge engine on Apple Foundation Models.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
