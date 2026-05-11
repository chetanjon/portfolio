import type { NavItem } from '@/types';

export const navItems: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/casestudies', label: 'Case Studies' },
  { href: '/craft', label: 'Craft' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
];

export const siteConfig = {
  name: 'CJ',
  title: 'CJ | Product Manager',
  description:
    'Product Manager focused on B2B marketplace growth, seller experience, and data-driven product development. CSPO certified, MS in Management of Technology at ASU.',
  url: 'https://chetanjonnalagadda.com',
  ogImage: '/og-image.png',
};
