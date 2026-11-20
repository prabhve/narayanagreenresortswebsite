import React from 'react';
import { Hero } from '@/components/home/Hero';
import { Intro } from '@/components/home/Intro';
import { Accommodation } from '@/components/home/Accommodation';
import { Dining } from '@/components/home/Dining';
import { Experiences } from '@/components/home/Experiences';
import { Events } from '@/components/home/Events';
import { GalleryPreview } from '@/components/home/GalleryPreview';
import { Destinations } from '@/components/home/Destinations';
import { BookingCTA } from '@/components/home/BookingCTA';
import { ResortFAQSection } from '@/components/seo/ResortFAQSection';
import { getFaqsByCategories } from '@/data/seo-faqs';

export default function HomePage() {
  const homeFaqs = getFaqsByCategories(
    ['general', 'stay', 'dining', 'events', 'experiences', 'location'],
    8
  );

  return (
    <>
      <Hero />
      <Intro />
      <Accommodation />
      <Dining />
      <Experiences />
      <Events />
      <GalleryPreview />
      <Destinations />
      <ResortFAQSection
        faqs={homeFaqs}
        eyebrow="Bodh Gaya Luxury Resort Q&A"
        title="Essential Questions About Staying & Celebrating at Narayana Green Resorts"
        subtitle="Everything you need to know about our 19 luxury accommodations, Auric 24×7 Restaurant, destination wedding lawns (2,500+ guests), corporate events (3,000+ guests), and nearby Bodh Gaya landmarks."
      />
      <BookingCTA />
    </>
  );
}
