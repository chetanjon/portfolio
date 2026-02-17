'use client';

import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { SectionMarker } from '@/components/ui/SectionMarker';
import { personalInfo } from '@/data/personal';
import { ArrowUpRight, Award, TrendingUp, Users, Clock, Target } from 'lucide-react';

// ─── Signature paths (abbreviated for display) ────────────────────────────────
const signaturePaths = [
  { d: "M 73.500,130.000 C 62.724,133.357 65.250,130.500 57.000,131.000", sw: 2.741 },
  { d: "M 57.000,131.000 C 54.737,126.286 54.224,129.857 56.500,123.000", sw: 3.786 },
  { d: "M 56.500,123.000 C 61.531,115.938 60.237,116.036 68.000,110.500", sw: 3.049 },
  { d: "M 68.000,110.500 C 79.090,101.618 78.781,101.438 91.000,94.000", sw: 2.257 },
  { d: "M 91.000,94.000 C 107.158,84.338 106.840,83.868 123.500,75.000", sw: 1.876 },
  { d: "M 123.500,75.000 C 139.081,67.021 138.658,66.338 154.000,58.000", sw: 1.852 },
  { d: "M 154.000,58.000 C 163.672,52.205 160.581,54.021 166.500,49.000", sw: 2.505 },
  { d: "M 166.500,49.000 C 163.706,48.397 167.422,47.955 161.500,49.500", sw: 3.800 },
  { d: "M 161.500,49.500 C 153.739,53.877 153.706,53.397 146.500,59.000", sw: 3.000 },
  { d: "M 146.500,59.000 C 136.886,64.846 137.489,65.377 129.000,72.500", sw: 2.523 },
  { d: "M 129.000,72.500 C 118.478,80.981 119.886,81.346 112.500,92.000", sw: 2.324 },
  { d: "M 112.500,92.000 C 106.308,105.458 105.728,104.481 103.500,119.500", sw: 2.149 },
  { d: "M 103.500,119.500 C 101.452,129.901 101.558,129.208 103.000,139.500", sw: 2.383 },
  { d: "M 103.000,139.500 C 104.081,147.186 103.952,145.401 108.500,150.500", sw: 2.938 },
  { d: "M 108.500,150.500 C 114.733,153.000 113.081,153.936 121.000,153.000", sw: 3.126 },
  { d: "M 121.000,153.000 C 128.626,152.835 128.233,153.000 135.500,150.500", sw: 2.986 },
  { d: "M 135.500,150.500 C 141.835,147.723 141.876,148.335 147.500,144.000", sw: 3.079 },
  { d: "M 147.500,144.000 C 154.024,141.048 150.585,141.973 153.000,139.000", sw: 3.575 },
  { d: "M 153.000,139.000 C 147.915,134.479 151.274,135.548 142.000,133.000", sw: 3.934 },
  { d: "M 142.000,133.000 C 134.422,131.768 134.915,131.229 127.000,132.500", sw: 3.220 },
  { d: "M 127.000,132.500 C 116.075,132.692 116.672,133.518 106.500,136.500", sw: 2.631 },
  { d: "M 106.500,136.500 C 93.771,141.995 94.075,141.442 83.000,150.000", sw: 2.289 },
  { d: "M 83.000,150.000 C 75.400,156.414 75.271,155.745 69.500,164.000", sw: 2.458 },
  { d: "M 69.500,164.000 C 64.925,169.051 66.650,167.664 65.500,172.500", sw: 3.172 },
  { d: "M 160.000,103.000 C 160.413,96.025 159.000,99.250 158.000,95.500", sw: 5.254 },
  { d: "M 158.000,95.500 C 152.359,96.962 154.663,94.775 148.500,100.500", sw: 4.814 },
  { d: "M 148.500,100.500 C 143.581,105.862 143.359,105.212 140.000,112.000", sw: 3.431 },
  { d: "M 140.000,112.000 C 136.531,118.070 136.581,117.862 134.500,124.500", sw: 3.207 },
  { d: "M 134.500,124.500 C 132.507,129.631 133.531,127.570 134.000,131.000", sw: 3.722 },
  { d: "M 134.000,131.000 C 137.723,131.597 135.507,132.381 140.500,130.000", sw: 3.949 },
  { d: "M 140.500,130.000 C 147.443,124.982 147.723,125.847 154.000,119.500", sw: 3.071 },
  { d: "M 154.000,119.500 C 163.132,112.614 162.693,112.232 171.000,104.500", sw: 2.510 },
  { d: "M 171.000,104.500 C 178.959,95.836 179.132,96.114 186.000,86.500", sw: 2.407 },
  { d: "M 186.000,86.500 C 190.185,80.358 190.459,80.586 194.000,74.000", sw: 2.795 },
  { d: "M 194.000,74.000 C 199.479,65.843 196.185,70.358 198.000,66.500", sw: 3.402 },
  { d: "M 198.000,66.500 C 190.710,71.576 194.979,67.843 185.000,78.000", sw: 3.596 },
  { d: "M 185.000,78.000 C 181.431,83.457 180.710,82.826 178.000,89.000", sw: 3.233 },
  { d: "M 178.000,89.000 C 174.463,93.767 174.931,93.957 172.000,99.000", sw: 3.305 },
  { d: "M 172.000,99.000 C 168.218,104.911 170.463,102.267 170.000,106.000", sw: 3.724 },
  { d: "M 170.000,106.000 C 176.083,106.549 172.718,107.661 181.000,104.500", sw: 4.051 },
  { d: "M 181.000,104.500 C 184.636,101.647 185.083,102.799 188.000,98.500", sw: 3.759 },
  { d: "M 188.000,98.500 C 192.122,94.113 192.386,94.397 196.500,90.000", sw: 3.359 },
  { d: "M 196.500,90.000 C 200.584,86.590 200.372,86.363 204.500,83.000", sw: 3.430 },
  { d: "M 204.500,83.000 C 208.187,78.270 206.584,81.090 208.500,79.000", sw: 3.947 },
  { d: "M 208.500,79.000 C 204.827,86.393 208.937,80.020 206.000,86.500", sw: 4.710 },
  { d: "M 206.000,86.500 C 210.175,83.178 207.577,86.643 214.000,79.500", sw: 4.811 },
  { d: "M 214.000,79.500 C 216.266,76.496 216.675,76.928 219.000,74.000", sw: 4.146 },
  { d: "M 219.000,74.000 C 222.062,71.200 222.016,71.246 225.500,69.000", sw: 3.837 },
  { d: "M 225.500,69.000 C 228.338,66.922 228.312,67.200 231.500,66.000", sw: 3.973 },
  { d: "M 231.500,66.000 C 236.543,63.906 234.338,65.172 237.500,65.500", sw: 4.491 },
  { d: "M 237.500,65.500 C 236.914,69.540 238.793,67.656 236.000,73.500", sw: 4.506 },
  { d: "M 236.000,73.500 C 235.391,76.050 235.414,76.040 234.500,78.500", sw: 4.362 },
  { d: "M 234.500,78.500 C 233.614,81.702 233.391,81.550 232.000,84.500", sw: 4.153 },
  { d: "M 232.000,84.500 C 229.953,88.429 229.864,88.202 227.000,91.500", sw: 3.794 },
  { d: "M 227.000,91.500 C 219.278,98.055 223.703,94.929 219.500,97.500", sw: 3.652 },
  { d: "M 219.500,97.500 C 223.418,92.858 219.778,96.805 228.000,89.000", sw: 4.228 },
  { d: "M 228.000,89.000 C 233.009,84.862 232.918,84.858 238.500,81.500", sw: 3.450 },
  { d: "M 238.500,81.500 C 245.599,77.924 245.259,77.362 252.500,74.000", sw: 2.986 },
  { d: "M 252.500,74.000 C 258.104,70.229 258.349,70.674 264.000,67.000", sw: 3.091 },
  { d: "M 264.000,67.000 C 268.626,64.420 268.604,64.479 273.500,62.500", sw: 3.351 },
  { d: "M 273.500,62.500 C 279.980,59.850 276.876,61.170 280.500,60.500", sw: 3.696 },
];

