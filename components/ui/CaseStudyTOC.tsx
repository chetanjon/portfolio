'use client';

import { useEffect, useState, useCallback } from 'react';

export type TOCSection = {
  id: string;
  number?: string;
  label: string;
  children?: { id: string; label: string }[];
};

export type TOCTheme = {
  accent: string;
  text: string;
  textMuted: string;
  textDim?: string;
  bg: string;
  border?: string;
  fontMono?: string;
  fontSans?: string;
  fontSerif?: string;
};

export type CaseStudyTOCProps = {
  sections: TOCSection[];
  theme: TOCTheme;
  variant?: 'editorial' | 'scrubber';
};

type FlatSection = {
  id: string;
  number?: string;
  label: string;
  isChild: boolean;
  parentId?: string;
};

export function CaseStudyTOC({ sections, theme, variant = 'editorial' }: CaseStudyTOCProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const flatSections: FlatSection[] = sections.flatMap(s => [
    { id: s.id, number: s.number, label: s.label, isChild: false },
    ...(s.children?.map(c => ({
      id: c.id,
      number: undefined,
      label: c.label,
      isChild: true,
      parentId: s.id,
    })) ?? []),
  ]);

  useEffect(() => {
    const ids = flatSections.map(s => s.id);
    const els = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        const inView = entries
          .filter(e => e.isIntersecting)
          .map(e => ({ id: e.target.id, top: e.boundingClientRect.top }))
          .sort((a, b) => a.top - b.top);
        if (inView.length > 0) {
          setActiveId(inView[0].id);
        }
      },
      { rootMargin: '0px 0px -65% 0px', threshold: 0 }
    );

    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    setMobileOpen(false);
  }, []);

  const activeFlat = flatSections.find(s => s.id === activeId) ?? flatSections[0];
  const activeIndex = Math.max(0, flatSections.findIndex(s => s.id === activeId));
  const total = flatSections.length;

  return (
    <>
      {variant === 'editorial' ? (
        <EditorialRail
          sections={sections}
          activeId={activeId}
          theme={theme}
          onClick={scrollTo}
        />
      ) : (
        <Scrubber
          flatSections={flatSections}
          activeId={activeId}
          activeIndex={activeIndex}
          theme={theme}
          onClick={scrollTo}
          hovered={hovered}
          setHovered={setHovered}
        />
      )}

      <MobilePill
        sections={sections}
        activeFlat={activeFlat}
        activeIndex={activeIndex}
        total={total}
        theme={theme}
        isOpen={mobileOpen}
        onToggle={() => setMobileOpen(o => !o)}
        onSelect={scrollTo}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VARIANT B — EDITORIAL RAIL
// ─────────────────────────────────────────────────────────────────────────────

type EditorialRailProps = {
  sections: TOCSection[];
  activeId: string;
  theme: TOCTheme;
  onClick: (id: string) => void;
};

function EditorialRail({ sections, activeId, theme, onClick }: EditorialRailProps) {
  return (
    <nav
      aria-label="Case study sections"
      className="case-study-toc-editorial"
      style={{
        position: 'fixed',
        right: 32,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        pointerEvents: 'auto',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1279px) {
          .case-study-toc-editorial { display: none !important; }
        }
        .cs-toc-item {
          display: flex; align-items: baseline; gap: 12px;
          padding: 6px 0; cursor: pointer; background: transparent;
          border: 0; text-align: left; width: 100%;
          transition: color 220ms ease;
        }
        .cs-toc-item:hover .cs-toc-num,
        .cs-toc-item:hover .cs-toc-lbl { color: var(--cs-toc-accent); }
        .cs-toc-num { font-feature-settings: 'tnum'; opacity: 0.55; transition: opacity 220ms; }
        .cs-toc-item.active .cs-toc-num { opacity: 1; }
        .cs-toc-bar {
          width: 18px; height: 1px; background: currentColor;
          opacity: 0; transform: scaleX(0); transform-origin: left;
          transition: opacity 280ms, transform 280ms cubic-bezier(.22,1,.36,1);
        }
        .cs-toc-item.active .cs-toc-bar { opacity: 1; transform: scaleX(1); }
        .cs-toc-children {
          margin: 4px 0 8px 16px;
          padding-left: 12px;
          border-left: 1px solid currentColor;
          border-color: var(--cs-toc-border);
          display: flex; flex-direction: column; gap: 4px;
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 320ms ease, opacity 220ms ease;
        }
        .cs-toc-children.open { max-height: 200px; opacity: 1; }
        .cs-toc-child {
          font-size: 11px; padding: 4px 0; cursor: pointer; background: transparent;
          border: 0; text-align: left; transition: color 220ms;
        }
      ` }} />
      <ol
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          minWidth: 196,
          // expose theme tokens for the scoped CSS above
          ['--cs-toc-accent' as string]: theme.accent,
          ['--cs-toc-border' as string]: theme.border ?? `${theme.textMuted}40`,
        } as React.CSSProperties}
      >
        {sections.map(s => {
          const isActiveParent =
            activeId === s.id ||
            (s.children?.some(c => c.id === activeId) ?? false);
          return (
            <li key={s.id} style={{ display: 'flex', flexDirection: 'column' }}>
              <button
                type="button"
                className={`cs-toc-item${isActiveParent ? ' active' : ''}`}
                onClick={() => onClick(s.id)}
                style={{
                  fontFamily: theme.fontMono ?? 'monospace',
                  fontSize: 10,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: isActiveParent ? theme.accent : theme.textMuted,
                  fontWeight: isActiveParent ? 600 : 400,
                }}
              >
                <span
                  className="cs-toc-num"
                  style={{ minWidth: 20, color: 'inherit' }}
                >
                  {s.number ?? '·'}
                </span>
                <span className="cs-toc-lbl" style={{ flex: 1 }}>
                  {s.label}
                </span>
                <span
                  className="cs-toc-bar"
                  style={{ color: theme.accent }}
                  aria-hidden
                />
              </button>
              {s.children && s.children.length > 0 && (
                <ol
                  className={`cs-toc-children${isActiveParent ? ' open' : ''}`}
                  style={{
                    listStyle: 'none',
                  }}
                >
                  {s.children.map(c => {
                    const isChildActive = activeId === c.id;
                    return (
                      <li key={c.id}>
                        <button
                          type="button"
                          className="cs-toc-child"
                          onClick={() => onClick(c.id)}
                          style={{
                            fontFamily: theme.fontSans ?? 'sans-serif',
                            color: isChildActive ? theme.accent : theme.textMuted,
                            opacity: isChildActive ? 1 : 0.75,
                            fontStyle: 'italic',
                          }}
                        >
                          {c.label}
                        </button>
                      </li>
                    );
                  })}
                </ol>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VARIANT C — SCRUBBER
// ─────────────────────────────────────────────────────────────────────────────

type ScrubberProps = {
  flatSections: FlatSection[];
  activeId: string;
  activeIndex: number;
  theme: TOCTheme;
  onClick: (id: string) => void;
  hovered: boolean;
  setHovered: (v: boolean) => void;
};

function Scrubber({
  flatSections,
  activeId,
  activeIndex,
  theme,
  onClick,
  hovered,
  setHovered,
}: ScrubberProps) {
  const total = flatSections.length;
  const railHeight = Math.max(540, total * 44);

  return (
    <nav
      aria-label="Case study sections"
      className="case-study-toc-scrubber"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        right: 40,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        height: railHeight,
        width: hovered ? 280 : 96,
        transition: 'width 520ms cubic-bezier(.22,1,.36,1)',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'flex-end',
        pointerEvents: 'auto',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1279px) {
          .case-study-toc-scrubber { display: none !important; }
        }
        .cs-scrub-tick {
          position: absolute; right: 0;
          height: 1px; cursor: pointer;
          background: var(--cs-scrub-muted);
          transition: width 460ms cubic-bezier(.22,1,.36,1), background 460ms ease, opacity 460ms ease, height 460ms ease;
          transform: translateY(-50%);
          border: 0; padding: 0; opacity: 0.55;
        }
        .cs-scrub-tick:hover { background: var(--cs-scrub-accent); opacity: 1; }
        .cs-scrub-tick.active {
          background: var(--cs-scrub-accent); opacity: 1; height: 1.5px;
        }
        .cs-scrub-dot {
          position: absolute; right: 0;
          width: 2px; height: 2px;
          border-radius: 50%;
          background: var(--cs-scrub-muted);
          opacity: 0.16;
          transform: translate(50%, -50%);
          pointer-events: none;
        }
        .cs-scrub-connector {
          position: absolute; right: 28px;
          height: 1px;
          background: var(--cs-scrub-accent);
          transform: translateY(-50%) scaleX(0);
          transform-origin: right center;
          opacity: 0;
          transition: opacity 480ms ease, transform 540ms cubic-bezier(.22,1,.36,1);
          pointer-events: none;
        }
        .cs-scrub-row.active:not(.hovered) .cs-scrub-connector {
          opacity: 0.5;
          transform: translateY(-50%) scaleX(1);
        }
        .cs-scrub-label-active {
          position: absolute; right: 88px;
          display: flex; flex-direction: column; align-items: flex-end;
          gap: 4px;
          white-space: nowrap;
          opacity: 0; pointer-events: none;
          transform: translate(14px, -50%) scale(0.96);
          transform-origin: right center;
          transition: opacity 540ms ease, transform 600ms cubic-bezier(.22,1,.36,1);
        }
        .cs-scrub-row.active:not(.hovered) .cs-scrub-label-active {
          opacity: 1;
          transform: translate(0, -50%) scale(1);
        }
        .cs-scrub-label-active .num {
          font-size: 9px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          opacity: 0.45;
        }
        .cs-scrub-label-active .title {
          font-style: italic;
          font-weight: 400;
          line-height: 1;
          letter-spacing: -0.005em;
        }
        .cs-scrub-label-hover {
          position: absolute; right: 28px;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          white-space: nowrap;
          opacity: 0; pointer-events: none;
          transform: translate(10px, -50%);
          transition: opacity 360ms ease, transform 380ms cubic-bezier(.22,1,.36,1);
          cursor: pointer;
          background: transparent; border: 0;
        }
        .cs-scrub-row.hovered .cs-scrub-label-hover {
          opacity: 0.55; pointer-events: auto;
          transform: translate(0, -50%);
        }
        .cs-scrub-row.hovered.active .cs-scrub-label-hover {
          opacity: 1;
          color: var(--cs-scrub-accent) !important;
          font-weight: 600;
        }
      ` }} />
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          ['--cs-scrub-accent' as string]: theme.accent,
          ['--cs-scrub-muted' as string]: theme.textMuted,
        } as React.CSSProperties}
      >
        {/* Vertical baseline */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 1,
            background: theme.textMuted,
            opacity: 0.18,
          }}
        />
        {/* Progress fill on baseline */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: 1,
            height: `${total > 1 ? (activeIndex / (total - 1)) * 100 : 0}%`,
            background: theme.accent,
            opacity: 0.55,
            transition: 'height 540ms cubic-bezier(.22,1,.36,1)',
          }}
        />

        {/* Inter-tick decorative dots (film-strip feel) */}
        {flatSections.slice(0, -1).flatMap((_, i) => {
          const top0 = total > 1 ? (i / (total - 1)) * 100 : 0;
          const top1 = total > 1 ? ((i + 1) / (total - 1)) * 100 : 100;
          return [0.25, 0.5, 0.75].map(frac => {
            const top = top0 + (top1 - top0) * frac;
            return (
              <div
                key={`dot-${i}-${frac}`}
                className="cs-scrub-dot"
                style={{ top: `${top}%` }}
                aria-hidden
              />
            );
          });
        })}

        {/* Section rows */}
        {flatSections.map((s, i) => {
          const top = total > 1 ? (i / (total - 1)) * 100 : 50;
          const isActive = s.id === activeId;
          const tickWidth = isActive ? 28 : s.isChild ? 6 : 10;
          return (
            <div
              key={s.id}
              className={`cs-scrub-row${isActive ? ' active' : ''}${hovered ? ' hovered' : ''}`}
              style={{ position: 'absolute', right: 0, top: `${top}%`, width: '100%' }}
            >
              {/* Tick mark */}
              <button
                type="button"
                className={`cs-scrub-tick${isActive ? ' active' : ''}`}
                onClick={() => onClick(s.id)}
                style={{ width: tickWidth, top: '50%' }}
                aria-label={s.label}
              />

              {/* Hairline connector (active + not hovered) */}
              <div
                className="cs-scrub-connector"
                style={{ top: '50%', width: 60 }}
                aria-hidden
              />

              {/* Active label: serif italic title + small mono number */}
              <div className="cs-scrub-label-active" style={{ top: '50%' }}>
                <span
                  className="num"
                  style={{
                    fontFamily: theme.fontMono ?? 'monospace',
                    color: theme.accent,
                  }}
                >
                  {s.number ?? '·'}
                </span>
                <span
                  className="title"
                  style={{
                    fontFamily: theme.fontSerif ?? 'serif',
                    fontSize: s.isChild ? 18 : 22,
                    color: theme.accent,
                  }}
                >
                  {s.label}
                </span>
              </div>

              {/* Hover label: dim mono uppercase, visible only on rail hover */}
              <button
                type="button"
                className="cs-scrub-label-hover"
                onClick={() => onClick(s.id)}
                tabIndex={hovered ? 0 : -1}
                style={{
                  top: '50%',
                  fontFamily: theme.fontMono ?? 'monospace',
                  color: theme.textMuted,
                  paddingLeft: s.isChild ? 12 : 0,
                  fontStyle: s.isChild ? 'italic' : 'normal',
                }}
              >
                {s.number ? `${s.number} · ` : ''}{s.label}
              </button>
            </div>
          );
        })}
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE PILL (shared)
// ─────────────────────────────────────────────────────────────────────────────

