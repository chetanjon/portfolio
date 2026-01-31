import { cn } from '@/lib/utils';

interface MetricCardProps {
  value: string;
  label: string;
  context?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles = {
  sm: { value: 'text-xl font-bold', label: 'text-xs', context: 'text-xs' },
  md: { value: 'text-2xl md:text-3xl font-bold', label: 'text-sm', context: 'text-xs' },
  lg: { value: 'text-3xl md:text-4xl font-bold', label: 'text-base', context: 'text-sm' },
};

export function MetricCard({
  value,
  label,
  context,
  size = 'md',
  className,
}: MetricCardProps) {
  const styles = sizeStyles[size];

  return (
    <div className={cn('text-center', className)}>
      <div className={cn(styles.value, 'text-accent-primary')}>{value}</div>
      <div className={cn(styles.label, 'text-text-secondary mt-1')}>{label}</div>
      {context && (
        <div className={cn(styles.context, 'text-text-muted mt-0.5')}>{context}</div>
      )}
    </div>
  );
}
