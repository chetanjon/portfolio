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
  const [scrolled, setScrolled] = useState(false);
  const [prevPathname, setPrevPathname] = useState('');
  const pathname = usePathname();

  // React 19 idiom: reset state when a prop changes by comparing during render.
  // Handles browser back/forward and programmatic navigation; explicit Link onClicks still close too.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Any /casestudies page (index + sub-pages): avoid mix-blend-difference.
  // Also treat /projects, /work, /about, /resume, /contact as "content pages"
  // so their hero titles don't collide with the header via difference blending.
  const isContentPage =
    pathname.startsWith('/casestudies') ||
    pathname.startsWith('/projects') ||
    pathname.startsWith('/work') ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/resume') ||
    pathname.startsWith('/contact');

  // Once the user has scrolled past the hero, the homepage header gets a solid
  // backdrop and switches to theme-aware text colors — same treatment as content
  // pages. mix-blend-difference is reserved for the unscrolled homepage hero only.
  const useSolidChrome = isContentPage || scrolled;
  const textStrong = useSolidChrome ? 'text-text-primary' : 'text-white';
  const textMuted = useSolidChrome ? 'text-text-muted hover:text-text-primary' : 'text-white/85 hover:text-white';
  const textSubtle = useSolidChrome ? 'text-text-secondary group-hover:text-text-primary' : 'text-white/90 group-hover:text-white';
  const pillBorder = useSolidChrome
    ? 'border-border-default text-text-primary hover:bg-text-primary hover:text-bg-primary'
    : 'border-white/50 text-white hover:bg-white hover:text-black';

  const handleResumeClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResumeOpen(true);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-[1000] transition-all duration-500',
          useSolidChrome
            ? 'bg-bg-primary/85 backdrop-blur-md border-b border-border-default'
            : 'mix-blend-difference'
        )}
      >
        <div className="container-wide py-9 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className={cn('flex items-center gap-2 group', textStrong)}
            aria-label="Chetan J · Home"
          >
            <LogoMark
              size={56}
              className={cn(textStrong, 'transition-transform duration-300 group-hover:scale-110')}
            />
            <span className={cn('hidden sm:inline text-[15px] font-medium tracking-[0.2em] uppercase transition-colors whitespace-nowrap', textSubtle)}>
              Chetan J.
            </span>
          </Link>

          {/* Desktop Navigation — trimmed to magazine-spread essentials.
              Everything else lives in the Menu overlay. */}
          <nav className="hidden md:flex items-center gap-10 lg:gap-14 text-[15px]">
            {navItems
              .filter((item) => ['/work', '/casestudies', '/about', '/resume', '/contact'].includes(item.href))
              .map((item) => {
                const isResume = item.href === '/resume';

                if (isResume) {
                  return (
                    <button
                      key={item.href}
                      onClick={handleResumeClick}
                      className={cn('text-[15px] uppercase tracking-widest transition-colors cursor-pointer whitespace-nowrap', textMuted)}
                    >
                      {item.label}
                    </button>
                  );
                }

                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'text-[15px] uppercase tracking-widest transition-colors whitespace-nowrap',
                      isActive ? textStrong : textMuted
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            {/* Dark mode toggle */}
            <div className={isContentPage ? '' : 'mix-blend-normal'}>
              <DarkModeToggle />
            </div>

            {/* Menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={cn(
                'px-6 py-3 rounded-full border text-[15px] font-medium tracking-wider uppercase transition-colors cursor-pointer',
                pillBorder
              )}
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
            className="fixed inset-0 z-[1001] bg-bg-primary flex flex-col"
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
