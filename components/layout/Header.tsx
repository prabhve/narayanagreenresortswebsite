'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'motion/react';
import { Menu } from 'lucide-react';
import { RESORT_CONFIG } from '@/data/resort';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { LUXURY_EASE } from '@/components/ui/MotionPrimitives';

const PRIMARY_NAV = [
  { label: 'Stay', href: '/stay' },
  { label: 'Dining', href: '/dining' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Weddings & Events', href: '/weddings-events' },
  { label: 'Gallery', href: '/gallery' },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const isNowScrolled = latest > 24;
    if (isNowScrolled !== scrolled) {
      setScrolled(isNowScrolled);
    }
  });

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'border-b border-[#F8F6F0]/15 bg-[#0E2017]/96 shadow-[0_10px_30px_rgba(14,32,23,0.22)] backdrop-blur-md'
            : 'border-b border-[#F8F6F0]/10 bg-[#0E2017]/90 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1360px] items-center justify-between gap-8 px-5 sm:px-8 lg:px-12">
          {/* Zone 1: Brand Title */}
          <Link
            href="/"
            className="font-serif text-xl font-medium tracking-tight text-[#F8F6F0] whitespace-nowrap shrink-0 transition-colors duration-200 hover:text-[#C8A45D] sm:text-2xl"
          >
            {RESORT_CONFIG.name}
          </Link>

          {/* Zone 2: 5 concise single-line navigation links */}
          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Primary Resort Navigation"
          >
            {PRIMARY_NAV.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 ${
                    isActive
                      ? 'text-[#C8A45D]'
                      : 'text-[#F8F6F0]/85 hover:text-[#F8F6F0]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="header-active-nav"
                      transition={{ duration: 0.3, ease: LUXURY_EASE }}
                      className="absolute inset-x-0 -bottom-1 h-0.5 bg-[#C8A45D]"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action on Desktop + Hamburger on Mobile */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact#booking-enquiry"
              className="hidden items-center justify-center bg-[#C8A45D] px-5 py-2.5 text-xs font-semibold tracking-[0.14em] text-[#0E2017] uppercase whitespace-nowrap shrink-0 transition-colors duration-200 hover:bg-[#d6b36c] sm:inline-flex"
            >
              Book Your Stay
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center border border-[#F8F6F0]/20 text-[#F8F6F0] transition-colors hover:border-[#C8A45D] hover:text-[#C8A45D] lg:hidden cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Hairline Scroll Progress Indicator */}
        {!prefersReducedMotion && (
          <motion.div
            aria-hidden="true"
            style={{ scaleX: scrollYProgress }}
            className="h-[2px] w-full origin-left bg-gradient-to-r from-[#8C6D32] via-[#C8A45D] to-[#C8A45D]"
          />
        )}
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
