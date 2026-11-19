import React, { Suspense } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Compass, ExternalLink } from 'lucide-react';
import { RESORT_CONFIG } from '@/data/resort';
import { constructPageMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BookingForm } from '@/components/booking/BookingForm';
import { Reveal } from '@/components/ui/Reveal';

export const metadata = constructPageMetadata({
  title: 'Contact, Directions & Booking Enquiry | Narayana Green Resorts Bodh Gaya',
  description:
    'Contact Narayana Green Resorts in Karmauni, Anuradhi, near Bodh Gaya, Bihar. Call +91 82719 42779, message our WhatsApp concierge, or send a stay, dining, or wedding enquiry.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <div className="bg-[#F8F6F0]">
      {/* Page Hero */}
      <section className="border-b border-[#F8F6F0]/10 bg-[#0E2017] py-16 text-[#F8F6F0] lg:py-24">
        <Container>
          <Reveal delay={0}>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-[#C8A45D] uppercase">
                <span className="h-px w-8 bg-[#C8A45D]" aria-hidden="true" />
                <span>Reservations & Front Desk Concierge</span>
              </div>
              <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight text-[#F8F6F0] sm:text-5xl lg:text-6xl">
                Contact & Booking Enquiries
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#F8F6F0]/80 sm:text-lg">
                Our front desk and events specialists in Karmauni, Anuradhi, near Bodh Gaya
                are ready to assist with room availability across our 19 units, Auric 24×7
                dining reservations, and custom wedding or corporate event proposals.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Contact Channels + Directions */}
      <section className="border-b border-[#0E2017]/12 bg-[#EFECE3] py-12 lg:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Address */}
            <Reveal delay={0} className="h-full">
              <div className="flex flex-col justify-between border border-[#0E2017]/15 bg-[#FFFFFF] p-6 h-full">
                <div>
                  <MapPin className="h-5 w-5 text-[#8C6D32]" />
                  <p className="mt-4 text-xs font-semibold tracking-wider text-[#8C6D32] uppercase">
                    Resort Location
                  </p>
                  <h2 className="mt-1 font-serif text-xl font-medium text-[#0E2017]">
                    Bodh Gaya Corridor
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#4A554E]">
                    {RESORT_CONFIG.address.full}
                  </p>
                </div>
                <div className="mt-5 border-t border-[#0E2017]/10 pt-3.5">
                  <a
                    href={RESORT_CONFIG.links.googleMapsShare}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#0E2017] uppercase hover:text-[#8C6D32]"
                  >
                    <Compass className="h-3.5 w-3.5 text-[#8C6D32]" />
                    <span>Open Google Maps Pin</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Direct Phone */}
            <Reveal delay={75} className="h-full">
              <div className="flex flex-col justify-between border border-[#0E2017]/15 bg-[#FFFFFF] p-6 h-full">
                <div>
                  <Phone className="h-5 w-5 text-[#8C6D32]" />
                  <p className="mt-4 text-xs font-semibold tracking-wider text-[#8C6D32] uppercase">
                    Direct Phone Line
                  </p>
                  <h2 className="mt-1 font-serif text-xl font-medium text-[#0E2017]">
                    Front Desk & Reservations
                  </h2>
                  <p className="mt-2 font-mono text-base font-semibold text-[#0E2017] tabular-nums">
                    {RESORT_CONFIG.contact.phoneDisplay}
                  </p>
                </div>
                <div className="mt-5 border-t border-[#0E2017]/10 pt-3.5">
                  <a
                    href={RESORT_CONFIG.contact.phoneHref}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#0E2017] uppercase hover:text-[#8C6D32]"
                  >
                    <span>Call Now</span>
                  </a>
                </div>
              </div>
            </Reveal>

            {/* WhatsApp Concierge */}
            <Reveal delay={150} className="h-full">
              <div className="flex flex-col justify-between border border-[#0E2017]/15 bg-[#FFFFFF] p-6 h-full">
                <div>
                  <MessageCircle className="h-5 w-5 text-[#8C6D32]" />
                  <p className="mt-4 text-xs font-semibold tracking-wider text-[#8C6D32] uppercase">
                    WhatsApp Concierge
                  </p>
                  <h2 className="mt-1 font-serif text-xl font-medium text-[#0E2017]">
                    Instant Enquiry Chat
                  </h2>
                  <p className="mt-2 font-mono text-base font-semibold text-[#0E2017] tabular-nums">
                    {RESORT_CONFIG.contact.whatsappDisplay}
                  </p>
                </div>
                <div className="mt-5 border-t border-[#0E2017]/10 pt-3.5">
                  <a
                    href={RESORT_CONFIG.contact.whatsappBaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#0E2017] uppercase hover:text-[#8C6D32]"
                  >
                    <span>Open WhatsApp Chat</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Reservation Email */}
            <Reveal delay={225} className="h-full">
              <div className="flex flex-col justify-between border border-[#0E2017]/15 bg-[#FFFFFF] p-6 h-full">
                <div>
                  <Mail className="h-5 w-5 text-[#8C6D32]" />
                  <p className="mt-4 text-xs font-semibold tracking-wider text-[#8C6D32] uppercase">
                    Reservation Email
                  </p>
                  <h2 className="mt-1 font-serif text-xl font-medium text-[#0E2017]">
                    Written Proposals
                  </h2>
                  <p className="mt-2 break-all text-sm font-medium text-[#0E2017]">
                    {RESORT_CONFIG.contact.reservationEmail}
                  </p>
                </div>
                <div className="mt-5 border-t border-[#0E2017]/10 pt-3.5">
                  <a
                    href={RESORT_CONFIG.contact.emailHref}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#0E2017] uppercase hover:text-[#8C6D32]"
                  >
                    <span>Send Direct Email</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Main Booking & Enquiry Workflow */}
      <section className="py-16 lg:py-24">
        <Container>
          <Reveal delay={0}>
            <div className="mb-10">
              <SectionHeading
                eyebrow="Structured Enquiry System"
                title="Send a Room, Wedding, or Dining Enquiry"
                description="Select your enquiry type below. Your dates and guest details are validated automatically and formatted for immediate submission via WhatsApp or Email."
              />
            </div>
          </Reveal>

          <Reveal delay={75}>
            <Suspense
              fallback={
                <div className="border border-[#0E2017]/15 bg-[#FFFFFF] p-8 text-sm">
                  Loading enquiry system...
                </div>
              }
            >
              <BookingForm />
            </Suspense>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
