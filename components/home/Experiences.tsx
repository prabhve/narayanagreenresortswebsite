import React from 'react';
import Link from 'next/link';
import {
  Waves,
  Sparkles,
  Utensils,
  Compass,
  Trees,
  Users,
  ArrowUpRight,
} from 'lucide-react';
import { RESORT_AMENITIES } from '@/data/amenities';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ClipReveal, ParallaxMedia } from '@/components/ui/MotionPrimitives';

const ICON_MAP = {
  Waves,
  Sparkles,
  Utensils,
  Compass,
  Trees,
  Users,
};

export function Experiences() {
  const leadAmenities = RESORT_AMENITIES.slice(0, 2);
  const companionAmenities = RESORT_AMENITIES.slice(2);

  return (
    <section
      id="experiences"
      className="scroll-mt-20 border-b border-[#0E2017]/8 bg-[#F8F6F0] py-24 lg:py-36"
    >
      <Container>
        <Reveal delay={0}>
          <div className="flex flex-col items-start justify-between gap-8 border-b border-[#0E2017]/10 pb-12 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Leisure, Mindfulness & Nature"
              title="Resort Facilities & Curated Experiences"
              description="Engage your senses across our manicured grounds—from quiet morning contemplation in our Meditation Space and unhurried afternoons by the Swimming Pool to recreational fishing and open-air garden lawns."
            />

            <Link
              href="/experiences"
              className="group inline-flex items-center gap-2.5 border border-[#0E2017]/20 px-6 py-3.5 text-[11px] font-medium tracking-[0.16em] text-[#0E2017] uppercase whitespace-nowrap shrink-0 transition-all duration-300 hover:border-[#0E2017] hover:bg-[#0E2017] hover:text-[#F8F6F0]"
            >
              <span>Explore All Experiences</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>

        {/* Top Asymmetric Marquee Pair: 01. Outdoor Swimming Pool (7 cols) + 02. Meditation Space (5 cols) */}
        <div className="mt-16 grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {leadAmenities.map((item, idx) => {
            const IconComponent = ICON_MAP[item.iconName] || Sparkles;
            const isFirst = idx === 0;

            return (
              <div
                key={item.id}
                className={isFirst ? 'lg:col-span-7' : 'lg:col-span-5 lg:mt-12'}
              >
                <article className="group">
                  <ClipReveal direction={isFirst ? 'bottom' : 'right'} delay={isFirst ? 75 : 150}>
                    <div
                      className={`relative w-full overflow-hidden bg-[#183827] ${
                        isFirst ? 'aspect-[16/10]' : 'aspect-[4/3]'
                      }`}
                    >
                      <ParallaxMedia
                        offset={isFirst ? 22 : 18}
                        scaleRange={[1.08, 1.01]}
                        className="h-full w-full"
                      >
                        <img
                          src={item.image}
                          alt={item.alt}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                        />
                      </ParallaxMedia>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E2017]/65 via-transparent to-transparent" />
                      <div className="absolute right-5 bottom-4 left-5 flex items-center justify-between text-[#F8F6F0]">
                        <span className="font-mono text-[11px] font-normal tracking-[0.18em] text-[#e5cfa0] uppercase tabular-nums">
                          0{idx + 1} · {item.category}
                        </span>
                        <span className="flex h-8 w-8 items-center justify-center border border-[#F8F6F0]/25 bg-[#0E2017]/55 text-[#C8A45D] backdrop-blur-xs transition-transform duration-300 group-hover:scale-105">
                          <IconComponent className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </ClipReveal>

                  <Reveal delay={150} distance={14}>
                    <div className="pt-6">
                      <h3 className="font-serif text-3xl font-normal text-[#0E2017]">
                        {item.name}
                      </h3>
                      <p className="mt-3 text-[15px] leading-[1.78] text-[#4A554E]">
                        {item.description}
                      </p>
                      <div className="mt-5">
                        <Link
                          href="/contact#booking-enquiry"
                          className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.16em] text-[#8C6D32] uppercase transition-colors duration-300 hover:text-[#0E2017]"
                        >
                          <span className="border-b border-[#8C6D32]/35 pb-0.5">
                            Include in Your Stay Enquiry
                          </span>
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      </div>
                    </div>
                  </Reveal>
                </article>
              </div>
            );
          })}
        </div>

        {/* Bottom Open Architectural Quartet: 03–06 Divided by Delicate Hairlines (No Boxy White Cards) */}
        <div className="mt-20 border-t border-[#0E2017]/10 pt-16">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-[#0E2017]/10">
            {companionAmenities.map((item, idx) => {
              const IconComponent = ICON_MAP[item.iconName] || Sparkles;
              const numberIndex = idx + 3;
              const delay = ([0, 75, 150, 225] as const)[idx % 4];
              const paddingClass =
                idx === 0
                  ? 'lg:pr-7'
                  : idx === companionAmenities.length - 1
                    ? 'lg:pl-7'
                    : 'lg:px-7';

              return (
                <Reveal
                  key={item.id}
                  delay={delay}
                  distance={16}
                  className={paddingClass}
                >
                  <article className="group flex h-full flex-col justify-between">
                    <div>
                      <ClipReveal direction="bottom" delay={delay}>
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#183827]">
                          <img
                            src={item.image}
                            alt={item.alt}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E2017]/60 via-transparent to-transparent" />
                          <div className="absolute right-3.5 bottom-3 left-3.5 flex items-center justify-between text-[#F8F6F0]">
                            <span className="font-mono text-[10px] tracking-[0.18em] text-[#e5cfa0] uppercase tabular-nums">
                              0{numberIndex} · {item.category}
                            </span>
                            <IconComponent className="h-3.5 w-3.5 text-[#C8A45D]" />
                          </div>
                        </div>
                      </ClipReveal>

                      <div className="pt-5">
                        <h3 className="font-serif text-2xl font-normal text-[#0E2017]">
                          {item.name}
                        </h3>
                        <p className="mt-2.5 text-sm leading-[1.75] text-[#4A554E]">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 pt-3">
                      <Link
                        href="/contact#booking-enquiry"
                        className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.15em] text-[#8C6D32] uppercase transition-colors duration-300 hover:text-[#0E2017]"
                      >
                        <span>Enquire</span>
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
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
