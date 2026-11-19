import React from 'react';
import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileStickyCTA } from '@/components/layout/MobileStickyCTA';
import { PageTransition } from '@/components/layout/PageTransition';
import { BackToTopButton } from '@/components/ui/MotionPrimitives';
import { constructPageMetadata, getLodgingStructuredData } from '@/lib/seo';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = constructPageMetadata({
  title: 'Narayana Green Resorts — Bodh Gaya Luxury Resort & Weddings',
  description:
    'Escape to Green. Stay in Comfort. Celebrate in Style. Discover a peaceful luxury retreat near sacred Bodh Gaya featuring 19 suites, cottages & view rooms, Auric 24×7 multi-cuisine dining, swimming pool, and grand wedding & corporate lawns.',
  path: '/',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = getLodgingStructuredData();

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#F8F6F0] pb-13 font-sans text-[#16211B] antialiased selection:bg-[#C8A45D] selection:text-[#0E2017] lg:pb-0"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <Header />
        <main className="min-h-[calc(100vh-5rem)]">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <BackToTopButton />
        <MobileStickyCTA />
      </body>
    </html>
  );
}
