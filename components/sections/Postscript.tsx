'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AatramLogoSVG } from '@/components/ui/AatramLogoSVG';

export function Postscript() {
  return (
    <section className="pb-20 md:pb-28 px-6 bg-bg-primary">
      <div className="max-w-xl mx-auto text-center">
        <div className="h-px w-16 mx-auto bg-border-default mb-12" />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <p className="small-caps text-text-muted mb-8">P. S.</p>

          <Link
            href="/craft"
            aria-label="Read more about how I drew the Aatram logo in code"
            className="group inline-block"
          >
            <AatramLogoSVG
              className="w-28 h-28 md:w-32 md:h-32 mx-auto transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </Link>

          <p className="font-serif italic text-text-secondary text-base md:text-lg leading-relaxed mt-8 max-w-md mx-auto">
            Aatram&rsquo;s logo. I drew the original in code:
            <br />
            80 SwiftUI Canvas stroke segments.
          </p>

          <Link
            href="/craft"
            className="inline-block mt-6 text-[10px] uppercase tracking-[0.28em] text-text-muted hover:text-text-primary transition-colors"
          >
            See how &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
