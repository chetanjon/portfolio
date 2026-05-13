'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowDown, ArrowUpRight } from 'lucide-react';
import { HeroGlow } from '@/components/sections/HeroGlow';

function PhoneShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-[2.2rem] border-[5px] border-text-primary/85 bg-text-primary/85 shadow-2xl ${className ?? ''}`}
    >
      <div className="overflow-hidden rounded-[1.8rem]">{children}</div>
    </div>
  );
}

function BrowserShell({
  children,
  url,
  className,
}: {
  children: React.ReactNode;
  url: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-border-hover bg-bg-secondary shadow-2xl ${className ?? ''}`}
    >
      <div className="flex items-center gap-1.5 border-b border-border-default px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-accent-soft/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent-soft/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent-soft/25" />
        <span className="ml-3 text-[10px] font-mono text-text-muted">{url}</span>
      </div>
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen overflow-hidden bg-bg-primary flex flex-col"
    >
      <HeroGlow />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex-1 flex flex-col max-w-[1500px] w-full mx-auto px-6 md:px-10 pt-32 pb-12"
      >
        {/* Top meta — open to roles */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-end"
        >
          <p className="flex items-center gap-2 text-[11px] md:text-xs uppercase tracking-[0.28em] text-text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Open to roles
          </p>
        </motion.div>

        {/* Main two-column composition */}
        <div className="mt-10 md:mt-14 lg:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-16 items-center flex-1">
          {/* Left: identity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-5"
          >
            <p className="font-serif italic font-normal text-text-secondary text-xl md:text-2xl mb-4">
              Chetan Jonnalagadda.
            </p>

            <h1 className="leading-[0.95]">
              <span className="block font-serif italic font-normal text-text-primary text-3xl md:text-4xl lg:text-5xl">
                Product manager who
              </span>
              <span className="block font-display font-black uppercase tracking-tight text-text-primary text-5xl md:text-6xl lg:text-7xl xl:text-8xl mt-1 md:mt-2">
                ships full apps.
              </span>
            </h1>

            <p className="mt-8 md:mt-10 max-w-md text-text-secondary leading-relaxed text-base md:text-lg">
              Co-founded{' '}
              <span className="text-text-primary font-medium">Aatram</span>, a consumer iOS app live
              on the App Store. Built{' '}
              <span className="text-text-primary font-medium">FrictionLens</span> end-to-end as a
              solo founder. Took an Indian B2B marketplace from 20 to 75+ vendors and doubled GMV at
              seed stage.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-primary text-accent-on text-xs uppercase tracking-widest font-medium hover:opacity-85 transition-opacity"
              >
                View work
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/resume"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border-default text-text-primary text-xs uppercase tracking-widest font-medium hover:border-text-primary transition-colors"
              >
                Resume
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Right: product composite */}
          <div className="lg:col-span-7">
            {/* Mobile / tablet: stacked */}
            <div className="lg:hidden flex flex-col items-center gap-6">
              <PhoneShell className="w-full max-w-[240px]">
                <Image
                  src="/products/aatram-home.jpg"
                  alt="Aatram — live on the App Store"
                  width={1290}
                  height={2560}
                  className="w-full h-auto"
                  priority
                />
              </PhoneShell>
              <BrowserShell url="frictionlens.net" className="w-full max-w-[440px]">
                <Image
                  src="/products/frictionlens-landing.png"
                  alt="FrictionLens — live at frictionlens.net"
                  width={1920}
                  height={1080}
                  className="w-full h-auto"
                />
              </BrowserShell>
            </div>

            {/* Desktop: overlapping composite */}
            <div className="hidden lg:block relative h-[540px] xl:h-[620px]">
              {/* Browser back-right, slight rotation */}
              <motion.div
                initial={{ opacity: 0, x: 40, rotate: 6 }}
                animate={{ opacity: 1, x: 0, rotate: 3 }}
                transition={{ duration: 0.9, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute right-0 top-[14%] w-[58%] max-w-[500px] origin-bottom-left"
              >
                <BrowserShell url="frictionlens.net">
                  <Image
                    src="/products/frictionlens-landing.png"
                    alt="FrictionLens"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                  />
                </BrowserShell>
                <p className="absolute -bottom-7 right-0 text-[10px] uppercase tracking-[0.25em] text-text-muted">
                  FrictionLens
                </p>
              </motion.div>

              {/* Phone front-left, slight counter rotation, hovers on top */}
              <motion.div
                initial={{ opacity: 0, x: -24, rotate: -6 }}
                animate={{ opacity: 1, x: 0, rotate: -2 }}
                transition={{ duration: 0.9, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute left-[4%] xl:left-[6%] top-1/2 -translate-y-1/2 w-[42%] max-w-[260px] z-10 origin-bottom-right"
              >
                <PhoneShell>
                  <Image
                    src="/products/aatram-home.jpg"
                    alt="Aatram"
                    width={1290}
                    height={2560}
                    className="w-full h-auto"
                    priority
                  />
                </PhoneShell>
                <p className="absolute -bottom-7 left-0 text-[10px] uppercase tracking-[0.25em] text-text-muted">
                  Aatram
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom rail — product wayfinding */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        style={{ opacity }}
        className="relative z-10 max-w-[1500px] w-full mx-auto px-6 md:px-10 pb-10 md:pb-12"
      >
        <div className="border-t border-border-default pt-6 grid grid-cols-2 md:grid-cols-3 items-center gap-4">
          <a
            href="https://apps.apple.com/us/app/aatram/id6760587556"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.25em] text-text-muted hover:text-text-primary transition-colors justify-self-start"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Aatram · Live on the App Store
            <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </a>

          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden md:flex w-10 h-10 rounded-full border border-border-default items-center justify-center text-text-muted justify-self-center"
            aria-label="Scroll"
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>

          <a
            href="https://www.frictionlens.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.25em] text-text-muted hover:text-text-primary transition-colors justify-self-end text-right"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            FrictionLens · frictionlens.net
            <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </a>
        </div>
      </motion.div>

      <div className="gradient-section-fade" aria-hidden="true" />
    </section>
  );
}
