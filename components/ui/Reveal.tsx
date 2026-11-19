'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

type DelayMs = 0 | 75 | 150 | 225 | 300 | 375;
type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: DelayMs;
  threshold?: number;
  rootMargin?: string;
  direction?: RevealDirection;
  distance?: number;
  duration?: number;
}

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  threshold = 0.08,
  direction = 'up',
  distance = 18,
  duration = 0.7,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = {
    x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
    y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: Math.min(Math.max(threshold, 0.05), 0.35) }}
      transition={{
        duration,
        delay: delay / 1000,
        ease: LUXURY_EASE,
      }}
      className={cn('transform-gpu will-change-[opacity,transform]', className)}
    >
      {children}
    </motion.div>
  );
}
