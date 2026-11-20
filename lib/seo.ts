import { Metadata } from 'next';
import { RESORT_CONFIG } from '@/data/resort';
import { ROOM_CATEGORIES } from '@/data/rooms';
import { RoomCategory } from '@/types/resort';
import { ResortFAQItem } from '@/data/seo-faqs';

/**
 * Official production domain for Narayana Green Resorts.
 * All canonicals, sitemaps, Open Graph URLs, and JSON-LD entity @id URIs
 * MUST use this production origin so preview or staging deployments never leak into indexable signals.
 */
export const PRODUCTION_SITE_URL = 'https://narayanaresorts.com';

export function getBaseUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '');
  if (configuredUrl === PRODUCTION_SITE_URL) {
    return configuredUrl;
  }
  return PRODUCTION_SITE_URL;
}

export function isPreviewDeployment(): boolean {
  const vercelEnv = process.env.VERCEL_ENV || process.env.NEXT_PUBLIC_VERCEL_ENV;
  if (vercelEnv && vercelEnv !== 'production') {
    return true;
  }
  return false;
}

export function constructPageMetadata({
  title,
  description,
  path = '/',
  image = RESORT_CONFIG.heroMedia.posterSrc,
  keywords = [],
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
}): Metadata {
  const baseUrl = getBaseUrl();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const canonicalUrl = normalizedPath === '/' ? baseUrl : `${baseUrl}${normalizedPath}`;
  const absoluteImage = image.startsWith('http') ? image : `${baseUrl}${image}`;
  const isPreview = isPreviewDeployment();

  const rawGoogleVerification = (
    process.env.GOOGLE_SITE_VERIFICATION ||
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
    ''
  ).trim();
  const rawBingVerification = (
    process.env.BING_SITE_VERIFICATION ||
    process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ||
    ''
  ).trim();

  const isPlaceholderValue = (val: string) =>
    !val ||
    /^(your_|placeholder|example|test|dummy|xxx|todo|none|null|undefined)/i.test(val);

  const googleVerification = isPlaceholderValue(rawGoogleVerification)
    ? ''
    : rawGoogleVerification;
  const bingVerification = isPlaceholderValue(rawBingVerification)
    ? ''
    : rawBingVerification;

  const defaultKeywords = [
    'Narayana Green Resorts',
    'luxury resort in Bodh Gaya',
    'best resort near Bodh Gaya Bihar',
    'destination wedding resort in Bodh Gaya',
    'wedding lawn in Bodh Gaya',
    'Auric 24x7 Restaurant Bodh Gaya',
    'Maharaj Magadh Thali',
    'family resort in Bodh Gaya with swimming pool',
    'corporate event venue near Gaya Bihar',
    'Karmauni Anuradhi Bodh Gaya resort',
  ];

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords: Array.from(new Set([...defaultKeywords, ...keywords])),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: isPreview
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    ...(googleVerification || bingVerification
      ? {
          verification: {
            ...(googleVerification ? { google: googleVerification } : {}),
            ...(bingVerification
              ? {
                  other: {
                    'msvalidate.01': bingVerification,
                  },
                }
              : {}),
          },
        }
      : {}),
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: RESORT_CONFIG.name,
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: `${title} | ${RESORT_CONFIG.name}, Bodh Gaya, Bihar`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteImage],
    },
  };
}

/**
 * Global Entity Graph JSON-LD connecting WebSite, Resort/LodgingBusiness,
 * Auric 24×7 Restaurant, and EventVenue with consistent @id URIs.
 */
