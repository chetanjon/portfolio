'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Heart, BarChart3, Rocket, BookOpen, Search, Users, FileText,
  PenTool, CheckCircle, Map, Layers, Database, GitBranch, Layout,
  Target, RefreshCw, X, ArrowRight, Sparkles, Filter,
  ChevronDown, ExternalLink,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { projects } from '@/data/projects';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  heart: Heart,
  'bar-chart-3': BarChart3,
  rocket: Rocket,
  'book-open': BookOpen,
  search: Search,
  users: Users,
  'file-text': FileText,
  'pen-tool': PenTool,
  'check-circle': CheckCircle,
  map: Map,
  layers: Layers,
  database: Database,
  'git-branch': GitBranch,
  layout: Layout,
  target: Target,
  'refresh-cw': RefreshCw,
};

const statusConfig = {
  completed: { label: 'Completed', color: 'bg-accent-tertiary/15 text-accent-tertiary' },
  'in-progress': { label: 'In Progress', color: 'bg-amber-500/15 text-amber-600' },
  concept: { label: 'Concept', color: 'bg-accent-secondary/15 text-accent-secondary' },
};

const typeFilters = ['all', 'academic', 'personal', 'open-source'] as const;

function ProcessTimeline({ process }: { process: NonNullable<Project['process']> }) {
  return (
    <div className="relative">
      <div className="absolute left-[15px] top-4 bottom-4 w-px bg-border-default" />
      <div className="space-y-4">
        {process.map((step, i) => {
          const Icon = iconMap[step.icon] || CheckCircle;
          return (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="relative flex gap-4 group"
            >
              <div className="relative z-10 w-8 h-8 rounded-full bg-bg-secondary border-2 border-border-default group-hover:border-accent-primary flex items-center justify-center shrink-0 transition-colors duration-200">
                <Icon className="w-3.5 h-3.5 text-text-muted group-hover:text-accent-primary transition-colors duration-200" />
              </div>
              <div className="pt-0.5 pb-2">
                <p className="text-sm font-semibold text-text-primary">{step.step}</p>
                <p className="text-xs text-text-tertiary mt-0.5 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function MetricPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-bg-primary border border-border-default">
      <span className="text-lg font-bold text-accent-primary leading-none">{value}</span>
      <span className="text-xs text-text-tertiary leading-tight">{label}</span>
    </div>
  );
}

function InteractiveProjectCard({ project, index }: { project: Project; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });
  const Icon = iconMap[project.icon] || Sparkles;
  const status = statusConfig[project.status];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      layout
      className={cn(
        'group relative bg-bg-secondary rounded-2xl border border-border-default overflow-hidden transition-shadow duration-300',
        isExpanded ? 'shadow-xl col-span-1 md:col-span-2' : 'shadow-sm hover:shadow-lg'
      )}
    >
      {/* Gradient header */}
      <div
        className={cn(
          'relative h-32 bg-gradient-to-br overflow-hidden transition-all duration-500',
          project.color,
          isExpanded && 'h-40'
        )}
      >
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 opacity-[0.15]" style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }} />

        <div className="absolute top-4 left-5 flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
            <Icon className="w-5 h-5 text-text-primary" />
          </div>
          <div>
            <p className="text-xs font-medium text-text-secondary/80 uppercase tracking-wider">
              {project.year}
            </p>
          </div>
        </div>

        <div className="absolute top-4 right-5 flex gap-2">
          <span className={cn('text-xs font-medium px-2.5 py-1 rounded-full', status.color)}>
            {status.label}
          </span>
        </div>

        {/* Floating metric badges */}
        {project.metrics && !isExpanded && (
          <div className="absolute bottom-3 left-5 flex gap-2 flex-wrap">
            {project.metrics.slice(0, 2).map((m) => (
              <span key={m.label} className="text-xs bg-white/70 backdrop-blur-sm text-text-primary px-2 py-0.5 rounded-md font-medium">
                {m.value} {m.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content body */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-text-primary leading-snug mb-1">
          {project.title}
        </h3>
        <p className="text-sm text-text-tertiary mb-3">{project.subtitle}</p>

        <p className="text-sm text-text-secondary leading-relaxed mb-4">
          {isExpanded ? project.longDescription || project.description : project.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.skills.map((skill) => (
            <span
              key={skill}
              className="text-xs px-2 py-0.5 rounded-md bg-surface-hover text-text-tertiary font-medium"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-border-default pt-5 mt-1 space-y-6">
                {/* Metrics grid */}
                {project.metrics && (
                  <div>
                    <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Key Numbers</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {project.metrics.map((m) => (
                        <MetricPill key={m.label} value={m.value} label={m.label} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Highlights */}
                <div>
                  <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Highlights</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                    {project.highlights.map((h) => (
                      <li key={h} className="text-sm text-text-secondary flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-accent-tertiary mt-0.5 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Process timeline */}
                {project.process && (
                  <div>
                    <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Process</h4>
                    <ProcessTimeline process={project.process} />
                  </div>
                )}

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-primary hover:underline"
                  >
                    View Project <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand/collapse */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 w-full flex items-center justify-center gap-1.5 text-sm font-medium text-text-tertiary hover:text-accent-primary py-2 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer"
        >
          {isExpanded ? (
            <>
              Show Less
              <motion.span
                animate={{ rotate: 180 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.span>
            </>
          ) : (
            <>
              Explore Project
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

export function ProjectsContent() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const allSkills = Array.from(new Set(projects.flatMap((p) => p.skills)));

  const filtered = projects.filter((p) => {
    if (activeFilter !== 'all' && p.type !== activeFilter) return false;
    if (activeSkill && !p.skills.includes(activeSkill)) return false;
    return true;
  });

  const projectCount = {
    all: projects.length,
    academic: projects.filter((p) => p.type === 'academic').length,
    personal: projects.filter((p) => p.type === 'personal').length,
    'open-source': projects.filter((p) => p.type === 'open-source').length,
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-8 md:pt-40 md:pb-12">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-medium tracking-widest text-accent-primary uppercase mb-3">
              Projects & Experiments
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Things I&apos;ve Built
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl">
              Side projects, academic work, and frameworks — where I explore product ideas,
              test hypotheses, and turn experience into reusable knowledge.
            </p>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-wrap gap-6 mt-8 pb-8 border-b border-border-default"
          >
            {[
              { label: 'Projects', value: projects.length },
              { label: 'Completed', value: projects.filter((p) => p.status === 'completed').length },
              { label: 'In Progress', value: projects.filter((p) => p.status === 'in-progress').length },
              { label: 'Skills Covered', value: allSkills.length },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-text-primary">{stat.value}</span>
                <span className="text-sm text-text-muted">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="space-y-4"
          >
            {/* Type filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-text-muted" />
              {typeFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer',
                    activeFilter === filter
                      ? 'bg-accent-secondary text-white'
                      : 'bg-surface-hover text-text-tertiary hover:text-text-primary hover:bg-border-default'
                  )}
                >
                  {filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1).replace('-', ' ')}
                  <span className="ml-1 opacity-60">
                    {projectCount[filter as keyof typeof projectCount]}
                  </span>
                </button>
              ))}
            </div>

            {/* Skill filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-text-muted mr-1">Skills:</span>
              {activeSkill && (
                <button
                  onClick={() => setActiveSkill(null)}
                  className="px-2 py-1 rounded-md text-xs font-medium bg-accent-primary/10 text-accent-primary flex items-center gap-1 cursor-pointer"
                >
                  {activeSkill}
                  <X className="w-3 h-3" />
                </button>
              )}
              {allSkills
                .filter((s) => s !== activeSkill)
                .slice(0, activeSkill ? 8 : 12)
                .map((skill) => (
                  <button
                    key={skill}
                    onClick={() => setActiveSkill(skill)}
                    className="px-2 py-1 rounded-md text-xs text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors cursor-pointer"
                  >
                    {skill}
                  </button>
                ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project grid */}
      <section className="section-padding pt-0">
        <div className="container-wide">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <InteractiveProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-text-muted">No projects match your filters.</p>
              <button
                onClick={() => { setActiveFilter('all'); setActiveSkill(null); }}
                className="mt-2 text-sm text-accent-primary hover:underline cursor-pointer"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
