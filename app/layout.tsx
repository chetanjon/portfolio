import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import PlasmaBackground from '@/components/ui/PlasmaBackground';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://chetanjonnalagadda.com'),
  title: {
    default: 'Chetan Jonnalagadda | Product Manager',
    template: '%s | CJ',
  },
  description:
    'Product Manager focused on B2B marketplace growth, seller experience, and data-driven product development. CSPO certified, MS in Management of Technology at ASU.',
  keywords: [
    'Chetan Jonnalagadda',
    'Product Manager',
    'PM',
    'B2B Marketplace',
    'Seller Experience',
    'Arizona State University',
    'CSPO',
    'Product Development',
    'User Research',
    'Data Analysis',
  ],
  authors: [{ name: 'Chetan Jonnalagadda', url: 'https://chetanjonnalagadda.com' }],
  creator: 'Chetan Jonnalagadda',
  publisher: 'Chetan Jonnalagadda',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chetanjonnalagadda.com',
    title: 'Chetan Jonnalagadda | Product Manager',
    description:
      'Product Manager focused on B2B marketplace growth, seller experience, and data-driven product development. CSPO certified.',
    siteName: 'Chetan Jonnalagadda',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chetan Jonnalagadda | Product Manager',
    description:
      'Product Manager focused on B2B marketplace growth, seller experience, and data-driven product development.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://chetanjonnalagadda.com',
  },
  manifest: '/manifest.json',
  other: {
    'msapplication-TileColor': '#0A0A0A',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Chetan Jonnalagadda',
  jobTitle: 'Product Manager',
  email: 'jonnalagadda8800@gmail.com',
  telephone: '(602) 807-9130',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Tempe',
    addressRegion: 'AZ',
    addressCountry: 'US',
  },
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Arizona State University',
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'JNTU Hyderabad',
    },
  ],
  knowsAbout: [
    'Product Management',
    'B2B Marketplaces',
    'User Research',
    'Data Analysis',
    'Agile',
    'Scrum',
  ],
  sameAs: [
    'https://linkedin.com/in/cjonn',
    'https://github.com/chetanjonnalagadda',
  ],
  url: 'https://chetanjonnalagadda.com',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PlasmaBackground />
        <Header />
        <main className="relative z-10 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
