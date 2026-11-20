'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Expand } from 'lucide-react';
import { GALLERY_ITEMS } from '@/data/amenities';
import { GalleryCategory } from '@/types/resort';
import { Lightbox } from '@/components/gallery/Lightbox';
import { LUXURY_EASE } from '@/components/ui/MotionPrimitives';
import { useHydratedReducedMotion } from '@/hooks/use-client-env';

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
  const prefersReducedMotion = useHydratedReducedMotion();

  const filteredItems = useMemo(() => {
    const list =
      selectedCategory === 'All'
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);
    return limit ? list.slice(0, limit) : list;
  }, [selectedCategory, limit]);

  return (
    <div>
      {/* Minimalist Editorial Filter Bar with Shared-Layout Hairline Underline */}
      <div
        className="mb-12 flex flex-wrap items-center gap-x-7 gap-y-3 border-b border-[#0E2017]/10 pb-4"
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
              className={`relative py-2 text-[11px] font-medium tracking-[0.18em] uppercase whitespace-nowrap shrink-0 transition-colors duration-300 cursor-pointer ${
                active
                  ? 'text-[#0E2017]'
                  : 'text-[#4A554E]/75 hover:text-[#0E2017]'
              }`}
            >
              <span>{category}</span>
              {active && (
                <motion.span
                  layoutId="gallery-active-category"
                  transition={{ duration: 0.35, ease: LUXURY_EASE }}
                  className="absolute inset-x-0 -bottom-[17px] h-[1.5px] bg-[#0E2017]"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Curated Editorial Mosaic Grid with Smooth Reveal & Slow Hover Zoom */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12">
        {filteredItems.map((item, idx) => {
          const mod = idx % 6;
          const colSpanClass =
            mod === 0
              ? 'lg:col-span-7 aspect-[16/10]'
              : mod === 1
                ? 'lg:col-span-5 aspect-[4/3] lg:aspect-auto lg:h-full'
                : mod === 5
                  ? 'lg:col-span-8 aspect-[16/10]'
                  : 'lg:col-span-4 aspect-[4/3]';

          return (
            <motion.button
              key={`${selectedCategory}-${item.id}`}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.985 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.85,
                      delay: (idx % 3) * 0.07,
                      ease: LUXURY_EASE,
                    }
              }
              className={`group relative block min-h-[260px] w-full overflow-hidden bg-[#183827] text-left focus-visible:ring-2 focus-visible:ring-[#C8A45D] focus-visible:outline-none cursor-pointer transform-gpu ${colSpanClass}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E2017]/80 via-[#0E2017]/15 to-transparent opacity-75 transition-opacity duration-500 group-hover:opacity-90" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-[#F8F6F0]">
                <div className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5">
                  <p className="text-[10px] font-normal tracking-[0.22em] text-[#e5cfa0] uppercase">
                    {item.category}
                  </p>
                  <h3 className="mt-1 font-serif text-xl font-normal text-[#F8F6F0]">
                    {item.title}
                  </h3>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#F8F6F0]/25 bg-[#0E2017]/50 text-[#F8F6F0] backdrop-blur-xs transition-all duration-300 group-hover:border-[#C8A45D] group-hover:bg-[#0E2017]/80 group-hover:text-[#C8A45D]">
                  <Expand className="h-3.5 w-3.5" />
                </span>
              </div>
            </motion.button>
          );
        })}
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
