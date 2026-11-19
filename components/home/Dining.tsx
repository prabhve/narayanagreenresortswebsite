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
      className="scroll-mt-20 border-b border-[#F8F6F0]/10 bg-[#0E2017] py-20 text-[#F8F6F0] lg:py-28"
    >
      <Container>
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Auric 24×7 Story & Verified Offerings */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <Reveal delay={0}>
                <SectionHeading
                  eyebrow={dining.eyebrow}
                  title={dining.name}
                  description={dining.description}
                  light
                />
              </Reveal>

              {/* Verified Dining Offerings List with Progressive Stagger */}
              <div className="mt-10 divide-y divide-[#F8F6F0]/12 border-y border-[#F8F6F0]/12">
                {dining.offerings.map((item, idx) => (
                  <Reveal
                    key={item.id}
                    delay={([0, 75, 150, 225, 300] as const)[idx % 5]}
                    distance={12}
                  >
                    <div className="py-4">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-serif text-lg font-medium text-[#F8F6F0]">
                          <span className="mr-2.5 font-mono text-xs text-[#C8A45D] tabular-nums">
                            0{idx + 1}.
                          </span>
                          {item.title}
                        </h3>
                      </div>
                      <p className="mt-1 pl-7 text-sm leading-relaxed text-[#F8F6F0]/72">
                        {item.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <Reveal delay={225}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href={buildBookingQueryUrl({ type: 'dining' })}
                  className="inline-flex items-center gap-2.5 bg-[#C8A45D] px-7 py-4 text-xs font-semibold tracking-[0.15em] text-[#0E2017] uppercase whitespace-nowrap transition-colors duration-200 hover:bg-[#d6b36c]"
                >
                  <Utensils className="h-4 w-4" />
                  <span>Reserve a Table</span>
                </Link>

                <Link
                  href="/dining"
                  className="group inline-flex items-center gap-2 border border-[#F8F6F0]/30 px-7 py-4 text-xs font-semibold tracking-[0.15em] text-[#F8F6F0] uppercase whitespace-nowrap transition-colors duration-200 hover:border-[#C8A45D] hover:text-[#C8A45D]"
                >
                  <span>Explore Dining</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                <a
                  href={`${RESORT_CONFIG.contact.whatsappBaseUrl}?text=${encodeURIComponent(
                    'Hello Auric 24×7 Restaurant at Narayana Green Resorts, I would like to enquire about dining and the Maharaj Magadh Thali.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold tracking-wider text-[#C8A45D] uppercase hover:underline"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp Menu Enquiry</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Directional Restaurant Reveal & Parallax + Food Scale Transition */}
          <div className="flex flex-col justify-between gap-6 lg:col-span-6">
            <ClipReveal direction="right" delay={150}>
              <div className="group relative aspect-[16/10] w-full overflow-hidden border border-[#F8F6F0]/15 bg-[#183827]">
                <ParallaxMedia offset={18} className="h-full w-full">
                  <img
                    src="/media/dining/auric-restaurant-interior.jpeg"
                    alt="Auric 24×7 Restaurant interior dining room at Narayana Green Resorts"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                </ParallaxMedia>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E2017]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-[#F8F6F0]">
                  <span className="font-serif text-base text-[#F8F6F0]">
                    Auric 24×7 Multi-Cuisine Dining Room
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[#C8A45D]">
                    <Clock className="h-3.5 w-3.5" />
                    <span>24-Hour Service</span>
                  </span>
                </div>
              </div>
            </ClipReveal>

            {/* Signature Maharaj Magadh Thali Spotlight */}
            <Reveal delay={225}>
              <div className="group grid grid-cols-1 items-center gap-6 border border-[#C8A45D]/30 bg-[#183827]/50 p-6 transition-colors duration-300 hover:border-[#C8A45D]/60 sm:grid-cols-12">
                <ClipReveal
                  direction="center"
                  scaleFrom={1.1}
                  delay={300}
                  className="aspect-[4/3] overflow-hidden border border-[#F8F6F0]/15 sm:col-span-5"
                >
                  <img
                    src={dining.signatureHighlight.image}
                    alt="Signature Maharaj Magadh Thali served at Auric 24×7 Restaurant"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                </ClipReveal>
                <div className="sm:col-span-7">
                  <p className="text-xs font-semibold tracking-[0.2em] text-[#C8A45D] uppercase">
                    Signature Culinary Highlight
                  </p>
                  <h3 className="mt-1.5 font-serif text-2xl font-medium text-[#F8F6F0]">
                    {dining.signatureHighlight.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#F8F6F0]/75">
                    {dining.signatureHighlight.description}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
