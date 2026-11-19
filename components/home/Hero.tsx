'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
} from 'motion/react';
import {
  Play,
  Pause,
  Calendar,
  Users,
  BedDouble,
  ArrowRight,
  Compass,
  ChevronDown,
} from 'lucide-react';
import { RESORT_CONFIG } from '@/data/resort';
import { ROOM_CATEGORIES } from '@/data/rooms';
import { getTomorrowIsoDate } from '@/lib/validation';
import { buildBookingQueryUrl } from '@/lib/booking';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  useClientTodayIso,
  useHydratedReducedMotion,
} from '@/hooks/use-client-env';
import { Container } from '@/components/ui/Container';
import { LUXURY_EASE } from '@/components/ui/MotionPrimitives';

export function Hero() {
  const router = useRouter();
  const heroRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const prefersReducedMotion = useHydratedReducedMotion();
  const isMobile = useIsMobile();
  const clientToday = useClientTodayIso();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.72]);

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [roomPreference, setRoomPreference] = useState<string>(ROOM_CATEGORIES[0].slug);
  const [dateError, setDateError] = useState('');

  const effectiveCheckIn = checkIn || clientToday;
  const effectiveCheckOut =
    checkOut || (effectiveCheckIn ? getTomorrowIsoDate(effectiveCheckIn) : '');

  const toggleVideoPlayback = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().catch(() => {});
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  const handleCheckInChange = (val: string) => {
    setCheckIn(val);
    setDateError('');
    if (val && effectiveCheckOut && new Date(effectiveCheckOut) <= new Date(val)) {
      setCheckOut(getTomorrowIsoDate(val));
    }
  };

  const handleWidgetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!effectiveCheckIn || !effectiveCheckOut) {
      setDateError('Please select both check-in and check-out dates.');
      return;
    }
    if (new Date(effectiveCheckOut) <= new Date(effectiveCheckIn)) {
      setDateError('Check-out must be later than check-in.');
      return;
    }
    setDateError('');
    const targetUrl = buildBookingQueryUrl({
      checkIn: effectiveCheckIn,
      checkOut: effectiveCheckOut,
      adults,
      children,
      room: roomPreference,
      type: 'stay',
    });
    router.push(targetUrl);
  };

  const disableParallax = Boolean(prefersReducedMotion || isMobile);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[88vh] flex-col justify-between overflow-hidden bg-[#0E2017] text-[#F8F6F0]"
      aria-label="Narayana Green Resorts Hero Showcase"
    >
      {/* Background Video + High-Res Poster Fallback with Cinematic Zoom-Out & Subtle Parallax */}
      <motion.div
        style={disableParallax ? undefined : { y: bgY, opacity: bgOpacity }}
        initial={prefersReducedMotion ? false : { scale: 1.12 }}
        animate={{ scale: 1.03 }}
        transition={{ duration: 1.6, ease: LUXURY_EASE }}
        className="absolute inset-0 z-0 transform-gpu will-change-transform"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={RESORT_CONFIG.heroMedia.posterSrc}
          className="h-full w-full scale-[1.03] object-cover transition-transform duration-1000"
        >
          <source src={RESORT_CONFIG.heroMedia.videoSrc} type="video/mp4" />
        </video>

        {/* Measured Multi-Stop Darkened Scrim Overlay for WCAG AA Readability */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0E2017]/80 via-[#0E2017]/55 to-[#0E2017]/92"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0E2017]/75 via-[#0E2017]/30 to-transparent"
          aria-hidden="true"
        />
      </motion.div>

      {/* Main Editorial Hero Content */}
      <Container className="relative z-10 pt-16 pb-12 sm:pt-24 lg:pt-28">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            {/* Clean Unboxed Eyebrow with Animated Hairline */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.05, ease: LUXURY_EASE }}
              className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-[0.22em] text-[#C8A45D] uppercase"
            >
              <motion.span
                initial={prefersReducedMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.12, ease: LUXURY_EASE }}
                className="h-px w-8 origin-left bg-[#C8A45D]"
                aria-hidden="true"
              />
              <span>{RESORT_CONFIG.name}</span>
              <span aria-hidden="true" className="text-[#F8F6F0]/40">
                ·
              </span>
              <span className="text-[#F8F6F0]/85">{RESORT_CONFIG.locationTag}</span>
            </motion.div>

            {/* Primary Display Headline with Staggered Upward Reveal */}
            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.16, ease: LUXURY_EASE }}
              className="mt-5 font-serif text-[clamp(2.35rem,4.5vw,4.1rem)] leading-[1.1] font-medium tracking-tight text-[#F8F6F0] [text-wrap:balance]"
            >
              {RESORT_CONFIG.heroHeadline}
            </motion.h1>

            {/* Supporting Copy Fade-In */}
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.3, ease: LUXURY_EASE }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-[#F8F6F0]/85 sm:text-lg"
            >
              {RESORT_CONFIG.heroSupportingCopy}
            </motion.p>

            {/* Primary & Secondary Action Row */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.42, ease: LUXURY_EASE }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/contact#booking-enquiry"
                className="group inline-flex items-center justify-center gap-2.5 bg-[#C8A45D] px-8 py-4 text-xs font-semibold tracking-[0.15em] text-[#0E2017] uppercase whitespace-nowrap shrink-0 transition-colors duration-200 hover:bg-[#d6b36c]"
              >
                <span>Book Your Stay</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <a
                href="#resort-intro"
                className="inline-flex items-center justify-center gap-2.5 border border-[#F8F6F0]/40 bg-[#0E2017]/40 px-8 py-4 text-xs font-semibold tracking-[0.15em] text-[#F8F6F0] uppercase whitespace-nowrap shrink-0 backdrop-blur-xs transition-colors duration-200 hover:border-[#C8A45D] hover:text-[#C8A45D]"
              >
                <Compass className="h-4 w-4 text-[#C8A45D]" />
                <span>Explore Resort</span>
              </a>

              {/* Ambient Video Pause/Play Accessibility Control */}
              <button
                type="button"
                onClick={toggleVideoPlayback}
                className="ml-auto inline-flex items-center gap-2 border border-[#F8F6F0]/20 bg-[#0E2017]/60 px-3.5 py-2.5 text-[11px] font-medium tracking-wider text-[#F8F6F0]/80 uppercase transition-colors hover:border-[#C8A45D] hover:text-[#C8A45D] cursor-pointer"
                aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-3.5 w-3.5 text-[#C8A45D]" />
                    <span className="hidden sm:inline">Pause Film</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 text-[#C8A45D]" />
                    <span className="hidden sm:inline">Play Film</span>
                  </>
                )}
              </button>
            </motion.div>
          </div>

          {/* Elegant Scroll Indicator */}
          <motion.a
            href="#resort-intro"
            aria-label="Scroll down to discover the resort"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.6, ease: LUXURY_EASE }}
            className="hidden shrink-0 flex-col items-center gap-2.5 text-[10px] font-semibold tracking-[0.22em] text-[#F8F6F0]/75 uppercase transition-colors hover:text-[#C8A45D] lg:flex"
          >
            <span className="[writing-mode:vertical-rl]">Scroll to Explore</span>
            <span className="relative flex h-12 w-px overflow-hidden bg-[#F8F6F0]/25" aria-hidden="true">
              <motion.span
                animate={{ y: ['-100%', '100%'] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="h-1/2 w-full bg-[#C8A45D] motion-reduce:hidden"
              />
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-[#C8A45D]" />
          </motion.a>
        </div>
      </Container>

      {/* Bottom Compact Booking Enquiry Widget + Verified Resort Facts Strip */}
      <div className="relative z-10 border-t border-[#F8F6F0]/15 bg-[#0E2017]/90 backdrop-blur-md">
        <Container className="py-6">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.5, ease: LUXURY_EASE }}
          >
            <form
              onSubmit={handleWidgetSubmit}
              aria-label="Quick Stay Enquiry Widget"
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:items-end"
            >
              {/* Check-in */}
              <div className="lg:col-span-2">
                <label
                  htmlFor="hero-checkin"
                  className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.15em] text-[#C8A45D] uppercase"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Check-In</span>
                </label>
                <input
                  id="hero-checkin"
                  type="date"
                  min={clientToday || undefined}
                  value={effectiveCheckIn}
                  onChange={(e) => handleCheckInChange(e.target.value)}
                  className="mt-1.5 w-full border border-[#F8F6F0]/20 bg-[#183827]/70 px-3.5 py-2.5 font-mono text-xs text-[#F8F6F0] focus:border-[#C8A45D] focus:outline-none"
                />
              </div>

              {/* Check-out */}
              <div className="lg:col-span-2">
                <label
                  htmlFor="hero-checkout"
                  className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.15em] text-[#C8A45D] uppercase"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Check-Out</span>
                </label>
                <input
                  id="hero-checkout"
                  type="date"
                  min={effectiveCheckIn ? getTomorrowIsoDate(effectiveCheckIn) : undefined}
                  value={effectiveCheckOut}
                  onChange={(e) => {
                    setCheckOut(e.target.value);
                    setDateError('');
                  }}
                  className="mt-1.5 w-full border border-[#F8F6F0]/20 bg-[#183827]/70 px-3.5 py-2.5 font-mono text-xs text-[#F8F6F0] focus:border-[#C8A45D] focus:outline-none"
                />
              </div>

              {/* Adults */}
              <div className="lg:col-span-2">
                <label
                  htmlFor="hero-adults"
                  className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.15em] text-[#C8A45D] uppercase"
                >
                  <Users className="h-3.5 w-3.5" />
                  <span>Adults</span>
                </label>
                <select
                  id="hero-adults"
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="mt-1.5 w-full border border-[#F8F6F0]/20 bg-[#183827]/70 px-3.5 py-2.5 text-xs text-[#F8F6F0] focus:border-[#C8A45D] focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                    <option key={n} value={n} className="bg-[#0E2017] text-[#F8F6F0]">
                      {n} {n === 1 ? 'Adult' : 'Adults'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Children */}
              <div className="lg:col-span-1">
                <label
                  htmlFor="hero-children"
                  className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.15em] text-[#C8A45D] uppercase"
                >
                  <span>Children</span>
                </label>
                <select
                  id="hero-children"
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="mt-1.5 w-full border border-[#F8F6F0]/20 bg-[#183827]/70 px-3 py-2.5 text-xs text-[#F8F6F0] focus:border-[#C8A45D] focus:outline-none"
                >
                  {[0, 1, 2, 3, 4].map((n) => (
                    <option key={n} value={n} className="bg-[#0E2017] text-[#F8F6F0]">
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              {/* Room Preference */}
              <div className="lg:col-span-3">
                <label
                  htmlFor="hero-room"
                  className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.15em] text-[#C8A45D] uppercase"
                >
                  <BedDouble className="h-3.5 w-3.5" />
                  <span>Room Preference</span>
                </label>
                <select
                  id="hero-room"
                  value={roomPreference}
                  onChange={(e) => setRoomPreference(e.target.value)}
                  className="mt-1.5 w-full border border-[#F8F6F0]/20 bg-[#183827]/70 px-3.5 py-2.5 text-xs text-[#F8F6F0] focus:border-[#C8A45D] focus:outline-none"
                >
                  {ROOM_CATEGORIES.map((room) => (
                    <option
                      key={room.slug}
                      value={room.slug}
                      className="bg-[#0E2017] text-[#F8F6F0]"
                    >
                      {room.name} ({room.unitCount} Units)
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Enquiry Button */}
              <div className="sm:col-span-2 lg:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-[#C8A45D] px-4 py-2.5 text-xs font-semibold tracking-[0.13em] text-[#0E2017] uppercase whitespace-nowrap shrink-0 transition-colors hover:bg-[#d6b36c] cursor-pointer"
                >
                  Check Availability
                </button>
              </div>
            </form>

            {dateError && (
              <p className="mt-2 text-xs text-[#C8A45D]" role="alert">
                {dateError}
              </p>
            )}

            {/* Unboxed Metadata Bar Below Widget */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[#F8F6F0]/10 pt-4 text-xs text-[#F8F6F0]/75">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono font-semibold text-[#C8A45D] tabular-nums">
                  19 Verified Units
                </span>
                <span aria-hidden="true">·</span>
                <span>2 Suites</span>
                <span aria-hidden="true">·</span>
                <span>3 Cottages</span>
                <span aria-hidden="true">·</span>
                <span>6 Pool-View</span>
                <span aria-hidden="true">·</span>
                <span>8 Garden-View</span>
              </div>
              <p className="text-[11px] text-[#F8F6F0]/65">
                Direct Resort Enquiry · Rates & availability confirmed personally by our front desk
              </p>
            </div>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
