import { RoomCategory } from '@/types/resort';

export const ROOM_CATEGORIES: RoomCategory[] = [
  {
    slug: 'suites',
    name: 'Suites Room',
    shortName: 'Suites',
    unitCount: 2,
    unitLabel: '2 Exclusive Units',
    tagline: 'Premier Sanctuary of Space & Privacy',
    shortDescription:
      'Expansive premier suites with curated decor, lounge arrangements, and privacy.',
    editorialDescription:
      'Our two Suites Rooms represent the pinnacle of hospitality at Narayana Green Resorts. Designed for guests who value generous living proportions and tranquil seclusion, each suite pairs curated interior decor with dedicated lounge seating and a restful bedroom retreat.',
    idealFor: 'Couples, VIP guests, wedding principals & extended luxury stays',
    settingNote: 'Private interior lounge layout with refined lighting and 24-hour room service from Auric 24×7 Restaurant.',
    highlights: [
      'Expansive premier suite layout (2 units at the resort)',
      'Curated interior decor with dedicated lounge seating arrangement',
      'Enhanced privacy for distinguished guests and wedding principals',
      '24-hour in-room dining service from Auric 24×7 Restaurant',
    ],
    primaryImage: '/media/rooms/suites/suites-room-primary.png',
    images: [
      {
        src: '/media/rooms/suites/suites-room-primary.png',
        alt: 'Suites Room at Narayana Green Resorts featuring curated decor and lounge seating',
        caption: 'Suites Room — Curated Bedroom & Lounge Sanctuary',
      },
      {
        src: '/media/rooms/suites/suites-room-lounge.jpeg',
        alt: 'Suites Room interior lounge and bedroom view at Narayana Green Resorts',
        caption: 'Suites Room — Private Lounge Arrangement',
      },
      {
        src: '/media/rooms/suites/suites-room-interior.jpeg',
        alt: 'Suites Room warm lighting and refined furnishings at Narayana Green Resorts',
        caption: 'Suites Room — Restful Interior Styling',
      },
    ],
  },
  {
    slug: 'cottages',
    name: 'Cottage Room',
    shortName: 'Cottages',
    unitCount: 3,
    unitLabel: '3 Independent Units',
    tagline: 'Independent Living for Families & Groups',
    shortDescription:
      'Independent accommodation designed for families and group stays.',
    editorialDescription:
      'With only three units across the property, our Cottage Rooms offer an independent villa-style retreat surrounded by manicured resort greenery. Thoughtfully arranged for families and close-knit groups, they provide direct access to the outdoors while maintaining complete comfort.',
    idealFor: 'Families, group retreats & multi-generational holiday stays',
    settingNote: 'Independent cottage architecture set amidst landscaped resort grounds.',
    highlights: [
      'Independent cottage accommodation (3 units at the resort)',
      'Purpose-designed for families and group stays',
      'Direct connection to the resort gardens and walkways',
      '24-hour room service and access to swimming pool & kids play area',
    ],
    primaryImage: '/media/rooms/cottages/cottage-room-primary.png',
    images: [
      {
        src: '/media/rooms/cottages/cottage-room-primary.png',
        alt: 'Independent Cottage Room units at Narayana Green Resorts',
        caption: 'Cottage Room — Independent Villa Architecture',
      },
      {
        src: '/media/rooms/cottages/cottage-room-exterior.jpeg',
        alt: 'Cottage Room exterior surrounded by greenery at Narayana Green Resorts',
        caption: 'Cottage Room — Landscaped Exterior Setting',
      },
      {
        src: '/media/rooms/cottages/cottage-room-bedroom.jpeg',
        alt: 'Cottage Room interior bedroom at Narayana Green Resorts',
        caption: 'Cottage Room — Comfortable Family Interior',
      },
    ],
  },
  {
    slug: 'pool-view',
    name: 'Pool-View Rooms',
    shortName: 'Pool-View',
    unitCount: 6,
    unitLabel: '6 Poolside Units',
    tagline: 'Serene Sightlines Overlooking the Water',
    shortDescription:
      'Rooms with views overlooking the swimming pool.',
    editorialDescription:
      'Our six Pool-View Rooms look out directly onto the resort’s sparkling outdoor swimming pool. Wake to shimmering water reflections by day and warm poolside illumination by evening, with effortless access to the pool deck and poolside snacks.',
    idealFor: 'Leisure travellers, couples & poolside weekend escapes',
    settingNote: 'Elevated sightlines overlooking the outdoor swimming pool and deck.',
    highlights: [
      'Direct sightlines overlooking the resort swimming pool (6 units)',
      'Steps away from the swimming pool, kids pool & poolside snacks',
      'Contemporary interior styling with peaceful ambiance',
      '24-hour room service from Auric 24×7 Restaurant',
    ],
    primaryImage: '/media/rooms/pool-view/pool-view-room-vista.png',
    images: [
      {
        src: '/media/rooms/pool-view/pool-view-room-vista.png',
        alt: 'Pool-View Rooms overlooking the swimming pool at Narayana Green Resorts',
        caption: 'Pool-View Rooms — Poolside Wing & Water Sightlines',
      },
      {
        src: '/media/rooms/pool-view/pool-view-room-interior.jpeg',
        alt: 'Pool-View Room bedroom interior at Narayana Green Resorts',
        caption: 'Pool-View Rooms — Contemporary Guest Bedroom',
      },
      {
        src: '/media/rooms/pool-view/pool-view-room-deck.jpeg',
        alt: 'Swimming pool view outside Pool-View Rooms at Narayana Green Resorts',
        caption: 'Pool-View Rooms — Direct Pool Deck Proximity',
      },
    ],
  },
  {
    slug: 'garden-view',
    name: 'Garden-View Rooms',
    shortName: 'Garden-View',
    unitCount: 8,
    unitLabel: '8 Verdant Units',
    tagline: 'Immersed in Foliage & Morning Calm',
    shortDescription:
      'Accommodation surrounded by greenery and peaceful natural surroundings.',
    editorialDescription:
      'Comprising eight units across our tranquil green wing, the Garden-View Rooms immerse guests in the botanical heart of Narayana Green Resorts. Surrounded by lush lawns and foliage, these rooms offer a restful sanctuary after exploring sacred Bodh Gaya.',
    idealFor: 'Spiritual pilgrims, nature lovers, corporate guests & tranquil stays',
    settingNote: 'Surrounded by manicured lawns, palm walkways, and quiet natural greenery.',
    highlights: [
      'Surrounded by lush greenery and natural resort landscaping (8 units)',
      'Peaceful atmosphere ideal for meditation and spiritual travellers visiting Bodh Gaya',
      'Refined interior comfort with restful lighting',
      '24-hour room service and full resort recreational access',
    ],
    primaryImage: '/media/rooms/garden-view/garden-view-room-primary.png',
    images: [
      {
        src: '/media/rooms/garden-view/garden-view-room-primary.png',
        alt: 'Garden-View Rooms surrounded by greenery at Narayana Green Resorts',
        caption: 'Garden-View Rooms — Verdant Resort Setting',
      },
      {
        src: '/media/rooms/garden-view/garden-view-room-interior.jpeg',
        alt: 'Garden-View Room interior bedroom at Narayana Green Resorts',
        caption: 'Garden-View Rooms — Peaceful Interior Comfort',
      },
      {
        src: '/media/rooms/garden-view/garden-view-room-veranda.jpeg',
        alt: 'Garden-View Room outlook onto green lawns at Narayana Green Resorts',
        caption: 'Garden-View Rooms — Manicured Lawn Outlook',
      },
    ],
  },
];

export function getRoomBySlug(slug: string): RoomCategory | undefined {
  return ROOM_CATEGORIES.find((room) => room.slug === slug);
}
