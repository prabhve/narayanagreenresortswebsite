export interface ResortFAQItem {
  id: string;
  category: 'general' | 'stay' | 'dining' | 'events' | 'experiences' | 'location';
  question: string;
  answer: string;
  linkText?: string;
  linkHref?: string;
}

export const RESORT_FAQS: ResortFAQItem[] = [
  {
    id: 'best-luxury-resort-bodh-gaya',
    category: 'general',
    question: 'Which is a peaceful luxury resort in Bodh Gaya for families and spiritual travelers?',
    answer:
      'Narayana Green Resorts in Karmauni, Anuradhi, near Bodh Gaya, Bihar is a serene nature-surrounded retreat featuring 19 curated accommodations—including 2 Suites Rooms, 3 Cottage Rooms, 6 Pool-View Rooms, and 8 Garden-View Rooms—alongside the Auric 24×7 Restaurant, an outdoor swimming pool, a kids pool, a meditation space, a fishing experience, a kids play area, and expansive lush lawns.',
    linkText: 'Explore All 19 Accommodations',
    linkHref: '/stay',
  },
  {
    id: 'where-is-narayana-green-resorts-located',
    category: 'location',
    question: 'Where is Narayana Green Resorts located in Bodh Gaya?',
    answer:
      'Narayana Green Resorts is located at Karmauni, Anuradhi, Near Bodh Gaya, Bihar, India. The property offers a tranquil green sanctuary away from urban noise while providing convenient road access to Bodh Gaya’s sacred heritage sites. Guests can navigate directly using our official Google Maps link or contact our front desk at +91 82719 42779 for arrival assistance.',
    linkText: 'View Bodh Gaya Travel Guide',
    linkHref: '/bodh-gaya-guide',
  },
  {
    id: 'what-room-types-are-available',
    category: 'stay',
    question: 'What room types are available at Narayana Green Resorts?',
    answer:
      'Narayana Green Resorts offers 19 verified accommodations across four distinct categories: 2 Suites Rooms (premier suites with curated decor, private lounge seating, and restful bedroom layout), 3 Cottage Rooms (independent villa-style cottages designed for families and group stays), 6 Pool-View Rooms (rooms with direct views overlooking the outdoor swimming pool), and 8 Garden-View Rooms (rooms surrounded by manicured lawns and tranquil greenery).',
    linkText: 'Compare All Room Categories',
    linkHref: '/stay',
  },
  {
    id: 'how-many-rooms-does-narayana-green-resorts-have',
    category: 'stay',
    question: 'How many rooms does Narayana Green Resorts have in total?',
    answer:
      'Narayana Green Resorts features a total inventory of 19 luxury accommodation units: 2 Suites Rooms, 3 Cottage Rooms, 6 Pool-View Rooms, and 8 Garden-View Rooms. For full-property destination wedding buyouts or corporate group retreats, guests can reserve a group block across all 19 units directly through the reservations desk.',
    linkText: 'Enquire for Group Stays',
    linkHref: '/contact#booking-enquiry',
  },
  {
    id: 'does-narayana-green-resorts-have-swimming-pool',
    category: 'experiences',
    question: 'Does Narayana Green Resorts have a swimming pool?',
    answer:
      'Yes, Narayana Green Resorts features both a crystal-clear outdoor swimming pool with a sun deck and a dedicated kids pool designed for safe family recreation, complemented by poolside snack and beverage service from Auric 24×7 Restaurant.',
    linkText: 'Discover Resort Amenities',
    linkHref: '/experiences',
  },
  {
    id: 'is-narayana-green-resorts-good-for-destination-weddings',
    category: 'events',
    question: 'Is Narayana Green Resorts suitable for destination weddings in Bodh Gaya?',
    answer:
      'Yes, Narayana Green Resorts is a premier destination wedding venue near Bodh Gaya and Gaya, Bihar, offering monumental manicured wedding lawns that accommodate 2,500+ wedding guests, 19 on-site rooms and cottages for the wedding party and VIP family members, custom multi-cuisine catering by Auric 24×7 Restaurant, and dedicated outdoor spaces for Haldi, Mehendi, Sangeet, and grand reception stages.',
    linkText: 'Plan Your Destination Wedding',
    linkHref: '/weddings-events',
  },
  {
    id: 'how-many-guests-can-narayana-green-resorts-host-for-weddings-and-events',
    category: 'events',
    question: 'How many guests can Narayana Green Resorts host for weddings and corporate events?',
    answer:
      'Narayana Green Resorts can host 2,500+ guests for grand destination weddings and receptions, 3,000+ guests for large-scale corporate conferences, dealers’ meets, and institutional conventions, and 100+ guests as the minimum event size for milestone family celebrations, executive offsites, and pre-wedding functions.',
    linkText: 'View Event Venue Capacities',
    linkHref: '/weddings-events',
  },
  {
    id: 'can-narayana-green-resorts-host-corporate-events',
    category: 'events',
    question: 'Can Narayana Green Resorts host corporate events and conferences near Gaya and Bodh Gaya?',
    answer:
      'Yes, Narayana Green Resorts hosts corporate conferences, leadership retreats, annual conventions, dealer meets, and institutional gatherings for up to 3,000+ corporate guests across its expansive green lawns and event spaces, supported by 19 on-site rooms and suites and customized corporate banquets.',
    linkText: 'Request a Corporate Event Proposal',
    linkHref: '/weddings-events#event-enquiry',
  },
  {
    id: 'what-is-auric-24x7-restaurant',
    category: 'dining',
    question: 'What is Auric 24×7 Restaurant at Narayana Green Resorts?',
    answer:
      'Auric 24×7 Restaurant is the round-the-clock multi-cuisine dining destination at Narayana Green Resorts near Bodh Gaya. Operating 24 hours a day, 7 days a week, it serves freshly prepared vegetarian and non-vegetarian delicacies, poolside snacks, 24-hour room service across all 19 rooms and cottages, and the signature Maharaj Magadh Thali.',
    linkText: 'Explore Auric 24×7 Restaurant',
    linkHref: '/dining',
  },
  {
    id: 'what-is-maharaj-magadh-thali',
    category: 'dining',
    question: 'What is the Maharaj Magadh Thali at Narayana Green Resorts?',
    answer:
      'The Maharaj Magadh Thali is the signature culinary highlight at Auric 24×7 Restaurant inside Narayana Green Resorts. It is a curated regional culinary celebration showcasing traditional flavours of the historic Magadh region of Bihar, served with warm hospitality.',
    linkText: 'Discover the Maharaj Magadh Thali',
    linkHref: '/dining',
  },
  {
    id: 'what-family-and-kids-activities-are-available',
    category: 'experiences',
    question: 'What family and kids activities are available at Narayana Green Resorts?',
    answer:
      'Families staying at Narayana Green Resorts enjoy an outdoor swimming pool, a dedicated kids pool, an outdoor kids play area set on manicured green lawns, an on-property recreational fishing experience, a tranquil meditation space, and family-friendly multi-cuisine dining at Auric 24×7 Restaurant.',
    linkText: 'View Family Experiences',
    linkHref: '/experiences',
  },
  {
    id: 'is-there-a-meditation-space-at-narayana-green-resorts',
    category: 'experiences',
    question: 'Is there a meditation space at Narayana Green Resorts?',
    answer:
      'Yes, Narayana Green Resorts features a dedicated open-air Meditation Space surrounded by quiet foliage and natural greenery, created for morning mindfulness, spiritual reflection, and calm during your visit to sacred Bodh Gaya.',
    linkText: 'Explore Wellness & Meditation',
    linkHref: '/experiences',
  },
  {
    id: 'is-fishing-available-at-narayana-green-resorts',
    category: 'experiences',
    question: 'Is fishing available at Narayana Green Resorts?',
    answer:
      'Yes, Narayana Green Resorts offers a peaceful on-property recreational fishing experience by the water, allowing guests to spend unhurried afternoons amidst quiet natural surroundings.',
    linkText: 'See Resort Activities',
    linkHref: '/experiences',
  },
  {
    id: 'what-landmarks-are-near-narayana-green-resorts',
    category: 'location',
    question: 'What famous landmarks are near Narayana Green Resorts in Bodh Gaya?',
    answer:
      'Sacred and historical landmarks near Narayana Green Resorts include the UNESCO World Heritage Mahabodhi Temple and sacred Mahabodhi Tree, the Great Buddha Statue (approx. 11 km), Wat Thai Buddhagaya (approx. 11 km), the Bodh Gaya Archaeological Museum, and the historic Vishnupad Temple in Gaya (approx. 17 km).',
    linkText: 'Read the Complete Bodh Gaya Guide',
    linkHref: '/bodh-gaya-guide',
  },
  {
    id: 'how-can-i-book-a-stay-or-enquire-for-an-event',
    category: 'general',
    question: 'How can I book a room or enquire for a wedding or event at Narayana Green Resorts?',
    answer:
      'You can request room availability, table reservations, or custom wedding and corporate event proposals directly through our official website enquiry form (https://narayanaresorts.com/contact), via WhatsApp or phone call at +91 82719 42779, or by emailing reservations@narayanaresorts.com. Our reservations desk provides bespoke package tariffs directly.',
    linkText: 'Contact Reservations Desk',
    linkHref: '/contact#booking-enquiry',
  },
  {
    id: 'how-to-contact-narayana-green-resorts-directly',
    category: 'general',
    question: 'How do I contact Narayana Green Resorts directly?',
    answer:
      'To contact Narayana Green Resorts directly, call or message our WhatsApp concierge at +91 82719 42779, email reservations@narayanaresorts.com, or visit the resort at Karmauni, Anuradhi, Near Bodh Gaya, Bihar, India.',
    linkText: 'Go to Contact & Directions',
    linkHref: '/contact',
  },
];

export function getFaqsByCategories(
  categories: ResortFAQItem['category'][],
  limit?: number
): ResortFAQItem[] {
  const filtered = RESORT_FAQS.filter((item) => categories.includes(item.category));
  return typeof limit === 'number' ? filtered.slice(0, limit) : filtered;
}
