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
      className="scroll-mt-20 bg-[#EFECE3] py-24 lg:py-36"
    >
      <Container>
        <Reveal delay={0}>
          <SectionHeading
            eyebrow="Personal Concierge & Reservations"
            title="Inquiries, Stay Packages & Event Reservations"
            description="Connect directly with our front desk team at Karmauni, Anuradhi, near Bodh Gaya for personalized room tariffs across our 19 units, Auric 24×7 dining reservations, and custom wedding or corporate proposals."
          />
        </Reveal>

        {/* Open Architectural Direct Concierge Ribbon (Replaces 4 Boxed Cards) */}
        <Reveal delay={75}>
          <div className="my-14 grid grid-cols-1 gap-8 border-y border-[#0E2017]/10 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-[#0E2017]/10">
            <a
              href={RESORT_CONFIG.contact.phoneHref}
              className="group flex items-start gap-3.5 lg:pr-8"
            >
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#8C6D32] transition-transform duration-300 group-hover:scale-110" />
              <div>
                <p className="text-[10px] font-medium tracking-[0.2em] text-[#4A554E] uppercase">
                  Direct Phone Line
                </p>
                <p className="mt-1.5 font-mono text-sm font-normal text-[#0E2017] tabular-nums transition-colors group-hover:text-[#8C6D32]">
                  {RESORT_CONFIG.contact.phoneDisplay}
                </p>
              </div>
            </a>

            <a
              href={RESORT_CONFIG.contact.whatsappBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3.5 lg:px-8"
            >
              <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#8C6D32] transition-transform duration-300 group-hover:scale-110" />
              <div>
                <p className="text-[10px] font-medium tracking-[0.2em] text-[#4A554E] uppercase">
                  WhatsApp Concierge
                </p>
                <p className="mt-1.5 font-mono text-sm font-normal text-[#0E2017] tabular-nums transition-colors group-hover:text-[#8C6D32]">
                  {RESORT_CONFIG.contact.whatsappDisplay}
                </p>
              </div>
            </a>

            <a
              href={RESORT_CONFIG.contact.emailHref}
              className="group flex items-start gap-3.5 lg:px-8"
            >
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#8C6D32] transition-transform duration-300 group-hover:scale-110" />
              <div>
                <p className="text-[10px] font-medium tracking-[0.2em] text-[#4A554E] uppercase">
                  Reservation Email
                </p>
                <p className="mt-1.5 break-all text-xs font-normal text-[#0E2017] transition-colors group-hover:text-[#8C6D32]">
                  {RESORT_CONFIG.contact.reservationEmail}
                </p>
              </div>
            </a>

            <a
              href={RESORT_CONFIG.links.googleMapsShare}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3.5 lg:pl-8"
            >
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#8C6D32] transition-transform duration-300 group-hover:scale-110" />
              <div>
                <p className="text-[10px] font-medium tracking-[0.2em] text-[#4A554E] uppercase">
                  Resort Location
                </p>
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-normal text-[#0E2017] transition-colors group-hover:text-[#8C6D32]">
                  <span>Karmauni, Near Bodh Gaya</span>
                  <Compass className="h-3.5 w-3.5 text-[#8C6D32]" />
                </p>
              </div>
            </a>
          </div>
        </Reveal>

        {/* Interactive Multi-Mode Enquiry Workflow */}
        <Reveal delay={150}>
          <Suspense
            fallback={
              <div className="border border-[#0E2017]/10 bg-[#F8F6F0] p-8 text-sm text-[#4A554E]">
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
