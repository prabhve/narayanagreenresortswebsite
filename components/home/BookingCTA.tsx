import React, { Suspense } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Compass } from 'lucide-react';
import { RESORT_CONFIG } from '@/data/resort';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BookingForm } from '@/components/booking/BookingForm';
import { Reveal } from '@/components/ui/Reveal';

export function BookingCTA() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-[#EFECE3] py-20 lg:py-28"
    >
      <Container>
        <div className="mb-12 grid grid-cols-1 gap-10 border-b border-[#0E2017]/15 pb-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal delay={0}>
              <SectionHeading
                eyebrow="Start Your Journey"
                title="Inquiries, Stay Packages & Event Reservations"
                description="Connect directly with our front desk team at Karmauni, Anuradhi, near Bodh Gaya for personalized room tariffs, Auric 24×7 dining reservations, and custom wedding or corporate proposals."
              />
            </Reveal>
          </div>

          {/* Direct Contact Bar */}
          <div className="lg:col-span-5">
            <Reveal delay={150}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <a
              href={RESORT_CONFIG.contact.phoneHref}
              className="flex items-start gap-3.5 border border-[#0E2017]/15 bg-[#F8F6F0] p-4 transition-colors hover:border-[#0E2017]"
            >
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#8C6D32]" />
              <div>
                <p className="text-[11px] font-semibold tracking-wider text-[#4A554E] uppercase">
                  Direct Phone Line
                </p>
                <p className="mt-1 font-mono text-sm font-semibold text-[#0E2017] tabular-nums">
                  {RESORT_CONFIG.contact.phoneDisplay}
                </p>
              </div>
            </a>

            <a
              href={RESORT_CONFIG.contact.whatsappBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3.5 border border-[#0E2017]/15 bg-[#F8F6F0] p-4 transition-colors hover:border-[#0E2017]"
            >
              <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#8C6D32]" />
              <div>
                <p className="text-[11px] font-semibold tracking-wider text-[#4A554E] uppercase">
                  WhatsApp Concierge
                </p>
                <p className="mt-1 font-mono text-sm font-semibold text-[#0E2017] tabular-nums">
                  {RESORT_CONFIG.contact.whatsappDisplay}
                </p>
              </div>
            </a>

            <a
              href={RESORT_CONFIG.contact.emailHref}
              className="flex items-start gap-3.5 border border-[#0E2017]/15 bg-[#F8F6F0] p-4 transition-colors hover:border-[#0E2017]"
            >
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#8C6D32]" />
              <div>
                <p className="text-[11px] font-semibold tracking-wider text-[#4A554E] uppercase">
                  Reservation Email
                </p>
                <p className="mt-1 break-all text-xs font-semibold text-[#0E2017]">
                  {RESORT_CONFIG.contact.reservationEmail}
                </p>
              </div>
            </a>

            <a
              href={RESORT_CONFIG.links.googleMapsShare}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3.5 border border-[#0E2017]/15 bg-[#F8F6F0] p-4 transition-colors hover:border-[#0E2017]"
            >
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#8C6D32]" />
              <div>
                <p className="text-[11px] font-semibold tracking-wider text-[#4A554E] uppercase">
                  Resort Location
                </p>
                <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[#0E2017]">
                  <span>Karmauni, Near Bodh Gaya</span>
                  <Compass className="h-3.5 w-3.5 text-[#8C6D32]" />
                </p>
              </div>
            </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Interactive Multi-Mode Enquiry Workflow */}
        <Reveal delay={150}>
          <Suspense
            fallback={
              <div className="border border-[#0E2017]/15 bg-[#F8F6F0] p-8 text-sm text-[#4A554E]">
                Loading interactive booking enquiry form...
              </div>
            }
          >
            <BookingForm />
          </Suspense>
        </Reveal>
      </Container>
    </section>
  );
}
