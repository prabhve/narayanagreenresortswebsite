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

export default function HomePage() {
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
      <BookingCTA />
    </>
  );
}
