import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, MessageCircle, Check, Phone } from 'lucide-react';
import { ROOM_CATEGORIES } from '@/data/rooms';
import { RESORT_CONFIG } from '@/data/resort';
import { buildBookingQueryUrl } from '@/lib/booking';
import { constructPageMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ClipReveal, ParallaxMedia } from '@/components/ui/MotionPrimitives';

export const metadata = constructPageMetadata({
  title: 'Stay & Accommodations — 19 Luxury Units | Narayana Green Resorts Bodh Gaya',
  description:
    'Explore 19 verified luxury accommodations at Narayana Green Resorts near Bodh Gaya: 2 Suites Rooms, 3 independent Cottage Rooms, 6 Pool-View Rooms, and 8 Garden-View Rooms.',
  path: '/stay',
  image: '/media/rooms/suites/suites-room-primary.png',
});

export default function StayPage() {
  return (
    <div className="bg-[#F8F6F0]">
      {/* Page Hero Banner */}
      <section className="relative overflow-hidden border-b border-[#F8F6F0]/10 bg-[#0E2017] py-20 text-[#F8F6F0] lg:py-28">
        <ParallaxMedia offset={24} className="absolute inset-0 z-0 opacity-35">
          <img
            src="/media/hero/hero-resort-villas-5.png"
            alt="Accommodations and villas at Narayana Green Resorts"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
        </ParallaxMedia>
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-[#0E2017] via-[#0E2017]/70 to-[#0E2017]/50"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <Reveal delay={0}>
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-[0.22em] text-[#C8A45D] uppercase">
                <span className="h-px w-8 bg-[#C8A45D]" aria-hidden="true" />
                <span>19 Verified Accommodations</span>
                <span aria-hidden="true">·</span>
                <span>Karmauni, Near Bodh Gaya</span>
              </div>

              <h1 className="mt-4 font-serif text-4xl leading-[1.12] font-medium tracking-tight text-[#F8F6F0] [text-wrap:balance] sm:text-5xl lg:text-6xl">
                Suites, Independent Cottages & Serene View Rooms
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#F8F6F0]/80 sm:text-lg">
                Each of our 19 accommodations is designed to immerse you in the tranquil
                greenery of Bodh Gaya while offering contemporary comfort, private sightlines,
                and 24-hour dining service from Auric 24×7 Restaurant.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Portfolio Breakdown Bar */}
      <section className="border-b border-[#0E2017]/12 bg-[#EFECE3] py-8">
        <Container>
          <Reveal delay={0}>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {ROOM_CATEGORIES.map((room, index) => (
                <Link
                  key={room.slug}
                  href={`/stay/${room.slug}`}
                  className="group border-l border-[#0E2017]/20 pl-4 transition-colors hover:border-[#8C6D32]"
                >
                  <p className="font-mono text-xs font-semibold text-[#8C6D32] uppercase tabular-nums">
                    0{index + 1} · {room.unitCount} Units
                  </p>
                  <p className="mt-1 font-serif text-lg font-medium text-[#0E2017] group-hover:text-[#8C6D32]">
                    {room.name}
                  </p>
                </Link>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Detailed Editorial Breakdown of All 4 Room Categories */}
      <section className="py-16 lg:py-24">
        <Container className="space-y-20">
          {ROOM_CATEGORIES.map((room, index) => (
            <Reveal key={room.slug} delay={index % 2 === 0 ? 75 : 150} className="h-full">
              <article
                className="grid grid-cols-1 items-stretch gap-10 border border-[#0E2017]/15 bg-[#FFFFFF] p-6 sm:p-10 lg:grid-cols-12 h-full"
              >
                {/* Photo Showcase Column */}
                <div
                  className={`flex flex-col gap-4 lg:col-span-7 ${
                    index % 2 === 1 ? 'lg:order-2' : ''
                  }`}
                >
                  <ClipReveal direction="bottom" delay={75}>
                    <Link
                      href={`/stay/${room.slug}`}
                      className="group relative block aspect-[16/10] w-full overflow-hidden border border-[#0E2017]/10 bg-[#183827]"
                    >
                      <img
                        src={room.primaryImage}
                        alt={room.images[0]?.alt || room.name}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      />
                    </Link>
                  </ClipReveal>

                  <div className="grid grid-cols-2 gap-4">
                    {room.images.slice(1, 3).map((img, imgIdx) => (
                      <ClipReveal
                        key={img.src}
                        direction="bottom"
                        delay={imgIdx === 0 ? 150 : 225}
                      >
                        <div className="aspect-[16/10] overflow-hidden border border-[#0E2017]/10 bg-[#183827]">
                          <img
                            src={img.src}
                            alt={img.alt}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
                          />
                        </div>
                      </ClipReveal>
                    ))}
                  </div>
                </div>

                {/* Description & Enquiry Column */}
                <div
                  className={`flex flex-col justify-between lg:col-span-5 ${
                    index % 2 === 1 ? 'lg:order-1' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.18em] text-[#8C6D32] uppercase">
                      <span className="font-mono tabular-nums">0{index + 1}.</span>
                      <span>{room.unitLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{room.tagline}</span>
                    </div>

                    <h2 className="mt-3 font-serif text-3xl font-medium text-[#0E2017] sm:text-4xl">
                      {room.name}
                    </h2>

                    <p className="mt-4 text-base leading-relaxed text-[#4A554E]">
                      {room.editorialDescription}
                    </p>

                    <div className="mt-6 border-y border-[#0E2017]/10 py-5">
                      <p className="text-xs font-semibold tracking-wider text-[#0E2017] uppercase">
                        Verified Category Highlights
                      </p>
                      <ul className="mt-3 space-y-2.5 text-sm text-[#4A554E]">
                        {room.highlights.map((hl) => (
                          <li key={hl} className="flex items-start gap-2.5">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#8C6D32]" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-[#4A554E]">
                      <strong className="text-[#0E2017]">Rate & Tariff Policy:</strong> Official
                      nightly tariffs vary by season, occupancy, and event dates. Contact our
                      reservations desk for bespoke stay packages.
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-3 pt-4">
                    <Link
                      href={buildBookingQueryUrl({ room: room.slug, type: 'stay' })}
                      className="inline-flex items-center gap-2 bg-[#0E2017] px-6 py-3.5 text-xs font-semibold tracking-[0.14em] text-[#F8F6F0] uppercase whitespace-nowrap transition-colors hover:bg-[#183827]"
                    >
                      <MessageCircle className="h-4 w-4 text-[#C8A45D]" />
                      <span>Request a Stay Package</span>
                    </Link>

                    <Link
                      href={`/stay/${room.slug}`}
                      className="inline-flex items-center gap-1.5 border border-[#0E2017]/25 px-6 py-3.5 text-xs font-semibold tracking-[0.14em] text-[#0E2017] uppercase whitespace-nowrap transition-colors hover:border-[#0E2017]"
                    >
                      <span>Explore {room.shortName}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </Container>
      </section>

      {/* Group Buyout Banner (All 19 Units) */}
      <section className="border-t border-[#0E2017]/10 bg-[#0E2017] py-16 text-[#F8F6F0]">
        <Container>
          <Reveal delay={0}>
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <SectionHeading
                eyebrow="Full Resort Accommodation Buyout"
                title="Reserving All 19 Units for Weddings or Group Retreats"
                description="Host your wedding guests, family reunion, or executive leadership group across all 2 Suites, 3 Cottages, 6 Pool-View Rooms, and 8 Garden-View Rooms."
                light
              />

              <div className="flex flex-wrap items-center gap-4 shrink-0">
                <Link
                  href={buildBookingQueryUrl({
                    room: 'Multiple Rooms / Group Block (Up to 19 Units)',
                    type: 'stay',
                  })}
                  className="inline-flex items-center gap-2 bg-[#C8A45D] px-7 py-4 text-xs font-semibold tracking-[0.14em] text-[#0E2017] uppercase"
                >
                  <span>Enquire for Group Block</span>
                </Link>
                <a
                  href={RESORT_CONFIG.contact.phoneHref}
                  className="inline-flex items-center gap-2 border border-[#F8F6F0]/30 px-6 py-4 text-xs font-semibold tracking-[0.14em] text-[#F8F6F0] uppercase"
                >
                  <Phone className="h-4 w-4 text-[#C8A45D]" />
                  <span>{RESORT_CONFIG.contact.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
