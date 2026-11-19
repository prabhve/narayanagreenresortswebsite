import React from 'react';
import { Compass, MapPin, ExternalLink } from 'lucide-react';
import { NEARBY_DESTINATIONS } from '@/data/destinations';
import { RESORT_CONFIG } from '@/data/resort';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ClipReveal } from '@/components/ui/MotionPrimitives';

export function Destinations() {
  return (
    <section
      id="destinations"
      className="scroll-mt-20 border-b border-[#0E2017]/10 bg-[#F8F6F0] py-20 lg:py-28"
    >
      <Container>
        <Reveal delay={0}>
          <div className="flex flex-col items-start justify-between gap-6 border-b border-[#0E2017]/12 pb-10 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Spiritual & Heritage Proximity"
              title="Sacred Landmarks Near Bodh Gaya"
              description="Narayana Green Resorts offers a peaceful retreat within convenient reach of Bodh Gaya’s world-renowned monasteries, temples, and historic heritage sites."
            />

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={RESORT_CONFIG.links.googleMapsShare}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-[#0E2017] px-6 py-3.5 text-xs font-semibold tracking-[0.14em] text-[#F8F6F0] uppercase whitespace-nowrap transition-colors hover:bg-[#183827]"
              >
                <Compass className="h-4 w-4 text-[#C8A45D]" />
                <span>Get Directions to Resort</span>
                <ExternalLink className="h-3.5 w-3.5 opacity-75 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </Reveal>

        {/* 6 Verified Nearby Landmarks Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {NEARBY_DESTINATIONS.map((dest, idx) => {
            const cardDelay = ([0, 75, 150] as const)[idx % 3];
            const clipDelay = ([75, 150, 225] as const)[idx % 3];
            return (
              <Reveal key={dest.id} delay={cardDelay} className="h-full" distance={16}>
                <article className="group flex h-full flex-col justify-between border border-[#0E2017]/15 bg-[#FFFFFF] transition-all duration-300 hover:border-[#8C6D32]/60 hover:shadow-[0_18px_36px_-22px_rgba(14,32,23,0.25)]">
                  <div>
                    <ClipReveal direction="bottom" delay={clipDelay}>
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#183827]">
                        <img
                          src={dest.image}
                          alt={dest.alt}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E2017]/75 via-transparent to-transparent" />
                        {dest.distanceLabel && (
                          <div className="absolute bottom-3 left-4 font-mono text-xs font-semibold text-[#C8A45D] tabular-nums">
                            {dest.distanceLabel} from Resort
                          </div>
                        )}
                      </div>
                    </ClipReveal>

                    <div className="p-6">
                      <p className="text-xs font-medium tracking-wider text-[#8C6D32] uppercase">
                        {dest.significance}
                      </p>
                      <h3 className="mt-1.5 font-serif text-2xl font-medium text-[#0E2017]">
                        {dest.name}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-[#4A554E]">
                        {dest.description}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-[#0E2017]/10 px-6 py-3.5 text-xs text-[#4A554E]">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-[#8C6D32]" />
                      <span>Bodh Gaya & Gaya Heritage Corridor</span>
                    </span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
