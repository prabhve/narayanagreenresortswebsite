import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle, Compass, ExternalLink } from 'lucide-react';
import { RESORT_CONFIG } from '@/data/resort';
import { ROOM_CATEGORIES } from '@/data/rooms';
import { Container } from '@/components/ui/Container';

export function Footer() {
  const currentYear = new Date().getUTCFullYear();

  return (
    <footer className="border-t border-[#F8F6F0]/10 bg-[#0E2017] text-[#F8F6F0]">
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Brand Identity & Positioning */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-block font-serif text-2xl font-medium tracking-tight text-[#F8F6F0]"
            >
              {RESORT_CONFIG.name}
            </Link>
            <p className="mt-2 text-xs font-semibold tracking-[0.2em] text-[#C8A45D] uppercase">
              {RESORT_CONFIG.locationTag}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#F8F6F0]/75">
              {RESORT_CONFIG.supportingPositioning}
            </p>
            <p className="mt-4 font-serif text-sm italic text-[#C8A45D]">
              “{RESORT_CONFIG.positioning}”
            </p>

            {/* Verified Social Links Only */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href={RESORT_CONFIG.links.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border border-[#F8F6F0]/15 px-3.5 py-2 text-xs font-medium tracking-wider text-[#F8F6F0]/85 uppercase transition-colors hover:border-[#C8A45D] hover:text-[#C8A45D]"
              >
                <span>Instagram</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href={RESORT_CONFIG.links.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border border-[#F8F6F0]/15 px-3.5 py-2 text-xs font-medium tracking-wider text-[#F8F6F0]/85 uppercase transition-colors hover:border-[#C8A45D] hover:text-[#C8A45D]"
              >
                <span>Facebook</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-[#C8A45D] uppercase">
              Explore Resort
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-[#F8F6F0]/80">
              <li>
                <Link href="/" className="transition-colors hover:text-[#C8A45D]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/stay" className="transition-colors hover:text-[#C8A45D]">
                  Stay & Accommodations
                </Link>
              </li>
              <li>
                <Link href="/dining" className="transition-colors hover:text-[#C8A45D]">
                  Auric 24×7 Restaurant
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="transition-colors hover:text-[#C8A45D]">
                  Pool & Experiences
                </Link>
              </li>
              <li>
                <Link href="/weddings-events" className="transition-colors hover:text-[#C8A45D]">
                  Weddings & Corporate
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="transition-colors hover:text-[#C8A45D]">
                  Visual Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-[#C8A45D]">
                  Contact & Enquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Accommodation Categories (19 Verified Units) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-[#C8A45D] uppercase">
              19 Accommodations
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-[#F8F6F0]/80">
              {ROOM_CATEGORIES.map((room) => (
                <li key={room.slug}>
                  <Link
                    href={`/stay/${room.slug}`}
                    className="group flex items-center justify-between border-b border-[#F8F6F0]/10 pb-2 transition-colors hover:border-[#C8A45D]/40 hover:text-[#C8A45D]"
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
              <p className="text-xs text-[#F8F6F0]/65">
                Dining Highlight: <strong className="text-[#F8F6F0]">Auric 24×7 Restaurant</strong> &{' '}
                <strong className="text-[#F8F6F0]">Maharaj Magadh Thali</strong>
              </p>
            </div>
          </div>

          {/* Column 4: Direct Contact & Directions */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-[#C8A45D] uppercase">
              Reservations & Concierge
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-[#F8F6F0]/80">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#C8A45D]" />
                <span>{RESORT_CONFIG.address.full}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[#C8A45D]" />
                <a
                  href={RESORT_CONFIG.contact.phoneHref}
                  className="font-mono tabular-nums transition-colors hover:text-[#C8A45D]"
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
                  className="transition-colors hover:text-[#C8A45D]"
                >
                  WhatsApp: {RESORT_CONFIG.contact.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[#C8A45D]" />
                <a
                  href={RESORT_CONFIG.contact.emailHref}
                  className="break-all transition-colors hover:text-[#C8A45D]"
                >
                  {RESORT_CONFIG.contact.reservationEmail}
                </a>
              </li>
              <li className="pt-1">
                <a
                  href={RESORT_CONFIG.links.googleMapsShare}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#C8A45D] uppercase hover:underline"
                >
                  <Compass className="h-3.5 w-3.5" />
                  <span>Open Official Google Maps Pin</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Honest Verification Bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-[#F8F6F0]/10 pt-8 text-xs text-[#F8F6F0]/60 sm:flex-row sm:items-center">
          <p>
            © {currentYear} {RESORT_CONFIG.name}, Bodh Gaya, Bihar, India. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/stay" className="hover:text-[#F8F6F0]">
              Accommodations
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/weddings-events" className="hover:text-[#F8F6F0]">
              Weddings & Events
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/contact" className="hover:text-[#F8F6F0]">
              Enquire Now
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
