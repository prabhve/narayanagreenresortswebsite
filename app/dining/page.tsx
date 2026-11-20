import React, { Suspense } from 'react';
import Link from 'next/link';
import { Utensils, Clock, MessageCircle, Phone } from 'lucide-react';
import { RESORT_CONFIG } from '@/data/resort';
import { getFaqsByCategories } from '@/data/seo-faqs';
import { constructPageMetadata, getWebPageJsonLd } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BookingForm } from '@/components/booking/BookingForm';
import { Reveal } from '@/components/ui/Reveal';
import { ClipReveal, ParallaxMedia } from '@/components/ui/MotionPrimitives';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ResortFAQSection } from '@/components/seo/ResortFAQSection';

export const metadata = constructPageMetadata({
  title: 'Auric 24×7 Restaurant & Maharaj Magadh Thali | Narayana Green Resorts Bodh Gaya',
  description:
    'Dine at Auric 24×7 Restaurant at Narayana Green Resorts near Bodh Gaya. Enjoy multi-cuisine vegetarian & non-vegetarian delicacies, poolside snacks, 24-hour room service, and the signature Maharaj Magadh Thali.',
  path: '/dining',
  image: '/media/dining/auric-restaurant-interior.jpeg',
  keywords: [
    'Auric 24x7 Restaurant Bodh Gaya',
    'Maharaj Magadh Thali Bodh Gaya',
    '24 hour restaurant in Bodh Gaya',
    'multi cuisine restaurant near Bodh Gaya',
    'best family restaurant in Bodh Gaya Bihar',
  ],
});

