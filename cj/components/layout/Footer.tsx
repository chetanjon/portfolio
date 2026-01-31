import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '@/data/personal';
import { navItems } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border-default bg-bg-primary/80 backdrop-blur-xl">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="text-xl font-bold text-text-primary">
              CJ
            </Link>
            <p className="mt-3 text-sm text-text-muted max-w-xs">
              Product Manager building data-driven products that create measurable impact.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-tertiary hover:text-text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">
              Connect
            </h4>
            <div className="flex gap-4">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-4 text-xs text-text-muted">
              Open to opportunities &middot; {personalInfo.visaStatus}
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border-default text-center">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} {personalInfo.fullName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
