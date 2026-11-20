import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  MessageCircle,
  Phone,
  Mail,
} from 'lucide-react';
import { ROOM_CATEGORIES, getRoomBySlug } from '@/data/rooms';
import { RESORT_CONFIG } from '@/data/resort';
import { getFaqsByCategories } from '@/data/seo-faqs';
import { buildBookingQueryUrl } from '@/lib/booking';
import { constructPageMetadata, getRoomJsonLd } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { ClipReveal } from '@/components/ui/MotionPrimitives';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ResortFAQSection } from '@/components/seo/ResortFAQSection';

export function generateStaticParams() {
  return ROOM_CATEGORIES.map((room) => ({
    slug: room.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) {
    return constructPageMetadata({
      title: 'Accommodation Not Found | Narayana Green Resorts',
      description: RESORT_CONFIG.supportingPositioning,
      path: '/stay',
    });
  }

  return constructPageMetadata({
    title: `${room.name} (${room.unitCount} Units) — Stay at Narayana Green Resorts Bodh Gaya`,
    description: `${room.shortDescription} Discover ${room.name} (${room.unitCount} verified units out of 19 total) at Narayana Green Resorts in Karmauni, Anuradhi, near Bodh Gaya and enquire directly for package tariffs.`,
    path: `/stay/${room.slug}`,
    image: room.primaryImage,
    keywords: [
      `${room.name} Bodh Gaya`,
      `${room.name} Narayana Green Resorts`,
      'luxury stay in Bodh Gaya Bihar',
    ],
  });
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);

  if (!room) {
    notFound();
  }

  const otherRooms = ROOM_CATEGORIES.filter((r) => r.slug !== room.slug);
  const roomJsonLd = getRoomJsonLd(room);
  const roomFaqs = getFaqsByCategories(['stay', 'dining', 'experiences'], 4);

  return (
    <div className="bg-[#F8F6F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(roomJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      {/* Breadcrumb & Hero Header */}
      <section className="border-b border-[#F8F6F0]/10 bg-[#0E2017] py-16 text-[#F8F6F0] lg:py-24">
        <Container>
          <Reveal delay={0}>
            <Breadcrumbs
              variant="light"
              className="mb-5"
              items={[
                { name: 'Stay & Accommodations', path: '/stay' },
                { name: room.name, path: `/stay/${room.slug}` },
              ]}
            />

            <Link
              href="/stay"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-[#C8A45D] uppercase hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to All 19 Accommodations</span>
            </Link>

            <div className="mt-6 grid grid-cols-1 items-end justify-between gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold tracking-[0.2em] text-[#C8A45D] uppercase">
                  <span>{room.unitLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{room.tagline}</span>
                </div>
                <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-[#F8F6F0] sm:text-5xl lg:text-6xl">
                  {room.name}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#F8F6F0]/80 sm:text-lg">
                  {room.shortDescription}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 lg:col-span-4 lg:justify-end">
                <Link
                  href={buildBookingQueryUrl({ room: room.slug, type: 'stay' })}
                  className="inline-flex items-center gap-2 bg-[#C8A45D] px-7 py-4 text-xs font-semibold tracking-[0.14em] text-[#0E2017] uppercase whitespace-nowrap transition-colors hover:bg-[#d6b36c]"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Enquire for Rates</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Authentic Room Photography Showcase */}
      <section className="border-b border-[#0E2017]/12 py-12 lg:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <ClipReveal
              direction="bottom"
              delay={75}
              className="aspect-[16/10] overflow-hidden border border-[#0E2017]/15 bg-[#183827] lg:col-span-8"
            >
              <img
                src={room.images[0].src}
                alt={room.images[0].alt}
                width={1200}
                height={750}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </ClipReveal>

            <div className="flex flex-col justify-between gap-6 lg:col-span-4">
              {room.images.slice(1).map((img, idx) => (
                <ClipReveal
                  key={img.src}
                  direction="right"
                  delay={idx === 0 ? 150 : 225}
                  className="relative flex-1 overflow-hidden border border-[#0E2017]/15 bg-[#183827]"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={375}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-full min-h-[200px] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-[#0E2017]/80 px-4 py-2 text-xs text-[#F8F6F0]">
                    {img.caption}
                  </div>
                </ClipReveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Editorial Details & Package Enquiry Panel */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#8C6D32] uppercase">
                Accommodation Overview
              </p>
              <h2 className="mt-2 font-serif text-3xl font-medium text-[#0E2017]">
                Crafted for Tranquility Near Sacred Bodh Gaya
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#4A554E]">
                {room.editorialDescription}
              </p>

              <div className="mt-8 border border-[#0E2017]/15 bg-[#FFFFFF] p-6 sm:p-8">
                <h3 className="font-serif text-xl font-medium text-[#0E2017]">
                  Verified Category Specifications
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-[#4A554E]">
                  {room.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#8C6D32]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 grid grid-cols-1 gap-4 border-t border-[#0E2017]/10 pt-5 text-xs sm:grid-cols-2">
                  <div>
                    <span className="font-semibold tracking-wider text-[#0E2017] uppercase">
                      Verified Inventory:
                    </span>
                    <p className="mt-1 font-mono text-sm font-semibold text-[#8C6D32] tabular-nums">
                      {room.unitCount} Units (out of 19 total resort units)
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold tracking-wider text-[#0E2017] uppercase">
                      Recommended Guests:
                    </span>
                    <p className="mt-1 text-sm text-[#4A554E]">{room.idealFor}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-[#4A554E]">
                <span>Explore Complementary Resort Services:</span>
                <Link href="/dining" className="font-semibold text-[#0E2017] underline hover:text-[#8C6D32]">
                  Auric 24×7 Restaurant & Room Service
                </Link>
                <span>·</span>
                <Link href="/experiences" className="font-semibold text-[#0E2017] underline hover:text-[#8C6D32]">
                  Swimming Pool & Meditation Space
                </Link>
                <span>·</span>
                <Link href="/bodh-gaya-guide" className="font-semibold text-[#0E2017] underline hover:text-[#8C6D32]">
                  Nearby Bodh Gaya Landmarks
                </Link>
              </div>
            </div>

            {/* Direct Package Enquiry Card */}
            <div className="lg:col-span-5">
              <div className="border border-[#0E2017]/20 bg-[#EFECE3] p-6 sm:p-8">
                <p className="text-xs font-semibold tracking-[0.2em] text-[#8C6D32] uppercase">
                  Direct Resort Reservations
                </p>
                <h3 className="mt-1.5 font-serif text-2xl font-medium text-[#0E2017]">
                  Request a Stay Package for {room.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4A554E]">
                  Because room tariffs and seasonal packages depend on your travel dates,
                  guest count, and dining preferences, our reservations desk provides
                  personalized quotes directly.
                </p>

                <div className="mt-6 space-y-3">
                  <Link
                    href={buildBookingQueryUrl({ room: room.slug, type: 'stay' })}
                    className="flex w-full items-center justify-center gap-2 bg-[#0E2017] px-6 py-4 text-xs font-semibold tracking-[0.14em] text-[#F8F6F0] uppercase transition-colors hover:bg-[#183827]"
                  >
                    <MessageCircle className="h-4 w-4 text-[#C8A45D]" />
                    <span>Customise Stay Dates & Enquire</span>
                  </Link>

                  <a
                    href={`${RESORT_CONFIG.contact.whatsappBaseUrl}?text=${encodeURIComponent(
                      `Hello Narayana Green Resorts Front Desk, I would like to enquire about availability and rates for ${room.name} (${room.unitCount} Units).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 border border-[#0E2017]/25 bg-[#F8F6F0] px-6 py-3.5 text-xs font-semibold tracking-[0.14em] text-[#0E2017] uppercase transition-colors hover:border-[#0E2017]"
                  >
                    <span>Instant WhatsApp Chat</span>
                  </a>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <a
                      href={RESORT_CONFIG.contact.phoneHref}
                      className="flex items-center justify-center gap-1.5 border border-[#0E2017]/15 bg-[#FFFFFF] px-4 py-3 text-xs font-semibold text-[#0E2017]"
                    >
                      <Phone className="h-3.5 w-3.5 text-[#8C6D32]" />
                      <span>Call Desk</span>
                    </a>
                    <a
                      href={`mailto:${RESORT_CONFIG.contact.reservationEmail}?subject=${encodeURIComponent(
                        `Rate Enquiry — ${room.name}`
                      )}`}
                      className="flex items-center justify-center gap-1.5 border border-[#0E2017]/15 bg-[#FFFFFF] px-4 py-3 text-xs font-semibold text-[#0E2017]"
                    >
                      <Mail className="h-3.5 w-3.5 text-[#8C6D32]" />
                      <span>Email Desk</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Crawlable AEO FAQ Section */}
      <ResortFAQSection
        faqs={roomFaqs}
        eyebrow={`${room.name} Guest Q&A`}
        title={`Common Questions About Staying in ${room.name}`}
        subtitle="Verified details on room amenities, 24-hour dining service, swimming pool access, and direct reservations."
      />

      {/* Other Room Categories */}
      <section className="border-t border-[#0E2017]/12 bg-[#EFECE3] py-16 lg:py-20">
        <Container>
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-medium text-[#0E2017] sm:text-3xl">
              Explore Other Accommodations at Narayana Green Resorts
            </h2>
            <Link
              href="/stay"
              className="text-xs font-semibold tracking-wider text-[#8C6D32] uppercase hover:underline"
            >
              View All 19 Units
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {otherRooms.map((item) => (
              <Link
                key={item.slug}
                href={`/stay/${item.slug}`}
                className="group flex flex-col justify-between border border-[#0E2017]/15 bg-[#F8F6F0] transition-colors hover:border-[#0E2017]"
              >
                <div className="aspect-[16/10] overflow-hidden bg-[#183827]">
                  <img
                    src={item.primaryImage}
                    alt={item.name}
                    width={600}
                    height={375}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="font-mono text-xs text-[#8C6D32] uppercase tabular-nums">
                    {item.unitLabel}
                  </p>
                  <div className="mt-1 flex items-center justify-between">
                    <h3 className="font-serif text-xl font-medium text-[#0E2017]">
                      {item.name}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 text-[#8C6D32]" />
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#4A554E]">
                    {item.shortDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
