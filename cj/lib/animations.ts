export const timing = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
};

export const easing = {
  default: [0.25, 0.1, 0.25, 1] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  smooth: [0.4, 0, 0.2, 1] as const,
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const slideInFromLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
};

export const slideInFromRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
};
