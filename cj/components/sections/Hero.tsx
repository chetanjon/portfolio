'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Linkedin, Mail } from 'lucide-react';
import BlurText from '@/components/ui/BlurText';
import dynamic from 'next/dynamic';

const Aurora = dynamic(() => import('@/components/ui/Aurora'), { ssr: false });

const metrics = [
  { value: '30-35%', label: 'Activation Lift' },
  { value: '2.3x', label: 'Vendor Growth' },
  { value: '20%', label: 'Retention Uplift' },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 opacity-40">
        <Aurora
          colorStops={['#E07A5F', '#81B29A', '#E07A5F']}
          amplitude={1.2}
          speed={0.4}
          blend={0.6}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/30 via-transparent to-bg-primary" />

      <motion.div style={{ y, opacity }} className="relative z-10 container-wide py-32">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-8 h-px bg-accent-primary" />
            <span className="text-sm font-medium tracking-widest text-accent-primary uppercase">
              Product Manager
            </span>
          </motion.div>

          {/* Main heading - fixed two lines */}
          <div className="mb-6">
            <BlurText
              text="Hi, I'm Chetan."
              className="text-5xl sm:text-6xl md:text-7xl font-bold text-text-primary tracking-tight"
              delay={60}
              animateBy="chars"
              direction="bottom"
            />
            <div className="mt-2">
              <BlurText
                text="I build products that grow."
                className="text-5xl sm:text-6xl md:text-7xl font-bold text-text-tertiary tracking-tight"
                delay={40}
                animateBy="words"
                direction="bottom"
              />
            </div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mb-10 leading-relaxed"
          >
            B2B marketplace growth, seller experience, and data-driven product
            development. CSPO certified, MS in Management of Technology at ASU.
          </motion.p>

          {/* Metrics strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-wrap gap-8 mb-12"
          >
            {metrics.map((m, i) => (
              <div key={m.label}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.1 + i * 0.1 }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-text-primary">{m.value}</div>
                  <div className="text-xs text-text-muted uppercase tracking-wider mt-1">{m.label}</div>
                </motion.div>
              </div>
            ))}
          </motion.div>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="flex items-center gap-4"
          >
            <a
              href="/work"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-accent-primary text-white font-medium rounded-full hover:opacity-90 transition-all shadow-button"
            >
              View My Work
              <motion.span
                className="inline-block"
                animate={{ x: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                &rarr;
              </motion.span>
            </a>
            <a
              href="https://linkedin.com/in/cjonn"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border-default text-text-secondary hover:text-text-primary hover:border-border-hover transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:jonnalagadda8800@gmail.com"
              className="p-3 rounded-full border border-border-default text-text-secondary hover:text-text-primary hover:border-border-hover transition-all"
            >
              <Mail className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-5 h-5 text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
