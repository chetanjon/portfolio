'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function CTA() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl">
            Let&apos;s build something.
          </h2>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-text-primary rounded-full text-xs uppercase tracking-widest hover:bg-text-primary hover:text-bg-primary transition-colors"
          >
            Get in touch
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
