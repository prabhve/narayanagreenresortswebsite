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
      className="scroll-mt-20 border-b border-[#0E2017]/8 bg-[#EFECE3] py-24 lg:py-36"
    >
      <Container>
        <Reveal delay={0}>
          <div className="mb-14 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Visual Essay"
              title="Resort Moments & Architectural Spaces"
              description="Browse authentic photographs across our estate, 19 rooms & suites, outdoor swimming pool, Auric 24×7 Restaurant, manicured gardens, and grand wedding lawns. Select any photograph to enter the full-screen viewer."
            />

            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2.5 bg-[#0E2017] px-7 py-3.5 text-[11px] font-medium tracking-[0.16em] text-[#F8F6F0] uppercase whitespace-nowrap shrink-0 transition-all duration-300 hover:bg-[#183827]"
            >
              <span>Open Full 20-Photo Gallery</span>
              <ArrowUpRight className="h-4 w-4 text-[#C8A45D] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={75}>
          <ImageGallery limit={6} />
        </Reveal>
      </Container>
    </section>
  );
}
