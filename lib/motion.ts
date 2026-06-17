import type { Variants } from 'framer-motion';

/**
 * Shared reveal archetypes for the site-wide creative reinvention.
 *
 * Instead of every section using the same `opacity:0, y:20` fade, sections pick
 * an archetype by their role:
 *   - LIFT     → body / paragraph blocks (gentle rise)
 *   - WIPE     → section dividers + headers (scale in from the left edge)
 *   - STAGGER  → lists / grids (parent orchestrates children)
 *   - DRIFT    → scroll-linked motion; the ONE signature element per page.
 *               Not a variant: build it inline with useScroll + useTransform
 *               (see components/sections/Works.tsx `metricY`) and always guard
 *               it behind useReducedMotion().
 */

// Signature easings.
export const EASE = [0.25, 0.46, 0.45, 0.94] as const; // calm reveal
export const EASE_OUT = [0.22, 1, 0.36, 1] as const; // snappy exit/hover

// Reveal once when ~30% of the element is in view.
export const inView = { once: true, amount: 0.3 } as const;

// 1. LIFT — body / paragraph blocks.
export const lift: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// 2. WIPE — section dividers / headers. Pair with `origin-left`.
export const wipe: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  show: { opacity: 1, scaleX: 1, transition: { duration: 0.7, ease: EASE } },
};

// 3a. STAGGER parent — orchestrates children with no visual of its own.
export const staggerParent = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

// 3b. STAGGER child — the per-item rise inside a staggered list/grid.
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
