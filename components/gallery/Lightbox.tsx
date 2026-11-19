'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '@/types/resort';
import { LUXURY_EASE } from '@/components/ui/MotionPrimitives';
import { useHydratedReducedMotion } from '@/hooks/use-client-env';

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onSelectIndex: (newIndex: number) => void;
}

export function Lightbox({
  items,
  currentIndex,
  onClose,
  onSelectIndex,
}: LightboxProps) {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const prefersReducedMotion = useHydratedReducedMotion();

  const goPrev = useCallback(() => {
    if (currentIndex === null || items.length === 0) return;
    setDirection(-1);
    onSelectIndex((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onSelectIndex]);

  const goNext = useCallback(() => {
    if (currentIndex === null || items.length === 0) return;
    setDirection(1);
    onSelectIndex((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onSelectIndex]);

  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        goPrev();
      } else if (e.key === 'ArrowRight') {
        goNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, onClose, goPrev, goNext]);

  const currentItem =
    currentIndex !== null && items[currentIndex] ? items[currentIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    goPrev();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    goNext();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 45) {
      if (deltaX > 0) {
        goPrev();
      } else {
        goNext();
      }
    }
    setTouchStartX(null);
  };

  return (
    <AnimatePresence>
      {currentItem && currentIndex !== null && (
        <motion.div
          key="gallery-lightbox-backdrop"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.25, ease: LUXURY_EASE }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E2017]/95 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={currentItem.title}
          onClick={onClose}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar Controls */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 py-5 text-[#F8F6F0]">
            <div className="flex items-center gap-3 text-xs tracking-wider uppercase">
              <span className="font-mono text-[#C8A45D] tabular-nums">
                {String(currentIndex + 1).padStart(2, '0')} /{' '}
                {String(items.length).padStart(2, '0')}
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-[#F8F6F0]/80">{currentItem.category}</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center border border-[#F8F6F0]/20 text-[#F8F6F0] transition-colors hover:border-[#C8A45D] hover:text-[#C8A45D] cursor-pointer"
              aria-label="Close image lightbox"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Previous Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center border border-[#F8F6F0]/20 bg-[#0E2017]/80 text-[#F8F6F0] transition-colors hover:border-[#C8A45D] hover:text-[#C8A45D] sm:left-6 cursor-pointer"
            aria-label="Previous photograph"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Main Image Container with Smooth Directional Transition */}
          <div
            className="relative max-h-[82vh] max-w-5xl overflow-hidden px-2"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentItem.id}
                custom={direction}
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0, x: direction * 26, scale: 0.98 }
                }
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: 0, x: direction * -26, scale: 0.98 }
                }
                transition={{ duration: 0.28, ease: LUXURY_EASE }}
                className="transform-gpu"
              >
                <img
                  src={currentItem.src}
                  alt={currentItem.alt}
                  referrerPolicy="no-referrer"
                  className="mx-auto max-h-[75vh] w-auto max-w-full border border-[#F8F6F0]/15 object-contain"
                />
                <div className="mt-4 text-center">
                  <p className="font-serif text-lg text-[#F8F6F0]">{currentItem.title}</p>
                  <p className="mt-0.5 text-xs text-[#F8F6F0]/65">{currentItem.alt}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center border border-[#F8F6F0]/20 bg-[#0E2017]/80 text-[#F8F6F0] transition-colors hover:border-[#C8A45D] hover:text-[#C8A45D] sm:right-6 cursor-pointer"
            aria-label="Next photograph"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
