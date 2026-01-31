'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  animateBy?: 'words' | 'chars';
  direction?: 'top' | 'bottom';
}

export default function BlurText({
  text,
  className = '',
  delay = 100,
  animateBy = 'words',
  direction = 'top',
}: BlurTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  const from = direction === 'top'
    ? { filter: 'blur(10px)', opacity: 0, y: -30 }
    : { filter: 'blur(10px)', opacity: 0, y: 30 };

  return (
    <p ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {elements.map((segment, index) => (
        <motion.span
          className="inline-block will-change-[transform,filter,opacity]"
          key={index}
          initial={from}
          animate={
            inView
              ? { filter: 'blur(0px)', opacity: 1, y: 0 }
              : from
          }
          transition={{
            duration: 0.5,
            delay: (index * delay) / 1000,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {segment === ' ' ? '\u00A0' : segment}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </p>
  );
}
