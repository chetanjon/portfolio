import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  className?: string;
  background?: 'default' | 'subtle' | 'dark';
  padding?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const bgStyles = {
  default: 'bg-bg-primary',
  subtle: 'bg-surface-hover',
  dark: 'bg-bg-dark text-white',
};

const paddingStyles = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-20 md:py-32',
};

export function Section({
  id,
  className,
  background = 'default',
  padding = 'md',
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn(bgStyles[background], paddingStyles[padding], className)}>
      {children}
    </section>
  );
}
