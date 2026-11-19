import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { ROOM_CATEGORIES } from '@/data/rooms';
import { buildBookingQueryUrl } from '@/lib/booking';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ClipReveal } from '@/components/ui/MotionPrimitives';

export function Accommodation() {
  return (
    <section
      id="accommodation"
      className="scroll-mt-20 border-b border-[#0E2017]/10 bg-[#EFECE3] py-20 lg:py-28"
    >
      <Container>
        <Reveal delay={0}>
          <div className="flex flex-col items-start justify-between gap-6 border-b border-[#0E2017]/12 pb-10 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="19 Private Accommodations"
              title="Suites, Independent Cottages & Serene View Rooms"
              description="Every stay at Narayana Green Resorts is anchored in quiet comfort and natural sightlines. Explore our four verified accommodation categories—totalling 19 units across the property."
            />

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/stay"
                className="group inline-flex items-center gap-2 border border-[#0E2017]/25 px-6 py-3 text-xs font-semibold tracking-[0.14em] text-[#0E2017] uppercase whitespace-nowrap transition-colors duration-200 hover:border-[#0E2017] hover:bg-[#0E2017] hover:text-[#F8F6F0]"
              >
                <span>Compare All 19 Units</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* 4 Room Category Cards with Clip-Path Image Reveals & Editorial Text Stagger */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {ROOM_CATEGORIES.map((room, index) => (
            <Reveal
              key={room.slug}
              delay={index % 2 === 0 ? 75 : 150}
              className="h-full"
            >
              <article className="group flex h-full flex-col justify-between border border-[#0E2017]/15 bg-[#F8F6F0] transition-all duration-300 hover:border-[#8C6D32]/65 hover:shadow-[0_18px_40px_-24px_rgba(14,32,23,0.3)]">
                <div>
                  {/* Authentic Room Photograph with Clip-Path Reveal & Subtle Hover Zoom */}
                  <ClipReveal direction="bottom" delay={index % 2 === 0 ? 75 : 150}>
                    <Link
                      href={`/stay/${room.slug}`}
                      className="relative block aspect-[16/10] w-full overflow-hidden bg-[#183827]"
                    >
                      <img
                        src={room.primaryImage}
                        alt={room.images[0]?.alt || room.name}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E2017]/65 via-transparent to-transparent" />

                      <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between text-xs text-[#F8F6F0]">
                        <span className="font-mono font-semibold tracking-wider text-[#C8A45D] uppercase tabular-nums">
                          0{index + 1}. {room.unitLabel}
                        </span>
                        <span className="text-[11px] tracking-wider text-[#F8F6F0]/85 uppercase">
                          {room.images.length} Official Photos
                        </span>
                      </div>
                    </Link>
                  </ClipReveal>

                  {/* Editorial Card Content with Staggered Entrance */}
                  <div className="p-6 sm:p-8">
                    <Reveal delay={75} distance={12}>
                      <div className="flex items-center gap-2 text-xs text-[#8C6D32]">
                        <span>{room.tagline}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">
                          {room.unitCount} of 19 Resort Units
                        </span>
                      </div>

                      <h3 className="mt-2 font-serif text-2xl font-medium text-[#0E2017] sm:text-3xl">
                        <Link
                          href={`/stay/${room.slug}`}
                          className="transition-colors duration-200 hover:text-[#8C6D32]"
                        >
                          {room.name}
                        </Link>
                      </h3>
                    </Reveal>

                    <Reveal delay={150} distance={12}>
                      <p className="mt-3 text-sm leading-relaxed text-[#4A554E] sm:text-base">
                        {room.shortDescription}
                      </p>

                      <p className="mt-3 text-xs leading-relaxed text-[#4A554E]">
                        <strong className="font-semibold text-[#0E2017]">Ideal For:</strong>{' '}
                        {room.idealFor}
                      </p>
                    </Reveal>
                  </div>
                </div>

                {/* Action Footer */}
                <Reveal delay={225} distance={10}>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#0E2017]/10 bg-[#FFFFFF] px-6 py-4 sm:px-8">
                    <Link
                      href={`/stay/${room.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.14em] text-[#0E2017] uppercase transition-colors hover:text-[#8C6D32]"
                    >
                      <span>View Room Gallery & Details</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>

                    <Link
                      href={buildBookingQueryUrl({ room: room.slug, type: 'stay' })}
                      className="inline-flex items-center gap-2 bg-[#0E2017] px-5 py-2.5 text-xs font-semibold tracking-[0.14em] text-[#F8F6F0] uppercase whitespace-nowrap transition-colors duration-200 hover:bg-[#183827]"
                    >
                      <MessageCircle className="h-3.5 w-3.5 text-[#C8A45D]" />
                      <span>Enquire for Rates</span>
                    </Link>
                  </div>
                </Reveal>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
