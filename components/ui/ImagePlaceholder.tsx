import { cn } from '@/lib/utils';

interface ImagePlaceholderProps {
  initials?: string;
  icon?: React.ReactNode;
  aspectRatio?: 'square' | 'video' | 'portrait';
  className?: string;
  grayscale?: boolean;
}

export function ImagePlaceholder({
  initials,
  icon,
  aspectRatio = 'portrait',
  className,
  grayscale = true,
}: ImagePlaceholderProps) {
  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-bg-secondary rounded-lg flex items-center justify-center',
        aspectClasses[aspectRatio],
        grayscale && 'img-grayscale',
        className
      )}
    >
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-text-primary) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-text-primary) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center">
        {initials && (
          <span className="text-6xl md:text-8xl font-display font-bold text-text-muted/30">
            {initials}
          </span>
        )}
        {icon && (
          <div className="text-text-muted/30">
            {icon}
          </div>
        )}
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-text-muted/20" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-text-muted/20" />
    </div>
  );
}
