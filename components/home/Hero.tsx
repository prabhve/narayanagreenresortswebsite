'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useSpring,
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

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 24,
    mass: 0.35,
  });

  const bgY = useTransform(smoothScroll, [0, 1], ['0%', '14%']);
  const bgScale = useTransform(smoothScroll, [0, 1], [1, 1.06]);
  const contentY = useTransform(smoothScroll, [0, 1], ['0%', '6%']);

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [roomPreference, setRoomPreference] = useState<string>(ROOM_CATEGORIES[0].slug);
  const [dateError, setDateError] = useState('');

  const effectiveCheckIn = checkIn || clientToday;
  const effectiveCheckOut =
    checkOut || (effectiveCheckIn ? getTomorrowIsoDate(effectiveCheckIn) : '');

  React.useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    vid.addEventListener('play', handlePlay);
    vid.addEventListener('pause', handlePause);
    if (prefersReducedMotion && !vid.paused) {
      vid.pause();
    }
    return () => {
      vid.removeEventListener('play', handlePlay);
      vid.removeEventListener('pause', handlePause);
    };
  }, [prefersReducedMotion]);

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
      className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-between overflow-hidden bg-[#0E2017] text-[#F8F6F0] sm:min-h-[calc(100svh-4.5rem)] lg:min-h-[calc(100svh-4.75rem)]"
      aria-label="Narayana Green Resorts Hero Showcase"
    >
      {/* Background Video + High-Res Poster with Slow Cinematic Zoom-Out & Spring Parallax */}
      <motion.div
        style={disableParallax ? undefined : { y: bgY, scale: bgScale }}
        initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { scale: 1.11, opacity: 0.85 }}
        animate={prefersReducedMotion ? { opacity: 1, scale: 1 } : { scale: 1.02, opacity: 1 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 2.3, ease: LUXURY_EASE }}
        className="absolute inset-0 z-0 transform-gpu will-change-transform"
      >
        <video
          ref={videoRef}
          autoPlay={!prefersReducedMotion}
          loop
          muted
          playsInline
          preload="metadata"
          poster={RESORT_CONFIG.heroMedia.posterSrc}
          className="h-full w-full object-cover"
        >
          <source src={RESORT_CONFIG.heroMedia.videoSrc} type="video/mp4" />
        </video>

        {/* Soft Multi-Stop Atmospheric Scrim for High Readability & Natural Depth */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0E2017]/75 via-[#0E2017]/40 to-[#0E2017]/92"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0E2017]/80 via-[#0E2017]/30 to-transparent"
          aria-hidden="true"
        />
      </motion.div>

      {/* Top-Right Corner Ambient Video Control on Mobile/Tablet & Bottom-Right Corner on Desktop */}
      <Container className="relative z-10 flex flex-1 flex-col justify-center pt-5 pb-6 sm:pt-7 sm:pb-8 lg:py-7 xl:py-9">
        <div className="mb-3 flex justify-end lg:hidden">
          <button
            type="button"
            onClick={toggleVideoPlayback}
            className="inline-flex items-center gap-2 border border-[#F8F6F0]/15 bg-[#0E2017]/55 px-3 py-2 text-[10px] font-normal tracking-[0.18em] text-[#F8F6F0]/80 uppercase backdrop-blur-md transition-colors duration-300 hover:border-[#C8A45D]/70 hover:text-[#C8A45D] cursor-pointer"
            aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
          >
            {isPlaying ? (
              <>
                <Pause className="h-3 w-3 text-[#C8A45D]" />
                <span>Pause Film</span>
              </>
            ) : (
              <>
                <Play className="h-3 w-3 text-[#C8A45D]" />
                <span>Play Film</span>
              </>
            )}
          </button>
        </div>

        <motion.div
          style={disableParallax ? undefined : { y: contentY }}
          className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end lg:gap-12"
        >
          <div className="max-w-3xl">
            {/* Quiet Unboxed Eyebrow with Animated Hairline */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.08, ease: LUXURY_EASE }}
              className="flex flex-wrap items-center gap-3 text-[11px] font-medium tracking-[0.24em] text-[#C8A45D] uppercase sm:gap-3.5"
            >
              <motion.span
                initial={prefersReducedMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.16, ease: LUXURY_EASE }}
                className="h-px w-8 origin-left bg-[#C8A45D]/80 sm:w-10"
                aria-hidden="true"
              />
              <span>{RESORT_CONFIG.name}</span>
              <span aria-hidden="true" className="text-[#F8F6F0]/35">
                ·
              </span>
              <span className="text-[#F8F6F0]/80">{RESORT_CONFIG.locationTag}</span>
            </motion.div>

            {/* Primary Display Headline with Refined Lighter Editorial Serif */}
            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.05, delay: 0.2, ease: LUXURY_EASE }}
              className="mt-3.5 font-serif text-[clamp(2.15rem,4.1vw,4.1rem)] leading-[1.07] font-normal tracking-[-0.015em] text-[#F8F6F0] [text-wrap:balance] sm:mt-4 lg:mt-4"
            >
              Escape to Green.{' '}
              <span className="italic font-normal text-[#e5cfa0]">Stay in Comfort.</span>{' '}
              Celebrate in Style.
            </motion.h1>

            {/* Supporting Copy Progressive Fade-In */}
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.36, ease: LUXURY_EASE }}
              className="mt-3.5 max-w-2xl text-[14.5px] leading-[1.7] font-light text-[#F8F6F0]/84 sm:mt-4 sm:text-[15.5px] lg:mt-4 lg:text-[16px] lg:leading-[1.75]"
            >
              {RESORT_CONFIG.heroSupportingCopy}
            </motion.p>

            {/* Primary & Secondary Action Row with Staggered Reveal */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.5, ease: LUXURY_EASE }}
              className="mt-5 flex flex-wrap items-center gap-3.5 sm:mt-6 sm:gap-4 lg:mt-7"
            >
              <Link
                href="/contact#booking-enquiry"
                className="group inline-flex items-center justify-center gap-3 bg-[#C8A45D] px-6 py-3.5 text-[11px] font-medium tracking-[0.18em] text-[#0E2017] uppercase whitespace-nowrap shrink-0 transition-all duration-300 hover:bg-[#d6b36c] hover:shadow-[0_10px_28px_rgba(200,164,93,0.28)] sm:px-7 sm:py-3.5"
              >
                <span>Book Your Stay</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" />
              </Link>

              <a
                href="#resort-intro"
                className="inline-flex items-center justify-center gap-2.5 border border-[#F8F6F0]/25 bg-[#0E2017]/35 px-6 py-3.5 text-[11px] font-medium tracking-[0.18em] text-[#F8F6F0] uppercase whitespace-nowrap shrink-0 backdrop-blur-sm transition-all duration-300 hover:border-[#C8A45D]/80 hover:bg-[#0E2017]/60 hover:text-[#C8A45D] sm:px-7 sm:py-3.5"
              >
                <Compass className="h-4 w-4 text-[#C8A45D]" />
                <span>Explore Resort</span>
              </a>
            </motion.div>
          </div>

          {/* Right-Corner Architectural Controls: Scroll Indicator + Ambient Video Pause/Play */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.68, ease: LUXURY_EASE }}
            className="hidden shrink-0 flex-col items-end gap-5 lg:flex"
          >
            <a
              href="#resort-intro"
              aria-label="Scroll down to discover the resort"
              className="group flex flex-col items-center gap-2.5 pr-2 text-[10px] font-normal tracking-[0.26em] text-[#F8F6F0]/65 uppercase transition-colors duration-300 hover:text-[#C8A45D]"
            >
              <span className="[writing-mode:vertical-rl]">Discover</span>
              <span className="relative flex h-12 w-px overflow-hidden bg-[#F8F6F0]/20" aria-hidden="true">
                {!prefersReducedMotion && (
                  <motion.span
                    animate={{ y: ['-100%', '100%'] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="h-1/2 w-full bg-[#C8A45D] motion-reduce:hidden"
                  />
                )}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-[#C8A45D]/80 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>

            {/* Ambient Video Pause/Play Accessibility Control — Positioned cleanly in the bottom-right corner */}
            <button
              type="button"
              onClick={toggleVideoPlayback}
              className="inline-flex items-center gap-2 border border-[#F8F6F0]/15 bg-[#0E2017]/50 px-3.5 py-2 text-[10px] font-normal tracking-[0.18em] text-[#F8F6F0]/80 uppercase backdrop-blur-md transition-all duration-300 hover:border-[#C8A45D]/70 hover:bg-[#0E2017]/75 hover:text-[#C8A45D] cursor-pointer"
              aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3 w-3 text-[#C8A45D]" />
                  <span>Pause Film</span>
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 text-[#C8A45D]" />
                  <span>Play Film</span>
                </>
              )}
            </button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Bottom Architectural Booking Enquiry Ribbon */}
      <div className="relative z-10 border-t border-[#F8F6F0]/12 bg-[#0E2017]/82 backdrop-blur-xl">
        <Container className="py-3.5 sm:py-4 lg:py-4">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.58, ease: LUXURY_EASE }}
          >
            <form
              onSubmit={handleWidgetSubmit}
              aria-label="Quick Stay Enquiry Widget"
              className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-12 lg:items-center lg:gap-0 lg:divide-x lg:divide-[#F8F6F0]/12"
            >
              {/* Check-in */}
              <div className="lg:col-span-2 lg:pr-5">
                <label
                  htmlFor="hero-checkin"
                  className="flex items-center gap-1.5 text-[10px] font-medium tracking-[0.2em] text-[#C8A45D] uppercase"
                >
                  <Calendar className="h-3 w-3" />
                  <span>Check-In</span>
                </label>
                <input
                  id="hero-checkin"
                  type="date"
                  min={clientToday || undefined}
                  value={effectiveCheckIn}
                  onChange={(e) => handleCheckInChange(e.target.value)}
                  className="mt-1.5 w-full border-b border-[#F8F6F0]/15 bg-transparent py-1.5 font-mono text-xs text-[#F8F6F0] transition-colors focus:border-[#C8A45D] focus:outline-none"
                />
              </div>

              {/* Check-out */}
              <div className="lg:col-span-2 lg:px-5">
                <label
                  htmlFor="hero-checkout"
                  className="flex items-center gap-1.5 text-[10px] font-medium tracking-[0.2em] text-[#C8A45D] uppercase"
                >
                  <Calendar className="h-3 w-3" />
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
                  className="mt-1.5 w-full border-b border-[#F8F6F0]/15 bg-transparent py-1.5 font-mono text-xs text-[#F8F6F0] transition-colors focus:border-[#C8A45D] focus:outline-none"
                />
              </div>

              {/* Adults */}
              <div className="lg:col-span-2 lg:px-5">
                <label
                  htmlFor="hero-adults"
                  className="flex items-center gap-1.5 text-[10px] font-medium tracking-[0.2em] text-[#C8A45D] uppercase"
                >
                  <Users className="h-3 w-3" />
                  <span>Adults</span>
                </label>
                <select
                  id="hero-adults"
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="mt-1.5 w-full border-b border-[#F8F6F0]/15 bg-transparent py-1.5 text-xs text-[#F8F6F0] transition-colors focus:border-[#C8A45D] focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                    <option key={n} value={n} className="bg-[#0E2017] text-[#F8F6F0]">
                      {n} {n === 1 ? 'Adult' : 'Adults'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Children */}
              <div className="lg:col-span-1 lg:px-4">
                <label
                  htmlFor="hero-children"
                  className="flex items-center gap-1.5 text-[10px] font-medium tracking-[0.2em] text-[#C8A45D] uppercase"
                >
                  <span>Children</span>
                </label>
                <select
                  id="hero-children"
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="mt-1.5 w-full border-b border-[#F8F6F0]/15 bg-transparent py-1.5 text-xs text-[#F8F6F0] transition-colors focus:border-[#C8A45D] focus:outline-none"
                >
                  {[0, 1, 2, 3, 4].map((n) => (
                    <option key={n} value={n} className="bg-[#0E2017] text-[#F8F6F0]">
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              {/* Room Preference */}
              <div className="lg:col-span-3 lg:px-5">
                <label
                  htmlFor="hero-room"
                  className="flex items-center gap-1.5 text-[10px] font-medium tracking-[0.2em] text-[#C8A45D] uppercase"
                >
                  <BedDouble className="h-3 w-3" />
                  <span>Accommodation</span>
                </label>
                <select
                  id="hero-room"
                  value={roomPreference}
                  onChange={(e) => setRoomPreference(e.target.value)}
                  className="mt-1.5 w-full border-b border-[#F8F6F0]/15 bg-transparent py-1.5 text-xs text-[#F8F6F0] transition-colors focus:border-[#C8A45D] focus:outline-none"
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
              <div className="sm:col-span-2 lg:col-span-2 lg:pl-5">
                <button
                  type="submit"
                  className="w-full border border-[#C8A45D] bg-[#C8A45D] px-4 py-3 text-[11px] font-medium tracking-[0.16em] text-[#0E2017] uppercase whitespace-nowrap shrink-0 transition-all duration-300 hover:bg-[#d6b36c] cursor-pointer"
                >
                  Check Availability
                </button>
              </div>
            </form>

            {dateError && (
              <p className="mt-2.5 text-xs text-[#C8A45D]" role="alert">
                {dateError}
              </p>
            )}

            {/* Quiet Unboxed Portfolio Metadata Strip */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#F8F6F0]/8 pt-3.5 text-[11px] text-[#F8F6F0]/65">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-[#C8A45D] tabular-nums">
                  19 Curated Units
                </span>
                <span aria-hidden="true" className="text-[#F8F6F0]/30">·</span>
                <span>2 Suites</span>
                <span aria-hidden="true" className="text-[#F8F6F0]/30">·</span>
                <span>3 Cottages</span>
                <span aria-hidden="true" className="text-[#F8F6F0]/30">·</span>
                <span>6 Pool-View</span>
                <span aria-hidden="true" className="text-[#F8F6F0]/30">·</span>
                <span>8 Garden-View</span>
              </div>
              <p className="text-[11px] font-light text-[#F8F6F0]/55">
                Direct Resort Concierge · Availability & tariffs confirmed personally by our front desk
              </p>
            </div>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
