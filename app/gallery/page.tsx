import React from 'react';
import { constructPageMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { ImageGallery } from '@/components/gallery/ImageGallery';
import { Reveal } from '@/components/ui/Reveal';

export const metadata = constructPageMetadata({
  title: 'Photo Gallery — Rooms, Pool, Lawns & Dining | Narayana Green Resorts Bodh Gaya',
  description:
    'Browse 20 authentic photographs of Narayana Green Resorts near Bodh Gaya: property exterior, 19 suites & cottages, swimming pool, Auric 24×7 Restaurant, gardens, and grand wedding lawns.',
  path: '/gallery',
  image: '/media/hero/hero-resort-exterior-1.png',
});

export default function GalleryPage() {
  return (
    <div className="bg-[#F8F6F0]">
      {/* Page Hero */}
      <section className="border-b border-[#F8F6F0]/10 bg-[#0E2017] py-16 text-[#F8F6F0] lg:py-24">
        <Container>
          <Reveal delay={0}>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-[#C8A45D] uppercase">
                <span className="h-px w-8 bg-[#C8A45D]" aria-hidden="true" />
                <span>Authentic Property Photography</span>
              </div>
              <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight text-[#F8F6F0] sm:text-5xl lg:text-6xl">
                Visual Journey Across Narayana Green Resorts
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#F8F6F0]/80 sm:text-lg">
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
