'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, FileText, ArrowRight } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[1200] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-lg bg-bg-secondary rounded-2xl border border-border-default overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close resume"
              className="absolute top-4 right-4 p-2 text-text-primary hover:bg-surface-hover rounded-lg transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full border border-border-default flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-text-muted" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-text-primary">Resume</h2>
                  <p className="text-xs text-text-muted small-caps">Chetan Jonnalagadda · PM who designs</p>
                </div>
              </div>

              <p className="text-text-secondary text-sm leading-relaxed mb-8">
                Co-founder PM who designs end-to-end. Shipped a consumer iOS app in seven days,
                rewrote V2 as an anti-interruption product, and scaled a seed-stage B2B marketplace
                3.75x with 2x GMV. Three ways in:
              </p>

              <div className="space-y-3">
                <Link
                  href="/resume"
                  onClick={onClose}
                  className="flex items-center justify-between gap-3 px-5 py-4 bg-text-primary text-bg-primary rounded-xl hover:opacity-80 transition-opacity group"
                >
                  <div className="text-left">
                    <p className="text-sm font-semibold">View full resume</p>
                    <p className="text-xs opacity-70 mt-0.5">Structured page with experience, projects, and skills</p>
                  </div>
                  <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <a
                  href="/Chetan_Jonnalagadda_PM_Resume.pdf"
                  download
                  className="flex items-center justify-between gap-3 px-5 py-4 border border-border-default rounded-xl hover:border-text-muted transition-colors group"
                >
                  <div className="text-left">
                    <p className="text-sm font-semibold">Download PDF</p>
                    <p className="text-xs text-text-muted mt-0.5">One-page master, ATS-friendly</p>
                  </div>
                  <Download className="w-4 h-4 shrink-0 text-text-muted" />
                </a>

                <a
                  href="/Chetan_Jonnalagadda_PM_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 px-5 py-4 border border-border-default rounded-xl hover:border-text-muted transition-colors group"
                >
                  <div className="text-left">
                    <p className="text-sm font-semibold">Open PDF in new tab</p>
                    <p className="text-xs text-text-muted mt-0.5">Native browser viewer</p>
                  </div>
                  <ExternalLink className="w-4 h-4 shrink-0 text-text-muted" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
