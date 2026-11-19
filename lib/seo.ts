import type { Metadata } from 'next';
import { RESORT_CONFIG } from '@/data/resort';
import { ROOM_CATEGORIES } from '@/data/rooms';

export function getBaseUrl(): string {
  if (process.env.APP_URL && process.env.APP_URL !== 'MY_APP_URL') {
    return process.env.APP_URL.replace(/\/$/, '');
  }
  return 'https://narayanaresorts.com';
}

export function constructPageMetadata({
  title,
  description,
  path = '/',
  image = '/media/hero/hero-resort-exterior-1.png',
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}${path === '/' ? '' : path}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: RESORT_CONFIG.name,
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${RESORT_CONFIG.name} — Bodh Gaya, Bihar`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export function getLodgingStructuredData() {
  const baseUrl = getBaseUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'Resort',
    name: RESORT_CONFIG.name,
    description: RESORT_CONFIG.supportingPositioning,
    slogan: RESORT_CONFIG.positioning,
    url: baseUrl,
    telephone: RESORT_CONFIG.contact.phoneDisplay,
    email: RESORT_CONFIG.contact.reservationEmail,
    image: [
      `${baseUrl}/media/hero/hero-resort-exterior-1.png`,
      `${baseUrl}/media/hero/hero-resort-pool-2.png`,
      `${baseUrl}/media/weddings/grand-wedding-lawn.jpeg`,
      `${baseUrl}/media/dining/auric-restaurant-interior.jpeg`,
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Karmauni, Anuradhi, Near Bodh Gaya',
      addressLocality: 'Bodh Gaya',
      addressRegion: 'Bihar',
      postalCode: '823001',
      addressCountry: 'IN',
    },
    numberOfRooms: RESORT_CONFIG.totalUnits,
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Outdoor Swimming Pool', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Kids Pool', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Kids Play Area', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Auric 24×7 Multi-Cuisine Restaurant', value: true },
      { '@type': 'LocationFeatureSpecification', name: '24-Hour Room Service', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Maharaj Magadh Thali', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Meditation Space', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Fishing Experience', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Grand Wedding & Event Lawns (up to 3,000+ capacity)', value: true },
    ],
    containsPlace: [
      {
        '@type': 'Restaurant',
        name: RESORT_CONFIG.dining.name,
        description: RESORT_CONFIG.dining.description,
        servesCuisine: ['Multi-Cuisine', 'Indian', 'Regional Magadh Cuisine'],
      },
      ...ROOM_CATEGORIES.map((room) => ({
        '@type': 'HotelRoom',
        name: room.name,
        description: room.shortDescription,
      })),
    ],
    sameAs: [
      RESORT_CONFIG.links.social.instagram,
      RESORT_CONFIG.links.social.facebook,
    ],
  };
}
