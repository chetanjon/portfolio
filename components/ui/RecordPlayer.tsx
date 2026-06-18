'use client';

// A tiny record player that doubles as the play/pause control for the hero
// engine SFX. The disc spins and the tonearm drops when "on".

export function RecordPlayer({
  on,
  onToggle,
  className,
}: {
  on: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      aria-label={on ? 'Stop the engine sound' : 'Start the engine (sound on)'}
      title={on ? 'Cut the engine' : 'Start the engine'}
      className={`group relative grid place-items-center rounded-full border border-border-default bg-bg-secondary/70 backdrop-blur-sm transition-colors hover:border-border-hover cursor-pointer ${className ?? ''}`}
      style={{ width: 52, height: 52 }}
    >
      <svg viewBox="0 0 48 48" width={40} height={40} aria-hidden>
        {/* record */}
        <g className={`rp-disc${on ? ' spin' : ''}`} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          <circle cx="24" cy="24" r="17" fill="currentColor" className="text-text-primary" />
          <circle cx="24" cy="24" r="13" fill="none" stroke="var(--color-bg-secondary)" strokeOpacity={0.5} strokeWidth={0.8} />
          <circle cx="24" cy="24" r="9" fill="none" stroke="var(--color-bg-secondary)" strokeOpacity={0.5} strokeWidth={0.8} />
          <circle cx="24" cy="24" r="5" style={{ fill: 'var(--color-accent-primary)' }} />
          <circle cx="24" cy="24" r="1.4" fill="var(--color-bg-secondary)" />
        </g>
        {/* tonearm — pivots in when playing */}
        <g
          style={{
            transformBox: 'fill-box',
            transformOrigin: '40px 8px',
            transform: on ? 'rotate(22deg)' : 'rotate(0deg)',
            transition: 'transform 0.4s cubic-bezier(.22,1,.36,1)',
          }}
        >
          <line x1="40" y1="8" x2="26" y2="22" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="text-text-secondary" />
          <circle cx="40" cy="8" r="2.6" fill="currentColor" className="text-text-secondary" />
        </g>
      </svg>
    </button>
  );
}
