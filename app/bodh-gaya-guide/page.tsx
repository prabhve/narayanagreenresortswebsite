import React from 'react';
import Link from 'next/link';
import {
  Compass,
  MapPin,
  Sparkles,
  Check,
  ArrowUpRight,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { NEARBY_DESTINATIONS } from '@/data/destinations';
import { RESORT_CONFIG } from '@/data/resort';
import { ROOM_CATEGORIES } from '@/data/rooms';
import { getFaqsByCategories } from '@/data/seo-faqs';
import { constructPageMetadata, getWebPageJsonLd } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ClipReveal, ParallaxMedia } from '@/components/ui/MotionPrimitives';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ResortFAQSection } from '@/components/seo/ResortFAQSection';

export const metadata = constructPageMetadata({
  title:
    'Bodh Gaya Travel & Pilgrimage Guide — Sacred Landmarks Near Narayana Green Resorts',
  description:
    'Explore sacred heritage landmarks near Narayana Green Resorts in Karmauni, Anuradhi, near Bodh Gaya: Mahabodhi Temple (UNESCO World Heritage), Great Buddha Statue (~11 km), Wat Thai Buddhagaya (~11 km), Mahabodhi Tree, Archaeological Museum, and Vishnupad Temple (~17 km).',
  path: '/bodh-gaya-guide',
  image: '/media/destinations/mahabodhi-temple.png',
  keywords: [
    'Bodh Gaya travel guide',
    'resort near Mahabodhi Temple Bodh Gaya',
    'places to visit near Bodh Gaya Bihar',
    'Great Buddha Statue Bodh Gaya resort',
    'Vishnupad Temple Gaya stay',
    'Wat Thai Buddhagaya accommodation',
  ],
});

