'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, Mail } from 'lucide-react';
import ResumeModal from '@/components/ui/ResumeModal';

export function CTA() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <>
      <section className="py-24 md:py-32 px-6 relative">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-default text-[10px] tracking-widest uppercase text-text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Open to full-time PM roles · May 2026
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight">
              Hiring a PM who ships?
              <br />
              <span className="italic text-text-secondary">Let&apos;s talk.</span>
            </h2>

            <p className="text-sm md:text-base text-text-secondary max-w-md mx-auto">
              B2B marketplaces, AI products, 0-to-1, consumer iOS. Based in Tempe, AZ — open to
              relocation. CSPO certified.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-text-primary text-bg-primary rounded-full text-xs uppercase tracking-widest font-medium hover:opacity-80 transition-opacity"
              >
                <Mail className="w-3.5 h-3.5" />
                Get in touch
              </Link>
              <button
                onClick={() => setResumeOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 border border-border-default rounded-full text-xs uppercase tracking-widest font-medium hover:border-text-primary transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                View resume
              </button>
            </div>

            <p className="text-[10px] tracking-widest uppercase text-text-muted pt-2">
              jonnalagadda8800@gmail.com · (602) 807-9130
            </p>
          </motion.div>
        </div>
      </section>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
