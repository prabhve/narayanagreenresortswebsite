'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
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

  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.25,
  });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const isNowScrolled = latest > 28;
    if (isNowScrolled !== scrolled) {
      setScrolled(isNowScrolled);
    }
  });

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? 'border-b border-[#F8F6F0]/12 bg-[#0E2017]/95 shadow-[0_12px_36px_rgba(14,32,23,0.18)] backdrop-blur-xl'
            : 'border-b border-[#F8F6F0]/8 bg-[#0E2017]/88 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1360px] items-center justify-between gap-8 px-5 sm:px-8 lg:px-12">
          {/* Zone 1: Brand Title */}
          <Link
            href="/"
            className="font-serif text-xl font-normal tracking-tight text-[#F8F6F0] whitespace-nowrap shrink-0 transition-colors duration-300 hover:text-[#C8A45D] sm:text-2xl"
          >
            {RESORT_CONFIG.name}
          </Link>

          {/* Zone 2: 5 concise single-line navigation links */}
          <nav
            className="hidden items-center gap-9 lg:flex"
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
                  className={`group relative py-1.5 text-[13px] font-normal tracking-[0.04em] whitespace-nowrap shrink-0 transition-colors duration-300 ${
                    isActive
                      ? 'text-[#C8A45D]'
                      : 'text-[#F8F6F0]/80 hover:text-[#F8F6F0]'
                  }`}
                >
                  {item.label}
                  {isActive ? (
                    <motion.span
                      layoutId="header-active-nav"
                      transition={{ duration: 0.35, ease: LUXURY_EASE }}
                      className="absolute inset-x-0 -bottom-0.5 h-px bg-[#C8A45D]"
                      aria-hidden="true"
                    />
                  ) : (
                    <span
                      className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[#C8A45D]/60 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
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
              className="hidden items-center justify-center border border-[#C8A45D]/80 bg-[#C8A45D] px-5 py-2.5 text-[11px] font-medium tracking-[0.16em] text-[#0E2017] uppercase whitespace-nowrap shrink-0 transition-all duration-300 hover:bg-[#d6b36c] hover:shadow-[0_6px_20px_rgba(200,164,93,0.25)] sm:inline-flex"
            >
              Book Your Stay
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center border border-[#F8F6F0]/15 text-[#F8F6F0] transition-colors duration-300 hover:border-[#C8A45D] hover:text-[#C8A45D] lg:hidden cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Hairline Spring-Smoothed Scroll Progress Indicator */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: smoothScrollProgress }}
          className="h-[1.5px] w-full origin-left bg-gradient-to-r from-[#8C6D32]/80 via-[#C8A45D] to-[#e0c17e] motion-reduce:hidden"
        />
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
