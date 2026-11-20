import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { ROOM_CATEGORIES } from '@/data/rooms';
import { buildBookingQueryUrl } from '@/lib/booking';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ClipReveal, ParallaxMedia } from '@/components/ui/MotionPrimitives';

export function Accommodation() {
  return (
    <section
      id="accommodation"
      className="scroll-mt-20 border-b border-[#0E2017]/8 bg-[#EFECE3] py-24 lg:py-36"
    >
      <Container>
        <Reveal delay={0}>
          <div className="flex flex-col items-start justify-between gap-8 border-b border-[#0E2017]/10 pb-12 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="19 Private Accommodations"
              title="Suites, Independent Cottages & Serene View Rooms"
              description="Every stay at Narayana Green Resorts is anchored in quiet comfort and natural sightlines. Explore our four verified accommodation categories—totalling 19 units across the estate."
            />

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/stay"
                className="group inline-flex items-center gap-2.5 border border-[#0E2017]/20 px-6 py-3.5 text-[11px] font-medium tracking-[0.16em] text-[#0E2017] uppercase whitespace-nowrap transition-all duration-300 hover:border-[#0E2017] hover:bg-[#0E2017] hover:text-[#F8F6F0]"
              >
                <span>Compare All 19 Units</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Staggered Asymmetric Editorial Showcase (Replaces Rigid White Card Grid) */}
        <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:gap-x-16 lg:gap-y-20">
          {ROOM_CATEGORIES.map((room, index) => {
            const isOffset = index % 2 === 1;
            const staggerDelay = (index % 2 === 0 ? 75 : 150) as 75 | 150;

            return (
              <div
                key={room.slug}
                className={isOffset ? 'md:mt-16' : ''}
              >
                <article className="group flex flex-col">
                  {/* Large Frameless-Feeling Photograph with Clip-Path & Slow Parallax Zoom */}
                  <ClipReveal direction="bottom" delay={staggerDelay}>
                    <Link
                      href={`/stay/${room.slug}`}
                      className="relative block aspect-[16/10] w-full overflow-hidden bg-[#183827]"
                    >
                      <ParallaxMedia
                        offset={18}
                        scaleRange={[1.07, 1.01]}
                        className="h-full w-full"
                      >
                        <img
                          src={room.primaryImage}
                          alt={room.images[0]?.alt || room.name}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                        />
                      </ParallaxMedia>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E2017]/65 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-65" />

                      <div className="absolute right-5 bottom-4 left-5 flex items-center justify-between text-xs text-[#F8F6F0]">
                        <span className="font-mono text-[11px] font-normal tracking-[0.18em] text-[#e5cfa0] uppercase tabular-nums">
                          0{index + 1} · {room.unitLabel}
                        </span>
                        <span className="text-[11px] font-light tracking-[0.14em] text-[#F8F6F0]/85 uppercase">
                          {room.images.length} Official Photos
                        </span>
                      </div>
                    </Link>
                  </ClipReveal>

                  {/* Open Editorial Typography Below Photograph */}
                  <div className="pt-7">
                    <Reveal delay={75} distance={14}>
                      <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-medium tracking-[0.18em] text-[#8C6D32] uppercase">
                        <span>{room.tagline}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono font-normal tabular-nums">
                          {room.unitCount} of 19 Resort Units
                        </span>
                      </div>

                      <h3 className="mt-2.5 font-serif text-3xl font-normal tracking-tight text-[#0E2017] sm:text-[2.1rem]">
                        <Link
                          href={`/stay/${room.slug}`}
                          className="transition-colors duration-300 hover:text-[#8C6D32]"
                        >
                          {room.name}
                        </Link>
                      </h3>
                    </Reveal>

                    <Reveal delay={150} distance={14}>
                      <p className="mt-3.5 text-[15px] leading-[1.78] text-[#4A554E]">
                        {room.shortDescription}
                      </p>

                      <p className="mt-3 text-xs leading-relaxed text-[#4A554E]/90">
                        <span className="font-medium tracking-wide text-[#0E2017]">
                          Curated For:
                        </span>{' '}
                        {room.idealFor}
                      </p>
                    </Reveal>

                    {/* Minimalist Hairline Action Row */}
                    <Reveal delay={225} distance={12}>
                      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#0E2017]/12 pt-5">
                        <Link
                          href={`/stay/${room.slug}`}
                          className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.16em] text-[#0E2017] uppercase transition-colors duration-300 hover:text-[#8C6D32]"
                        >
                          <span className="border-b border-[#0E2017]/30 pb-0.5 transition-colors group-hover:border-[#8C6D32]">
                            View Gallery & Details
                          </span>
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>

                        <Link
                          href={buildBookingQueryUrl({ room: room.slug, type: 'stay' })}
                          className="inline-flex items-center gap-2 bg-[#0E2017] px-5 py-2.5 text-[11px] font-medium tracking-[0.16em] text-[#F8F6F0] uppercase whitespace-nowrap transition-all duration-300 hover:bg-[#183827]"
                        >
                          <MessageCircle className="h-3.5 w-3.5 text-[#C8A45D]" />
                          <span>Enquire for Rates</span>
                        </Link>
                      </div>
                    </Reveal>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
