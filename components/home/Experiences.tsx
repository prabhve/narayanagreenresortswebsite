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
  return (
    <section
      id="experiences"
      className="scroll-mt-20 border-b border-[#0E2017]/10 bg-[#F8F6F0] py-20 lg:py-28"
    >
      <Container>
        <Reveal delay={0}>
          <div className="flex flex-col items-start justify-between gap-6 border-b border-[#0E2017]/12 pb-10 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="World-Class Leisure & Mindfulness"
              title="Resort Facilities & Curated Experiences"
              description="Engage your senses across our manicured grounds—from morning mindfulness in our Meditation Space and afternoons by the Swimming Pool to recreational fishing and grand outdoor lawns."
            />

            <Link
              href="/experiences"
              className="group inline-flex items-center gap-2 border border-[#0E2017]/25 px-6 py-3 text-xs font-semibold tracking-[0.14em] text-[#0E2017] uppercase whitespace-nowrap shrink-0 transition-colors duration-200 hover:border-[#0E2017] hover:bg-[#0E2017] hover:text-[#F8F6F0]"
            >
              <span>Explore All Experiences</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>

        {/* 6 Verified Resort Amenities Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {RESORT_AMENITIES.map((item, idx) => {
            const IconComponent = ICON_MAP[item.iconName] || Sparkles;
            const cardDelay = ([0, 75, 150] as const)[idx % 3];
            const imageDelay = ([75, 150, 225] as const)[idx % 3];
            const isPool = item.id === 'swimming-pool';

            return (
              <Reveal key={item.id} delay={cardDelay} className="h-full" distance={16}>
                <article className="group flex h-full flex-col justify-between border border-[#0E2017]/15 bg-[#FFFFFF] transition-all duration-300 hover:border-[#8C6D32]/65 hover:shadow-[0_18px_36px_-22px_rgba(14,32,23,0.28)]">
                  <div>
                    <ClipReveal direction="bottom" delay={imageDelay}>
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#183827]">
                        {isPool ? (
                          <ParallaxMedia offset={16} className="h-full w-full">
                            <img
                              src={item.image}
                              alt={item.alt}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                            />
                          </ParallaxMedia>
                        ) : (
                          <img
                            src={item.image}
                            alt={item.alt}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                          />
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E2017]/75 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[#F8F6F0]">
                          <span className="font-mono text-xs font-semibold tracking-wider text-[#C8A45D] uppercase tabular-nums">
                            0{idx + 1}. {item.category}
                          </span>
                          <span className="flex h-8 w-8 items-center justify-center border border-[#F8F6F0]/25 bg-[#0E2017]/70 text-[#C8A45D] transition-all duration-300 group-hover:scale-105 group-hover:border-[#C8A45D] group-hover:bg-[#0E2017]">
                            <IconComponent className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </ClipReveal>

                    <div className="p-6">
                      <h3 className="font-serif text-2xl font-medium text-[#0E2017]">
                        {item.name}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-[#4A554E]">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-[#0E2017]/10 px-6 py-3.5 text-xs font-semibold tracking-wider text-[#8C6D32] uppercase">
                    <Link
                      href="/contact#booking-enquiry"
                      className="inline-flex items-center gap-1.5 transition-colors hover:text-[#0E2017]"
                    >
                      <span>Include in Your Stay Enquiry</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
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
