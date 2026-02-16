'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, Linkedin, Github, MapPin, Briefcase, Globe } from 'lucide-react';
import { SectionMarker } from '@/components/ui/SectionMarker';
import { personalInfo } from '@/data/personal';

export function ContactContent() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`);
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {/* Hero Section */}
      <section ref={ref} className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <SectionMarker label="Contact" className="mb-8" />

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Let&apos;s
              <span className="font-serif italic font-normal lowercase"> connect</span>
            </h1>

            <p className="text-lg text-text-secondary max-w-xl">
              I&apos;m always open to discussing product management, potential opportunities,
              or just chatting about tech.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {submitted ? (
                <div className="p-8 rounded-lg border border-border-default text-center">
                  <div className="w-12 h-12 rounded-full border border-border-default flex items-center justify-center mx-auto mb-4">
                    <Send className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-display font-semibold mb-2">Opening your email client...</h3>
                  <p className="text-sm text-text-secondary">
                    If it didn&apos;t open, reach me directly at{' '}
                    <a href={`mailto:${personalInfo.email}`} className="underline hover:no-underline">
                      {personalInfo.email}
                    </a>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-1">
                    <label className="small-caps text-text-muted" htmlFor="name">
                      Your Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="input-minimal"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="small-caps text-text-muted" htmlFor="email">
                      Your Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="input-minimal"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="small-caps text-text-muted" htmlFor="message">
                      Your Message*
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="What would you like to discuss?"
                      rows={4}
                      className="input-minimal resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full border border-text-primary text-text-primary hover:bg-text-primary hover:text-bg-primary transition-colors font-medium tracking-wider uppercase text-sm"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Right: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-8"
            >
              <div>
                <h3 className="small-caps text-text-muted mb-4">Or reach me directly</h3>
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
                      className="flex items-center gap-4 py-4 border-b border-border-default hover:border-text-primary transition-colors group"
                    >
                      <link.icon className="h-5 w-5 text-text-muted group-hover:text-text-primary transition-colors" />
                      <div className="flex-1">
                        <p className="small-caps text-text-muted">{link.label}</p>
                        <p className="text-sm font-medium">{link.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-lg border border-border-default">
                <h3 className="small-caps text-text-muted mb-4">Details</h3>
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
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
