import { Badge } from '@/components/ui/Badge';
import { TechStack } from '@/components/shared/TechStack';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const statusConfig = {
  completed: { label: 'Completed', variant: 'success' as const },
  'in-progress': { label: 'In Progress', variant: 'primary' as const },
  concept: { label: 'Concept', variant: 'default' as const },
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  const status = statusConfig[project.status];

  return (
    <div
      className={cn(
        'bg-bg-secondary rounded-xl border border-border-default p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
        className
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="primary" size="sm">{project.type}</Badge>
        <Badge variant={status.variant} size="sm">{status.label}</Badge>
        <span className="text-xs text-text-muted">{project.year}</span>
      </div>

      <h3 className="text-lg font-semibold text-text-primary mb-1">{project.title}</h3>
      <p className="text-sm text-text-tertiary mb-3">{project.subtitle}</p>
      <p className="text-sm text-text-secondary mb-4 leading-relaxed">{project.description}</p>

      <ul className="space-y-1 mb-4">
        {project.highlights.slice(0, 4).map((h) => (
          <li key={h} className="text-sm text-text-secondary flex items-start gap-2">
            <span className="w-1 h-1 rounded-full bg-accent-tertiary mt-2 shrink-0" />
            {h}
          </li>
        ))}
      </ul>

      <TechStack skills={project.skills} />
    </div>
  );
}
