'use client';

import dynamic from 'next/dynamic';

const Plasma = dynamic(() => import('@/components/ui/Plasma'), { ssr: false });

export default function PlasmaBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Plasma
        color="#E07A5F"
        speed={0.3}
        scale={1}
        opacity={0.35}
        mouseInteractive={false}
      />
    </div>
  );
}
