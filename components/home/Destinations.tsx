import React from 'react';
import { Compass, MapPin, ExternalLink } from 'lucide-react';
import { NEARBY_DESTINATIONS } from '@/data/destinations';
import { RESORT_CONFIG } from '@/data/resort';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ClipReveal, ParallaxMedia } from '@/components/ui/MotionPrimitives';

export function Destinations() {
  const leadDestination = NEARBY_DESTINATIONS[0];
  const companionDestinations = NEARBY_DESTINATIONS.slice(1);

  return (
    <section
      id="destinations"
      className="scroll-mt-20 border-b border-[#0E2017]/8 bg-[#F8F6F0] py-24 lg:py-36"
    >
      <Container>
        <Reveal delay={0}>
          <div className="flex flex-col items-start justify-between gap-8 border-b border-[#0E2017]/10 pb-12 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="The Bodh Gaya Heritage Journal"
              title="Sacred Landmarks Near Narayana Green Resorts"
              description="Our estate in Karmauni, Anuradhi offers a tranquil sanctuary within convenient reach of Bodh Gaya’s world-renowned monasteries, temples, and historic heritage sites."
            />

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="/bodh-gaya-guide"
                className="inline-flex items-center gap-2 bg-[#0E2017] px-6 py-3.5 text-[11px] font-medium tracking-[0.16em] text-[#F8F6F0] uppercase whitespace-nowrap transition-colors duration-300 hover:bg-[#183827]"
              >
                <span>Read Complete Bodh Gaya Guide</span>
              </a>
              <a
                href={RESORT_CONFIG.links.googleMapsShare}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 border border-[#0E2017]/20 px-6 py-3.5 text-[11px] font-medium tracking-[0.16em] text-[#0E2017] uppercase whitespace-nowrap transition-all duration-300 hover:border-[#0E2017] hover:bg-[#0E2017] hover:text-[#F8F6F0]"
              >
                <Compass className="h-4 w-4 text-[#8C6D32] transition-colors group-hover:text-[#C8A45D]" />
                <span>Get Directions to Resort</span>
                <ExternalLink className="h-3.5 w-3.5 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </Reveal>

        {/* Lead Travel Feature: 01. Mahabodhi Temple (12-Column Editorial Spread) */}
        {leadDestination && (
          <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <ClipReveal direction="bottom" delay={75}>
                <div className="group relative aspect-[16/10] w-full overflow-hidden bg-[#183827]">
                  <ParallaxMedia
                    offset={22}
                    scaleRange={[1.08, 1.01]}
                    className="h-full w-full"
                  >
                    <img
                      src={leadDestination.image}
                      alt={leadDestination.alt}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                  </ParallaxMedia>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E2017]/65 via-transparent to-transparent" />
                  {leadDestination.distanceLabel && (
                    <div className="absolute bottom-4 left-5 font-mono text-[11px] tracking-[0.16em] text-[#e5cfa0] uppercase tabular-nums">
                      01 · {leadDestination.distanceLabel} from Resort
                    </div>
                  )}
                </div>
              </ClipReveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={150} distance={16}>
                <p className="text-[11px] font-medium tracking-[0.22em] text-[#8C6D32] uppercase">
                  01 · {leadDestination.significance}
                </p>
                <h3 className="mt-3 font-serif text-3xl font-normal text-[#0E2017] sm:text-4xl">
                  {leadDestination.name}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.8] text-[#4A554E]">
                  {leadDestination.description}
                </p>
                <div className="mt-6 flex items-center gap-2 border-t border-[#0E2017]/10 pt-4 text-xs text-[#4A554E]">
                  <MapPin className="h-3.5 w-3.5 text-[#8C6D32]" />
                  <span>Sacred Bodh Gaya Heritage Corridor</span>
                </div>
              </Reveal>
            </div>
          </div>
        )}

        {/* Five Companion Landmarks: Editorial Field Guide Layout (No Repetitive White Card Boxes) */}
        <div className="mt-20 border-t border-[#0E2017]/10 pt-16">
          <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-5">
            {companionDestinations.map((dest, idx) => {
              const numberIndex = idx + 2;
              const delay = ([0, 75, 150, 225, 300] as const)[idx % 5];

              return (
                <Reveal key={dest.id} delay={delay} distance={16}>
                  <article className="group flex flex-col">
                    <ClipReveal direction="bottom" delay={delay}>
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#183827]">
                        <img
                          src={dest.image}
                          alt={dest.alt}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E2017]/65 via-transparent to-transparent" />
                        <span className="absolute bottom-3 left-3.5 font-mono text-[10px] tracking-[0.18em] text-[#e5cfa0] uppercase tabular-nums">
                          0{numberIndex} · {dest.distanceLabel || 'Nearby'}
                        </span>
                      </div>
                    </ClipReveal>

                    <div className="pt-5">
                      <p className="text-[10px] font-medium tracking-[0.18em] text-[#8C6D32] uppercase">
                        {dest.significance}
                      </p>
                      <h3 className="mt-1.5 font-serif text-2xl font-normal text-[#0E2017]">
                        {dest.name}
                      </h3>
                      <p className="mt-2 text-xs leading-[1.75] text-[#4A554E]">
                        {dest.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
