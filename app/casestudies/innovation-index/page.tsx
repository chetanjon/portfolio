import type { Metadata } from 'next';
import Link from 'next/link';
import { getProjectBySlug } from '@/data/projects';

const project = getProjectBySlug('innovation-index-analysis');

export const metadata: Metadata = {
  title: 'Innovation Index Analysis · G20 vs Non-G20',
  description:
    'A Python analysis on a 1,862-record innovation dataset (130 countries, 13 years). t-tests and ANOVA surfaced 15 non-G20 countries above the G20 average; a regression found education explains only 7.3% of innovation variance.',
};

export default function InnovationIndexPage() {
  if (!project) return null;

  return (
    <article className="pt-32 pb-24 md:pt-40">
      <div className="container-wide max-w-4xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <span className="section-marker">[ Thinking ] [ {project.subtitle} ]</span>
          <Link
            href="/casestudies"
            className="text-[11px] uppercase tracking-widest text-text-muted hover:text-text-primary transition-colors whitespace-nowrap"
          >
            &larr; All work
          </Link>
        </div>

        <h1 className="font-display font-bold text-4xl md:text-6xl tracking-tight leading-[0.95] mb-6">
          {project.title}
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mb-12">
          {project.longDescription ?? project.description}
        </p>

        {project.metrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border-default border border-border-default rounded-lg overflow-hidden mb-14">
            {project.metrics.map((m) => (
              <div key={m.label} className="bg-bg-primary p-6">
                <p className="font-display font-bold text-2xl md:text-3xl tabular-nums text-accent-primary leading-none">
                  {m.value}
                </p>
                <p className="small-caps text-text-muted mt-2">{m.label}</p>
                {m.context && <p className="text-xs text-text-muted mt-1 leading-snug">{m.context}</p>}
              </div>
            ))}
          </div>
        )}

        <h2 className="font-display font-bold text-2xl tracking-tight mb-5">What I did</h2>
        <ul className="space-y-3 mb-14 max-w-2xl">
          {project.highlights.map((h) => (
            <li key={h} className="text-text-secondary leading-relaxed flex gap-3">
              <span className="mt-2 w-1 h-1 rounded-full bg-accent-primary/70 shrink-0" aria-hidden />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {project.process && (
          <>
            <h2 className="font-display font-bold text-2xl tracking-tight mb-5">How</h2>
            <ol className="grid gap-x-10 gap-y-8 md:grid-cols-2 mb-14">
              {project.process.map((p, i) => (
                <li key={p.step} className="tick-rule pt-5">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-accent-primary tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display font-semibold text-lg mt-2">{p.step}</h3>
                  <p className="text-sm text-text-secondary mt-1 leading-relaxed">{p.description}</p>
                </li>
              ))}
            </ol>
          </>
        )}

        <Link
          href="/casestudies"
          className="inline-flex items-center gap-2 text-sm font-medium text-accent-primary hover:opacity-80 transition-opacity"
        >
          &larr; Back to all work
        </Link>
      </div>
    </article>
  );
}
