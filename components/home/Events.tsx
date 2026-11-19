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
      className="scroll-mt-20 border-b border-[#F8F6F0]/10 bg-[#0E2017] py-20 text-[#F8F6F0] lg:py-28"
    >
      <Container>
        {/* Top Split: Editorial Proposition + Published Capacity Figures */}
        <div className="grid grid-cols-1 items-end gap-10 border-b border-[#F8F6F0]/12 pb-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal delay={0}>
              <SectionHeading
                eyebrow={weddingsAndEvents.eyebrow}
                title={weddingsAndEvents.headline}
                description={weddingsAndEvents.description}
                light
              />
            </Reveal>
          </div>

          {/* Published Capacity Figures with Staggered Reveal */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-3 gap-4 border border-[#C8A45D]/30 bg-[#183827]/60 p-6">
              {weddingsAndEvents.capacities.map((cap, idx) => (
                <Reveal
                  key={cap.label}
                  delay={([0, 75, 150] as const)[idx % 3]}
                  distance={12}
                >
                  <div className="text-center sm:text-left">
                    <p className="font-serif text-2xl font-medium text-[#C8A45D] tabular-nums sm:text-3xl">
                      {cap.figure}
                    </p>
                    <p className="mt-1 text-[11px] font-semibold tracking-wider text-[#F8F6F0] uppercase">
                      {cap.label}
                    </p>
                    <p className="mt-1 hidden text-[11px] leading-snug text-[#F8F6F0]/65 sm:block">
                      {cap.context}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Event Showcase Cards with Clip-Path Reveals & Scroll-Linked Slow Image Scale */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {weddingsAndEvents.categories.map((cat, index) => (
            <Reveal
              key={cat.id}
              delay={index % 2 === 0 ? 75 : 150}
              className="h-full"
            >
              <article className="group flex h-full flex-col justify-between border border-[#F8F6F0]/15 bg-[#183827]/35 transition-colors duration-300 hover:border-[#C8A45D]/55">
                <div>
                  <ClipReveal direction="bottom" delay={index % 2 === 0 ? 75 : 150}>
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#183827]">
                      <ParallaxMedia
                        offset={16}
                        scaleRange={[1.09, 1.0]}
                        className="h-full w-full"
                      >
                        <img
                          src={cat.image}
                          alt={`${cat.title} at Narayana Green Resorts near Bodh Gaya`}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                        />
                      </ParallaxMedia>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E2017]/85 via-[#0E2017]/20 to-transparent" />
                      <div className="absolute bottom-4 left-5 right-5">
                        <p className="font-mono text-xs font-semibold tracking-wider text-[#C8A45D] uppercase tabular-nums">
                          0{index + 1}. {cat.subtitle}
                        </p>
                      </div>
                    </div>
                  </ClipReveal>

                  <div className="p-6 sm:p-8">
                    <Reveal delay={75} distance={10}>
                      <h3 className="font-serif text-2xl font-medium text-[#F8F6F0]">
                        {cat.title}
                      </h3>
                    </Reveal>
                    <Reveal delay={150} distance={10}>
                      <p className="mt-3 text-sm leading-relaxed text-[#F8F6F0]/75 sm:text-base">
                        {cat.description}
                      </p>
                    </Reveal>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#F8F6F0]/10 px-6 py-4 sm:px-8">
                  <Link
                    href={buildBookingQueryUrl({ type: 'event' })}
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-[#C8A45D] uppercase hover:underline"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>Request Event Proposal</span>
                  </Link>

                  <Link
                    href="/weddings-events"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#F8F6F0]/80 transition-colors hover:text-[#F8F6F0]"
                  >
                    <span>Venue Specs</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Dedicated Wedding & Corporate CTA Banner */}
        <Reveal delay={150}>
          <div className="mt-12 flex flex-col items-start justify-between gap-6 border border-[#C8A45D]/35 bg-[#183827]/70 p-8 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-[#C8A45D] uppercase">
                Bespoke Celebration Planning
              </p>
              <h3 className="mt-1 font-serif text-2xl font-medium text-[#F8F6F0]">
                Planning a Destination Wedding or Corporate Convention Near Bodh Gaya?
              </h3>
              <p className="mt-1 text-sm text-[#F8F6F0]/75">
                Connect with our events desk to combine grand lawn staging with full 19-unit
                accommodation blocks.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href={buildBookingQueryUrl({ type: 'event' })}
                className="inline-flex items-center justify-center bg-[#C8A45D] px-7 py-4 text-xs font-semibold tracking-[0.14em] text-[#0E2017] uppercase whitespace-nowrap transition-colors hover:bg-[#d6b36c]"
              >
                Wedding & Event Enquiry
              </Link>
              <Link
                href="/weddings-events"
                className="inline-flex items-center justify-center border border-[#F8F6F0]/30 px-6 py-4 text-xs font-semibold tracking-[0.14em] text-[#F8F6F0] uppercase whitespace-nowrap transition-colors hover:border-[#C8A45D] hover:text-[#C8A45D]"
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
