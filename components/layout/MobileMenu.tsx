'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Phone, MessageCircle, MapPin, ArrowUpRight } from 'lucide-react';
import { RESORT_CONFIG } from '@/data/resort';
import { ROOM_CATEGORIES } from '@/data/rooms';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MOBILE_NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Stay & Suites', href: '/stay' },
  { label: 'Auric 24×7 Dining', href: '/dining' },
  { label: 'Experiences & Pool', href: '/experiences' },
  { label: 'Weddings & Events', href: '/weddings-events' },
  { label: 'Resort Gallery', href: '/gallery' },
  { label: 'Contact & Directions', href: '/contact' },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-[#0E2017] text-[#F8F6F0] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Resort navigation menu"
    >
      {/* Top Bar inside Drawer */}
      <div className="flex items-center justify-between border-b border-[#F8F6F0]/10 px-5 py-4">
        <Link
          href="/"
          onClick={onClose}
          className="font-serif text-xl font-medium tracking-tight text-[#F8F6F0]"
        >
          {RESORT_CONFIG.name}
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center border border-[#F8F6F0]/15 text-[#F8F6F0] transition-colors hover:border-[#C8A45D] hover:text-[#C8A45D]"
          aria-label="Close navigation menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <nav className="flex flex-col space-y-1" aria-label="Mobile Primary Navigation">
          {MOBILE_NAV_LINKS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between border-b border-[#F8F6F0]/10 py-3.5 font-serif text-xl transition-colors ${
                  active ? 'text-[#C8A45D]' : 'text-[#F8F6F0] hover:text-[#C8A45D]'
                }`}
              >
                <span>{item.label}</span>
                <ArrowUpRight className="h-4 w-4 opacity-60" />
              </Link>
            );
          })}
        </nav>

        {/* Direct Room Category Quick Links */}
        <div className="mt-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#C8A45D] uppercase">
            19 Luxury Accommodations
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {ROOM_CATEGORIES.map((room) => (
              <Link
                key={room.slug}
                href={`/stay/${room.slug}`}
                onClick={onClose}
                className="border border-[#F8F6F0]/12 bg-[#183827]/40 p-3 transition-colors hover:border-[#C8A45D]"
              >
                <p className="font-serif text-sm font-medium text-[#F8F6F0]">
                  {room.name}
                </p>
                <p className="mt-0.5 text-xs text-[#C8A45D]">{room.unitCount} Units</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Contact & Concierge Actions */}
        <div className="mt-8 space-y-3 border-t border-[#F8F6F0]/10 pt-6 text-sm text-[#F8F6F0]/80">
          <div className="flex items-start gap-2.5">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C8A45D]" />
            <span>{RESORT_CONFIG.address.full}</span>
          </div>
          <div className="grid grid-cols-1 gap-2.5 pt-2 sm:grid-cols-2">
            <Link
              href="/contact#booking-enquiry"
              onClick={onClose}
              className="flex items-center justify-center bg-[#C8A45D] px-5 py-3.5 text-xs font-semibold tracking-[0.15em] text-[#0E2017] uppercase"
            >
              Book Your Stay
            </Link>
            <a
              href={RESORT_CONFIG.contact.whatsappBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-[#C8A45D]/50 bg-[#183827] px-5 py-3.5 text-xs font-semibold tracking-[0.15em] text-[#F8F6F0] uppercase"
            >
              <MessageCircle className="h-4 w-4 text-[#C8A45D]" />
              WhatsApp Desk
            </a>
            <a
              href={RESORT_CONFIG.contact.phoneHref}
              className="flex items-center justify-center gap-2 border border-[#F8F6F0]/20 px-5 py-3 text-xs font-semibold tracking-wider text-[#F8F6F0] uppercase sm:col-span-2"
            >
              <Phone className="h-3.5 w-3.5 text-[#C8A45D]" />
              Call {RESORT_CONFIG.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
