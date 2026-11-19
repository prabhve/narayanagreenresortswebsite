import React, { Suspense } from 'react';
import { MessageCircle, Phone, Users, Check } from 'lucide-react';
import { RESORT_CONFIG } from '@/data/resort';
import { constructPageMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BookingForm } from '@/components/booking/BookingForm';
import { Reveal } from '@/components/ui/Reveal';
import { ClipReveal, ParallaxMedia } from '@/components/ui/MotionPrimitives';

export const metadata = constructPageMetadata({
  title: 'Destination Weddings & Corporate Events Near Bodh Gaya | Narayana Green Resorts',
  description:
    'Host grand destination weddings (2,500+ guest capacity) and corporate conferences (3,000+ guest capacity) on the expansive manicured lawns of Narayana Green Resorts near Bodh Gaya.',
  path: '/weddings-events',
  image: '/media/weddings/grand-wedding-lawn.jpeg',
});

export default function WeddingsEventsPage() {
  const { weddingsAndEvents } = RESORT_CONFIG;

  return (
    <div className="bg-[#F8F6F0]">
      {/* Page Hero */}
      <section className="relative overflow-hidden border-b border-[#F8F6F0]/10 bg-[#0E2017] py-20 text-[#F8F6F0] lg:py-28">
        <ParallaxMedia offset={24} scaleRange={[1.1, 1.02]} className="absolute inset-0 z-0 opacity-35">
          <img
            src="/media/weddings/grand-wedding-lawn.jpeg"
            alt="Grand wedding lawn at Narayana Green Resorts near Bodh Gaya"
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
                <span>{weddingsAndEvents.eyebrow}</span>
              </div>

              <h1 className="mt-4 font-serif text-4xl leading-[1.12] font-medium tracking-tight text-[#F8F6F0] [text-wrap:balance] sm:text-5xl lg:text-6xl">
                {weddingsAndEvents.headline}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#F8F6F0]/80 sm:text-lg">
                {weddingsAndEvents.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#event-enquiry"
                  className="inline-flex items-center gap-2 bg-[#C8A45D] px-7 py-4 text-xs font-semibold tracking-[0.14em] text-[#0E2017] uppercase"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Request Wedding / Event Quote</span>
                </a>

                <a
                  href={RESORT_CONFIG.contact.phoneHref}
                  className="inline-flex items-center gap-2 border border-[#F8F6F0]/35 px-7 py-4 text-xs font-semibold tracking-[0.14em] text-[#F8F6F0] uppercase hover:border-[#C8A45D] hover:text-[#C8A45D]"
                >
                  <Phone className="h-4 w-4 text-[#C8A45D]" />
                  <span>Speak with Events Desk</span>
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Published Capacity Strip */}
      <section className="border-b border-[#0E2017]/12 bg-[#EFECE3] py-12">
        <Container>
          <Reveal delay={0}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {weddingsAndEvents.capacities.map((cap) => (
                <div
                  key={cap.label}
                  className="border border-[#0E2017]/15 bg-[#FFFFFF] p-7"
                >
                  <p className="font-serif text-4xl font-medium text-[#0E2017] tabular-nums">
                    {cap.figure}
                  </p>
                  <p className="mt-2 text-xs font-semibold tracking-[0.16em] text-[#8C6D32] uppercase">
                    {cap.label}
                  </p>
                  <p className="mt-2 text-sm text-[#4A554E]">{cap.context}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Event Categories Showcase */}
      <section className="border-b border-[#0E2017]/12 py-16 lg:py-24">
        <Container>
          <Reveal delay={0}>
            <SectionHeading
              eyebrow="Tailored Event Staging"
              title="Celebrations, Functions & Corporate Conventions"
              description="Our monumental green lawns and on-site hospitality team adapt to intimate 100+ guest gatherings as seamlessly as 3,000+ guest conventions."
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
            {weddingsAndEvents.categories.map((cat, index) => (
              <Reveal key={cat.id} delay={index % 2 === 0 ? 75 : 150} className="h-full">
                <article
                  className="group flex flex-col justify-between border border-[#0E2017]/15 bg-[#FFFFFF] h-full"
                >
                  <div>
                    <ClipReveal direction="bottom" delay={index % 2 === 0 ? 75 : 150}>
                      <div className="aspect-[16/9] overflow-hidden bg-[#183827]">
                        <ParallaxMedia offset={16} scaleRange={[1.08, 1.0]} className="h-full w-full">
                          <img
                            src={cat.image}
                            alt={cat.title}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                          />
                        </ParallaxMedia>
                      </div>
                    </ClipReveal>
                    <div className="p-6 sm:p-8">
                      <p className="font-mono text-xs font-semibold text-[#8C6D32] uppercase tabular-nums">
                        0{index + 1}. {cat.subtitle}
                      </p>
                      <h2 className="mt-2 font-serif text-2xl font-medium text-[#0E2017] sm:text-3xl">
                        {cat.title}
                      </h2>
                      <p className="mt-3 text-base leading-relaxed text-[#4A554E]">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-[#0E2017]/10 bg-[#EFECE3]/60 px-6 py-4 sm:px-8">
                    <a
                      href="#event-enquiry"
                      className="text-xs font-semibold tracking-[0.14em] text-[#0E2017] uppercase hover:text-[#8C6D32]"
                    >
                      Enquire for {cat.title} →
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Why Host at Narayana Green Resorts */}
          <Reveal delay={0}>
            <div className="mt-16 border border-[#0E2017]/15 bg-[#0E2017] p-8 text-[#F8F6F0] sm:p-12">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-5">
                  <p className="text-xs font-semibold tracking-[0.2em] text-[#C8A45D] uppercase">
                    Integrated Hospitality Advantage
                  </p>
                  <h3 className="mt-2 font-serif text-3xl font-medium text-[#F8F6F0]">
                    Everything Your Guests Need on One Verdant Estate
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
                  {[
                    'Monumental manicured lawns for up to 2,500+ wedding guests & 3,000+ corporate attendees',
                    '19 on-site luxury rooms & suites (2 Suites, 3 Cottages, 6 Pool-View, 8 Garden-View)',
                    'Multi-cuisine vegetarian & non-vegetarian culinary team from Auric 24×7 Restaurant',
                    'Peaceful location in Karmauni, Anuradhi near Bodh Gaya away from city traffic',
                  ].map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-3 border border-[#F8F6F0]/12 bg-[#183827]/50 p-4 text-sm text-[#F8F6F0]/85"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#C8A45D]" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Dedicated Event Enquiry System */}
      <section id="event-enquiry" className="scroll-mt-20 bg-[#EFECE3] py-16 lg:py-24">
        <Container>
          <Reveal delay={0}>
            <div className="mb-10">
              <SectionHeading
                eyebrow="Direct Events & Banquet Desk"
                title="Plan Your Wedding or Corporate Event"
                description="Complete the form below to generate a structured event enquiry for our WhatsApp concierge or email desk."
              />
            </div>
          </Reveal>

          <Reveal delay={75}>
            <Suspense fallback={<div className="p-8 text-sm">Loading event enquiry form...</div>}>
              <BookingForm defaultTab="event" />
            </Suspense>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
