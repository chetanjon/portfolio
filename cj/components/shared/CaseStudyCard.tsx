import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { WorkExperience } from '@/types';
import { cn } from '@/lib/utils';

interface CaseStudyCardProps {
  work: WorkExperience;
  featured?: boolean;
  className?: string;
}

export function CaseStudyCard({ work, featured = false, className }: CaseStudyCardProps) {
  return (
    <Link
      href={`/work/${work.slug}`}
      className={cn(
        'group block bg-bg-secondary rounded-xl border border-border-default hover:border-border-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden',
        className
      )}
    >
      <div
        className={cn(
          'bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center',
          featured ? 'h-48 md:h-56' : 'h-40'
        )}
      >
        <span className="text-white text-3xl font-bold opacity-20">
          {work.company.charAt(0)}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent-primary/10 text-accent-primary">
            {work.type}
          </span>
          <span className="text-xs text-text-muted">
            {work.startDate.split('-')[0]}–{work.endDate === 'Present' ? 'Present' : work.endDate.split('-')[0]}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-text-primary mb-1">{work.company}</h3>
        <p className="text-sm text-text-tertiary mb-3">{work.role}</p>

        <ul className="space-y-1 mb-4">
          {work.metrics.slice(0, 3).map((m) => (
            <li key={m.label} className="text-sm text-text-secondary flex items-start gap-2">
              <span className="text-accent-primary font-semibold shrink-0">{m.value}</span>
              <span>{m.label}</span>
            </li>
          ))}
        </ul>

        <span className="inline-flex items-center text-sm font-medium text-text-muted group-hover:text-accent-primary group-hover:gap-2 gap-1 transition-all">
          {work.caseStudy ? 'Read Case Study' : 'View Details'}
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