export default function DiningPage() {
  const { dining } = RESORT_CONFIG;
  const pageJsonLd = getWebPageJsonLd({
    title: 'Auric 24×7 Restaurant & Maharaj Magadh Thali | Narayana Green Resorts Bodh Gaya',
    description: dining.description,
    path: '/dining',
  });
  const diningFaqs = getFaqsByCategories(['dining', 'general'], 4);

  return (
    <div className="bg-[#F8F6F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      {/* Page Hero */}
      <section className="relative overflow-hidden border-b border-[#F8F6F0]/10 bg-[#0E2017] py-20 text-[#F8F6F0] lg:py-28">
        <ParallaxMedia offset={24} className="absolute inset-0 z-0 opacity-35">
          <img
            src="/media/dining/auric-restaurant-interior.jpeg"
            alt="Auric 24×7 Restaurant at Narayana Green Resorts near Bodh Gaya"
            width={1600}
            height={1000}
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
            <Breadcrumbs
              variant="light"
              className="mb-6"
              items={[{ name: 'Auric 24×7 Restaurant', path: '/dining' }]}
            />

            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3.5 text-[11px] font-medium tracking-[0.24em] text-[#C8A45D] uppercase">
                <span className="h-px w-9 bg-[#C8A45D]/70" aria-hidden="true" />
                <span>{dining.eyebrow}</span>
                <span aria-hidden="true">·</span>
                <span>24-Hour Culinary Hospitality</span>
              </div>

              <h1 className="mt-5 font-serif text-4xl leading-[1.1] font-normal tracking-tight text-[#F8F6F0] [text-wrap:balance] sm:text-5xl lg:text-6xl">
                {dining.name}
              </h1>

              <p className="mt-6 max-w-2xl text-[15px] leading-[1.8] font-light text-[#F8F6F0]/80 sm:text-[17px]">
                {dining.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#table-reservation"
                  className="inline-flex items-center gap-2 bg-[#C8A45D] px-7 py-4 text-xs font-semibold tracking-[0.14em] text-[#0E2017] uppercase"
                >
                  <Utensils className="h-4 w-4" />
                  <span>Reserve a Table</span>
                </a>

                <a
                  href={`${RESORT_CONFIG.contact.whatsappBaseUrl}?text=${encodeURIComponent(
                    'Hello Auric 24×7 Restaurant Team at Narayana Green Resorts, I would like to enquire about dining and the Maharaj Magadh Thali.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#F8F6F0]/35 px-7 py-4 text-xs font-semibold tracking-[0.14em] text-[#F8F6F0] uppercase hover:border-[#C8A45D] hover:text-[#C8A45D]"
                >
                  <MessageCircle className="h-4 w-4 text-[#C8A45D]" />
                  <span>WhatsApp Menu Enquiry</span>
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Signature Maharaj Magadh Thali Feature */}
      <section className="border-b border-[#0E2017]/12 bg-[#EFECE3] py-16 lg:py-24">
        <Container>
          <Reveal delay={0}>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <ClipReveal
                direction="left"
                delay={75}
                className="aspect-[4/3] overflow-hidden border border-[#0E2017]/15 bg-[#183827] lg:col-span-6"
              >
                <ParallaxMedia offset={16} className="h-full w-full">
                  <img
                    src={dining.signatureHighlight.image}
                    alt="Maharaj Magadh Thali served at Auric 24×7 Restaurant"
                    width={1000}
                    height={750}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </ParallaxMedia>
              </ClipReveal>

              <div className="lg:col-span-6">
                <SectionHeading
                  eyebrow="Regional Culinary Heritage"
                  title="The Signature Maharaj Magadh Thali"
                  description={dining.signatureHighlight.description}
                />

                <p className="mt-4 text-sm leading-relaxed text-[#4A554E]">
                  Prepared fresh by our culinary team at Auric 24×7 Restaurant, the Maharaj
                  Magadh Thali honours authentic regional flavours in a grand traditional
                  presentation. Because dishes are prepared fresh according to seasonal produce,
                  we invite guests to connect with our dining desk for group thali reservations,
                  or combine dining with a restful stay in our{' '}
                  <Link href="/stay" className="font-semibold text-[#0E2017] underline hover:text-[#8C6D32]">
                    19 luxury accommodations
                  </Link>
                  .
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#table-reservation"
                    className="inline-flex items-center gap-2 bg-[#0E2017] px-7 py-3.5 text-xs font-semibold tracking-[0.14em] text-[#F8F6F0] uppercase"
                  >
                    <span>Pre-Book Maharaj Magadh Thali</span>
                  </a>
                  <a
                    href={RESORT_CONFIG.contact.phoneHref}
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0E2017] uppercase"
                  >
                    <Phone className="h-4 w-4 text-[#8C6D32]" />
                    <span>Call Dining Desk: {RESORT_CONFIG.contact.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 5 Verified Dining Experiences & Photography Grid */}
      <section className="border-b border-[#0E2017]/12 py-16 lg:py-24">
        <Container>
          <Reveal delay={0}>
            <SectionHeading
              eyebrow="Verified Culinary Services"
              title="Five Ways to Experience Auric 24×7"
              description="We never publish fabricated menu item lists or prices—connect directly with our culinary team for current seasonal selections and custom banquet menus."
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {dining.offerings.map((item, idx) => {
              const cardDelay = ((idx % 3) * 75) as 0 | 75 | 150;
              return (
                <Reveal key={item.id} delay={cardDelay} className="h-full">
                  <div className="flex flex-col justify-between border-t border-[#0E2017]/15 pt-6 h-full">
                    <div>
                      <span className="font-mono text-[11px] font-normal tracking-[0.18em] text-[#8C6D32] uppercase tabular-nums">
                        0{idx + 1} · Verified Offering
                      </span>
                      <h3 className="mt-2 font-serif text-2xl font-normal text-[#0E2017]">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-[1.78] text-[#4A554E]">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center gap-2 pt-3 text-xs text-[#8C6D32]">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Available at Auric 24×7 Restaurant</span>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Authentic Dining Gallery Strip */}
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dining.images.map((img, idx) => (
              <Reveal key={img.src} delay={((idx % 4) * 75) as 0 | 75 | 150} className="h-full">
                <figure
                  className="overflow-hidden border border-[#0E2017]/15 bg-[#FFFFFF] h-full flex flex-col justify-between"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#183827]">
                    <img
                      src={img.src}
                      alt={img.alt}
                      width={600}
                      height={450}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="p-3.5 text-xs font-medium text-[#0E2017]">
                    {img.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Crawlable AEO FAQ Section for Dining */}
      <ResortFAQSection
        faqs={diningFaqs}
        eyebrow="Auric 24×7 Dining Q&A"
        title="Questions About Auric 24×7 Restaurant & Maharaj Magadh Thali"
        subtitle="Verified information on our 24-hour multi-cuisine restaurant, room service, poolside refreshments, and regional Magadh culinary specialty."
      />

      {/* Table Reservation Form */}
      <section id="table-reservation" className="scroll-mt-20 bg-[#EFECE3] py-16 lg:py-24">
        <Container>
          <Reveal delay={0}>
            <div className="mb-10">
              <SectionHeading
                eyebrow="Table & Dining Enquiry"
                title="Reserve Your Table at Auric 24×7 Restaurant"
                description="Submit your preferred date, time, and guest count below to send a formatted table reservation request directly to our dining concierge via WhatsApp."
              />
            </div>
          </Reveal>

          <Reveal delay={75}>
            <Suspense fallback={<div className="p-8 text-sm">Loading dining reservation form...</div>}>
              <BookingForm defaultTab="dining" />
            </Suspense>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
