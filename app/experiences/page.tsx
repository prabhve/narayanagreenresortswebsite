import React from 'react';
import Link from 'next/link';
import { RESORT_AMENITIES } from '@/data/amenities';
import { NEARBY_DESTINATIONS } from '@/data/destinations';
import { RESORT_CONFIG } from '@/data/resort';
import { constructPageMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ClipReveal, ParallaxMedia } from '@/components/ui/MotionPrimitives';

export const metadata = constructPageMetadata({
  title: 'Resort Experiences, Pool, Meditation & Bodh Gaya Landmarks | Narayana Green Resorts',
  description:
    'Explore verified resort facilities at Narayana Green Resorts: outdoor Swimming Pool, Kids Pool, Kids Play Area, Meditation Space, Fishing Experience, Maharaj Magadh Thali, and sacred landmarks near Bodh Gaya.',
  path: '/experiences',
  image: '/media/amenities/swimming-pool.jpeg',
});

export default function ExperiencesPage() {
  return (
    <div className="bg-[#F8F6F0]">
      {/* Page Hero */}
      <section className="relative overflow-hidden border-b border-[#F8F6F0]/10 bg-[#0E2017] py-20 text-[#F8F6F0] lg:py-28">
        <ParallaxMedia offset={24} className="absolute inset-0 z-0 opacity-35">
          <img
            src="/media/amenities/swimming-pool.jpeg"
            alt="Outdoor Swimming Pool at Narayana Green Resorts"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
        </ParallaxMedia>
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-[#0E2017] via-[#0E2017]/70 to-[#0E2017]/50"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <Reveal delay={0}>
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-[0.22em] text-[#C8A45D] uppercase">
                <span className="h-px w-8 bg-[#C8A45D]" aria-hidden="true" />
                <span>On-Property Leisure & Sacred Proximity</span>
              </div>

              <h1 className="mt-4 font-serif text-4xl leading-[1.12] font-medium tracking-tight text-[#F8F6F0] [text-wrap:balance] sm:text-5xl lg:text-6xl">
                Aquatic Leisure, Mindfulness & Heritage Discovery
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#F8F6F0]/80 sm:text-lg">
                From refreshing mornings in our outdoor Swimming Pool and quiet contemplation
                in the Meditation Space to exploring UNESCO World Heritage sites in nearby
                Bodh Gaya, every day at {RESORT_CONFIG.name} moves at your rhythm.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Verified On-Property Experiences */}
      <section className="border-b border-[#0E2017]/12 py-16 lg:py-24">
        <Container>
          <Reveal delay={0}>
            <SectionHeading
              eyebrow="On-Property Amenities"
              title="Verified Facilities & Recreational Spaces"
              description="Every amenity showcased below is an authentic on-property experience at Narayana Green Resorts."
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
            {RESORT_AMENITIES.map((item, idx) => (
              <Reveal key={item.id} delay={(idx % 2 === 0 ? 75 : 150) as 0 | 75 | 150} className="h-full">
                <article
                  className="group flex flex-col justify-between border border-[#0E2017]/15 bg-[#FFFFFF] h-full"
                >
                  <div>
                    <ClipReveal direction="bottom" delay={(idx % 2 === 0 ? 75 : 150) as 0 | 75 | 150}>
                      <div className="aspect-[16/10] overflow-hidden bg-[#183827]">
                        <img
                          src={item.image}
                          alt={item.alt}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        />
                      </div>
                    </ClipReveal>
                    <div className="p-6 sm:p-8">
                      <p className="font-mono text-xs font-semibold tracking-wider text-[#8C6D32] uppercase tabular-nums">
                        0{idx + 1}. {item.category}
                      </p>
                      <h2 className="mt-2 font-serif text-2xl font-medium text-[#0E2017] sm:text-3xl">
                        {item.name}
                      </h2>
                      <p className="mt-3 text-base leading-relaxed text-[#4A554E]">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-[#0E2017]/10 bg-[#EFECE3]/60 px-6 py-4 sm:px-8">
                    <Link
                      href="/contact#booking-enquiry"
                      className="text-xs font-semibold tracking-[0.14em] text-[#0E2017] uppercase hover:text-[#8C6D32]"
                    >
                      Enquire About Access & Stay Packages →
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Nearby Bodh Gaya Attractions */}
      <section className="bg-[#EFECE3] py-16 lg:py-24">
        <Container>
          <Reveal delay={0}>
            <SectionHeading
              eyebrow="Spiritual Proximity"
              title="Landmarks Near Bodh Gaya & Gaya"
              description="Explore sacred temples, monasteries, and museums from the peaceful base of Narayana Green Resorts in Karmauni, Anuradhi."
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {NEARBY_DESTINATIONS.map((dest, idx) => (
              <Reveal key={dest.id} delay={(idx % 3) * 75 as 0 | 75 | 150} className="h-full">
                <article
                  className="flex flex-col justify-between border border-[#0E2017]/15 bg-[#F8F6F0] h-full"
                >
                  <div>
                    <div className="aspect-[16/10] overflow-hidden bg-[#183827]">
                      <img
                        src={dest.image}
                        alt={dest.alt}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-semibold tracking-wider text-[#8C6D32] uppercase">
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
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
