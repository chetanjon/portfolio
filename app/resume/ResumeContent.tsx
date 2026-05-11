'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Download, ArrowRight, FileText, Award, ExternalLink } from 'lucide-react';
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
                  Co-Founder &amp; PM who shipped V1 to the App Store in 7 days with a 5.0 launch rating,
                  scaled a seed-stage B2B marketplace 3.75x, and doubled its GMV. CSPO certified, MS in
                  Management of Technology at ASU. Here&apos;s everything in one place.
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
          <SectionMarker label="Experience" number="01/05" className="mb-8" />

          <div className="space-y-6">
            {workExperiences.filter((w) => w.featured).map((work, i) => (
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

      {/* Projects Section */}
      <section className="py-16 border-t border-border-default">
        <div className="container-wide">
          <SectionMarker label="Projects" number="02/05" className="mb-8" />

          <div className="space-y-6">
            {[
              {
                title: "Strategic Product Teardown: Notion's Activation Paradox",
                tagline: 'Product Strategy / Activation',
                year: '2026',
                href: '/casestudies/notion',
                external: false,
                linkLabel: 'View Case Study',
                points: [
                  'Ran 10 qualitative interviews across 5 user segments triangulated with G2, Trustpilot, Capterra, Reddit r/Notion, and Hacker News review data; identified an activation gap where 8 of 10 interviewees learned core product value from YouTube rather than in-product onboarding, mapped the AARRR funnel, and proposed 5 RICE-scored fixes for 90-day activation lift',
                  'Coined the “workspace decay” concept framing AI agents as workspace stewards rather than setup accelerators; applied Strategy Choice Cascade to translate findings into a defensible product recommendation',
                ],
              },
              {
                title: 'FrictionLens: AI Review Intelligence Tool',
                tagline: 'AI / Full-Stack',
                year: '2026',
                href: 'https://frictionlens.net',
                external: true,
                linkLabel: 'Visit frictionlens.net',
                points: [
                  'Shipped a full-stack AI review analyzer (Next.js, TypeScript, Supabase, Google Gemini) ingesting App Store, Play Store, Reddit, and CSV reviews into a single Vibe Report with BYOK and AES-256-GCM per-user key encryption',
                  'Designed a 3-tier rule-based classifier routing short reviews through keyword + star rules, medium through keyword sentiment, and long batches to Gemini with Zod-validated structured outputs to stay within free-tier API cost curves',
                ],
              },
            ].map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="p-6 border border-border-default rounded-lg hover:border-text-muted transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg font-display font-semibold">{project.title}</h3>
                    <p className="small-caps text-text-muted">{project.tagline}</p>
                  </div>
                  <span className="text-sm text-text-muted whitespace-nowrap">{project.year}</span>
                </div>

                <ul className="space-y-2 mb-4">
                  {project.points.map((p) => (
                    <li key={p} className="text-sm text-text-secondary flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-text-muted mt-2 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>

                {project.external ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium hover:opacity-60 transition-opacity"
                  >
                    {project.linkLabel}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                ) : (
                  <Link
                    href={project.href}
                    className="inline-flex items-center text-sm font-medium hover:opacity-60 transition-opacity"
                  >
                    {project.linkLabel}
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
          <SectionMarker label="Education" number="03/05" className="mb-8" />

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
                <span>{personalInfo.education.current.graduation}</span>
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
          <SectionMarker label="Skills" number="04/05" className="mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Analytics & Data',
                skills: ['SQL', 'Python', 'Mixpanel', 'PostHog', 'Google Analytics', 'Excel'],
              },
              {
                title: 'AI / ML',
                skills: ['Apple Foundation Models', 'Google Gemini', 'OpenAI API', 'Structured Outputs (Zod)', 'On-Device AI'],
              },
              {
                title: 'Methods',
                skills: ['Agile/Scrum', 'A/B Testing', 'User Research', 'PRDs', 'RICE', 'Cohort Analysis', 'Statistical Testing'],
              },
              {
                title: 'Design & Build',
                skills: ['UI/UX', 'Design Systems', 'Brand Voice', 'TypeScript', 'Next.js', 'React', 'SwiftUI', 'Supabase'],
              },
              {
                title: 'Tools',
                skills: ['Figma', 'Notion', 'Jira', 'Confluence'],
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
          <SectionMarker label="Certifications" number="05/05" className="mb-8" />

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
