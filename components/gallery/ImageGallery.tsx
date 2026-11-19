'use client';

import React, { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Expand } from 'lucide-react';
import { GALLERY_ITEMS } from '@/data/amenities';
import { GalleryCategory } from '@/types/resort';
import { Lightbox } from '@/components/gallery/Lightbox';
import { LUXURY_EASE } from '@/components/ui/MotionPrimitives';

const CATEGORIES: GalleryCategory[] = [
  'All',
  'Property',
  'Rooms',
  'Pool',
  'Dining',
  'Gardens',
  'Events',
  'Wedding Spaces',
];

interface ImageGalleryProps {
  initialCategory?: GalleryCategory;
  limit?: number;
}

export function ImageGallery({ initialCategory = 'All', limit }: ImageGalleryProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<GalleryCategory>(initialCategory);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const filteredItems = useMemo(() => {
    const list =
      selectedCategory === 'All'
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);
    return limit ? list.slice(0, limit) : list;
  }, [selectedCategory, limit]);

  return (
    <div>
      {/* Interactive Filter Control Bar with Shared-Layout Active Indicator */}
      <div
        className="mb-10 flex flex-wrap items-center gap-2 border-b border-[#0E2017]/12 pb-4"
        role="tablist"
        aria-label="Filter resort gallery by category"
      >
        {CATEGORIES.map((category) => {
          const active = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                setSelectedCategory(category);
                setLightboxIndex(null);
              }}
              className={`relative px-4 py-2 text-xs font-semibold tracking-[0.14em] uppercase whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                active
                  ? 'text-[#F8F6F0]'
                  : 'bg-[#EFECE3] text-[#4A554E] hover:bg-[#0E2017]/10 hover:text-[#0E2017]'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="gallery-active-category"
                  transition={{ duration: 0.28, ease: LUXURY_EASE }}
                  className="absolute inset-0 bg-[#0E2017]"
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          );
        })}
      </div>

      {/* Responsive Editorial Grid with Staggered Entrance & Smooth Hover Zoom */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item, idx) => (
          <motion.button
            key={`${selectedCategory}-${item.id}`}
            type="button"
            onClick={() => setLightboxIndex(idx)}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{
              duration: 0.6,
              delay: (idx % 3) * 0.06,
              ease: LUXURY_EASE,
            }}
            className="group relative block aspect-[4/3] w-full overflow-hidden border border-[#0E2017]/12 bg-[#183827] text-left focus-visible:ring-2 focus-visible:ring-[#C8A45D] focus-visible:outline-none cursor-pointer transform-gpu"
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E2017]/85 via-[#0E2017]/20 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-[#F8F6F0]">
              <div>
                <p className="text-[11px] font-medium tracking-[0.18em] text-[#C8A45D] uppercase">
                  {item.category}
                </p>
                <h3 className="mt-1 font-serif text-lg font-medium text-[#F8F6F0]">
                  {item.title}
                </h3>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#F8F6F0]/30 bg-[#0E2017]/60 text-[#F8F6F0] transition-all duration-300 group-hover:scale-105 group-hover:border-[#C8A45D] group-hover:text-[#C8A45D]">
                <Expand className="h-4 w-4" />
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <Lightbox
        items={filteredItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
}