export default function BodhGayaGuidePage() {
  const pageJsonLd = getWebPageJsonLd({
    title:
      'Bodh Gaya Travel & Pilgrimage Guide — Sacred Landmarks Near Narayana Green Resorts',
    description:
      'Editorial guide to sacred Buddhist and Hindu heritage landmarks in Bodh Gaya and Gaya, Bihar, and how to plan a tranquil stay at Narayana Green Resorts in Karmauni, Anuradhi.',
    path: '/bodh-gaya-guide',
  });

  const guideFaqs = getFaqsByCategories(['location', 'general', 'experiences'], 6);

  return (
    <div className="bg-[#F8F6F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      {/* Editorial Hero */}
      <section className="relative overflow-hidden border-b border-[#F8F6F0]/10 bg-[#0E2017] py-20 text-[#F8F6F0] lg:py-28">
        <ParallaxMedia offset={24} className="absolute inset-0 z-0 opacity-30">
          <img
            src="/media/destinations/mahabodhi-temple.png"
            alt="Mahabodhi Temple UNESCO World Heritage landmark near Narayana Green Resorts Bodh Gaya"
            width={1600}
            height={1000}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
        </ParallaxMedia>
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-[#0E2017] via-[#0E2017]/75 to-[#0E2017]/55"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <Reveal delay={0}>
            <Breadcrumbs
              variant="light"
              className="mb-6"
              items={[{ name: 'Bodh Gaya Travel Guide', path: '/bodh-gaya-guide' }]}
            />

            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3.5 text-[11px] font-medium tracking-[0.24em] text-[#C8A45D] uppercase">
                <span className="h-px w-9 bg-[#C8A45D]/70" aria-hidden="true" />
                <span>Destination & Heritage Editorial</span>
                <span aria-hidden="true">·</span>
                <span>Bodh Gaya & Gaya, Bihar</span>
              </div>

              <h1 className="mt-5 font-serif text-4xl leading-[1.1] font-normal tracking-tight text-[#F8F6F0] [text-wrap:balance] sm:text-5xl lg:text-6xl">
                Exploring Sacred Bodh Gaya from the Tranquil Sanctuary of Narayana Green Resorts
              </h1>

              <p className="mt-6 max-w-2xl text-[15px] leading-[1.8] font-light text-[#F8F6F0]/82 sm:text-[17px]">
                Set in the verdant calm of Karmauni, Anuradhi, near Bodh Gaya,{' '}
                {RESORT_CONFIG.name} provides pilgrims, families, and cultural travellers with
                a peaceful green estate away from town congestion—while keeping UNESCO World
                Heritage monuments and ancient temples within easy reach.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/stay"
                  className="inline-flex items-center gap-2 bg-[#C8A45D] px-7 py-4 text-xs font-semibold tracking-[0.14em] text-[#0E2017] uppercase transition-colors hover:bg-[#d6b36c]"
                >
                  <span>Explore 19 Rooms & Cottages</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a
                  href={RESORT_CONFIG.links.googleMapsShare}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#F8F6F0]/35 px-7 py-4 text-xs font-semibold tracking-[0.14em] text-[#F8F6F0] uppercase transition-colors hover:border-[#C8A45D] hover:text-[#C8A45D]"
                >
                  <Compass className="h-4 w-4 text-[#C8A45D]" />
                  <span>Open Official Google Maps Pin</span>
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Clear Distinction: On-Property Sanctuary vs. Nearby Heritage Landmarks */}
      <section className="border-b border-[#0E2017]/12 bg-[#EFECE3] py-16 lg:py-20">
        <Container>
          <Reveal delay={0}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="border border-[#0E2017]/15 bg-[#FFFFFF] p-7 sm:p-9 lg:col-span-6">
                <div className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.2em] text-[#8C6D32] uppercase">
                  <Sparkles className="h-4 w-4" />
                  <span>On-Property Resort Sanctuary (Karmauni, Anuradhi)</span>
                </div>
                <h2 className="mt-3 font-serif text-2xl font-medium text-[#0E2017] sm:text-3xl">
                  What Awaits You Inside Narayana Green Resorts
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#4A554E]">
                  When you return from temple visits and historical excursions, our gated
                  green estate offers restorative comfort, recreation, and round-the-clock
                  culinary hospitality:
                </p>
                <ul className="mt-5 space-y-2.5 text-sm text-[#4A554E]">
                  {[
                    '19 Verified Accommodations: 2 Suites Rooms, 3 Cottage Rooms, 6 Pool-View Rooms & 8 Garden-View Rooms',
                    'Auric 24×7 Restaurant serving multi-cuisine vegetarian & non-vegetarian dishes and the signature Maharaj Magadh Thali',
                    'Crystal-clear outdoor Swimming Pool, dedicated Kids Pool & poolside snack service',
                    'Open-air Meditation Space, on-property Fishing Experience & Kids Play Area',
                    'Monumental wedding lawns (2,500+ capacity) & corporate convention spaces (3,000+ capacity)',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#8C6D32]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-[#0E2017]/15 bg-[#0E2017] p-7 text-[#F8F6F0] sm:p-9 lg:col-span-6">
                <div className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.2em] text-[#C8A45D] uppercase">
                  <MapPin className="h-4 w-4" />
                  <span>Nearby Off-Property Landmarks (Bodh Gaya & Gaya)</span>
                </div>
                <h2 className="mt-3 font-serif text-2xl font-medium text-[#F8F6F0] sm:text-3xl">
                  Sacred Sites & Cultural Monuments in the Corridor
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#F8F6F0]/80">
                  Bodh Gaya and neighbouring Gaya form one of the world’s most revered
                  spiritual corridors. From {RESORT_CONFIG.name}, guests regularly visit six
                  renowned off-property landmarks:
                </p>
                <ul className="mt-5 space-y-2.5 text-sm text-[#F8F6F0]/85">
                  {[
                    'Mahabodhi Temple — Iconic UNESCO World Heritage Buddhist complex in Bodh Gaya',
                    'Mahabodhi Tree — The revered sacred Bodhi Tree of enlightenment within the temple precinct',
                    'Great Buddha Statue — Monumental open-air meditation sculpture (Approx. 11 km)',
                    'Wat Thai Buddhagaya — Ornate traditional Thai monastery & gardens (Approx. 11 km)',
                    'Archaeological Museum — Ancient Magadh relics, stone sculptures & historical artifacts',
                    'Vishnupad Temple — Historic riverside shrine along the Falgu River in Gaya (Approx. 17 km)',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#C8A45D]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Detailed Showcase of the 6 Verified Nearby Landmarks */}
      <section className="border-b border-[#0E2017]/12 py-20 lg:py-28">
        <Container>
          <Reveal delay={0}>
            <SectionHeading
              eyebrow="Verified Heritage Landmarks"
              title="Six Iconic Destinations Near Narayana Green Resorts"
              description="Plan your spiritual pilgrimage or family cultural itinerary across Bodh Gaya and Gaya with verified landmark highlights."
            />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {NEARBY_DESTINATIONS.map((dest, idx) => (
              <Reveal
                key={dest.id}
                delay={((idx % 3) * 75) as 0 | 75 | 150}
                className="h-full"
              >
                <article className="group flex flex-col justify-between border border-[#0E2017]/15 bg-[#FFFFFF] h-full">
                  <div>
                    <ClipReveal
                      direction="bottom"
                      delay={((idx % 3) * 75) as 0 | 75 | 150}
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#183827]">
                        <img
                          src={dest.image}
                          alt={dest.alt}
                          width={800}
                          height={500}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        />
                        {dest.distanceLabel && (
                          <span className="absolute top-3 right-3 bg-[#0E2017]/90 px-3 py-1 font-mono text-[11px] font-medium text-[#C8A45D] uppercase">
                            {dest.distanceLabel}
                          </span>
                        )}
                      </div>
                    </ClipReveal>

                    <div className="p-6 sm:p-7">
                      <p className="text-[11px] font-semibold tracking-[0.18em] text-[#8C6D32] uppercase">
                        0{idx + 1} · {dest.significance}
                      </p>
                      <h3 className="mt-2 font-serif text-2xl font-medium text-[#0E2017]">
                        {dest.name}
                      </h3>
                      <p className="mt-3 text-sm leading-[1.78] text-[#4A554E]">
                        {dest.description}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-[#0E2017]/10 bg-[#EFECE3]/50 px-6 py-4 sm:px-7">
                    <Link
                      href="/contact#booking-enquiry"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.14em] text-[#0E2017] uppercase hover:text-[#8C6D32]"
                    >
                      <span>Plan Your Stay Near {dest.name}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#8C6D32]" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Recommended Accommodations for Pilgrims, Families & Groups */}
      <section className="border-b border-[#0E2017]/12 bg-[#FFFFFF] py-20 lg:py-24">
        <Container>
          <Reveal delay={0}>
            <SectionHeading
              eyebrow="Where to Stay During Your Visit"
              title="Choose Your Ideal Sanctuary at Narayana Green Resorts"
              description="Whether you are visiting Bodh Gaya for meditation, a family holiday, or a destination celebration, our 19 accommodations offer tailored comfort."
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ROOM_CATEGORIES.map((room) => (
              <Link
                key={room.slug}
                href={`/stay/${room.slug}`}
                className="group flex flex-col justify-between border border-[#0E2017]/15 bg-[#F8F6F0] p-6 transition-colors hover:border-[#0E2017]"
              >
                <div>
                  <p className="font-mono text-xs font-semibold text-[#8C6D32] uppercase tabular-nums">
                    {room.unitLabel}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-medium text-[#0E2017] group-hover:text-[#8C6D32]">
                    {room.name}
                  </h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-[#4A554E]">
                    {room.shortDescription}
                  </p>
                  <p className="mt-3 text-xs text-[#0E2017]">
                    <strong>Best For:</strong> {room.idealFor}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#0E2017]/10 pt-3.5 text-xs font-semibold tracking-wider text-[#0E2017] uppercase">
                  <span>View Details</span>
                  <ArrowUpRight className="h-4 w-4 text-[#8C6D32]" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border border-[#0E2017]/15 bg-[#EFECE3] p-6 sm:p-8">
            <div>
              <h3 className="font-serif text-2xl font-medium text-[#0E2017]">
                Savour the Signature Maharaj Magadh Thali After Your Temple Tour
              </h3>
              <p className="mt-1.5 text-sm text-[#4A554E]">
                Experience regional Magadh culinary heritage and 24-hour multi-cuisine dining
                at Auric 24×7 Restaurant.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/dining"
                className="inline-flex items-center gap-2 bg-[#0E2017] px-6 py-3.5 text-xs font-semibold tracking-[0.14em] text-[#F8F6F0] uppercase hover:bg-[#183827]"
              >
                <span>Explore Auric 24×7 Dining</span>
              </Link>
              <a
                href={RESORT_CONFIG.contact.phoneHref}
                className="inline-flex items-center gap-2 border border-[#0E2017]/25 bg-[#FFFFFF] px-5 py-3.5 text-xs font-semibold tracking-[0.14em] text-[#0E2017] uppercase"
              >
                <Phone className="h-3.5 w-3.5 text-[#8C6D32]" />
                <span>{RESORT_CONFIG.contact.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Crawlable AEO FAQ Section for Location & Landmarks */}
      <ResortFAQSection
        faqs={guideFaqs}
        eyebrow="Bodh Gaya Visitor Q&A"
        title="Questions About Location, Nearby Temples & Staying at Narayana Green Resorts"
        subtitle="Direct answers for spiritual travellers, families, and event guests planning their visit to Bodh Gaya, Bihar."
      />
    </div>
  );
}