// ─── Count-up hook ────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1500, delay = 0, decimals = 0) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf: number;
    const timer = setTimeout(() => {
      const startTime = performance.now();
      const tick = (now: number) => {
        const elapsed = now - startTime;
        const p = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(
          decimals > 0
            ? parseFloat((target * eased).toFixed(decimals))
            : Math.round(target * eased)
        );
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [target, duration, delay, decimals]);

  return decimals > 0 ? value.toFixed(decimals) : value;
}

// ─── 3D Tilt Card with true perspective and depth ─────────────────────────────
interface TiltCard3DProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

function TiltCard3D({ children, className, delay = 0 }: TiltCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Stronger tilt for dramatic 3D effect
    setTilt({
      x: (y - 0.5) * -20,
      y: (x - 0.5) * 20,
    });
    setGlare({ x: x * 100, y: y * 100, opacity: 0.25 });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
    setIsHovered(false);
  };

  return (
    // Outer wrapper provides perspective space
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={{ perspective: '1200px' }}
    >
      {/* Card that tilts within the perspective space */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
        }}
        className="relative"
      >
        {children}

        {/* Glare overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 60%)`,
          }}
        />

        {/* Dynamic shadow that follows tilt */}
        <motion.div
          className="absolute inset-0 rounded-2xl -z-10"
          animate={{
            boxShadow: isHovered
              ? `${tilt.y * 2}px ${15 + tilt.x * 1.5}px 50px rgba(0,0,0,0.35), 0 5px 20px rgba(0,0,0,0.2)`
              : '0 8px 30px rgba(0,0,0,0.12)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Individual Metric Cards ──────────────────────────────────────────────────

function GMVGrowthCard({ delay }: { delay: number }) {
  const count = useCountUp(2.3, 1800, delay + 300, 1);

  return (
    <TiltCard3D className="w-[220px]" delay={delay}>
      <div
        className="relative bg-bg-primary/95 backdrop-blur-md border border-border-hover rounded-2xl p-6 overflow-visible"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Background glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/15 rounded-full blur-3xl" />

        {/* Icon floating above - pops way out */}
        <motion.div
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: (delay + 400) / 1000, type: 'spring', stiffness: 200 }}
          className="absolute -top-5 -right-3"
          style={{ transform: 'translateZ(80px)' }}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
        </motion.div>

        {/* Main number - THE HERO ELEMENT - maximum pop */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: (delay + 200) / 1000, duration: 0.5 }}
          className="relative"
          style={{ transform: 'translateZ(60px)' }}
        >
          <span className="text-[64px] font-display font-bold leading-none tracking-tighter text-3d">
            {count}
          </span>
          <span className="text-[42px] font-display font-bold text-text-secondary">x</span>
        </motion.div>

        {/* Label - medium depth */}
        <div style={{ transform: 'translateZ(30px)' }} className="mt-3">
          <p className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
            GMV Growth
          </p>
          <p className="text-xs text-text-muted mt-1">9 months · IKT India</p>
        </div>

        {/* 3D Progress bar - floats above base */}
        <div className="mt-5" style={{ transform: 'translateZ(45px)' }}>
          <div className="relative h-3 bg-text-primary/10 rounded-full overflow-visible">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: (delay + 500) / 1000, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-green-400 rounded-full"
              style={{
                boxShadow: '0 4px 15px rgba(34, 197, 94, 0.5), 0 2px 4px rgba(0,0,0,0.1)',
              }}
            />
          </div>
        </div>
      </div>
    </TiltCard3D>
  );
}

