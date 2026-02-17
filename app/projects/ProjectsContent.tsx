'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, ChevronDown, ExternalLink } from 'lucide-react';
import { SectionMarker } from '@/components/ui/SectionMarker';
import { projects } from '@/data/projects';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';

const statusConfig = {
  completed: { label: 'Completed' },
  'in-progress': { label: 'In Progress' },
  concept: { label: 'Concept' },
};

const typeFilters = ['all', 'academic', 'personal', 'open-source'] as const;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const status = statusConfig[project.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group border border-border-default rounded-lg overflow-hidden"
    >
      {/* Thumbnail */}
      {project.thumbnail && (
        <div className="relative h-44 overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      {/* Header */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="small-caps text-text-muted">{project.year}</span>
            <h3 className="text-lg font-display font-semibold mt-1">{project.title}</h3>
            <p className="text-sm text-text-muted">{project.subtitle}</p>
          </div>
          <span className="px-3 py-1 rounded-full border border-border-default text-[9px] uppercase tracking-wider">
            {status.label}
          </span>
        </div>

        <p className="text-sm text-text-secondary leading-relaxed mb-4">
          {isExpanded ? project.longDescription || project.description : project.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.skills.slice(0, isExpanded ? project.skills.length : 4).map((skill) => (
            <span
              key={skill}
              className="text-[9px] px-2 py-0.5 rounded-full border border-border-default uppercase tracking-wider"
            >
              {skill}
            </span>
          ))}
          {!isExpanded && project.skills.length > 4 && (
            <span className="text-[9px] px-2 py-0.5 text-text-muted">
              +{project.skills.length - 4} more
            </span>
          )}
        </div>

        {/* Metrics */}
        {project.metrics && (
          <div className="flex flex-wrap gap-4 mb-4">
            {project.metrics.slice(0, isExpanded ? project.metrics.length : 2).map((m) => (
              <div key={m.label}>
                <span className="text-xl font-display font-bold">{m.value}</span>
                <p className="small-caps text-text-muted">{m.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="border-t border-border-default pt-4 mt-4 space-y-4">
                {/* Highlights */}
                <div>
                  <h4 className="small-caps text-text-muted mb-2">Highlights</h4>
                  <ul className="space-y-1">
                    {project.highlights.map((h) => (
                      <li key={h} className="text-sm text-text-secondary flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-text-muted mt-0.5 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium hover:opacity-60 transition-opacity"
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
          className="mt-4 w-full flex items-center justify-center gap-1.5 text-sm text-text-muted hover:text-text-primary py-2 border-t border-border-default transition-colors cursor-pointer"
        >
          {isExpanded ? 'Show Less' : 'Explore Project'}
          <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-4 h-4" />
          </motion.span>
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
            <SectionMarker label="Projects" className="mb-8" />

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Things I&apos;ve
              <span className="font-serif italic font-normal lowercase"> built</span>
            </h1>

            <p className="text-lg text-text-secondary max-w-2xl">
              From sizing a $20M mobility platform in Phoenix to redesigning how people find
              compatible partners — this is where I apply PM rigor outside the day job.
              Academic projects with real data, real users, and real decisions.
            </p>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-wrap gap-8 mt-8 pb-8 border-b border-border-default"
          >
            {[
              { label: 'Projects', value: projects.length },
              { label: 'Completed', value: projects.filter((p) => p.status === 'completed').length },
              { label: 'In Progress', value: projects.filter((p) => p.status === 'in-progress').length },
            ].map((stat) => (
              <div key={stat.label}>
                <span className="text-3xl font-display font-bold">{stat.value}</span>
                <p className="small-caps text-text-muted">{stat.label}</p>
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
              {typeFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    'px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest transition-all duration-200 cursor-pointer',
                    activeFilter === filter
                      ? 'bg-text-primary text-bg-primary'
                      : 'border border-border-default hover:border-text-primary'
                  )}
                >
                  {filter === 'all' ? 'All' : filter.replace('-', ' ')}
                  <span className="ml-1 opacity-60">
                    ({projectCount[filter as keyof typeof projectCount]})
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
                  className="px-2 py-1 rounded-full text-xs bg-text-primary text-bg-primary flex items-center gap-1 cursor-pointer"
                >
                  {activeSkill}
                  <X className="w-3 h-3" />
                </button>
              )}
              {allSkills
                .filter((s) => s !== activeSkill)
                .slice(0, activeSkill ? 6 : 10)
                .map((skill) => (
                  <button
                    key={skill}
                    onClick={() => setActiveSkill(skill)}
                    className="px-2 py-1 rounded-full text-xs border border-border-default hover:border-text-primary transition-colors cursor-pointer"
                  >
                    {skill}
                  </button>
                ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project grid */}
      <section className="py-8">
        <div className="container-wide">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
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
                className="mt-2 text-sm hover:opacity-60 transition-opacity cursor-pointer"
              >
                Clear filters &rarr;
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
