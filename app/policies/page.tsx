import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileText, Phone, Mail, MessageCircle, Check } from 'lucide-react';
import { RESORT_CONFIG } from '@/data/resort';
import { constructPageMetadata, getWebPageJsonLd } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata = constructPageMetadata({
  title:
    'Guest Policies, Direct Reservation Terms & Privacy Policy | Narayana Green Resorts',
  description:
    'Read the official guest reservation guidelines, direct tariff confirmation policy, event booking terms, and zero-tracker privacy policy for Narayana Green Resorts near Bodh Gaya, Bihar.',
  path: '/policies',
});

export default function PoliciesPage() {
  const pageJsonLd = getWebPageJsonLd({
    title:
      'Guest Policies, Direct Reservation Terms & Privacy Policy | Narayana Green Resorts',
    description:
      'Official guest reservation guidelines, direct tariff confirmation policy, event booking terms, and privacy policy for Narayana Green Resorts near Bodh Gaya, Bihar.',
    path: '/policies',
  });

  return (
    <div className="bg-[#F8F6F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      {/* Page Header */}
      <section className="border-b border-[#F8F6F0]/10 bg-[#0E2017] py-16 text-[#F8F6F0] lg:py-24">
        <Container>
          <Reveal delay={0}>
            <Breadcrumbs
              variant="light"
              className="mb-6"
              items={[{ name: 'Guest Policies & Privacy', path: '/policies' }]}
            />
            <div className="max-w-3xl">
              <div className="flex items-center gap-3.5 text-[11px] font-medium tracking-[0.24em] text-[#C8A45D] uppercase">
                <span className="h-px w-9 bg-[#C8A45D]/70" aria-hidden="true" />
                <span>Transparency, Trust & Guest Assurance</span>
              </div>
              <h1 className="mt-5 font-serif text-4xl font-normal tracking-tight text-[#F8F6F0] sm:text-5xl lg:text-6xl">
                Guest Reservation Policies, Privacy & Terms
              </h1>
              <p className="mt-5 max-w-2xl text-[15px] leading-[1.8] font-light text-[#F8F6F0]/80 sm:text-[17px]">
                At {RESORT_CONFIG.name}, Karmauni, Anuradhi, near Bodh Gaya, we believe in
                complete clarity. Below you will find our direct reservation process, custom
                event proposal guidelines, and our commitment to protecting your personal
                privacy.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Policy Sections */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="space-y-12 lg:col-span-8">
              {/* 1. Direct Reservation & Tariff Policy */}
              <article className="border border-[#0E2017]/15 bg-[#FFFFFF] p-7 sm:p-10">
                <div className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.2em] text-[#8C6D32] uppercase">
                  <FileText className="h-4 w-4" />
                  <span>01 · Direct Room & Stay Reservations</span>
                </div>
                <h2 className="mt-3 font-serif text-2xl font-medium text-[#0E2017] sm:text-3xl">
                  Accommodation Booking & Tariff Confirmation Policy
                </h2>
                <p className="mt-4 text-sm leading-[1.8] text-[#4A554E]">
                  {RESORT_CONFIG.name} operates a curated inventory of{' '}
                  <strong className="text-[#0E2017]">19 luxury accommodations</strong> across
                  four categories: 2 Suites Rooms, 3 Cottage Rooms, 6 Pool-View Rooms, and 8
                  Garden-View Rooms.
                </p>
                <ul className="mt-5 space-y-3 text-sm text-[#4A554E]">
                  {[
                    'Personalized Package Tariffs: Because room tariffs vary by travel season, occupancy count, meal plan preferences (such as breakfast or Maharaj Magadh Thali packages), and group buyout dates, official rates are confirmed directly by our reservations desk.',
                    'Zero Hidden Intermediary Fees: Enquiring directly through https://narayanaresorts.com, via WhatsApp (+91 82719 42779), or by email (reservations@narayanaresorts.com) connects you straight to our on-property front desk.',
                    'Identification Requirement: In accordance with Indian hospitality regulations, all guests are requested to present valid government-issued photo identification upon arrival at the front desk.',
                    'Full-Property Group Blocks: Guests planning destination weddings or executive retreats may request a coordinated block across all 19 units subject to date availability.',
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#8C6D32]" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </article>

              {/* 2. Weddings, Banquets & Corporate Events Policy */}
              <article className="border border-[#0E2017]/15 bg-[#FFFFFF] p-7 sm:p-10">
                <div className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.2em] text-[#8C6D32] uppercase">
                  <FileText className="h-4 w-4" />
                  <span>02 · Destination Weddings & Corporate Events</span>
                </div>
                <h2 className="mt-3 font-serif text-2xl font-medium text-[#0E2017] sm:text-3xl">
                  Event Lawn Staging & Banquet Proposal Policy
                </h2>
                <p className="mt-4 text-sm leading-[1.8] text-[#4A554E]">
                  Our manicured event lawns accommodate{' '}
                  <strong className="text-[#0E2017]">2,500+ wedding guests</strong>,{' '}
                  <strong className="text-[#0E2017]">3,000+ corporate event guests</strong>,
                  and intimate family celebrations starting from a{' '}
                  <strong className="text-[#0E2017]">100+ minimum event size</strong>.
                </p>
                <ul className="mt-5 space-y-3 text-sm text-[#4A554E]">
                  {[
                    'Bespoke Proposals: Every destination wedding, Haldi/Mehendi/Sangeet function, and corporate conference is scoped individually based on guest count, lawn allocation, room block requirements, and custom multi-cuisine menus from Auric 24×7 Restaurant.',
                    'Site Visits & Consultations: Families and corporate event planners are welcome to schedule an on-property walkthrough at Karmauni, Anuradhi, near Bodh Gaya by calling +91 82719 42779.',
                    'Date Holding & Confirmation: Event dates and lawn allocations are formally reserved upon written confirmation and advance schedule agreement with our events desk.',
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#8C6D32]" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </article>

              {/* 3. Privacy & Data Protection Policy */}
              <article className="border border-[#0E2017]/15 bg-[#FFFFFF] p-7 sm:p-10">
                <div className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.2em] text-[#8C6D32] uppercase">
                  <ShieldCheck className="h-4 w-4" />
                  <span>03 · Guest Privacy & Data Protection</span>
                </div>
                <h2 className="mt-3 font-serif text-2xl font-medium text-[#0E2017] sm:text-3xl">
                  Privacy-First Enquiry & Communication Architecture
                </h2>
                <p className="mt-4 text-sm leading-[1.8] text-[#4A554E]">
                  {RESORT_CONFIG.name} respects your digital privacy. When you use our
                  website to explore rooms, dining, or wedding venues:
                </p>
                <ul className="mt-5 space-y-3 text-sm text-[#4A554E]">
                  {[
                    'No Unauthorized Browser Storage of Personal Data: Your name, phone number, and email entered into our enquiry forms are formatted solely to initiate your direct WhatsApp or email message to our front desk and are never persisted in local browser storage.',
                    'Direct Concierge Usage Only: Contact details shared with our reservations desk via WhatsApp, phone, or email are used exclusively to respond to your stay, dining, or event enquiry.',
                    'First-Party Analytics: Optional site performance metrics are used solely to improve page speed and guest navigation across our official domain (https://narayanaresorts.com).',
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#8C6D32]" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            {/* Sidebar Contact Card */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 border border-[#0E2017]/20 bg-[#EFECE3] p-7 sm:p-8">
                <p className="text-xs font-semibold tracking-[0.2em] text-[#8C6D32] uppercase">
                  Direct Front Desk Support
                </p>
                <h3 className="mt-2 font-serif text-2xl font-medium text-[#0E2017]">
                  Need Clarification Before Booking?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4A554E]">
                  Speak directly with our reservations and events team in Karmauni, Anuradhi,
                  near Bodh Gaya for written package terms, cancellation schedules, or group
                  proposals.
                </p>

                <div className="mt-6 space-y-3">
                  <a
                    href={RESORT_CONFIG.contact.phoneHref}
                    className="flex w-full items-center justify-center gap-2 bg-[#0E2017] px-6 py-4 text-xs font-semibold tracking-[0.14em] text-[#F8F6F0] uppercase transition-colors hover:bg-[#183827]"
                  >
                    <Phone className="h-4 w-4 text-[#C8A45D]" />
                    <span>Call {RESORT_CONFIG.contact.phoneDisplay}</span>
                  </a>

                  <a
                    href={RESORT_CONFIG.contact.whatsappBaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 border border-[#0E2017]/25 bg-[#FFFFFF] px-6 py-3.5 text-xs font-semibold tracking-[0.14em] text-[#0E2017] uppercase transition-colors hover:border-[#0E2017]"
                  >
                    <MessageCircle className="h-4 w-4 text-[#8C6D32]" />
                    <span>WhatsApp Front Desk</span>
                  </a>

                  <a
                    href={RESORT_CONFIG.contact.emailHref}
                    className="flex w-full items-center justify-center gap-2 border border-[#0E2017]/15 bg-[#F8F6F0] px-6 py-3.5 text-xs font-semibold text-[#0E2017]"
                  >
                    <Mail className="h-4 w-4 text-[#8C6D32]" />
                    <span>{RESORT_CONFIG.contact.reservationEmail}</span>
                  </a>
                </div>

                <div className="mt-6 border-t border-[#0E2017]/12 pt-5 text-xs text-[#4A554E]">
                  <p className="font-semibold text-[#0E2017] uppercase">Resort Address:</p>
                  <p className="mt-1">{RESORT_CONFIG.address.full}</p>
                  <Link
                    href="/contact#booking-enquiry"
                    className="mt-3 inline-block font-semibold text-[#8C6D32] uppercase hover:underline"
                  >
                    Go to Online Enquiry Form →
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
}
