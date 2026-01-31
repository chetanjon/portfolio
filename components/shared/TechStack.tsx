import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface TechStackProps {
  skills: string[];
  className?: string;
}

export function TechStack({ skills, className }: TechStackProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {skills.map((skill) => (
        <Badge key={skill} variant="default" size="sm">
          {skill}
        </Badge>
      ))}
    </div>
  );
}
