'use client';

import { useEffect, useRef, useState } from 'react';

export function HeroGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: '200px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="hero-orb"
      aria-hidden="true"
      style={{
        animationPlayState: active ? 'running' : 'paused',
        willChange: active ? 'transform' : 'auto',
      }}
    />
  );
}
