import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ImageGallery } from '@/components/gallery/ImageGallery';
import { Reveal } from '@/components/ui/Reveal';

export function GalleryPreview() {
  return (
    <section
      id="gallery"
      className="scroll-mt-20 border-b border-[#0E2017]/10 bg-[#EFECE3] py-20 lg:py-28"
    >
      <Container>
        <Reveal delay={0}>
          <div className="mb-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Visual Journey"
              title="Resort Moments & Architectural Spaces"
              description="Browse authentic photographs across our property, 19 rooms & suites, outdoor swimming pool, Auric 24×7 Restaurant, manicured gardens, and grand wedding lawns. Click any photograph to launch the full-screen viewer."
            />

            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 bg-[#0E2017] px-6 py-3.5 text-xs font-semibold tracking-[0.14em] text-[#F8F6F0] uppercase whitespace-nowrap shrink-0 transition-colors hover:bg-[#183827]"
            >
              <span>Open Full 20-Photo Gallery</span>
              <ArrowUpRight className="h-4 w-4 text-[#C8A45D]" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <ImageGallery limit={9} />
        </Reveal>
      </Container>
    </section>
  );
}
