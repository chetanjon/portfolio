interface LogoMarkProps {
  className?: string;
  size?: number;
}

export function LogoMark({ className, size = 40 }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={Math.round(size * 0.6)}
      viewBox="0 0 40 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="CJ monogram"
    >
      {/* C — open arc */}
      <path
        d="M16 3C16 3 5 3 5 12C5 21 16 21 16 21"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* J — vertical stem */}
      <line
        x1="29"
        y1="3"
        x2="29"
        y2="17"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* J — bottom curve */}
      <path
        d="M29 17C29 17 29 21 24 21"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* J — top serif bar */}
      <line
        x1="24"
        y1="3"
        x2="35"
        y2="3"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
