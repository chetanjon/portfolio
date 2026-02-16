'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionMarker } from '@/components/ui/SectionMarker';
import { personalInfo } from '@/data/personal';

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section ref={ref} className="relative py-24 min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Decorative pattern overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-wide relative z-10 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Large CTA text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <SectionMarker number="06" label="Contact" className="mb-8" />

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-[0.95]">
              Let&apos;s work
              <br />
              <span className="font-serif italic font-normal lowercase">together</span>
            </h2>

            <p className="text-text-secondary max-w-md mb-8">
              I&apos;m looking for PM roles where I can dig deep into user problems,
              move fast with lean teams, and build products that measurably improve outcomes.
              B2B, marketplaces, or anywhere users have real friction — let&apos;s talk.
            </p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="small-caps text-text-muted"
            >
              {personalInfo.visaStatus}
            </motion.p>
          </motion.div>

          {/* Right: Contact form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {[
              { id: 'name', label: 'Your Name*', type: 'text', placeholder: 'John Doe' },
              { id: 'email', label: 'Your Email*', type: 'email', placeholder: 'john@example.com' },
            ].map((field, i) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="space-y-1"
              >
                <label className="small-caps text-text-muted" htmlFor={field.id}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  required
                  value={formData[field.id as keyof typeof formData]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="input-minimal"
                />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-1"
            >
              <label className="small-caps text-text-muted" htmlFor="message">
                Your Message*
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your team, what you're building, and what problem you're solving..."
                rows={4}
                className="input-minimal resize-none"
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              type="submit"
              className="w-full py-4 rounded-full border border-text-primary text-text-primary hover:bg-text-primary hover:text-bg-primary transition-colors font-medium tracking-wider uppercase text-sm"
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>

      {/* Decorative bottom line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="h-px bg-border-default origin-left mt-24 container-wide"
      />
    </section>
  );
}
