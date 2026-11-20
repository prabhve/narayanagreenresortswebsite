import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { RESORT_CONFIG } from '@/data/resort';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ClipReveal, ParallaxMedia } from '@/components/ui/MotionPrimitives';

export function Intro() {
  return (
    <section
      id="resort-intro"
      className="scroll-mt-20 border-b border-[#0E2017]/8 bg-[#F8F6F0] py-24 lg:py-36"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Left Column: Editorial Narrative & Philosophy */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <Reveal delay={0}>
                <SectionHeading
                  eyebrow="A Sanctuary of Quietude Near Bodh Gaya"
                  title="Where Timeless Nature Meets Unhurried Hospitality"
                />
              </Reveal>

              <Reveal delay={75}>
                <blockquote className="mt-7 border-y border-[#0E2017]/10 py-4 font-serif text-xl italic font-normal text-[#8C6D32] sm:text-2xl">
                  “{RESORT_CONFIG.positioning}”
                </blockquote>
              </Reveal>

              <Reveal delay={150}>
                <div className="mt-7 space-y-5 text-[15px] leading-[1.82] font-normal text-[#4A554E] sm:text-base">
                  <p>
                    Set amid the tranquil green expanses of{' '}
                    <span className="text-[#0E2017]">
                      Karmauni, Anuradhi, near sacred Bodh Gaya
                    </span>
                    , {RESORT_CONFIG.name} is an intimate retreat conceived for discerning
                    travellers, families, and spiritual pilgrims seeking calm away from urban
                    commotion.
                  </p>
                  <p>
                    Across manicured lawns and shaded walkways, our estate brings together{' '}
                    <span className="text-[#0E2017]">19 private accommodations</span>—spanning
                    Suites, independent Cottages, Pool-View Rooms, and Garden-View Rooms—with
                    round-the-clock culinary hospitality at{' '}
                    <span className="text-[#0E2017]">Auric 24×7 Restaurant</span>, serene
                    aquatic leisure, and grand open-air celebration grounds.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Unboxed Editorial Chapters */}
            <div className="mt-10 border-t border-[#0E2017]/10 pt-8">
              <Reveal delay={225}>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div>
                    <p className="font-mono text-[11px] font-normal tracking-[0.2em] text-[#8C6D32] uppercase">
                      01 / Restful Comfort & Nature
                    </p>
                    <p className="mt-2 text-sm leading-[1.7] text-[#4A554E]">
                      Wake to tranquil garden foliage or shimmering pool reflections across 19
                      thoughtfully appointed living spaces.
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] font-normal tracking-[0.2em] text-[#8C6D32] uppercase">
                      02 / Mindful Leisure & Celebrations
                    </p>
                    <p className="mt-2 text-sm leading-[1.7] text-[#4A554E]">
                      From meditation, recreational fishing, and swimming to destination
                      weddings for 2,500+ guests.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <div className="mt-10 flex flex-wrap items-center gap-7">
                  <Link
                    href="/stay"
                    className="group inline-flex items-center gap-3 bg-[#0E2017] px-7 py-3.5 text-[11px] font-medium tracking-[0.16em] text-[#F8F6F0] uppercase transition-all duration-300 hover:bg-[#183827]"
                  >
                    <span>Explore Our 19 Rooms</span>
                    <ArrowRight className="h-4 w-4 text-[#C8A45D] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" />
                  </Link>

                  <a
                    href={RESORT_CONFIG.links.googleMapsShare}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.16em] text-[#0E2017] uppercase transition-colors duration-300 hover:text-[#8C6D32]"
                  >
                    <MapPin className="h-4 w-4 text-[#8C6D32] transition-transform duration-300 group-hover:-translate-y-0.5" />
                    <span className="border-b border-[#0E2017]/25 pb-0.5 transition-colors group-hover:border-[#8C6D32]">
                      View Official Resort Map
                    </span>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Layered Editorial Photo Composition with Spring Parallax */}
          <div className="grid grid-cols-12 items-start gap-5 lg:col-span-6">
            <div className="col-span-12 sm:col-span-7">
              <ClipReveal
                direction="bottom"
                delay={75}
                className="overflow-hidden bg-[#183827]"
              >
                <ParallaxMedia
                  offset={24}
                  scaleRange={[1.08, 1.01]}
                  className="aspect-[4/5] w-full"
                >
                  <img
                    src="/media/resort/resort-sanctuary-overview.jpeg"
                    alt="Narayana Green Resorts architecture and manicured garden grounds near Bodh Gaya"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03]"
                  />
                </ParallaxMedia>
              </ClipReveal>
              <Reveal delay={150}>
                <p className="mt-3 text-[11px] tracking-[0.14em] text-[#4A554E] uppercase">
                  Estate Grounds · Karmauni, Anuradhi
                </p>
              </Reveal>
            </div>

            <div className="col-span-12 flex flex-col gap-6 sm:col-span-5 sm:mt-14">
              <ClipReveal
                direction="right"
                delay={150}
                className="overflow-hidden bg-[#183827]"
              >
                <ParallaxMedia
                  offset={30}
                  scaleRange={[1.1, 1.02]}
                  className="aspect-[3/4] w-full"
                >
                  <img
                    src="/media/resort/resort-lawn-walkway.jpeg"
                    alt="Landscaped green walkway at Narayana Green Resorts"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03]"
                  />
                </ParallaxMedia>
              </ClipReveal>

              <Reveal delay={225}>
                <div className="border-t border-[#8C6D32]/35 pt-4">
                  <p className="text-[10px] font-medium tracking-[0.22em] text-[#8C6D32] uppercase">
                    Sacred Proximity
                  </p>
                  <p className="mt-1.5 font-serif text-lg leading-snug font-normal text-[#0E2017]">
                    Minutes from the UNESCO World Heritage Mahabodhi Temple corridor in Bodh
                    Gaya, Bihar.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Open Architectural Key Facts Ribbon (Replaces Heavy Boxed Table) */}
        <div className="mt-20 border-y border-[#0E2017]/10 py-10 lg:mt-28 lg:py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-[#0E2017]/10">
            {RESORT_CONFIG.keyFacts.map((fact, index) => (
              <Reveal
                key={fact.unit}
                delay={([0, 75, 150, 225] as const)[index % 4]}
                className={
                  index === 0
                    ? 'lg:pr-8'
                    : index === RESORT_CONFIG.keyFacts.length - 1
                      ? 'lg:pl-8'
                      : 'lg:px-8'
                }
              >
                <div>
                  <p className="font-serif text-4xl font-normal tracking-tight text-[#0E2017] tabular-nums sm:text-5xl">
                    {fact.metric}
                  </p>
                  <p className="mt-2 text-[11px] font-medium tracking-[0.2em] text-[#8C6D32] uppercase">
                    {fact.unit}
                  </p>
                  <p className="mt-2 text-xs leading-[1.7] text-[#4A554E]">{fact.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