function VendorsCard({ delay }: { delay: number }) {
  const count = useCountUp(45, 1600, delay + 300);

  return (
    <TiltCard3D className="w-[200px]" delay={delay}>
      <div
        className="relative bg-bg-primary/95 backdrop-blur-md border border-border-hover rounded-2xl p-6 overflow-visible"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Floating icon - pops out */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: (delay + 400) / 1000, type: 'spring' }}
          className="absolute -top-4 -right-2"
          style={{ transform: 'translateZ(75px)' }}
        >
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Users className="w-5 h-5 text-white" />
          </div>
        </motion.div>

        {/* Main number - BIG POP */}
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: (delay + 200) / 1000, type: 'spring' }}
          style={{ transform: 'translateZ(55px)' }}
        >
          <span className="text-[56px] font-display font-bold leading-none text-3d">{count}</span>
          <span className="text-[36px] font-display font-bold text-text-secondary">+</span>
        </motion.div>

        {/* Label */}
        <div style={{ transform: 'translateZ(25px)' }} className="mt-2">
          <p className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
            Vendors
          </p>
          <p className="text-xs text-text-muted mt-1">B2B Marketplace</p>
        </div>

        {/* Visual: Stacked user avatars - floating */}
        <div className="flex -space-x-3 mt-4" style={{ transform: 'translateZ(40px)' }}>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, x: -15 }}
              animate={{ scale: 1, x: 0 }}
              transition={{ delay: (delay + 600 + i * 80) / 1000, type: 'spring' }}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 border-2 border-bg-primary flex items-center justify-center shadow-md"
            >
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-300">{i + 1}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </TiltCard3D>
  );
}

