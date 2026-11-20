import React from 'react';
import { constructPageMetadata, getWebPageJsonLd } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { ImageGallery } from '@/components/gallery/ImageGallery';
import { Reveal } from '@/components/ui/Reveal';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata = constructPageMetadata({
  title: 'Photo Gallery — Rooms, Pool, Lawns & Dining | Narayana Green Resorts Bodh Gaya',
  description:
    'Browse 20 authentic photographs of Narayana Green Resorts near Bodh Gaya: property exterior, 19 suites & cottages, swimming pool, Auric 24×7 Restaurant, gardens, and grand wedding lawns.',
  path: '/gallery',
  image: '/media/hero/hero-resort-exterior-1.png',
});

export default function GalleryPage() {
  const pageJsonLd = getWebPageJsonLd({
    title: 'Photo Gallery — Rooms, Pool, Lawns & Dining | Narayana Green Resorts Bodh Gaya',
    description:
      'Browse 20 authentic photographs of Narayana Green Resorts near Bodh Gaya: property exterior, 19 suites & cottages, swimming pool, Auric 24×7 Restaurant, gardens, and grand wedding lawns.',
    path: '/gallery',
  });

  return (
    <div className="bg-[#F8F6F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      {/* Page Hero */}
      <section className="border-b border-[#F8F6F0]/10 bg-[#0E2017] py-16 text-[#F8F6F0] lg:py-24">
        <Container>
          <Reveal delay={0}>
            <Breadcrumbs
              variant="light"
              className="mb-6"
              items={[{ name: 'Visual Gallery', path: '/gallery' }]}
            />

            <div className="max-w-3xl">
              <div className="flex items-center gap-3.5 text-[11px] font-medium tracking-[0.24em] text-[#C8A45D] uppercase">
                <span className="h-px w-9 bg-[#C8A45D]/70" aria-hidden="true" />
                <span>Authentic Property Photography</span>
              </div>
              <h1 className="mt-5 font-serif text-4xl font-normal tracking-tight text-[#F8F6F0] sm:text-5xl lg:text-6xl">
                Visual Journey Across Narayana Green Resorts
              </h1>
              <p className="mt-5 max-w-2xl text-[15px] leading-[1.8] font-light text-[#F8F6F0]/80 sm:text-[17px]">
                Filter by category or click any photograph to inspect full-screen with
                keyboard and mobile swipe navigation. Every photograph is an authentic look
                at our grounds in Karmauni, Anuradhi, near Bodh Gaya.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Full Interactive Gallery */}
      <section className="py-16 lg:py-24">
        <Container>
          <ImageGallery />
        </Container>
      </section>
    </div>
  );
}
