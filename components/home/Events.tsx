import React from 'react';
import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { RESORT_CONFIG } from '@/data/resort';
import { buildBookingQueryUrl } from '@/lib/booking';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ClipReveal, ParallaxMedia } from '@/components/ui/MotionPrimitives';

export function Events() {
  const { weddingsAndEvents } = RESORT_CONFIG;

  return (
    <section
      id="events"
      className="scroll-mt-20 border-b border-[#F8F6F0]/8 bg-[#0E2017] py-24 text-[#F8F6F0] lg:py-36"
    >
      <Container>
        {/* Top Editorial Proposition */}
        <div className="max-w-3xl">
          <Reveal delay={0}>
            <SectionHeading
              eyebrow={weddingsAndEvents.eyebrow}
              title={weddingsAndEvents.headline}
              description={weddingsAndEvents.description}
              light
            />
          </Reveal>
        </div>

        {/* Monumental Widescreen Lawn Panorama with Integrated Capacity Triad */}
        <div className="mt-14">
          <ClipReveal direction="bottom" delay={75}>
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#183827] lg:aspect-[21/9]">
              <ParallaxMedia
                offset={28}
                scaleRange={[1.1, 1.01]}
                className="h-full w-full"
              >
                <img
                  src="/media/weddings/grand-wedding-lawn.jpeg"
                  alt="Monumental wedding and corporate event lawns at Narayana Green Resorts near Bodh Gaya"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </ParallaxMedia>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E2017] via-[#0E2017]/35 to-transparent" />

              {/* Bottom Overlay Capacity Ribbon */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
                <div className="grid grid-cols-1 gap-6 border-t border-[#F8F6F0]/20 pt-6 sm:grid-cols-3 lg:divide-x lg:divide-[#F8F6F0]/15">
                  {weddingsAndEvents.capacities.map((cap, idx) => (
                    <Reveal
                      key={cap.label}
                      delay={([0, 75, 150] as const)[idx % 3]}
                      distance={12}
                      className={idx === 0 ? 'lg:pr-8' : idx === 1 ? 'lg:px-8' : 'lg:pl-8'}
                    >
                      <div>
                        <p className="font-serif text-3xl font-normal text-[#e5cfa0] tabular-nums sm:text-4xl">
                          {cap.figure}
                        </p>
                        <p className="mt-1 text-[11px] font-medium tracking-[0.2em] text-[#F8F6F0] uppercase">
                          {cap.label}
                        </p>
                        <p className="mt-1 text-xs text-[#F8F6F0]/70">{cap.context}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </ClipReveal>
        </div>

        {/* 4 Celebration Chapters in an Alternating Editorial Lookbook (Replaces 2x2 Dark Box Grid) */}
        <div className="mt-16 divide-y divide-[#F8F6F0]/10 border-t border-[#F8F6F0]/10">
          {weddingsAndEvents.categories.map((cat, index) => {
            const isEven = index % 2 === 1;
            return (
              <div
                key={cat.id}
                className="py-14 lg:py-16"
              >
                <article className="group grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
                  {/* Image Column */}
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : ''}`}>
                    <ClipReveal
                      direction={isEven ? 'right' : 'left'}
                      delay={75}
                    >
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#183827]">
                        <ParallaxMedia
                          offset={20}
                          scaleRange={[1.08, 1.01]}
                          className="h-full w-full"
                        >
                          <img
                            src={cat.image}
                            alt={`${cat.title} at Narayana Green Resorts near Bodh Gaya`}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                          />
                        </ParallaxMedia>
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E2017]/60 via-transparent to-transparent" />
                      </div>
                    </ClipReveal>
                  </div>

                  {/* Story Column */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : ''}`}>
                    <Reveal delay={150} distance={16}>
                      <p className="font-mono text-[11px] font-normal tracking-[0.22em] text-[#C8A45D] uppercase tabular-nums">
                        Chapter 0{index + 1} · {cat.subtitle}
                      </p>
                      <h3 className="mt-3 font-serif text-3xl font-normal text-[#F8F6F0] sm:text-4xl">
                        {cat.title}
                      </h3>
                      <p className="mt-4 text-[15px] leading-[1.8] text-[#F8F6F0]/75">
                        {cat.description}
                      </p>

                      <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-[#F8F6F0]/10 pt-5">
                        <Link
                          href={buildBookingQueryUrl({ type: 'event' })}
                          className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.16em] text-[#C8A45D] uppercase transition-colors hover:text-[#e5cfa0]"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          <span className="border-b border-[#C8A45D]/40 pb-0.5">
                            Request Event Proposal
                          </span>
                        </Link>

                        <Link
                          href="/weddings-events"
                          className="inline-flex items-center gap-1.5 text-[11px] font-normal tracking-[0.16em] text-[#F8F6F0]/75 uppercase transition-colors hover:text-[#F8F6F0]"
                        >
                          <span>Venue Specifications</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </Reveal>
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        {/* Understated Bespoke Celebration Invitation Bar */}
        <Reveal delay={150}>
          <div className="mt-6 flex flex-col items-start justify-between gap-8 border-t border-[#C8A45D]/30 pt-12 sm:flex-row sm:items-center">
            <div className="max-w-2xl">
              <p className="text-[11px] font-medium tracking-[0.22em] text-[#C8A45D] uppercase">
                Bespoke Celebration Concierge
              </p>
              <h3 className="mt-2 font-serif text-2xl font-normal text-[#F8F6F0] sm:text-3xl">
                Planning a Destination Wedding or Corporate Convention Near Bodh Gaya?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#F8F6F0]/70">
                Connect with our events desk to combine grand lawn staging with full 19-unit
                accommodation blocks and custom Auric 24×7 banquet menus.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link
                href={buildBookingQueryUrl({ type: 'event' })}
                className="inline-flex items-center justify-center bg-[#C8A45D] px-8 py-4 text-[11px] font-medium tracking-[0.16em] text-[#0E2017] uppercase whitespace-nowrap transition-all duration-300 hover:bg-[#d6b36c]"
              >
                Wedding & Event Enquiry
              </Link>
              <Link
                href="/weddings-events"
                className="inline-flex items-center justify-center border border-[#F8F6F0]/25 px-7 py-4 text-[11px] font-medium tracking-[0.16em] text-[#F8F6F0] uppercase whitespace-nowrap transition-all duration-300 hover:border-[#C8A45D] hover:text-[#C8A45D]"
              >
                Explore Venues
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
