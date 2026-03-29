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
            taught me to debug businesses. The tools are different — the mindset isn&apos;t.
          </p>

          {/* Signature */}
          <svg
            className="w-28 h-auto mx-auto opacity-50"
            viewBox="0 0 200 80"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 60 C30 20, 50 15, 55 45 C58 55, 52 62, 48 55 C44 48, 50 30, 60 25 C70 20, 75 35, 70 45 C68 50, 62 48, 65 40 L80 25 C85 20, 95 30, 90 40 C88 45, 82 42, 85 35 L100 20 C108 15, 115 25, 110 38 C108 42, 102 40, 105 32 L120 18 C130 12, 140 25, 135 38 L150 20 C155 15, 165 22, 160 35 C158 40, 150 38, 155 30 L170 18 C178 14, 185 25, 180 38" />
          </svg>

          <div>
            <p className="text-xs tracking-widest uppercase font-medium">
              Chetan Jonnalagadda
            </p>
            <p className="text-[11px] tracking-wider uppercase text-text-muted mt-1">
              Product Manager / Open to relocation
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