export function getLodgingStructuredData() {
  const baseUrl = getBaseUrl();

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: RESORT_CONFIG.name,
        alternateName: 'Narayana Green by Clickon Resort',
        description: RESORT_CONFIG.supportingPositioning,
        inLanguage: 'en-IN',
        publisher: {
          '@id': `${baseUrl}/#resort`,
        },
      },
      {
        '@type': ['Resort', 'LodgingBusiness'],
        '@id': `${baseUrl}/#resort`,
        name: RESORT_CONFIG.name,
        alternateName: 'Narayana Green Resort Bodh Gaya',
        description: RESORT_CONFIG.supportingPositioning,
        slogan: RESORT_CONFIG.positioning,
        url: baseUrl,
        telephone: RESORT_CONFIG.contact.phoneDisplay,
        email: RESORT_CONFIG.contact.reservationEmail,
        image: [
          `${baseUrl}${RESORT_CONFIG.heroMedia.posterSrc}`,
          `${baseUrl}/media/amenities/swimming-pool.jpeg`,
          `${baseUrl}/media/dining/auric-restaurant-interior.jpeg`,
          `${baseUrl}/media/weddings/grand-wedding-lawn.jpeg`,
          `${baseUrl}/media/rooms/suites/suites-room-primary.png`,
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: `${RESORT_CONFIG.address.street}, ${RESORT_CONFIG.address.locality}`,
          addressLocality: 'Bodh Gaya',
          addressRegion: RESORT_CONFIG.address.region,
          addressCountry: 'IN',
        },
        hasMap: RESORT_CONFIG.links.googleMapsShare,
        sameAs: [
          RESORT_CONFIG.links.social.instagram,
          RESORT_CONFIG.links.social.facebook,
          RESORT_CONFIG.links.googleMapsShare,
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: RESORT_CONFIG.contact.phoneDisplay,
            email: RESORT_CONFIG.contact.reservationEmail,
            contactType: 'reservations and customer support',
            areaServed: 'IN',
            availableLanguage: ['English', 'Hindi'],
          },
        ],
        numberOfRooms: RESORT_CONFIG.totalUnits,
        amenityFeature: [
          { '@type': 'LocationFeatureSpecification', name: 'Swimming Pool', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Kids Pool', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Auric 24×7 Multi-Cuisine Restaurant', value: true },
          { '@type': 'LocationFeatureSpecification', name: '24-Hour Room Service', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Meditation Space', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Fishing Experience', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Kids Play Area', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Grand Destination Wedding Lawns (2,500+ Guests)', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Corporate Event & Conference Lawns (3,000+ Guests)', value: true },
        ],
        containsPlace: [
          { '@id': `${baseUrl}/dining#restaurant` },
          { '@id': `${baseUrl}/weddings-events#event-venue` },
          ...ROOM_CATEGORIES.map((room) => ({
            '@type': room.slug === 'suites' ? 'Suite' : 'HotelRoom',
            '@id': `${baseUrl}/stay/${room.slug}#room`,
            name: room.name,
            description: room.shortDescription,
            url: `${baseUrl}/stay/${room.slug}`,
            image: `${baseUrl}${room.primaryImage}`,
          })),
        ],
      },
      {
        '@type': 'Restaurant',
        '@id': `${baseUrl}/dining#restaurant`,
        name: RESORT_CONFIG.dining.name,
        description: RESORT_CONFIG.dining.description,
        url: `${baseUrl}/dining`,
        telephone: RESORT_CONFIG.contact.phoneDisplay,
        email: RESORT_CONFIG.contact.reservationEmail,
        image: RESORT_CONFIG.dining.images.map((img) => `${baseUrl}${img.src}`),
        servesCuisine: [
          'Bihari Regional Cuisine',
          'Magadh Heritage Cuisine',
          'Multi-Cuisine',
          'Vegetarian & Non-Vegetarian',
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: `${RESORT_CONFIG.address.street}, ${RESORT_CONFIG.address.locality}`,
          addressLocality: 'Bodh Gaya',
          addressRegion: RESORT_CONFIG.address.region,
          addressCountry: 'IN',
        },
        containedInPlace: {
          '@id': `${baseUrl}/#resort`,
        },
        hasMenuSection: {
          '@type': 'MenuSection',
          name: 'Signature Regional Offerings',
          hasMenuItem: {
            '@type': 'MenuItem',
            name: RESORT_CONFIG.dining.signatureHighlight.name,
            description: RESORT_CONFIG.dining.signatureHighlight.description,
            image: `${baseUrl}${RESORT_CONFIG.dining.signatureHighlight.image}`,
          },
        },
      },
      {
        '@type': 'EventVenue',
        '@id': `${baseUrl}/weddings-events#event-venue`,
        name: 'Narayana Green Resorts Grand Wedding & Corporate Event Lawns',
        description: RESORT_CONFIG.weddingsAndEvents.description,
        url: `${baseUrl}/weddings-events`,
        telephone: RESORT_CONFIG.contact.phoneDisplay,
        maximumAttendeeCapacity: 3000,
        image: RESORT_CONFIG.weddingsAndEvents.categories.map(
          (cat) => `${baseUrl}${cat.image}`
        ),
        address: {
          '@type': 'PostalAddress',
          streetAddress: `${RESORT_CONFIG.address.street}, ${RESORT_CONFIG.address.locality}`,
          addressLocality: 'Bodh Gaya',
          addressRegion: RESORT_CONFIG.address.region,
          addressCountry: 'IN',
        },
        containedInPlace: {
          '@id': `${baseUrl}/#resort`,
        },
      },
    ],
  };
}

export const getResortJsonLd = getLodgingStructuredData;

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function getBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  const baseUrl = getBaseUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const normalizedPath = item.path.startsWith('/') ? item.path : `/${item.path}`;
      const itemUrl = normalizedPath === '/' ? baseUrl : `${baseUrl}${normalizedPath}`;
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: itemUrl,
      };
    }),
  };
}

export function getRoomJsonLd(room: RoomCategory) {
  const baseUrl = getBaseUrl();
  const roomUrl = `${baseUrl}/stay/${room.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': room.slug === 'suites' ? 'Suite' : 'HotelRoom',
    '@id': `${roomUrl}#room`,
    name: `${room.name} (${room.unitCount} Units) at ${RESORT_CONFIG.name}`,
    description: room.editorialDescription,
    url: roomUrl,
    image: room.images.map((img) => `${baseUrl}${img.src}`),
    amenityFeature: room.highlights.map((highlight) => ({
      '@type': 'LocationFeatureSpecification',
      name: highlight,
      value: true,
    })),
    containedInPlace: {
      '@type': 'Resort',
      '@id': `${baseUrl}/#resort`,
      name: RESORT_CONFIG.name,
      url: baseUrl,
    },
  };
}

export function getFaqJsonLd(faqs: ResortFAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getWebPageJsonLd({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  const baseUrl = getBaseUrl();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const pageUrl = normalizedPath === '/' ? baseUrl : `${baseUrl}${normalizedPath}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    inLanguage: 'en-IN',
    isPartOf: {
      '@id': `${baseUrl}/#website`,
    },
    about: {
      '@id': `${baseUrl}/#resort`,
    },
  };
}
