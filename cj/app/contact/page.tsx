import type { Metadata } from 'next';
import { ContactContent } from './ContactContent';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch — I\'m always open to discussing product management and opportunities.',
};

export default function ContactPage() {
  return <ContactContent />;
}
