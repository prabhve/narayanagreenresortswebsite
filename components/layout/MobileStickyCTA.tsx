import React from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { RESORT_CONFIG } from '@/data/resort';

export function MobileStickyCTA() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 flex h-13 items-center justify-between border-t border-[#F8F6F0]/15 bg-[#0E2017]/95 px-3 text-[#F8F6F0] backdrop-blur-md lg:hidden"
      aria-label="Quick Mobile Booking Actions"
    >
      <a
        href={RESORT_CONFIG.contact.phoneHref}
        className="flex flex-1 items-center justify-center gap-1.5 py-2 text-[11px] font-semibold tracking-wider text-[#F8F6F0]/90 uppercase whitespace-nowrap"
      >
        <Phone className="h-3.5 w-3.5 text-[#C8A45D]" />
        <span>Call Desk</span>
      </a>

      <span className="h-5 w-px bg-[#F8F6F0]/15" aria-hidden="true" />

      <a
        href={RESORT_CONFIG.contact.whatsappBaseUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-1.5 py-2 text-[11px] font-semibold tracking-wider text-[#F8F6F0]/90 uppercase whitespace-nowrap"
      >
        <MessageCircle className="h-3.5 w-3.5 text-[#C8A45D]" />
        <span>WhatsApp</span>
      </a>

      <Link
        href="/contact#booking-enquiry"
        className="ml-2 inline-flex items-center justify-center gap-1.5 bg-[#C8A45D] px-4 py-2 text-[11px] font-semibold tracking-[0.14em] text-[#0E2017] uppercase whitespace-nowrap shrink-0"
      >
        <Calendar className="h-3.5 w-3.5" />
        <span>Book Stay</span>
      </Link>
    </div>
  );
}
