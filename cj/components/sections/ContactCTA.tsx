'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { personalInfo } from '@/data/personal';

export function ContactCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-20 md:py-28 border-t border-border-default">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Let&apos;s Build Something Together
          </h2>
          <p className="text-text-secondary mb-8">
            I&apos;m actively seeking PM roles (H1B sponsorship required). Let&apos;s talk about
            how I can contribute to your product team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-primary text-white font-medium rounded-full hover:opacity-90 transition-all shadow-button"
            >
              Get In Touch
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border-default text-text-secondary hover:text-text-primary hover:border-border-hover font-medium rounded-full transition-all"
            >
              LinkedIn
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
