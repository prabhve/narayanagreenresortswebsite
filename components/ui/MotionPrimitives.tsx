'use client';

import React, { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHydratedReducedMotion } from '@/hooks/use-client-env';
import { cn } from '@/lib/utils';

export const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

type ClipDirection = 'bottom' | 'left' | 'right' | 'center';
type DelayMs = 0 | 75 | 150 | 225 | 300 | 375;

interface ClipRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: ClipDirection;
  delay?: DelayMs;
  duration?: number;
  scaleFrom?: number;
}

const CLIP_INITIAL_MAP: Record<ClipDirection, string> = {
  bottom: 'inset(12% 0% 0% 0%)',
  left: 'inset(0% 12% 0% 0%)',
  right: 'inset(0% 0% 0% 12%)',
  center: 'inset(5% 5% 5% 5%)',
};

export function ClipReveal({
  children,
  className,
  direction = 'bottom',
  delay = 0,
  duration = 1.1,
  scaleFrom = 1.06,
}: ClipRevealProps) {
  const prefersReducedMotion = useHydratedReducedMotion();
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? { opacity: 1 }
          : isMobile
            ? { opacity: 0, y: 14 }
            : {
                opacity: 0,
                clipPath: CLIP_INITIAL_MAP[direction],
                scale: scaleFrom,
              }
      }
      whileInView={
        prefersReducedMotion
          ? { opacity: 1 }
          : isMobile
            ? { opacity: 1, y: 0 }
            : {
                opacity: 1,
                clipPath: 'inset(0% 0% 0% 0%)',
                scale: 1,
              }
      }
      viewport={{ once: true, amount: 0.08, margin: '0px 0px -30px 0px' }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              duration: isMobile ? 0.65 : duration,
              delay: delay / 1000,
              ease: LUXURY_EASE,
            }
      }
      className={cn('transform-gpu will-change-[opacity,transform]', className)}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxMediaProps {
  children: React.ReactNode;
  className?: string;
  offset?: number;
  scaleRange?: [number, number];
}

export function ParallaxMedia({
  children,
  className,
  offset = 28,
  scaleRange = [1.09, 1.02],
}: ParallaxMediaProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useHydratedReducedMotion();
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 24,
    mass: 0.35,
  });

  const y = useTransform(smoothProgress, [0, 1], [-offset, offset]);
  const scale = useTransform(smoothProgress, [0, 1], scaleRange);

  const disableParallax = Boolean(prefersReducedMotion || isMobile);

  return (
    <div
      ref={containerRef}
      className={cn(
        'overflow-hidden',
        className?.includes('absolute') || className?.includes('fixed') ? '' : 'relative',
        className
      )}
    >
      <motion.div
        style={disableParallax ? undefined : { y, scale }}
        className="h-full w-full transform-gpu will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  const prefersReducedMotion = useHydratedReducedMotion();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const nextVisible = latest > 520;
    if (nextVisible !== visible) {
      setVisible(nextVisible);
    }
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.35, ease: LUXURY_EASE }}
          aria-label="Back to top"
          className="fixed right-4 bottom-16 z-30 flex h-11 w-11 items-center justify-center border border-[#C8A45D]/40 bg-[#0E2017]/90 text-[#C8A45D] shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C8A45D] hover:bg-[#C8A45D] hover:text-[#0E2017] focus-visible:ring-2 focus-visible:ring-[#C8A45D] focus-visible:outline-none lg:right-8 lg:bottom-8 cursor-pointer"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
