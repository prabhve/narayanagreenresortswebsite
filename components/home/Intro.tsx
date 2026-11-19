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
      className="scroll-mt-20 border-b border-[#0E2017]/10 bg-[#F8F6F0] py-20 lg:py-28"
    >
      <Container>
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Editorial Text & Philosophy */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <Reveal delay={0}>
                <SectionHeading
                  eyebrow="A Sanctuary of Elegance Near Bodh Gaya"
                  title="Where Timeless Nature Meets Modern Hospitality"
                />
              </Reveal>

              <Reveal delay={75}>
                <div className="mt-6 space-y-5 text-base leading-relaxed text-[#4A554E]">
                  <p>
                    Situated in <strong className="font-medium text-[#0E2017]">Karmauni, Anuradhi, near sacred Bodh Gaya</strong>,{' '}
                    {RESORT_CONFIG.name} has been thoughtfully crafted for travellers, families,
                    and spiritual pilgrims seeking a serene sanctuary away from urban commotion.
                  </p>
                  <p>
                    Sprawled across manicured green lawns, our property brings together{' '}
                    <strong className="font-medium text-[#0E2017]">19 private accommodations</strong>—spanning
                    Suites, independent Cottages, Pool-View Rooms, and Garden-View Rooms—with
                    round-the-clock culinary hospitality at{' '}
                    <strong className="font-medium text-[#0E2017]">Auric 24×7 Restaurant</strong>,
                    aquatic leisure, and monumental outdoor event spaces.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Verified Editorial Pillar List */}
            <div className="mt-10 border-t border-[#0E2017]/12 pt-8">
              <Reveal delay={150}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <p className="font-mono text-xs font-semibold tracking-wider text-[#8C6D32] uppercase">
                      01. Restful Comfort & Nature
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#4A554E]">
                      Wake to tranquil garden foliage or shimmering pool views across 19 curated units.
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-xs font-semibold tracking-wider text-[#8C6D32] uppercase">
                      02. Recreation & Celebrations
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#4A554E]">
                      From meditation, fishing, and swimming to destination weddings for 2,500+ guests.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={225}>
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <Link
                    href="/stay"
                    className="group inline-flex items-center gap-2 bg-[#0E2017] px-7 py-3.5 text-xs font-semibold tracking-[0.14em] text-[#F8F6F0] uppercase transition-colors hover:bg-[#183827]"
                  >
                    <span>Explore Our 19 Rooms</span>
                    <ArrowRight className="h-4 w-4 text-[#C8A45D] transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>

                  <a
                    href={RESORT_CONFIG.links.googleMapsShare}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-[#0E2017] uppercase transition-colors hover:text-[#8C6D32]"
                  >
                    <MapPin className="h-4 w-4 text-[#8C6D32]" />
                    <span>View Official Resort Map</span>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Authentic Property Composition with Clip-Path & Subtle Parallax */}
          <div className="grid grid-cols-12 gap-4 lg:col-span-6">
            <ClipReveal
              direction="bottom"
              delay={75}
              className="col-span-12 overflow-hidden border border-[#0E2017]/12 bg-[#183827] sm:col-span-7"
            >
              <ParallaxMedia offset={16} className="h-full min-h-[300px] w-full">
                <img
                  src="/media/resort/resort-sanctuary-overview.jpeg"
                  alt="Narayana Green Resorts architecture and manicured garden grounds near Bodh Gaya"
                  referrerPolicy="no-referrer"
                  className="h-full min-h-[300px] w-full object-cover"
                />
              </ParallaxMedia>
            </ClipReveal>

            <div className="col-span-12 flex flex-col justify-between gap-4 sm:col-span-5">
              <ClipReveal
                direction="right"
                delay={150}
                className="flex-1 overflow-hidden border border-[#0E2017]/12 bg-[#183827]"
              >
                <ParallaxMedia offset={22} className="h-full min-h-[180px] w-full">
                  <img
                    src="/media/resort/resort-lawn-walkway.jpeg"
                    alt="Landscaped green walkway at Narayana Green Resorts"
                    referrerPolicy="no-referrer"
                    className="h-full min-h-[180px] w-full object-cover"
                  />
                </ParallaxMedia>
              </ClipReveal>

              <Reveal delay={225}>
                <div className="border border-[#0E2017]/15 bg-[#EFECE3] p-6">
                  <p className="text-xs font-semibold tracking-[0.18em] text-[#8C6D32] uppercase">
                    Positioning Promise
                  </p>
                  <p className="mt-2 font-serif text-lg leading-snug text-[#0E2017]">
                    “{RESORT_CONFIG.positioning}”
                  </p>
                  <p className="mt-2 text-xs text-[#4A554E]">
                    Karmauni, Anuradhi · Near Bodh Gaya, Bihar
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Verified Key Facts Strip Below Intro Split */}
        <div className="mt-16 grid grid-cols-1 border border-[#0E2017]/15 bg-[#EFECE3] sm:grid-cols-2 lg:grid-cols-4">
          {RESORT_CONFIG.keyFacts.map((fact, index) => (
            <Reveal
              key={fact.unit}
              delay={([0, 75, 150, 225] as const)[index % 4]}
              className={
                index < RESORT_CONFIG.keyFacts.length - 1
                  ? 'border-b border-[#0E2017]/12 lg:border-r lg:border-b-0'
                  : ''
              }
            >
              <div className="p-6 sm:p-8">
                <p className="font-serif text-3xl font-medium text-[#0E2017] tabular-nums sm:text-4xl">
                  {fact.metric}
                </p>
                <p className="mt-1.5 text-xs font-semibold tracking-[0.16em] text-[#8C6D32] uppercase">
                  {fact.unit}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[#4A554E]">{fact.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