function ActivationCard({ delay }: { delay: number }) {
  const count = useCountUp(35, 1400, delay + 300);

  return (
    <TiltCard3D className="w-[200px]" delay={delay}>
      <div
        className="relative bg-bg-primary/95 backdrop-blur-md border border-border-hover rounded-2xl p-6 overflow-visible"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Floating arrow - animated bounce */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: [-5, -12, -5], opacity: 1 }}
          transition={{
            y: { delay: (delay + 500) / 1000, duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
            opacity: { delay: (delay + 500) / 1000, duration: 0.3 },
          }}
          className="absolute -top-4 -right-2"
          style={{ transform: 'translateZ(80px)' }}
        >
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <ArrowUpRight className="w-6 h-6 text-white" />
          </div>
        </motion.div>

        {/* Main number - BIG POP */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: (delay + 200) / 1000, type: 'spring' }}
          style={{ transform: 'translateZ(55px)' }}
        >
          <span className="text-[56px] font-display font-bold leading-none text-3d">{count}</span>
          <span className="text-[36px] font-display font-bold text-text-secondary">%</span>
        </motion.div>

        {/* Label */}
        <div style={{ transform: 'translateZ(25px)' }} className="mt-2">
          <p className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
            Activation ↑
          </p>
          <p className="text-xs text-text-muted mt-1">Seller funnel</p>
        </div>

        {/* Mini chart bars - floating above card */}
        <div className="flex items-end gap-1.5 mt-4 h-10" style={{ transform: 'translateZ(45px)' }}>
          {[40, 55, 65, 80, 100].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: (delay + 600 + i * 80) / 1000, duration: 0.6, ease: 'easeOut' }}
              className="w-4 rounded-sm"
              style={{
                backgroundColor: i === 4 ? 'rgb(16, 185, 129)' : 'rgba(16, 185, 129, 0.3)',
                boxShadow: i === 4 ? '0 4px 12px rgba(16, 185, 129, 0.5)' : 'none',
              }}
            />
          ))}
        </div>
      </div>
    </TiltCard3D>
  );
}

