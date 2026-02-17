'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navItems } from '@/lib/constants';
import ResumeModal from '@/components/ui/ResumeModal';
import { DarkModeToggle } from '@/components/ui/DarkModeToggle';
import { LogoMark } from '@/components/ui/LogoMark';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 60) {
        setVisible(true);
      } else if (currentScrollY < lastScrollY - 5) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY + 5) {
        setVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const headerVisible = visible || isMobileMenuOpen;

  const handleResumeClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResumeOpen(true);
  }, []);

  return (
    <>
      <motion.header
        animate={{ y: headerVisible ? 0 : '-100%' }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50 mix-blend-difference"
      >
        <div className="container-wide py-6 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-white group"
            aria-label="Chetan J — Home"
          >
            <LogoMark
              size={40}
              className="text-white transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/70 group-hover:text-white transition-colors">
              Chetan J
            </span>
          </Link>

          {/* Desktop Navigation - Hidden links, only visible in menu */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.slice(0, 5).map((item) => {
              const isResume = item.href === '/resume';

              if (isResume) {
                return (
                  <button
                    key={item.href}
                    onClick={handleResumeClick}
                    className="text-[10px] uppercase tracking-widest text-white/60 hover:text-white transition-opacity cursor-pointer"
                  >
                    {item.label}
                  </button>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-[10px] uppercase tracking-widest transition-opacity',
                    pathname === item.href || pathname.startsWith(item.href + '/')
                      ? 'text-white'
                      : 'text-white/60 hover:text-white'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            {/* Dark mode toggle - outside mix-blend for proper visibility */}
            <div className="mix-blend-normal">
              <DarkModeToggle />
            </div>

            {/* Menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="px-4 py-2 rounded-full border border-white/50 text-[10px] font-medium tracking-wider text-white uppercase hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              Menu
            </button>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-bg-primary flex flex-col"
          >
            {/* Close button */}
            <div className="container-wide py-6 flex justify-end">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-full border border-border-default hover:bg-text-primary hover:text-bg-primary transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu content */}
            <div className="flex-1 flex flex-col justify-center items-center">
              <nav className="flex flex-col items-center gap-4">
                {navItems.map((item, i) => {
                  const isResume = item.href === '/resume';
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                    >
                      {isResume ? (
                        <button
                          onClick={(e) => {
                            setIsMobileMenuOpen(false);
                            handleResumeClick(e);
                          }}
                          className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-text-secondary hover:text-text-primary transition-colors cursor-pointer flex items-center gap-3"
                        >
                          <FileText className="w-6 h-6 md:w-8 md:h-8" />
                          {item.label}
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            'text-4xl md:text-6xl font-display font-bold uppercase tracking-tight transition-colors',
                            isActive
                              ? 'text-text-primary'
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

              {/* Footer info in menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-16 text-center"
              >
                <p className="small-caps text-text-muted">
                  B2B Marketplaces / CSPO / ASU
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </>
  );
}
