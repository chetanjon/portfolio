'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: 'default' | 'minimal';
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  variant?: 'default' | 'minimal';
}

const defaultStyles =
  'w-full px-4 py-3 rounded-lg border border-border-default bg-bg-tertiary text-text-primary placeholder:text-text-muted focus:outline-none focus:border-text-primary transition-colors';

const minimalStyles =
  'w-full py-3 bg-transparent border-b border-border-default text-text-primary placeholder:text-text-muted focus:outline-none focus:border-text-primary transition-colors';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, variant = 'default', ...props }, ref) => {
    const inputStyles = variant === 'minimal' ? minimalStyles : defaultStyles;

    return (
      <div className="space-y-1.5">
        {label && (
          <label className={cn(
            'block',
            variant === 'minimal'
              ? 'small-caps text-text-muted'
              : 'text-sm font-medium text-text-primary'
          )}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(inputStyles, error && 'border-red-400', className)}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, variant = 'default', ...props }, ref) => {
    const inputStyles = variant === 'minimal' ? minimalStyles : defaultStyles;

    return (
      <div className="space-y-1.5">
        {label && (
          <label className={cn(
            'block',
            variant === 'minimal'
              ? 'small-caps text-text-muted'
              : 'text-sm font-medium text-text-primary'
          )}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            inputStyles,
            'resize-none',
            variant === 'default' && 'min-h-[120px]',
            error && 'border-red-400',
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
