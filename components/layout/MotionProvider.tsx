'use client';

import React from 'react';
import { MotionConfig } from 'motion/react';

interface MotionProviderProps {
  children: React.ReactNode;
}

/**
 * Global Motion accessibility provider.
 * Setting `reducedMotion="user"` instructs Motion across the entire component tree
 * (including Header, PageTransition, Hero, Reveal, ClipReveal, ParallaxMedia,
 * ImageGallery, Lightbox, and BackToTopButton) to respect the user's operating
 * system Reduce Motion setting without triggering development console warnings.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
