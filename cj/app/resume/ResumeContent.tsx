'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Download, ArrowRight, ExternalLink, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { SkillsGrid } from '@/components/sections/SkillsGrid';
import { ContactCTA } from '@/components/sections/ContactCTA';
import ResumeModal from '@/components/ui/ResumeModal';
import { workExperiences } from '@/data/work';
import { personalInfo } from '@/data/personal';
import { formatDate, calculateDuration } from '@/lib/utils';

export function ResumeContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <>
      <section ref={ref} className="pt-32 pb-8 md:pt-40">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-px bg-accent-primary" />
                <span className="text-sm font-medium tracking-widest text-accent-primary uppercase">Resume</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
                Resume
              </h1>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary text-white font-medium rounded-full hover:opacity-90 transition-all shadow-button cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                View PDF
              </button>
              <a
                href="/Chetan_Jonnalagadda_PM_Resume.pdf"
                download
                className="inline-flex items-center gap-2 px-4 py-2 border border-border-default text-text-secondary hover:text-text-primary hover:border-border-hover font-medium rounded-full transition-all"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding pt-8">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Experience</h2>
          <div className="space-y-4 mb-16">
            {workExperiences.map((work, i) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="p-6 rounded-xl border border-border-default bg-bg-secondary"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">{work.role}</h3>
                    <p className="text-sm text-text-tertiary">
                      {work.company} &middot; {work.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-text-muted whitespace-nowrap">
                      {formatDate(work.startDate)} – {work.endDate === 'Present' ? 'Present' : formatDate(work.endDate)}
                    </span>
                    <Badge variant="outline" size="sm">{calculateDuration(work.startDate, work.endDate)}</Badge>
                  </div>
                </div>

                <ul className="space-y-1 mb-4">
                  {work.highlights.map((h) => (
                    <li key={h} className="text-sm text-text-secondary flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent-primary mt-2 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                {work.caseStudy && (
                  <Link
                    href={`/work/${work.slug}`}
                    className="inline-flex items-center text-sm text-accent-primary font-medium hover:underline"
                  >
                    View Case Study
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-6">Education</h2>
          <div className="space-y-4 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-xl border border-border-default bg-bg-secondary"
            >
              <h3 className="text-lg font-semibold text-text-primary">{personalInfo.education.current.degree}</h3>
              <p className="text-sm text-text-tertiary">
                {personalInfo.education.current.school} &middot; Expected {personalInfo.education.current.graduation}
                {personalInfo.education.current.gpa && ` &middot; GPA: ${personalInfo.education.current.gpa}`}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-xl border border-border-default bg-bg-secondary"
            >
              <h3 className="text-lg font-semibold text-text-primary">{personalInfo.education.past.degree}</h3>
              <p className="text-sm text-text-tertiary">
                {personalInfo.education.past.school} &middot; {personalInfo.education.past.graduation}
              </p>
            </motion.div>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-6">Skills</h2>
          <div className="mb-16">
            <SkillsGrid />
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-6">Certifications</h2>
          <div className="space-y-2 mb-16">
            {personalInfo.certifications.map((cert) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="p-4 rounded-xl border border-border-default bg-bg-secondary flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-accent-secondary/10 flex items-center justify-center shrink-0">
                  <ExternalLink className="h-4 w-4 text-accent-secondary" />
                </div>
                <span className="text-sm font-medium text-text-primary">{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
      <ResumeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
