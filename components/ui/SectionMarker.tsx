import { cn } from '@/lib/utils';

interface SectionMarkerProps {
  number?: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionMarker({
  number,
  label,
  align = 'left',
  className
}: SectionMarkerProps) {
  return (
    <div
      className={cn(
        'section-marker flex items-center gap-2',
        align === 'center' && 'justify-center',
        align === 'right' && 'justify-end',
        className
      )}
    >
      {number && <span>[ {number} ]</span>}
      <span>[ {label.toUpperCase()} ]</span>
    </div>
  );
}
