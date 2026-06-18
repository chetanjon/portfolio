import type { NavItem } from '@/types';

export const navItems: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/casestudies', label: 'Case Studies' },
  { href: '/craft', label: 'Craft' },
  { href: '/about', label: 'About' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
];

export const siteConfig = {
  name: 'CJ',
  title: 'Chetan Jonnalagadda | Product Manager',
  description:
    'Product manager who designs, builds, and ships consumer and AI products, and scaled a B2B marketplace 3.75x. CSPO certified, MS in Management of Technology at ASU.',
  url: 'https://chetanjonnalagadda.com',
  ogImage: '/og-image.png',
};
