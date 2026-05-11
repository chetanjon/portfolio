import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display, Syne } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { DebugWrapper } from '@/components/ui/DebugWrapper';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  style: ['normal', 'italic'],
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://chetanjonnalagadda.com'),
  title: {
    default: 'Chetan Jonnalagadda | Product Manager',
    template: '%s | CJ',
  },
  description:
    'Product Manager who ships 0→live: a consumer iOS app live on the App Store, an AI review analyzer (FrictionLens), and a B2B marketplace grown 20 → 75+ vendors with 2x GMV. Owns product, design, and brand. CSPO certified. MS in Management of Technology at ASU.',
  keywords: [
    'Chetan Jonnalagadda',
    'Product Manager',
    'PM',
    '0-to-1',
    'iOS Product Manager',
    'AI Product Manager',
    'Apple Foundation Models',
    'B2B Marketplace',
    'Arizona State University',
    'CSPO',
    'Jobs-to-be-Done',
    'User Research',
    'A/B Testing',
    'Cohort Analysis',
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
      'Product Manager who ships 0→live. Co-founded a consumer iOS app live on the App Store (5.0 launch rating, 7-day V1), built FrictionLens, and scaled a B2B marketplace 20 → 75+ vendors with 2x GMV.',
    siteName: 'Chetan Jonnalagadda',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chetan Jonnalagadda | Product Manager',
    description:
      'Product Manager who ships 0→live. Consumer iOS app on the App Store, FrictionLens AI review analyzer, and a B2B marketplace scaled 3.75x with 2x GMV.',
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
    'msapplication-TileColor': '#C9D2C5',
  },
};

export const viewport: Viewport = {
  themeColor: '#C9D2C5',
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
    addressLocality: 'Phoenix',
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
    '0-to-1 Product',
    'B2B Marketplaces',
    'AI Product Development',
    'Apple Foundation Models',
    'iOS',
    'User Research',
    'Jobs-to-be-Done',
    'A/B Testing',
    'Cohort Analysis',
    'Funnel Instrumentation',
    'Agile',
    'Scrum',
  ],
  sameAs: [
    'https://linkedin.com/in/cjonn',
    'https://github.com/chetanjon',
  ],
  url: 'https://chetanjonnalagadda.com',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Case-study-only fonts referenced by inline styles in components/sections/*-case-study.jsx.
            Loaded here at root so the CSS loads once and is cached across routes.
            eslint-disable-next-line @next/next/no-page-custom-font — the rule assumes Pages Router */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@200;300;400;500;600;700&family=IBM+Plex+Mono:wght@300;400;500&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${syne.variable} font-sans antialiased`}>
        <a
          href="#main-content"
          className="skip-link fixed left-4 top-4 z-[2000] rounded-md bg-bg-primary px-4 py-2 text-sm font-medium text-text-primary shadow-md"
        >
          Skip to main content
        </a>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=s||(p?'dark':'light');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <NoiseOverlay />
          <DebugWrapper />
          <Header />
          <main id="main-content" className="relative z-10 min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
