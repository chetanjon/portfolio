'use client';

import { motion } from 'framer-motion';

export const aatramTokens = [
  { name: 'aLavender', hex: '#B8A9D4', usage: 'Primary accent. Highlights and calls to attention.' },
  { name: 'aRose', hex: '#C9929B', usage: 'Dread tiers 1–4. Rose-coded emotional escalation.' },
  { name: 'aMint', hex: '#7DBFAB', usage: 'Momentum, calm, in-session signals.' },
  { name: 'aSand', hex: '#C9B97A', usage: 'Insights and softer informational copy.' },
  { name: 'aSlate', hex: '#8BA4B8', usage: 'Neutral metadata and secondary chrome.' },
];

interface TokenSwatchesProps {
  compact?: boolean; // compact: small chips; full: rows with usage copy
  className?: string;
}

export function TokenSwatches({ compact = false, className }: TokenSwatchesProps) {
  if (compact) {
    return (
      <div className={`flex flex-wrap gap-2 ${className ?? ''}`}>
        {aatramTokens.map((token) => (
          <span
            key={token.name}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-default text-xs font-mono"
          >
            <span className="w-3 h-3 rounded-sm" style={{ background: token.hex }} />
            {token.name}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className ?? ''}`}>
      {aatramTokens.map((token, i) => (
        <motion.div
          key={token.name}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="flex items-center gap-5 p-4 border border-border-default rounded-lg hover:border-text-muted transition-colors"
        >
          <div
            className="w-14 h-14 rounded-md shrink-0 border border-border-default"
            style={{ background: token.hex }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-3 mb-1">
              <span className="font-mono text-sm font-semibold">{token.name}</span>
              <span className="font-mono text-xs text-text-muted">{token.hex}</span>
            </div>
            <p className="text-sm text-text-secondary leading-snug">{token.usage}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
