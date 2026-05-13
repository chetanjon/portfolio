'use client';

interface AatramLogoSVGProps {
  className?: string;
  /** Render the square black backdrop (iOS app icon look). Default true. */
  withBackdrop?: boolean;
}

// The real Aatram app icon, ported one-for-one from /products/aatram-logo.svg:
// lavender disc + fading-opacity arc above + four golden-ratio-decay particles
// on the left. No 80-segment approximation — this matches the App Store icon.
export function AatramLogoSVG({ className, withBackdrop = true }: AatramLogoSVGProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient
          id="aatramArcFade"
          x1="39.1"
          y1="44.9"
          x2="87.4"
          y2="49.2"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#B8A9D4" stopOpacity="0.08" />
          <stop offset="40%" stopColor="#B8A9D4" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#B8A9D4" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      {withBackdrop && <rect width="120" height="120" rx="26" fill="#000000" />}

      <circle cx="62" cy="61" r="22" fill="#B8A9D4" />

      <path
        d="M 39.1 44.9 A 28 28 0 0 1 87.4 49.2"
        stroke="url(#aatramArcFade)"
        strokeWidth="4.0"
        strokeLinecap="round"
        fill="none"
      />

      <circle cx="35.4" cy="52.3" r="3.0" fill="#B8A9D4" opacity="0.48" />
      <circle cx="34.0" cy="61.0" r="2.16" fill="#B8A9D4" opacity="0.297" />
      <circle cx="35.4" cy="69.7" r="1.56" fill="#B8A9D4" opacity="0.184" />
      <circle cx="39.3" cy="77.5" r="1.12" fill="#B8A9D4" opacity="0.114" />
    </svg>
  );
}
