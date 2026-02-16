'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionMarker } from '@/components/ui/SectionMarker';
import { skillCategories } from '@/data/skills';

export function Expertise() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-4%']);

  return (
    <section ref={ref} className="py-24 px-6 md:px-12 border-t border-border-default relative overflow-hidden">
      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <SectionMarker number="05" label="Expertise" className="mb-8" />
        </motion.div>

        <motion.div style={{ y: titleY }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-16"
          >
            Skills &amp;
            <span className="font-serif italic font-normal lowercase"> Expertise</span>
          </motion.h2>
        </motion.div>

        {/* Main categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 text-xs uppercase tracking-widest font-medium mb-16"
        >
          {skillCategories.map((category) => (
            <span key={category.name} className="hover:text-text-secondary transition-colors cursor-default">
              / {category.name}
            </span>
          ))}
        </motion.div>

        {/* Skill pills by category */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h3 className="small-caps text-text-muted mb-4 border-b border-border-default pb-2">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.03 }}
                    className="px-3 py-1.5 rounded-full border border-border-default text-sm hover:bg-text-primary hover:text-bg-primary hover:border-text-primary transition-colors cursor-default"
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 pt-12 border-t border-border-default text-center"
        >
          <p className="small-caps text-text-muted mb-6">Tools &amp; Technologies</p>
          <p className="text-[9px] leading-relaxed uppercase tracking-wide max-w-xs mx-auto font-mono text-text-tertiary">
            Figma &middot; Jira &middot; Notion &middot; Miro<br />
            SQL &middot; Python &middot; Mixpanel &middot; Google Analytics<br />
            Amplitude &middot; Looker &middot; Tableau &middot; Excel
          </p>
        </motion.div>
      </div>
    </section>
  );
}
