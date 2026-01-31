import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

const variants = {
  primary:
    'bg-accent-primary text-white shadow-button hover:opacity-90 active:scale-[0.98]',
  secondary:
    'bg-bg-secondary text-text-primary border border-border-default hover:border-border-hover active:scale-[0.98]',
  ghost:
    'bg-transparent text-text-primary hover:bg-surface-hover active:scale-[0.98]',
  outline:
    'border border-accent-primary text-accent-primary hover:bg-accent-primary/5 active:scale-[0.98]',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  href,
  onClick,
  disabled,
  className,
  type = 'button',
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer',
    variants[variant],
    sizes[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