function SetupTimeCard({ delay }: { delay: number }) {
  const count = useCountUp(6, 1200, delay + 300);

  return (
    <TiltCard3D className="w-[190px]" delay={delay}>
      <div
        className="relative bg-bg-primary/95 backdrop-blur-md border border-border-hover rounded-2xl p-6 overflow-visible"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Clock icon - pops out with spin */}
        <motion.div
          initial={{ rotate: -180, opacity: 0, scale: 0 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={{ delay: (delay + 400) / 1000, type: 'spring', stiffness: 200 }}
          className="absolute -top-4 -right-2"
          style={{ transform: 'translateZ(75px)' }}
        >
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Clock className="w-5 h-5 text-white" />
          </div>
        </motion.div>

        {/* Main number - BIG POP */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: (delay + 200) / 1000, type: 'spring' }}
          style={{ transform: 'translateZ(55px)' }}
        >
          <span className="text-[56px] font-display font-bold leading-none text-3d">{count}</span>
          <span className="text-[32px] font-display font-bold text-text-secondary ml-1">h</span>
        </motion.div>

        {/* Before/After comparison - floating */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: (delay + 500) / 1000 }}
          style={{ transform: 'translateZ(35px)' }}
          className="mt-3 flex items-center gap-3"
        >
          <span className="text-sm line-through text-text-muted">3 days</span>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: (delay + 700) / 1000, type: 'spring' }}
            className="px-2 py-0.5 bg-orange-500/20 rounded-full"
          >
            <span className="text-xs font-semibold text-orange-500">→ 6h</span>
          </motion.div>
        </motion.div>

        {/* Label */}
        <div style={{ transform: 'translateZ(20px)' }} className="mt-3">
          <p className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
            Setup Time
          </p>
        </div>
      </div>
    </TiltCard3D>
  );
}

function CSPOBadgeCard({ delay }: { delay: number }) {
  return (
    <TiltCard3D className="w-[130px]" delay={delay}>
      <div
        className="relative bg-bg-primary/95 backdrop-blur-sm border border-border-hover rounded-xl p-4 overflow-hidden flex flex-col items-center justify-center"
        style={{ transformStyle: 'preserve-3d', minHeight: '120px' }}
      >
        {/* Badge floating */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: (delay + 300) / 1000, type: 'spring', stiffness: 200 }}
          style={{ transform: 'translateZ(45px)' }}
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
            <Award className="w-7 h-7 text-white" />
          </div>
        </motion.div>

        {/* Text */}
        <div className="text-center mt-3" style={{ transform: 'translateZ(20px)' }}>
          <p className="text-sm font-display font-bold">CSPO</p>
          <p className="text-[9px] text-text-muted mt-0.5">Scrum Alliance</p>
        </div>
      </div>
    </TiltCard3D>
  );
}

function ExpertiseCard({ delay }: { delay: number }) {
  return (
    <TiltCard3D className="w-[140px]" delay={delay}>
      <div
        className="relative bg-bg-primary/95 backdrop-blur-sm border border-border-hover rounded-xl p-4 overflow-hidden flex flex-col items-center justify-center"
        style={{ transformStyle: 'preserve-3d', minHeight: '110px' }}
      >
        {/* Icon */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: (delay + 300) / 1000 }}
          style={{ transform: 'translateZ(35px)' }}
        >
          <Target className="w-8 h-8 text-violet-500" />
        </motion.div>

        {/* Text */}
        <div className="text-center mt-2" style={{ transform: 'translateZ(18px)' }}>
          <p className="text-xs font-display font-bold">B2B</p>
          <p className="text-[10px] text-text-secondary font-medium">Marketplace</p>
          <p className="text-[9px] text-text-muted mt-1">Domain Expert</p>
        </div>
      </div>
    </TiltCard3D>
  );
}

