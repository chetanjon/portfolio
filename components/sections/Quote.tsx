'use client';

import { motion } from 'framer-motion';

export function Quote() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <span className="text-[10px] tracking-widest uppercase text-text-muted">
            [ Engineer turned product builder ]
          </span>

          <p className="font-serif text-xl md:text-2xl lg:text-3xl leading-relaxed">
            Engineering taught me <em>to debug systems.</em> Product management
            taught me to debug businesses. The tools are different. The mindset isn&apos;t.
          </p>

          <div>
            <p className="text-xs tracking-widest uppercase font-medium">
              Chetan Jonnalagadda
            </p>
            <p className="text-[11px] tracking-wider uppercase text-text-muted mt-1">
              PM who designs / Open to relocation
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
