'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  glareEnabled?: boolean;
  tiltAmount?: number;
  perspective?: number;
  scale?: number;
  transitionDuration?: number;
}

export function TiltCard({
  children,
  className,
  innerClassName,
  glareEnabled = true,
  tiltAmount = 15,
  perspective = 1000,
  scale = 1.02,
  transitionDuration = 0.2,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      // Tilt: center = 0, edges = ±tiltAmount
      setTilt({
        x: (y - 0.5) * -tiltAmount * 2,
        y: (x - 0.5) * tiltAmount * 2,
      });

      // Glare follows cursor
      setGlarePos({ x: x * 100, y: y * 100 });
    },
    [tiltAmount]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setGlarePos({ x: 50, y: 50 });
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: isHovered ? scale : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: perspective,
      }}
      className={cn('relative', className)}
    >
      {/* Card content with depth */}
      <div
        className={cn('relative', innerClassName)}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </div>

      {/* Glare overlay */}
      {glareEnabled && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: transitionDuration }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.25) 0%, transparent 50%)`,
            }}
          />
        </motion.div>
      )}

      {/* Edge highlight for depth */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-[inherit]"
        style={{
          boxShadow: isHovered
            ? `
              0 ${10 + tilt.x * 0.5}px ${30 + Math.abs(tilt.x)}px rgba(0,0,0,0.15),
              0 ${5 + tilt.x * 0.2}px ${15 + Math.abs(tilt.x) * 0.5}px rgba(0,0,0,0.1),
              inset 0 1px 0 rgba(255,255,255,0.1)
            `
            : '0 4px 20px rgba(0,0,0,0.08)',
          transition: `box-shadow ${transitionDuration}s ease`,
        }}
      />
    </motion.div>
  );
}

// ─── Utility component for 3D "popping" text ─────────────────────────────────
interface Pop3DTextProps {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}

export function Pop3DText({ children, depth = 20, className }: Pop3DTextProps) {
  return (
    <span
      className={cn('inline-block', className)}
      style={{
        transform: `translateZ(${depth}px)`,
        textShadow: `
          0 1px 0 rgba(0,0,0,0.1),
          0 2px 0 rgba(0,0,0,0.08),
          0 3px 0 rgba(0,0,0,0.06),
          0 4px 0 rgba(0,0,0,0.04),
          0 5px 10px rgba(0,0,0,0.15)
        `,
      }}
    >
      {children}
    </span>
  );
}

// ─── Utility component for 3D progress bar ───────────────────────────────────
interface Pop3DBarProps {
  value: number;
  max?: number;
  height?: number;
  depth?: number;
  className?: string;
}

export function Pop3DBar({
  value,
  max = 100,
  height = 8,
  depth = 12,
  className,
}: Pop3DBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div
      className={cn('relative w-full rounded-full overflow-visible', className)}
      style={{
        height: `${height}px`,
        transform: `translateZ(${depth}px)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Background track */}
      <div
        className="absolute inset-0 rounded-full bg-text-primary/10"
        style={{
          transform: 'translateZ(-4px)',
        }}
      />
      {/* Filled bar */}
      <motion.div
        className="absolute top-0 left-0 h-full rounded-full bg-text-primary"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        style={{
          boxShadow: `
            0 2px 4px rgba(0,0,0,0.2),
            0 4px 8px rgba(0,0,0,0.1),
            inset 0 1px 0 rgba(255,255,255,0.2)
          `,
        }}
      />
    </div>
  );
}
