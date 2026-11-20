import React from 'react';
import Link from 'next/link';
import { Utensils, Clock, MessageCircle, ArrowRight } from 'lucide-react';
import { RESORT_CONFIG } from '@/data/resort';
import { buildBookingQueryUrl } from '@/lib/booking';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ClipReveal, ParallaxMedia } from '@/components/ui/MotionPrimitives';

export function Dining() {
  const { dining } = RESORT_CONFIG;

  return (
    <section
      id="dining"
      className="scroll-mt-20 border-b border-[#F8F6F0]/8 bg-[#0E2017] py-24 text-[#F8F6F0] lg:py-36"
    >
      <Container>
        {/* Top Editorial Spread: Culinary Narrative + Widescreen Dining Room Canvas */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal delay={0}>
              <SectionHeading
                eyebrow={dining.eyebrow}
                title={dining.name}
                description={dining.description}
                light
              />
            </Reveal>

            <Reveal delay={150}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={buildBookingQueryUrl({ type: 'dining' })}
                  className="inline-flex items-center gap-2.5 bg-[#C8A45D] px-7 py-3.5 text-[11px] font-medium tracking-[0.16em] text-[#0E2017] uppercase whitespace-nowrap transition-all duration-300 hover:bg-[#d6b36c]"
                >
                  <Utensils className="h-3.5 w-3.5" />
                  <span>Reserve a Table</span>
                </Link>

                <Link
                  href="/dining"
                  className="group inline-flex items-center gap-2 border border-[#F8F6F0]/25 px-7 py-3.5 text-[11px] font-medium tracking-[0.16em] text-[#F8F6F0] uppercase whitespace-nowrap transition-all duration-300 hover:border-[#C8A45D] hover:text-[#C8A45D]"
                >
                  <span>Explore Dining</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ClipReveal direction="right" delay={75}>
              <div className="group relative aspect-[16/10] w-full overflow-hidden bg-[#183827]">
                <ParallaxMedia
                  offset={24}
                  scaleRange={[1.08, 1.01]}
                  className="h-full w-full"
                >
                  <img
                    src="/media/dining/auric-restaurant-interior.jpeg"
                    alt="Auric 24×7 Restaurant interior dining room at Narayana Green Resorts"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </ParallaxMedia>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E2017]/80 via-transparent to-transparent" />
                <div className="absolute right-6 bottom-5 left-6 flex flex-wrap items-center justify-between gap-2 text-xs text-[#F8F6F0]">
                  <span className="font-serif text-lg font-normal text-[#F8F6F0]">
                    Auric 24×7 Multi-Cuisine Dining Room
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.16em] text-[#C8A45D] uppercase">
                    <Clock className="h-3.5 w-3.5" />
                    <span>All-Day & Night Service</span>
                  </span>
                </div>
              </div>
            </ClipReveal>
          </div>
        </div>

        {/* Bottom Culinary Diptych: Maharaj Magadh Thali Feature + 5 Curated Offerings */}
        <div className="mt-16 grid grid-cols-1 items-start gap-12 border-t border-[#F8F6F0]/10 pt-16 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          {/* Left: Signature Maharaj Magadh Thali Editorial Spotlight */}
          <div className="lg:col-span-5">
            <Reveal delay={75}>
              <div className="group">
                <ClipReveal
                  direction="bottom"
                  scaleFrom={1.08}
                  delay={150}
                  className="aspect-[4/3] w-full overflow-hidden bg-[#183827]"
                >
                  <ParallaxMedia
                    offset={18}
                    scaleRange={[1.07, 1.01]}
                    className="h-full w-full"
                  >
                    <img
                      src={dining.signatureHighlight.image}
                      alt="Signature Maharaj Magadh Thali served at Auric 24×7 Restaurant"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                  </ParallaxMedia>
                </ClipReveal>

                <div className="pt-6">
                  <p className="text-[11px] font-medium tracking-[0.22em] text-[#C8A45D] uppercase">
                    Signature Regional Heritage
                  </p>
                  <h3 className="mt-2 font-serif text-3xl font-normal text-[#F8F6F0]">
                    {dining.signatureHighlight.name}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.78] text-[#F8F6F0]/75">
                    {dining.signatureHighlight.description}
                  </p>
                  <div className="mt-5">
                    <a
                      href={`${RESORT_CONFIG.contact.whatsappBaseUrl}?text=${encodeURIComponent(
                        'Hello Auric 24×7 Restaurant at Narayana Green Resorts, I would like to enquire about dining and the Maharaj Magadh Thali.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.16em] text-[#C8A45D] uppercase transition-colors hover:text-[#e5cfa0]"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span className="border-b border-[#C8A45D]/40 pb-0.5">
                        Enquire via WhatsApp for Thali & Menu
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: 5 Verified Culinary Offerings as an Open Tasting Index */}
          <div className="lg:col-span-7">
            <Reveal delay={0}>
              <p className="mb-4 text-[11px] font-medium tracking-[0.22em] text-[#C8A45D] uppercase">
                Verified Culinary Hospitality
              </p>
            </Reveal>

            <div className="divide-y divide-[#F8F6F0]/10 border-y border-[#F8F6F0]/10">
              {dining.offerings.map((item, idx) => (
                <Reveal
                  key={item.id}
                  delay={([0, 75, 150, 225, 300] as const)[idx % 5]}
                  distance={14}
                >
                  <div className="group py-5 transition-colors duration-300 hover:bg-[#183827]/25 sm:px-3">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs font-normal text-[#C8A45D] tabular-nums">
                        0{idx + 1}
                      </span>
                      <div>
                        <h3 className="font-serif text-xl font-normal text-[#F8F6F0] transition-colors duration-300 group-hover:text-[#e5cfa0] sm:text-2xl">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-[1.75] text-[#F8F6F0]/70">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
