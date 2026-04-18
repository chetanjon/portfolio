/**
 * Animated radial-gradient orb that sits behind the hero content.
 * Server component — animation is pure CSS (`.hero-orb` in globals.css).
 * `prefers-reduced-motion` pauses the drift via the global media query.
 */
export function HeroGlow() {
  return <div className="hero-orb" aria-hidden="true" />;
}
