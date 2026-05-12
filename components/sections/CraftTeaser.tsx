'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionMarker } from '@/components/ui/SectionMarker';
import { AatramLogoSVG } from '@/components/ui/AatramLogoSVG';
import { TokenSwatches } from '@/components/ui/TokenSwatches';
import { MomentumGauge } from '@/components/ui/MomentumGauge';

export function CraftTeaser() {
  return (
    <section className="py-20 md:py-28 px-6 bg-bg-secondary">
      <div className="gauge-divider mb-12 max-w-3xl mx-auto" />
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <SectionMarker number="02" label="Craft" />
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mt-4 leading-[1.05] mb-4">
            Most PM portfolios show what shipped.
            <br />
            <span className="italic">This one shows how.</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mb-12">
            Design tokens, a vector logo drawn in code, an instrument-style momentum gauge, a motion
            language that does semantic work, and an anti-cheerleader voice ruleset enforced in code
            review. The verb chain from research through brand, motion, and launch, made legible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="bg-bg-primary border border-border-default rounded-lg p-6 flex flex-col items-center justify-center"
          >
            <AatramLogoSVG className="w-32 h-32" />
            <p className="text-[10px] uppercase tracking-widest text-text-muted mt-4 text-center">
              Logo · 80 SwiftUI Canvas segments
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="bg-bg-primary border border-border-default rounded-lg p-6 flex flex-col items-center justify-center"
          >
            <MomentumGauge value={68} className="w-44 h-auto" />
            <p className="text-[10px] uppercase tracking-widest text-text-muted mt-2 text-center">
              MomentumArc · 240° instrument gauge
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="bg-bg-primary border border-border-default rounded-lg p-6 flex flex-col justify-center"
          >
            <p className="text-[10px] uppercase tracking-widest text-text-muted mb-4">Design tokens</p>
            <TokenSwatches compact />
            <p className="font-serif italic text-lg mt-6 text-text-secondary">&ldquo;We&apos;re ON.&rdquo;</p>
            <p className="text-[10px] uppercase tracking-widest text-text-muted mt-1">Canonical voice line</p>
          </motion.div>
        </div>

        <Link
          href="/craft"
          className="link-underline inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase text-accent-mint"
        >
          See how I work
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
