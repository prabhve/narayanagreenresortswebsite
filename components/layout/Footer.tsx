import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle, Compass, ExternalLink } from 'lucide-react';
import { RESORT_CONFIG } from '@/data/resort';
import { ROOM_CATEGORIES } from '@/data/rooms';
import { Container } from '@/components/ui/Container';

export function Footer() {
  const currentYear = new Date().getUTCFullYear();

  return (
    <footer className="border-t border-[#F8F6F0]/8 bg-[#0E2017] text-[#F8F6F0]">
      <Container className="py-20 lg:py-28">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Column 1: Brand Identity & Positioning */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-block font-serif text-2xl font-normal tracking-tight text-[#F8F6F0] transition-colors hover:text-[#C8A45D]"
            >
              {RESORT_CONFIG.name}
            </Link>
            <p className="mt-2 text-[11px] font-medium tracking-[0.22em] text-[#C8A45D] uppercase">
              {RESORT_CONFIG.locationTag}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-[1.8] font-light text-[#F8F6F0]/72">
              {RESORT_CONFIG.supportingPositioning}
            </p>
            <p className="mt-4 font-serif text-base italic font-normal text-[#e5cfa0]">
              “{RESORT_CONFIG.positioning}”
            </p>

            {/* Verified Social Links Only */}
            <div className="mt-7 flex items-center gap-4">
              <a
                href={RESORT_CONFIG.links.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border border-[#F8F6F0]/15 px-4 py-2 text-[11px] font-normal tracking-[0.16em] text-[#F8F6F0]/80 uppercase transition-all duration-300 hover:border-[#C8A45D] hover:text-[#C8A45D]"
              >
                <span>Instagram</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href={RESORT_CONFIG.links.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border border-[#F8F6F0]/15 px-4 py-2 text-[11px] font-normal tracking-[0.16em] text-[#F8F6F0]/80 uppercase transition-all duration-300 hover:border-[#C8A45D] hover:text-[#C8A45D]"
              >
                <span>Facebook</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-medium tracking-[0.22em] text-[#C8A45D] uppercase">
              Explore Resort
            </h3>
            <ul className="mt-6 space-y-3.5 text-sm font-light text-[#F8F6F0]/78">
              <li>
                <Link href="/" className="transition-colors duration-300 hover:text-[#C8A45D]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/stay" className="transition-colors duration-300 hover:text-[#C8A45D]">
                  Stay & Accommodations
                </Link>
              </li>
              <li>
                <Link href="/dining" className="transition-colors duration-300 hover:text-[#C8A45D]">
                  Auric 24×7 Restaurant
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="transition-colors duration-300 hover:text-[#C8A45D]">
                  Pool & Experiences
                </Link>
              </li>
              <li>
                <Link href="/weddings-events" className="transition-colors duration-300 hover:text-[#C8A45D]">
                  Weddings & Corporate
                </Link>
              </li>
              <li>
                <Link href="/bodh-gaya-guide" className="transition-colors duration-300 hover:text-[#C8A45D]">
                  Bodh Gaya Guide
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="transition-colors duration-300 hover:text-[#C8A45D]">
                  Visual Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors duration-300 hover:text-[#C8A45D]">
                  Contact & Enquiries
                </Link>
              </li>
              <li>
                <Link href="/policies" className="transition-colors duration-300 hover:text-[#C8A45D]">
                  Policies & Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Accommodation Categories (19 Verified Units) */}
          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-medium tracking-[0.22em] text-[#C8A45D] uppercase">
              19 Accommodations
            </h3>
            <ul className="mt-6 space-y-3.5 text-sm font-light text-[#F8F6F0]/78">
              {ROOM_CATEGORIES.map((room) => (
                <li key={room.slug}>
                  <Link
                    href={`/stay/${room.slug}`}
                    className="group flex items-center justify-between border-b border-[#F8F6F0]/8 pb-2.5 transition-colors duration-300 hover:border-[#C8A45D]/40 hover:text-[#C8A45D]"
                  >
                    <span>{room.name}</span>
                    <span className="font-mono text-xs text-[#C8A45D] tabular-nums">
                      {room.unitCount} Units
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <p className="text-xs font-light text-[#F8F6F0]/60">
                Dining Highlight: <span className="text-[#F8F6F0]/90">Auric 24×7 Restaurant</span> &{' '}
                <span className="text-[#F8F6F0]/90">Maharaj Magadh Thali</span>
              </p>
            </div>
          </div>

          {/* Column 4: Direct Contact & Directions */}
          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-medium tracking-[0.22em] text-[#C8A45D] uppercase">
              Reservations & Concierge
            </h3>
            <ul className="mt-6 space-y-4 text-sm font-light text-[#F8F6F0]/78">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#C8A45D]" />
                <span>{RESORT_CONFIG.address.full}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[#C8A45D]" />
                <a
                  href={RESORT_CONFIG.contact.phoneHref}
                  className="font-mono tabular-nums transition-colors duration-300 hover:text-[#C8A45D]"
                >
                  {RESORT_CONFIG.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 shrink-0 text-[#C8A45D]" />
                <a
                  href={RESORT_CONFIG.contact.whatsappBaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-[#C8A45D]"
                >
                  WhatsApp: {RESORT_CONFIG.contact.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[#C8A45D]" />
                <a
                  href={RESORT_CONFIG.contact.emailHref}
                  className="break-all transition-colors duration-300 hover:text-[#C8A45D]"
                >
                  {RESORT_CONFIG.contact.reservationEmail}
                </a>
              </li>
              <li className="pt-1">
                <a
                  href={RESORT_CONFIG.links.googleMapsShare}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.16em] text-[#C8A45D] uppercase transition-colors hover:text-[#e5cfa0]"
                >
                  <Compass className="h-3.5 w-3.5" />
                  <span className="border-b border-[#C8A45D]/40 pb-0.5">
                    Open Official Google Maps Pin
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Quiet Navigation Bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[#F8F6F0]/8 pt-8 text-xs font-light text-[#F8F6F0]/55 sm:flex-row sm:items-center">
          <p>
            © {currentYear} {RESORT_CONFIG.name}, Bodh Gaya, Bihar, India. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/stay" className="transition-colors hover:text-[#F8F6F0]">
              Accommodations
            </Link>
            <span aria-hidden="true" className="text-[#F8F6F0]/25">·</span>
            <Link href="/weddings-events" className="transition-colors hover:text-[#F8F6F0]">
              Weddings & Events
            </Link>
            <span aria-hidden="true" className="text-[#F8F6F0]/25">·</span>
            <Link href="/bodh-gaya-guide" className="transition-colors hover:text-[#F8F6F0]">
              Bodh Gaya Guide
            </Link>
            <span aria-hidden="true" className="text-[#F8F6F0]/25">·</span>
            <Link href="/policies" className="transition-colors hover:text-[#F8F6F0]">
              Policies & Privacy
            </Link>
            <span aria-hidden="true" className="text-[#F8F6F0]/25">·</span>
            <Link href="/contact" className="transition-colors hover:text-[#F8F6F0]">
              Enquire Now
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
