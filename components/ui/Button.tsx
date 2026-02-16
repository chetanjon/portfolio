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
    'bg-text-primary text-bg-primary hover:opacity-80 active:scale-[0.98]',
  secondary:
    'bg-transparent text-text-primary border border-text-primary hover:bg-text-primary hover:text-bg-primary active:scale-[0.98]',
  ghost:
    'bg-transparent text-text-primary hover:opacity-60 active:scale-[0.98]',
  outline:
    'border border-border-default text-text-primary hover:border-text-primary active:scale-[0.98]',
};

const sizes = {
  sm: 'px-4 py-1.5 text-xs',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
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
    'inline-flex items-center justify-center font-medium rounded-full tracking-wider uppercase transition-all duration-200 cursor-pointer',
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
