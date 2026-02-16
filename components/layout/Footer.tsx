import Link from 'next/link';
import { personalInfo } from '@/data/personal';
import { navItems } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border-default py-16 md:py-24">
      <div className="container-wide">
        {/* Navigation links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12">
          {navItems.slice(0, 4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[10px] uppercase tracking-widest text-text-muted hover:text-text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-6 mb-8">
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] uppercase font-medium tracking-wide border-b border-transparent hover:border-current transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] uppercase font-medium tracking-wide border-b border-transparent hover:border-current transition-colors"
          >
            GitHub
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-[10px] uppercase font-medium tracking-wide border-b border-transparent hover:border-current transition-colors"
          >
            Email
          </a>
        </div>

        {/* Email highlight */}
        <div className="text-center mb-16">
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-xs font-bold tracking-wider uppercase border-b-2 border-current pb-0.5 hover:opacity-70 transition-opacity"
          >
            {personalInfo.email.toUpperCase()}
          </a>
        </div>

        {/* Large typography */}
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-center uppercase leading-none tracking-tighter opacity-90 mb-12">
          Product
          <span className="font-serif italic font-normal lowercase"> Manager</span>
        </h2>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-wide text-text-muted border-t border-border-default pt-6 gap-4">
          <div className="flex gap-2">
            <span>&copy; {new Date().getFullYear()} {personalInfo.fullName}</span>
            <span>&middot;</span>
            <span>All Rights Reserved</span>
          </div>
          <div className="flex items-center gap-1">
            <span>{personalInfo.visaStatus}</span>
          </div>
          <Link
            href="#top"
            className="px-3 py-1 border border-current rounded-full hover:bg-text-primary hover:text-bg-primary transition-colors"
          >
            Scroll to Top
          </Link>
        </div>
      </div>
    </footer>
  );
}
