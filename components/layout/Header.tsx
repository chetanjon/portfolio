'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navItems } from '@/lib/constants';
import ResumeModal from '@/components/ui/ResumeModal';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleResumeClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResumeOpen(true);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
        {/* Dynamic Island */}
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className={cn(
            'pointer-events-auto relative flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-500',
            isScrolled
              ? 'bg-bg-secondary/80 backdrop-blur-xl border border-border-default shadow-lg'
              : 'bg-bg-secondary/50 backdrop-blur-md border border-white/[0.04]'
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="px-4 py-1.5 text-sm font-bold text-text-primary hover:text-accent-primary transition-colors"
          >
            CJ
          </Link>

          {/* Divider */}
          <div className="hidden md:block w-px h-4 bg-border-default" />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              const isResume = item.href === '/resume';

              if (isResume) {
                return (
                  <button
                    key={item.href}
                    onClick={handleResumeClick}
                    className={cn(
                      'relative px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer',
                      'text-text-secondary hover:text-text-primary'
                    )}
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      {item.label}
                    </span>
                  </button>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200',
                    isActive
                      ? 'text-text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-white/[0.06] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-white/[0.06] transition-colors cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4 text-text-primary" />
            ) : (
              <Menu className="h-4 w-4 text-text-primary" />
            )}
          </button>
        </motion.nav>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg-primary/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-6">
              {navItems.map((item, i) => {
                const isResume = item.href === '/resume';
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    {isResume ? (
                      <button
                        onClick={(e) => {
                          setIsMobileMenuOpen(false);
                          handleResumeClick(e);
                        }}
                        className={cn(
                          'text-3xl font-medium transition-colors cursor-pointer',
                          'text-text-secondary hover:text-text-primary'
                        )}
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'text-3xl font-medium transition-colors',
                          pathname === item.href
                            ? 'text-accent-primary'
                            : 'text-text-secondary hover:text-text-primary'
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </>
  );
}
