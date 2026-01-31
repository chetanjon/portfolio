import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
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
    'Product Manager with expertise in B2B marketplaces, data-driven product development, and scaling products from 0 to 1.',
  keywords: ['Product Manager', 'PM', 'B2B', 'Marketplace', 'Arizona State University'],
  authors: [{ name: 'CJ' }],
  creator: 'CJ',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chetanj.com',
    title: 'CJ | Product Manager',
    description:
      'Product Manager with expertise in B2B marketplaces, data-driven product development, and scaling products from 0 to 1.',
    siteName: 'CJ Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CJ | Product Manager',
    description: 'Product Manager with expertise in B2B marketplaces.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'CJ',
  jobTitle: 'Product Manager',
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Arizona State University',
    },
  ],
  knowsAbout: ['Product Management', 'B2B Marketplaces', 'User Research'],
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
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
