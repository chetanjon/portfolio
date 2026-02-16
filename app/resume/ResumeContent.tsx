'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Download, ArrowRight, FileText, Award } from 'lucide-react';
import { SectionMarker } from '@/components/ui/SectionMarker';
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
      {/* Hero Section */}
      <section ref={ref} className="pt-32 pb-8 md:pt-40 md:pb-12">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <SectionMarker label="Resume" className="mb-8" />

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
                  The Full
                  <span className="font-serif italic font-normal lowercase"> picture</span>
                </h1>
                <p className="text-lg text-text-secondary max-w-xl">
                  1.5+ years shipping B2B marketplace features, 3 academic projects with quantified impact,
                  CSPO certified. Here&apos;s everything in one place.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-text-primary text-bg-primary text-xs uppercase tracking-widest font-medium rounded-full hover:opacity-80 transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  View PDF
                </button>
                <a
                  href="/Chetan_Jonnalagadda_PM_Resume.pdf"
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-border-default text-text-primary text-xs uppercase tracking-widest font-medium rounded-full hover:border-text-primary transition-all"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 border-t border-border-default">
        <div className="container-wide">
          <SectionMarker label="Experience" number="01/04" className="mb-8" />

          <div className="space-y-6">
            {workExperiences.map((work, i) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="p-6 border border-border-default rounded-lg hover:border-text-muted transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg font-display font-semibold">{work.role}</h3>
                    <p className="small-caps text-text-muted">
                      {work.company} / {work.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-text-muted whitespace-nowrap">
                      {formatDate(work.startDate)} – {work.endDate === 'Present' ? 'Present' : formatDate(work.endDate)}
                    </span>
                    <span className="px-3 py-1 rounded-full border border-border-default text-[9px] uppercase tracking-wider">
                      {calculateDuration(work.startDate, work.endDate)}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 mb-4">
                  {work.highlights.map((h) => (
                    <li key={h} className="text-sm text-text-secondary flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-text-muted mt-2 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                {work.caseStudy && (
                  <Link
                    href={`/work/${work.slug}`}
                    className="inline-flex items-center text-sm font-medium hover:opacity-60 transition-opacity"
                  >
                    View Case Study
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 border-t border-border-default">
        <div className="container-wide">
          <SectionMarker label="Education" number="02/04" className="mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 border border-border-default rounded-lg"
            >
              <span className="small-caps text-text-muted mb-2 block">Current</span>
              <h3 className="text-lg font-display font-semibold mb-1">{personalInfo.education.current.degree}</h3>
              <p className="text-sm text-text-secondary mb-2">
                {personalInfo.education.current.school}
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-text-muted">
                <span>Expected {personalInfo.education.current.graduation}</span>
                {personalInfo.education.current.gpa && (
                  <>
                    <span>•</span>
                    <span>GPA: {personalInfo.education.current.gpa}</span>
                  </>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 border border-border-default rounded-lg"
            >
              <span className="small-caps text-text-muted mb-2 block">Previous</span>
              <h3 className="text-lg font-display font-semibold mb-1">{personalInfo.education.past.degree}</h3>
              <p className="text-sm text-text-secondary mb-2">
                {personalInfo.education.past.school}
              </p>
              <span className="text-xs text-text-muted">{personalInfo.education.past.graduation}</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 border-t border-border-default">
        <div className="container-wide">
          <SectionMarker label="Skills" number="03/04" className="mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Product Management',
                skills: ['Roadmapping', 'PRDs', 'Sprint Planning', 'Stakeholder Management', 'User Stories', 'Backlog Prioritization'],
              },
              {
                title: 'Research & Analytics',
                skills: ['User Research', 'A/B Testing', 'SQL', 'Mixpanel', 'Data Analysis', 'Customer Interviews'],
              },
              {
                title: 'Tools & Methods',
                skills: ['Figma', 'Jira', 'Notion', 'Miro', 'Agile/Scrum', 'Design Thinking'],
              },
            ].map((category, i) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h3 className="small-caps text-text-muted mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 border border-border-default rounded-full text-[10px] uppercase tracking-wider hover:bg-text-primary hover:text-bg-primary transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 border-t border-border-default">
        <div className="container-wide">
          <SectionMarker label="Certifications" number="04/04" className="mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personalInfo.certifications.map((cert, i) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="p-4 border border-border-default rounded-lg flex items-center gap-3 hover:border-text-muted transition-colors"
              >
                <div className="w-10 h-10 rounded-full border border-border-default flex items-center justify-center shrink-0">
                  <Award className="h-4 w-4 text-text-muted" />
                </div>
                <span className="text-sm font-medium">{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-border-default">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Want the PM who ships
              <span className="font-serif italic font-normal lowercase"> and measures?</span>
            </h2>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              I&apos;m actively looking for PM roles. Let&apos;s talk about what you&apos;re building
              and how I can drive measurable impact on your team.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-text-primary text-bg-primary text-xs uppercase tracking-widest font-medium rounded-full hover:opacity-80 transition-all"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <ResumeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
