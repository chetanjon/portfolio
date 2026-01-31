import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CardProps {
  variant?: 'default' | 'elevated' | 'bordered' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  className?: string;
}

const variantStyles = {
  default: 'bg-bg-secondary rounded-xl',
  elevated: 'bg-bg-secondary rounded-xl shadow-md',
  bordered: 'bg-bg-secondary rounded-xl border border-border-default',
  interactive:
    'bg-bg-secondary rounded-xl shadow-sm border border-border-default hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
};

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  variant = 'default',
  padding = 'md',
  children,
  href,
  className,
}: CardProps) {
  const classes = cn(variantStyles[variant], paddingStyles[padding], className);

  if (href) {
    return (
      <Link href={href} className={cn(classes, 'block')}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}
