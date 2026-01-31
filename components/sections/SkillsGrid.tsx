'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { skillCategories } from '@/data/skills';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { cn } from '@/lib/utils';

const proficiencyVariant = {
  expert: 'primary' as const,
  advanced: 'success' as const,
  intermediate: 'default' as const,
};

export function SkillsGrid() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {skillCategories.map((category) => (
        <motion.div
          key={category.name}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="p-6 rounded-xl border border-border-default bg-bg-secondary"
        >
          <h3 className="text-base font-semibold text-text-primary mb-4">{category.name}</h3>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <Badge
                key={skill.name}
                variant={proficiencyVariant[skill.proficiency]}
                size="md"
              >
                {skill.name}
              </Badge>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
