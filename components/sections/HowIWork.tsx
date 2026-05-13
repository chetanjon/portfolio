'use client';

import { motion } from 'framer-motion';
import { SectionMarker } from '@/components/ui/SectionMarker';

const paragraphs = [
  {
    heading: 'How I scope',
    body:
      "I find the smallest version of the problem that's still worth solving, then I write the spec myself. I run cold user interviews before I touch a wireframe. The 16 archetype interviews behind Aatram V2 killed a feature set we'd already started building. That's the kind of cut I make on purpose.",
  },
  {
    heading: 'How I decide',
    body:
      "I'd rather ship the second-best decision quickly than the best decision late. I keep RICE scores for the top of the backlog and a written one-line rationale for every cut. When the team disagrees, I write the brief instead of arguing in Slack.",
  },
  {
    heading: 'How I ship',
    body:
      "I prototype in Figma when a written spec isn't enough. I work closely with engineers, and my technical background means I'm useful in the room when they need product context. V1 of Aatram hit the App Store in seven days because we were aligned across product, design, and engineering from day one.",
  },
];

export function HowIWork() {
  return (
    <section className="py-24 md:py-32 px-6 bg-bg-primary">
      <div className="container-wide max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <SectionMarker number="02" label="How I Work" />
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mt-4 leading-[1.05] tracking-tight uppercase">
            From the editor.
          </h2>
        </motion.div>

        {/* Bio intro — short who-I-am paragraph in CJ's actual voice,
            not a credential dump. Sets up the testimonial about Aatram's Timer
            by establishing that CJ dogfoods her own products. */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display text-text-primary text-lg md:text-xl leading-relaxed mb-10 max-w-2xl"
        >
          I&rsquo;m Chetan, a product manager with engineering training and a designer&rsquo;s eye. At <em className="font-serif italic">Aatram</em>, I co-founded and led product on a consumer iOS app now live on the App Store. At <em className="font-serif italic">FrictionLens</em>, I shipped a full-stack AI review intelligence platform with a public marketing site and dashboard. Before either, I ran the vendor side of a B2B handloom marketplace and scaled it 3.75× from 20 to 75 vendors, while doubling GMV. CSPO certified. MS in Management of Technology from Arizona State University. Phoenix is where I sleep. The work is portable.
        </motion.p>

        <div className="space-y-10">
          {paragraphs.map((p, i) => (
            <motion.div
              key={p.heading}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h3 className="small-caps text-text-muted mb-3">{p.heading}</h3>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-display-serif italic text-xl md:text-2xl text-text-secondary mt-14 text-right"
        >
          — Chetan
        </motion.p>
      </div>
    </section>
  );
}
