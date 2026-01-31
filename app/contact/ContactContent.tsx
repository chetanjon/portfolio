'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, Linkedin, Github, MapPin, Briefcase, Globe } from 'lucide-react';
import { Input, Textarea } from '@/components/ui/Input';
import { personalInfo } from '@/data/personal';
import SpotlightCard from '@/components/ui/SpotlightCard';

export function ContactContent() {
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const message = data.get('message') as string;

    window.location.href = `mailto:${personalInfo.email}?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(
      `From: ${name} (${email})\n\n${message}`
    )}`;
    setSubmitted(true);
  };

  return (
    <>
      <section ref={ref} className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-accent-primary" />
              <span className="text-sm font-medium tracking-widest text-accent-primary uppercase">Contact</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Let&apos;s Connect
            </h1>
            <p className="text-lg text-text-secondary">
              I&apos;m always open to discussing product management, potential opportunities,
              or just chatting about tech.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {submitted ? (
                <div className="p-8 rounded-xl border border-accent-secondary/30 bg-accent-secondary/5 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <Send className="h-6 w-6 text-accent-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">Opening your email client...</h3>
                  <p className="text-sm text-text-secondary">
                    If it didn&apos;t open, reach me directly at{' '}
                    <a href={`mailto:${personalInfo.email}`} className="text-accent-primary underline">
                      {personalInfo.email}
                    </a>
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="p-6 md:p-8 rounded-xl border border-border-default bg-bg-secondary space-y-5"
                >
                  <Input label="Name" name="name" placeholder="Your name" required />
                  <Input label="Email" name="email" type="email" placeholder="your@email.com" required />
                  <Textarea label="Message" name="message" placeholder="What would you like to discuss?" required />
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent-primary text-white font-medium rounded-full hover:opacity-90 transition-all shadow-button cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Or reach me directly
              </h3>

              <div className="space-y-3">
                {[
                  { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                  { icon: Linkedin, label: 'LinkedIn', value: 'cjonn', href: personalInfo.linkedin },
                  { icon: Github, label: 'GitHub', value: 'chetanjonnalagadda', href: personalInfo.github },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border-default bg-bg-secondary hover:border-border-hover hover:-translate-y-0.5 transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center shrink-0">
                      <link.icon className="h-5 w-5 text-accent-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted">{link.label}</p>
                      <p className="text-sm font-medium text-text-primary">{link.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <SpotlightCard className="p-6 mt-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-text-muted" />
                    <span className="text-sm text-text-secondary">{personalInfo.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-4 w-4 text-text-muted" />
                    <span className="text-sm text-text-secondary">Open to: {personalInfo.openTo.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-text-muted" />
                    <span className="text-sm text-text-secondary">{personalInfo.visaStatus}</span>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
