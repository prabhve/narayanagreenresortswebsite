'use client';

import React, { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

export const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

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
  bottom: 'inset(10% 0% 0% 0%)',
  left: 'inset(0% 10% 0% 0%)',
  right: 'inset(0% 0% 0% 10%)',
  center: 'inset(6% 6% 6% 6%)',
};

export function ClipReveal({
  children,
  className,
  direction = 'bottom',
  delay = 0,
  duration = 0.85,
  scaleFrom = 1.07,
}: ClipRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={
        isMobile
          ? { opacity: 0, y: 12 }
          : {
              opacity: 0,
              clipPath: CLIP_INITIAL_MAP[direction],
              scale: scaleFrom,
            }
      }
      whileInView={
        isMobile
          ? { opacity: 1, y: 0 }
          : {
              opacity: 1,
              clipPath: 'inset(0% 0% 0% 0%)',
              scale: 1,
            }
      }
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: isMobile ? 0.55 : duration,
        delay: delay / 1000,
        ease: LUXURY_EASE,
      }}
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
  offset = 22,
  scaleRange = [1.08, 1.08],
}: ParallaxMediaProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);

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
      {disableParallax ? (
        <div className="h-full w-full">{children}</div>
      ) : (
        <motion.div
          style={{ y, scale }}
          className="h-full w-full transform-gpu will-change-transform"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const nextVisible = latest > 480;
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
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.25, ease: LUXURY_EASE }}
          aria-label="Back to top"
          className="fixed right-4 bottom-16 z-30 flex h-11 w-11 items-center justify-center border border-[#C8A45D]/55 bg-[#0E2017]/92 text-[#C8A45D] shadow-lg backdrop-blur-md transition-colors duration-200 hover:border-[#C8A45D] hover:bg-[#C8A45D] hover:text-[#0E2017] focus-visible:ring-2 focus-visible:ring-[#C8A45D] focus-visible:outline-none lg:right-8 lg:bottom-8 cursor-pointer"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