// ─── Main Hero Component ──────────────────────────────────────────────────────
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);

  // Mouse tracking for orb
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const orbXSpring = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const orbYSpring = useSpring(mouseY, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };

    section.addEventListener('mousemove', handleMouseMove);
    return () => section.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const unsubX = orbXSpring.on('change', (v) => {
      if (orbRef.current) orbRef.current.style.left = `${v * 100}%`;
    });
    const unsubY = orbYSpring.on('change', (v) => {
      if (orbRef.current) orbRef.current.style.top = `${v * 100}%`;
    });
    return () => { unsubX(); unsubY(); };
  }, [orbXSpring, orbYSpring]);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex flex-col justify-center items-center px-4 pt-24 pb-20 overflow-hidden bg-bg-primary"
    >
      {/* Content wrapper with relative positioning */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-center items-center">
        {/* Reactive orb - theme aware */}
        <div
          ref={orbRef}
          className="absolute pointer-events-none rounded-full -translate-x-1/2 -translate-y-1/2 hidden md:block orb-gradient"
          style={{
            width: '700px',
            height: '700px',
            left: '50%',
            top: '50%',
          }}
        />

        {/* ═══════════════════ MAIN CENTER CONTENT ═══════════════════ */}
        <motion.div
          style={{ y, opacity, scale }}
          className="max-w-lg text-center z-10 space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionMarker label="Engineer turned Product Builder" align="center" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-sm md:text-xl leading-relaxed max-w-md mx-auto"
          >
            Engineering taught me{' '}
            <span className="font-serif italic">to debug systems.</span>{' '}
            Product management taught me to debug businesses.
            <br />
            The tools are different — the mindset isn&apos;t.
          </motion.p>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-4 flex justify-center"
          >
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              viewBox="50 43 236 135"
              className="w-[160px] md:w-[180px] h-auto opacity-70"
            >
              {signaturePaths.map((path, i) => (
                <motion.path
                  key={i}
                  d={path.d}
                  strokeWidth={path.sw}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: { delay: 0.5 + i * 0.07, duration: 0.02 },
                    opacity: { delay: 0.5 + i * 0.07, duration: 0.01 },
                  }}
                />
              ))}
            </svg>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="pt-2"
          >
            <h1 className="text-lg md:text-xl font-display font-semibold tracking-wide uppercase">
              {personalInfo.fullName}
            </h1>
            <p className="small-caps text-text-muted mt-2">
              {personalInfo.title} / {personalInfo.location.split(',')[0]}
            </p>
          </motion.div>
        </motion.div>

        {/* ═══════════════════ MOBILE/TABLET CARDS ═══════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="lg:hidden mt-10 w-full max-w-md px-4"
        >
          {/* Grid of mini cards for mobile */}
          <div className="grid grid-cols-2 gap-3">
            {/* GMV */}
            <div className="bg-bg-primary/90 border border-border-default rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-display font-bold">2.3</span>
                  <span className="text-lg font-bold text-text-secondary">x</span>
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">GMV Growth</p>
            </div>

            {/* Vendors */}
            <div className="bg-bg-primary/90 border border-border-default rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-display font-bold">45</span>
                  <span className="text-lg font-bold text-text-secondary">+</span>
                </div>
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">Vendors</p>
            </div>

            {/* Activation */}
            <div className="bg-bg-primary/90 border border-border-default rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-display font-bold">35</span>
                  <span className="text-lg font-bold text-text-secondary">%</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-emerald-500" />
              </div>
              <p className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">Activation ↑</p>
            </div>

            {/* Setup */}
            <div className="bg-bg-primary/90 border border-border-default rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-display font-bold">6</span>
                  <span className="text-lg font-bold text-text-secondary">h</span>
                </div>
                <Clock className="w-5 h-5 text-orange-500" />
              </div>
              <p className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">Setup Time</p>
            </div>
          </div>

          {/* Bottom tags row */}
          <div className="flex justify-center gap-2 mt-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-bg-primary border border-border-default rounded-full">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[10px] font-medium">CSPO</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-bg-primary border border-border-default rounded-full">
              <Target className="w-3.5 h-3.5 text-violet-500" />
              <span className="text-[10px] font-medium">B2B Expert</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator - positioned at bottom of section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <motion.p
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-[10px] uppercase tracking-widest text-text-muted"
        >
          Scroll
        </motion.p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center"
        >
          <svg
            className="w-5 h-5 text-text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
