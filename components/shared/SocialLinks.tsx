import { Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '@/data/personal';
import { cn } from '@/lib/utils';

interface SocialLinksProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function SocialLinks({ className, size = 'md' }: SocialLinksProps) {
  const iconSize = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5';

  const links = [
    { href: personalInfo.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { href: personalInfo.github, icon: Github, label: 'GitHub' },
    { href: `mailto:${personalInfo.email}`, icon: Mail, label: 'Email' },
  ];

  return (
    <div className={cn('flex items-center gap-4', className)}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith('mailto') ? undefined : '_blank'}
          rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
          className="text-text-tertiary hover:text-accent-primary transition-colors"
          aria-label={link.label}
        >
          <link.icon className={iconSize} />
        </a>
      ))}
    </div>
  );
}
