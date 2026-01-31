import type { Metadata } from 'next';
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
  metadataBase: new URL('https://chetanj.com'),
  title: {
    default: 'CJ | Product Manager',
    template: '%s | CJ',
  },
  description:
    'Product Manager focused on B2B marketplace growth, seller experience, and data-driven product development. CSPO certified, MS in Management of Technology at ASU.',
  keywords: ['Product Manager', 'PM', 'B2B', 'Marketplace', 'Arizona State University', 'CSPO'],
  authors: [{ name: 'Chetan Jonnalagadda' }],
  creator: 'Chetan Jonnalagadda',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chetanj.com',
    title: 'CJ | Product Manager',
    description:
      'Product Manager focused on B2B marketplace growth, seller experience, and data-driven product development.',
    siteName: 'CJ Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CJ | Product Manager',
    description: 'Product Manager focused on B2B marketplace growth and seller experience.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Chetan Jonnalagadda',
  jobTitle: 'Product Manager',
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Arizona State University',
    },
  ],
  knowsAbout: ['Product Management', 'B2B Marketplaces', 'User Research', 'Data Analysis'],
  url: 'https://chetanj.com',
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