type MobilePillProps = {
  sections: TOCSection[];
  activeFlat?: FlatSection;
  activeIndex: number;
  total: number;
  theme: TOCTheme;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (id: string) => void;
};

function MobilePill({
  sections,
  activeFlat,
  activeIndex,
  total,
  theme,
  isOpen,
  onToggle,
  onSelect,
}: MobilePillProps) {
  const progress = total > 1 ? ((activeIndex + 1) / total) * 100 : 0;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 1280px) {
          .case-study-toc-mobile { display: none !important; }
        }
      ` }} />
      <button
        type="button"
        className="case-study-toc-mobile"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-label="Open case study sections"
        style={{
          position: 'fixed',
          left: '50%',
          bottom: 24,
          transform: 'translateX(-50%)',
          zIndex: 60,
          padding: '12px 20px',
          background: theme.bg,
          border: `1px solid ${theme.border ?? theme.textMuted + '40'}`,
          borderRadius: 999,
          color: theme.text,
          fontFamily: theme.fontMono ?? 'monospace',
          fontSize: 10,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow: '0 8px 28px rgba(0,0,0,0.12)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          maxWidth: 'calc(100vw - 48px)',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: theme.accent,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            color: theme.text,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: 220,
          }}
        >
          {activeFlat?.number ? `${activeFlat.number} · ` : ''}
          {activeFlat?.label ?? '—'}
        </span>
        <span
          aria-hidden
          style={{
            display: 'inline-block',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 220ms',
            opacity: 0.6,
            fontSize: 12,
          }}
        >
          ↑
        </span>
      </button>

      {/* Slide-up sheet */}
      <div
        aria-hidden={!isOpen}
        onClick={onToggle}
        className="case-study-toc-mobile"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.35)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 220ms',
          zIndex: 70,
        }}
      />
      <div
        role="dialog"
        aria-label="Case study sections"
        className="case-study-toc-mobile"
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 80,
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 320ms cubic-bezier(.22,1,.36,1)',
          background: theme.bg,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: '16px 20px 28px',
          maxHeight: '70vh',
          overflowY: 'auto',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.18)',
        }}
      >
        {/* Drag handle */}
        <div
          aria-hidden
          style={{
            width: 36,
            height: 4,
            background: theme.textMuted,
            opacity: 0.3,
            borderRadius: 2,
            margin: '0 auto 16px',
          }}
        />
        {/* Progress bar */}
        <div
          aria-hidden
          style={{
            height: 2,
            background: `${theme.textMuted}30`,
            borderRadius: 1,
            marginBottom: 24,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: `${progress}%`,
              background: theme.accent,
              transition: 'width 320ms ease',
            }}
          />
        </div>
        <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {sections.map(s => {
            const isActive = activeFlat?.id === s.id || (s.children?.some(c => c.id === activeFlat?.id) ?? false);
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => onSelect(s.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 14,
                    padding: '14px 8px',
                    width: '100%',
                    background: 'transparent',
                    border: 0,
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontFamily: theme.fontMono ?? 'monospace',
                    fontSize: 12,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: isActive ? theme.accent : theme.text,
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  <span style={{ minWidth: 24, opacity: 0.6 }}>{s.number ?? '·'}</span>
                  <span style={{ flex: 1 }}>{s.label}</span>
                  {isActive && (
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: theme.accent,
                      }}
                    />
                  )}
                </button>
                {s.children && s.children.length > 0 && (
                  <ol style={{ listStyle: 'none', margin: '0 0 4px 32px', padding: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {s.children.map(c => {
                      const isChildActive = activeFlat?.id === c.id;
                      return (
                        <li key={c.id}>
                          <button
                            type="button"
                            onClick={() => onSelect(c.id)}
                            style={{
                              padding: '8px 0',
                              background: 'transparent',
                              border: 0,
                              textAlign: 'left',
                              cursor: 'pointer',
                              fontFamily: theme.fontSans ?? 'sans-serif',
                              fontSize: 13,
                              fontStyle: 'italic',
                              color: isChildActive ? theme.accent : theme.textMuted,
                              opacity: isChildActive ? 1 : 0.85,
                            }}
                          >
                            {c.label}
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}
